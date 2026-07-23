import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_MATRIX_DATA } from '../data';
import { SkillItem } from '../types';
import { Code, BookOpen, Layers, Award, Terminal, ArrowUpRight, Search, CheckCircle2 } from 'lucide-react';

export default function SkillMatrix() {
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const toggleSkill = (skillName: string) => {
    if (selectedSkillId === skillName) {
      setSelectedSkillId(null);
    } else {
      setSelectedSkillId(skillName);
    }
  };

  return (
    <motion.section 
      id="skill-matrix" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-24 border-b border-indigo-500/5 relative bg-transparent overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>INTERACTIVE COMPETENCY GRID</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white font-display">
            Deep Skill Matrix & Verification
          </h2>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed">
            Click on any discipline block to analyze practical project implementations, mapped certifications, and explicit audit evidence extracted from the verified registry.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_MATRIX_DATA.map((skill) => {
            const isExpanded = selectedSkillId === skill.name;

            return (
              <motion.div
                id={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                key={skill.name}
                layout
                whileHover={{ y: -4 }}
                onClick={() => toggleSkill(skill.name)}
                className={`relative cursor-pointer group premium-glass-card p-6 flex flex-col justify-between overflow-hidden ${
                  isExpanded 
                    ? 'border-[#00D9FF]! shadow-[0_0_30px_rgba(0,217,255,0.2)] col-span-1 md:col-span-2 lg:col-span-1' 
                    : ''
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="card-status-dot" />
                      <span className="text-[10px] font-mono text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                        {skill.category}
                      </span>
                    </div>
                    <motion.div 
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      className="text-slate-500 group-hover:text-slate-300 transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4 text-[#00D9FF]" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-indigo-400 transition-colors">
                    {skill.name}
                  </h3>

                  {/* Inline summary / indicators */}
                  <div className="mt-4 flex items-center space-x-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-indigo-400/80" />
                      <span className="font-mono text-[10px] uppercase text-slate-500">
                        {skill.relatedProjects.length} Projects
                      </span>
                    </div>
                    <span className="text-slate-700">•</span>
                    <div className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-purple-400/80" />
                      <span className="font-mono text-[10px] uppercase text-slate-500">
                        {skill.relatedCertifications.length} Certs
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      id={`skill-expanded-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden mt-6 pt-5 border-t border-white/5 space-y-4 text-xs"
                      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking interior details
                    >
                      {/* Evidence Context */}
                      <div className="space-y-1 bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                        <div className="text-slate-500 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                          <span>TECHNICAL EVIDENCE VERIFICATION</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed font-sans">{skill.experienceEvidence}</p>
                      </div>

                      {/* Related Projects */}
                      {skill.relatedProjects.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-slate-500 font-mono text-[9px] uppercase tracking-wider block">
                            MAPPED PROJECTS
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {skill.relatedProjects.map((proj) => (
                              <span 
                                key={proj} 
                                className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-lg text-[10px] font-mono"
                              >
                                {proj}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Related Certifications */}
                      {skill.relatedCertifications.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-slate-500 font-mono text-[9px] uppercase tracking-wider block">
                            VERIFIED ASSOCIATIONS
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {skill.relatedCertifications.map((cert) => (
                              <span 
                                key={cert} 
                                className="px-2.5 py-1 bg-slate-800 border border-white/5 text-slate-300 rounded-lg text-[10px]"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Resume References */}
                      <div className="text-[10px] font-mono text-slate-500 flex items-center space-x-1 border-t border-white/5 pt-3">
                        <Search className="w-3.5 h-3.5 text-indigo-400" />
                        <span>LOCATED IN:</span>
                        <span className="text-[#00D9FF]">{skill.resumeReferences}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Minimalist interactive toggle callout */}
                {!isExpanded && (
                  <div className="text-[10px] font-mono mt-4 text-slate-600 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                    <span>ANALYZE SCHEMA</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
