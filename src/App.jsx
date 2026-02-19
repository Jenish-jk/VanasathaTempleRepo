import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
import { templeData, heroCover } from "./data/templeData.js";

/* ─── Animation Variants ─── */

const slideUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
};

const slideLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
};

const slideRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

/* ─── Reusable Components ─── */

function Pill({ icon: Icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="pill"
    >
      {Icon && <Icon size={14} />}
      {children}
    </motion.div>
  );
}

function AnimatedSection({ id, title, subtitle, children, light = false, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const variants = direction === "left" ? slideLeft : direction === "right" ? slideRight : slideUp;

  return (
    <section id={id} className="section" ref={ref} style={{ background: light ? "var(--bg-deep)" : "transparent" }}>
      {/* Decorative section divider */}
      <div className="sectionDivider">
        <motion.div
          className="dividerLine"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <motion.div
          className="dividerDiamond"
          initial={{ scale: 0, rotate: 45 }}
          animate={isInView ? { scale: 1, rotate: 45 } : { scale: 0, rotate: 45 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.div
          className="dividerLine"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>

      <div className="container">
        <motion.div
          variants={variants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
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
      viewport={{ once: true, margin: "-60px" }}
      className="cards"
    >
      {items.map((it, idx) => (
        <motion.div
          variants={scaleIn}
          className="card cardAnimated"
          key={idx}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          initial={{ opacity: 0, y: 30, rotateX: 5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
        >
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
      viewport={{ once: true, margin: "-60px" }}
      className="gallery"
    >
      {images.map((src, idx) => (
        <motion.figure
          key={idx}
          className="photo"
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.6,
            delay: idx * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <img src={src} alt="Temple" loading="lazy" />
        </motion.figure>
      ))}
    </motion.div>
  );
}

/* ─── Floating Particles ─── */
function FloatingParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 8,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 10 + Math.random() * 15
  }));

  return (
    <div className="floatingParticles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main App ─── */

export default function App() {
  const t = templeData;
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.35, 0.65]);

  return (
    <main>
      {/* Global floating particles */}
      <FloatingParticles />

      {/* ─── Navbar ─── */}
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

      {/* ─── Hero with Cover Image ─── */}
      <section className="hero" ref={heroRef}>
        {/* Parallax Background Image */}
        <motion.div
          className="heroBg"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          <img src={heroCover} alt="Temple Cover" />
        </motion.div>
        {/* Dynamic overlay that darkens on scroll */}
        <motion.div className="heroOverlay" style={{ opacity: heroOverlayOpacity }} />

        <div className="container heroInner">
          <Pill icon={MapPin}>{t.location}</Pill>

          {/* Word-by-word title reveal */}
          <motion.h1 className="heroTitle">
            {t.name.split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="heroWord"
                initial={{ opacity: 0, y: 40, rotateX: 30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="heroSub"
          >
            {t.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
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

      {/* ─── About ─── */}
      <AnimatedSection id="about" title="About the Temple" direction="left">
        <div className="grid2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="muted" style={{ fontSize: "1.1rem", marginBottom: "24px" }}>
              <strong>Main Deity:</strong> {t.deity}
            </p>
            {t.about.map((p, i) => (
              <motion.p
                className="muted"
                key={i}
                style={{ marginBottom: "16px" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              >
                {p}
              </motion.p>
            ))}
          </motion.div>
          <CardGrid items={t.timings.slice(0, 4)} />
        </div>
      </AnimatedSection>

      {/* ─── History / Timeline ─── */}
      <AnimatedSection title={t.history.title} light direction="right">
        <div className="timeline">
          <motion.div
            className="timelineLine"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          {t.history.events.map((e, i) => (
            <motion.div
              key={i}
              className="event timelineEvent"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="timelineDot" />
              <h3>{e.title}</h3>
              <p className="muted" style={{ display: "flex", gap: "12px", fontSize: "0.9rem" }}>
                <span><Calendar size={14} /> {e.date}</span>
                {e.time && <span><Clock size={14} /> {e.time}</span>}
              </p>
              <p>{e.description}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* ─── Timings ─── */}
      <AnimatedSection id="timings" title="Temple Timings" subtitle="Timings may vary on festivals and special occasions." direction="up">
        <CardGrid items={t.timings} />
      </AnimatedSection>

      {/* ─── Pooja Schedule ─── */}
      <AnimatedSection id="pooja" title="Daily Pooja Schedule" light direction="left">
        <motion.ul
          className="list"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {t.poojas.map((p, i) => (
            <motion.li
              key={i}
              className="listItem poojaItem"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="time glowPulse">{p.time}</span>
              <span className="name">{p.name}</span>
              <ChevronRight size={16} style={{ marginLeft: "auto", opacity: 0.3 }} />
            </motion.li>
          ))}
        </motion.ul>
      </AnimatedSection>

      {/* ─── Festivals ─── */}
      <AnimatedSection id="events" title="Festivals & Events" subtitle="For the latest announcements, please follow Instagram." direction="right">
        <div className="events">
          {t.festivals.map((f, i) => (
            <motion.div
              className="event festivalCard"
              key={i}
              initial={{ opacity: 0, y: 40, rotateY: 5 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h3 style={{ color: "var(--brand)" }}>{f.title}</h3>
              <p className="muted">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* ─── Gallery ─── */}
      <AnimatedSection id="gallery" title="Gallery" light direction="up">
        <Gallery images={t.gallery} />
      </AnimatedSection>

      {/* ─── Contact ─── */}
      <AnimatedSection id="contact" title="Contact Information" direction="left">
        <div className="contact">
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 4 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card cardAnimated"
          >
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
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 4 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="card cardAnimated"
            style={{ background: "var(--bg-deep)" }}
          >
            <h3 style={{ marginBottom: "16px" }}><Info size={18} /> Note</h3>
            <p className="muted">
              If you share your exact temple address, phone, and official timings,
              I can update this site content perfectly.
            </p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ─── Footer ─── */}
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
