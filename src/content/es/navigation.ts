export type NavigationItem = {
  label: string;
  path: string;
};

export const navigationItems: NavigationItem[] = [
  { label: "Inicio", path: "/" },
  { label: "Websites", path: "/servicios/websites" },
  { label: "Automatizaciones", path: "/servicios/automatizaciones" },
  { label: "Casos", path: "/casos" },
  { label: "Contacto", path: "/contacto" },
];
