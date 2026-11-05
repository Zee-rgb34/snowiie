
import { Link } from "react-router-dom";

import Icon from "../components/Icon.jsx";
import CallToAction from "../components/CallToAction.jsx";
import SeoMeta from "../components/SeoMeta.jsx";
import SchoolHero from "../components/SchoolHero.jsx";
import {
  environment,
  fiveKeys,
  schoolActivities,
  schoolDirectors,
  values,
} from "../data.js";
import { directorImages } from "../directorImages.js";
import { getCanonicalUrl } from "../site.js";

import hero from "../assets/campus-front.jpg";
import studentActivities from "../assets/campus-grade-school-optimized.jpg";

/* =========================================================
   ABOUT PAGE
   ========================================================= */

export default function About() {
  const gallery = environment.slice(0, 3);
  const stats = [
    { value: "100%", label: "Grade 7 pass rate since 2010" },
    { value: "80%", label: "Grade 7 selection rate" },
    { value: "200+", label: "Students" },
  ];

  return (
    <div className="about-page">
      <SeoMeta
        title="About us"
        description="Learn about Snow White Private Schools, founded by Lilian Banda in 1995. Meet our directors, explore CI and Naperi campuses, and see how our learners grow."
        pathname="/about"
        imageAlt="Snow White Schools campus in Naperi, Blantyre"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Snow White Schools",
          ...(getCanonicalUrl("/about")
            ? { url: getCanonicalUrl("/about") }
            : {}),
          mainEntity: {
            "@id": `${getCanonicalUrl("/") || window.location.origin}/#school`,
          },
        }}
      />
      <SchoolHero
        eyebrow="Discover Snow White Private Schools"
        title="About Us."
        description="Founded in 1995 by teacher Ms. Lilian Banda, Snow White Schools has grown from a preschool into a school community of more than 200 students."
        primaryLabel="Get in Touch"
        primaryTo="/contact"
        secondaryLabel="Our Story"
        secondaryTo="#about-story"
        labelledBy="about-hero-title"
        showCaption={false}
      />

      {/* INTRODUCTION */}
      <section className="about-introduction" id="about-story" data-reveal="slide-left">
        <div className="w about-introduction-layout">
          <div className="about-introduction-copy">
            <span className="about-eyebrow">ABOUT SNOW WHITE</span>
            <h2>
              Growing Together Through <span>Quality Education.</span>
            </h2>
            <p>
              Founded in 1995 by teacher Ms. Lilian Banda, Snow White Schools
              began as a preschool. Today, more than 200 students learn across
              our two campuses, building strong foundations for the future.
            </p>
          </div>

          <img
            className="about-introduction-image"
            src={hero}
            alt="Entrance and school buildings at Snow White Schools"
            width="1280"
            height="960"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="about-highlights" data-reveal="fade-up">
        <div className="w about-highlights-grid">
          {values.map((value) => (
            <article className="about-highlight" key={value.title}>
              <span className="about-highlight-icon" aria-hidden="true">
                <Icon name={value.icon} />
              </span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-five-keys" aria-labelledby="about-five-keys-title" data-reveal="slide-left">
        <div className="w">
          <div className="about-extra-heading">
            <span className="about-eyebrow">THE FIVE KEYS</span>
            <h2 id="about-five-keys-title">Values for learning and life.</h2>
          </div>
          <div className="about-five-keys-grid">
            {fiveKeys.map((key) => (
              <article className="about-five-key" key={key.title}>
                <span className="about-highlight-icon" aria-hidden="true">
                  <Icon name={key.icon} />
                </span>
                <h3>{key.title}</h3>
                <p>{key.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-stats" aria-label="School overview" data-reveal="scale">
        <div className="w about-stats-grid">
          {stats.map((stat) => (
            <div className="about-stat" key={stat.label}>
              <span>{stat.value}</span>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-approach" data-reveal="slide-right">
        <div className="w about-approach-layout">
          <div className="about-approach-image-wrap">
            <img
              src={studentActivities}
              alt="Learners taking part in classroom learning"
              width="1100"
              height="825"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="about-approach-copy">
            <span className="about-eyebrow">OUR APPROACH</span>
            <h2>
              The Best Foundation <span>for a Child.</span>
            </h2>
            <p>
              Our mission is to provide a strong educational foundation in a
              supportive environment. We aim to help every learner develop
              knowledge, confidence and good character.
            </p>

            <div className="about-approach-points">
              <div>
                <h3>Our Vision</h3>
                <p>Confident, responsible learners ready for the future.</p>
              </div>
              <div>
                <h3>Our Results</h3>
                <p>A 100% Grade 7 pass rate maintained since 2010.</p>
              </div>
              <div>
                <h3>Our Community</h3>
                <p>Learning and service across two campuses.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-community" data-reveal="fade-up">
        <div className="w about-community-inner">
          <div>
            <span className="about-eyebrow">OUR SCHOOL COMMUNITY</span>
            <h2>
              Learning Is Stronger <span>Together.</span>
            </h2>
            <p>
              Snow White Schools is committed to community development. Our
              school has donated food to people in Chikwawa as part of its
              charity work.
            </p>
          </div>

          <Link className="about-community-link" to="/contact">
            Talk with our team
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="about-programmes" aria-labelledby="about-programmes-title" data-reveal="scale">
        <div className="w">
          <div className="about-extra-heading">
            <span className="about-eyebrow">SCHOOL PROGRAMMES AND ACTIVITIES</span>
            <h2 id="about-programmes-title">Learning inside and beyond class.</h2>
            <p>Academic, cultural and sporting experiences help learners build skills, confidence and community.</p>
          </div>
          <div className="about-programmes-grid">
            {schoolActivities.map((activity, index) => (
              <article
                className="about-programme"
                data-reveal={["slide-left", "fade-up", "slide-right"][index % 3]}
                style={{ "--reveal-delay": `${index * 70}ms` }}
                key={activity.title}
              >
                {activity.image && (
                  <img
                    className="about-programme-image"
                    src={activity.image}
                    alt={`${activity.title} at Snow White Schools`}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="about-programme-content">
                  <span className="home-card-icon" aria-hidden="true">
                    <Icon name={activity.icon} />
                  </span>
                  <h3>{activity.title}</h3>
                  <p>{activity.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-directors" aria-labelledby="about-directors-title" data-reveal="slide-right">
        <div className="w">
          <div className="about-extra-heading">
            <span className="about-eyebrow">SCHOOL MANAGEMENT</span>
            <h2 id="about-directors-title">Meet our directors.</h2>
          </div>
          <div className="about-directors-grid">
            {schoolDirectors.map((director, index) => (
              <article
                className="about-director"
                data-reveal="scale"
                style={{ "--reveal-delay": `${index * 130}ms` }}
                key={director.name}
              >
                <div>
                  <img
                    src={directorImages[director.initials]}
                    alt={director.name + " portrait"}
                    className="about-director-image"
                    width="120"
                    height="120"
                  />
                  <h3>{director.name}</h3>
                  <p>{director.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* LIFE AT SCHOOL */}
      <section className="about-life" data-reveal="fade-up">
        <div className="w">
          <div className="about-life-heading">
            <div>
              <span className="about-eyebrow">LIFE AT SNOW WHITE</span>

              <h2>
                Learning Beyond <span>the Textbook.</span>
              </h2>
            </div>

            <p>
              A look at the environment in which our learners study,
              develop and grow.
            </p>
          </div>

          <div className="about-life-gallery">
            {gallery.map((item, index) => (
              <figure
                className={`about-life-item about-life-item-${index + 1}`}
                key={item.title}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  width="1100"
                  height="825"
                  loading="lazy"
                  decoding="async"
                  data-reveal="scale"
                  style={{ "--reveal-delay": `${index * 110}ms` }}
                />

                <figcaption data-reveal="fade-up" style={{ "--reveal-delay": `${index * 110 + 70}ms` }}>
                  <span>{item.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
