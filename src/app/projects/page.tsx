use client;
import React from react;
import { motion } from framer-motion;
import { ExternalLink, Github, Sparkles, CheckCircle2 } from lucide-react;
import Reveal from @/components/ui/Reveal;
import { projects } from @/lib/siteConfig;

export default function ProjectsPage() {
  return (
    <main className=min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto>
      <Reveal>
        <div className=text-center max-w-3xl mx-auto mb-16>
          <p className=text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2>Proof of Capability</p>
          <h1 className=text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4>
            Featured Engineering Projects
          </h1>
          <p className=text-sm md:text-base text-gray-400 leading-relaxed>
            Full-stack web applications, real-time distributed platforms, and cloud architectures built with modern Next.js, React, Node.js, and PostgreSQL.
          </p>
        </div>
      </Reveal>

      <div className=grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8>
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.1}>
            <div className=h-full flex flex-col bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300 group shadow-lg hover:shadow-emerald-500/5>
              <div className=relative h-48 overflow-hidden bg-gray-950>
                <img
                  src={project.image}
                  alt={project.title}
                  className=w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90
                />
                <div className=absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent />
              </div>

              <div className=p-6 flex-1 flex flex-col>
                <h3 className=text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors>
                  {project.title}
                </h3>
                <p className=text-xs font-medium text-emerald-400/90 mb-3 font-mono>
                  {project.tagline}
                </p>
                <p className=text-xs text-gray-300 mb-4 leading-relaxed>
                  {project.description}
                </p>

                <div className=mb-5 space-y-1.5 flex-1>
                  {project.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className=flex items-start gap-2 text-[11px] text-gray-300>
                      <CheckCircle2 className=w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5 />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className=flex flex-wrap gap-1.5 mb-6>
                  {project.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className=px-2 py-0.5 text-[10px] rounded-md bg-white/5 border border-white/10 text-gray-300 font-mono
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className=flex items-center gap-3 pt-3 border-t border-white/10>
                  <a
                    href={project.liveUrl}
                    target=_blank
                    rel=noopener noreferrer
                    className=flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity
                  >
                    <span>View Project</span>
                    <ExternalLink className=w-3.5 h-3.5 />
                  </a>
                  <a
                    href={project.codeUrl}
                    target=_blank
                    rel=noopener noreferrer
                    className=p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors
                    aria-label=View Source Code
                  >
                    <Github className=w-4 h-4 />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
