import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, Github, ExternalLink, Sparkles, Brain, Code2, Play, Pause, Layers, AlertTriangle, Lightbulb, TrendingUp, Monitor } from 'lucide-react';
import { Project } from '../types';
import ScannerBeam from './ScannerBeam';
import sqlsenseDashboard from '../assets/sqlsense-dashboard.png';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function ProjectDetailsModal({ isOpen, onClose, project }: Props) {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  // Reset video state on open/close
  useEffect(() => {
    if (!isOpen) {
      setIsPlayingDemo(false);
      setVideoProgress(0);
    }
  }, [isOpen]);

  // Video progress simulation loop
  useEffect(() => {
    let interval: any;
    if (isPlayingDemo) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingDemo(false);
            return 0;
          }
          return prev + 1;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlayingDemo]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          {/* Backdrop closer */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            id="project-details-modal"
            key="details-modal"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-4xl bg-slate-950/85 border border-white/10 rounded-2xl shadow-[0_0_50px_-12px_rgba(99,102,241,0.3)] overflow-hidden max-h-[88vh] flex flex-col z-10"
          >
            {/* Top scanning effects on background */}
            <ScannerBeam />

            {/* Cinematic Grain Overlay */}
            <div className="absolute inset-0 grain-overlay opacity-[0.08] pointer-events-none rounded-2xl" />

            {/* Header */}
            <div className="relative flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/40">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400">
                  <Brain className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display flex items-center gap-1.5">
                    {project.name} <span className="text-xs py-0.5 px-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 rounded-full font-mono uppercase">Featured System</span>
                  </h2>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                    {project.tagline || 'Intelligent Technical Architecture'}
                  </p>
                </div>
              </div>
              <button
                id="close-project-details"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 select-none">
              
              {/* Project Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col justify-between hover:border-indigo-500/30 transition-colors">
                  <span className="text-[10px] text-slate-400 font-mono tracking-wider">AI SYSTEM</span>
                  <span className="text-lg font-bold font-display text-white mt-1">Gemini Pro</span>
                  <span className="text-[9px] text-indigo-300 font-mono mt-1 font-semibold uppercase">AI Powered</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col justify-between hover:border-indigo-500/30 transition-colors">
                  <span className="text-[10px] text-slate-400 font-mono tracking-wider">KNOWLEDGE STORE</span>
                  <span className="text-lg font-bold font-display text-white mt-1">ChromaDB</span>
                  <span className="text-[9px] text-emerald-400 font-mono mt-1 font-semibold uppercase">RAG Enabled</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col justify-between hover:border-indigo-500/30 transition-colors">
                  <span className="text-[10px] text-slate-400 font-mono tracking-wider">ORCHESTRATION</span>
                  <span className="text-lg font-bold font-display text-white mt-1">FastAPI + React</span>
                  <span className="text-[9px] text-purple-400 font-mono mt-1 font-semibold uppercase">Full Stack</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col justify-between hover:border-indigo-500/30 transition-colors">
                  <span className="text-[10px] text-slate-400 font-mono tracking-wider">VIEWPORT ADAPTATION</span>
                  <span className="text-lg font-bold font-display text-white mt-1">Liquid CSS</span>
                  <span className="text-[9px] text-sky-400 font-mono mt-1 font-semibold uppercase">Responsive</span>
                </div>
              </div>

              {/* Overview & Problem/Solution */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 font-mono mb-2">Project Overview</h3>
                  <p className="text-slate-300 text-xs leading-relaxed font-sans">{project.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-red-500/5 border border-red-500/10 p-5 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-red-400 flex items-center gap-1.5 uppercase font-mono">
                      <AlertTriangle className="w-4 h-4" /> The Problem
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      {project.problemStatement}
                    </p>
                  </div>

                  <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase font-mono">
                      <Sparkles className="w-4 h-4" /> The Solution
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      {project.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Architecture Flowchart */}
              {project.architectureSteps && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 font-mono">Technical Architecture Pipeline</h3>
                  
                  <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 overflow-x-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 min-w-[700px] py-4 relative">
                      
                      {/* Grid/Line connecting elements */}
                      <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-emerald-500/20 -translate-y-1/2 z-0 hidden md:block" />

                      {project.architectureSteps.map((step, idx) => {
                        // Custom labels and styles
                        const labels = ['User', 'React UI', 'FastAPI API', 'RAG Retriever', 'ChromaDB Store', 'Gemini LLM', 'Response'];
                        const icons = [
                          <Monitor className="w-4 h-4" />,
                          <Code2 className="w-4 h-4" />,
                          <Layers className="w-4 h-4" />,
                          <Cpu className="w-4 h-4" />,
                          <Layers className="w-4 h-4" />,
                          <Brain className="w-4 h-4" />,
                          <Sparkles className="w-4 h-4" />
                        ];
                        const borderColors = [
                          'border-sky-500/30 text-sky-400 bg-sky-500/5',
                          'border-blue-500/30 text-blue-400 bg-blue-500/5',
                          'border-purple-500/30 text-purple-400 bg-purple-500/5',
                          'border-indigo-500/30 text-indigo-400 bg-indigo-500/5',
                          'border-pink-500/30 text-pink-400 bg-pink-500/5',
                          'border-violet-500/30 text-violet-400 bg-violet-500/5',
                          'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'
                        ];

                        if (idx >= labels.length) return null;

                        return (
                          <div key={idx} className="flex flex-col items-center z-10 w-24 text-center group">
                            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-2.5 transition-all group-hover:scale-110 shadow-sm ${borderColors[idx]}`}>
                              {icons[idx]}
                            </div>
                            <span className="text-[10px] font-bold text-white block truncate w-full">{labels[idx]}</span>
                            <span className="text-[8px] text-slate-500 block mt-1 font-mono leading-tight max-h-[30px] overflow-hidden" title={step}>
                              {idx + 1}. {step.split(' ').slice(-2).join(' ')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* RAG Workflow & Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* RAG Workflow Description */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 font-mono">RAG Cognitive Workflow</h3>
                  <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl">
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {project.ragWorkflow}
                    </p>
                    <div className="mt-4 flex items-center space-x-3 text-[10px] font-mono text-slate-500">
                      <span className="px-2 py-0.5 bg-slate-900 border border-white/5 rounded text-emerald-400 font-bold">100% Schema Matches</span>
                      <span>•</span>
                      <span>Cosine Distance Search</span>
                    </div>
                  </div>
                </div>

                {/* Features Highlights Checklist */}
                <div className="md:col-span-5 space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 font-mono">Core System Capabilities</h3>
                  <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl">
                    <ul className="space-y-2.5">
                      {project.features?.map((feat, idx) => (
                        <li key={idx} className="flex items-start text-xs text-slate-300">
                          <span className="text-indigo-400 mr-2 font-bold mt-0.5">✦</span>
                          <span className="font-sans">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Media Gallery / Screen Mockups */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Screenshot Gallery */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 font-mono">System Visual Console</h3>
                  <div className="relative border border-white/10 rounded-xl overflow-hidden bg-slate-950 group">
                    <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 border-b border-white/5 flex items-center px-3 space-x-1.5 z-10">
                      <span className="w-2 h-2 rounded-full bg-red-500/70" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                      <span className="w-2 h-2 rounded-full bg-green-500/70" />
                      <span className="text-[8px] font-mono text-slate-500 pl-3">sqlsense-console-v1.0</span>
                    </div>
                    <div className="pt-6 relative aspect-video">
                      <img 
                        src={sqlsenseDashboard} 
                        alt="SQLSense AI Dashboard Mockup" 
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Simulated Demo Video */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 font-mono">Interactive Demo Stream</h3>
                  <div className="relative aspect-video border border-white/10 rounded-xl overflow-hidden bg-black flex flex-col justify-between group select-none">
                    
                    {/* Fake top-overlay */}
                    <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-4 z-10 text-[9px] font-mono text-slate-400">
                      <span>DEMO_PLAYBACK: ONLINE</span>
                      <span>00:{videoProgress.toString().padStart(2, '0')} / 02:14</span>
                    </div>

                    {/* Interactive center play state */}
                    <div className="flex-1 flex items-center justify-center relative">
                      {/* Playback animation grids */}
                      {isPlayingDemo && (
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent)] pointer-events-none animate-pulse">
                          {/* Animated scan line */}
                          <div className="w-full h-0.5 bg-indigo-500/20 absolute top-0 animate-[bounce_3s_infinite]" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-2">
                            <span className="text-xs text-indigo-400 font-mono animate-pulse">STREAMING LIVE WORKFLOW PROTOCOL</span>
                            <span className="text-[10px] text-slate-500 font-mono leading-relaxed max-w-xs">
                              Prompt: "Analyze orders by department" &rarr; Retrieving Schema metadata &rarr; Injecting embeddings &rarr; Query compiled.
                            </span>
                          </div>
                        </div>
                      )}

                      {!isPlayingDemo && (
                        <div className="absolute inset-0 bg-slate-900/30 flex flex-col items-center justify-center p-6 text-center space-y-2 pointer-events-none">
                          <span className="text-[10px] text-slate-400 font-mono">SIMULATE COGNITIVE CHATBOT SESSION</span>
                          <span className="text-[8px] text-slate-500 font-mono">COMPILER FLOW • VECTOR EMBEDDING RETRIEVAL</span>
                        </div>
                      )}

                      <button
                        onClick={() => setIsPlayingDemo(!isPlayingDemo)}
                        className="w-12 h-12 rounded-full bg-indigo-600/90 hover:bg-indigo-500 border border-indigo-400/30 flex items-center justify-center text-white shadow-lg transition-all hover:scale-105 active:scale-95 z-20 cursor-pointer"
                      >
                        {isPlayingDemo ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
                      </button>
                    </div>

                    {/* Bottom Progress Bar */}
                    <div className="p-3 bg-slate-950 border-t border-white/5 flex flex-col space-y-1.5">
                      <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full transition-all duration-150" style={{ width: `${videoProgress}%` }} />
                      </div>
                      <div className="flex justify-between text-[8px] font-mono text-slate-500">
                        <span>SYS_RENDER: COMPLETED</span>
                        <span>1080p @ 60 FPS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenges, Learnings & Futures */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase font-mono border-b border-white/5 pb-2">
                    <AlertTriangle className="w-4 h-4" /> Challenges Faced
                  </h4>
                  <ul className="space-y-2 text-[10px] text-slate-400 leading-relaxed font-sans">
                    {project.challengesFaced?.map((item, idx) => (
                      <li key={idx} className="list-disc pl-2 ml-2">{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 uppercase font-mono border-b border-white/5 pb-2">
                    <Lightbulb className="w-4 h-4" /> Key Learnings
                  </h4>
                  <ul className="space-y-2 text-[10px] text-slate-400 leading-relaxed font-sans">
                    {project.keyLearnings?.map((item, idx) => (
                      <li key={idx} className="list-disc pl-2 ml-2">{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase font-mono border-b border-white/5 pb-2">
                    <TrendingUp className="w-4 h-4" /> Future Additions
                  </h4>
                  <ul className="space-y-2 text-[10px] text-slate-400 leading-relaxed font-sans">
                    {project.futureEnhancements?.map((item, idx) => (
                      <li key={idx} className="list-disc pl-2 ml-2">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Bottom Actions Footer */}
            <div className="p-4 bg-slate-950 border-t border-white/5 flex items-center justify-between text-xs font-mono select-none">
              <span className="flex items-center gap-1.5 text-indigo-400 text-[10px]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                STANDALONE NODE: active
              </span>

              <div className="flex items-center space-x-3">
                <a
                  id="modal-github-repository-btn"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-lg flex items-center space-x-2 transition-all cursor-pointer font-bold text-[11px]"
                >
                  <Github className="w-4 h-4" />
                  <span>GITHUB REPO</span>
                </a>
                <a
                  id="modal-live-demo-btn"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 text-white rounded-lg flex items-center space-x-2 transition-all cursor-pointer font-bold text-[11px] shadow-sm shadow-indigo-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LIVE DEMO</span>
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
