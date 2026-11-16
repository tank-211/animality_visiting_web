# Animality Pets — Website

Responsive React + Vite website for Animality Pets, Nashik, with a Node/Express API for enquiries, customer reviews, gallery uploads and a protected admin dashboard.

## Frontend (Vercel)
- Build command: `npm ci && npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://<your-render-service>.onrender.com` (no trailing slash)

## Backend (Render)
Create a Web Service from this repository:
- Root directory: `server`
- Runtime: Node
- Build command: `npm install`
- Start command: `npm start`
- Region: Singapore is a sensible default for India-based visitors.

Create a PostgreSQL database on Render and set `DATABASE_URL` on the API service to its **internal** connection string. Set the other variables from `server/.env.example`:
- `JWT_SECRET`: long random secret (at least 32 random bytes).
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: initial admin credentials; use a strong unique password.
- `CORS_ORIGINS`: comma-separated exact Vercel production and preview origins that should be allowed.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: required for persistent gallery uploads. Images are stored in Cloudinary, not Render's ephemeral filesystem.

The API creates the required PostgreSQL tables on startup and creates the initial admin if the email does not already exist. Changing `ADMIN_PASSWORD` after the admin row exists does not reset its password.

## Admin
Open `https://<your-domain>/#admin`. Sign in using `ADMIN_EMAIL` and `ADMIN_PASSWORD` configured on Render. The admin can add genuine customer reviews, upload gallery photos and view submitted enquiries.

## Public API
- `GET /health`
- `GET /api/reviews`
- `GET /api/gallery`
- `POST /api/enquiries`

## Validation / launch checklist
1. Deploy the API and database on Render.
2. Configure Cloudinary credentials before enabling gallery uploads.
3. Add the Vercel production domain to `CORS_ORIGINS`.
4. Set `VITE_API_URL` in Vercel and redeploy the frontend.
5. Sign in at `/#admin`; add only authentic customer reviews and authorized pet photos.
6. Submit a test enquiry and verify it appears in the admin dashboard.
7. Replace any remaining demo contact details, product prices, pet availability and stock imagery with verified business information before launch.

Never commit secrets or real customer data. Admin routes require a signed JWT; passwords are stored as bcrypt hashes. Public enquiry submissions are rate-limited and validated.
