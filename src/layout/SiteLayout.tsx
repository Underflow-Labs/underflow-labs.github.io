import { NavLink, Outlet } from "react-router-dom";
import { navigationItems } from "../content/es/navigation";
import { BOOK_CALL_URL } from "../config/links";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/cn";

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="sticky top-0 z-40 border-b border-border-base bg-bg-primary/90 backdrop-blur-sm">
        <div className="site-container flex h-16 items-center justify-between gap-6">
          <NavLink to="/" className="font-heading text-base font-semibold tracking-wide">
            Underflow Labs
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
          <a href={BOOK_CALL_URL} className="hidden sm:block">
            <Button variant="primary" className="px-4 py-2 text-xs sm:text-sm">
              Agendar llamada
            </Button>
          </a>
        </div>

        <nav className="site-container flex gap-4 overflow-x-auto pb-3 lg:hidden">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn("nav-link whitespace-nowrap", isActive && "nav-link-active")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-border-base py-10">
        <div className="site-container flex flex-col gap-3 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>Underflow Labs</p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
            Websites + Automatizaciones
          </p>
        </div>
      </footer>
    </div>
  );
}
