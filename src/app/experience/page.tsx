use client;
import React from react;
import { motion } from framer-motion;
import { Briefcase, GraduationCap, Award, CheckCircle2 } from lucide-react;
import Reveal from @/components/ui/Reveal;
import { experiences, education, skillsCategories } from @/lib/siteConfig;

export default function ExperiencePage() {
  return (
    <main className=min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-5xl mx-auto>
      <Reveal>
        <div className=text-center max-w-2xl mx-auto mb-16>
          <p className=text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2>Track Record</p>
          <h1 className=text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4>
            Professional Experience & Skills
          </h1>
          <p className=text-sm md:text-base text-gray-400 leading-relaxed>
            Delivering scalable AI workflows, real-time architectures, and full-stack web applications for global remote teams.
          </p>
        </div>
      </Reveal>

      {/* Experience Timeline */}
      <section className=mb-20>
        <h2 className=text-2xl font-bold text-white mb-8 flex items-center gap-3>
          <Briefcase className=w-6 h-6 text-emerald-400 />
          <span>Work History</span>
        </h2>

        <div className=space-y-8 relative before:absolute before:inset-0 before:left-3 md:before:left-5 before:w-0.5 before:bg-white/10>
          {experiences.map((exp, idx) => (
            <Reveal key={idx} delay={idx * 0.15}>
              <div className=relative pl-10 md:pl-14>
                <div className=absolute left-1.5 md:left-3.5 top-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20 />
                <div className=bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:border-emerald-500/30 transition-all>
                  <div className=flex flex-col md:flex-row md:items-center justify-between gap-1 mb-3>
                    <h3 className=text-xl font-bold text-white>{exp.role}</h3>
                    <span className=text-xs font-mono text-emerald-400 font-semibold>{exp.period}</span>
                  </div>
                  <p className=text-xs font-medium text-gray-400 mb-4>
                    {exp.company} · {exp.location}
                  </p>

                  <ul className=space-y-2 mb-5>
                    {exp.highlights.map((item, iIdx) => (
                      <li key={iIdx} className=flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed>
                        <CheckCircle2 className=w-4 h-4 text-emerald-400 shrink-0 mt-0.5 />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className=flex flex-wrap gap-1.5 pt-3 border-t border-white/10>
                    {exp.skills.map((s, sIdx) => (
                      <span key={sIdx} className=px-2.5 py-0.5 text-[10px] rounded-full bg-white/5 border border-white/10 text-gray-300>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className=mb-20>
        <h2 className=text-2xl font-bold text-white mb-6 flex items-center gap-3>
          <GraduationCap className=w-6 h-6 text-indigo-400 />
          <span>Education</span>
        </h2>

        <Reveal>
          <div className=bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:border-indigo-500/30 transition-all>
            <h3 className=text-lg font-bold text-white mb-1>{education.degree}</h3>
            <p className=text-xs text-indigo-400 font-mono mb-2>{education.institution} · {education.location}</p>
            <p className=text-xs text-gray-300>{education.focus}</p>
          </div>
        </Reveal>
      </section>

      {/* Skills Matrix */}
      <section>
        <h2 className=text-2xl font-bold text-white mb-6 flex items-center gap-3>
          <Award className=w-6 h-6 text-emerald-400 />
          <span>Core Competencies</span>
        </h2>

        <div className=grid grid-cols-1 md:grid-cols-2 gap-6>
          {skillsCategories.map((group, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className=bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6>
                <h3 className=text-sm font-bold text-white uppercase tracking-wider mb-4 font-mono text-emerald-400>
                  {group.category}
                </h3>
                <div className=flex flex-wrap gap-2>
                  {group.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className=px-3 py-1 text-xs rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
