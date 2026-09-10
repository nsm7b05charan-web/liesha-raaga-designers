"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Instagram,
  MapPin,
  Menu,
  Phone,
  MessageCircle,
  Scissors,
  Sparkles,
  X,
} from "lucide-react";
import { supabaseBrowser } from "../lib/supabase-browser";

const mapsUrl = "https://share.google/79mO1y7vzqfq4dhc7";
const instagramUrl = "https://www.instagram.com/liesha_raaga_designers?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==";
const phonePrimaryUrl = "tel:+919849506512";
const phoneSecondaryUrl = "tel:+919246464621";
const whatsappPrimaryUrl = "https://wa.me/919849506512";
const whatsappSecondaryUrl = "https://wa.me/919246464621";

const images = {
  // Product-focused imagery only. No real people/models are used on the site.
  hero:
    "https://cdn.shopify.com/s/files/1/1452/8632/files/now-wow-bluza-tip-ie-alba-cubroderi-florala-bumbac-2.jpg?v=1775572957",
  saree:
    "https://kuberansilks.com/cdn/shop/files/flat-lay-royal-blue-sunlight-overhead.png?v=1777298576&width=720",
  lehenga:
    "https://ahesas.com/cdn/shop/files/photo_2026-01-05_08-47-21.jpg?v=1767944452&width=960",
  blouse:
    "https://cdn.shopify.com/s/files/1/1452/8632/files/now-wow-bluza-tip-ie-alba-cubroderi-florala-bumbac-2.jpg?v=1775572957",
  kurti:
    "https://www.houseofisa.co.in/cdn/shop/files/IMG20260315123730_eca23d63-0243-4306-9879-07dd6cc03a0a.jpg?v=1775217224&width=1445",
  dupatta:
    "https://i.pinimg.com/736x/fa/28/0f/fa280f429f419e04affb02e8b9500f61.jpg",
  bridal:
    "https://clothsvilla.com/cdn/shop/files/white-designer-fox-georgette-semi-stitched-lehengha-set-with-sequin-thread-work_3_1024x1024.jpg?v=1747894089",
  // Computer Work means computerised embroidery-machine work.
  computer:
    "https://cdn11.bigcommerce.com/s-pmiia69/images/stencil/1030x1030/products/655/3911/Janome9850-3__41345.1615428282.jpg?c=2",
  sticker:
    "https://www.inxinternational.com/sites/default/files/images/OG/TextilePrinting_blogOG_1200x627.jpg",
  stitching:
    "https://shufflingsuitcases.com/cdn/shop/files/IMG_0074_09069611-368c-4c0a-af11-9a08346a1285.jpg?v=1741697862&width=1500",
  fabrics:
    "https://i.pinimg.com/474x/1e/13/54/1e13546742772ee306421f370f0af9cf.jpg",
  stretch:
    "https://www.swakalp.com/cdn/shop/files/IMG_20251114_152126.jpg?v=1763114839&width=1445",
};

const services = [
  ["Computerised Embroidery Work", "Computerised embroidery-machine work with precise stitching and detailed patterns.", images.computer],
  ["Maggam Work", "Decorative maggam embroidery work for blouses and special-occasion outfits.", images.blouse],
  ["Fabric Painting", "Hand-finished fabric painting to add an artistic personal touch to your outfit.", images.dupatta],
  ["Sticker Printing on Fabric", "Custom sticker printing on fabric for distinctive, personalized designs.", images.sticker],
  ["Dress Stitching", "Dress stitching shaped around your preferred fit, style and occasion.", images.stitching],
  ["Customized Outfits", "Personalized outfits created around your design, colour, fabric and fit preferences.", images.hero],
  ["Bridal Customisation", "Customized bridal outfits with details planned around your celebration and style.", images.bridal],
  ["Kurtis", "Graceful kurti styles for everyday wear and occasions, tailored to your preferences.", images.kurti],
  ["Fabrics", "A selection of fabrics to help bring your preferred outfit design together.", images.fabrics],
  ["Stretchable Blouses", "Special stretchable blouse designs focused on flexible fit and comfortable wear.", images.stretch],
] as const;

