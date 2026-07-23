import { useState } from 'react';
import { CERTIFICATION_LIST } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ShieldCheck, Filter, Search, ShieldAlert, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function CertificationVault() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIssuer, setSelectedIssuer] = useState<string>("all");

  const issuers = ["all", ...new Set(CERTIFICATION_LIST.map(c => c.issuer))];

  const filteredCerts = CERTIFICATION_LIST.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        c.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchIssuer = selectedIssuer === "all" || c.issuer === selectedIssuer;
    return matchSearch && matchIssuer;
  });

  return (
    <motion.section 
      id="certification-vault" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-24 border-b border-indigo-500/5 relative bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 select-none">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full text-xs font-mono mb-4">
              <Award className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>SECURE CREDENTIAL REGISTRY</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white font-display">
              Certification Vault
            </h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Cryptographically verified credentials awarded by Google, Amazon Web Services, and JPMorgan Chase external registries. Checksum validated.
            </p>
          </div>

          {/* Interactive Filters Panel bar */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search inputs */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="cert-search-field"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search credentials..."
                className="w-full sm:w-56 h-10 bg-slate-900/50 border border-indigo-500/10 focus:border-[#00D9FF]/40 rounded-xl pl-10 pr-4 text-xs text-white focus:outline-none transition-all font-mono placeholder-slate-600 backdrop-blur-md"
              />
            </div>

            {/* Issuer Select Filter dropdown */}
            <div className="flex bg-slate-900/60 border border-indigo-500/10 rounded-xl p-0.5 text-xs font-mono backdrop-blur-md">
              {issuers.map((issuer) => (
                <button
                  id={`filter-issuer-${issuer.toLowerCase().replace(/\s+/g, '-')}`}
                  key={issuer}
                  onClick={() => setSelectedIssuer(issuer)}
                  className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                    selectedIssuer === issuer 
                      ? 'bg-indigo-500/20 text-[#00D9FF] border border-indigo-500/30 shadow-[0_0_12px_rgba(0,217,255,0.15)] font-bold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {issuer.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Certificate Vault Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                id={`cert-vault-card-${cert.name.toLowerCase().replace(/\s+/g, '-')}`}
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                className="relative cursor-pointer premium-glass-card rounded-2xl p-6 transition-all shadow-md group overflow-hidden"
              >
                {/* Vault Grid Mesh BG line overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(79,124,255,0.01)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
                  {/* Card Header area */}
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
                      <ShieldCheck className="w-5 h-5 text-[#00D9FF]" />
                    </div>
                    {/* Verifying compliance badge display layout */}
                    <div className="flex items-center space-x-1.5 text-[9px] font-mono uppercase bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 px-2.5 py-0.5 rounded-full">
                      <span className="card-status-dot shrink-0" />
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{cert.status}</span>
                    </div>
                  </div>

                  {/* Title & Issuer text metadata block */}
                  <div>
                    <h3 className="text-sm font-bold font-display text-white group-hover:text-[#00D9FF] transition-colors leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      Issuer: <span className="text-indigo-400">{cert.issuer}</span>
                    </p>
                  </div>

                  {/* Security Checksum Verification Row block */}
                  <div className="border-t border-indigo-500/10 pt-4 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>INDEX KEY: TEJA-REG-{cert.issuer.substring(0, 3).toUpperCase()}</span>
                    <span className="flex items-center gap-1 text-[9px] text-slate-400 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      VERIFY <ArrowUpRight className="w-3 h-3 text-[#00D9FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty status check safety */}
        {filteredCerts.length === 0 && (
          <div className="text-center py-20 bg-slate-900/20 border border-indigo-500/10 rounded-2xl">
            <ShieldAlert className="w-10 h-10 mx-auto text-slate-600 animate-pulse mb-3" />
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
              Zero Matched Credentials Found in Stable Registry
            </p>
          </div>
        )}

      </div>
    </motion.section>
  );
}
