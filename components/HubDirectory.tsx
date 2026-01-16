
import React from 'react';
import { TechHub } from '../types';
import HubCard from './HubCard';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';

interface HubDirectoryProps {
  hubs: TechHub[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onHubClick: (hub: TechHub) => void;
}

const HubDirectory: React.FC<HubDirectoryProps> = ({ hubs, searchQuery, onSearchChange, onHubClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Hub Directory</h2>
          <p className="text-slate-500 mt-2 text-lg">Compare verified training outcomes and find your perfect fit.</p>
        </div>
        <div className="flex gap-2">
            <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold border border-indigo-100">
                {hubs.length} Hubs Found
            </span>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-900">
                <SlidersHorizontal className="w-4 h-4" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Filters</h3>
            </div>
            
            <div className="space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Location</h4>
                    <div className="space-y-2">
                        {['Lagos', 'Nairobi', 'Cape Town', 'Remote'].map(loc => (
                            <label key={loc} className="flex items-center text-sm text-slate-600 hover:text-indigo-600 cursor-pointer group">
                                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mr-3" />
                                {loc}
                            </label>
                        ))}
                    </div>
                </div>
                
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tech Focus</h4>
                    <div className="space-y-2">
                        {['Fullstack', 'Data Science', 'UI/UX', 'Mobile'].map(stk => (
                            <label key={stk} className="flex items-center text-sm text-slate-600 hover:text-indigo-600 cursor-pointer group">
                                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mr-3" />
                                {stk}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Price Range</h4>
                    <div className="flex gap-2">
                        {['$', '$$', '$$$'].map(p => (
                            <button key={p} className="flex-1 py-2 text-xs font-bold border border-slate-200 rounded-lg hover:border-indigo-400 hover:text-indigo-600 transition-all">
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </aside>

        {/* Main List */}
        <div className="flex-1 space-y-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search by hub name, stack (e.g. React), or city..."
              className="w-full pl-12 pr-4 py-5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none bg-white shadow-sm text-lg"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          {hubs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hubs.map(hub => (
                <HubCard key={hub.id} hub={hub} onClick={() => onHubClick(hub)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900">No hubs found</h3>
                <p className="text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HubDirectory;
