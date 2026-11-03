import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import campusFront from "../assets/campus-front.jpg";
import campusPrimary from "../assets/campus-primary-optimized.jpg";

const slides = [campusFront, campusPrimary];

function HeroLink({ to, className, children }) {
  if (to.startsWith("#")) {
    return (
      <a className={className} href={to}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default function SchoolHero({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
  labelledBy,
  showCaption = true,
  caption = "Learning today. Leading tomorrow.",
}) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || slides.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      className="hero home-hero about-hero-banner school-hero"
      aria-labelledby={labelledBy}
    >
      <div className="home-hero-slides" aria-hidden="true">
        {slides.map((image, index) => (
          <div
            key={image}
            className={`home-hero-slide ${
              index === activeSlide ? "is-active" : ""
            }`}
          >
            <img
              src={image}
              alt=""
              width="1280"
              height="960"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchpriority={index === 0 ? "high" : "auto"}
            />
          </div>
        ))}
      </div>

      <div className="home-hero-overlay" aria-hidden="true" />

      <div className="w home-hero-inner">
        <div className="home-hero-content">
          <div className="home-hero-eyebrow">
            <div className="eb">{eyebrow}</div>
          </div>

          <h1 id={labelledBy}>{title}</h1>

          <p className="home-hero-description">{description}</p>

          <div className="b home-hero-actions">
            <HeroLink className="btn home-primary-button" to={primaryTo}>
              {primaryLabel}
              <span aria-hidden="true">→</span>
            </HeroLink>

            <HeroLink
              className="btn o home-secondary-button"
              to={secondaryTo}
            >
              {secondaryLabel}
              <span aria-hidden="true">↗</span>
            </HeroLink>
          </div>
        </div>

        {showCaption && (
          <div className="home-hero-caption">
            <span>{caption}</span>
          </div>
        )}
      </div>

      <div className="home-hero-bottom" aria-hidden="true" />
    </section>
  );
}
