export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  link: string;
  liveLink?: string;
  technologies: string[];
  isVisible: boolean;
  isFeatured?: boolean;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  isVisible: boolean;
};

export type Skill = {
  name: string;
  isVisible: boolean;
};

export type SkillCategory = {
  category: string;
  skills: Skill[];
};

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  quote: string;
  isVisible: boolean;
};

export type Stat = {
  id: string;
  value: string;
  label: string;
  icon: string;
  isVisible: boolean;
};

export type Profile = {
  name: string;
  title: string;
  location: string;
  languages: string;
  role: string;
  education?: string;
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
  description: string;
  profilePictureUrl?: string;
  resumeUrl?: string;
};

export type CreativeSkill = {
  id: string;
  name: string;
  isVisible: boolean;
};

export type SocialLink = {
  id: string;
  name: string;
  url: string;
  icon: string;
  isVisible: boolean;
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  icon: string;
  isVisible: boolean;
};

export type HomeCardSkill = {
  name: string;
  isVisible: boolean;
};

export type HomeCard = {
  id: string;
  title: string;
  icon: string;
  isVisible: boolean;
  skills: HomeCardSkill[];
};

export type SiteSettings = {
  showTestimonials: boolean;
};

