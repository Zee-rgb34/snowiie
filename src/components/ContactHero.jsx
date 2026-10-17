import { Link } from "react-router-dom";
import schoolCommunity from "../assets/school-community.jpg";

export default function ContactHero() {
  return (
    <section className="contact-hero" aria-labelledby="contact-hero-title">
      <img
        className="contact-hero-image"
        src={schoolCommunity}
        alt=""
        fetchPriority="high"
        decoding="async"
      />
      <div className="contact-hero-overlay" aria-hidden="true" />

      <div className="w contact-hero-inner">
        <div className="contact-hero-copy">
          <p className="contact-kicker">CONTACT SNOW WHITE</p>
          <h1 id="contact-hero-title">
            We're here to <span>help.</span>
          </h1>
          <p className="contact-intro-copy">
            Talk with our team about admissions, a school visit, or any
            questions you have about Snow White Private Schools.
          </p>

          <div className="contact-hero-actions">
            <a className="btn" href="#contact-enquiry">
              Send an enquiry
              <span aria-hidden="true">↓</span>
            </a>
            <a className="contact-hero-secondary" href="tel:+265992686891">
              Call 0992 68 68 91
            </a>
          </div>

          <Link className="contact-hero-secondary contact-hero-location" to="/contact#visit-school">
            Naperi, Blantyre, Malawi
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}