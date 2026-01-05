import React from "react";
import { templeData } from "./data/templeData.js";

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="sectionHead">
          <h2>{title}</h2>
          {subtitle ? <p className="muted">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function CardGrid({ items }) {
  return (
    <div className="cards">
      {items.map((it, idx) => (
        <div className="card" key={idx}>
          <div className="cardLabel">{it.label}</div>
          <div className="cardValue">{it.value}</div>
        </div>
      ))}
    </div>
  );
}

function Gallery({ images }) {
  return (
    <div className="gallery">
      {images.map((src, idx) => (
        <figure className="photo" key={idx}>
          <img src={src} alt="Temple" loading="lazy" />
        </figure>
      ))}
    </div>
  );
}

export default function App() {
  const t = templeData;

  return (
    <main>
      <header className="nav">
        <div className="navInner">
          <div className="brand">
            <span className="brandDot" />
            <span className="brandText">{t.name}</span>
          </div>

          <div className="navLinks">
            <a href="#about">About</a>
            <a href="#timings">Timings</a>
            <a href="#pooja">Poojas</a>
            <a href="#events">Events</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="heroInner">
          <Pill>📍 {t.location}</Pill>
          <h1 className="heroTitle">{t.name}</h1>
          <p className="heroSub">{t.tagline}</p>
          <div className="heroActions">
            <a className="btn primary" href={t.instagram} target="_blank" rel="noreferrer">
              Instagram Updates
            </a>
            <a className="btn" href={t.maps} target="_blank" rel="noreferrer">
              Directions
            </a>
          </div>
        </div>
      </section>

      <Section id="about" title="About the Temple">
        <div className="grid2">
          <div>
            <p className="muted">
              <strong>Main Deity:</strong> {t.deity}
            </p>
            {t.about.map((p, i) => (
              <p className="muted" key={i}>{p}</p>
            ))}
          </div>
          <CardGrid items={t.timings} />
        </div>
      </Section>

      <Section>
        <h2>{templeData.history.title}</h2>

        {templeData.history.events.map((e, i) => (
          <div key={i} style={{ marginBottom: "16px" }}>
            <h4>{e.title}</h4>
            <p className="muted">
              📅 {e.date} {e.time && `| ⏰ ${e.time}`}
            </p>
            <p>{e.description}</p>
          </div>
        ))}
    </Section>

      <Section id="timings" title="Temple Timings" subtitle="Timings may vary on festivals and special occasions.">
        <CardGrid items={t.timings} />
      </Section>

      <Section id="pooja" title="Daily Pooja Schedule">
        <ul className="list">
          {t.poojas.map((p, i) => (
            <li key={i} className="listItem">
              <span className="time">{p.time}</span>
              <span className="name">{p.name}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="events" title="Festivals & Events" subtitle="For the latest announcements, please follow Instagram.">
        <div className="events">
          {t.festivals.map((f, i) => (
            <div className="event" key={i}>
              <h3>{f.title}</h3>
              <p className="muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="gallery" title="Gallery">
        <Gallery images={t.gallery} />
      </Section>

      <Section id="contact" title="Contact">
        <div className="contact">
          <div className="panel">
            <div className="panelTitle">Get in touch</div>
            <p className="muted">
              <strong>Location:</strong> {t.location}
            </p>
            <p className="muted">
              <strong>Instagram:</strong>{" "}
              <a href={t.instagram} target="_blank" rel="noreferrer">
                @{t.instagramHandle}
              </a>
            </p>
            <p className="muted">
              <strong>Directions:</strong>{" "}
              <a href={t.maps} target="_blank" rel="noreferrer">
                Open in Google Maps
              </a>
            </p>
          </div>
          <div className="panel">
            <div className="panelTitle">Note</div>
            <p className="muted">
              If you share your exact temple address, phone, and official timings,
              I can update this site content perfectly.
            </p>
          </div>
        </div>
      </Section>

      <footer className="footer">
        <div className="container footerInner">
          <span>© {new Date().getFullYear()} {t.name}</span>
          <span className="muted">Built with React + Vite</span>
        </div>
      </footer>
    </main>
  );
}
