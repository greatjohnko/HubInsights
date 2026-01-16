
import React from 'react';
import { TechHub } from '../types';
import { MapPin, Star, TrendingUp, ShieldCheck } from 'lucide-react';

interface HubCardProps {
  hub: TechHub;
  onClick: () => void;
}

const HubCard: React.FC<HubCardProps> = ({ hub, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <img src={hub.logo} alt={hub.name} className="w-16 h-16 rounded-xl object-cover bg-slate-100" />
        {hub.verified && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
          </span>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{hub.name}</h3>
        <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
          <MapPin className="w-3.5 h-3.5" />
          {hub.location}
        </div>
        <p className="text-slate-600 text-sm mt-3 line-clamp-2">{hub.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {hub.techStack.map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="font-bold text-slate-900">{hub.rating}</span>
          <span className="text-slate-400 text-xs">({hub.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
          <TrendingUp className="w-4 h-4" />
          {hub.placementRate}% Placed
        </div>
      </div>
    </div>
  );
};

export default HubCard;
