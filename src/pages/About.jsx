
import { Link } from "react-router-dom";

import Icon from "../components/Icon.jsx";
import CallToAction from "../components/CallToAction.jsx";
import SeoMeta from "../components/SeoMeta.jsx";
import SchoolHero from "../components/SchoolHero.jsx";
import SchoolTestimonials from "../components/SchoolTestimonials.jsx";
import { values, environment, why } from "../data.js";

import hero from "../assets/school-campus.jpg";
import studentActivities from "../assets/student-activities.jpg";

/* =========================================================
   ABOUT PAGE
   ========================================================= */

export default function About() {
  const gallery = environment.slice(0, 3);
  const stats = [
    { value: values.length, label: "Guiding Principles" },
    { value: why.length, label: "Learning Priorities" },
    { value: environment.length, label: "Areas of School Life" },
  ];

  return (
    <div className="about-page">
      <SeoMeta
        title="About us"
        description="Learn about Snow White Private Schools in Naperi, Blantyre, Malawi, our values, academic approach, and supportive school community."
        pathname="/about"
      />
      <SchoolHero
        eyebrow="Discover Snow White Private Schools"
        title="About Us."
        description="Discover our school, our values and our commitment to helping every learner grow through quality education, good character and a supportive learning environment."
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
              We are committed to creating a learning environment where
              academic development, good character and personal growth
              work hand in hand.
            </p>
          </div>

          <img
            className="about-introduction-image"
            src={hero}
            alt="Learners studying together at Snow White Private Schools"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      {/* SCHOOL VALUES */}
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
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="about-approach-copy">
            <span className="about-eyebrow">OUR APPROACH</span>
            <h2>
              Learning With Purpose. <span>Growing Together.</span>
            </h2>
            <p>
              We build strong academic foundations while helping each learner
              develop confidence, responsibility and a lasting curiosity about
              the world around them.
            </p>

            <div className="about-approach-points">
              <div>
                <h3>Learn</h3>
                <p>Build knowledge and understanding step by step.</p>
              </div>
              <div>
                <h3>Participate</h3>
                <p>Explore interests and contribute to school life.</p>
              </div>
              <div>
                <h3>Grow</h3>
                <p>Develop good character and confidence for the future.</p>
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
              Families and school share an important role in every learner's
              progress. We value open communication and the encouragement that
              helps children feel supported at school and at home.
            </p>
          </div>

          <Link className="about-community-link" to="/contact">
            Talk with our team
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <SchoolTestimonials />

      {/* LIFE AT SCHOOL */}
      <section className="about-life" data-reveal="scale">
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
                  loading="lazy"
                  decoding="async"
                />

                <figcaption>
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
