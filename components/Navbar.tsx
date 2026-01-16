
import React from 'react';
import { View } from '../types';
import { Award, Briefcase, LayoutDashboard, Globe, Star, PlusCircle } from 'lucide-react';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate(View.HOME)}
        >
          <Award className="w-8 h-8 text-indigo-600" />
          <span className="text-xl font-bold text-slate-900 tracking-tight">HubInsights</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onNavigate(View.HUB_DIRECTORY)}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${currentView === View.HUB_DIRECTORY ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            <Globe className="w-4 h-4" /> Hubs
          </button>
          <button 
            onClick={() => onNavigate(View.INSIGHTS)}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${currentView === View.INSIGHTS ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            <Star className="w-4 h-4" /> Rankings
          </button>
          <button 
            onClick={() => onNavigate(View.EMPLOYER_DASHBOARD)}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${currentView === View.EMPLOYER_DASHBOARD ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            <Briefcase className="w-4 h-4" /> Hiring
          </button>
          <button 
            onClick={() => onNavigate(View.HUB_SIGNUP)}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${currentView === View.HUB_SIGNUP ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            <PlusCircle className="w-4 h-4" /> For Hubs
          </button>
          <button 
            onClick={() => onNavigate(View.HUB_DASHBOARD)}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${currentView === View.HUB_DASHBOARD ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate(View.SUBMIT_REVIEW)}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors hidden sm:block"
          >
            Review a Hub
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
