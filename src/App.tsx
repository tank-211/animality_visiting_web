import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bone,
  ChevronRight,
  Clock3,
  Camera,
  Heart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  PawPrint,
  Phone,
  Quote,
  LogOut,
  Trash2,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Sparkles,
  Stethoscope,
  Users,
  X,
} from "lucide-react";

type Review = { id: number; customerName: string; rating: number; reviewText: string; sourceUrl?: string; featured: boolean };
type GalleryPhoto = { id: number; imageUrl: string; caption: string; category: string };
type Product = { id: number; name: string; category: string; description: string; price: number; imageUrl: string; active?: boolean };
const WHATSAPP_NUMBER = "919356874251";
const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
async function api<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${API_URL}/api${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data as T;
}

const U = {
  hero: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1800&q=88",
  about:
    "https://images.unsplash.com/photo-1601758003122-53c40e686a19?auto=format&fit=crop&w=1200&q=85",
  golden:
    "https://images.unsplash.com/photo-1639374937078-886e07d66ca3?auto=format&fit=crop&w=900&q=85",
  shepherd:
    "https://images.unsplash.com/photo-1636810528913-8a1035067e03?auto=format&fit=crop&w=900&q=85",
  lab: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?auto=format&fit=crop&w=900&q=85",
  blackLab:
    "https://images.unsplash.com/photo-1751315722511-2cccb86f1e1f?auto=format&fit=crop&w=900&q=85",
  gallery1:
    "https://images.unsplash.com/photo-1658337921250-10578c1372fa?auto=format&fit=crop&w=800&q=85",
  gallery2:
    "https://images.unsplash.com/photo-1678153184494-1f6fc14a673d?auto=format&fit=crop&w=800&q=85",
  gallery3:
    "https://images.unsplash.com/photo-1658337922280-ba1d00c741cb?auto=format&fit=crop&w=800&q=85",
  gallery4:
    "https://images.unsplash.com/photo-1601758123927-4f7acc7da589?auto=format&fit=crop&w=900&q=85",
  gallery5:
    "https://images.unsplash.com/photo-1658337922756-267cd8ec94cc?auto=format&fit=crop&w=800&q=85",
  gallery6:
    "https://images.unsplash.com/photo-1510563800743-aed236490d08?auto=format&fit=crop&w=900&q=85",
  product1:
    "https://images.unsplash.com/photo-1546687813-3fcc1c363a07?auto=format&fit=crop&w=900&q=85",
  product2:
    "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=900&q=85",
  product3:
    "https://images.unsplash.com/photo-1600352712371-15fd49ca42b5?auto=format&fit=crop&w=900&q=85",
};

const nav = [
  ["Home", "home"],
  ["About", "about"],
  ["Services", "services"],
  ["Our Pets", "pets"],
  ["Gallery", "gallery"],
  ["Shop", "shop"],
  ["Contact", "contact"],
];

const services = [
  {
    icon: PawPrint,
    title: "Pet Sales",
    text: "Healthy, happy companions from responsible, trusted sources.",
  },
  {
    icon: Heart,
    title: "Pet Care",
    text: "Thoughtful everyday care shaped around your pet’s routine.",
  },
  {
    icon: ShoppingBag,
    title: "Pet Products",
    text: "Nutrition, wellness and grooming essentials we truly trust.",
  },
  {
    icon: Bone,
    title: "Accessories",
    text: "Comfortable, playful accessories chosen for style and safety.",
  },
  {
    icon: Sparkles,
    title: "Paw Keychains",
    text: "Personalised keepsakes made from your pet’s unique paw print.",
  },
  {
    icon: Stethoscope,
    title: "Pet Guidance",
    text: "Clear, friendly guidance for new and experienced pet parents.",
  },
];

const pets = [
  {
    id: "golden-retriever",
    name: "Golden Retriever",
    image: U.golden,
    age: "8–12 weeks",
    nature: "Gentle & joyful",
    color: "#e9a928",
  },
  {
    id: "german-shepherd",
    name: "German Shepherd",
    image: U.shepherd,
    age: "10–14 weeks",
    nature: "Loyal & intelligent",
    color: "#315443",
  },
  {
    id: "labrador",
    name: "Labrador",
    image: U.lab,
    age: "8–12 weeks",
    nature: "Friendly & playful",
    color: "#d47c4b",
  },
  {
    id: "black-labrador",
    name: "Black Labrador",
    image: U.blackLab,
    age: "10–14 weeks",
    nature: "Bright & affectionate",
    color: "#58635e",
  },
];

