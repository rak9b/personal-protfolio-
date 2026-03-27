"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { destinations, featuredTravel, stats } from "@/lib/siteConfig";

export default function TravelPage() {
  return (
    <main>
      <header className="page-hero">
        <Reveal><p className="page-hero-eyebrow">{stats.countries}+ countries \u00b7 counting</p></Reveal>
        <Reveal delay={0.1}><h1 className="page-hero-title">Dispatches</h1></Reveal>
        <Reveal delay={0.2}><p className="page-hero-sub">Not travel guides. Not itineraries. Field reports from places that changed the way I think.</p></Reveal>
      </header>
      <div className="featured-layout">
        <aside className="featured-sticky">
          <div className="featured-sticky-bg"><img src={featuredTravel.img} alt="Featured" loading="lazy" /></div>
          <div className="featured-sticky-body">
            <p className="featured-label">Featured Dispatch</p>
            <h2 className="featured-title">{featuredTravel.title}</h2>
            <p className="featured-meta">{featuredTravel.country}</p>
            <blockquote className="featured-quote">\u201c{featuredTravel.quote}\u201d</blockquote>
          </div>
        </aside>
        <div className="featured-content">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {destinations.map((d, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="dest-card">
                  <img src={d.img} alt={d.name} loading="lazy" />
                  <div className="dest-card-overlay">
                    <p className="dest-card-country">{d.country}</p>
                    <h3 className="dest-card-name">{d.name}</h3>
                    <p className="dest-card-meta" style={{ marginTop: "1rem", fontSize: "var(--fs-sm)", color: "var(--clr-text-muted)" }}>{d.readTime}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
