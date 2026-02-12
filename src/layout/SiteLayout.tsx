import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { navigationItems } from "../content/es/navigation";
import { BOOK_CALL_URL, CONTACT_EMAIL } from "../config/links";
import { BrandMark } from "../components/ui/BrandMark";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/cn";

export function SiteLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="sticky top-0 z-40 border-b border-border-base bg-bg-primary/90 backdrop-blur-sm">
        <div className="site-container flex h-16 items-center justify-between gap-6">
          <NavLink to="/" className="inline-flex items-center gap-2 font-heading text-base font-semibold tracking-wide">
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
              <Button variant="primary" className="px-4 py-2 text-xs sm:text-sm">
                Agendar llamada
              </Button>
            </a>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-base text-text-primary lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                {mobileOpen ? (
                  <><line x1="5" y1="5" x2="15" y2="15" /><line x1="15" y1="5" x2="5" y2="15" /></>
                ) : (
                  <><line x1="3" y1="6" x2="17" y2="6" /><line x1="3" y1="10" x2="17" y2="10" /><line x1="3" y1="14" x2="17" y2="14" /></>
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="site-container flex flex-col gap-1 pb-4 lg:hidden">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => cn(
                  "rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive ? "bg-bg-surface text-text-primary" : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
                )}
              >
                {item.label}
              </NavLink>
            ))}
            <a href={BOOK_CALL_URL} className="mt-2 sm:hidden" onClick={() => setMobileOpen(false)}>
              <Button variant="primary" className="w-full py-2.5 text-sm">
                Agendar llamada
              </Button>
            </a>
          </nav>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-border-base py-12">
        <div className="site-container">
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 text-sm text-text-primary">
                <BrandMark />
                <span className="font-heading font-semibold">Underflow Labs</span>
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                Websites + Automatizaciones
              </p>
              <p className="text-sm text-text-secondary">
                <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-accent-primary">{CONTACT_EMAIL}</a>
              </p>
            </div>
            <nav className="flex flex-col gap-2 text-sm" aria-label="Footer">
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
          <div className="mt-8 border-t border-border-base pt-6 text-xs text-text-muted">
            <p>&copy; {new Date().getFullYear()} Underflow Labs. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