const gallery = [U.gallery1, U.gallery2, U.gallery3, U.gallery4, U.gallery5, U.gallery6];



function go(page: string) {
  window.location.hash = page === "home" ? "" : page;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <button
      className={`logo ${light ? "logo-light" : ""}`}
      onClick={() => go("home")}
      aria-label="Animality Pets home"
    >
      <span className="logo-mark" aria-hidden="true">
        <PawPrint size={27} strokeWidth={2.8} />
      </span>
      <span className="logo-wordmark">
        <strong>ANIMALITY</strong>
        <small>PETS <i>•</i> NASHIK</small>
      </span>
    </button>
  );
}

function Button({
  children,
  kind = "primary",
  onClick,
  icon = true,
  type = "button",
}: {
  children: React.ReactNode;
  kind?: "primary" | "secondary" | "light" | "outline";
  onClick?: () => void;
  icon?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} className={`btn btn-${kind}`} onClick={onClick}>
      {children}
      {icon && <ArrowRight size={17} />}
    </button>
  );
}

function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [current]);
  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>
            <MapPin size={14} /> Nashik, Maharashtra
          </span>
          <span>
            Care that feels like family <PawPrint size={13} />
          </span>
          <span>
            <Phone size={14} /> +91 93568 74251
          </span>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map(([label, page]) => (
              <button
                className={current === page ? "active" : ""}
                key={page}
                onClick={() => go(page)}
              >
                {label}
              </button>
            ))}
          </nav>
          <Button onClick={() => go("contact")}>Contact us</Button>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="mobile-nav">
            {nav.map(([label, page]) => (
              <button key={page} onClick={() => go(page)}>
                {label}
                <ChevronRight size={17} />
              </button>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}

function SectionTitle({
  eyebrow,
  title,
  copy,
  center = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  center?: boolean;
}) {
  return (
    <div className={`section-title ${center ? "center" : ""}`}>
      <span className="eyebrow">
        <PawPrint size={15} /> {eyebrow}
      </span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-photo">
        <img src={U.hero} alt="Happy Golden Retriever outdoors" />
      </div>
      <div className="hero-shape" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow light">
            <Sparkles size={15} /> Nashik’s trusted pet family
          </span>
          <h1>
            Because Every Pet Deserves <em>Extraordinary Care.</em>
          </h1>
          <p>
            Everything your furry friend needs, all in one place — from finding a new companion to a
            lifetime of loving care.
          </p>
          <div className="button-row">
            <Button kind="light" onClick={() => go("services")}>
              Explore services
            </Button>
            <Button kind="outline" onClick={() => go("contact")}>
              Contact us
            </Button>
          </div>
          <div className="hero-trust">
            <div className="avatar-stack">
              {[U.gallery3, U.gallery2, U.gallery5].map((x) => (
                <img key={x} src={x} alt="" />
              ))}
            </div>
            <div>
              <span className="stars">★★★★★</span>
              <small>Loved by 500+ pet families</small>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-note">
        <span /> SCROLL TO DISCOVER
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section cream">
      <div className="container about-grid">
        <div className="about-image-wrap">
          <img
            className="about-image"
            src={U.about}
            alt="A pet parent relaxing at home with her dog"
          />
          <div className="experience">
            <strong>7+</strong>
            <span>
              Years of
              <br />
              trusted care
            </span>
          </div>
          <div className="mini-photo">
            <img src={U.gallery2} alt="Happy dog" />
          </div>
        </div>
        <div className="about-copy">
          <SectionTitle eyebrow="Our story" title="More Than Just Pet Care, We’re Family." />
          <p>
            Animality Pets was born from one simple belief: pets are not an addition to the family —
            they are family. We help Nashik’s pet parents make confident, loving choices at every
            stage.
          </p>
          <p>
            From thoughtfully matched companions and reliable essentials to honest guidance, every
            Animality experience is personal, transparent and rooted in genuine care.
          </p>
          <div className="ticks">
            <span>
              <BadgeCheck /> Ethical & responsible
            </span>
            <span>
              <BadgeCheck /> Personal guidance
            </span>
            <span>
              <BadgeCheck /> Health-first approach
            </span>
            <span>
              <BadgeCheck /> Lifelong support
            </span>
          </div>
          <Button onClick={() => go("about")}>Our journey</Button>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ full = false }: { full?: boolean }) {
  return (
    <section className={`section ${full ? "cream" : "white"}`}>
      <div className="container">
        <SectionTitle
          eyebrow="What we do"
          title="Care, Curated for Every Paw."
          copy="A thoughtful circle of services for healthier pets and happier pet parents."
          center
        />
        <div className="services-grid">
          {services.map(({ icon: Icon, title, text }, i) => (
            <article className="service-card" key={title}>
              <span className="service-number">0{i + 1}</span>
              <div className="service-icon">
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <button onClick={() => go("contact")}>
                Learn more <ArrowRight size={16} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PetsSection({ all = false }: { all?: boolean }) {
  return (
    <section className="section green-section">
      <div className="container">
        <div className="split-heading">
          <SectionTitle
            eyebrow="Meet your new best friend"
            title="Beautiful Beginnings Start Here."
            copy="Every pet is thoughtfully cared for, health-checked and ready to become part of your story."
          />
          <Button kind="light" onClick={() => go("pets")}>
            {all ? "Enquire now" : "View all pets"}
          </Button>
        </div>
        <div className="pets-grid">
          {pets.map((pet) => (
            <article className="pet-card" key={pet.id}>
              <div className="pet-img">
                <img src={pet.image} alt={pet.name} />
                <span>Available</span>
              </div>
              <div className="pet-info">
                <small>{pet.nature}</small>
                <h3>{pet.name}</h3>
                <div className="pet-meta">
                  <span>
                    <Clock3 /> {pet.age}
                  </span>
                  <span>
                    <ShieldCheck /> Health checked
                  </span>
                </div>
                <button onClick={() => go(`pet/${pet.id}`)}>
                  Meet this pet <ArrowRight size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const items = [
    [ShieldCheck, "Trust, always", "Clear information and responsible practices at every step."],
    [BadgeCheck, "Quality first", "We carefully choose every pet, product and recommendation."],
    [Heart, "Pet-friendly", "Gentle, patient experiences designed around animal comfort."],
    [Users, "Here for you", "Dedicated, practical support whenever your pet family needs it."],
  ] as const;
  return (
    <section className="section cream">
      <div className="container">
        <SectionTitle
          eyebrow="The Animality promise"
          title="Why Nashik’s Pet Parents Choose Us."
          center
        />
        <div className="why-grid">
          {items.map(([Icon, title, text], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ full = false }: { full?: boolean }) {
 const [photos,setPhotos]=useState<GalleryPhoto[]>([]);
 useEffect(()=>{api<{photos:GalleryPhoto[]}>("/gallery").then(x=>setPhotos(x.photos)).catch(()=>setPhotos([]));},[]);
 return <section className="section white"><div className="container">
  <div className="split-heading"><SectionTitle eyebrow="Life at Animality" title="Happy Tails, Beautiful Moments." copy="Moments shared by the Animality Pets community."/></div>
  {photos.length?<div className={`gallery-grid ${full?"gallery-full":""}`}>{(full?photos:photos.slice(0,6)).map((p,i)=><div className={`gallery-item item-${i%6}`} key={p.id}><img src={p.imageUrl} alt={p.caption||"Animality Pets gallery"}/>{p.caption&&<span>{p.caption}</span>}</div>)}</div>:<div className="empty-content"><Camera/><p>Our pet gallery is being updated. Visit us again soon!</p></div>}
 </div></section>;
}
function Testimonials() {
 const [reviews,setReviews]=useState<Review[]>([]);
 useEffect(()=>{api<{reviews:Review[]}>("/reviews").then(x=>setReviews(x.reviews)).catch(()=>setReviews([]));},[]);
 return <section className="section testimonial-section"><div className="container">
  <SectionTitle eyebrow="Customer reviews" title="Stories From Our Pet Family." center/>
  {reviews.length?<div className="reviews">{reviews.filter(r=>r.featured).map(r=><article key={r.id}><Quote className="quote"/><div className="stars">{"★".repeat(r.rating)}</div><p>{r.reviewText}</p><div><strong>{r.customerName}</strong><small>{r.sourceUrl?<a href={r.sourceUrl} target="_blank" rel="noreferrer">View original review</a>:"Animality Pets customer"}</small></div></article>)}</div>:<div className="empty-content"><Star/><p>Customer stories will appear here soon.</p></div>}
 </div></section>;
}

function CTA() {
  return (
    <section className="cta">
      <div className="container cta-inner">
        <div>
          <span className="eyebrow light">
            <PawPrint size={15} /> We’d love to meet you
          </span>
          <h2>Ready to Make Your Pet’s Day Special?</h2>
          <p>
            Visit us in Nashik or message our friendly team. The next happy tail could be yours.
          </p>
        </div>
        <div className="button-row">
          <a
            className="btn btn-light"
            href="https://wa.me/919356874251"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} /> WhatsApp us
          </a>
          <Button kind="outline" onClick={() => go("contact")}>
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>
            Thoughtful care, trusted products and happy beginnings for Nashik’s pets and their
            people.
          </p>
          <div className="socials">
            <a href="#" aria-label="Instagram">
              <Camera />
            </a>
            <a href="#" aria-label="Facebook">
              <Share2 />
            </a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          {nav.slice(0, 5).map(([x, page]) => (
            <button key={page} onClick={() => go(page)}>
              {x}
            </button>
          ))}
        </div>
        <div>
          <h4>Our services</h4>
          {services.slice(0, 5).map((x) => (
            <button key={x.title} onClick={() => go("services")}>
              {x.title}
            </button>
          ))}
        </div>
        <div className="contact-list">
          <h4>Come say hello</h4>
          <p>
            <MapPin /> 2, Agra–Mumbai Road, Jadhav Mala,
            <br />
            Nashik, Maharashtra 422003
          </p>
          <p>
            <Phone /> +91 93568 74251
          </p>
          <p>
            <Mail /> animalitybreedingcentre@gmail.com
          </p>
          <p>
            <Clock3 /> Mon–Sun, 10am–8pm
          </p>
        </div>
      </div>
      <div className="container copyright">
        <span>© 2025 Animality Pets. Made with care in Nashik.</span>
        <span><button className="admin-footer-link" onClick={() => go("admin")}>Admin</button> · Privacy · Terms</span>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <PetsSection />
      <WhySection />
      <GallerySection />
      <Testimonials />
      <CTA />
    </>
  );
}

function PageHero({
  eyebrow,
  title,
  copy,
  image,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
}) {
  return (
    <section
      className={`page-hero ${image ? "has-image" : ""}`}
      style={
        image
          ? {
              backgroundImage: `linear-gradient(90deg, rgba(16,57,42,.95), rgba(16,57,42,.3)), url(${image})`,
            }
          : {}
      }
    >
      <div className="container">
        <span className="eyebrow light">
          <PawPrint size={15} /> {eyebrow}
        </span>
        <h1>{title}</h1>
        <p>{copy}</p>
        <div className="breadcrumb">
          <button onClick={() => go("home")}>Home</button>
          <ChevronRight /> <span>{eyebrow}</span>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built on a Love That Has Four Paws."
        copy="A local pet-care family helping Nashik’s pets live healthier, happier lives."
        image={U.about}
      />
      <AboutSection />
      <WhySection />
      <section className="section white">
        <div className="container stats">
          <div>
            <strong>500+</strong>
            <span>Happy pet families</span>
          </div>
          <div>
            <strong>7+</strong>
            <span>Years of care</span>
          </div>
          <div>
            <strong>4.9</strong>
            <span>Average rating</span>
          </div>
          <div>
            <strong>365</strong>
            <span>Days of support</span>
          </div>
        </div>
      </section>
      <Testimonials />
      <CTA />
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Everything They Need. All the Care They Deserve."
        copy="Practical expertise and heartfelt support for every chapter of pet parenthood."
      />
      <ServicesSection full />
      <section className="section white">
        <div className="container process">
          <SectionTitle eyebrow="Simple & personal" title="Your Experience, Our Priority." center />
          <div className="process-row">
            {[
              ["01", "Tell us about your pet"],
              ["02", "Get personal guidance"],
              ["03", "Choose with confidence"],
              ["04", "Stay supported"],
            ].map(([n, t]) => (
              <div key={n}>
                <strong>{n}</strong>
                <span />
                <h3>{t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

function PetsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our pets"
        title="Your New Best Friend Is Waiting."
        copy="Meet happy, healthy companions raised and matched with responsibility."
        image={U.golden}
      />
      <PetsSection all />
      <section className="section cream">
        <div className="container note-card">
          <ShieldCheck />
          <div>
            <h2>A responsible beginning</h2>
            <p>
              Availability changes frequently. Our team will help you understand health checks, home
              readiness and the needs of each breed before you decide.
            </p>
          </div>
          <Button onClick={() => go("contact")}>Talk to our team</Button>
        </div>
      </section>
    </>
  );
}

function PetDetails({ id }: { id: string }) {
  const pet = pets.find((x) => x.id === id) || pets[0];
  return (
    <>
      <section className="section pet-detail">
        <div className="container detail-grid">
          <div className="detail-image">
            <img src={pet.image} alt={pet.name} />
            <span>Currently available</span>
          </div>
          <div className="detail-copy">
            <button className="back" onClick={() => go("pets")}>
              ← Back to all pets
            </button>
            <span className="eyebrow">
              <PawPrint size={15} /> Meet your companion
            </span>
            <h1>{pet.name}</h1>
            <p className="lead">{pet.nature}, people-loving and ready for a caring forever home.</p>
            <div className="detail-facts">
              <div>
                <small>Ideal age</small>
                <strong>{pet.age}</strong>
              </div>
              <div>
                <small>Temperament</small>
                <strong>{pet.nature}</strong>
              </div>
              <div>
                <small>Care status</small>
                <strong>Health checked</strong>
              </div>
              <div>
                <small>Location</small>
                <strong>Nashik</strong>
              </div>
            </div>
            <h3>About this breed</h3>
            <p>
              Known for a wonderful bond with their family, this breed thrives with affection,
              consistent routines and daily activity. We’ll guide you through nutrition, training
              and settling-in essentials.
            </p>
            <div className="button-row">
              <Button onClick={() => go("contact")}>Send an enquiry</Button>
              <a className="btn btn-secondary" href="https://wa.me/919356874251">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      <WhySection />
      <CTA />
    </>
  );
}

function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The Faces That Make Our Days Brighter."
        copy="Real pets, real personalities and a whole lot of joy."
      />
      <GallerySection full />
      <CTA />
    </>
  );
}

function ShopPage() {
  const [items,setItems]=useState<Product[]>([]);
  const [cart,setCart]=useState<Record<string,number>>({});
  const [showCart,setShowCart]=useState(false);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  useEffect(()=>{api<{products:Product[]}>("/products").then(x=>setItems(x.products)).catch(e=>setError(e instanceof Error?e.message:"Unable to load products.")).finally(()=>setLoading(false));},[]);
  const cartItems=items.filter(p=>(cart[String(p.id)]||0)>0);
  const count=Object.values(cart).reduce((a,b)=>a+b,0);
  const total=cartItems.reduce((sum,p)=>sum+p.price*cart[String(p.id)],0);
  const money=(n:number)=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:2}).format(n);
  function orderOnWhatsApp(){
    if(!cartItems.length)return;
    const lines=cartItems.map(p=>`• ${p.name} × ${cart[String(p.id)]} — ${money(p.price*cart[String(p.id)])}`);
    const message=["Hello Animality Pets! I would like to place an order:", "",...lines,"",`Total: ${money(total)}`,"","Please confirm availability and delivery/pickup details."].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer");
  }
  return <>
    <PageHero eyebrow="The shop" title="Good Things for Very Good Pets." copy="A considered edit of beautiful, useful essentials for everyday pet life." image={U.product3}/>
    <section className="section cream"><div className="container">
      <div className="shop-toolbar"><div><span>Curated collection</span><h2>Everyday favourites</h2></div><button className="cart" onClick={()=>setShowCart(v=>!v)}><ShoppingBag/> Bag <b>{count}</b></button></div>
      {error&&<p className="form-error">{error}</p>}
      {loading?<div className="empty-content"><p>Loading products…</p></div>:items.length===0?<div className="empty-content"><ShoppingBag/><p>Our shop is being updated. Please check back soon.</p></div>:<div className="product-grid">
        {items.map(p=><article className="product-card" key={p.id}><div><img src={p.imageUrl} alt={p.name}/></div><small>{p.category}</small><h3>{p.name}</h3>{p.description&&<p>{p.description}</p>}<footer><strong>{money(p.price)}</strong><button type="button" onClick={()=>{setCart(old=>({...old,[String(p.id)]:(old[String(p.id)]||0)+1}));setShowCart(true);}}>Add to bag <PlusIcon/></button></footer></article>)}
      </div>}
      {showCart&&<div className="admin-form shop-cart-panel"><div className="shop-toolbar"><h2>Your shopping bag</h2><button type="button" onClick={()=>setShowCart(false)}>Close</button></div>
        {!cartItems.length?<p>Your bag is empty. Add a product to get started.</p>:<>
          {cartItems.map(p=><div className="admin-list" key={p.id}><article><div><strong>{p.name}</strong><p>{money(p.price)} each</p><div className="cart-quantity"><button type="button" onClick={()=>setCart(old=>({...old,[String(p.id)]:Math.max(0,(old[String(p.id)]||0)-1)}))}>−</button><b>{cart[String(p.id)]}</b><button type="button" onClick={()=>setCart(old=>({...old,[String(p.id)]:(old[String(p.id)]||0)+1}))}>+</button><button type="button" onClick={()=>setCart(old=>({...old,[String(p.id)]:0}))}>Remove</button></div></div><strong>{money(p.price*cart[String(p.id)])}</strong></article></div>)}
          <h3>Order total: {money(total)}</h3><p>You'll confirm availability, delivery and payment directly with Animality Pets on WhatsApp.</p><button className="btn btn-primary" type="button" onClick={orderOnWhatsApp}>Continue on WhatsApp <MessageCircle/></button>
        </>}
      </div>}
      <div className="shop-note"><PackageCheck/><span><strong>Need help choosing?</strong> Message our team for a recommendation based on your pet’s age, breed and routine.</span><Button onClick={()=>go("contact")}>Ask Animality</Button></div>
    </div></section>
  </>;
}

function PlusIcon() {
  return <span className="plus">+</span>;
}

function ContactPage() {
 const [sent,setSent]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState("");
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setError("");const f=new FormData(e.currentTarget);try{await api("/enquiries",{method:"POST",body:JSON.stringify({name:f.get("name"),phone:f.get("phone"),email:f.get("email"),interest:f.get("interest"),message:f.get("message")})});setSent(true);}catch(err){setError(err instanceof Error?err.message:"Unable to send enquiry. Please contact us on WhatsApp.");}finally{setBusy(false);}}
 return <><PageHero eyebrow="Contact" title="Let’s Talk About Your Pet." copy="Questions, enquiries or simply looking for advice? Our friendly Nashik team is here."/>
 <section className="section cream"><div className="container contact-grid"><div className="contact-copy"><SectionTitle eyebrow="Come say hello" title="We’re Always Happy to Help." copy="Reach out in the way that feels easiest."/><div className="contact-cards"><a href="https://wa.me/919356874251"><Phone/><span><small>Call or WhatsApp</small><strong>Contact Animality Pets</strong></span></a><a href="https://www.google.com/maps/search/?api=1&query=Animality+Pets%2C+2%2C+Agra+Mumbai+Road%2C+Jadhav+Mala%2C+Nashik%2C+Maharashtra+422003"><MapPin/><span><small>Visit in Nashik</small><strong>Nashik, Maharashtra</strong></span></a></div></div>
 <form className="contact-form" onSubmit={submit}><div className="form-heading"><span>Send an enquiry</span><h2>How can we help?</h2></div>{sent?<div className="success"><BadgeCheck/><h3>Thank you!</h3><p>Your enquiry has been received. Our team will be in touch.</p><Button onClick={()=>setSent(false)}>Send another</Button></div>:<><label>Your name<input name="name" required minLength={2} placeholder="Full name"/></label><div className="field-row"><label>Phone number<input name="phone" required type="tel" pattern="[+0-9() -]{8,20}" placeholder="+91"/></label><label>Email address<input name="email" type="email" placeholder="you@email.com"/></label></div><label>I’m interested in<select name="interest"><option>Pet enquiry</option><option>Pet care & guidance</option><option>Products & accessories</option><option>Customized keychains</option></select></label><label>Tell us more<textarea name="message" rows={4} required minLength={5} placeholder="How can we help you and your pet?"/></label>{error&&<p className="form-error">{error}</p>}<Button type="submit">{busy?"Sending…":"Send enquiry"}</Button></>}</form></div></section></>;
}

function AdminPage(){
 const [token,setToken]=useState(localStorage.getItem("animality_admin_token")||""),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[tab,setTab]=useState("products"),[reviews,setReviews]=useState<Review[]>([]),[photos,setPhotos]=useState<GalleryPhoto[]>([]),[enquiries,setEnquiries]=useState<any[]>([]),[items,setItems]=useState<Product[]>([]),[editing,setEditing]=useState<Product|null>(null),[error,setError]=useState(""),[busy,setBusy]=useState(false),[productImageUrl,setProductImageUrl]=useState(""),[uploadingProductImage,setUploadingProductImage]=useState(false);
 async function load(t:string){const [r,g,e,p]=await Promise.all([api<{reviews:Review[]}>("/admin/reviews",{},t),api<{photos:GalleryPhoto[]}>("/admin/gallery",{},t),api<{enquiries:any[]}>("/admin/enquiries",{},t),api<{products:Product[]}>("/admin/products",{},t)]);setReviews(r.reviews);setPhotos(g.photos);setEnquiries(e.enquiries);setItems(p.products);}
 useEffect(()=>{if(token)load(token).catch(()=>{setToken("");localStorage.removeItem("animality_admin_token");});},[token]);
 async function login(e:React.FormEvent){e.preventDefault();setError("");try{const x=await api<{token:string}>("/admin/login",{method:"POST",body:JSON.stringify({email,password})});localStorage.setItem("animality_admin_token",x.token);setToken(x.token);}catch(err){setError(err instanceof Error?err.message:"Login failed");}}
 async function remove(path:string,id:number){if(!confirm("Delete this item?"))return;try{await api(path+"/"+id,{method:"DELETE"},token);await load(token);}catch(e){setError(e instanceof Error?e.message:"Delete failed");}}
 async function addReview(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const form=e.currentTarget;const f=new FormData(form);try{await api("/admin/reviews",{method:"POST",body:JSON.stringify({customerName:f.get("customerName"),rating:Number(f.get("rating")),reviewText:f.get("reviewText"),sourceUrl:f.get("sourceUrl"),featured:true})},token);form.reset();await load(token);}catch(err){setError(err instanceof Error?err.message:"Unable to add review");}}
 async function upload(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const form=e.currentTarget;const f=new FormData(form);setBusy(true);try{await api("/admin/gallery",{method:"POST",body:f},token);form.reset();await load(token);}catch(err){setError(err instanceof Error?err.message:"Upload failed");}finally{setBusy(false);}}
 async function uploadProductImage(e:React.ChangeEvent<HTMLInputElement>){const file=e.target.files?.[0];if(!file)return;if(!["image/jpeg","image/png","image/webp"].includes(file.type)){setError("Choose a JPG, PNG or WebP image.");e.target.value="";return;}if(file.size>8*1024*1024){setError("Product image must be 8 MB or smaller.");e.target.value="";return;}const data=new FormData();data.append("image",file);setUploadingProductImage(true);setError("");try{const result=await api<{imageUrl:string}>("/admin/products/upload-image",{method:"POST",body:data},token);setProductImageUrl(result.imageUrl);}catch(err){setError(err instanceof Error?err.message:"Product image upload failed.");}finally{setUploadingProductImage(false);e.target.value="";}}
 async function saveProduct(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const form=e.currentTarget;const f=new FormData(form);setBusy(true);setError("");const payload={name:f.get("name"),category:f.get("category"),description:f.get("description"),price:Number(f.get("price")),imageUrl:productImageUrl.trim(),active:f.get("active")==="on"};try{await api(editing?"/admin/products/"+editing.id:"/admin/products",{method:editing?"PUT":"POST",body:JSON.stringify(payload)},token);form.reset();setEditing(null);setProductImageUrl("");await load(token);}catch(err){setError(err instanceof Error?err.message:"Unable to save product");}finally{setBusy(false);}}
 if(!token)return <section className="section cream admin-shell"><form className="contact-form admin-login" onSubmit={login}><div className="form-heading"><span>Private area</span><h2>Animality Admin</h2></div><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>{error&&<p className="form-error">{error}</p>}<Button type="submit">Sign in</Button><p className="admin-hint">Admin credentials are configured securely on the backend.</p></form></section>;
 return <section className="section cream admin-shell"><div className="container"><div className="admin-heading"><div><span className="eyebrow">Management</span><h1>Animality Dashboard</h1></div><button className="admin-logout" onClick={()=>{localStorage.removeItem("animality_admin_token");setToken("");}}><LogOut/> Sign out</button></div>{error&&<p className="form-error">{error}</p>}<div className="admin-tabs">{["products","reviews","gallery","enquiries"].map(x=><button key={x} className={tab===x?"selected":""} onClick={()=>{setTab(x);setError("");}}>{x[0].toUpperCase()+x.slice(1)}</button>)}</div>
 {tab==="products"&&<><form className="admin-form" onSubmit={saveProduct}><h2>{editing?"Edit product":"Add shop product"}</h2><input name="name" key={editing?.id||"new-name"} defaultValue={editing?.name||""} required maxLength={120} placeholder="Product name"/><input name="category" key={editing?.id||"new-category"} defaultValue={editing?.category||""} required maxLength={80} placeholder="Category (e.g. Food, Toys, Grooming)"/><textarea name="description" key={editing?.id||"new-description"} defaultValue={editing?.description||""} maxLength={2000} placeholder="Short product description"/><input name="price" key={editing?.id||"new-price"} type="number" min="0" step="0.01" defaultValue={editing?.price??""} required placeholder="Price in INR"/><div className="product-image-upload"><label htmlFor="product-image-file">Product image</label><input id="product-image-file" type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadProductImage} disabled={uploadingProductImage}/><small>Choose a JPG, PNG or WebP image (max 8 MB). It uploads securely to Cloudinary.</small>{uploadingProductImage&&<span>Uploading image…</span>}{productImageUrl&&<div className="product-image-preview"><img src={productImageUrl} alt="Product preview"/><button type="button" onClick={()=>setProductImageUrl("")}>Remove image</button></div>}<input name="imageUrl" type="url" value={productImageUrl} onChange={e=>setProductImageUrl(e.target.value)} required placeholder="Image URL will appear here after upload"/></div><label className="product-active"><input key={editing?`active-${editing.id}-${editing.active}`:"new-active"} type="checkbox" name="active" defaultChecked={editing?editing.active!==false:true}/> Show this product in the public shop</label><div className="button-row"><button className="btn btn-primary" disabled={busy||uploadingProductImage}>{busy?"Saving…":editing?"Save changes":"Add product"}</button>{editing&&<button className="btn btn-secondary" type="button" onClick={()=>{setEditing(null);setProductImageUrl("");}}>Cancel edit</button>}</div></form><div className="admin-list">{items.map(p=><article key={p.id}><img className="admin-product-thumb" src={p.imageUrl} alt={p.name}/><div><strong>{p.name} · ₹{p.price.toLocaleString("en-IN")}</strong><p>{p.category} · {p.active?"Visible in shop":"Hidden from shop"}</p><p>{p.description}</p></div><div className="admin-product-actions"><button type="button" onClick={()=>{setEditing(p);setProductImageUrl(p.imageUrl);setError("");}}>Edit</button><button type="button" onClick={()=>remove("/admin/products",p.id)} aria-label={"Delete "+p.name}><Trash2/></button></div></article>)}</div></>}
 {tab==="reviews"&&<><form className="admin-form" onSubmit={addReview}><h2>Add genuine customer review</h2><input name="customerName" required placeholder="Customer name"/><select name="rating"><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select><textarea name="reviewText" required placeholder="Review text"/><input name="sourceUrl" type="url" placeholder="Original Google review URL (optional)"/><button className="btn btn-primary" type="submit">Add review</button></form><div className="admin-list">{reviews.map(r=><article key={r.id}><div><strong>{r.customerName} · {"★".repeat(r.rating)}</strong><p>{r.reviewText}</p></div><button onClick={()=>remove("/admin/reviews",r.id)} aria-label="Delete review"><Trash2/></button></article>)}</div></>}
 {tab==="gallery"&&<><form className="admin-form" onSubmit={upload} encType="multipart/form-data"><h2>Upload pet photo</h2><input type="file" name="image" accept="image/jpeg,image/png,image/webp" required/><input name="caption" placeholder="Caption"/><select name="category"><option>Pets</option><option>Customers</option><option>Store</option><option>Events</option></select><button className="btn btn-primary" disabled={busy}>{busy?"Uploading…":"Upload photo"}</button></form><div className="admin-photo-grid">{photos.map(p=><article key={p.id}><img src={p.imageUrl} alt={p.caption}/><p>{p.caption}</p><button onClick={()=>remove("/admin/gallery",p.id)}><Trash2/></button></article>)}</div></>}
 {tab==="enquiries"&&<div className="admin-list">{enquiries.map(e=><article key={e.id}><div><strong>{e.name} · {e.phone}</strong><p>{e.email} · {e.interest}</p><p>{e.message}</p><small>{new Date(e.createdAt).toLocaleString()}</small></div></article>)}</div>}
 </div></section>;
}

function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || "home");
  useEffect(() => {
    const update = () => setRoute(window.location.hash.slice(1) || "home");
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  const current = route.startsWith("pet/") ? "pets" : route;
  let page: React.ReactNode = <HomePage />;
  if (route === "about") page = <AboutPage />;
  else if (route === "services") page = <ServicesPage />;
  else if (route === "pets") page = <PetsPage />;
  else if (route.startsWith("pet/")) page = <PetDetails id={route.split("/")[1]} />;
  else if (route === "gallery") page = <GalleryPage />;
  else if (route === "shop") page = <ShopPage />;
  else if (route === "contact") page = <ContactPage />;
  else if (route === "admin") page = <AdminPage />;
  return (
    <div>
      <Header current={current} />
      <main>{page}</main>
      <Footer />
      <a
        className="whatsapp"
        href="https://wa.me/919356874251"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Animality Pets on WhatsApp"
      >
        <MessageCircle />
        <span>Chat with us</span>
      </a>
    </div>
  );
}

export default App;
