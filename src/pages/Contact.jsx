import { useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction.jsx";
import ContactHero from "../components/ContactHero.jsx";
import Icon from "../components/Icon.jsx";
import SeoMeta from "../components/SeoMeta.jsx";
import { submitSchoolMessage } from "../lib/schoolSubmissions.js";
import { getCanonicalUrl } from "../site.js";

const contactTopics = [
  {
    icon: "cap",
    title: "Admissions",
    text: "Ask about available places, entry requirements, and next steps.",
  },
  {
    icon: "people",
    title: "Arrange a visit",
    text: "Find out how to visit the school and meet our community.",
  },
  {
    icon: "book",
    title: "School information",
    text: "Ask about learning, school life, or support for your child.",
  },
];

const contactFaqs = [
  {
    question: "How do I make an enquiry about admissions?",
    answer: "Use the enquiry form on this page or contact the school directly by phone or email to ask about available places and the next steps.",
  },
  {
    question: "Can I arrange a visit to the school?",
    answer: "Yes. Contact the school to arrange a visit and speak with the team about the learning environment and school life.",
  },
  {
    question: "What information should I share in my message?",
    answer: "Include your child's name, the year or grade of interest, and any questions you would like answered so the school can guide you appropriately.",
  },
  {
    question: "Who can I contact for school information?",
    answer: "The school can answer questions about learning, school routines, and enrolment. Please use the confirmed contact details on the website or the contact form.",
  },
  {
    question: "Where is Snow White Private Schools located?",
    answer: "The school is based in Naperi, Blantyre, Malawi. A map and directions link are included below for convenience.",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [testimonial, setTestimonial] = useState({
    name: "",
    relationship: "",
    quote: "",
    website: "",
    consent: false,
  });
  const [testimonialSent, setTestimonialSent] = useState(false);
  const [testimonialSubmitting, setTestimonialSubmitting] = useState(false);
  const [testimonialError, setTestimonialError] = useState("");
  const set = (key) => (e) =>
    setForm((current) => ({ ...current, [key]: e.target.value }));
  const valid =
    form.name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.topic &&
    form.message.trim().length >= 10;

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      await submitSchoolMessage({
        type: "contact",
        ...form,
      });
      setSent(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const setTestimonialValue = (key) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setTestimonial((current) => ({ ...current, [key]: value }));
  };

  const submitTestimonial = async (event) => {
    event.preventDefault();
    setTestimonialSubmitting(true);
    setTestimonialError("");

    try {
      const result = await submitSchoolMessage({
        type: "testimonial",
        displayName: testimonial.name,
        relationship: testimonial.relationship,
        quote: testimonial.quote,
        website: testimonial.website,
        consent: testimonial.consent,
      });
      setTestimonialSent(true);
      if (result.notificationSent === false) {
        setTestimonialError(
          "Your testimonial is published, but the school could not be notified by email."
        );
      }
    } catch (error) {
      setTestimonialError(error.message);
    } finally {
      setTestimonialSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <SeoMeta
        title="Contact us"
        description="Contact Snow White Private Schools in Naperi, Blantyre, Malawi for admissions enquiries, school information, and visits."
        pathname="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Snow White Private Schools",
          ...(getCanonicalUrl("/contact")
            ? { url: getCanonicalUrl("/contact") }
            : {}),
          description: "Contact Snow White Private Schools in Naperi, Blantyre, Malawi for admissions enquiries, school information, and visits.",
          mainEntity: {
            "@type": "EducationalOrganization",
            name: "Snow White Private Schools",
          },
        }}
      />

      <ContactHero />

      <section
        className="contact-main-section"
        id="contact-enquiry"
        aria-label="Send an enquiry"
        data-reveal="slide-right"
      >
        <div className="w contact-main-grid">
          <div className="contact-aside">
            <h2>How can we help?</h2>
            <p>Choose a topic in the form and include the details that will help us guide you.</p>

            <div className="contact-topic-list">
              {contactTopics.map((topic) => (
                <article className="contact-topic" key={topic.title}>
                  <span className="contact-topic-icon" aria-hidden="true">
                    <Icon name={topic.icon} />
                  </span>
                  <div>
                    <h3>{topic.title}</h3>
                    <p>{topic.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <Link className="contact-about-link" to="/about">
              Learn about our school
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="contact-form-panel">
            <div className="contact-form-heading">
              <h2>Send an enquiry</h2>
              <p>Fields marked required help us understand your request.</p>
            </div>

            {sent ? (
              <div className="contact-form-success" role="status">
                <h3>Thank you, {form.name}.</h3>
                <p>
                  Your enquiry has been sent to the school. The team will
                  respond using the email address you provided.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit} aria-busy={submitting}>
                <div className="contact-form-row">
                  <div>
                    <label htmlFor="contact-name">Your name <span>Required</span></label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      maxLength={80}
                      minLength={2}
                      value={form.name}
                      onChange={set("name")}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email">Email address <span>Required</span></label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      value={form.email}
                      onChange={set("email")}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic">What can we help with? <span>Required</span></label>
                  <select
                    id="contact-topic"
                    name="topic"
                    value={form.topic}
                    onChange={set("topic")}
                    required
                  >
                    <option value="">Select a topic</option>
                    {contactTopics.map((topic) => (
                      <option key={topic.title} value={topic.title}>{topic.title}</option>
                    ))}
                    <option value="Other">Something else</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message">How can we help? <span>Required</span></label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    minLength={10}
                    maxLength={5000}
                    value={form.message}
                    onChange={set("message")}
                    required
                  />
                </div>

                <div className="submission-honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    value={form.website || ""}
                    onChange={set("website")}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {submitError && (
                  <p className="form-error" role="alert">{submitError}</p>
                )}

                <button
                  className="btn contact-submit-button"
                  type="submit"
                  disabled={!valid || submitting}
                >
                  {submitting ? (
                    <>
                      <span className="form-spinner" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    "Send enquiry"
                  )}
                  {!submitting && <span aria-hidden="true">→</span>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section
        className="contact-testimonial-section"
        id="share-testimonial"
        aria-labelledby="share-testimonial-title"
        data-reveal="scale"
      >
        <div className="w contact-testimonial-layout">
          <div className="contact-testimonial-intro">
            <p className="contact-kicker">SHARE YOUR EXPERIENCE</p>
            <h2 id="share-testimonial-title">Tell us what Snow White means to you.</h2>
            <p>
              Testimonials are published on this website as soon as they are
              submitted. Only share details you are comfortable making public.
            </p>
          </div>

          <div className="contact-testimonial-form-panel">
            {testimonialSent ? (
              <div className="contact-form-success" role="status">
                <h3>Thank you for sharing.</h3>
                <p>Your testimonial is now included in the school carousel.</p>
                {testimonialError && (
                  <p className="form-error">{testimonialError}</p>
                )}
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={submitTestimonial}
                aria-busy={testimonialSubmitting}
              >
                <div>
                  <label htmlFor="testimonial-name">Name to display <span>Required</span></label>
                  <input
                    id="testimonial-name"
                    name="displayName"
                    value={testimonial.name}
                    onChange={setTestimonialValue("name")}
                    minLength={2}
                    maxLength={80}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="testimonial-relationship">Your connection to the school</label>
                  <input
                    id="testimonial-relationship"
                    name="relationship"
                    placeholder="For example, parent or former learner"
                    value={testimonial.relationship}
                    onChange={setTestimonialValue("relationship")}
                    maxLength={80}
                  />
                </div>

                <div>
                  <label htmlFor="testimonial-quote">Your testimonial <span>Required</span></label>
                  <textarea
                    id="testimonial-quote"
                    name="quote"
                    rows={5}
                    value={testimonial.quote}
                    onChange={setTestimonialValue("quote")}
                    minLength={20}
                    maxLength={1000}
                    required
                  />
                </div>

                <div className="submission-honeypot" aria-hidden="true">
                  <label htmlFor="testimonial-website">Website</label>
                  <input
                    id="testimonial-website"
                    name="website"
                    value={testimonial.website}
                    onChange={setTestimonialValue("website")}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <label className="testimonial-consent">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={testimonial.consent}
                    onChange={setTestimonialValue("consent")}
                    required
                  />
                  <span>
                    I agree to have my name and testimonial shown publicly on
                    the school website.
                  </span>
                </label>

                {testimonialError && !testimonialSent && (
                  <p className="form-error" role="alert">{testimonialError}</p>
                )}

                <button
                  className="btn contact-submit-button"
                  type="submit"
                  disabled={
                    testimonial.name.trim().length < 2 ||
                    testimonial.quote.trim().length < 20 ||
                    !testimonial.consent ||
                    testimonialSubmitting
                  }
                >
                  {testimonialSubmitting ? (
                    <>
                      <span className="form-spinner" aria-hidden="true" />
                      Sharing...
                    </>
                  ) : (
                    "Share testimonial"
                  )}
                  {!testimonialSubmitting && <span aria-hidden="true">→</span>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="contact-help-section" data-reveal="slide-left">
        <div className="w">
          <div className="contact-section-heading">
            <h2>What can you contact us about?</h2>
            <p>We can help you find the right next step for your family.</p>
          </div>

          <div className="contact-help-grid">
            {contactTopics.map((topic) => (
              <article className="contact-help-card" key={topic.title}>
                <span className="contact-help-icon" aria-hidden="true">
                  <Icon name={topic.icon} />
                </span>
                <h3>{topic.title}</h3>
                <p>{topic.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-location-section" aria-labelledby="contact-location-title" data-reveal="slide-right">
        <div className="w contact-location-layout">
          <div className="contact-location-copy">
            <p className="contact-kicker">VISIT US</p>
            <h2 id="contact-location-title">Find us in Naperi.</h2>
            <p>
              Snow White Private Schools is located in Naperi, Blantyre, Malawi. If you would like to visit the school,
              contact us first so we can help arrange a convenient time and guide you to the right point of arrival.
            </p>

            <div className="contact-location-details">
              <div className="contact-location-detail">
                <span className="contact-location-icon" aria-hidden="true"><Icon name="map-pin" /></span>
                <p><strong>Location</strong><span>Naperi, Blantyre, Malawi</span></p>
              </div>
              <a className="contact-location-detail" href="tel:+265992686891">
                <span className="contact-location-icon" aria-hidden="true"><Icon name="phone" /></span>
                <p><strong>Phone</strong><span>+265 992 68 68 91</span></p>
              </a>
              <a className="contact-location-detail" href="mailto:director.snowwhiteschools@gmail.com">
                <span className="contact-location-icon" aria-hidden="true"><Icon name="mail" /></span>
                <p><strong>Email</strong><span>director.snowwhiteschools@gmail.com</span></p>
              </a>
            </div>

            <a
              className="btn contact-location-button"
              href="https://www.google.com/maps/search/?api=1&query=Naperi+Blantyre+Malawi"
              target="_blank"
              rel="noreferrer noopener"
            >
              Get directions
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="contact-map-panel" aria-label="Map to Snow White Private Schools">
            <iframe
              title="Map showing the location of Snow White Private Schools in Naperi, Blantyre, Malawi"
              src="https://www.google.com/maps?q=Naperi%20Blantyre%20Malawi&z=13&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="contact-faq-section" data-reveal="fade-up">
        <div className="w contact-faq-layout">
          <div className="contact-faq-heading">
            <p className="contact-kicker">A FEW QUICK ANSWERS</p>
            <h2>Frequently asked questions</h2>
            <p>Still unsure? Send us your question and we'll point you in the right direction.</p>
            <Link className="contact-about-link" to="/contact">
              Ask the school
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="contact-faq-list">
            {contactFaqs.map((faq) => (
              <details className="contact-faq-item" key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
