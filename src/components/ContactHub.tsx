import { useState } from 'react';
import { PERSONAL_INFO } from '../data';
import { Mail, Phone, Linkedin, Github, Copy, Check, Send, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactHub() {
  const [copiedKind, setCopiedKind] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, text: string, kind: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKind(kind);
    setTimeout(() => setCopiedKind(null), 2000);
  };

  const contactList = [
    {
      id: 'email',
      label: 'Direct Email',
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      icon: Mail,
      color: 'text-[#3B82F6] border-indigo-500/20 bg-indigo-500/10 shadow-[0_0_8px_rgba(59,130,246,0.15)]',
    },
    {
      id: 'phone',
      label: 'Phone Line',
      value: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`,
      icon: Phone,
      color: 'text-[#00D9FF] border-[#00D9FF]/20 bg-[#00D9FF]/10 shadow-[0_0_8px_rgba(0,217,255,0.15)]',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Node',
      value: PERSONAL_INFO.linkedin,
      href: `https://${PERSONAL_INFO.linkedin}`,
      icon: Linkedin,
      color: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10 shadow-[0_0_8px_rgba(16,185,129,0.15)]',
    },
    {
      id: 'github',
      label: 'GitHub Repository',
      value: PERSONAL_INFO.github,
      href: `https://${PERSONAL_INFO.github}`,
      icon: Github,
      color: 'text-amber-400 border-amber-400/20 bg-amber-400/10 shadow-[0_0_8px_rgba(245,158,11,0.15)]',
    }
  ];

  return (
    <motion.section 
      id="contact-hub" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-24 relative select-none bg-transparent"
    >
      
      {/* Decorative Blur Accent Glow grids */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Core Header info */}
        <div className="max-w-2xl text-center mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full text-xs font-mono mb-4">
            <Send className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span>ESTABLISH SECURE LINK</span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-white font-display">
            Contact Hub
          </h2>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-lg mx-auto">
            Authorize direct communication pipelines. Clean metadata validation confirms authentic, active responder handles.
          </p>
        </div>

        {/* Minimal Grid cards and connection detail */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactList.map((c) => {
            const Icon = c.icon;
            const isCopied = copiedKind === c.id;

            return (
              <motion.a
                id={`contact-medium-${c.id}`}
                key={c.id}
                href={c.href}
                target={c.id === 'linkedin' || c.id === 'github' ? '_blank' : undefined}
                rel={c.id === 'linkedin' || c.id === 'github' ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -4 }}
                className="premium-glass-card rounded-2xl p-6 flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <span className="card-status-dot" />
                  <div className={`p-3 rounded-xl border ${c.color} text-slate-200`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                      {c.label}
                    </span>
                    <span
                      id={`contact-link-tag-${c.id}`}
                      className="text-xs text-slate-200 group-hover:text-[#00D9FF] font-mono transition-colors block truncate font-semibold mt-0.5"
                    >
                      {c.value}
                    </span>
                  </div>
                </div>

                {/* Micro Action Buttons */}
                <div className="flex items-center space-x-1.5 ml-4">
                  <button
                    id={`contact-copy-button-${c.id}`}
                    onClick={(e) => handleCopy(e, c.id === 'github' ? c.href : c.value, c.id)}
                    className="p-2 bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 text-slate-400 hover:text-white rounded-lg transition-all relative z-10 cursor-pointer"
                    title="Copy Handle"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
}
