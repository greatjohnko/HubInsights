
import React, { useState } from 'react';
import { View } from '../types';
import { Building2, MapPin, Globe, Code2, CheckCircle2, ArrowRight, ShieldCheck, Upload } from 'lucide-react';

interface HubSignupProps {
  onSuccess: () => void;
}

const HubSignup: React.FC<HubSignupProps> = ({ onSuccess }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Register Your Tech Hub</h1>
        <p className="text-slate-500 text-lg">Join 250+ verified training providers attracting top talent and global employers.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="flex bg-slate-50 border-b border-slate-100">
          {[
            { id: 1, label: 'Identity' },
            { id: 2, label: 'Curriculum' },
            { id: 3, label: 'Verification' }
          ].map((s) => (
            <div 
              key={s.id} 
              className={`flex-1 py-4 px-6 text-center text-xs font-bold uppercase tracking-widest transition-colors ${step >= s.id ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}
            >
              {s.id}. {s.label}
            </div>
          ))}
        </div>

        <div className="p-10">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Official Hub Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="text" placeholder="e.g. Lagos Tech School" className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Location (City, Country)</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="text" placeholder="e.g. Lagos, Nigeria" className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Website URL</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="url" placeholder="https://yourhub.com" className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Short Description</label>
                  <textarea rows={3} placeholder="Tell us about your mission..." className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"></textarea>
                </div>
              </div>
              <button onClick={() => setStep(2)} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
                Continue to Curriculum <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Select Tech Stack Focus</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['React', 'Node.js', 'Python', 'Mobile', 'UI/UX', 'Cloud', 'Data Science', 'Blockchain'].map(stack => (
                    <label key={stack} className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl hover:bg-indigo-50 cursor-pointer transition-colors has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400">
                      <input type="checkbox" className="hidden" />
                      <Code2 className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-semibold text-slate-600">{stack}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Pricing Strategy</label>
                <select className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Free / Sponsored</option>
                  <option>Affordable ($)</option>
                  <option>Mid-range ($$)</option>
                  <option>Premium ($$$)</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                  Verify & Submit <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Get the Verified Badge</h3>
                <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                  Hubs with verification receive 4x more applications and higher placement credibility.
                </p>
              </div>

              <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                <Upload className="w-12 h-12 text-slate-300 group-hover:text-indigo-500 mx-auto mb-4" />
                <h4 className="font-bold text-slate-800">Upload Registration Document</h4>
                <p className="text-xs text-slate-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl text-left border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <p className="text-sm text-slate-600">I agree to allow HubInsights to track and verify our graduate placement outcomes.</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">Back</button>
                  <button onClick={onSuccess} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
                    Finish Registration
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HubSignup;
