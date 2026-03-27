"use client";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import { identity, socials } from "@/lib/siteConfig";

export default function ContactPage() {
  const socialList = [
    { platform: "GitHub", name: socials.github.label, url: socials.github.url },
    { platform: "Instagram", name: socials.instagram.label, url: socials.instagram.url },
    { platform: "LinkedIn", name: socials.linkedin.label, url: socials.linkedin.url },
    { platform: "X / Twitter", name: socials.twitter.label, url: socials.twitter.url },
  ];

  return (
    <main>
      <section className="contact-hero container" style={{ paddingBottom: "clamp(4rem,10vh,8rem)" }}>
        <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          <div className="contact-big">Let's begin<br /><em>something.</em></div>
        </motion.div>
        <Reveal><a href={"mailto:" + identity.email} className="contact-email">{identity.email}</a></Reveal>
        <Reveal delay={0.2}><p style={{ marginTop: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "var(--fs-label)", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--clr-text-ghost)" }}>\u21b3 I typically respond within 48 hours</p></Reveal>

        <Reveal delay={0.3}>
          <div className="contact-socials">
            <p className="contact-socials-label">Find me on</p>
            <div className="contact-socials-grid">
              {socialList.map((s) => (
                <a key={s.platform} href={s.url} className="contact-social-item" target="_blank" rel="noopener">
                  <span className="contact-social-platform">{s.platform}</span>
                  <span className="contact-social-name">{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div style={{ marginTop: "clamp(4rem,10vh,8rem)", borderTop: "1px solid var(--clr-border)", paddingTop: "clamp(3rem,6vh,5rem)", textAlign: "center" }}>
            <p className="section-label" style={{ marginBottom: "1.5rem" }}>Something Deeper?</p>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>The Match Portal</h2>
            <p style={{ color: "var(--clr-text-muted)", maxWidth: "500px", marginInline: "auto", lineHeight: "1.7", marginBottom: "2rem" }}>
              If you're here because you're interested in a real connection \u2014 not just a conversation \u2014 there's a private portal where you can tell me about yourself.
            </p>
            <Link href="/connect" className="btn btn-primary">Enter the Portal \u2192</Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
