import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layout/SiteLayout";
import { AutomationsServicePage } from "./pages/AutomationsServicePage";
import { CasesPage } from "./pages/CasesPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { WebsitesServicePage } from "./pages/WebsitesServicePage";
import { Preloader } from "./components/sections/Preloader";

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  // Check if user already entered in this session
  useEffect(() => {
    const sessionEntered = sessionStorage.getItem("underflow_entered");
    if (sessionEntered === "true") {
      setHasEntered(true);
    }
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    sessionStorage.setItem("underflow_entered", "true");
  };

  return (
    <BrowserRouter>
      {!hasEntered && <Preloader onEnter={handleEnter} />}

      <div className={`transition-opacity duration-1000 ${hasEntered ? "opacity-100" : "opacity-0"}`}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicios/websites" element={<WebsitesServicePage />} />
            <Route path="/servicios/automatizaciones" element={<AutomationsServicePage />} />
            <Route path="/casos" element={<CasesPage />} />
            <Route path="/contacto" element={<ContactPage />} />

            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route path="/services" element={<Navigate to="/servicios/websites" replace />} />
            <Route path="/case-studies" element={<Navigate to="/casos" replace />} />
            <Route path="/contact" element={<Navigate to="/contacto" replace />} />
            <Route path="/process" element={<Navigate to="/" replace />} />
            <Route path="/insights" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
