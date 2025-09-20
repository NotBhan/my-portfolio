export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
};

export type Skill = {
  name: string;
  level: number;
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
};

export type Stat = {
  id: string;
  value: string;
  label: string;
  icon: string;
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
};
