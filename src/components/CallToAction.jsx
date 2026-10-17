
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="cta home-final-cta" data-reveal="fade-up">
      <div className="w home-final-cta-inner">
        <div className="home-final-cta-copy">
          <h2>Give Your Child a Strong Foundation for the Future.</h2>

          <p>
            Join Snow White Private Schools and become part of a
            community committed to education, character and opportunity.
          </p>
        </div>

        <Link className="btn w2 home-final-cta-button" to="/contact">
          Contact Us
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
