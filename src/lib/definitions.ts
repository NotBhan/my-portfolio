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
