"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useFormGate } from "@/components/ui/FormGate";

const steps = [
  {
    id: "personal",
    number: "01 / 10",
    title: "First, the basics.",
    subtitle: "Just enough to know who I'm talking to.",
    fields: [
      { name: "fullName", label: "Your full name", type: "text", placeholder: "Enter your name" },
      { name: "age", label: "Your age", type: "text", placeholder: "e.g. 28" },
      { name: "location", label: "Where are you based?", type: "text", placeholder: "City, Country" },
      { name: "socialLink", label: "Instagram or social link (optional)", type: "text", placeholder: "@username or URL" },
    ],
  },
  {
    id: "personality",
    number: "02 / 10",
    title: "Tell me about yourself.",
    subtitle: "Not your resume. The real you.",
    fields: [
      { name: "personalityDescription", label: "How would your closest friend describe you in 3 words?", type: "text", placeholder: "e.g. Curious, Empathetic, Restless" },
      { name: "uniqueTrait", label: "What's something about you that surprises people?", type: "textarea", placeholder: "Share something unexpected..." },
      { name: "introvertExtrovert", label: "Are you more introverted or extroverted?", type: "radio", options: ["Deeply Introverted", "Lean Introverted", "Ambivert", "Lean Extroverted", "Deeply Extroverted"] },
    ],
  },
  {
    id: "relationship",
    number: "03 / 10",
    title: "Relationship & Emotional Depth",
    subtitle: "What matters most to you in a partnership.",
    fields: [
      { name: "loveLanguage", label: "Your primary love language?", type: "radio", options: ["Words of Affirmation", "Quality Time", "Acts of Service", "Physical Touch", "Gifts / Thoughtful Gestures"] },
      { name: "idealPartnership", label: "Describe your ideal partnership in 2-3 sentences.", type: "textarea", placeholder: "What does it look like day-to-day?" },
      { name: "dealbreaker", label: "What is one non-negotiable in a relationship?", type: "textarea", placeholder: "Be honest..." },
    ],
  },
  {
    id: "lifestyle",
    number: "04 / 10",
    title: "A Normal Sunday",
    subtitle: "How you spend unstructured time tells me everything.",
    fields: [
      { name: "sundayMorning", label: "Describe your ideal Sunday from 8 AM to 2 PM. Be specific.", type: "textarea", placeholder: "Wake up at... Then..." },
      { name: "dailyRoutine", label: "How do you spend most of your evenings?", type: "radio", options: ["Reading / Learning", "Watching shows / Movies", "Socializing / Out with friends", "Working on projects / Creating", "Exercise / Outdoor activity", "A mix of everything"] },
      { name: "travelStyle", label: "Your travel style?", type: "radio", options: ["Backpacker — rough and authentic", "Balanced — comfort with adventure", "Luxury — planned and premium", "Spontaneous — no plans, just go"] },
    ],
  },
  {
    id: "media",
    number: "05 / 10",
    title: "What feeds your mind?",
    subtitle: "Books, movies, media — the lens through which you see the world.",
    fields: [
      { name: "lastBook", label: "Last book that changed your thinking?", type: "text", placeholder: "Title and why it mattered" },
      { name: "favoriteMovie", label: "A movie you could watch 10 times and still find something new?", type: "text", placeholder: "Title" },
      { name: "perspectiveChange", label: "What piece of media (book, film, art) made you change your perspective on something?", type: "textarea", placeholder: "This is how I know if you're a thinker..." },
    ],
  },
  {
    id: "growth",
    number: "06 / 10",
    title: "Self-Growth & Ambition",
    subtitle: "Where you're heading matters more than where you've been.",
    fields: [
      { name: "currentGoal", label: "What's the one thing you're currently working on improving about yourself?", type: "textarea", placeholder: "Be specific..." },
      { name: "fiveYears", label: "Where do you see your life in 5 years?", type: "textarea", placeholder: "Not just career — lifestyle, location, state of mind." },
      { name: "unpopularBelief", label: "What is a belief or value you hold that most people might disagree with?", type: "textarea", placeholder: "Tests independent thinking..." },
    ],
  },
  {
    id: "values",
    number: "07 / 10",
    title: "Values & Non-Negotiables",
    subtitle: "What do you actually stand for?",
    fields: [
      { name: "topValues", label: "Your top 3 life values?", type: "text", placeholder: "e.g. Honesty, Freedom, Growth" },
      { name: "societySkip", label: "What is something society values highly in a relationship that you honestly don't care about?", type: "textarea", placeholder: "The dealbreaker flip..." },
      { name: "successDefinition", label: "How do you define a successful life?", type: "textarea", placeholder: "In your own words..." },
    ],
  },
  {
    id: "family",
    number: "08 / 10",
    title: "Family & Expectations",
    subtitle: "The practical realities that matter.",
    fields: [
      { name: "familyRole", label: "What role does family play in your life right now?", type: "textarea", placeholder: "Close, distant, complicated?" },
      { name: "familyExpectations", label: "Do your family's expectations influence your choices? How?", type: "textarea", placeholder: "Be honest — there's no wrong answer." },
      { name: "livingPreference", label: "Your ideal living situation?", type: "radio", options: ["Urban — big city energy", "Suburban — space with access", "Rural — nature and quiet", "Nomadic — no fixed base", "Flexible — open to anything"] },
    ],
  },
  {
    id: "conflict",
    number: "09 / 10",
    title: "When Things Get Hard",
    subtitle: "This is the most important section. How you handle difficult moments defines compatibility.",
    fields: [
      { name: "conflictStyle", label: "When we have our first major disagreement, do you need space or do you need to talk it out immediately?", type: "radio", options: ["Need space first, then talk", "Talk it out immediately", "Write it down and share later", "Depends on the situation"] },
      { name: "stressResponse", label: "How do you behave when you're highly stressed?", type: "textarea", placeholder: "Do you withdraw? Get irritable? Need support? Over-work?" },
      { name: "apologyStyle", label: "How do you apologize?", type: "radio", options: ["Direct — I say sorry and mean it", "Acts — I show it through actions", "Time — I need to process first", "I struggle with apologizing"] },
    ],
  },
  {
    id: "final",
    number: "10 / 10",
    title: "Final Reflection",
    subtitle: "One last thing. No right answers — just honest ones.",
    fields: [
      { name: "whyMe", label: "Why are you here? What made you fill this out?", type: "textarea", placeholder: "Be real..." },
      { name: "questionForMe", label: "Ask me one question. Anything you want to know.", type: "textarea", placeholder: "Your turn..." },
      { name: "anythingElse", label: "Anything else you want me to know?", type: "textarea", placeholder: "Say whatever you need to say." },
    ],
  },
];

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { markFormCompleted } = useFormGate();

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const updateField = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        markFormCompleted(); // Unlock the site!
      }
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <main>
        <div className="success-container">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }}>
            <div className="success-icon">✓</div>
          </motion.div>
          <motion.h2 className="success-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>Thank you.</motion.h2>
          <motion.p className="success-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            Your responses have been received and encrypted. If there's a connection here, you'll hear from me. Take care of yourself.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <Link href="/" className="btn btn-ghost" style={{ marginTop: "2rem" }}>Back to Home</Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="questionnaire">
      <div className="q-progress"><div className="q-progress-bar" style={{ width: progress + "%" }} /></div>
      <div className="q-header">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>The Connection</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          Take your time. Be honest. There are no right answers — only real ones.
        </motion.p>
      </div>

      <div className="step-container">
        <AnimatePresence mode="wait">
          <motion.div key={step.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <p className="step-number">{step.number}</p>
            <h2 className="step-title">{step.title}</h2>
            <p className="step-subtitle">{step.subtitle}</p>

            {step.fields.map((field) => (
              <div key={field.name} className="form-group">
                <label className="form-label">{field.label}</label>
                {field.type === "text" && (
                  <input
                    type="text"
                    className="form-input"
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => updateField(field.name, e.target.value)}
                  />
                )}
                {field.type === "textarea" && (
                  <textarea
                    className="form-textarea"
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => updateField(field.name, e.target.value)}
                  />
                )}
                {field.type === "radio" && field.options && (
                  <div className="form-radio-group">
                    {field.options.map((opt) => (
                      <label
                        key={opt}
                        className={"form-radio" + (formData[field.name] === opt ? " selected" : "")}
                        onClick={() => updateField(field.name, opt)}
                      >
                        <input type="radio" name={field.name} value={opt} />
                        <div className="form-radio-dot" />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="step-nav">
              <button onClick={prevStep} className="btn btn-ghost" style={{ visibility: currentStep === 0 ? "hidden" : "visible" }}>← Back</button>
              <span className="step-counter">{currentStep + 1} / {steps.length}</span>
              {currentStep < steps.length - 1 ? (
                <button onClick={nextStep} className="btn btn-primary">Next →</button>
              ) : (
                <button onClick={handleSubmit} className="btn btn-primary" disabled={submitting}>{submitting ? "Submitting..." : "Submit →"}</button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
