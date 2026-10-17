import Icon from "../components/Icon.jsx";
import CallToAction from "../components/CallToAction.jsx";
import { values, environment } from "../data.js";
import school from "../assets/school.jpg";

export default function About() {
  return (
    <>
      <section className="pg">
        <div className="w">
          <div className="eb" style={{ color: "var(--red)" }}>About Us</div>
          <h1>A Place to Learn, Grow and Belong</h1>
          <p className="mut" style={{ maxWidth: 560 }}>SNOW WHITE PRIVATE SCHOOLS focuses on the holistic development of each learner, nurturing academic excellence, good character and the confidence to achieve their goals.</p>
        </div>
      </section>

      <section className="sec">
        <div className="w two">
          <img className="cimg" src={school} alt="Our campus" />
          <div>
            <h2>Our Story</h2>
            <p className="mut">We believe every child deserves a strong foundation. Our teachers work closely with families to build learners who are curious, disciplined and kind. [Add your school's history here.]</p>
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="w g3">
          {values.map((v) => (
            <div className="card pad" key={v.title}>
              <Icon name={v.icon} />
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="w">
          <h2>Life at Snow White</h2>
          <div className="g3">
            {environment.map((e) => <img key={e.title} className="cimg" src={e.img} alt={e.title} />)}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
