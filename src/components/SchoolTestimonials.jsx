import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTestimonials } from "../lib/schoolSubmissions.js";

export default function SchoolTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paused, setPaused] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  useEffect(() => {
    let mounted = true;

    getTestimonials()
      .then((items) => {
        if (mounted) setTestimonials(items);
      })
      .catch((loadError) => {
        if (mounted) setError(loadError.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!autoPlayEnabled || paused || testimonials.length < 2) {
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % testimonials.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [autoPlayEnabled, paused, testimonials.length]);

  const move = (direction) => {
    setActiveIndex((index) =>
      (index + direction + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      className="school-testimonials"
      aria-labelledby="school-testimonials-title"
      data-reveal="fade-up"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className="w school-testimonials-inner">
        <div className="school-testimonials-heading">
          <p className="school-testimonials-kicker">HEAR FROM OUR COMMUNITY</p>
          <h2 id="school-testimonials-title">Experiences at Snow White</h2>
          <p>
            Families and members of our school community can share their
            experience with us.
          </p>
        </div>

        {loading ? (
          <p className="school-testimonials-status" role="status">
            Loading testimonials...
          </p>
        ) : error ? (
          <p className="school-testimonials-status" role="status">
            {error} You can still contact the school directly.
          </p>
        ) : testimonials.length === 0 ? (
          <p className="school-testimonials-status">
            No testimonials have been shared yet. You can be the first to
            share your experience.
          </p>
        ) : (
          <div className="school-testimonial-carousel">
            <div
              key={testimonials[activeIndex].id}
              className="school-testimonial-card"
              role="group"
              aria-roledescription="slide"
              aria-label={`Testimonial ${activeIndex + 1} of ${testimonials.length}`}
            >
              <blockquote>“{testimonials[activeIndex].quote}”</blockquote>
              <p className="school-testimonial-author">
                <strong>{testimonials[activeIndex].display_name}</strong>
                {testimonials[activeIndex].relationship && (
                  <span>{testimonials[activeIndex].relationship}</span>
                )}
              </p>
            </div>

            {testimonials.length > 1 && (
              <div className="school-testimonial-controls">
                <button
                  type="button"
                  aria-label="Show previous testimonial"
                  onClick={() => move(-1)}
                >
                  <span aria-hidden="true">←</span>
                </button>
                <span aria-live="polite">
                  {activeIndex + 1} / {testimonials.length}
                </span>
                <button
                  type="button"
                  aria-label={
                    autoPlayEnabled
                      ? "Pause testimonial carousel"
                      : "Resume testimonial carousel"
                  }
                  onClick={() => setAutoPlayEnabled((enabled) => !enabled)}
                >
                  {autoPlayEnabled ? "Pause" : "Play"}
                </button>
                <button
                  type="button"
                  aria-label="Show next testimonial"
                  onClick={() => move(1)}
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
        )}

        <Link
          className="school-testimonial-share"
          to="/contact#share-testimonial"
        >
          Share a testimonial
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
