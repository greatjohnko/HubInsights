
import React, { useState } from 'react';
import { TechHub } from '../types';
import { ShieldCheck, Star, Camera, Upload } from 'lucide-react';

interface ReviewFormProps {
  hubs: TechHub[];
  onSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ hubs, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Share Your Experience</h2>
            <p className="text-slate-500 mt-1">Your feedback helps fellow trainees find the best hubs.</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-indigo-600">STEP {step}/3</span>
            <div className="w-20 h-1.5 bg-slate-100 rounded-full mt-2">
                <div className="h-full bg-indigo-600 rounded-full transition-all" style={{width: `${(step/3)*100}%`}}></div>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Which Hub did you attend?</label>
              <select className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Select a tech hub...</option>
                {hubs.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Overall Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <button 
                    key={num} 
                    onClick={() => setRating(num)}
                    className={`p-4 rounded-xl border-2 transition-all ${rating >= num ? 'bg-amber-50 border-amber-400 text-amber-500' : 'bg-white border-slate-100 text-slate-300'}`}
                  >
                    <Star className={`w-8 h-8 ${rating >= num ? 'fill-amber-400' : ''}`} />
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Continue Review
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Tell us about the teaching & curriculum</label>
              <textarea 
                rows={5}
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="What did you learn? How were the instructors?"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Placement Status</label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none">
                     <option>Employed</option>
                     <option>Looking</option>
                     <option>Self-employed</option>
                  </select>
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Cohort Completion</label>
                  <input type="text" placeholder="e.g. June 2023" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none" />
               </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">Next Step</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Verify Your Graduation</h3>
              <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                Verified reviews are 10x more impactful. Please upload a certificate or link your GitHub/LinkedIn profile.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                <Upload className="w-8 h-8 text-slate-300 group-hover:text-indigo-500 mx-auto mb-2" />
                <span className="text-sm font-bold text-slate-700">Upload Certificate</span>
              </div>
              <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-slate-800 hover:bg-slate-50 transition-all cursor-pointer group">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-full mx-auto mb-2 flex items-center justify-center font-bold">G</div>
                <span className="text-sm font-bold text-slate-700">Link GitHub</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold">Back</button>
              <button onClick={onSubmit} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                Submit Verified Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
