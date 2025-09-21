export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  liveLink?: string;
  isVisible: boolean;
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
  level: number;
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
