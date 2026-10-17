
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Icon from "../components/Icon.jsx";
import CallToAction from "../components/CallToAction.jsx";
import SeoMeta from "../components/SeoMeta.jsx";
import SchoolHero from "../components/SchoolHero.jsx";
import SchoolTestimonials from "../components/SchoolTestimonials.jsx";

import { environment, why } from "../data.js";
import { getCanonicalUrl } from "../site.js";

import hero from "../assets/school-campus.jpg";
import school from "../assets/student-achievements.jpg";
import schoolCommunity from "../assets/school-community.jpg";
import classroom from "../assets/classroom-learning.jpg";
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
   WHY CHOOSE US
   ========================================================= */

function WhyChooseUsSection() {
  return (
    <section
      className="home-why-section"
      aria-labelledby="home-why-title"
    >
      <div className="w">
        <div className="home-why-heading">
          <SectionHeading description="The principles that shape our approach to education and learner development.">
            Why Choose Us?
          </SectionHeading>
        </div>

        <div className="home-why-grid">
          {why.map((item, index) => (
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
              Every learner deserves an environment that supports
              their potential and prepares them for the future.
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
   BEYOND THE CLASSROOM
   ========================================================= */

function BeyondClassroomSection() {
  const activities = [
    {
      title: "Creativity and Discovery",
      text: "Encouraging learners to explore ideas, express themselves and develop their individual talents.",
      icon: "lightbulb",
    },
    {
      title: "Teamwork and Participation",
      text: "Helping learners develop cooperation, responsibility and respect through shared experiences.",
      icon: "users",
    },
    {
      title: "Confidence for Life",
      text: "Supporting the growth of communication skills, independence and a positive attitude towards learning.",
      icon: "trending-up",
    },
  ];

  return (
    <section
      className="home-beyond-section"
      aria-labelledby="home-beyond-title"
    >
      <div className="w">
        <div className="home-beyond-layout">
          <Reveal className="home-beyond-intro">
            <h2 id="home-beyond-title">
              Helping Learners Discover Their <span>Potential.</span>
            </h2>

            <p>
              Education is about more than academic achievement.
              It is also about developing curiosity, confidence,
              responsibility and the skills learners need in everyday life.
            </p>

            <Link className="home-text-link" to="/about">
              Discover our approach
              <span aria-hidden="true">→</span>
            </Link>

            <img
              className="home-beyond-image"
              src={sportsDay}
              alt="Snow White learners taking part in a school sports activity"
              loading="lazy"
              decoding="async"
            />
          </Reveal>

          <div className="home-beyond-list">
            {activities.map((activity, index) => (
              <Reveal
                key={activity.title}
                className="home-beyond-reveal"
                delay={index * 100}
              >
                <article className="home-beyond-card">
                  <div className="home-beyond-card-copy">
                    <div className="home-beyond-card-icon" aria-hidden="true">
                      <Icon name={activity.icon} />
                    </div>

                    <h3>{activity.title}</h3>
                    <p>{activity.text}</p>
                  </div>

                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PARENTS AND SCHOOL COMMUNITY
   ========================================================= */

function ParentsCommunitySection() {
  return (
    <section
      className="home-community-section"
      aria-labelledby="home-community-title"
    >
      <div className="w">
        <Reveal className="home-community-panel">
          <div className="home-community-content">
            <h2 id="home-community-title">
              Stronger Together: <span>Parents and School.</span>
            </h2>

            <p>
              A learner's progress is strengthened when school and home
              work towards shared goals. We value the role families play
              in encouraging learning, good character and personal growth.
            </p>

            <Link className="btn home-community-button" to="/contact">
              Get in Touch
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="home-community-image-wrap">
            <img
              src={schoolCommunity}
              alt="Snow White learners and staff gathered as a school community"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="home-community-points">
            <div className="home-community-point">
              <div>
                <h3>Shared Commitment</h3>
                <p>Working towards each learner's development and progress.</p>
              </div>
            </div>

            <div className="home-community-point">
              <div>
                <h3>Open Communication</h3>
                <p>Encouraging constructive conversations between families and school.</p>
              </div>
            </div>

            <div className="home-community-point">
              <div>
                <h3>A Supportive Community</h3>
                <p>Creating a positive environment where learners feel encouraged.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   SCHOOL MOMENTS
   ========================================================= */

function SchoolMomentsSection() {
  const moments = [
    {
      image: schoolCommunity,
      alt: "Learners and staff gathered as a school community",
      title: "Our School Community",
    },
    {
      image: school,
      alt: "Learners celebrating a school achievement",
      title: "Celebrating Achievement",
    },
    {
      image: sportsDay,
      alt: "Learners taking part in a school sports activity",
      title: "Learning Through Participation",
    },
  ];

  return (
    <section
      className="home-moments-section"
      aria-labelledby="home-moments-title"
    >
      <div className="w">
        <div className="home-moments-heading">
          <h2 id="home-moments-title">Life at <span>Snow White.</span></h2>
          <p>Learning, celebration and community life across our school.</p>
        </div>

        <div className="home-moments-grid">
          {moments.map((moment, index) => (
            <Reveal className="home-moment-reveal" delay={index * 90} key={moment.title}>
              <figure className="home-moment">
                <img src={moment.image} alt={moment.alt} loading="lazy" decoding="async" />
                <figcaption>{moment.title}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ADMISSIONS
   ========================================================= */

function AdmissionsSection() {
  const steps = [
    {
      title: "Make an Enquiry",
      text: "Contact the school to ask about available places and admission requirements.",
    },
    {
      title: "Get the Information",
      text: "Speak with the school about the appropriate class and the next steps.",
    },
    {
      title: "Take the Next Step",
      text: "Follow the school's guidance to proceed with the admission process.",
    },
  ];

  return (
    <section
      className="home-admissions-section"
      aria-labelledby="home-admissions-title"
    >
      <div className="w">
        <Reveal className="home-admissions-heading">
          <h2 id="home-admissions-title">
            Take the First Step Towards a <span>Brighter Future.</span>
          </h2>

          <p>
            Thinking about Snow White Private Schools for your child?
            Contact our team to learn more about the school and how to enquire
            about admission.
          </p>
        </Reveal>

        <div className="home-admissions-grid">
          {steps.map((step, index) => (
            <Reveal
              key={step.title}
              className="home-admissions-reveal"
              delay={index * 100}
            >
              <article className="home-admissions-card">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="home-admissions-action" delay={150}>
          <div>
            <span className="home-admissions-action-label">
              READY TO FIND OUT MORE?
            </span>
            <h3>Let's talk about your child's future.</h3>
          </div>

          <Link className="btn home-admissions-button" to="/contact">
            Enquire About Admission
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
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
      <WhyChooseUsSection />
      <BeyondClassroomSection />
      <ParentsCommunitySection />
      <SchoolTestimonials />
      <SchoolMomentsSection />
      <AdmissionsSection />

      <div className="home-cta-wrap">
        <CallToAction />
      </div>
    </>
  );
}

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
          ...(getCanonicalUrl("/") ? { url: getCanonicalUrl("/") } : {}),
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
