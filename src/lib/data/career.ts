import type { Profile, Experience } from "$lib/types/career";

export const profile: Profile = {
    name: "David Hartono",
    role: "IT",
    bio: "Building high-performance web applications with modern tech stacks.",
    github: "https://github.com/DavidH-22",
    linkedin: "https://www.linkedin.com/in/david-h-1654a9305/",
}

export const experiences: Experience[] = [
    {
        role: "IT Programer",
        company: "PT Sadar Jaya",
        period: "2025 - Present",
        description: "Developed the migration of legacy apps to modern architectures, Assisting architected and developed core enterprise ERP frameworks and responsive mobile applications.",
        skills: ["Laravel, Postgre, Svelte, Hono, Bun, Tailwind, PHP, TypeScript, React Native, GCP, Nginx, Apache, Gemini"]
    },
    {
        role: "Intern Web Developer",
        company: "PT Exclusive Laboratory Software (Exclolab)",
        period: "2024-2025",
        description: "Gained deep hands-on experience with the software development lifecycle (SDLC) and modern backend frameworks. Built custom content platforms utilizing Laravel as a headless backend.",
        skills: ["html, css, javascript, PHP, Laravel, Mysql, Git"]
    }
]