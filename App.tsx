
import React, { useState, useEffect } from 'react';
import { View, TechHub, Review, Candidate } from './types';
import { MOCK_HUBS, MOCK_REVIEWS, MOCK_CANDIDATES } from './constants';
import Navbar from './components/Navbar';
import HubCard from './components/HubCard';
import HubProfile from './components/HubProfile';
import EmployerDashboard from './components/EmployerDashboard';
import HubDashboard from './components/HubDashboard';
import ReviewForm from './components/ReviewForm';
import InsightsPage from './components/InsightsPage';
import HubDirectory from './components/HubDirectory';
import HubSignup from './components/HubSignup';
import { Search, MapPin, TrendingUp, Users, Award, ShieldCheck, Building2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedHub, setSelectedHub] = useState<TechHub | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hubs, setHubs] = useState<TechHub[]>(MOCK_HUBS);

  // Simple hash routing simulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as View;
      if (Object.values(View).includes(hash)) {
        setCurrentView(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: View, hub?: TechHub) => {
    window.location.hash = view;
    setCurrentView(view);
    if (hub) setSelectedHub(hub);
  };

  const filteredHubs = hubs.filter(hub => 
    hub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hub.techStack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Verified Training Outcomes
                  </div>
                  <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                    Where Tech Careers <span className="text-indigo-600">Actually</span> Begin.
                  </h1>
                  <p className="text-xl text-slate-600 max-w-2xl">
                    Discover verified tech hubs, read honest reviews from graduates, and connect directly with employers who value quality training.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => navigateTo(View.HUB_DIRECTORY)}
                      className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                      Find a Hub
                    </button>
                    <button 
                      onClick={() => navigateTo(View.HUB_SIGNUP)}
                      className="px-8 py-4 bg-white border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
                    >
                      <Building2 className="w-5 h-5" /> Are you a Hub?
                    </button>
                  </div>
                </div>
                <div className="flex-1 hidden lg:block">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4 pt-8">
                      <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 animate-bounce transition-all duration-[3000ms]">
                        <p className="text-sm text-slate-500 mb-1">Avg. Salary Increase</p>
                        <p className="text-3xl font-bold text-emerald-600">+124%</p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                        <p className="text-sm text-slate-500 mb-1">Placement Rate</p>
                        <p className="text-3xl font-bold text-indigo-600">92%</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                        <p className="text-sm text-slate-500 mb-1">Verified Hubs</p>
                        <p className="text-3xl font-bold text-slate-800">250+</p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                        <p className="text-sm text-slate-500 mb-1">Global Reviews</p>
                        <p className="text-3xl font-bold text-amber-500">12.5k</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Hubs */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Featured Tech Hubs</h2>
                  <p className="text-slate-500 mt-2">Highly rated institutions with proven job placement records.</p>
                </div>
                <button 
                  onClick={() => navigateTo(View.HUB_DIRECTORY)}
                  className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center"
                >
                  View All Hubs <Search className="ml-2 w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_HUBS.map(hub => (
                  <HubCard key={hub.id} hub={hub} onClick={() => navigateTo(View.HUB_PROFILE, hub)} />
                ))}
              </div>
            </section>
          </div>
        );
      case View.HUB_DIRECTORY:
        return (
          <HubDirectory 
            hubs={filteredHubs} 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
            onHubClick={(hub) => navigateTo(View.HUB_PROFILE, hub)} 
          />
        );
      case View.HUB_PROFILE:
        return selectedHub ? (
          <HubProfile hub={selectedHub} reviews={MOCK_REVIEWS.filter(r => r.hubId === selectedHub.id)} />
        ) : null;
      case View.EMPLOYER_DASHBOARD:
        return <EmployerDashboard />;
      case View.HUB_DASHBOARD:
        return <HubDashboard />;
      case View.SUBMIT_REVIEW:
        return <ReviewForm onSubmit={() => navigateTo(View.HUB_DIRECTORY)} hubs={MOCK_HUBS} />;
      case View.INSIGHTS:
        return <InsightsPage />;
      case View.HUB_SIGNUP:
        return <HubSignup onSuccess={() => navigateTo(View.HUB_DASHBOARD)} />;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar currentView={currentView} onNavigate={navigateTo} />
      <main className="pt-20">
        {renderContent()}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center text-white font-bold text-xl mb-4">
              <Award className="w-6 h-6 mr-2 text-indigo-400" />
              HubInsights
            </div>
            <p className="text-sm">Verified marketplace for the next generation of tech talent.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigateTo(View.HUB_DIRECTORY)}>Find Tech Hubs</button></li>
              <li><button onClick={() => navigateTo(View.INSIGHTS)}>Global Rankings</button></li>
              <li><button onClick={() => navigateTo(View.EMPLOYER_DASHBOARD)}>Hire Graduates</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>Review Guidelines</li>
              <li>Hub Verification</li>
              <li>Salary Benchmark</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <p className="text-sm">Stay updated with placement reports.</p>
            <div className="mt-4 flex gap-2">
              <input type="email" placeholder="Email" className="bg-slate-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-500 outline-none w-full" />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">Join</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
