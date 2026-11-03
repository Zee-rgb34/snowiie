
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Icon from "../components/Icon.jsx";
import CallToAction from "../components/CallToAction.jsx";
import SeoMeta from "../components/SeoMeta.jsx";
import SchoolHero from "../components/SchoolHero.jsx";

import { environment } from "../data.js";
import { getCanonicalUrl } from "../site.js";

import schoolCommunity from "../assets/school-community.jpg";
import classroom from "../../images/FB_IMG_1791889746203.jpg.jpeg";
import sportsDay from "../assets/sports-day.jpg";

/* =========================================================
   SHARED HOMEPAGE COMPONENTS
   ========================================================= */

function SectionHeading({ children, description }) {
  return (
    <div className="home-section-heading home-reveal">
      <h2>{children}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <div
      className={`home-reveal ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   WELCOME SECTION
   ========================================================= */

function WelcomeSection() {
  return (
    <section
      className="home-welcome-section"
      aria-labelledby="home-welcome-title"
    >
      <div className="w home-welcome-grid">
        <Reveal className="home-welcome-image-wrap">
          <div className="home-image-frame">
            <img
              className="home-welcome-image"
              src={classroom}
              alt="Learners taking part in a classroom activity"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>

        <Reveal className="home-welcome-content" delay={120}>
          <h2 id="home-welcome-title">
            A Place to Learn, <span>Grow and Belong</span>
          </h2>

          <p>
            At Snow White Private Schools, we are committed to
            providing a high-quality education in a safe, supportive
            and disciplined environment. We encourage academic
            development, good character and the confidence learners
            need to work towards their goals.
          </p>

          <div className="home-welcome-divider" />

          <Link className="home-text-link" to="/about">
            Discover our school
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   EDUCATIONAL ENVIRONMENT
   ========================================================= */

function EnvironmentSection() {
  return (
    <section
      className="home-environment-section"
      aria-labelledby="home-environment-title"
    >
      <div className="w">
        <div className="home-section-top">
          <div>
            <SectionHeading description="An environment where learners are encouraged to learn, participate and grow.">
              Our Educational Environment
            </SectionHeading>
          </div>

          <Link className="home-section-link" to="/about">
            Learn more about us
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="home-environment-grid">
          {environment.map((item, index) => (
            <Reveal
              key={item.title}
              className="home-environment-reveal"
              delay={index * 100}
            >
              <article className="home-environment-card">
                <div className="home-card-image-wrap">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                  />

                  <span className="home-card-image-shade" />
                </div>

                <div className="home-card-content">
                  <div className="home-card-icon" aria-hidden="true">
                    <Icon name={item.icon} />
                  </div>

                  <div className="home-card-copy">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   BEYOND THE CLASSROOM
   ========================================================= */


/* =========================================================
   THE FIVE KEYS
   ========================================================= */

function ParentsCommunitySection() {
  const fiveKeys = [
    {
      title: "Punctuality",
      text: "Encouraging learners to arrive on time, respect schedules and manage their time responsibly.",
      icon: "clock",
    },
    {
      title: "Hard Work",
      text: "Inspiring learners to remain committed to their studies, put in their best effort and strive for excellence.",
      icon: "up",
    },
    {
      title: "Respect",
      text: "Teaching learners to value their teachers, fellow students, parents and everyone around them.",
      icon: "users",
    },
    {
      title: "Love",
      text: "Promoting kindness, care, compassion and positive relationships within the school community.",
      icon: "heart",
    },
    {
      title: "Smartness",
      text: "Encouraging learners to maintain neatness, discipline, confidence and a positive attitude.",
      icon: "star",
    },
  ];

  return (
    <section
      className="home-why-section home-five-keys-section"
      aria-labelledby="home-five-keys-title"
    >
      <div className="w">
        <div className="home-why-heading">
          <SectionHeading description="Snow White Private Schools has five key values that guide learners in their behaviour, learning and personal development.">
            The Five Keys: <span>Guiding Our Learners.</span>
          </SectionHeading>
        </div>

        <div className="home-why-grid">
          {fiveKeys.map((item, index) => (
            <Reveal
              key={item.title}
              className="home-why-reveal"
              delay={index * 90}
            >
              <article className="home-why-item">
                <div className="home-why-icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </div>

                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="home-why-bottom" delay={100}>
          <div className="home-why-bottom-copy">
            <span className="home-why-bottom-label">
              Education with purpose
            </span>

            <p>
              These principles help shape responsible, respectful and
              hardworking individuals.
            </p>
          </div>

          <Link className="btn home-why-button" to="/about">
            About our school
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   ADMISSIONS
   ========================================================= */

function AdmissionsSection() {
  return null;
}

/* =========================================================
   HOMEPAGE
   ========================================================= */

function HomePageContent() {
  return (
    <>
      <SchoolHero
        eyebrow="Welcome to Snow White Private Schools"
        title="Building Bright Futures Through Quality Education."
        description="We nurture academic growth, confidence and good character in a supportive environment where every learner can discover their potential and prepare for a brighter future."
        primaryLabel="Explore Our School"
        primaryTo="/about"
        secondaryLabel="Contact Us"
        secondaryTo="/contact"
        labelledBy="home-hero-title"
      />

      <WelcomeSection />
      <EnvironmentSection />
      <ParentsCommunitySection />
      <AdmissionsSection />

      <div className="home-cta-wrap">
        <CallToAction />
      </div>
    </>
  );
}

/* =========================================================
   HOME PAGE
   ========================================================= */

export default function Home() {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      reduceMotion ||
      !("IntersectionObserver" in window)
    ) {
      page.classList.add("home-motion-complete");
      return undefined;
    }

    const elements = page.querySelectorAll(".home-reveal");

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    page.classList.add("home-motion-ready");

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      page.classList.remove("home-motion-ready");
    };
  }, []);

  return (
    <>
      <SeoMeta
        title="Home"
        description="Snow White Private Schools in Naperi, Blantyre, Malawi offers a caring, academically focused learning environment for children and families."
        pathname="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Snow White Private Schools",
          ...(getCanonicalUrl("/")
            ? { url: getCanonicalUrl("/") }
            : {}),
          description: "Snow White Private Schools in Naperi, Blantyre, Malawi offers a caring, academically focused learning environment for children and families.",
          publisher: {
            "@type": "Organization",
            name: "Snow White Private Schools",
          },
        }}
      />

      <div className="home-page" ref={pageRef}>
        <HomePageContent />
      </div>
    </>
  );
}
