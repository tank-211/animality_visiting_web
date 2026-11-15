import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pg from "pg";
import { v2 as cloudinary } from "cloudinary";

const { Pool } = pg;
const app = express();

app.set("trust proxy", 1);

const port = Number(process.env.PORT || 10000);
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_URL?.includes("localhost") ? false : { rejectUnauthorized: false } });
const allowedOrigins = (process.env.CORS_ORIGINS || "").split(",").map(x => x.trim()).filter(Boolean);
const jwtSecret = process.env.JWT_SECRET;
if (!process.env.DATABASE_URL || !jwtSecret || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  console.warn("Set DATABASE_URL, JWT_SECRET, ADMIN_EMAIL and ADMIN_PASSWORD before exposing the admin API.");
}
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET, secure: true });
}
app.use(helmet());
app.use(cors({ origin(origin, callback) { if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return callback(null, true); return callback(new Error("Origin is not allowed by CORS")); } }));
app.use(express.json({ limit: "1mb" }));
app.use("/api/admin/login", rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false }));
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 }, fileFilter: (_req, file, cb) => cb(null, ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) });

async function initialize() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admins (id BIGSERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW());
    CREATE TABLE IF NOT EXISTS reviews (id BIGSERIAL PRIMARY KEY, customer_name TEXT NOT NULL, rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5), review_text TEXT NOT NULL, source_url TEXT, featured BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ DEFAULT NOW());
    CREATE TABLE IF NOT EXISTS gallery_photos (id BIGSERIAL PRIMARY KEY, image_url TEXT NOT NULL, public_id TEXT NOT NULL, caption TEXT DEFAULT '', category TEXT NOT NULL DEFAULT 'Pets', created_at TIMESTAMPTZ DEFAULT NOW());
    CREATE TABLE IF NOT EXISTS enquiries (id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT, interest TEXT, message TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new', created_at TIMESTAMPTZ DEFAULT NOW());
    CREATE TABLE IF NOT EXISTS products (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
      image_url TEXT NOT NULL,
      active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS products_active_created_idx ON products(active, created_at DESC);
  `);
  const productCount = await pool.query("SELECT COUNT(*)::int AS count FROM products");
  if (productCount.rows[0].count === 0) {
    await pool.query(
      "INSERT INTO products(name,category,description,price,image_url) VALUES ($1,$2,$3,$4,$5),($6,$7,$8,$9,$10),($11,$12,$13,$14,$15)",
      [
        "Artisan Leather Collar","Walk essentials","A stylish everyday collar for comfortable walks.",1299,"https://images.unsplash.com/photo-1546687813-3fcc1c363a07?auto=format&fit=crop&w=900&q=85",
        "Plush Comfort Toy","Toys","A soft playtime companion for your pet.",699,"https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=900&q=85",
        "Everyday Adventure Kit","Accessories","A curated set of everyday pet essentials.",1899,"https://images.unsplash.com/photo-1600352712371-15fd49ca42b5?auto=format&fit=crop&w=900&q=85"
      ]
    );
  }
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const hash = await bcrypt.hash(password, 12);
    await pool.query("INSERT INTO admins(email,password_hash) VALUES($1,$2) ON CONFLICT(email) DO NOTHING", [email, hash]);
  }
}
function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!jwtSecret) return res.status(503).json({ error: "Admin authentication is not configured." });
    req.admin = jwt.verify(token, jwtSecret);
    next();
  } catch { return res.status(401).json({ error: "Please sign in again." }); }
}
function asyncRoute(fn) { return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next); }

app.get("/health", (_req, res) => res.json({ status: "ok", service: "animality-pets-api" }));
app.get("/api/reviews", asyncRoute(async (_req, res) => {
  const { rows } = await pool.query("SELECT id, customer_name AS \"customerName\", rating, review_text AS \"reviewText\", source_url AS \"sourceUrl\", featured FROM reviews WHERE featured=TRUE ORDER BY created_at DESC LIMIT 30");
  res.set("Cache-Control", "public, max-age=60").json({ reviews: rows });
}));
app.get("/api/gallery", asyncRoute(async (_req, res) => {
  const { rows } = await pool.query("SELECT id, image_url AS \"imageUrl\", caption, category FROM gallery_photos ORDER BY created_at DESC LIMIT 100");
  res.set("Cache-Control", "public, max-age=60").json({ photos: rows });
}));
app.get("/api/products", asyncRoute(async (_req, res) => {
  const { rows } = await pool.query("SELECT id,name,category,description,price::float AS price,image_url AS \"imageUrl\" FROM products WHERE active=TRUE ORDER BY created_at DESC");
  res.set("Cache-Control", "public, max-age=60").json({ products: rows });
}));
app.get("/api/admin/products", auth, asyncRoute(async (_req, res) => {
  const { rows } = await pool.query("SELECT id,name,category,description,price::float AS price,image_url AS \"imageUrl\",active FROM products ORDER BY created_at DESC");
  res.json({ products: rows });
}));
app.post("/api/admin/products", auth, asyncRoute(async (req, res) => {
  const { name, category, description = "", price, imageUrl, active = true } = req.body || {};
  const amount = Number(price);
  if (typeof name !== "string" || !name.trim() || typeof category !== "string" || !category.trim() || !Number.isFinite(amount) || amount < 0 || typeof imageUrl !== "string" || !/^https:\/\//i.test(imageUrl)) {
    return res.status(400).json({ error: "Enter a product name, category, valid price and HTTPS image URL." });
  }
  const { rows } = await pool.query(
    "INSERT INTO products(name,category,description,price,image_url,active) VALUES($1,$2,$3,$4,$5,$6) RETURNING id",
    [name.trim().slice(0,120),category.trim().slice(0,80),String(description).slice(0,2000),amount,imageUrl.trim(),Boolean(active)]
  );
  res.status(201).json({ success: true, id: rows[0].id });
}));
app.put("/api/admin/products/:id", auth, asyncRoute(async (req, res) => {
  const { name, category, description = "", price, imageUrl, active = true } = req.body || {};
  const amount = Number(price);
  if (typeof name !== "string" || !name.trim() || typeof category !== "string" || !category.trim() || !Number.isFinite(amount) || amount < 0 || typeof imageUrl !== "string" || !/^https:\/\//i.test(imageUrl)) {
    return res.status(400).json({ error: "Enter a product name, category, valid price and HTTPS image URL." });
  }
  const { rowCount } = await pool.query(
    "UPDATE products SET name=$1,category=$2,description=$3,price=$4,image_url=$5,active=$6,updated_at=NOW() WHERE id=$7",
    [name.trim().slice(0,120),category.trim().slice(0,80),String(description).slice(0,2000),amount,imageUrl.trim(),Boolean(active),req.params.id]
  );
  if (!rowCount) return res.status(404).json({ error: "Product not found." });
  res.json({ success: true });
}));
app.delete("/api/admin/products/:id", auth, asyncRoute(async (req, res) => {
  const { rowCount } = await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
  if (!rowCount) return res.status(404).json({ error: "Product not found." });
  res.json({ success: true });
}));
app.post("/api/enquiries", rateLimit({ windowMs: 60 * 60 * 1000, limit: 8, standardHeaders: true, legacyHeaders: false }), asyncRoute(async (req, res) => {
  const { name, phone, email = "", interest = "General enquiry", message } = req.body || {};
  if (typeof name !== "string" || name.trim().length < 2 || typeof phone !== "string" || !/^[+0-9() -]{8,20}$/.test(phone) || typeof message !== "string" || message.trim().length < 5) return res.status(400).json({ error: "Please provide a valid name, phone number and message." });
  if (email && (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return res.status(400).json({ error: "Please provide a valid email address." });
  const { rows } = await pool.query("INSERT INTO enquiries(name,phone,email,interest,message) VALUES($1,$2,$3,$4,$5) RETURNING id", [name.trim().slice(0,120), phone.trim(), email.trim().slice(0,254), String(interest).slice(0,100), message.trim().slice(0,4000)]);
  res.status(201).json({ success: true, id: rows[0].id });
}));
app.post("/api/admin/login", asyncRoute(async (req, res) => {
  if (!jwtSecret) return res.status(503).json({ error: "Admin authentication is not configured." });
  const email = String(req.body?.email || "").toLowerCase().trim();
  const password = String(req.body?.password || "");
  const { rows } = await pool.query("SELECT id,email,password_hash FROM admins WHERE email=$1", [email]);
  if (!rows[0] || !(await bcrypt.compare(password, rows[0].password_hash))) return res.status(401).json({ error: "Invalid email or password." });
  const token = jwt.sign({ sub: String(rows[0].id), email: rows[0].email }, jwtSecret, { expiresIn: "8h" });
  res.json({ token });
}));
app.get("/api/admin/reviews", auth, asyncRoute(async (_req, res) => {
  const { rows } = await pool.query("SELECT id, customer_name AS \"customerName\", rating, review_text AS \"reviewText\", source_url AS \"sourceUrl\", featured FROM reviews ORDER BY created_at DESC");
  res.json({ reviews: rows });
}));
app.post("/api/admin/reviews", auth, asyncRoute(async (req, res) => {
  const { customerName, rating, reviewText, sourceUrl = "", featured = true } = req.body || {};
  const stars = Number(rating);
  if (typeof customerName !== "string" || !customerName.trim() || !Number.isInteger(stars) || stars < 1 || stars > 5 || typeof reviewText !== "string" || !reviewText.trim()) return res.status(400).json({ error: "Customer name, review text and a 1–5 star rating are required." });
  if (sourceUrl && !/^https:\/\//i.test(sourceUrl)) return res.status(400).json({ error: "Review source must be an HTTPS URL." });
  const { rows } = await pool.query("INSERT INTO reviews(customer_name,rating,review_text,source_url,featured) VALUES($1,$2,$3,$4,$5) RETURNING id", [customerName.trim().slice(0,120), stars, reviewText.trim().slice(0,3000), sourceUrl, Boolean(featured)]);
  res.status(201).json({ success: true, id: rows[0].id });
}));
app.delete("/api/admin/reviews/:id", auth, asyncRoute(async (req, res) => { await pool.query("DELETE FROM reviews WHERE id=$1", [req.params.id]); res.json({ success: true }); }));
app.get("/api/admin/gallery", auth, asyncRoute(async (_req, res) => {
  const { rows } = await pool.query("SELECT id,image_url AS \"imageUrl\",caption,category FROM gallery_photos ORDER BY created_at DESC");
  res.json({ photos: rows });
}));
app.post("/api/admin/gallery", auth, upload.single("image"), asyncRoute(async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Choose a JPG, PNG or WebP image (max 8 MB)." });
  if (!process.env.CLOUDINARY_CLOUD_NAME) return res.status(503).json({ error: "Image storage is not configured. Add Cloudinary credentials to Render." });
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "animality-pets/gallery", resource_type: "image" }, (error, value) => error ? reject(error) : resolve(value));
    stream.end(req.file.buffer);
  });
  const { rows } = await pool.query("INSERT INTO gallery_photos(image_url,public_id,caption,category) VALUES($1,$2,$3,$4) RETURNING id", [result.secure_url, result.public_id, String(req.body.caption || "").slice(0,200), String(req.body.category || "Pets").slice(0,50)]);
  res.status(201).json({ success: true, id: rows[0].id });
}));
app.delete("/api/admin/gallery/:id", auth, asyncRoute(async (req, res) => {
  const { rows } = await pool.query("DELETE FROM gallery_photos WHERE id=$1 RETURNING public_id", [req.params.id]);
  if (rows[0]?.public_id && process.env.CLOUDINARY_CLOUD_NAME) await cloudinary.uploader.destroy(rows[0].public_id);
  res.json({ success: true });
}));
app.get("/api/admin/enquiries", auth, asyncRoute(async (_req, res) => {
  const { rows } = await pool.query("SELECT id,name,phone,email,interest,message,status,created_at AS \"createdAt\" FROM enquiries ORDER BY created_at DESC LIMIT 500");
  res.json({ enquiries: rows });
}));
app.use((err, _req, res, _next) => {
  console.error(err);
  if (err instanceof multer.MulterError) return res.status(400).json({ error: err.code === "LIMIT_FILE_SIZE" ? "Image must be 8 MB or smaller." : "Invalid image upload." });
  res.status(500).json({ error: "Server error. Please try again later." });
});
initialize().then(() => app.listen(port, () => console.log(`Animality API listening on ${port}`))).catch(error => { console.error("Database initialization failed", error); process.exit(1); });
