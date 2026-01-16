
export enum View {
  HOME = 'home',
  HUB_DIRECTORY = 'hubs',
  HUB_PROFILE = 'hub-profile',
  EMPLOYER_DASHBOARD = 'employer',
  HUB_DASHBOARD = 'hub-dashboard',
  SUBMIT_REVIEW = 'submit-review',
  INSIGHTS = 'insights',
  HUB_SIGNUP = 'hub-signup'
}

export interface TechHub {
  id: string;
  name: string;
  location: string;
  logo: string;
  description: string;
  techStack: string[];
  placementRate: number; // Percentage
  avgSalaryIncrease: number; // Percentage
  completionRate: number; // Percentage
  rating: number;
  reviewCount: number;
  programs: Program[];
  verified: boolean;
  priceRange: string;
}

export interface Program {
  id: string;
  name: string;
  duration: string;
  cost: number;
  description: string;
}

export interface Review {
  id: string;
  hubId: string;
  traineeName: string;
  role: string;
  cohort: string;
  rating: number;
  skillsLearned: string[];
  teachingRating: number;
  instructorRating: number;
  projectQuality: number;
  placementStatus: 'Employed' | 'Looking' | 'Freelancing' | 'Further Studies';
  timeToCompletion: string;
  content: string;
  date: string;
  verified: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  hubId: string;
  hubName: string;
  skills: string[];
  assessmentScore: number;
  portfolioUrl: string;
  avatar: string;
  cohort: string;
  status: 'Ready for Hire' | 'Interviewing' | 'Placed';
}

export interface HubAnalytics {
  satisfactionOverTime: { month: string; score: number }[];
  placementStats: { category: string; value: number }[];
  skillDemand: { skill: string; demand: number }[];
}
