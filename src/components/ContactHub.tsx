import { useState } from 'react';
import { PERSONAL_INFO } from '../data';
import { Mail, Phone, Linkedin, Github, Copy, Check, Send, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactHub() {
  const [copiedKind, setCopiedKind] = useState<string | null>(null);

  const handleCopy = (text: string, kind: string) => {
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
      color: 'text-indigo-400 border-indigo-505/10 bg-indigo-505/5',
    },
    {
      id: 'phone',
      label: 'Phone Line',
      value: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone}`,
      icon: Phone,
      color: 'text-purple-400 border-purple-505/10 bg-purple-505/5',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Node',
      value: PERSONAL_INFO.linkedin,
      href: `https://${PERSONAL_INFO.linkedin}`,
      icon: Linkedin,
      color: 'text-emerald-400 border-emerald-505/10 bg-emerald-505/5',
    },
    {
      id: 'github',
      label: 'GitHub Repository',
      value: PERSONAL_INFO.github,
      href: `https://${PERSONAL_INFO.github}`,
      icon: Github,
      color: 'text-amber-400 border-amber-550/10 bg-amber-550/5',
    }
  ];

  return (
    <motion.section 
      id="contact-hub" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className="py-24 relative select-none bg-slate-950/20"
    >
      
      {/* Decorative Blur Accent Glow grids */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Core Header info */}
        <div className="max-w-2xl text-center mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-505/30 text-indigo-400 px-3 py-1 rounded-full text-xs font-mono mb-4">
            <Send className="w-3.5 h-3.5" />
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
              <motion.div
                id={`contact-medium-${c.id}`}
                key={c.id}
                whileHover={{ rotateX: 4, rotateY: -4, scale: 1.01 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="bg-slate-900/30 border border-white/5 border-t-white/15 shadow-[inset_0_1px_0px_rgba(255,255,255,0.08)] hover:border-white/12 rounded-2xl p-6 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <div className={`p-3 rounded-xl border ${c.color} text-slate-200`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                      {c.label}
                    </span>
                    <a
                      id={`contact-link-tag-${c.id}`}
                      href={c.href}
                      target="_blank"
                      rel="noreferrer referrer"
                      className="text-xs text-slate-200 hover:text-indigo-400 font-mono transition-colors block truncate font-semibold mt-0.5"
                    >
                      {c.value}
                    </a>
                  </div>
                </div>

                {/* Micro Action Buttons */}
                <div className="flex items-center space-x-1.5 ml-4">
                  <button
                    id={`contact-copy-button-${c.id}`}
                    onClick={() => handleCopy(c.value, c.id)}
                    className="p-2 bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 text-slate-400 hover:text-white rounded-lg transition-all"
                    title="Copy Handle"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
}
