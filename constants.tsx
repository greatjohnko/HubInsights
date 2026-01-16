
import { TechHub, Review, Candidate, Program } from './types';

export const MOCK_HUBS: TechHub[] = [
  {
    id: '1',
    name: 'Lagos Tech School',
    location: 'Lagos, Nigeria',
    logo: 'https://picsum.photos/seed/lts/200/200',
    description: 'Leading the digital revolution in Africa with world-class engineering training.',
    techStack: ['React', 'Node.js', 'Python', 'PostgreSQL'],
    placementRate: 88,
    avgSalaryIncrease: 150,
    completionRate: 92,
    rating: 4.8,
    reviewCount: 124,
    verified: true,
    priceRange: '$$',
    programs: [
      { id: 'p1', name: 'Fullstack Web Development', duration: '24 Weeks', cost: 1200, description: 'Master frontend and backend.' },
      { id: 'p2', name: 'Data Science Intensive', duration: '16 Weeks', cost: 950, description: 'ML and Data Analysis.' }
    ]
  },
  {
    id: '2',
    name: 'Code Academy Nairobi',
    location: 'Nairobi, Kenya',
    logo: 'https://picsum.photos/seed/can/200/200',
    description: 'Practical, project-based learning for the modern developer.',
    techStack: ['Mobile', 'Flutter', 'Firebase', 'Go'],
    placementRate: 82,
    avgSalaryIncrease: 110,
    completionRate: 85,
    rating: 4.5,
    reviewCount: 98,
    verified: true,
    priceRange: '$$$',
    programs: [
      { id: 'p3', name: 'Mobile App Mastery', duration: '20 Weeks', cost: 1500, description: 'iOS and Android with Flutter.' }
    ]
  },
  {
    id: '3',
    name: 'DevBootcamp Cape Town',
    location: 'Cape Town, SA',
    logo: 'https://picsum.photos/seed/devbc/200/200',
    description: 'Accelerated career transitions into tech.',
    techStack: ['UI/UX', 'Figma', 'Webflow', 'JavaScript'],
    placementRate: 75,
    avgSalaryIncrease: 85,
    completionRate: 78,
    rating: 4.2,
    reviewCount: 45,
    verified: false,
    priceRange: '$',
    programs: [
      { id: 'p4', name: 'UI/UX Design', duration: '12 Weeks', cost: 600, description: 'Industry-standard design training.' }
    ]
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    hubId: '1',
    traineeName: 'Amaka Eze',
    role: 'Frontend Developer',
    cohort: 'Spring 2023',
    rating: 5,
    skillsLearned: ['React', 'TypeScript', 'Tailwind'],
    teachingRating: 5,
    instructorRating: 4,
    projectQuality: 5,
    placementStatus: 'Employed',
    timeToCompletion: '6 Months',
    content: 'The curriculum was intense but highly rewarding. The capstone project helped me land my job at a fintech firm within 2 weeks of graduating.',
    date: '2023-11-15',
    verified: true
  },
  {
    id: 'r2',
    hubId: '1',
    traineeName: 'Kofi Mensah',
    role: 'Backend Engineer',
    cohort: 'Spring 2023',
    rating: 4,
    skillsLearned: ['Node.js', 'Express', 'Redis'],
    teachingRating: 4,
    instructorRating: 5,
    projectQuality: 4,
    placementStatus: 'Employed',
    timeToCompletion: '6 Months',
    content: 'Instructors are world-class. A bit fast-paced for absolute beginners, but the support system is great.',
    date: '2023-12-01',
    verified: true
  }
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'c1',
    name: 'Ibrahim Saliu',
    hubId: '1',
    hubName: 'Lagos Tech School',
    skills: ['React', 'Node.js', 'AWS'],
    assessmentScore: 92,
    portfolioUrl: 'https://github.com',
    avatar: 'https://picsum.photos/seed/ibra/100/100',
    cohort: 'Q3 2023',
    status: 'Ready for Hire'
  },
  {
    id: 'c2',
    name: 'Sarah Kimani',
    hubId: '2',
    hubName: 'Code Academy Nairobi',
    skills: ['Flutter', 'Firebase', 'Dart'],
    assessmentScore: 88,
    portfolioUrl: 'https://github.com',
    avatar: 'https://picsum.photos/seed/sara/100/100',
    cohort: 'Q4 2023',
    status: 'Interviewing'
  }
];
