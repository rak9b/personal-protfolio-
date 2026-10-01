"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { identity, heroImages, stats, projects, experiences, skillsCategories, fieldNotes } from "@/lib/siteConfig";
import { ExternalLink, Github, CheckCircle2, Briefcase, Code2, ArrowRight } from "lucide-react";

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
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <Link href="/projects" className="hero-cta">View Flagship Projects</Link>
            <Link href="/contact" className="btn btn-ghost">Get In Touch</Link>
          </div>
        </motion.div>
        <div className="hero-scroll"><span>Scroll</span><div className="scroll-line" /></div>
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

      {/* FEATURED PROJECTS SHOWCASE */}
      <section className="container section-pad">
        <Reveal>
          <div className="section-header">
            <div>
              <p className="section-label">Proof of Capability</p>
              <h2 className="section-title">Flagship Engineering Projects</h2>
            </div>
            <Link href="/projects" className="section-link" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-label)", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--clr-text-muted)" }}>
              All projects →
            </Link>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
          {projects.map((p, idx) => (
            <Reveal key={p.id} delay={idx * 0.12}>
              <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div className="card-img-wrap" style={{ height: "200px" }}>
                  <img src={p.image} alt={p.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className="card-body" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <p className="card-label">{p.tagline}</p>
                  <h3 className="card-title" style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{p.title}</h3>
                  <p className="card-excerpt" style={{ marginBottom: "1rem", flex: 1 }}>{p.description}</p>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                    {p.tech.slice(0, 4).map((t, i) => (
                      <span key={i} style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem", borderRadius: "4px", background: "var(--clr-border)", fontFamily: "var(--font-mono)" }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem", borderTop: "1px solid var(--clr-border)", paddingTop: "1rem" }}>
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, padding: "0.5rem", fontSize: "0.8rem", textAlign: "center" }}>
                      View Project
                    </a>
                    <a href={p.codeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: "0.5rem 0.8rem", fontSize: "0.8rem" }}>
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERIENCE TIMELINE SUMMARY */}
      <section className="container section-pad">
        <Reveal>
          <div className="section-header">
            <div>
              <p className="section-label">Track Record</p>
              <h2 className="section-title">Work Experience & AI Automation</h2>
            </div>
            <Link href="/experience" className="section-link" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-label)", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--clr-text-muted)" }}>
              Full history →
            </Link>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {experiences.map((exp, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="card" style={{ padding: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--clr-text)" }}>{exp.role}</h3>
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--clr-accent)" }}>{exp.period}</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--clr-text-muted)", marginBottom: "1rem" }}>
                  {exp.company} · {exp.location}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {exp.highlights.slice(0, 3).map((item, i) => (
                    <li key={i} style={{ fontSize: "0.8rem", color: "var(--clr-text-muted)", marginBottom: "0.6rem", display: "flex", gap: "0.5rem" }}>
                      <span style={{ color: "var(--clr-accent)" }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TECH STACK CHIPS */}
      <section className="container section-pad">
        <Reveal>
          <div className="section-header">
            <div>
              <p className="section-label">Core Competencies</p>
              <h2 className="section-title">Technical Mastery</h2>
            </div>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {skillsCategories.map((cat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="card" style={{ padding: "1.5rem" }}>
                <h4 style={{ fontSize: "0.85rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", color: "var(--clr-accent)", marginBottom: "1rem" }}>
                  {cat.category}
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {cat.items.map((skill, sIdx) => (
                    <span key={sIdx} style={{ fontSize: "0.75rem", padding: "0.3rem 0.6rem", borderRadius: "6px", background: "var(--clr-border)", color: "var(--clr-text)" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MANIFESTO / ENGINEERING STATEMENT */}
      <section className="manifesto">
        <motion.blockquote className="manifesto-quote" initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          “{identity.manifesto}”
        </motion.blockquote>
        <Reveal delay={0.3}><p className="manifesto-attr">Engineering Principles — MD. Rakibul Islam</p></Reveal>
        <Reveal delay={0.4}>
          <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="/projects" className="btn btn-primary">Explore Projects →</Link>
            <Link href="/contact" className="btn btn-ghost">Discuss a Project</Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
