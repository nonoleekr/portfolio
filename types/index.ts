export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  discord?: string;
  twitter?: string;
}

export interface PersonalInfo {
  name: string;
  initials: string;
  titles: string[];
  tagline: string;
  bio: string;
  location: string;
  avatar: string;
  resumeUrl: string;
  social: SocialLinks;
  interests: string[];
}

export interface SkillItem {
  name: string;
  level?: "learning" | "proficient" | "advanced";
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: SkillItem[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tech: string[];
  features: string[];
  github?: string;
  demo?: string;
  tags: string[];
  featured: boolean;
  status: "completed" | "in-progress" | "concept";
  year: number;
}

export interface ExperienceItem {
  id: string;
  type: "internship" | "project" | "hackathon" | "opensource" | "freelance" | "education";
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
  highlights: string[];
  tech?: string[];
  link?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | "Present";
  description?: string;
  gpa?: string;
  courses?: string[];
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  logo: string;
  date: string;
  credentialUrl?: string;
  skills?: string[];
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage?: string;
  author?: string;
  draft?: boolean;
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string;
  readingTime: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  blog?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
}
