import { useState } from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand.jsx";
import Icon from "./Icon.jsx";
import { submitSchoolMessage } from "../lib/schoolSubmissions.js";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
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
              Super Kids, Snow White Kids. The best foundation for a child.
            </p>
          </div>

          <nav className="site-footer-links" aria-label="Quick links">
            <h2>Quick Links</h2>
            {quickLinks.map((item) => (
              <Link to={item.to} key={item.label}>{item.label}</Link>
            ))}
          </nav>

          

          <div className="site-footer-utility">
            <section className="site-footer-admissions">
              <h2>Ready to Join Us?</h2>
              <p>Contact our team to learn about admissions and available places.</p>
              <Link to="/contact" className="site-footer-apply-button">
                click here
                <span aria-hidden="true">↗</span>
              </Link>
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
