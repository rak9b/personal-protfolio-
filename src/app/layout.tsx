import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FormGate from "@/components/ui/FormGate";
import GuidedTour from "@/components/ui/GuidedTour";
import ThemeProvider from "@/components/ui/ThemeProvider";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Your Name — Traveler · Thinker · Engineer",
  description: "Personal website of a traveler, thinker, and software engineer. Field notes from 40+ countries, books, essays, and projects.",
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
            </FormGate>
            <GuidedTour />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
