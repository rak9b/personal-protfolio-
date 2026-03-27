"use client";
import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface FormGateContextType {
  formCompleted: boolean;
  markFormCompleted: () => void;
}

const FormGateContext = createContext<FormGateContextType>({
  formCompleted: false,
  markFormCompleted: () => {},
});

export function useFormGate() {
  return useContext(FormGateContext);
}

const INITIAL_DELAY = 90; // 90 seconds first warning
const WARNING_INTERVAL = 15; // 15 seconds between warnings
const MAX_WARNINGS = 4; // After 4 warnings, blur permanently

export default function FormGate({ children }: { children: React.ReactNode }) {
  const [formCompleted, setFormCompleted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [isBlurred, setIsBlurred] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_DELAY);
  const [phase, setPhase] = useState<"waiting" | "warning" | "blurred">("waiting");
  const router = useRouter();
  const pathname = usePathname();

  // Check localStorage on mount
  useEffect(() => {
    const completed = localStorage.getItem("form-completed");
    if (completed === "true") {
      setFormCompleted(true);
      setPhase("waiting");
    }
  }, []);

  const markFormCompleted = useCallback(() => {
    setFormCompleted(true);
    setIsBlurred(false);
    setShowWarning(false);
    setPhase("waiting");
    localStorage.setItem("form-completed", "true");
  }, []);

  // Skip enforcement on questionnaire and connect pages
  const isFormPage = pathname === "/questionnaire" || pathname === "/connect";

  // Timer logic
  useEffect(() => {
    if (formCompleted || isFormPage) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Time's up for this phase
          if (phase === "waiting") {
            // Show first warning
            setShowWarning(true);
            setWarningCount(1);
            setPhase("warning");
            return WARNING_INTERVAL;
          } else if (phase === "warning") {
            const newCount = warningCount + 1;
            if (newCount > MAX_WARNINGS) {
              // Blur permanently
              setIsBlurred(true);
              setShowWarning(true);
              setPhase("blurred");
              clearInterval(timer);
              return 0;
            }
            setWarningCount(newCount);
            setShowWarning(true);
            return WARNING_INTERVAL;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [formCompleted, isFormPage, phase, warningCount]);

  const dismissWarning = () => {
    if (phase !== "blurred") {
      setShowWarning(false);
    }
  };

  const goToForm = () => {
    setShowWarning(false);
    router.push("/connect");
  };

  return (
    <FormGateContext.Provider value={{ formCompleted, markFormCompleted }}>
      <div style={{
        filter: isBlurred ? "blur(12px) brightness(0.4)" : "none",
        transition: "filter 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: isBlurred ? "none" : "auto",
      }}>
        {children}
      </div>

      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isBlurred ? "rgba(8, 8, 10, 0.85)" : "rgba(8, 8, 10, 0.6)",
              backdropFilter: isBlurred ? "none" : "blur(8px)",
              padding: "2rem",
            }}
            onClick={isBlurred ? undefined : dismissWarning}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", duration: 0.6 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "520px",
                width: "100%",
                background: "#111115",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "clamp(2rem, 5vw, 3rem)",
                textAlign: "center",
                position: "relative",
              }}
            >
              {/* Glowing accent bar */}
              <div style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "60%",
                height: "2px",
                background: "linear-gradient(90deg, transparent, #C8A96E, transparent)",
              }} />

              {/* Icon */}
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
              }}>
                {isBlurred ? "⚠" : "✨"}
              </div>

              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: isBlurred ? "clamp(1.5rem, 3vw, 2.2rem)" : "clamp(1.2rem, 2.5vw, 1.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
                color: "#F2F0EA",
              }}>
                {isBlurred ? "Content Locked" : warningCount <= 2 ? "Before you go further..." : "Last chance!"}
              </h2>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
                lineHeight: 1.7,
                color: "rgba(242, 240, 234, 0.55)",
                marginBottom: "2rem",
                maxWidth: "400px",
                marginInline: "auto",
              }}>
                {isBlurred
                  ? "This website's content is now hidden. To continue exploring, please complete the questionnaire. Your responses are encrypted and treated with care."
                  : warningCount <= 2
                  ? "I'd love to know more about you. Take a moment to fill out the questionnaire — it helps me understand if we're on the same wavelength."
                  : "This is your final reminder. The website content will be locked shortly if the questionnaire is not completed."}
              </p>

              {/* Warning counter */}
              {!isBlurred && (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "6px",
                  marginBottom: "1.5rem",
                }}>
                  {Array.from({ length: MAX_WARNINGS }).map((_, i) => (
                    <div key={i} style={{
                      width: "28px",
                      height: "3px",
                      borderRadius: "2px",
                      background: i < warningCount ? "#C8A96E" : "rgba(255, 255, 255, 0.1)",
                      transition: "background 0.3s",
                    }} />
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" as any }}>
                <button
                  onClick={goToForm}
                  style={{
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
                    transition: "all 0.32s",
                  }}
                >
                  {isBlurred ? "Unlock → Fill Questionnaire" : "Fill Questionnaire →"}
                </button>
                {!isBlurred && (
                  <button
                    onClick={dismissWarning}
                    style={{
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
                      transition: "all 0.32s",
                    }}
                  >
                    Not now ({MAX_WARNINGS - warningCount} left)
                  </button>
                )}
              </div>

              {!isBlurred && (
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  color: "rgba(242, 240, 234, 0.22)",
                  marginTop: "1.5rem",
                }}>
                  Next reminder in {secondsLeft}s · {MAX_WARNINGS - warningCount} {MAX_WARNINGS - warningCount === 1 ? "reminder" : "reminders"} remaining
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </FormGateContext.Provider>
  );
}
