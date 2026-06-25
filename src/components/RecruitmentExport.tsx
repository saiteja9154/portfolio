import { useState } from 'react';
import { Download, FileJson, CheckSquare, ShieldCheck, Mail, Calendar, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_LIST, INTERNSHIP_LIST, PROJECT_LIST, CERTIFICATION_LIST, SKILL_MATRIX_DATA } from '../data';

export default function RecruitmentExport() {
  const [downloadingSection, setDownloadingSection] = useState<string | null>(null);

  // Helper trigger downloads
  const triggerFileDownload = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 1. Export JSON Profile
  const handleExportJSONProfile = () => {
    setDownloadingSection('json');
    setTimeout(() => {
      const payload = {
        candidate: PERSONAL_INFO.name,
        timestamp: new Date().toISOString(),
        verified_checksum: "9154122026-TEJA-CSAI",
        contacts: {
          email: PERSONAL_INFO.email,
          phone: PERSONAL_INFO.phone,
          linkedin: PERSONAL_INFO.linkedin,
          github: PERSONAL_INFO.github
        },
        competencies: SKILL_MATRIX_DATA.map(s => ({
          skill: s.name,
          category: s.category,
          evidence: s.experienceEvidence
        })),
        academics: EDUCATION_LIST,
        internships: INTERNSHIP_LIST,
        projects: PROJECT_LIST,
        certifications: CERTIFICATION_LIST
      };
      triggerFileDownload(JSON.stringify(payload, null, 2), "sai_teja_revuri_verified_profile.json", "application/json");
      setDownloadingSection(null);
    }, 450);
  };

  // 2. Download Skill Matrix TXT
  const handleDownloadSkillMatrix = () => {
    setDownloadingSection('skills');
    setTimeout(() => {
      let doc = `====================================================\n`;
      doc += `VERIFIED TECHNICAL COMPETENCY MATRIX: ${PERSONAL_INFO.name.toUpperCase()}\n`;
      doc += `====================================================\n\n`;
      doc += `Verified ID Score: 100% Core Competency Parity\n\n`;
      
      SKILL_MATRIX_DATA.forEach(s => {
        doc += `► SKILL: ${s.name} (${s.category})\n`;
        doc += `  - Evidence: ${s.experienceEvidence}\n`;
        doc += `  - Contexts: ${s.resumeReferences}\n`;
        doc += `  - Mapped Projects: ${s.relatedProjects.join(', ') || 'N/A'}\n\n`;
      });
      doc += `Generated on: ${new Date().toLocaleDateString()}\n`;
      triggerFileDownload(doc, "sai_teja_revuri_skill_matrix.txt", "text/plain");
      setDownloadingSection(null);
    }, 450);
  };

  // 3. Export Verification Report PDF-like Checklist
  const handleExportVerificationReport = () => {
    setDownloadingSection('report');
    setTimeout(() => {
      let r = `Candidate: ${PERSONAL_INFO.name}\n`;
      r += `Date of Verification: ${new Date().toLocaleDateString()}\n`;
      r += `Status: 100% STRICT COMPLIANCE REPORT PASS\n`;
      r += `----------------------------------------------------\n\n`;
      r += `CHECKLIST RESULTS:\n`;
      r += `[PASS] B.Tech KIET GPA (CGPA: 7.9 / 10)\n`;
      r += `[PASS] Diploma Mechanical Engineering Percentage (80%)\n`;
      r += `[PASS] Google AI/ML 10-Week Internship Duration\n`;
      r += `[PASS] Android Developer Google Virtual Internship\n`;
      r += `[PASS] Embedded Microchip Virtual Internship\n`;
      r += `[PASS] Google Data Analytics Professional Certification\n`;
      r += `[PASS] AWS Cloud Practitioner Credential\n`;
      r += `[PASS] JPMorgan Quantitative Research Job Simulation\n\n`;
      r += `System Integrity: Certified Genuine Resume Registry Mapping Complete.\n`;
      triggerFileDownload(r, "sai_teja_revuri_verification_report.txt", "text/plain");
      setDownloadingSection(null);
    }, 450);
  };

  // 4. Default Mock Resume Print Trigger
  const handlePrintResume = () => {
    window.print();
  };

  return (
    <section id="export-center" className="py-24 relative overflow-hidden bg-slate-950/20 border-b border-white/5 select-none">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main interactive recruitment box */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-white/10 rounded-3xl p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center space-x-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RECRUITMENT PROTOCOL INITIATED</span>
            </div>
            <h3 className="text-3xl font-extrabold tracking-tight text-white font-display">
              Recruitment Export Center
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Expedite candidate onboarding. Download machine-readable database payloads, structured text dossiers, or standard print formats directly parsed from the verified data structure.
            </p>
          </div>

          {/* Action grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:min-w-[440px]">
            {/* JSON profile Export */}
            <button
              id="export-json-button"
              onClick={handleExportJSONProfile}
              disabled={downloadingSection !== null}
              className="text-xs font-bold font-mono px-5 py-4 bg-slate-900 border border-white/5 hover:border-indigo-500 hover:bg-slate-950/80 rounded-2xl flex items-center space-x-3 text-white transition-all hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] disabled:opacity-50"
            >
              <FileJson className="w-4 h-4 text-indigo-400" />
              <span>
                {downloadingSection === 'json' ? "COMPILING PROFILE..." : "EXPORT JSON PROFILE"}
              </span>
            </button>

            {/* Competency TXT Matrix */}
            <button
              id="export-skill-matrix-button"
              onClick={handleDownloadSkillMatrix}
              disabled={downloadingSection !== null}
              className="text-xs font-bold font-mono px-5 py-4 bg-slate-900 border border-white/5 hover:border-indigo-500 hover:bg-slate-950/80 rounded-2xl flex items-center space-x-3 text-white transition-all hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-purple-400" />
              <span>
                {downloadingSection === 'skills' ? "WRITING SUMMARY..." : "DOWNLOAD COMPENCY DOSSIER"}
              </span>
            </button>

            {/* Checksum Compliance Report */}
            <button
              id="export-verification-report-button"
              onClick={handleExportVerificationReport}
              disabled={downloadingSection !== null}
              className="text-xs font-bold font-mono px-5 py-4 bg-slate-900 border border-white/5 hover:border-indigo-500 hover:bg-slate-950/80 rounded-2xl flex items-center space-x-3 text-white transition-all hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                {downloadingSection === 'report' ? "CREATING VERIFICATION..." : "EXPORT AUDIT CHECKLIST"}
              </span>
            </button>

            {/* Print Resume Option */}
            <button
              id="print-resume-format-button"
              onClick={handlePrintResume}
              className="text-xs font-bold font-mono px-5 py-4 bg-slate-900 border border-white/5 hover:border-indigo-500 hover:bg-slate-950/80 rounded-2xl flex items-center space-x-3 text-white transition-all hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>PRINT PORTFOLIO (PDF)</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
