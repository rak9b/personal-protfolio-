"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ConnectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/questionnaire");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <main className="connect-page">
        <div className="connect-card" style={{ textAlign: "center" }}>
          <div className="google-spinner" />
          <p style={{ marginTop: "1rem", color: "var(--clr-text-mid)" }}>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="connect-page">
      <motion.div
        className="connect-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-label)",
          letterSpacing: ".22em",
          textTransform: "uppercase" as const,
          color: "var(--clr-accent)",
          marginBottom: "1.5rem"
        }}>
          Private Portal
        </p>
        <h1>The Connection</h1>
        <p style={{ marginBottom: "2rem", lineHeight: 1.7 }}>
          This is a private space. Sign in with your Google account to continue.
          <br /><br />
          Your identity helps me know who you are — and keeps this conversation personal.
        </p>

        <button
          onClick={() => signIn("google")}
          className="google-signin-btn"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" style={{ flexShrink: 0 }}>
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Sign in with Google</span>
        </button>

        <p style={{ marginTop: "2rem", fontSize: "0.75rem", color: "var(--clr-text-dim)", lineHeight: 1.6 }}>
          Your email is used only for identification. Nothing is shared or stored beyond this session.
        </p>
      </motion.div>
    </main>
  );
}
