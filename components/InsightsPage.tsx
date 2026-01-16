
import React, { useState, useEffect } from 'react';
import { getTopHubsInsight } from '../services/gemini';
import { TrendingUp, Award, Globe, Sparkles, Loader2, ArrowRight } from 'lucide-react';

const InsightsPage: React.FC = () => {
    const [activeRegion, setActiveRegion] = useState('Lagos, Nigeria');
    const [insightText, setInsightText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const text = await getTopHubsInsight(activeRegion);
            setInsightText(text || "Error loading insights.");
            setLoading(false);
        }
        load();
    }, [activeRegion]);

    const regions = ['Lagos, Nigeria', 'Nairobi, Kenya', 'Cape Town, SA', 'Accra, Ghana'];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Hub Ecosystem Insights</h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto">Data-driven reports on training effectiveness and regional performance trends.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Regional Insight Selector */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Select Region</h3>
                    {regions.map(reg => (
                        <button 
                            key={reg}
                            onClick={() => setActiveRegion(reg)}
                            className={`w-full p-5 rounded-2xl flex items-center justify-between transition-all border ${activeRegion === reg ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}`}
                        >
                            <span className="font-bold">{reg}</span>
                            <ArrowRight className={`w-4 h-4 ${activeRegion === reg ? 'opacity-100' : 'opacity-0'}`} />
                        </button>
                    ))}
                </div>

                {/* AI generated report */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-6 h-6 text-indigo-500" />
                            <h2 className="text-2xl font-bold text-slate-900">Training Snapshot: {activeRegion}</h2>
                        </div>
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                                <p className="animate-pulse">Gemini AI is analyzing latest placement data for {activeRegion}...</p>
                            </div>
                        ) : (
                            <div className="prose prose-indigo max-w-none text-slate-600 text-lg leading-relaxed">
                                {insightText}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-3xl text-white">
                            <TrendingUp className="w-8 h-8 mb-4 opacity-80" />
                            <h4 className="text-3xl font-bold">+15%</h4>
                            <p className="text-teal-50 mt-1">Growth in engineering placements year-over-year in West Africa.</p>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-8 rounded-3xl text-white">
                            <Globe className="w-8 h-8 mb-4 opacity-80" />
                            <h4 className="text-3xl font-bold">React</h4>
                            <p className="text-indigo-50 mt-1">Highest demanded frontend skill among Kenyan employers this quarter.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightsPage;
