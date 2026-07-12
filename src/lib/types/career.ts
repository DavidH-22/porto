export interface Profile {
    name: string;
    role: string;
    bio: string;
    github: string;
    linkedin: string;
}

export interface Experience {
    role: string;
    company: string;
    period: string;
    description: string;
    skills: string[];
}