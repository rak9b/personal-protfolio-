"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface TourStep {
  target: string; // CSS selector or description
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right" | "center";
  highlight?: { top: string; left: string; width: string; height: string };
}

const tourSteps: TourStep[] = [
  {
    target: ".nav-links",
    title: "Navigate the Story",
    description: "Explore different chapters of the experience: Dispatches (travels), Archives (books), Field Notes (essays), Reels (films), and Origin (about).",
    position: "bottom",
  },
  {
    target: ".hero-content",
    title: "The Hero Introduction",
    description: "This is the landing — a 3D interactive scene with floating particles. Scroll down to discover more about the person behind this site.",
    position: "bottom",
  },
  {
    target: ".nav-connect",
    title: "The Connection",
    description: "This button leads to the matchmaking questionnaire. It is the most important part of this website — fill it out to unlock the full experience.",
    position: "bottom",
  },
  {
    target: ".split-panel",
    title: "Two Sides of the Story",
    description: "Click to explore either the Traveler side (destinations & dispatches) or the Engineer side (projects & thinking).",
    position: "center",
  },
  {
    target: ".stats-grid",
    title: "The Numbers",
    description: "Key stats at a glance: countries visited, books read, projects shipped, and years of experience. These numbers tell a story of commitment.",
    position: "top",
  },
];

export default function GuidedTour() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [dismissed, setDismissed] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const tourDone = localStorage.getItem("tour-completed");
    if (tourDone === "true" || pathname !== "/") {
      setDismissed(true);
      return;
    }
    // Show welcome after a brief delay
    const timer = setTimeout(() => setShowWelcome(true), 3000);
    return () => clearTimeout(timer);
  }, [pathname]);

  const startTour = () => {
    setShowWelcome(false);
    setCurrentStep(0);
  };

  const skipTour = () => {
    setShowWelcome(false);
    setDismissed(true);
    localStorage.setItem("tour-completed", "true");
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Try to scroll to the target
      const step = tourSteps[currentStep + 1];
      const el = document.querySelector(step.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      setCurrentStep(-1);
      setDismissed(true);
      localStorage.setItem("tour-completed", "true");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const step = tourSteps[currentStep - 1];
      const el = document.querySelector(step.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  if (dismissed && currentStep === -1) return null;

  const step = currentStep >= 0 ? tourSteps[currentStep] : null;

  return (
    <>
      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcome && !dismissed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(8, 8, 10, 0.7)",
              backdropFilter: "blur(8px)",
              padding: "2rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              style={{
                maxWidth: "480px",
                width: "100%",
                background: "#111115",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "clamp(2rem, 5vw, 3rem)",
                textAlign: "center",
              }}
            >
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(200, 169, 110, 0.12)",
                border: "1.5px solid rgba(200, 169, 110, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "1.5rem",
              }}>👋</div>

              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
                color: "#F2F0EA",
              }}>Welcome, Explorer</h2>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
                lineHeight: 1.7,
                color: "rgba(242, 240, 234, 0.55)",
                marginBottom: "2rem",
              }}>
                This isn't just a website — it's a story. Let me show you around so you know where everything is and how to explore it.
              </p>

              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                <button onClick={startTour} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#08080A",
                  background: "#C8A96E",
                  border: "none",
                  padding: "0.875rem 2rem",
                  borderRadius: "100px",
                  cursor: "pointer",
                }}>Show Me Around</button>
                <button onClick={skipTour} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#F2F0EA",
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  padding: "0.875rem 2rem",
                  borderRadius: "100px",
                  cursor: "pointer",
                }}>I'll Explore Myself</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tour Step Overlay */}
      <AnimatePresence>
        {step && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
              background: "rgba(8, 8, 10, 0.5)",
              pointerEvents: "auto",
            }}
            onClick={nextStep}
          >
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "fixed",
                bottom: "3rem",
                left: "50%",
                transform: "translateX(-50%)",
                maxWidth: "500px",
                width: "90%",
                background: "#111115",
                border: "1px solid rgba(200, 169, 110, 0.3)",
                borderRadius: "12px",
                padding: "1.5rem 2rem",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Step indicator */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C8A96E",
                }}>{currentStep + 1} / {tourSteps.length}</span>
                <div style={{ display: "flex", gap: "4px" }}>
                  {tourSteps.map((_, i) => (
                    <div key={i} style={{
                      width: "20px",
                      height: "2px",
                      borderRadius: "1px",
                      background: i <= currentStep ? "#C8A96E" : "rgba(255, 255, 255, 0.1)",
                    }} />
                  ))}
                </div>
              </div>

              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.2rem",
                fontWeight: 800,
                marginBottom: "0.5rem",
                color: "#F2F0EA",
              }}>{step.title}</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.88rem",
                lineHeight: 1.65,
                color: "rgba(242, 240, 234, 0.55)",
                marginBottom: "1.25rem",
              }}>{step.description}</p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button onClick={prevStep} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(242, 240, 234, 0.4)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  visibility: currentStep === 0 ? "hidden" : "visible",
                }}>← Back</button>
                <button onClick={nextStep} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#08080A",
                  background: "#C8A96E",
                  border: "none",
                  padding: "0.65rem 1.5rem",
                  borderRadius: "100px",
                  cursor: "pointer",
                }}>{currentStep === tourSteps.length - 1 ? "Let's Go! →" : "Next →"}</button>
              </div>
              <button onClick={() => { setCurrentStep(-1); setDismissed(true); localStorage.setItem("tour-completed", "true"); }} style={{
                position: "absolute",
                top: "0.75rem",
                right: "1rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(242, 240, 234, 0.3)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}>Skip Tour</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
