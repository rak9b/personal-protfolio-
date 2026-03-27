"use client";
import Reveal from "@/components/ui/Reveal";
import { fieldNotes } from "@/lib/siteConfig";

export default function ThinkingPage() {
  return (
    <main>
      <header className="page-hero">
        <Reveal><p className="page-hero-eyebrow">Thoughts in progress</p></Reveal>
        <Reveal delay={0.1}><h1 className="page-hero-title">Field Notes</h1></Reveal>
        <Reveal delay={0.2}><p className="page-hero-sub">Not conclusions. Not manifestos. Just the thinking in progress.</p></Reveal>
      </header>
      <section className="container section-pad">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {fieldNotes.map((n, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article className="card">
                <div className="card-img-wrap"><img src={n.img} alt={n.title} loading="lazy" /></div>
                <div className="card-body">
                  <p className="card-label">{n.label}</p>
                  <h3 className="card-title">{n.title}</h3>
                  <p className="card-excerpt">{n.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
