import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { navigationItems } from "../content/es/navigation";
import { BOOK_CALL_URL, CONTACT_EMAIL } from "../config/links";
import { BrandMark } from "../components/ui/BrandMark";
import { CustomCursor } from "../components/ui/CustomCursor";
import { cn } from "../lib/cn";

const menuEase: [number, number, number, number] = [0.76, 0, 0.24, 1];
const itemEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function SiteLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 60);
      setProgress(total > 0 ? Math.min((y / total) * 100, 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <CustomCursor />

      {/* ── Fixed header ── */}
      <header
        className={cn(
          "fixed top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "border-b border-border-base/80 bg-bg-primary/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* Scroll progress line */}
        <div
          className="absolute bottom-0 left-0 h-px bg-accent-primary"
          style={{ width: `${progress}%`, transition: "width 80ms linear" }}
          aria-hidden="true"
        />

        <div className="site-container flex h-16 items-center justify-between gap-6">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 font-heading text-base font-semibold tracking-wide"
          >
            <BrandMark />
            <span>Underflow Labs</span>
          </NavLink>

          <nav className="hidden items-center gap-4 lg:flex">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn("nav-link", isActive && "nav-link-active")}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={BOOK_CALL_URL} className="hidden sm:block">
              <button className="signal-sweep inline-flex items-center justify-center rounded-lg bg-accent-primary px-4 py-2 text-xs font-semibold tracking-wide text-bg-primary shadow-signal transition-all duration-200 hover:-translate-y-0.5 sm:text-sm">
                Agendar diagnóstico
              </button>
            </a>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-base text-text-primary transition-colors hover:border-border-hover lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="17" y2="6" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="14" x2="17" y2="14" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-bg-elevated lg:hidden"
            initial={{ clipPath: "ellipse(0% 0% at 50% 0%)" }}
            animate={{ clipPath: "ellipse(160% 160% at 50% 0%)" }}
            exit={{ clipPath: "ellipse(0% 0% at 50% 0%)" }}
            transition={{ duration: 0.6, ease: menuEase }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between px-6 sm:px-8">
              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 font-heading text-base font-semibold tracking-wide"
              >
                <BrandMark />
                <span>Underflow Labs</span>
              </NavLink>
              <button
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-base text-text-primary"
                aria-label="Cerrar menú"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="5" y1="5" x2="15" y2="15" />
                  <line x1="15" y1="5" x2="5" y2="15" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-6 sm:px-8" aria-label="Menú principal">
              {navigationItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.4, ease: itemEase }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block border-b border-border-base/40 py-5 font-heading text-4xl font-bold tracking-tight transition-colors duration-200 sm:text-5xl",
                        isActive
                          ? "text-accent-primary"
                          : "text-text-primary hover:text-accent-primary"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="shrink-0 px-6 pb-8 sm:px-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.35, ease: itemEase }}
            >
              <a
                href={BOOK_CALL_URL}
                onClick={() => setMobileOpen(false)}
                className="signal-sweep inline-flex w-full items-center justify-center rounded-lg bg-accent-primary px-5 py-3.5 text-sm font-semibold tracking-wide text-bg-primary shadow-signal"
              >
                Agendar diagnóstico
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border-base">
        <div className="site-container py-16 sm:py-20">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xs space-y-4">
              <p className="inline-flex items-center gap-2 font-heading text-lg font-bold text-text-primary">
                <BrandMark />
                Underflow Labs
              </p>
              <p className="text-sm leading-relaxed text-text-secondary">
                Ingeniería digital: websites que convierten, automatización y software a medida.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="block font-mono text-xs text-text-muted transition-colors hover:text-accent-primary"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <nav className="flex flex-col gap-2.5 text-sm" aria-label="Footer">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-border-base/40">
          <div className="site-container flex flex-col gap-1 py-5 sm:flex-row sm:justify-between">
            <p className="text-xs text-text-muted">
              &copy; {new Date().getFullYear()} Underflow Labs. Todos los derechos reservados.
            </p>
            <p className="font-mono text-xs text-text-muted">Buenos Aires, Argentina</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
