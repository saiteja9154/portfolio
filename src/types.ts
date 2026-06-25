export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpaOrPercentage: string;
  type: 'btech' | 'diploma';
}

export interface Internship {
  organization: string;
  role: string;
  duration: string;
  technologies: string[];
  achievements: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  outcomes: string[];
  githubUrl: string;
  liveUrl?: string;
  category: 'ml' | 'data' | 'system';
}

export interface Certification {
  name: string;
  issuer: string;
  status: 'Verified' | 'Active';
}

export interface SkillItem {
  name: string;
  category: string;
  relatedProjects: string[];
  relatedCertifications: string[];
  experienceEvidence: string;
  resumeReferences: string;
}
