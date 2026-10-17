import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import schoolLogo from "./assets/logo.jpg";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import { PrivacyPolicyPage, TermsAndConditionsPage } from "./pages/Legal.jsx";
import NotFoundPage from "./pages/NotFound.jsx";

export default function App() {
  const { pathname, hash } = useLocation();
  const [loaderPhase, setLoaderPhase] = useState(() =>
    document.readyState === "complete" ? "hidden" : "visible"
  );

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        target.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
        });
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    const finishLoading = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setLoaderPhase("hidden");
        return;
      }

      setLoaderPhase("leaving");
      window.setTimeout(() => setLoaderPhase("hidden"), 420);
    };

    if (document.readyState === "complete") {
      finishLoading();
      return undefined;
    }

    window.addEventListener("load", finishLoading, { once: true });
    return () => window.removeEventListener("load", finishLoading);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      document.documentElement.classList.remove("site-motion-ready");
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.01, rootMargin: "80px 0px 80px 0px" }
    );
    const revealFallback = window.setTimeout(() => {
      elements.forEach((element) => element.classList.add("is-visible"));
      observer.disconnect();
    }, 1800);

    document.documentElement.classList.add("site-motion-ready");
    elements.forEach((element) => observer.observe(element));

    return () => {
      window.clearTimeout(revealFallback);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <>
      {loaderPhase !== "hidden" && (
        <div
          className="site-loader"
          data-phase={loaderPhase}
          role="status"
          aria-label="Loading Snow White Private Schools"
        >
          <div className="site-loader-mark">
            <span className="site-loader-orbit" aria-hidden="true" />
            <img src={schoolLogo} alt="" width="60" height="60" />
          </div>
          <p className="site-loader-name">SNOW WHITE</p>
          <p className="site-loader-label">PRIVATE SCHOOLS</p>
        </div>
      )}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
