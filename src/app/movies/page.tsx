"use client";
import Reveal from "@/components/ui/Reveal";
import { movies } from "@/lib/siteConfig";

export default function MoviesPage() {
  return (
    <main>
      <header className="page-hero">
        <Reveal><p className="page-hero-eyebrow">Cinema \u00b7 Curated</p></Reveal>
        <Reveal delay={0.1}><h1 className="page-hero-title">Reels</h1></Reveal>
        <Reveal delay={0.2}><p className="page-hero-sub">Films that shaped how I see stories, people, and the world.</p></Reveal>
      </header>
      <section className="container section-pad">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {movies.map((m, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article className="card">
                <div className="card-img-wrap"><img src={m.img} alt={m.title} loading="lazy" /></div>
                <div className="card-body">
                  <p className="card-label">{m.director} \u00b7 {m.year}</p>
                  <h3 className="card-title">{m.title}</h3>
                  <p className="card-excerpt">{m.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
