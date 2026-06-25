import { useState, useEffect } from 'react';
import { EDUCATION_LIST, INTERNSHIP_LIST } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Briefcase, Calendar, MapPin, Award, Terminal, CheckCircle2 } from 'lucide-react';

export default function AcademicsInternships() {
  const [activeTimelineTab, setActiveTimelineTab] = useState<'all' | 'academics' | 'internships'>('all');

  useEffect(() => {
    const handleSetInternships = () => {
      setActiveTimelineTab('internships');
    };
    window.addEventListener('select-internships-tab', handleSetInternships);
    return () => {
      window.removeEventListener('select-internships-tab', handleSetInternships);
    };
  }, []);

  const filteredTimeline = [
    ...EDUCATION_LIST.map(edu => ({
      type: 'academic' as const,
      title: edu.degree,
      subtitle: edu.institution,
      metric: edu.gpaOrPercentage,
      duration: edu.period,
      details: edu.type === 'btech' ? 'Computer Science and Artificial Intelligence Student' : 'Diploma in Mechanical Engineering Graduate',
      points: [
        edu.type === 'btech' 
          ? "Specializing in Big Data Analytics, statistical modeling, database mechanics, and AI principles."
          : "Acquired fundamental mathematical grounding, system layouts, physical engine profiles, and structured workflow controls."
      ]
    })),
    ...INTERNSHIP_LIST.map(ist => ({
      type: 'internship' as const,
      title: `${ist.role} — ${ist.organization}`,
      subtitle: ist.organization,
      metric: "Completed",
      duration: ist.duration,
      details: `Project Framework Focus: ${ist.technologies.join(', ')}`,
      points: ist.achievements
    }))
  ];

  const filteredTimelineData = filteredTimeline.filter(item => {
    if (activeTimelineTab === 'all') return true;
    if (activeTimelineTab === 'academics') return item.type === 'academic';
    return item.type === 'internship';
  });

  return (
    <motion.section 
      id="academics-internships" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-24 border-b border-white/5 relative bg-slate-950/40 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full text-xs font-mono mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>CHRONOLOGICAL MILESTONE JOURNAL</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white font-display">
              Education & Internships
            </h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Mapped milestones spanning computer science, machine learning implementations, physical engineering foundations, and platform development workflows.
            </p>
          </div>

          {/* Tab toggles */}
          <div id="internship-ledger" className="flex bg-slate-900 border border-white/5 rounded-xl p-1 text-[11px] font-mono select-none">
            <button
              id="timeline-filter-all"
              onClick={() => setActiveTimelineTab('all')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTimelineTab === 'all' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ALL RECORDS
            </button>
            <button
              id="timeline-filter-academics"
              onClick={() => setActiveTimelineTab('academics')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTimelineTab === 'academics' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ACADEMICS
            </button>
            <button
              id="timeline-filter-internships"
              onClick={() => setActiveTimelineTab('internships')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTimelineTab === 'internships' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              INTERNSHIPS (VIRTUAL)
            </button>
          </div>
        </div>

        {/* Timeline Map Container */}
        <div className="relative border-l-2 border-white/5 ml-4 md:ml-32 space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredTimelineData.map((item, idx) => {
              const isAcademic = item.type === 'academic';

              return (
                <motion.div
                  id={`milestone-item-${idx}`}
                  key={item.title}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative pl-10 md:pl-16 group"
                >
                  {/* Floating Left Side absolute date label on Desktop */}
                  <div className="hidden md:block absolute right-full mr-12 top-1 text-right w-24">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                      {item.duration.split(' ')[0]}
                    </span>
                    <span className="text-[9px] font-mono text-indigo-400/80 block mt-0.5">
                      {item.duration.replace(/^[0-9]+/, '') || 'RECORD'}
                    </span>
                  </div>

                  {/* Node Connector Bullet mark */}
                  <div className={`absolute left-0 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isAcademic 
                      ? 'bg-indigo-950 border-indigo-500 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.2)]' 
                      : 'bg-purple-950 border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                  }`}>
                    {isAcademic ? <GraduationCap className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                  </div>

                  {/* Milestone Card Body */}
                  <div className="bg-slate-900/30 border border-white/5 border-t-white/15 shadow-[inset_0_1px_0px_rgba(255,255,255,0.08)] hover:border-white/15 rounded-2xl p-6 md:p-8 transition-colors">
                    
                    {/* Header line context banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        {/* Mobile date badge display path */}
                        <span className="inline-block md:hidden text-[9px] font-mono uppercase bg-slate-900 border border-white/5 text-slate-500 px-2 py-0.5 rounded-md mb-2">
                          {item.duration}
                        </span>
                        <h3 className="text-lg font-bold font-display text-white">
                          {item.title}
                        </h3>
                        <p className="text-xs text-indigo-300 font-medium mt-1">
                          {item.subtitle}
                        </p>
                      </div>

                      <div className="flex-shrink-0 flex items-center">
                        <span className={`text-[10px] font-mono font-bold uppercase border px-3 py-1 rounded-xl flex items-center gap-1.5 ${
                          isAcademic 
                            ? 'bg-indigo-500/10 border-indigo-505/20 text-indigo-300' 
                            : 'bg-purple-500/10 border-purple-505/20 text-purple-300'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{item.metric}</span>
                        </span>
                      </div>
                    </div>

                    {/* Context description line */}
                    <p className="text-xs text-slate-400 font-mono mb-4 leading-normal">
                      {item.details}
                    </p>

                    {/* Check items list */}
                    <ul className="space-y-2.5 border-t border-white/5 pt-4">
                      {item.points.map((p, pIdx) => (
                        <li key={pIdx} className="flex items-start text-xs text-slate-300 leading-relaxed font-sans">
                          <span className="text-indigo-400 mr-2.5 font-bold mt-0.5">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </motion.section>
  );
}
