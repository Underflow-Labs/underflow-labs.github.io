import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SplitHeading } from "../ui/SplitHeading";

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

const services = [
  {
    num: "01",
    title: "Websites que convierten",
    description:
      "Creamos sitios modernos, rápidos y optimizados para generar clientes reales.",
    href: "/servicios/websites",
  },
  {
    num: "02",
    title: "Automatización inteligente",
    description:
      "Reducimos tareas manuales y conectamos tus herramientas para que tu equipo trabaje mejor.",
    href: "/servicios/automatizaciones",
  },
  {
    num: "03",
    title: "Software a medida",
    description:
      "Desarrollamos sistemas y aplicaciones personalizadas para resolver necesidades específicas.",
    href: "/servicios/software",
  },
];

export function ServicesDualSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reduced = !!useReducedMotion();

  return (
    <section id="que-hacemos" className="section-spacing">
      <div className="site-container">
        <SplitHeading
          as="h2"
          className="max-w-2xl font-heading text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl"
        >
          Construimos la infraestructura digital de tu empresa.
        </SplitHeading>

        <div ref={ref} className="mt-14 border-b border-border-base/60">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12, ease: easing }}
            >
              <Link to={service.href} className="service-row group flex items-center gap-5 py-9 sm:py-12">
                <span className="w-8 shrink-0 font-mono text-xs text-text-muted">
                  {service.num}
                </span>

                <div className="flex min-w-0 flex-1 items-center justify-between gap-8">
                  <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-text-primary transition-colors duration-300 group-hover:text-accent-primary sm:text-3xl lg:text-4xl xl:text-5xl">
                    {service.title}
                  </h3>
                  <p className="hidden max-w-[260px] shrink-0 text-sm leading-relaxed text-text-primary/50 lg:block">
                    {service.description}
                  </p>
                </div>

                <span
                  className="shrink-0 text-xl text-text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-primary"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
