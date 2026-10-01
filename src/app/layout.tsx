import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FormGate from "@/components/ui/FormGate";
import GuidedTour from "@/components/ui/GuidedTour";
import ThemeProvider from "@/components/ui/ThemeProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import ChatbotWidget from "@/components/ui/ChatbotWidget";

export const metadata: Metadata = {
  title: "MD. Rakibul Islam — Full Stack & AI Automation Engineer",
  description: "Official portfolio of MD. Rakibul Islam. Showcasing production Next.js apps, real-time distributed platforms, and AI automation pipelines.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <FormGate>
              <Navigation />
              {children}
              <Footer />
              <ChatbotWidget />
            </FormGate>
            <GuidedTour />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
