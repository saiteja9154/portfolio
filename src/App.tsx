import { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Database, GraduationCap, Award, Brain, Send } from 'lucide-react';
import profileImg from './assets/profile.jpg';

// Modular Layout Sections
import HeroSection from './components/HeroSection';
import SkillMatrix from './components/SkillMatrix';
import ProjectCommandCenter from './components/ProjectCommandCenter';
import AcademicsInternships from './components/AcademicsInternships';
import CertificationVault from './components/CertificationVault';
import ContactHub from './components/ContactHub';
import RecruitmentExport from './components/RecruitmentExport';
import ResumeIntelligenceModal from './components/ResumeIntelligenceModal';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  const [isIntelligenceModalOpen, setIsIntelligenceModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero-section');

  // Track mouse coordinates for spotlight
  useEffect(() => {
    const handleMouseMove = (e: any) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // IntersectionObserver scroll spy for Active Page Indicator
  useEffect(() => {
    const sections = ['hero-section', 'skill-matrix', 'project-command-center', 'academics-internships', 'certification-vault', 'contact-hub'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Smooth scroll handler
  const scrollToView = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* 1. Global Premium AI Command Center Background Layer */}
      <div className="fixed inset-0 z-0 bg-[#050816] pointer-events-none" />
      
      {/* Subtle animated blueprint grid mesh */}
      <div className="fixed inset-0 z-0 bg-grid-blueprint animate-grid-drift opacity-25 pointer-events-none" />
      
      {/* Neural node connecting layout */}
      <div className="fixed inset-0 z-0 bg-neural-nodes opacity-12 pointer-events-none" />

      {/* Subtle circuit traces */}
      <div className="fixed inset-0 z-0 bg-circuit-traces opacity-15 pointer-events-none" />

      {/* Faint holographic scan lines */}
      <div className="fixed inset-0 z-0 holographic-scanlines opacity-25 pointer-events-none" />

      {/* Blueprint peripheral markings */}
      <div className="fixed inset-x-6 top-6 bottom-6 border border-indigo-500/5 pointer-events-none z-0">
        <div className="absolute top-2 left-2 text-[8px] font-mono text-indigo-500/30">SYS_LOC: 45.92.A</div>
        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-indigo-500/30">INTELLIGENCE_CENTER_V2.0</div>
      </div>

      {/* Ambient static gradient glow (top top and bottom right) */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,217,255,0.06),transparent_60%)] pointer-events-none" />

      {/* Dynamic Interactive Ambient Spotlight Layer */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-15 mix-blend-screen"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(0, 217, 255, 0.35), transparent 80%)'
        }}
      />

      {/* 2. Premium Apple-style Floating Glass Navigation Bar */}
      <nav className="fixed top-0 z-40 select-none floating-navbar h-16 w-[calc(100%-3rem)] max-w-7xl">
        <div className="w-full h-full px-6 flex items-center justify-between">
          
          {/* Logo Mark */}
          <div 
            onClick={() => scrollToView('hero-section')} 
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full border border-indigo-500/20 bg-slate-900/60 backdrop-blur-md flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:border-indigo-500/50 transition-all shrink-0">
              <img
                src={profileImg}
                alt="Sai Teja Revuri"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="text-xs font-mono font-bold text-white tracking-wider group-hover:text-[#00D9FF] transition-colors uppercase">
                Sai Teja Revuri
              </span>
            </div>
          </div>

          {/* Nav Links mapping to sections */}
          <div className="hidden lg:flex items-center space-x-8 text-xs font-mono text-slate-400">
            <button 
              id="nav-link-skills"
              onClick={() => scrollToView('skill-matrix')} 
              className={`nav-link hover:text-indigo-400 transition-colors cursor-pointer ${activeSection === 'skill-matrix' ? 'nav-link-active' : ''}`}
            >
              SKILLS
            </button>
            <button 
              id="nav-link-projects"
              onClick={() => scrollToView('project-command-center')} 
              className={`nav-link hover:text-indigo-400 transition-colors cursor-pointer ${activeSection === 'project-command-center' ? 'nav-link-active' : ''}`}
            >
              PROJECTS
            </button>
            <button 
              id="nav-link-academics"
              onClick={() => scrollToView('academics-internships')} 
              className={`nav-link hover:text-indigo-400 transition-colors cursor-pointer ${activeSection === 'academics-internships' ? 'nav-link-active' : ''}`}
            >
              MILESTONES
            </button>
            <button 
              id="nav-link-certs"
              onClick={() => scrollToView('certification-vault')} 
              className={`nav-link hover:text-indigo-400 transition-colors cursor-pointer ${activeSection === 'certification-vault' ? 'nav-link-active' : ''}`}
            >
              VAULT
            </button>
            <button 
              id="nav-link-contact"
              onClick={() => scrollToView('contact-hub')} 
              className={`nav-link hover:text-indigo-400 transition-colors cursor-pointer ${activeSection === 'contact-hub' ? 'nav-link-active' : ''}`}
            >
              CONTACT
            </button>
          </div>

          {/* Quick Registry Verification Call Trigger Trigger */}
          <div className="flex items-center space-x-3">
            <button
              id="nav-verify-trigger-button"
              onClick={() => setIsIntelligenceModalOpen(true)}
              className="px-4 py-1.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 border border-indigo-500/30 rounded-full text-[10px] font-mono text-indigo-300 font-bold transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer uppercase hover:shadow-[0_0_12px_rgba(0,217,255,0.3)] hover:border-indigo-400"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>LOGICAL AUDIT</span>
            </button>
          </div>

        </div>
      </nav>

      {/* 3. Primary Segmented Dashboard Layout Workspace */}
      <main className="relative z-10">
        
        {/* Sections */}
        <HeroSection 
          onOpenAuditReport={() => setIsIntelligenceModalOpen(true)} 
        />
        
        <SkillMatrix />
        
        <ProjectCommandCenter />
        
        <AcademicsInternships />
        
        <CertificationVault />
        
        <RecruitmentExport />
        
        <ContactHub />

      </main>

      {/* 4. Elegant responsive Dashboard Footer */}
      <footer className="relative border-t border-indigo-500/10 py-12 bg-slate-950/80 z-10 select-none">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-6">
          
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-indigo-500" />
            <span>SAI TEJA REVURI &copy; {new Date().getFullYear()} • CORE STATICS VERIFIED</span>
          </div>

          <div className="flex items-center space-x-4 text-[10px]">
            <span>SYSTEM_HOST: CLOUD_RUN v1.2</span>
            <span>•</span>
            <span className="text-indigo-400/80">SECURITY CHECKSUM: PASS</span>
          </div>

        </div>
      </footer>

      {/* 5. Resume Intelligence Analyzer Portal Modal Overlay */}
      <ResumeIntelligenceModal 
        isOpen={isIntelligenceModalOpen} 
        onClose={() => setIsIntelligenceModalOpen(false)} 
      />

      {/* 6. Apple-inspired Interactive Follower Cursor Component */}
      <CustomCursor />

      {/* 7. Scroll Progress Bar tracking vertical scroll depth */}
      <ScrollProgress />

    </div>
  );
}
