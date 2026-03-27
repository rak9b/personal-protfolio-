"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { identity, socials } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="site-footer">
      <motion.p className="footer-statement" initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}>
        Move. Think.<br />Build. Repeat.
      </motion.p>
      <div className="footer-bottom">
        <nav className="footer-nav">
          <Link href="/travel">Dispatches</Link>
          <Link href="/books">Archives</Link>
          <Link href="/thinking">Field Notes</Link>
          <Link href="/movies">Reels</Link>
          <Link href="/about">Origin</Link>
        </nav>
        <div className="footer-socials">
          <a href={socials.github.url} className="social-link" target="_blank" rel="noopener">{socials.github.label}</a>
          <a href={socials.instagram.url} className="social-link" target="_blank" rel="noopener">{socials.instagram.label}</a>
          <a href={socials.linkedin.url} className="social-link" target="_blank" rel="noopener">{socials.linkedin.label}</a>
          <a href={socials.twitter.url} className="social-link" target="_blank" rel="noopener">{socials.twitter.label}</a>
        </div>
        <p className="footer-copy">\u00a9 2026 {identity.name} \u2014 {identity.email}</p>
      </div>
    </footer>
  );
}
