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
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Users,
  X,
} from "lucide-react";

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

const products = [
  {
    name: "Artisan Leather Collar",
    category: "Walk essentials",
    price: "₹1,299",
    image: U.product1,
  },
  { name: "Plush Comfort Toy", category: "Playtime", price: "₹699", image: U.product2 },
  { name: "Everyday Adventure Kit", category: "Curated set", price: "₹1,899", image: U.product3 },
];

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
      <span className="logo-mark">
        <PawPrint size={25} strokeWidth={2.4} />
      </span>
      <span>
        <strong>ANIMALITY</strong>
        <small>PETS • NASHIK</small>
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
            <Phone size={14} /> +91 98765 43210
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
  return (
    <section className="section white">
      <div className="container">
        <div className="split-heading">
          <SectionTitle
            eyebrow="Life at Animality"
            title="Happy Tails, Beautiful Moments."
            copy="A little window into the joy, personality and everyday magic of our pet community."
          />
          <a
            className="instagram-link"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <Camera /> @animalitypets
          </a>
        </div>
        <div className={`gallery-grid ${full ? "gallery-full" : ""}`}>
          {[...gallery, ...(full ? gallery.slice().reverse() : [])].map((image, i) => (
            <button
              className={`gallery-item item-${i % 6}`}
              key={`${image}-${i}`}
              aria-label="View gallery image"
            >
              <img src={image} alt={`Animality pet moment ${i + 1}`} />
              <span>
                <Camera />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    [
      "“Animality made bringing Bruno home feel easy and reassuring. They still check in, months later.”",
      "Riya Shah",
      "Golden Retriever parent",
    ],
    [
      "“The team genuinely listens. Their guidance has made us much more confident first-time pet parents.”",
      "Aditya Patil",
      "Labrador parent",
    ],
    [
      "“Beautiful products, kind people and a level of care that is rare to find. Our favourite pet place in Nashik.”",
      "Neha Kulkarni",
      "Pet parent",
    ],
  ];
  return (
    <section className="section testimonial-section">
      <div className="container">
        <SectionTitle eyebrow="Kind words" title="Stories From Our Pet Family." center />
        <div className="reviews">
          {reviews.map(([quote, name, role]) => (
            <article key={name}>
              <Quote className="quote" />
              <div className="stars">★★★★★</div>
              <p>{quote}</p>
              <div>
                <strong>{name}</strong>
                <small>{role}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
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
            href="https://wa.me/919876543210"
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
            <MapPin /> College Road, Nashik,
            <br />
            Maharashtra 422005
          </p>
          <p>
            <Phone /> +91 98765 43210
          </p>
          <p>
            <Mail /> hello@animalitypets.in
          </p>
          <p>
            <Clock3 /> Mon–Sun, 10am–8pm
          </p>
        </div>
      </div>
      <div className="container copyright">
        <span>© 2025 Animality Pets. Made with care in Nashik.</span>
        <span>Privacy · Terms</span>
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
              <a className="btn btn-secondary" href="https://wa.me/919876543210">
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
  const [cart, setCart] = useState(0);
  return (
    <>
      <PageHero
        eyebrow="The shop"
        title="Good Things for Very Good Pets."
        copy="A considered edit of beautiful, useful essentials for everyday pet life."
        image={U.product3}
      />
      <section className="section cream">
        <div className="container">
          <div className="shop-toolbar">
            <div>
              <span>Curated collection</span>
              <h2>Everyday favourites</h2>
            </div>
            <button className="cart">
              <ShoppingBag /> Bag <b>{cart}</b>
            </button>
          </div>
          <div className="product-grid">
            {products.map((p) => (
              <article className="product-card" key={p.name}>
                <div>
                  <img src={p.image} alt={p.name} />
                  <button aria-label="Save product">
                    <Heart />
                  </button>
                </div>
                <small>{p.category}</small>
                <h3>{p.name}</h3>
                <footer>
                  <strong>{p.price}</strong>
                  <button onClick={() => setCart((c) => c + 1)}>
                    Add to bag <PlusIcon />
                  </button>
                </footer>
              </article>
            ))}
          </div>
          <div className="shop-note">
            <PackageCheck />
            <span>
              <strong>Need help choosing?</strong> Message our team for a recommendation based on
              your pet’s age, breed and routine.
            </span>
            <Button onClick={() => go("contact")}>Ask Animality</Button>
          </div>
        </div>
      </section>
    </>
  );
}

function PlusIcon() {
  return <span className="plus">+</span>;
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s Talk About Your Pet."
        copy="Questions, enquiries or simply looking for advice? Our friendly Nashik team is here."
      />
      <section className="section cream">
        <div className="container contact-grid">
          <div className="contact-copy">
            <SectionTitle
              eyebrow="Come say hello"
              title="We’re Always Happy to Help."
              copy="Reach out in the way that feels easiest. We usually respond within a few hours during store timings."
            />
            <div className="contact-cards">
              <a href="tel:+919876543210">
                <Phone />
                <span>
                  <small>Call our team</small>
                  <strong>+91 98765 43210</strong>
                </span>
              </a>
              <a href="mailto:hello@animalitypets.in">
                <Mail />
                <span>
                  <small>Email us</small>
                  <strong>hello@animalitypets.in</strong>
                </span>
              </a>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer">
                <MapPin />
                <span>
                  <small>Visit in Nashik</small>
                  <strong>College Road, Nashik 422005</strong>
                </span>
              </a>
            </div>
          </div>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="form-heading">
              <span>Send an enquiry</span>
              <h2>How can we help?</h2>
            </div>
            {sent ? (
              <div className="success">
                <BadgeCheck />
                <h3>Thank you!</h3>
                <p>Your message is on its way. Our team will be in touch shortly.</p>
                <Button onClick={() => setSent(false)}>Send another</Button>
              </div>
            ) : (
              <>
                <label>
                  Your name
                  <input required placeholder="Full name" />
                </label>
                <div className="field-row">
                  <label>
                    Phone number
                    <input required type="tel" placeholder="+91" />
                  </label>
                  <label>
                    Email address
                    <input type="email" placeholder="you@email.com" />
                  </label>
                </div>
                <label>
                  I’m interested in
                  <select>
                    <option>Pet enquiry</option>
                    <option>Pet care & guidance</option>
                    <option>Products & accessories</option>
                    <option>Customized keychains</option>
                  </select>
                </label>
                <label>
                  Tell us more
                  <textarea rows={4} placeholder="How can we help you and your pet?" />
                </label>
                <Button type="submit">Send enquiry</Button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
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
  return (
    <div>
      <Header current={current} />
      <main>{page}</main>
      <Footer />
      <a
        className="whatsapp"
        href="https://wa.me/919876543210"
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
