import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import CallToAction from "../components/CallToAction.jsx";
import { environment, why } from "../data.js";
import hero from "../assets/hero.jpg";
import school from "../assets/school.jpg";

export default function Home() {
  return (
    <>
      <section className="hero" style={{ backgroundImage: `url(${hero})`, backgroundPosition: "right center" }}>
        <div className="w">
          <div className="eb">Welcome to Snow White Private Schools</div>
          <h1>Building Bright Futures Through <em>Quality Education.</em></h1>
          <p>Welcome to SNOW WHITE PRIVATE SCHOOLS, where every learner is encouraged to discover their potential, develop confidence, and prepare for a brighter future.</p>
          <div className="b">
            <Link className="btn" to="/about">Explore Our School ➜</Link>
            <Link className="btn o" to="/contact">Contact Us ✉</Link>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="w wel">
          <img src={school} alt="School buildings" />
          <div>
            <div className="eb" style={{ color: "var(--red)" }}>Welcome to Snow White Private Schools</div>
            <h3>A Place to Learn, Grow and Belong</h3>
            <p>At SNOW WHITE PRIVATE SCHOOLS, we are committed to providing a high-quality education in a safe, supportive and disciplined environment. We focus on the holistic development of each learner, nurturing academic excellence, good character, and the confidence to achieve their goals.</p>
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="w">
          <div className="top">
            <h2>Our Educational Environment</h2>
            <Link to="/about">Learn More About Us ➜</Link>
          </div>
          <div className="g3">
            {environment.map((e) => (
              <div className="card" key={e.title}>
                <img src={e.img} alt={e.title} />
                <div className="cb">
                  <Icon name={e.icon} />
                  <div><b>{e.title}</b><span>{e.text}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="w">
          <h2>Why Choose Us?</h2>
          <div className="g5">
            {why.map((w) => (
              <div key={w.title}>
                <Icon name={w.icon} />
                <b>{w.title}</b>
                <span>{w.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
