
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';
import { Users, TrendingUp, Star, Award, ChevronUp, UserPlus, Search, MoreHorizontal, ExternalLink, CheckCircle2, Clock, Briefcase } from 'lucide-react';

interface Trainee {
  id: string;
  name: string;
  email: string;
  program: string;
  status: 'In Training' | 'Ready for Hire' | 'Interviewing' | 'Placed';
  progress: number;
}

const HubDashboard: React.FC = () => {
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'trainees'>('analytics');
  
  const [trainees, setTrainees] = useState<Trainee[]>([
    { id: 't1', name: 'John Doe', email: 'john@example.com', program: 'Fullstack Web', status: 'In Training', progress: 65 },
    { id: 't2', name: 'Jane Smith', email: 'jane@example.com', program: 'Data Science', status: 'Ready for Hire', progress: 100 },
    { id: 't3', name: 'Alex Johnson', email: 'alex@example.com', program: 'UI/UX Design', status: 'Interviewing', progress: 100 },
    { id: 't4', name: 'Sarah Williams', email: 'sarah@example.com', program: 'Fullstack Web', status: 'Placed', progress: 100 },
  ]);

  const sentimentData = [
    { month: 'Jan', score: 4.2 },
    { month: 'Feb', score: 4.4 },
    { month: 'Mar', score: 4.3 },
    { month: 'Apr', score: 4.8 },
    { month: 'May', score: 4.7 },
    { month: 'Jun', score: 4.9 },
  ];

  const placementData = [
    { name: 'Fullstack', value: 85 },
    { name: 'UI/UX', value: 72 },
    { name: 'Data Sci', value: 92 },
    { name: 'Product', value: 68 },
  ];

  const updateStatus = (id: string, newStatus: Trainee['status']) => {
    setTrainees(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Hub Management</h1>
          <p className="text-slate-500 mt-2">Manage Lagos Tech School operations, onboarding, and outcomes.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowOnboardModal(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
          >
            <UserPlus className="w-5 h-5" /> Onboard Trainee
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`px-8 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'analytics' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Outcome Analytics
        </button>
        <button 
          onClick={() => setActiveTab('trainees')}
          className={`px-8 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'trainees' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Trainee & Placement Hub
        </button>
      </div>

      {activeTab === 'analytics' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard icon={<Star className="text-amber-500" />} label="Avg. Rating" value="4.8" change="+0.2 this month" />
            <StatCard icon={<Users className="text-indigo-500" />} label="Total Graduates" value="1,245" change="+120 new" />
            <StatCard icon={<TrendingUp className="text-emerald-500" />} label="Placement Rate" value="92%" change="+5% vs last cohort" />
            <StatCard icon={<Award className="text-violet-500" />} label="Verified Skills" value="48" change="Across 4 programs" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Student Satisfaction Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sentimentData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 5]} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={4} dot={{r: 6, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Placement Rate by Program</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={placementData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-8">
          {/* Filters and Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search trainees by name, email, or program..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div className="flex gap-3">
               <select className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>All Programs</option>
                  <option>Fullstack Web</option>
                  <option>Data Science</option>
               </select>
            </div>
          </div>

          {/* Trainee Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Trainee</th>
                    <th className="px-6 py-4">Program</th>
                    <th className="px-6 py-4">Progress</th>
                    <th className="px-6 py-4">Placement Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trainees.map(trainee => (
                    <tr key={trainee.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                            {trainee.name[0]}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{trainee.name}</div>
                            <div className="text-xs text-slate-500">{trainee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {trainee.program}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-500 ${trainee.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                                style={{ width: `${trainee.progress}%` }}
                              ></div>
                           </div>
                           <span className="text-xs font-bold text-slate-700">{trainee.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                            <select 
                              value={trainee.status}
                              onChange={(e) => updateStatus(trainee.id, e.target.value as any)}
                              className={`text-xs font-bold px-3 py-1.5 rounded-lg border-none outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
                                trainee.status === 'Placed' ? 'bg-emerald-50 text-emerald-700' :
                                trainee.status === 'Ready for Hire' ? 'bg-indigo-50 text-indigo-700' :
                                trainee.status === 'Interviewing' ? 'bg-amber-50 text-amber-700' :
                                'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <option value="In Training">In Training</option>
                              <option value="Ready for Hire">Ready for Hire</option>
                              <option value="Interviewing">Interviewing</option>
                              <option value="Placed">Placed</option>
                            </select>
                            {trainee.status === 'Ready for Hire' && (
                              <div className="group relative">
                                <CheckCircle2 className="w-4 h-4 text-indigo-500 cursor-help" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                  Visible to employers in talent discovery platform.
                                </div>
                              </div>
                            )}
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-center">
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                View All Active Trainees <ChevronUp className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Modal Overlay */}
      {showOnboardModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowOnboardModal(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 bg-slate-50">
              <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
                <UserPlus className="text-indigo-600" /> Onboard New Trainee
              </h2>
              <p className="text-slate-500 text-sm mt-2">Add a new student to your hub. They will receive an invite to complete their profile.</p>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Full Name</label>
                <input type="text" placeholder="e.g. Michael Chen" className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
                <input type="email" placeholder="michael@example.com" className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Assign Program</label>
                <select className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                  <option>Fullstack Web Development</option>
                  <option>Data Science Intensive</option>
                  <option>Product Management</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setShowOnboardModal(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowOnboardModal(false)}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                >
                  Confirm Onboarding
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value, change }: { icon: React.ReactNode, label: string, value: string, change: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
    </div>
    <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</div>
    <div className="text-sm font-medium text-slate-500 mt-1">{label}</div>
    <div className="text-xs font-bold text-emerald-600 mt-3 flex items-center gap-1">
      <ChevronUp className="w-3 h-3" /> {change}
    </div>
  </div>
);

export default HubDashboard;