const collection = [
  ["Sarees", images.saree],
  ["Blouses", images.blouse],
  ["Lehengas", images.lehenga],
  ["Kurtis", images.kurti],
  ["Dupattas", images.dupatta],
  ["Bridal Wear", images.bridal],
  ["Customized Designs", images.hero],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function submitEnquiry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setStatus("idle");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      email: String(form.get("email") || "").trim() || null,
      message: String(form.get("message") || "").trim(),
    };

    try {
      const supabase = supabaseBrowser();
      const { error } = await supabase.from("enquiries").insert(payload);
      if (error) throw error;
      e.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#home" onClick={closeMenu}>
            <span className="brand-script">Liesha Raaga</span>
            <span className="brand-sub">DESIGNERS</span>
            <span className="brand-tag">EXCLUSIVE WOMENS CUSTOMIZED COLLECTION</span>
          </a>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            {[
              ["Home", "#home"],
              ["About Us", "#about"],
              ["Our Services", "#services"],
              ["Our Collection", "#collection"],
              ["Customization", "#customization"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={closeMenu}>
                {label}
              </a>
            ))}
            <a className="nav-cta" href="#contact" onClick={closeMenu}>
              Visit Our Store <ArrowRight size={15} />
            </a>
          </nav>

          <button
            className="menu-btn"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section id="home" className="hero">
        <FloralCorner position="top-left" />
        <FloralCorner position="top-right" />
        <div className="hero-wash" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">EXCLUSIVE WOMENS CUSTOMIZED COLLECTION</p>
            <h1>Unveil Your Style</h1>
            <p className="hero-lead">
              Discover the Perfect Fit <br />
              for Every Woman!
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#collection">
                Explore Our Designs <ArrowRight size={17} />
              </a>
              <a className="button secondary" href="#contact">
                Visit Our Store
              </a>
            </div>
            <div className="hero-features">
              <Feature icon={<Scissors />} text="Customized Designs" />
              <span className="feature-divider" />
              <Feature icon={<Heart />} text="Personal Attention" />
              <span className="feature-divider" />
              <Feature icon={<Sparkles />} text="Quality Craftsmanship" />
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-photo">
              <img src={images.hero} alt="Pastel Indian fashion inspiration" />
            </div>
            <div className="hero-script-note">
              <span>Wear</span>
              <span>Your Story</span>
              <small>♡</small>
            </div>
          </div>
        </div>
      </section>

      <section id="collection" className="section collection-section">
        <SectionHeading script="Our Collection" kicker="EXPLORE OUR EXCLUSIVE COLLECTIONS" />
        <div className="container collection-grid">
          {collection.map(([name, image]) => (
            <a className="collection-card" href="#contact" key={name}>
              <img src={image} alt={`${name} fashion inspiration`} loading="lazy" />
              <span>{name}</span>
              <small>View Designs <ArrowRight size={13} /></small>
            </a>
          ))}
        </div>
      </section>

      <section id="about" className="section about-section">
        <FloralCorner position="bottom-left" />
        <div className="container about-grid">
          <div className="about-note">
            <span>More</span>
            <span>than just an outfit</span>
            <span>It&apos;s you ♡</span>
          </div>
          <div className="about-copy">
            <SectionHeading script="About Liesha Raaga" kicker="FASHION DESIGNED WITH LOVE" />
            <p>
              Liesha Raaga Designers is a women&apos;s customized fashion
              destination focused on personalized designs, elegant styling and
              carefully crafted outfits.
            </p>
            <p>
              Every design conversation can be shaped around individual
              preferences, with attention to detail, fit, colour, fabric and
              the occasion the outfit is meant for.
            </p>
            <div className="mini-points">
              <span><Check size={15} /> Personalized designs</span>
              <span><Check size={15} /> Elegant styling</span>
              <span><Check size={15} /> Attention to detail</span>
              <span><Check size={15} /> Quality craftsmanship</span>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="container">
          <SectionHeading script="Our Services" kicker="DESIGNED AROUND YOUR STYLE" />
          <div className="service-grid">
            {services.map(([name, description, image]) => (
              <article className="service-card" key={name}>
                <div className="service-image">
                  <img src={image} alt={`${name} inspiration`} loading="lazy" />
                </div>
                <div className="service-body">
                  <h3>{name}</h3>
                  <p>{description}</p>
                  <a href="#contact">Enquire <ArrowRight size={14} /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="customization" className="section customization-section">
        <div className="container custom-card">
          <div>
            <p className="eyebrow">MADE AROUND YOUR VISION</p>
            <h2>Designed For You</h2>
            <p>
              Share the details that matter to you. Your preferred design,
              colour, fabric, fit, embroidery, style and occasion can all be
              part of the conversation.
            </p>
          </div>
          <div className="custom-list">
            {["Design", "Colour", "Fabric", "Fit", "Embroidery", "Style", "Occasion"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <a className="button primary" href="#contact">
            Enquire About Custom Designs <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <section className="section why-section">
        <div className="container">
          <SectionHeading script="Why Choose Us" kicker="A MORE PERSONAL APPROACH TO FASHION" />
          <div className="why-grid">
            {[
              ["Customized Designs", "Ideas shaped around your preferences."],
              ["Personal Attention", "A design conversation focused on you."],
              ["Quality Craftsmanship", "Careful attention to the finished look."],
              ["Unique Styles", "Looks that reflect your individual taste."],
            ].map(([title, text], i) => (
              <div className="why-card" key={title}>
                <span className="why-icon">{i === 0 ? "✦" : i === 1 ? "♡" : i === 2 ? "◇" : "✧"}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section store-section">
        <FloralCorner position="top-right" />
        <div className="container store-grid">
          <div className="store-map">
            <div className="map-inner">
              <div className="store-pin"><MapPin size={34} /></div>
              <span>FIND US IN VIJAYAWADA</span>
              <strong>One Town · Vijayawada</strong>
              <p>9/61/2B, One Town, Vijayawada</p>
              <a href={mapsUrl} target="_blank" rel="noreferrer">
                <MapPin size={14} /> Open in Google Maps
              </a>
            </div>
          </div>
          <div className="store-copy">
            <SectionHeading script="Visit Our Store" kicker="COME SAY HELLO" align="left" />
            <h3>Liesha Raaga Designers</h3>
            <address>
              9/61/2B, One Town,<br />
              Vijayawada,<br />
              Andhra Pradesh, India
            </address>
            <div className="store-actions">
              <a className="button primary" href={mapsUrl} target="_blank" rel="noreferrer">
                <MapPin size={16} /> Get Directions
              </a>
              <a className="button secondary" href={phonePrimaryUrl}>
                <Phone size={16} /> Call Now
              </a>
              <a className="button ghost" href={instagramUrl} target="_blank" rel="noreferrer">
                <Instagram size={16} /> Instagram
              </a>
              <a className="button ghost" href={whatsappPrimaryUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={16} /> WhatsApp 9849506512
              </a>
              <a className="button ghost" href={whatsappSecondaryUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={16} /> WhatsApp 9246464621
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-copy">
            <SectionHeading script="Get In Touch" kicker="LET&apos;S TALK ABOUT YOUR DESIGN" align="left" />
            <p>
              Have a design idea or want to discuss a customized outfit?
              Send a simple enquiry and the store can get in touch with you.
            </p>
            <div className="contact-details">
              <a href={phonePrimaryUrl}><Phone size={17} /> 9849506512</a>
              <a href={phoneSecondaryUrl}><Phone size={17} /> 9246464621</a>
              <a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={17} /> @liesha_raaga_designers</a>
              <a href={whatsappPrimaryUrl} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Connect on WhatsApp</a>
              <a href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={17} /> 9/61/2B, One Town, Vijayawada</a>
            </div>
          </div>

          <form className="enquiry-form" onSubmit={submitEnquiry}>
            <label>
              Name
              <input name="name" required minLength={2} placeholder="Your name" />
            </label>
            <label>
              Phone Number
              <input name="phone" required inputMode="tel" placeholder="Your phone number" />
            </label>
            <label>
              Email <span>(optional)</span>
              <input name="email" type="email" placeholder="you@example.com" />
            </label>
            <label>
              Message
              <textarea name="message" required minLength={3} rows={5} placeholder="Tell us what you would like to discuss..." />
            </label>
            <button className="button primary submit-btn" disabled={sending}>
              {sending ? "Sending..." : "Send Enquiry"} <ArrowRight size={17} />
            </button>
            {status === "success" && (
              <p className="form-message success">Thank you! Your enquiry has been received.</p>
            )}
            {status === "error" && (
              <p className="form-message error">We couldn&apos;t send your enquiry. Please try again or call the store.</p>
            )}
          </form>
        </div>
      </section>

      <section className="section instagram-section">
        <div className="container">
          <SectionHeading script="Follow Our Designs" kicker="@LIESHA_RAAGA_DESIGNERS" />
          <div className="insta-grid">
            {[images.saree, images.blouse, images.lehenga, images.dupatta ?? images.dupatta].map((image, i) => (
              <a key={i} href={instagramUrl} target="_blank" rel="noreferrer" className="insta-tile">
                <img src={image} alt="Fashion inspiration placeholder" loading="lazy" />
                <span><Instagram size={19} /></span>
              </a>
            ))}
          </div>
          <p className="placeholder-note">Visuals shown here are fashion inspiration placeholders, not claimed to be store products.</p>
          <a className="button secondary center-button" href={instagramUrl} target="_blank" rel="noreferrer">
            Follow on Instagram <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <footer className="footer">
        <FloralCorner position="bottom-left" />
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#home">
              <span className="brand-script">Liesha Raaga</span>
              <span className="brand-sub">DESIGNERS</span>
            </a>
            <p>EXCLUSIVE WOMENS CUSTOMIZED COLLECTION</p>
          </div>
          <div>
            <h4>Explore</h4>
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="#collection">Collection</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h4>Visit</h4>
            <span>9/61/2B, One Town,<br />Vijayawada,<br />Andhra Pradesh, India</span>
            <a href={phonePrimaryUrl}>9849506512</a>
            <a href={phoneSecondaryUrl}>9246464621</a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">@liesha_raaga_designers</a>
            <a href={whatsappPrimaryUrl} target="_blank" rel="noreferrer">WhatsApp · 9849506512</a>
            <a href={whatsappSecondaryUrl} target="_blank" rel="noreferrer">WhatsApp · 9246464621</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Liesha Raaga Designers</span>
          <a href={mapsUrl} target="_blank" rel="noreferrer">Get Directions</a>
        </div>
      </footer>
    </main>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="feature">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function SectionHeading({
  script,
  kicker,
  align = "center",
}: {
  script: string;
  kicker: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`section-heading ${align}`}>
      <div className="heading-line" />
      <h2>{script}</h2>
      <div className="heading-line" />
      <p>{kicker}</p>
    </div>
  );
}

function FloralCorner({ position }: { position: string }) {
  return (
    <div className={`floral-corner ${position}`} aria-hidden="true">
      <span className="flower flower-a">✿</span>
      <span className="flower flower-b">✽</span>
      <span className="leaf leaf-a">⌁</span>
      <span className="leaf leaf-b">⌁</span>
    </div>
  );
}