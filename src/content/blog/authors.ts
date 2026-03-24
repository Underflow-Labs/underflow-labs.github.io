export type BlogAuthor = {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  expertise: string[];
};

export const blogAuthors: Record<string, BlogAuthor> = {
  "Francisco Ruiz": {
    name: "Francisco Ruiz",
    role: "Automation Engineer",
    bio: "Trabaja en automatizacion operativa y agentes para que los equipos comerciales y operativos ganen tiempo, trazabilidad y foco.",
    image: "/equipo/Francisco_Ruiz_Gomez.png",
    linkedin: "https://www.linkedin.com/in/francisco-ruiz-gomez/",
    expertise: ["automatizacion", "agentes", "operaciones"],
  },
  "Francisco Clarke": {
    name: "Francisco Clarke",
    role: "Systems Architect",
    bio: "Disena sistemas digitales con foco en escalabilidad, claridad tecnica y una base solida para crecimiento comercial.",
    image: "/equipo/Francisco_Clarke.png",
    linkedin: "https://www.linkedin.com/in/franciscoclarke/",
    expertise: ["arquitectura", "software", "web"],
  },
  "Julian Alconcher": {
    name: "Julian Alconcher",
    role: "DevOps Engineer",
    bio: "Especialista en despliegues, performance y confiabilidad para productos y contenidos que necesitan publicarse sin friccion.",
    image: "/equipo/Julian_Alconcher.png",
    linkedin: "https://www.linkedin.com/in/julian-alconcher/",
    expertise: ["devops", "deploy", "infraestructura"],
  },
};

export const fallbackBlogAuthor: BlogAuthor = {
  name: "Equipo Underflow Labs",
  role: "Engineering Team",
  bio: "Equipo de ingenieria digital de Underflow Labs enfocado en websites, automatizacion y software a medida.",
  image: "/logo.png",
  linkedin: "https://www.underflowlabs.com/contacto",
  expertise: ["websites", "automatizacion", "software"],
};

export function getBlogAuthor(authorName: string): BlogAuthor {
  return blogAuthors[authorName] ?? { ...fallbackBlogAuthor, name: authorName };
}
