import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, Award, GraduationCap, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { EDUCATION_LIST, INTERNSHIP_LIST, CERTIFICATION_LIST, PROJECT_LIST } from '../data';
import ScannerBeam from './ScannerBeam';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeIntelligenceModal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          {/* Backdrop interaction binder */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            id="resume-intelligence-modal"
            key="intelligence-modal"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-4xl bg-slate-950/85 border border-white/10 rounded-2xl shadow-[0_0_50px_-12px_rgba(124,58,237,0.3)] overflow-hidden max-h-[85vh] flex flex-col z-10"
          >
            {/* Top scanning effects on background */}
            <ScannerBeam />

            {/* Cinematic Grain Overlay */}
            <div className="absolute inset-0 grain-overlay opacity-[0.08] pointer-events-none rounded-2xl" />

            {/* Header */}
            <div className="relative flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/40">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400">
                  <Cpu className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display flex items-center gap-1.5">
                    RESUME INTELLIGENCE REPORT <span className="text-xs py-0.5 px-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 rounded-full">REALTIME SYNAPSE AUDIT</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                    Model: Audit-V1 • 100% Verified Static Registry • Authenticity Confirmed
                  </p>
                </div>
              </div>
              <button
                id="close-intelligence-report"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 select-none">
              
              {/* Scorecard Overview Banner */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/3 border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                  <span className="text-xs text-slate-400 font-mono tracking-wider">COMPLETENESS</span>
                  <span className="text-2xl font-bold font-display text-white mt-1">100%</span>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[100%] rounded-full" />
                  </div>
                </div>
                <div className="bg-white/3 border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                  <span className="text-xs text-slate-400 font-mono tracking-wider">ACADEMIC PARITY</span>
                  <span className="text-2xl font-bold font-display text-white mt-1">7.9 & 80%</span>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-purple-500 h-full w-[81%] rounded-full" />
                  </div>
                </div>
                <div className="bg-white/3 border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                  <span className="text-xs text-slate-400 font-mono tracking-wider">VIRTUAL INTERNSHIPS</span>
                  <span className="text-2xl font-bold font-display text-white mt-1">3 Completed</span>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-amber-500 h-full w-[100%] rounded-full" />
                  </div>
                </div>
                <div className="bg-white/3 border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                  <span className="text-xs text-slate-400 font-mono tracking-wider">DISCIPLINES COHERENCE</span>
                  <span className="text-2xl font-bold font-display text-indigo-400 mt-1">Excellent</span>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[95%] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Grid sections of Audit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Section A: Education summary */}
                <div className="bg-white/3 border border-white/5 p-5 rounded-xl space-y-4">
                  <div className="flex items-center space-x-2 text-indigo-400 font-bold border-b border-white/5 pb-2">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-wider font-display text-white">Education Transcript Ledger</span>
                  </div>
                  <div className="space-y-4">
                    {EDUCATION_LIST.map((edu, idx) => (
                      <div key={idx} className="border-l-2 border-indigo-500/30 pl-3">
                        <h4 className="text-xs font-semibold text-white">{edu.institution}</h4>
                        <p className="text-[11px] text-slate-400">{edu.degree}</p>
                        <div className="flex justify-between items-center mt-1 text-[10px] font-mono text-indigo-300">
                          <span>{edu.period}</span>
                          <span className="px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded">{edu.gpaOrPercentage}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section B: Internship ledger */}
                <div className="bg-white/3 border border-white/5 p-5 rounded-xl space-y-4">
                  <div className="flex items-center space-x-2 text-purple-400 font-bold border-b border-white/5 pb-2">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-wider font-display text-white">Virtual Internship ledger</span>
                  </div>
                  <div className="space-y-4">
                    {INTERNSHIP_LIST.map((ist, idx) => (
                      <div key={idx} className="border-l-2 border-purple-500/30 pl-3">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-semibold text-white">{ist.organization}</h4>
                          <span className="text-[9px] px-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded font-mono">{ist.duration}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{ist.role}</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {ist.technologies.slice(0, 3).map((tech, tIdx) => (
                            <span key={tIdx} className="text-[8px] bg-slate-800 text-slate-300 px-1 py-0.5 rounded font-mono">{tech}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Row: Technical Audit & Credentials checking */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Section C: Certification Audit */}
                <div className="bg-white/3 border border-white/5 p-5 rounded-xl space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold border-b border-white/5 pb-2">
                    <Award className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-wider font-display text-white">Certification Authenticity Vault</span>
                  </div>
                  <div className="space-y-3">
                    {CERTIFICATION_LIST.map((cert, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-2 rounded-lg">
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-200 font-medium">{cert.name}</span>
                          <span className="text-[9px] text-slate-500 font-mono">{cert.issuer}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-[10px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full font-mono">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{cert.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section D: Project Core Intelligence */}
                <div className="bg-white/3 border border-white/5 p-5 rounded-xl space-y-4">
                  <div className="flex items-center space-x-2 text-cyan-400 font-bold border-b border-white/5 pb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-wider font-display text-white">Project Operational Intelligence</span>
                  </div>
                  <div className="space-y-3">
                    {PROJECT_LIST.map((proj, idx) => (
                      <div key={idx} className="bg-white/[0.02] border border-white/5 p-2.5 rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-200 font-bold font-display">{proj.name}</span>
                          <span className="text-[8px] font-mono px-1 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded uppercase">{proj.category}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-sans">{proj.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {proj.technologies.map((t, tIdx) => (
                            <span key={tIdx} className="text-[8px] font-mono bg-slate-900 border border-white/5 text-slate-300 px-1 py-0.2 rounded">{t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Security Footer badge */}
            <div className="p-4 bg-slate-950 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-indigo-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                SECURE STATIC DATA CHECKSUM PASS
              </span>
              <span>SHA-256 ID: 9154122026-TEJA-VERIFY</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
