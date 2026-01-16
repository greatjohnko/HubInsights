
import React, { useState, useEffect } from 'react';
import { TechHub, Review, Program } from '../types';
import { getGeminiInsights } from '../services/gemini';
import { Star, MapPin, CheckCircle, Users, Trophy, DollarSign, Loader2, Sparkles, Download, Send, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface HubProfileProps {
  hub: TechHub;
  reviews: Review[];
}

const HubProfile: React.FC<HubProfileProps> = ({ hub, reviews }) => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [applyingProgram, setApplyingProgram] = useState<Program | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const loadInsight = async () => {
      setLoadingInsight(true);
      const res = await getGeminiInsights(hub.name, reviews);
      setAiInsight(res || "Analysis error.");
      setLoadingInsight(false);
    };
    loadInsight();
  }, [hub.name, reviews]);

  const handleApply = (program?: Program) => {
    setApplyingProgram(program || hub.programs[0]);
  };

  const submitApplication = () => {
    // Simulate API call
    setApplyingProgram(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`${hub.name} curriculum downloaded successfully!`);
    }, 1500);
  };

  const cohortStats = [
    { name: 'Completion', value: hub.completionRate },
    { name: 'Placement', value: hub.placementRate },
    { name: 'ROI Increase', value: hub.avgSalaryIncrease }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative">
      {/* Feedback Toast */}
      {showSuccess && (
        <div className="fixed top-24 right-8 z-[60] bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300">
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold">Application Sent Successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 mb-12">
        <img src={hub.logo} alt={hub.name} className="w-32 h-32 rounded-2xl bg-slate-50 object-cover border border-slate-100" />
        <div className="flex-1">
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-4xl font-extrabold text-slate-900">{hub.name}</h1>
            {hub.verified && (
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" /> VERIFIED PROVIDER
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-slate-500 mt-2">
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {hub.location}</span>
            <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1" /> Price Range: {hub.priceRange}</span>
            <span className="flex items-center"><Star className="w-4 h-4 mr-1 text-amber-500 fill-amber-500" /> {hub.rating} ({hub.reviewCount} reviews)</span>
          </div>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed max-w-3xl">{hub.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {hub.techStack.map(s => (
              <span key={s} className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold">{s}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 min-w-[200px]">
          <button 
            onClick={() => handleApply()}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Apply to Program
          </button>
          <button 
            onClick={handleDownload}
            disabled={downloading}
            className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {downloading ? 'Preparing...' : 'Download Curriculum'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Stats & Reviews */}
        <div className="lg:col-span-2 space-y-12">
          {/* AI Insights Card */}
          <section className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-amber-300" />
                <h3 className="text-xl font-bold">Smart AI Analysis</h3>
              </div>
              {loadingInsight ? (
                <div className="flex items-center gap-3 py-4">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="animate-pulse">Analyzing graduate reviews for honest feedback...</span>
                </div>
              ) : (
                <p className="text-indigo-50 text-lg leading-relaxed italic">
                  "{aiInsight}"
                </p>
              )}
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Users className="w-32 h-32" />
            </div>
          </section>

          {/* Outcome Metrics */}
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Verified Outcome Metrics</h3>
            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cohortStats}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={60}>
                        {cohortStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 2 ? '#10b981' : '#4f46e5'} />
                        ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Reviews List */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Graduate Testimonials</h3>
              <div className="flex gap-2">
                <select className="bg-white border-slate-200 rounded-lg text-sm px-3 py-2 outline-none">
                  <option>Most Recent</option>
                  <option>Highest Rated</option>
                </select>
              </div>
            </div>
            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex justify-between mb-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-indigo-600 font-bold">
                        {review.traineeName[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{review.traineeName}</h4>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">{review.role} • {review.cohort}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 italic">"{review.content}"</p>
                  <div className="mt-4 flex flex-wrap gap-4 pt-4 border-t border-slate-50">
                    <div className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">Learned:</span> {review.skillsLearned.join(', ')}
                    </div>
                    <div className="text-xs font-semibold text-emerald-600 px-2 py-0.5 rounded bg-emerald-50">
                      {review.placementStatus}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar info */}
        <div className="space-y-8">
          <div className="bg-slate-900 rounded-3xl p-6 text-white">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" /> Active Programs
            </h4>
            <div className="space-y-4">
              {hub.programs.map(prog => (
                <div 
                  key={prog.id} 
                  onClick={() => handleApply(prog)}
                  className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-indigo-400 hover:bg-slate-700/50 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start">
                    <h5 className="font-bold group-hover:text-indigo-400 transition-colors">{prog.name}</h5>
                    <Send className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{prog.description}</p>
                  <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-slate-500 mt-3 pt-3 border-t border-slate-700">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {prog.duration}</span>
                    <span className="text-indigo-400">${prog.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h4 className="text-lg font-bold text-slate-900 mb-4">Hub Badges</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl text-amber-800 text-sm font-semibold">
                <Trophy className="w-5 h-5 text-amber-600" /> Top Placement 2023
              </div>
              <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl text-indigo-800 text-sm font-semibold">
                <Users className="w-5 h-5 text-indigo-600" /> Large Alumni Network
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {applyingProgram && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setApplyingProgram(null)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Program Application</h2>
                <p className="text-slate-500 text-sm mt-1">Applying for: <span className="text-indigo-600 font-bold">{applyingProgram.name}</span></p>
              </div>
              <button onClick={() => setApplyingProgram(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-800 text-sm">
                  <strong>Note:</strong> By applying, your HubInsights profile metrics will be shared with {hub.name} to expedite your review.
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Statement of Intent</label>
                  <textarea 
                    rows={4}
                    placeholder="Why do you want to join this program?"
                    className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setApplyingProgram(null)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitApplication}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default HubProfile;
