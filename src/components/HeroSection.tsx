import { useState, useEffect } from 'react';
import { motion, animate } from 'motion/react';
import { ShieldCheck, ArrowRight, Sparkles, Brain, AlertCircle, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { RadialProgress, AnimatedCounter } from './MetricMeter';
import profileImg from '../assets/profile.jpg';

interface HeroProps {
  onOpenAuditReport: () => void;
}

export default function HeroSection({ onOpenAuditReport }: HeroProps) {

  const [isSpinning, setIsSpinning] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Custom event/scroll handler using framer-motion physics for smooth spring scrolling with direct updates
  const smoothSpringScroll = (targetElementId: string) => {
    if (targetElementId === 'internship-ledger') {
      window.dispatchEvent(new CustomEvent('select-internships-tab'));
    }

    const element = document.getElementById(targetElementId);
    if (!element) return;

    const targetY = element.getBoundingClientRect().top + window.scrollY - 80; // Offset spacing for header
    const startY = window.scrollY;

    animate(startY, targetY, {
      type: 'spring',
      stiffness: 80, // Snappy spring scroll
      damping: 15,
      mass: 0.8,
      onUpdate: (latest) => window.scrollTo(0, latest)
    });
  };

  const handleGaugeClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      setAnimationKey(prev => prev + 1); // Trigger staggered reveal on completion
    }, 1500);
  };

  // Definitions of variants
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9, 
      boxShadow: "0 0 0px rgba(0, 217, 255, 0)" 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      boxShadow: [
        "0 0 0px rgba(0, 217, 255, 0)",
        "0 0 16px rgba(0, 217, 255, 0.35)",
        "0 0 0px rgba(0, 217, 255, 0)"
      ],
      transition: {
        boxShadow: {
          duration: 1.0,
          times: [0, 0.3, 1]
        },
        opacity: { duration: 0.4 },
        scale: { type: "spring" as const, stiffness: 350, damping: 15 }
      }
    }
  };

  const checklistData = [
    {
      id: "check-btech-gpa",
      label: <>CGPA: <b className="text-white">7.9</b> (KIET B.Tech)</>,
      targetId: "academics-internships"
    },
    {
      id: "check-diploma-percentage",
      label: <>Diploma: <b className="text-white">80%</b> (Mechanical)</>,
      targetId: "academics-internships"
    },
    {
      id: "check-internship-count",
      label: <>Virtual Internships: <b className="text-white font-bold"><AnimatedCounter value={3} /> Completed</b></>,
      targetId: "internship-ledger"
    },
    {
      id: "check-certification-count",
      label: <>Certifications: <b className="text-white font-bold"><AnimatedCounter value={3} /> Registered</b></>,
      targetId: "certification-vault"
    },
    {
      id: "check-project-count",
      label: <>Key Analytical Projects: <b className="text-white font-bold"><AnimatedCounter value={4} /></b></>,
      targetId: "project-command-center"
    }
  ];

  // Scroll utilities
  const scrollSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero-section" className="relative pt-32 pb-24 border-b border-indigo-500/5 bg-transparent overflow-hidden select-none">
      {/* Decorative Particle Background Layout */}
      <div className="absolute top-0 inset-x-0 h-[450px] bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-center">
        
        {/* Left Side: Large Apple-Inspired Hero Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-8 text-left"
        >
          
          {/* Avatar Area with circular floating glass frame */}
          <div className="flex items-center space-x-6">
            <div
              id="profile-avatar-container"
              className="relative w-24 h-24 rounded-full bg-slate-900 border border-indigo-500/20 shadow-[inset_0_1px_0px_rgba(255,255,255,0.05)] flex items-center justify-center overflow-hidden group hover:border-[#00D9FF] hover:shadow-[0_0_30px_rgba(0,217,255,0.3)] transition-all duration-300 shrink-0"
            >
              <img
                id="profile-avatar-rendered"
                src={profileImg}
                alt="Sai Teja Revuri"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <div className="inline-flex items-center space-x-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full text-xs font-mono">
                <Sparkles className="w-3 h-3 text-[#00D9FF] animate-pulse" />
                <span>DATA PORTFOLIO METADATA</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 font-display">
                {PERSONAL_INFO.name}
              </h1>
            </div>
          </div>

          {/* Headline Display styling */}
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-6xl font-bold text-white font-display tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
              Data Analyst
            </h2>
            <p className="text-slate-400 font-sans text-sm leading-relaxed max-w-xl font-medium">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            {/* CTA 1: Audit report */}
            <button
              id="cta-verify-resume-report"
              onClick={onOpenAuditReport}
              className="px-6 py-3.5 premium-button font-bold text-xs font-mono rounded-xl flex items-center space-x-2.5 transition-all group cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>EXPLORE VERIFIED REGISTER</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#00D9FF]" />
            </button>

            {/* CTA 2: Projects scroll */}
            <button
              id="cta-project-explore"
              onClick={() => scrollSection('project-command-center')}
              className="px-6 py-3.5 bg-slate-900/40 hover:bg-[#111827] border border-indigo-500/20 hover:border-[#00D9FF]/40 text-slate-200 hover:text-white font-bold text-xs font-mono rounded-xl flex items-center space-x-2.5 transition-all hover:shadow-[0_0_12px_rgba(79,124,255,0.15)] cursor-pointer"
            >
              <span>EXPLORE PROJECTS</span>
            </button>

            {/* CTA 3: Contact scroll */}
            <button
              id="cta-contact-init"
              onClick={() => scrollSection('contact-hub')}
              className="px-6 py-3.5 bg-transparent text-slate-400 hover:text-[#00D9FF] font-bold text-xs font-mono transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <span>CONNECT REGISTRY</span>
            </button>
          </div>

        </motion.div>

        {/* Right Side: High-End Executive Analytics verification dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="lg:col-span-5"
        >
          <motion.div
            id="hero-verification-dashboard"
            whileHover={{ 
              y: -4,
              boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 217, 255, 0.15)",
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            className="relative premium-glass-card rounded-2xl p-6 space-y-6"
          >
            {/* Header section with indicators */}
            <div className="flex justify-between items-center border-b border-indigo-500/10 pb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                  EXECUTIVE VERIFICATION CONSOLE
                </span>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider bg-indigo-500/5 px-2.5 py-0.5 rounded border border-indigo-500/20">
                STABLE_STATE: LIVE
              </span>
            </div>

            {/* Core Verification grid panel (Radial Meter + Score metrics) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Radial Score Gauge */}
              <div className="sm:col-span-5 flex justify-center relative select-none">
                <motion.div
                  id="circular-gauge-container"
                  className="cursor-pointer relative z-10"
                  onClick={handleGaugeClick}
                  animate={{ rotate: isSpinning ? 360 : 0 }}
                  transition={{ ease: 'easeInOut', duration: 1.5 }}
                >
                  <RadialProgress percentage={100} size={130} strokeWidth={9} />
                </motion.div>

                {/* Radiant Scanning Outward Glow effect */}
                {isSpinning && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      className="absolute rounded-full border-2 border-indigo-500/80 bg-indigo-500/10"
                      initial={{ width: 40, height: 40, opacity: 0.9, scale: 0.8 }}
                      animate={{ width: 180, height: 180, opacity: 0, scale: 1.3 }}
                      transition={{
                        repeat: 2,
                        duration: 0.75,
                        ease: "easeOut"
                      }}
                    />
                    <motion.div
                      className="absolute rounded-full border border-purple-500/60 bg-purple-500/5"
                      initial={{ width: 20, height: 20, opacity: 0.8, scale: 0.5 }}
                      animate={{ width: 220, height: 220, opacity: 0, scale: 1.5 }}
                      transition={{
                        repeat: 2,
                        duration: 0.75,
                        delay: 0.25,
                        ease: "easeOut"
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Status List items check list with staggered navigation */}
              <motion.div 
                key={animationKey}
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="sm:col-span-7 space-y-2.5 font-mono text-xs text-slate-300"
              >
                <span className="text-[10px] text-slate-500 tracking-wider font-bold block mb-1">
                  VERIFIED CHECKLIST
                </span>
                
                {checklistData.map((item) => (
                  <motion.div
                    key={item.id}
                    id={item.id}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                      borderColor: "rgba(0, 217, 255, 0.4)",
                      boxShadow: "0 4px 20px rgba(0, 217, 255, 0.15)",
                      backgroundColor: "rgba(79, 124, 255, 0.05)"
                    }}
                    onClick={() => smoothSpringScroll(item.targetId)}
                    className="flex items-center space-x-2.5 cursor-pointer bg-slate-900/50 border border-indigo-500/10 rounded-xl px-3 py-2 transition-colors relative z-10 select-none hover:z-20 duration-200"
                  >
                    <span className="p-0.5 bg-[#10B981]/25 text-[#10B981] rounded-md font-bold shadow-[0_0_8px_rgba(16,185,129,0.3)]">✓</span>
                    <span className="text-slate-300 hover:text-white transition-colors">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>

            </div>

            {/* Verification Footer button callout to modal */}
            <div className="border-t border-indigo-500/10 pt-4">
              <button
                id="hero-verify-trigger-button"
                onClick={onOpenAuditReport}
                className="w-full py-3 premium-button text-[10px] font-mono text-indigo-300 font-bold rounded-xl flex items-center justify-center space-x-2 transition-all uppercase cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>Verify Resume Registry Parity (Full Schema)</span>
              </button>
            </div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
