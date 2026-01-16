
import React, { useState } from 'react';
import { MOCK_CANDIDATES } from '../constants';
import { Search, Filter, MessageSquare, Download, ShieldCheck, Github } from 'lucide-react';

const EmployerDashboard: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">Talent Discovery</h1>
          <p className="text-slate-500 mt-2">Hire high-potential graduates from verified tech hubs.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold text-sm hover:bg-slate-50">
            <Download className="w-4 h-4" /> Export Candidates
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center bg-slate-50/50">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Filter by skills (e.g. React), cohort, or tech hub..."
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">
            <Filter className="w-4 h-4" /> Advanced Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Sourcing Hub</th>
                <th className="px-6 py-4">Assessment Score</th>
                <th className="px-6 py-4">Top Skills</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_CANDIDATES.map(candidate => (
                <tr key={candidate.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={candidate.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                      <div>
                        <div className="font-bold text-slate-900">{candidate.name}</div>
                        <div className="text-xs text-slate-500">Cohort: {candidate.cohort}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      {candidate.hubName}
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{width: `${candidate.assessmentScore}%`}}></div>
                        </div>
                        <span className="font-bold text-slate-900 text-sm">{candidate.assessmentScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {candidate.skills.slice(0, 2).map(s => (
                        <span key={s} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase">
                          {s}
                        </span>
                      ))}
                      {candidate.skills.length > 2 && <span className="text-[10px] text-slate-400">+{candidate.skills.length - 2} more</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${candidate.status === 'Ready for Hire' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <a href={candidate.portfolioUrl} target="_blank" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                      <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5" /> Interview
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
