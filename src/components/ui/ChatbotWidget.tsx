"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const DEFAULT_QUESTIONS = [
  "What are your core Full-Stack technologies?",
  "Tell me about your AI automation work at SimplifAI",
  "How did you implement real-time tracking in RiderApp?",
  "What is LocalGems and what problem does it solve?",
  "Are you open to full-time remote engineering roles?"
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am Rakibul's AI Digital Twin. I can answer questions about his production engineering experience at SimplifAI and Imranslab, his flagship projects (LocalGems, RiderApp, Akademi), and his tech stack. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(DEFAULT_QUESTIONS);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

  useEffect(() => {
    fetch(`${apiUrl}/chatbot/suggested-questions`)
      .then((res) => res.json())
      .then((data) => {
        if (data.questions && data.questions.length > 0) {
          setSuggestedQuestions(data.questions);
        }
      })
      .catch(() => {});
  }, [apiUrl]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage: Message = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const history = messages.slice(-8).map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch(`${apiUrl}/chatbot/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          conversationHistory: history
        })
      });

      if (!res.ok) throw new Error("API call failed");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "No reply generated." }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I am currently running in offline resilience mode. Rakibul is a Full-Stack & AI Automation Engineer with deep expertise in Next.js, React, Node.js, and PostgreSQL. Explore his projects (LocalGems, RiderApp, Akademi) right on this page, or reach out to him directly at mdrakibislam7018@gmail.com!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 shadow-2xl flex items-center justify-center text-white cursor-pointer border border-white/20"
          aria-label="Chat with Rakibul AI"
        >
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-25" />
          {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 text-white" />}
          
          {!isOpen && (
            <span className="absolute -top-10 right-0 bg-gray-900/90 text-xs font-semibold text-white px-3 py-1 rounded-full shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Ask AI Assistant
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-[420px] h-[580px] bg-gray-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-gray-100"
          >
            {/* Header */}
            <div className="px-4 py-3.5 border-b border-white/10 bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Rakibul AI
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h3>
                  <p className="text-[11px] text-gray-400">Digital Twin · Full-Stack & Automation</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs leading-relaxed">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none"
                        : "bg-white/5 border border-white/10 text-gray-200 rounded-bl-none shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                  {m.role === "user" && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-2.5 items-center text-gray-400 text-xs italic">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <span>Rakibul AI is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2 border-t border-white/5 bg-gray-900/40">
              <p className="text-[10px] text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Suggested questions:</p>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {suggestedQuestions.slice(0, 4).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    disabled={loading}
                    className="shrink-0 text-[11px] bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-2.5 py-1 rounded-full border border-white/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="p-3 border-t border-white/10 bg-gray-900/80 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, or experience..."
                disabled={loading}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
