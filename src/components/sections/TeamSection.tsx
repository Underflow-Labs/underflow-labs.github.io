import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type TeamMember = {
  name: string;
  role: string;
  linkedin: string;
  github: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Francisco Clarke",
    role: "Systems Architect",
    linkedin: "https://www.linkedin.com/in/franciscoclarke/",
    github: "https://github.com/franclarke",
    image: "/equipo/Francisco_Clarke.png",
  },
  {
    name: "Julian Alconcher",
    role: "DevOps Engineer",
    linkedin: "https://www.linkedin.com/in/julian-alconcher/",
    github: "https://github.com/JulianAlconcher",
    image: "/equipo/Julian_Alconcher.png",
  },
  {
    name: "Antonio Carlos",
    role: "Cloud Engineer",
    linkedin: "https://www.linkedin.com/in/antoniocarlos2000/",
    github: "https://github.com/totoccar",
    image: "/equipo/Antonio_Carlos.png",
  },
  {
    name: "Francisco Ruiz",
    role: "Automation Engineer",
    linkedin: "https://www.linkedin.com/in/francisco-ruiz-gomez/",
    github: "https://github.com/franciscoruiz00",
    image: "/equipo/Francisco_Ruiz_Gomez.png",
  },
  {
    name: "Tobias Thiessen",
    role: "Fullstack Engineer",
    linkedin: "https://www.linkedin.com/in/tobias-thiessen/",
    github: "https://github.com/TobiasThiessen11",
    image: "/equipo/Tobias_Thiessen.png",
  },
];

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

type TeamCardProps = {
  member: TeamMember;
  index: number;
  inView: boolean;
  reduced: boolean;
};

function TeamCard({ member, index, inView, reduced }: TeamCardProps) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-xl border border-border-base"
      style={{ aspectRatio: "2/3" }}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: easing }}
    >
      {/* Full-bleed photo — grayscale to color on hover */}
      <img
        src={member.image}
        alt={`${member.name}, ${member.role}`}
        className="absolute inset-0 h-full w-full object-cover object-top grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0"
        loading="lazy"
        decoding="async"
      />

      {/* Bottom gradient scrim */}
      <div
        className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #1a1814 0%, rgba(26,24,20,0.7) 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Ghost index — top-left */}
      <span
        className="absolute left-4 top-4 select-none font-mono text-xs tracking-[0.2em] text-text-primary/25"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content overlay — bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
          {member.role}
        </p>
        <h3 className="font-heading text-base font-bold leading-tight text-text-primary sm:text-lg">
          {member.name}
        </h3>

        {/* Social icons — slide-up on hover */}
        <div className="mt-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`LinkedIn de ${member.name}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-base bg-bg-surface/80 text-text-secondary backdrop-blur-sm transition-colors hover:border-border-hover hover:text-text-primary"
          >
            <LinkedInIcon />
          </a>
          <a
            href={member.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`GitHub de ${member.name}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-base bg-bg-surface/80 text-text-secondary backdrop-blur-sm transition-colors hover:border-border-hover hover:text-text-primary"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reduced = !!useReducedMotion();

  return (
    <section className="section-spacing-lg">
      <div className="site-container">
        {/* Editorial heading */}
        <motion.h2
          className="font-heading text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.88] tracking-tight text-text-primary"
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.8, ease: easing }}
        >
          Nuestro
          <br />
          <span className="text-accent-primary">equipo.</span>
        </motion.h2>

        {/* 5-column photo grid */}
        <div
          ref={ref}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4"
        >
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.name}
              member={member}
              index={index}
              inView={inView}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12ZM5.6 18.38h2.67V9.96H5.6v8.42ZM10.64 9.96h2.56v1.15h.04c.36-.67 1.23-1.38 2.53-1.38 2.71 0 3.21 1.78 3.21 4.1v4.55h-2.67v-4.03c0-.96-.02-2.2-1.34-2.2-1.34 0-1.55 1.05-1.55 2.13v4.1h-2.67V9.96Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.82-.25.82-.57v-2.2c-3.34.72-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.74-1.33-1.74-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.24 1.83 1.24 1.08 1.85 2.83 1.31 3.52 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.93 0-1.3.47-2.36 1.24-3.2-.12-.3-.54-1.52.12-3.16 0 0 1.01-.33 3.3 1.22a11.4 11.4 0 0 1 6 0c2.28-1.55 3.29-1.22 3.29-1.22.66 1.64.24 2.86.12 3.16.77.84 1.24 1.9 1.24 3.2 0 4.61-2.81 5.63-5.5 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}
