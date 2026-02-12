import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Instagram,
  Clock,
  Calendar,
  Info,
  Image as ImageIcon,
  ArrowUpRight,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { templeData } from "./data/templeData.js";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function Pill({ icon: Icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pill"
    >
      {Icon && <Icon size={14} />}
      {children}
    </motion.div>
  );
}

function Section({ id, title, subtitle, children, light = false }) {
  return (
    <section id={id} className="section" style={{ background: light ? "var(--bg-deep)" : "transparent" }}>
      <div className="container">
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="sectionHead"
        >
          <h2>{title}</h2>
          {subtitle && <p className="muted">{subtitle}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function CardGrid({ items }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="cards"
    >
      {items.map((it, idx) => (
        <motion.div variants={fadeIn} className="card" key={idx}>
          <div className="cardLabel">{it.label}</div>
          <div className="cardValue">{it.value}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Gallery({ images }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="gallery"
    >
      {images.map((src, idx) => (
        <motion.figure variants={fadeIn} className="photo" key={idx}>
          <img src={src} alt="Temple" loading="lazy" />
        </motion.figure>
      ))}
    </motion.div>
  );
}

export default function App() {
  const t = templeData;

  return (
    <main>
      <header className="nav">
        <div className="container navInner">
          <div className="brand">
            <Sparkles size={24} className="gold" color="var(--gold)" />
            <span className="brandText">{t.name}</span>
          </div>

          <nav className="navLinks">
            <a href="#about">About</a>
            <a href="#timings">Timings</a>
            <a href="#pooja">Poojas</a>
            <a href="#events">Events</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container heroInner">
          <Pill icon={MapPin}>{t.location}</Pill>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="heroTitle"
          >
            {t.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="heroSub"
          >
            {t.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="heroActions"
          >
            <a className="btn primary" href={t.instagram} target="_blank" rel="noreferrer">
              <Instagram size={18} /> Instagram Updates
            </a>
            <a className="btn secondary" href={t.maps} target="_blank" rel="noreferrer">
              <MapPin size={18} /> Directions <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      <Section id="about" title="About the Temple">
        <div className="grid2">
          <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <p className="muted" style={{ fontSize: "1.1rem", marginBottom: "24px" }}>
              <strong>Main Deity:</strong> {t.deity}
            </p>
            {t.about.map((p, i) => (
              <p className="muted" key={i} style={{ marginBottom: "16px" }}>{p}</p>
            ))}
          </motion.div>
          <CardGrid items={t.timings.slice(0, 4)} />
        </div>
      </Section>

      <Section title={t.history.title} light>
        <div className="events">
          {t.history.events.map((e, i) => (
            <motion.div
              key={i}
              className="event"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3>{e.title}</h3>
              <p className="muted" style={{ display: "flex", gap: "12px", fontSize: "0.9rem" }}>
                <span><Calendar size={14} /> {e.date}</span>
                {e.time && <span><Clock size={14} /> {e.time}</span>}
              </p>
              <p>{e.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="timings" title="Temple Timings" subtitle="Timings may vary on festivals and special occasions.">
        <CardGrid items={t.timings} />
      </Section>

      <Section id="pooja" title="Daily Pooja Schedule" light>
        <motion.ul
          className="list"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {t.poojas.map((p, i) => (
            <motion.li key={i} className="listItem" variants={fadeIn}>
              <span className="time">{p.time}</span>
              <span className="name">{p.name}</span>
              <ChevronRight size={16} style={{ marginLeft: "auto", opacity: 0.3 }} />
            </motion.li>
          ))}
        </motion.ul>
      </Section>

      <Section id="events" title="Festivals & Events" subtitle="For the latest announcements, please follow Instagram.">
        <div className="events">
          {t.festivals.map((f, i) => (
            <motion.div
              className="event"
              key={i}
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 style={{ color: "var(--brand)" }}>{f.title}</h3>
              <p className="muted">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="gallery" title="Gallery" light>
        <Gallery images={t.gallery} />
      </Section>

      <Section id="contact" title="Contact Information">
        <div className="contact">
          <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} className="card">
            <h3 style={{ marginBottom: "20px" }}>Get in touch</h3>
            <div style={{ display: "grid", gap: "16px" }}>
              <p className="muted">
                <strong><MapPin size={14} /> Location:</strong><br />
                {t.location}
              </p>
              <p className="muted">
                <strong><Instagram size={14} /> Instagram:</strong><br />
                <a href={t.instagram} target="_blank" rel="noreferrer" style={{ color: "var(--brand)", fontWeight: 600 }}>
                  @{t.instagramHandle}
                </a>
              </p>
              <a href={t.maps} target="_blank" rel="noreferrer" className="btn secondary" style={{ width: "fit-content" }}>
                Open Google Maps <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
          <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} className="card" style={{ background: "var(--bg-deep)" }}>
            <h3 style={{ marginBottom: "16px" }}><Info size={18} /> Note</h3>
            <p className="muted">
              If you share your exact temple address, phone, and official timings,
              I can update this site content perfectly.
            </p>
          </motion.div>
        </div>
      </Section>

      <footer className="footer">
        <div className="container footerInner">
          <div className="brand">
            <Sparkles size={20} color="var(--gold)" />
            <span style={{ fontSize: "0.9rem" }}>© {new Date().getFullYear()} {t.name}</span>
          </div>
          <span className="muted" style={{ fontSize: "0.8rem" }}>Modernized with React + Framer Motion</span>
        </div>
      </footer>
    </main>
  );
}
