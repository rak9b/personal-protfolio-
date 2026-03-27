"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { identity, aboutImages, stats, techStack, socials } from "@/lib/siteConfig";

export default function AboutPage() {
  return (
    <main>
      <header className="page-hero">
        <Reveal><p className="page-hero-eyebrow">{identity.tagline}</p></Reveal>
        <Reveal delay={0.1}><h1 className="page-hero-title">Origin</h1></Reveal>
        <Reveal delay={0.2}><p className="page-hero-sub">The story behind the work. Not a resume \u2014 a perspective. How movement, reading, and building shaped the way I see the world.</p></Reveal>
      </header>

      <section className="container" style={{ paddingBlock: "clamp(5rem,12vh,10rem)" }}>
        <div className="about-chapter">
          <Reveal><div className="about-img-wrap"><img src={aboutImages.traveler} alt="Traveler" /></div></Reveal>
          <Reveal direction="right">
            <div>
              <p className="about-num">01 \u2014 ORIGIN</p>
              <h2 className="about-title">Where I Came From</h2>
              <div className="about-body">
                <p>Growing up, I first learned that the most interesting things happen at the edges \u2014 between disciplines, between cultures, between the person you were yesterday and the one you're becoming.</p>
                <p>My first trip abroad changed the way I understood home. My hundredth trip taught me that curiosity is not a personality trait \u2014 it's a practice.</p>
                <p>I studied computer science because I wanted to build things. I travel because I want to understand what to build, and for whom.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="manifesto">
        <motion.blockquote className="manifesto-quote" initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          \u201c{identity.manifesto}\u201d
        </motion.blockquote>
      </section>

      <section className="container" style={{ paddingBlock: "clamp(5rem,12vh,10rem)" }}>
        <div className="about-chapter" style={{ direction: "rtl" as any }}>
          <Reveal><div className="about-img-wrap" style={{ direction: "ltr" }}><img src={aboutImages.books} alt="Books" /></div></Reveal>
          <Reveal direction="left">
            <div style={{ direction: "ltr" }}>
              <p className="about-num">02 \u2014 THINKING</p>
              <h2 className="about-title">How I See the World</h2>
              <div className="about-body">
                <p>I read roughly 20 books a year. Not to finish them \u2014 to argue with them.</p>
                <p>I believe constraints make better designers. I believe boring technology is often the right technology.</p>
                <p>I write to think. What you find in Field Notes is not conclusions \u2014 it's the thinking in progress.</p>
              </div>
              <Link href="/thinking" className="link-arrow" style={{ marginTop: "2rem", display: "inline-flex" }}>Read Field Notes \u2192</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container" style={{ paddingBlock: "clamp(5rem,12vh,10rem)" }}>
        <div className="about-chapter">
          <Reveal><div className="about-img-wrap"><img src={aboutImages.code} alt="Code" /></div></Reveal>
          <Reveal direction="right">
            <div>
              <p className="about-num">03 \u2014 BUILDING</p>
              <h2 className="about-title">What I Make</h2>
              <div className="about-body">
                <p>I'm a software engineer who cares about the details that most people consider optional \u2014 performance, accessibility, copy that actually speaks to users.</p>
                <p>My approach: understand the problem deeply before touching a keyboard. Build incrementally. Ship early, learn fast, iterate with intention.</p>
              </div>
              <div className="tech-grid">
                {techStack.map(t => (<span key={t} className="tech-badge">{t}</span>))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container" style={{ paddingBlock: "clamp(5rem,12vh,10rem)", borderBottom: "1px solid var(--clr-border)" }}>
        <div className="about-chapter" style={{ direction: "rtl" as any }}>
          <Reveal><div className="about-img-wrap" style={{ direction: "ltr" }}><img src={aboutImages.horizon} alt="Horizon" /></div></Reveal>
          <Reveal direction="left">
            <div style={{ direction: "ltr" }}>
              <p className="about-num">04 \u2014 NOW</p>
              <h2 className="about-title">Where I Am Today</h2>
              <div className="about-body">
                <p>Currently working on building systems and exploring new ideas. Recently returned from my latest trip. Next destination: wherever curiosity takes me.</p>
                <p>Reading: <em>The Remains of the Day</em> by Kazuo Ishiguro. Thinking about: the intersection of technology and human connection.</p>
                <p>If you're someone who values depth, curiosity, and genuine connection, I'd love to hear from you.</p>
              </div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" as any }}>
                <Link href="/connect" className="btn btn-primary">Begin a Conversation</Link>
                <a href={socials.github.url} className="btn btn-ghost" target="_blank" rel="noopener">{socials.github.label}</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container section-pad">
        <div className="stats-grid">
          <Counter target={stats.countries} suffix="+" label="Countries visited" />
          <Counter target={stats.books} label="Books read" />
          <Counter target={stats.projects} label="Projects shipped" />
          <Counter target={stats.yearsEngineering} label="Years engineering" />
        </div>
      </section>
    </main>
  );
}
