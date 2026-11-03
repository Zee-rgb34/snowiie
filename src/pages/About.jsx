import { Link } from "react-router-dom";

import Icon from "../components/Icon.jsx";
import SeoMeta from "../components/SeoMeta.jsx";
import SchoolHero from "../components/SchoolHero.jsx";
import { values, environment } from "../data.js";

import hero from "../assets/school-campus.jpg";
import studentActivities from "../assets/student-activities.jpg";

// School activities images
import culturalDay from "../../images/FB_IMG_1791890023063.jpg.jpeg";
import graduation from "../../images/grad (1).jpeg";
import seniorTrip from "../../images/park.jpeg";
import juniorTrip from "../../images/FB_IMG_1791889901395.jpg.jpeg";
import spelling from "../../images/sp.jpeg";
import sports from "../../images/sports.jpeg";
import xmas from "../../images/xmas.jpeg";


/* =========================================================
   ABOUT PAGE
   ========================================================= */

export default function About() {
  const gallery = environment.slice(0, 3);

  const schoolActivities = [
    {
      title: "Spelling Bee",
      description:
        "Our Spelling Bee programme helps students improve their spelling, grammar and language skills while building confidence and encouraging a love for learning.",
      image:spelling,
    },
    {
      title: "Sports Day",
      description:
        "Sports Day takes place every Wednesday from 1:00 p.m. to 2:30 p.m. Students from our two campuses sometimes compete against each other, and we also participate in competitions with other schools. Snow White Schools has competed against Baptist and Southend, winning both football and netball matches.",
      image:sports,
    },
    {
      title: "Graduation and Awards Ceremony",
      description:
        "Every year, we celebrate Reception and Grade 7 students through graduation ceremonies combined with awards presentations for all classes. Alumni's are also invited to give speeches and inspire our current learners.",
      image: graduation,
    },
    {
      title: "Cultural Day",
      description:
        "Cultural Day gives students an opportunity to showcase local and international cultures. Through these celebrations, learners develop cultural awareness, respect and appreciation for different traditions.",
      image: culturalDay,
    },
    {
      title: "Senior Students' Educational Trips",
      description:
        "During the third term, senior students visit game reserves, parks, colleges and universities. These educational trips allow learners to explore new environments, gain practical knowledge and experience learning beyond the classroom.",
      image: seniorTrip,
    },
    {
      title: "Preschool and Junior Students' Trips",
      description:
        "During the third term, preschool and junior students enjoy educational and recreational trips to Gelatos and other fun places. These outings provide opportunities for exploration, enjoyment and learning outside the classroom.",
      image: juniorTrip,
    },
    {
      title: "School Celebrations and Team Building",
      description:
        "Our school also holds Christmas parties and celebrations every December. At the time, each year teachers participate in team-building activities, including trips to the lake, helping strengthen teamwork and relationships among staff.",
      image: xmas,
    },
  ];

  return (
    <div className="about-page">
      <SeoMeta
        title="About us"
        description="Learn about Snow White Private Schools in Naperi, Blantyre, Malawi, our values, academic approach, school activities and supportive school community."
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
      <section
        className="about-introduction"
        id="about-story"
        data-reveal="slide-left"
      >
        <div className="w about-introduction-layout">
          <div className="about-introduction-copy">
            <span className="about-eyebrow">ABOUT SNOW WHITE</span>

            <h2>
              Our History <span>and Growth</span>
            </h2>

            <p>
              Snow White Schools was established in 1995 by Ms. Lilian Banda, a teacher who began the institution as a preschool. Over the years, the school has grown and developed to accommodate more than 200 students. 
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

      {/* OUR APPROACH */}
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
          </div>
        </div>
      </section>

      {/* SCHOOL ACTIVITIES */}
      <section className="about-activities" data-reveal="fade-up">
        <div className="w">
          <div className="about-activities-heading">
            <div>
              <span className="about-eyebrow">BEYOND THE CLASSROOM</span>

              <h2>
                Activities That Make <span>Learning Meaningful.</span>
              </h2>
            </div>
          </div>

          <div className="about-activities-grid">
            {schoolActivities.map((activity, index) => (
              <article
                className={`about-activity-card ${
                  activity.image ? "has-image" : "no-image"
                }`}
                key={activity.title}
              >
                {activity.image ? (
                  <div className="about-activity-image">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div className="about-activity-icon" aria-hidden="true">
                    <Icon name={activity.icon} />
                  </div>
                )}

                <div className="about-activity-content">
                  <span className="about-activity-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{activity.title}</h3>

                  <p>{activity.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LIFE AT SCHOOL GALLERY */}
      <section className="about-life" data-reveal="scale">
        <div className="w">
          <div className="about-life-heading">
            <div>
              <span className="about-eyebrow">LIFE AT SNOW WHITE</span>

              <h2>
                Learning Beyond <span>the Textbook.</span>
              </h2>
            </div>
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

    </div>
  );
}