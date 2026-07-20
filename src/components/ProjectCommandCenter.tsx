import { useState } from 'react';
import { PROJECT_LIST } from '../data';
import { motion } from 'motion/react';
import { FolderGit2, Github, Database, Binary, Activity, Brain, BarChart3 } from 'lucide-react';
import { Project } from '../types';

export default function ProjectCommandCenter() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCardClick = (proj: Project) => {
    setActiveCardId(proj.id);
    setTimeout(() => {
      setActiveCardId(null);
    }, 450); // Transient tactile scale expansion
  };

  return (
    <motion.section 
      id="project-command-center" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className="py-24 border-b border-white/5 relative bg-black/40"
    >
      {/* Background Decorative Radial Mask */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 select-none">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 px-3 py-1 rounded-full text-xs font-mono mb-4">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>PROJECT COMMAND CENTER</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white font-display">
              Machine Learning & Query Engines
            </h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Engineered using local data processing models, database mapping algorithms, and predictive workflows. Strict static audit verification complete.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900 border border-white/5 px-4 py-2 rounded-xl text-xs font-mono text-slate-400">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>ALL MODULES IN COLD DEPLOYMENT</span>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECT_LIST.map((proj) => {
            const isML = proj.category === 'ml';
            const isAIFullStack = proj.category === 'ai-fullstack';

            return (
              <motion.div
                id={`project-card-${proj.id}`}
                key={proj.id}
                onClick={() => handleCardClick(proj)}
                whileHover={{ 
                  rotateX: 4, 
                  rotateY: -4, 
                  y: -6, 
                  boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.2)",
                  transition: { duration: 0.25 }
                }}
                animate={activeCardId === proj.id ? { 
                  scale: 1.02, 
                  z: 25,
                  boxShadow: "0 35px 70px -10px rgba(99, 102, 241, 0.4)",
                  borderColor: "rgba(129, 140, 248, 0.55)"
                } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative bg-gradient-to-b from-slate-950 to-slate-900/60 border border-white/5 border-t-white/20 shadow-[inset_0_1px_0px_rgba(255,255,255,0.1)] hover:border-indigo-500/35 rounded-2xl p-8 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.15)] transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                {/* Embedded Glow Accent */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none" />

                <div>
                  {/* Top line with category indicators */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2.5 rounded-xl border ${
                        isAIFullStack
                          ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                          : isML 
                          ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' 
                          : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      }`}>
                        {proj.id === 'sql-sales-analysis' ? <BarChart3 className="w-5 h-5" /> : isAIFullStack ? <Brain className="w-5 h-5" /> : isML ? <Binary className="w-5 h-5" /> : <Database className="w-5 h-5" />}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                          {proj.categoryLabel || (isAIFullStack ? 'AI + FULL STACK + RAG' : isML ? 'PREDICTION PIPELINE' : 'DATA SYNAPSE ENGINE')}
                        </span>
                        <h4 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                          {proj.name}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <a
                        id={`github-link-${proj.id}`}
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer referrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 text-slate-400 hover:text-white rounded-lg transition-all"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Description Box */}
                  <p className="text-slate-400 text-xs leading-relaxed mb-6 font-sans">
                    {proj.description}
                  </p>

                  {/* Outcome list */}
                  <div className="space-y-3 mb-6">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                      KEY OUTCOMES / METRICS
                    </span>
                    <ul className="space-y-2">
                      {proj.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start text-xs text-slate-300 leading-normal">
                          <span className="text-indigo-500 mr-2 font-bold mt-0.5">✓</span>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer with technologies and stats */}
                <div className="border-t border-white/5 pt-5 flex flex-wrap gap-2 items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono bg-slate-900 border border-white/5 text-slate-400 px-2.5 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 flex items-center space-x-1 bg-white/[0.01] border border-white/5 px-2.5 py-1 rounded-md">
                    <span>REGISTRY ID:</span>
                    <span className="text-indigo-300 font-bold uppercase">{proj.id}</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
