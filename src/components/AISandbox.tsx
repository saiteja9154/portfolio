import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Play, Copy, Check, RotateCcw, AlertCircle, Database, HelpCircle, FileText, BarChart3, LineChart, Plus, Search, CheckCircle2, ShieldAlert, Activity } from 'lucide-react';

interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  admissionDate: string;
  status: 'Stable' | 'Critical' | 'Discharged';
  lastUpdated: string;
}

export default function AISandbox() {
  // Clinic Patient Record System State
  const initialPatients: PatientRecord[] = [
    { id: "P-1042", name: "Rahul Sharma", age: 34, gender: "Male", condition: "Chronic Hypertension", admissionDate: "2026-06-01", status: "Stable", lastUpdated: "2026-06-08" },
    { id: "P-1043", name: "Ananya Iyer", age: 28, gender: "Female", condition: "Acute Appendicitis", admissionDate: "2026-06-05", status: "Critical", lastUpdated: "2026-06-11" },
    { id: "P-1044", name: "Vikram Malhotra", age: 45, gender: "Male", condition: "Type II Diabetes Mellitus", admissionDate: "2026-05-18", status: "Stable", lastUpdated: "2026-06-09" },
    { id: "P-1045", name: "Priya Nair", age: 31, gender: "Female", condition: "Post-Op Recovery", admissionDate: "2026-06-09", status: "Stable", lastUpdated: "2026-06-11" },
  ];

  const [patients, setPatients] = useState<PatientRecord[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState("");
  
  // New Patient Form input states
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientAge, setNewPatientAge] = useState<number>(30);
  const [newPatientGender, setNewPatientGender] = useState("Male");
  const [newPatientCondition, setNewPatientCondition] = useState("");
  const [newPatientStatus, setNewPatientStatus] = useState<'Stable' | 'Critical' | 'Discharged'>('Stable');
  const [formError, setFormError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // SQL State
  const [sqlQuery, setSqlQuery] = useState("Show top 10 customers sorted by annual revenue");
  const [generatedSQL, setGeneratedSQL] = useState("");
  const [isSQLCopied, setIsSQLCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Active Sandbox Tab: 'clinic' replaces 'emotion'
  const [activeTab, setActiveTab] = useState<'clinic' | 'sql'>('clinic');

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim()) {
      setFormError("Patient name is required.");
      return;
    }
    if (!newPatientCondition.trim()) {
      setFormError("Clinical condition is required.");
      return;
    }

    const nextIdNum = Math.floor(1000 + Math.random() * 9000);
    const newRecord: PatientRecord = {
      id: `P-${nextIdNum}`,
      name: newPatientName.trim(),
      age: Number(newPatientAge) || 30,
      gender: newPatientGender,
      condition: newPatientCondition.trim(),
      admissionDate: new Date().toISOString().split('T')[0],
      status: newPatientStatus,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    setPatients((prev) => [newRecord, ...prev]);
    setNewPatientName("");
    setNewPatientCondition("");
    setFormError("");
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleResetRecords = () => {
    setPatients(initialPatients);
    setSearchTerm("");
    setFormError("");
  };

  const sqlPresets = [
    { label: "Show top 10 customers", query: "Show top 10 customers sorted by annual revenue" },
    { label: "Find expensive orders", query: "Find all active orders with price above 500" },
    { label: "Group by department", query: "Get average salary of employee grouped by department" },
    { label: "Subscribers JOIN orders", query: "Join users and orders on user_id where subscription is active" }
  ];

  // SQL translation compiler
  const handleSQLCompile = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const q = sqlQuery.toLowerCase();
      let sql = "";

      if (q.includes("top 10") || q.includes("limit 10")) {
        sql = "SELECT customer_id, customer_name, annual_revenue \nFROM customers \nORDER BY annual_revenue DESC \nLIMIT 10;";
      } else if (q.includes("active orders") || q.includes("price above")) {
        sql = "SELECT order_id, customer_id, total_price, order_status \nFROM orders \nWHERE order_status = 'ACTIVE' AND total_price > 500 \nORDER BY total_price DESC;";
      } else if (q.includes("group by department") || q.includes("average salary")) {
        sql = "SELECT department, AVG(salary) AS average_salary, COUNT(*) AS employee_count \nFROM employees \nGROUP BY department \nHAVING COUNT(*) > 1 \nORDER BY average_salary DESC;";
      } else if (q.includes("join users") || q.includes("subscription")) {
        sql = "SELECT u.user_id, u.username, o.order_id, o.date \nFROM users u \nINNER JOIN orders o ON u.user_id = o.user_id \nWHERE u.status = 'active' \nORDER BY o.date DESC;";
      } else {
        // Generic fallback parser with dynamic tables
        const hasSalary = q.includes("salary") || q.includes("employee");
        const hasRevenue = q.includes("revenue") || q.includes("customer");
        const hasOrder = q.includes("order") || q.includes("price");

        let select = "*";
        let table = "data_registry";
        let where = "";

        if (hasSalary) {
          select = "employee_id, employee_name, salary, department";
          table = "employees";
        } else if (hasRevenue) {
          select = "customer_id, company_name, revenue";
          table = "customers";
        } else if (hasOrder) {
          select = "order_id, product_name, price, status";
          table = "orders";
        }

        if (q.includes("above") || q.includes("over") || q.includes(">")) {
          const num = q.match(/\d+/)?.[0] || "100";
          where = `\nWHERE price > ${num} OR salary > ${num}`;
        } else if (q.includes("find") || q.includes("where")) {
          where = "\nWHERE status = 'ACTIVE'";
        }

        sql = `SELECT ${select} \nFROM ${table}${where} \nLIMIT 50;`;
      }

      setGeneratedSQL(sql);
      setIsGenerating(false);
      setIsSQLCopied(false);
    }, 600);
  };

  useEffect(() => {
    handleSQLCompile();
  }, [sqlQuery]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSQL);
    setIsSQLCopied(true);
    setTimeout(() => setIsSQLCopied(false), 2000);
  };

  // Colorizers for premium output
  const renderFormattedSQL = (code: string) => {
    return code.split('\n').map((line, i) => {
      return (
        <div key={i} className="line">
          {line.split(' ').map((word, wIdx) => {
            const upperWord = word.toUpperCase();
            const isKeyword = ['SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'DESC', 'LIMIT', 'JOIN', 'INNER', 'ON', 'GROUP', 'HAVING', 'AVG', 'AS', 'AND', 'OR', 'COUNT(*)'].includes(upperWord);
            if (isKeyword) {
              return <span key={wIdx} className="text-purple-400 font-bold">{word} </span>;
            } else if (word.startsWith("'") || word.endsWith("'") || !isNaN(Number(word.replace(';', '')))) {
              return <span key={wIdx} className="text-emerald-400">{word} </span>;
            } else {
              return <span key={wIdx} className="text-slate-200">{word} </span>;
            }
          })}
        </div>
      );
    });
  };

  return (
    <motion.section 
      id="ai-sandbox" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className="py-24 border-b border-white/5 relative bg-slate-950/70 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full text-xs font-mono mb-4">
            <Database className="w-3.5 h-3.5 animate-pulse" />
            <span>INTERACTIVE COMPUTATION EXPERIMENTS</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white font-display">
            Project Command Center Sandbox
          </h2>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed">
            Test custom schemas and active system prototypes. Interact with the multi-dimensional Patient Records Registry or query the structured translation compiler.
          </p>
        </div>

        {/* Console Hub Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-white/5 border-t-white/15 shadow-[inset_0_1px_0px_rgba(255,255,255,0.08)] rounded-3xl bg-slate-900/10 overflow-hidden">
          
          {/* Dashboard Left Sidebar - Selector */}
          <div className="col-span-1 lg:col-span-3 bg-white/[0.02] border-r border-white/5 p-6 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase block mb-4">SELECT ALGORITHM MODULE</span>
              
              <button
                id="tab-clinic-record"
                onClick={() => setActiveTab('clinic')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl border text-left transition-all ${
                  activeTab === 'clinic' 
                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' 
                    : 'bg-transparent border-transparent text-slate-400 hover:bg-white/5'
                }`}
              >
                <Activity className="w-4 h-4" />
                <div className="flex-1">
                  <span className="text-xs font-bold block">Clinic Patient Records</span>
                  <span className="text-[9px] text-slate-500 font-mono">REGISTRY ID: CLINIC-RECORD-SYSTEM</span>
                </div>
              </button>

              <button
                id="tab-sql-generator"
                onClick={() => setActiveTab('sql')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl border text-left transition-all ${
                  activeTab === 'sql' 
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' 
                    : 'bg-transparent border-transparent text-slate-400 hover:bg-white/5'
                }`}
              >
                <Database className="w-4 h-4" />
                <div className="flex-1">
                  <span className="text-xs font-bold block">AI SQL Compiler</span>
                  <span className="text-[9px] text-slate-500 font-mono">NATURAL GRAMMAR</span>
                </div>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">AUDITED MODEL SCHEMAS</span>
              <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                <span>CLINIC-RECORD-SYSTEM</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                <span>SQL-LEX-V1</span>
              </div>
            </div>
          </div>

          {/* Sandbox Right Workspace - Output UI */}
          <div className="col-span-1 lg:col-span-9 p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'clinic' && (
                <motion.div
                  id="sandbox-clinic-panel"
                  key="clinic-workspace"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="text-lg font-bold font-display text-white">Clinic Patient Record System</h3>
                    <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3 py-0.5 rounded-full font-mono">REGISTRY ID: CLINIC-RECORD-SYSTEM</span>
                  </div>

                  {/* Summary Metric Counters */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-900/40 border border-white/5 rounded-xl p-3 text-center">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase">Total Patient Records</span>
                      <span className="text-xl font-bold text-white font-mono mt-1 block">{patients.length}</span>
                    </div>
                    <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-3 text-center">
                      <span className="text-[10px] font-mono text-amber-500 block uppercase">Active Critical</span>
                      <span className="text-xl font-bold text-amber-400 font-mono mt-1 block">{patients.filter(p => p.status === 'Critical').length}</span>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3 text-center">
                      <span className="text-[10px] font-mono text-emerald-500 block uppercase">Stable / Discharged</span>
                      <span className="text-xl font-bold text-emerald-400 font-mono mt-1 block">{patients.filter(p => p.status !== 'Critical').length}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Registry Patient List & Search */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="flex items-center space-x-3 bg-black/40 border border-white/5 rounded-xl px-3 py-2">
                        <Search className="w-4 h-4 text-slate-500" />
                        <input
                          id="patient-search-input"
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none"
                          placeholder="Search patient registry by ID, name, or condition..."
                        />
                        {searchTerm && (
                          <button
                            id="clear-search-btn"
                            onClick={() => setSearchTerm("")}
                            className="text-[10px] text-indigo-400 hover:text-indigo-300 font-mono"
                          >
                            CLR
                          </button>
                        )}
                      </div>

                      {/* Patient Mini-Data Table */}
                      <div className="bg-black/20 border border-white/5 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] font-mono text-slate-500 uppercase">
                              <th className="p-3">ID / Name</th>
                              <th className="p-3">Details</th>
                              <th className="p-3">Clinical Condition</th>
                              <th className="p-3 text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 font-sans text-xs">
                            {filteredPatients.length > 0 ? (
                              filteredPatients.map((p) => (
                                <tr key={p.id} className="hover:bg-white/[0.01] transition-colors">
                                  <td className="p-3">
                                    <span className="font-mono text-[10px] text-slate-500 block">{p.id}</span>
                                    <span className="font-semibold text-white block">{p.name}</span>
                                  </td>
                                  <td className="p-3 text-slate-400">
                                    {p.age} y/o • {p.gender}
                                  </td>
                                  <td className="p-3">
                                    <span className="text-indigo-300 font-medium">{p.condition}</span>
                                    <span className="text-[9px] text-slate-500 block font-mono">Admitted: {p.admissionDate}</span>
                                  </td>
                                  <td className="p-3 text-right">
                                    <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-mono font-bold ${
                                      p.status === 'Critical'
                                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                        : p.status === 'Discharged'
                                        ? 'bg-slate-500/10 text-slate-400 border border-white/5'
                                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    }`}>
                                      {p.status}
                                    </span>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={4} className="p-6 text-center text-slate-500 font-mono text-[11px]">
                                  NO CORRESPONDING RECORDS PRESENT IN DATABASE
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>Database records query matched: {filteredPatients.length} row(s)</span>
                        <button
                          id="reset-records-btn"
                          onClick={handleResetRecords}
                          className="hover:text-indigo-400 flex items-center gap-1 transition-all"
                        >
                          <RotateCcw className="w-3 h-3" /> Reset Database Records
                        </button>
                      </div>
                    </div>

                    {/* Admit / Create Patient Entry Panel */}
                    <div className="md:col-span-5 bg-white/[0.01] border border-white/5 rounded-xl p-5 space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">RECORD ENTRY PROTOCOL</span>
                        <h4 className="text-xs font-bold text-white mt-1">Admit New Patient</h4>
                      </div>

                      <form onSubmit={handleAddPatient} className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-slate-500 uppercase block">Patient Name</label>
                          <input
                            id="new-patient-name"
                            type="text"
                            value={newPatientName}
                            onChange={(e) => setNewPatientName(e.target.value)}
                            className="w-full bg-[#090d16] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                            placeholder="e.g. Aditi Sharma"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-slate-500 uppercase block">Age</label>
                            <input
                              id="new-patient-age"
                              type="number"
                              min={1}
                              max={120}
                              value={newPatientAge}
                              onChange={(e) => setNewPatientAge(Number(e.target.value))}
                              className="w-full bg-[#090d16] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-slate-500 uppercase block">Gender</label>
                            <select
                              id="new-patient-gender"
                              value={newPatientGender}
                              onChange={(e) => setNewPatientGender(e.target.value)}
                              className="w-full bg-[#090d16] border border-white/5 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-slate-500 uppercase block">Clinical Condition</label>
                          <input
                            id="new-patient-condition"
                            type="text"
                            value={newPatientCondition}
                            onChange={(e) => setNewPatientCondition(e.target.value)}
                            className="w-full bg-[#090d16] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                            placeholder="e.g. Acute Gastritis"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-slate-500 uppercase block">Triage Status</label>
                          <div className="grid grid-cols-3 gap-1">
                            {(['Stable', 'Critical', 'Discharged'] as const).map((stat) => (
                              <button
                                type="button"
                                key={stat}
                                onClick={() => setNewPatientStatus(stat)}
                                className={`px-2 py-1.5 rounded-lg text-[9px] font-mono font-bold border transition-all ${
                                  newPatientStatus === stat
                                    ? stat === 'Critical'
                                      ? 'bg-red-500/20 border-red-500 text-red-300'
                                      : stat === 'Discharged'
                                      ? 'bg-slate-400/20 border-slate-400 text-slate-300'
                                      : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                                    : 'bg-transparent border-white/5 text-slate-500 hover:bg-white/5'
                                }`}
                              >
                                {stat}
                              </button>
                            ))}
                          </div>
                        </div>

                        {formError && (
                          <div className="text-[10px] text-red-400 font-mono flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{formError}</span>
                          </div>
                        )}

                        {isSuccess && (
                          <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Record inserted successfully!</span>
                          </div>
                        )}

                        <button
                          id="btn-confirm-admit"
                          type="submit"
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> INSERT PATIENT RECORD
                        </button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'sql' && (
                <motion.div
                  id="sandbox-sql-panel"
                  key="sql-workspace"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="text-lg font-bold font-display text-white">AI SQL Compiler</h3>
                    <span className="text-[10px] bg-purple-500/10 border border-purple-500/20 text-purple-300 px-3 py-0.5 rounded-full font-mono">PARSING TRANSLATION SYSTEM</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Console Control & Input */}
                    <div className="md:col-span-5 space-y-4">
                      {/* Presets List */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">PRESET LOGIC PATTERNS</span>
                        <div className="space-y-1.5">
                          {sqlPresets.map((p, pIdx) => (
                            <button
                              id={`sql-preset-button-${pIdx}`}
                              key={pIdx}
                              onClick={() => setSqlQuery(p.query)}
                              className="w-full text-left text-[11px] px-3.5 py-2.5 bg-white/[0.02] hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/20 rounded-xl transition-all font-mono text-slate-300 block truncate"
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Natural input */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">NATURAL LANGUAGE QUERY</span>
                        <input
                          id="sql-input-field"
                          type="text"
                          value={sqlQuery}
                          onChange={(e) => setSqlQuery(e.target.value)}
                          className="w-full h-11 bg-black/40 border border-white/5 focus:border-purple-500/40 rounded-xl px-4 text-xs text-white focus:outline-none transition-all font-mono font-medium"
                          placeholder="Type filter logic..."
                        />
                      </div>
                    </div>

                    {/* Code Editor Output Display */}
                    <div className="md:col-span-7 flex flex-col h-[320px]">
                      <div className="flex items-center justify-between bg-slate-900 border border-white/5 px-4 py-2.5 rounded-t-xl text-[11px] text-slate-400 font-mono">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                          <span className="pl-2 font-bold text-slate-300 flex items-center gap-1">
                            <Terminal className="w-3.5 h-3.5 text-purple-400" /> query_compiler.sql
                          </span>
                        </div>
                        <button
                          id="copy-sql-code-button"
                          onClick={copyToClipboard}
                          className="p-1 text-slate-400 hover:text-white bg-white/5 rounded hover:bg-white/10 transition-colors flex items-center gap-1.5 px-2 py-0.5 border border-white/5 text-[10px]"
                        >
                          {isSQLCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" /> Copy Code
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex-1 bg-black/80 border-x border-b border-white/5 p-5 rounded-b-xl overflow-y-auto font-mono text-xs leading-relaxed text-slate-300">
                        {isGenerating ? (
                          <div className="h-full flex items-center justify-center space-x-2 text-slate-500 text-xs">
                            <span className="animate-spin w-4 h-4 border border-indigo-500 border-t-transparent rounded-full" />
                            <span>COMPILING PARSED QUERY...</span>
                          </div>
                        ) : (
                          renderFormattedSQL(generatedSQL)
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
