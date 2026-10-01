"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { identity, heroImages, stats, fieldNotes, destinations } from "@/lib/siteConfig";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <HeroScene />
        <div className="hero-overlay" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          <p className="hero-eyebrow">{identity.tagline}</p>
          <h1 className="hero-title">{identity.name.split(" ").map((w, i) => <span key={i}>{w}<br /></span>)}</h1>
          <p className="hero-sub">{identity.heroSubtitle}</p>
          <Link href="/about" className="hero-cta">Know the story</Link>
        </motion.div>
        <div className="hero-scroll"><span>Scroll</span><div className="scroll-line" /></div>
      </section>

      {/* SPLIT PANEL */}
      <section className="split-panel">
        <Link href="/travel" className="split-half">
          <img src={heroImages.traveler} alt="Travel" />
          <div className="split-dimmer" />
          <motion.div className="split-word" initial={{ x: "-110%", opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}>TRAVELER</motion.div>
        </Link>
        <Link href="/about" className="split-half">
          <img src={heroImages.engineer} alt="Engineer" />
          <div className="split-dimmer" />
          <motion.div className="split-word" initial={{ x: "110%", opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}>ENGINEER</motion.div>
        </Link>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {["Traveler","Thinker","Engineer","Reader","Builder","Explorer","Traveler","Thinker","Engineer","Reader","Builder","Explorer"].map((item, i) => (
            <span key={i}><span className="marquee-item">{item}</span><span className="marquee-sep"> \u00b7 </span></span>
          ))}
        </div>
      </div>

      {/* FIELD NOTES PREVIEW */}
      <section className="container section-pad">
        <Reveal>
          <div className="section-header">
            <div><p className="section-label">Field Notes</p><h2 className="section-title">Recent Thinking</h2></div>
            <Link href="/thinking" className="section-link" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-label)", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--clr-text-muted)" }}>All notes</Link>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {fieldNotes.slice(0, 3).map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <article className="card">
                <div className="card-img-wrap"><img src={c.img} alt={c.title} loading="lazy" /></div>
                <div className="card-body">
                  <p className="card-label">{c.label}</p>
                  <h3 className="card-title">{c.title}</h3>
                  <p className="card-excerpt">{c.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="container section-pad">
        <div className="stats-grid">
          <Counter target={stats.projectsShipped} suffix="+" label="Production Projects" />
          <Counter target={stats.automationEfficiency} suffix="%" label="Operational Time Saved" />
          <Counter target={stats.yearsEngineering} suffix="+" label="Years Engineering" />
          <Counter target={stats.happyClients} suffix="+" label="Client Solutions Delivered" />
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <motion.blockquote className="manifesto-quote" initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          \u201c{identity.manifesto}\u201d
        </motion.blockquote>
        <Reveal delay={0.3}><p className="manifesto-attr">Origin \u2014 Read the full story</p></Reveal>
        <Reveal delay={0.4}><div style={{ marginTop: "3rem" }}><Link href="/about" className="btn btn-ghost">Read Origin \u2192</Link></div></Reveal>
      </section>

      {/* TRAVEL PREVIEW */}
      <section className="container section-pad">
        <Reveal>
          <div className="section-header">
            <div><p className="section-label">Dispatches</p><h2 className="section-title">Recent Travels</h2></div>
            <Link href="/travel" className="section-link" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-label)", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--clr-text-muted)" }}>All destinations</Link>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {destinations.slice(0, 3).map((d, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <Link href="/travel" className="dest-card">
                <img src={d.img} alt={d.name} loading="lazy" />
                <div className="dest-card-overlay">
                  <p className="dest-card-country">{d.country}</p>
                  <h3 className="dest-card-name">{d.name}</h3>
                  <p className="dest-card-meta" style={{ marginTop: "1rem", fontSize: "var(--fs-sm)", color: "var(--clr-text-muted)" }}>{d.meta}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* THE CONNECTION CTA */}
      <section className="manifesto" style={{ borderTop: "1px solid var(--clr-border)" }}>
        <Reveal>
          <p className="section-label" style={{ marginBottom: "1.5rem" }}>The Connection</p>
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>Looking for a Partner Who Gets It</h2>
          <p style={{ color: "var(--clr-text-muted)", maxWidth: "600px", marginInline: "auto", lineHeight: "1.7", marginBottom: "2rem" }}>
            Not just someone who checks boxes. Someone who reads, thinks, builds, and sees the world through a lens of curiosity. If that sounds like you, I'd love to know.
          </p>
          <Link href="/connect" className="btn btn-primary">Begin the Conversation \u2192</Link>
        </Reveal>
      </section>
    </main>
  );
}
