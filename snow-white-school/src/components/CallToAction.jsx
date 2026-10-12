import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="cta">
      <div className="w">
        <div>
          <b>Give Your Child a Strong Foundation for the Future.</b>
          <p>Join SNOW WHITE PRIVATE SCHOOLS and be part of a community that values education, character and opportunity.</p>
        </div>
        <Link className="btn w2" to="/contact">Contact Us ➜</Link>
      </div>
    </section>
  );
}
