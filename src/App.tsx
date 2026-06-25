import { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Database, GraduationCap, Award, Brain, Send, User } from 'lucide-react';

// Modular Layout Sections
import HeroSection from './components/HeroSection';
import SkillMatrix from './components/SkillMatrix';
import ProjectCommandCenter from './components/ProjectCommandCenter';
import AcademicsInternships from './components/AcademicsInternships';
import CertificationVault from './components/CertificationVault';
import AISandbox from './components/AISandbox';
import ContactHub from './components/ContactHub';
import RecruitmentExport from './components/RecruitmentExport';
import ResumeIntelligenceModal from './components/ResumeIntelligenceModal';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  const [isIntelligenceModalOpen, setIsIntelligenceModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Load avatar from localStorage if available & track mouse coordinates for spotlight
  useEffect(() => {
    const savedImg = localStorage.getItem('sai_teja_portfolio_avatar');
    if (savedImg) {
      setProfileImage(savedImg);
    }

    const handleMouseMove = (e: any) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Smooth scroll handler
  const scrollToView = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* 1. Global Background Grid Mesh & Accent Glow Overlays */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(16,24,48,0.3),transparent_70%)] pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Dynamic Ambient Spotlight Layer */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-15 mix-blend-screen"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(99, 102, 241, 0.45), transparent 80%)'
        }}
      />

      {/* 2. Premium Apple-style Floating Glass Navigation Bar */}
      <nav className="fixed top-0 inset-x-0 h-16 bg-slate-950/75 border-b border-white/5 backdrop-blur-md z-40 select-none">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          
          {/* Logo Mark */}
          <div 
            onClick={() => scrollToView('hero-section')} 
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 bg-slate-900/60 backdrop-blur-md flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:border-indigo-500/30 transition-all shrink-0">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Sai Teja Revuri"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-4 h-4 text-indigo-400" />
              )}
            </div>
            <span className="text-sm font-bold text-white tracking-tight font-display group-hover:text-indigo-300 transition-colors">
              Sai Teja Revuri
            </span>
          </div>

          {/* Nav Links mapping to sections */}
          <div className="hidden lg:flex items-center space-x-8 text-xs font-mono text-slate-400">
            <button 
              id="nav-link-skills"
              onClick={() => scrollToView('skill-matrix')} 
              className="hover:text-indigo-400 transition-colors"
            >
              SKILLS
            </button>
            <button 
              id="nav-link-projects"
              onClick={() => scrollToView('project-command-center')} 
              className="hover:text-indigo-400 transition-colors"
            >
              PROJECTS
            </button>
            <button 
              id="nav-link-academics"
              onClick={() => scrollToView('academics-internships')} 
              className="hover:text-indigo-400 transition-colors"
            >
              MILESTONES
            </button>
            <button 
              id="nav-link-certs"
              onClick={() => scrollToView('certification-vault')} 
              className="hover:text-indigo-400 transition-colors"
            >
              VAULT
            </button>
            <button 
              id="nav-link-sandbox"
              onClick={() => scrollToView('ai-sandbox')} 
              className="hover:text-indigo-400 transition-colors"
            >
              LABS
            </button>
            <button 
              id="nav-link-contact"
              onClick={() => scrollToView('contact-hub')} 
              className="hover:text-indigo-400 transition-colors"
            >
              CONTACT
            </button>
          </div>

          {/* Quick Registry Verification Call Trigger Trigger */}
          <div className="flex items-center space-x-3">
            <button
              id="nav-verify-trigger-button"
              onClick={() => setIsIntelligenceModalOpen(true)}
              className="px-4 py-1.5 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 hover:from-indigo-600/30 hover:to-purple-600/30 border border-indigo-500/30 rounded-full text-[10px] font-mono text-indigo-300 font-bold transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer uppercase"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
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
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
        
        <SkillMatrix />
        
        <ProjectCommandCenter />
        
        <AcademicsInternships />
        
        <CertificationVault />
        
        <AISandbox />
        
        <RecruitmentExport />
        
        <ContactHub />

      </main>

      {/* 4. Elegant responsive Dashboard Footer */}
      <footer className="relative border-t border-white/5 py-12 bg-slate-950/80 z-10 select-none">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-6">
          
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-indigo-500" />
            <span>SAI TEJA REVURI &copy; {new Date().getFullYear()} • CORE STATICS VERIFIED</span>
          </div>

          <div className="flex items-center space-x-4 text-[10px]">
            <span>SYSTEM_HOST: CLOUD_RUN v1.2</span>
            <span>•</span>
            <span className="text-indigo-400/80">SECURITY CHECKUM: PASS</span>
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
