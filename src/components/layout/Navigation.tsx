"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const links = [
  { href: "/travel", label: "Dispatches" },
  { href: "/books", label: "Archives" },
  { href: "/thinking", label: "Field Notes" },
  { href: "/movies", label: "Reels" },
  { href: "/about", label: "Origin" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? "hidden" : "";
  };

  return (
    <>
      <nav className={"site-nav" + (scrolled ? " scrolled" : "")}>
        <Link href="/" className="nav-logo">
          <span className="logo-sym">↳</span> Your Name
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={"nav-link" + (pathname === l.href ? " active" : "")}>
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <ThemeToggle />
          {session ? (
            <>
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt=""
                  style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid var(--clr-border-mid)" }}
                />
              )}
              <button onClick={() => signOut()} className="nav-connect" style={{ fontSize: "0.75rem" }}>
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/connect" className="nav-connect">Begin →</Link>
          )}
          <button className={"nav-toggle" + (mobileOpen ? " open" : "")} onClick={toggleMobile} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={"mobile-nav" + (mobileOpen ? " open" : "")}>
        <Link href="/" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Home</Link>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
            {l.label}
          </Link>
        ))}
        {session ? (
          <button
            className="mobile-nav-link"
            onClick={() => { setMobileOpen(false); signOut(); }}
            style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", color: "inherit", font: "inherit" }}
          >
            Sign Out
          </button>
        ) : (
          <Link href="/connect" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Begin</Link>
        )}
      </div>
    </>
  );
}
