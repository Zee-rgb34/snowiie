import { useState } from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand.jsx";
import Icon from "./Icon.jsx";
import { contactInfo } from "../data.js";
import { submitSchoolMessage } from "../lib/schoolSubmissions.js";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/about", label: "Academics" },
  { to: "/contact", label: "Admissions" },
  { to: "/contact", label: "Contact" },
];

const institutionalLinks = [
  { to: "/about", label: "Subjects" },
  { to: "/about", label: "News" },
  { to: "/about", label: "Gallery" },
  { to: "/about", label: "Results Portal" },
  { to: "/about", label: "School Life" },
];

const contactIcons = ["map-pin", "phone", "mail", "phone", "message", "link"];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/share/1GvpggUdUU/", icon: "facebook" },
  { label: "WhatsApp", href: "https://wa.me/265992686891", icon: "whatsapp" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterError, setNewsletterError] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    setNewsletterMessage("");
    setNewsletterError("");
    setNewsletterSubmitting(true);

    try {
      const consent = event.currentTarget.elements.namedItem("newsletterConsent");
      await submitSchoolMessage({
        type: "newsletter",
        email: email.trim(),
        consent: consent.checked,
      });
      setNewsletterMessage("You are subscribed to school updates.");
      setEmail("");
    } catch (error) {
      setNewsletterError(error.message);
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  return (
    <footer className="site-footer">
      <div className="w site-footer-inner">
        <div className="site-footer-main" data-reveal="fade-up">
          <div className="site-footer-brand-column">
            <Brand />
            <p className="site-footer-description">
              Empowering learners through academic excellence, innovation,
              and character in a caring school community.
            </p>

            <div className="site-footer-contact">
              {contactInfo.map((detail, index) => (
                <p className="site-footer-contact-item" key={detail}>
                  <span className="site-footer-contact-icon" aria-hidden="true">
                    <Icon name={contactIcons[index]} />
                  </span>
                  <span>{detail}</span>
                </p>
              ))}
            </div>
          </div>

          <nav className="site-footer-links" aria-label="Quick links">
            <h2>Quick Links</h2>
            {quickLinks.map((item) => (
              <Link to={item.to} key={item.label}>{item.label}</Link>
            ))}
          </nav>

          <nav className="site-footer-links" aria-label="Institutional links">
            <h2>Institutional</h2>
            {institutionalLinks.map((item) => (
              <Link to={item.to} key={item.label}>{item.label}</Link>
            ))}
          </nav>

          <div className="site-footer-utility">
            <section className="site-footer-admissions">
              <h2>Ready to Join Us?</h2>
              <p>Contact our team to learn about admissions and available places.</p>
              <Link to="/contact" className="site-footer-apply-button">
                Apply Now
                <span aria-hidden="true">↗</span>
              </Link>
            </section>

            <section className="site-footer-newsletter" aria-labelledby="footer-newsletter-title">
              <h2 id="footer-newsletter-title">Stay Updated</h2>
              <form
                className="site-footer-newsletter-form"
                onSubmit={handleNewsletterSubmit}
                aria-busy={newsletterSubmitting}
              >
                <label className="sr-only" htmlFor="footer-email">Your email address</label>
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  maxLength={254}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  disabled={newsletterSubmitting}
                />
                <label className="site-footer-newsletter-consent">
                  <input type="checkbox" required name="newsletterConsent" />
                  <span>
                    I agree to receive school updates by email. Contact the
                    school to unsubscribe.
                  </span>
                </label>
                <button type="submit" disabled={newsletterSubmitting}>
                  {newsletterSubmitting ? (
                    <>
                      <span className="form-spinner" aria-hidden="true" />
                      Subscribing
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
              {newsletterMessage && (
                <p className="site-footer-newsletter-message" role="status">
                  {newsletterMessage}
                </p>
              )}
              {newsletterError && (
                <p className="site-footer-newsletter-message is-error" role="alert">
                  {newsletterError}
                </p>
              )}
              <p className="site-footer-newsletter-note">
                Subscribe to occasional school updates. Read our{" "}
                <Link to="/privacy-policy">privacy policy</Link>.
              </p>
            </section>
          </div>
        </div>

        <div className="site-footer-bottom">
          <div className="site-footer-social">
            <span>Follow Our Community</span>
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={item.label}
                className="site-footer-social-mark"
              >
                <Icon name={item.icon} />
              </a>
            ))}
          </div>

          <div className="site-footer-legal" aria-label="Legal information">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms and Conditions</Link>
          </div>
        </div>

        <p className="site-footer-copyright">
          © 2026 Snow White Private Schools. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
