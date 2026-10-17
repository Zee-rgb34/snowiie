import { Link } from "react-router-dom";
import SeoMeta from "../components/SeoMeta.jsx";

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <SeoMeta
        title="Page not found"
        description="The page you are looking for is not available. Return to the Snow White Private Schools homepage or contact the school for assistance."
        noIndex
        canonical={false}
      />

      <section className="not-found-section" data-reveal="scale">
        <div className="w not-found-inner">
          <div className="not-found-badge">404</div>
          <h1>Page not found</h1>
          <p>
            The page you are looking for may have moved, been removed, or never existed. You can return to the homepage
            or contact the school for help.
          </p>

          <div className="not-found-actions">
            <Link className="btn" to="/">
              Back to Home
              <span aria-hidden="true">→</span>
            </Link>
            <Link className="btn o not-found-secondary" to="/contact">
              Contact the School
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="not-found-links">
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy policy</Link>
            <Link to="/terms-and-conditions">Terms and conditions</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
