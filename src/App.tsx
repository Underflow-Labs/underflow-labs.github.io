import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SiteLayout } from "./layout/SiteLayout";
import { HomePage } from "./pages/HomePage";

const ServicesPage = lazy(() => import("./pages/ServicesPage").then((m) => ({ default: m.ServicesPage })));
const WebsitesServicePage = lazy(() =>
  import("./pages/WebsitesServicePage").then((m) => ({ default: m.WebsitesServicePage }))
);
const AutomationsServicePage = lazy(() =>
  import("./pages/AutomationsServicePage").then((m) => ({ default: m.AutomationsServicePage }))
);
const SoftwareServicePage = lazy(() =>
  import("./pages/SoftwareServicePage").then((m) => ({ default: m.SoftwareServicePage }))
);
const ContactPage = lazy(() => import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const BlogIndexPage = lazy(() => import("./pages/BlogIndexPage").then((m) => ({ default: m.BlogIndexPage })));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage").then((m) => ({ default: m.BlogPostPage })));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/servicios/websites" element={<WebsitesServicePage />} />
            <Route path="/servicios/automatizaciones" element={<AutomationsServicePage />} />
            <Route path="/servicios/software" element={<SoftwareServicePage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />

            <Route path="/casos" element={<Navigate to="/contacto" replace />} />
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route path="/services" element={<Navigate to="/servicios" replace />} />
            <Route path="/case-studies" element={<Navigate to="/contacto" replace />} />
            <Route path="/contact" element={<Navigate to="/contacto" replace />} />
            <Route path="/process" element={<Navigate to="/" replace />} />
            <Route path="/insights" element={<Navigate to="/blog" replace />} />
            <Route path="/servicios/software-a-medida" element={<Navigate to="/servicios/software" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
