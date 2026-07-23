import { useState, useEffect, useRef, useCallback } from 'react';
import { PROJECT_LIST } from '../data';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { 
  FolderGit2, 
  Github, 
  Database, 
  Binary, 
  Brain, 
  BarChart3, 
  ExternalLink,
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';
import { Project } from '../types';

interface ProjectSlideProps {
  project: Project;
  index: number;
  totalProjects: number;
  onInView: (index: number) => void;
}

function ProjectSlide({ project, index, totalProjects, onInView }: ProjectSlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(slideRef, { amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const handleInViewUpdate = useCallback(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  useEffect(() => {
    handleInViewUpdate();
  }, [handleInViewUpdate]);

  const isML = project.category === 'ml';
  const isAIFullStack = project.category === 'ai-fullstack';

  // Dynamic Icon mapping
  const CategoryIcon = project.id === 'sql-sales-analysis' 
    ? BarChart3 
    : isAIFullStack 
    ? Brain 
    : isML 
    ? Binary 
    : Database;

  return (
    <section 
      id={`project-slide-${index}`}
      ref={slideRef}
      className="project-snap-slide h-screen w-full relative flex flex-col justify-center items-center overflow-hidden px-4 md:px-8 py-10 select-none"
    >
      {/* Animated Cyber Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Slow moving gradient light nodes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl animate-ambient-light" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-ambient-light" style={{ animationDelay: '-6s' }} />

        {/* Floating Glowing Particles */}
        <div className="absolute top-1/3 left-1/5 w-2 h-2 rounded-full bg-indigo-400/30 blur-[1px] animate-float-particle" />
        <div className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-purple-400/20 blur-[1px] animate-float-particle" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 rounded-full bg-cyan-400/30 blur-[1px] animate-float-particle" style={{ animationDelay: '-5s' }} />
      </div>

      {/* Main Glass Showcase Card Container */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 25, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl premium-glass-card rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl flex flex-col justify-between max-h-[86vh] overflow-y-auto no-scrollbar"
      >
        {/* Ambient Corner Accent */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-2xl pointer-events-none" />

        <div>
          {/* Top Category & Links Header */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-indigo-500/10 pb-4">
            
            <div className="flex items-center space-x-3">
              <span className="card-status-dot" />
              <div className={`p-2.5 rounded-xl border ${
                isAIFullStack
                  ? 'bg-purple-500/10 border-indigo-400/20 text-[#00D9FF] shadow-[0_0_12px_rgba(0,217,255,0.15)]'
                  : isML 
                  ? 'bg-indigo-500/10 border-indigo-500/20 text-[#4F7CFF] shadow-[0_0_12px_rgba(79,124,255,0.15)]' 
                  : 'bg-[#10B981]/10 border-[#10B981]/20 text-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.15)]'
              }`}>
                <CategoryIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D9FF] font-bold">
                    PROJECT 0{index + 1} / 0{totalProjects}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    {project.categoryLabel || (isAIFullStack ? 'AI + FULL STACK + RAG' : isML ? 'PREDICTION PIPELINE' : 'DATA SYNAPSE ENGINE')}
                  </span>
                </div>
              </div>
            </div>

            {/* Top-Right GitHub & Live Actions */}
            <div className="flex items-center space-x-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 hover:border-indigo-400 text-indigo-300 hover:text-white rounded-xl transition-all duration-300 hover:scale-105 flex items-center space-x-1.5 text-xs font-mono"
                  title="View Live Demo"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  id={`github-link-${project.id}`}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-400/60 text-slate-300 hover:text-white rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(79,124,255,0.4)] cursor-pointer"
                  title="View Source on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>

          </div>

          {/* Large Project Title */}
          <div className="mb-4">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display leading-tight">
              {project.name}
            </h3>
            {project.tagline && (
              <p className="text-xs sm:text-sm font-mono text-indigo-300 mt-2">
                {project.tagline}
              </p>
            )}
          </div>

          {/* Professional Description */}
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-sans max-w-3xl">
            {project.description}
          </p>

          {/* Key Outcomes / Metrics */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>KEY OUTCOMES / METRICS</span>
            </div>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.outcomes.map((outcome, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3 text-xs md:text-sm text-slate-200 bg-white/[0.01] border border-indigo-500/5 hover:border-indigo-500/30 p-3 rounded-xl transition-colors"
                >
                  <span className="text-[#00D9FF] font-bold mt-0.5 shrink-0 bg-indigo-500/10 p-1 rounded-md">✓</span>
                  <span className="leading-snug">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer with Technology Chips & Registry ID */}
        <div className="border-t border-indigo-500/10 pt-4 mt-2 flex flex-wrap items-center justify-between gap-4">
          
          {/* Technology Chips */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-500 uppercase mr-1">
              <Layers className="w-3 h-3 text-[#00D9FF]" />
              <span>TECH STACK:</span>
            </div>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono bg-slate-950/80 border border-indigo-500/15 text-slate-300 px-3 py-1.5 rounded-lg shadow-sm hover:border-[#00D9FF]/40 hover:text-[#00D9FF] hover:-translate-y-[2px] hover:shadow-[0_0_12px_rgba(0,217,255,0.2)] transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Registry ID Tag */}
          <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-2 bg-slate-950/80 border border-indigo-500/15 px-3 py-1.5 rounded-lg shadow-sm">
            <span className="text-slate-500">REGISTRY ID:</span>
            <span className="text-[#00D9FF] font-bold uppercase tracking-wider">{project.id}</span>
          </div>

        </div>

      </motion.div>

      {/* Downward Scroll Indicator */}
      {index < totalProjects - 1 && (
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center pointer-events-none z-20"
        >
          <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase mb-1">SCROLL NEXT</span>
          <ChevronDown className="w-4 h-4 text-indigo-400" />
        </motion.div>
      )}
    </section>
  );
}

export default function ProjectCommandCenter() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const scrollToProject = (index: number) => {
    setActiveProjectIndex(index);
    const element = document.getElementById(`project-slide-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      id="project-command-center" 
      className="project-snap-container no-scrollbar relative w-full bg-transparent text-slate-100 overflow-hidden"
    >
      {/* Header Badge Overlay */}
      <div className="absolute top-4 left-6 z-30 pointer-events-none hidden md:flex items-center space-x-2 bg-slate-900/80 border border-indigo-500/10 px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 backdrop-blur-md shadow-lg">
        <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
        <span className="text-[#00D9FF] font-bold">PROJECT COMMAND CENTER</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-400 text-[11px]">FULL-SCREEN SHOWCASE</span>
      </div>

      {/* Floating Side Project Pagination Dots */}
      <nav 
        aria-label="Project Navigation"
        className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end space-y-4 pointer-events-auto"
      >
        {PROJECT_LIST.map((proj, idx) => {
          const isActive = activeProjectIndex === idx;
          return (
            <button
              key={proj.id}
              onClick={() => scrollToProject(idx)}
              className="group flex items-center space-x-3 cursor-pointer focus:outline-none"
              aria-label={`Scroll to ${proj.name}`}
            >
              {/* Tooltip label on hover */}
              <span className="hidden sm:inline-block text-[11px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-900/90 border border-indigo-500/15 px-3 py-1 rounded-lg shadow-xl pointer-events-none whitespace-nowrap backdrop-blur-md">
                0{idx + 1}. {proj.name}
              </span>
              
              {/* Pagination Dot */}
              <div className={`relative flex items-center justify-center transition-all duration-300 ${
                isActive ? 'w-4 h-4' : 'w-3 h-3'
              }`}>
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
                )}
                <div className={`w-full h-full rounded-full transition-all duration-300 border ${
                  isActive 
                    ? 'bg-indigo-500 border-indigo-400 shadow-[0_0_12px_rgba(79,124,255,0.7)] scale-110' 
                    : 'bg-slate-800/80 border-slate-600 hover:border-indigo-400 hover:bg-slate-700'
                }`} />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Viewport Slides */}
      {PROJECT_LIST.map((proj, idx) => (
        <ProjectSlide
          key={proj.id}
          project={proj}
          index={idx}
          totalProjects={PROJECT_LIST.length}
          onInView={(inViewIdx) => setActiveProjectIndex(inViewIdx)}
        />
      ))}
    </div>
  );
}
