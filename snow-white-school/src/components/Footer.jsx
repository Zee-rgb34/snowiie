import { Link } from "react-router-dom";
import Brand from "./Brand.jsx";
import { contactInfo } from "../data.js";

export default function Footer() {
  return (
    <footer>
      <div className="w">
        <div className="fg">
          <div>
            <Brand />
            <p>Learning Today | Leading Tomorrow</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div>
            <h4>Contact Information</h4>
            {contactInfo.map((t) => <p key={t}>{t}</p>)}
          </div>
          <div>
            <h4>Follow Us</h4>
            <div className="soc">{[1, 2, 3, 4].map((i) => <span key={i} />)}</div>
          </div>
        </div>
        <div className="fb">
          <span>© 2025 SNOW WHITE PRIVATE SCHOOLS. All rights reserved.</span>
          <span>Privacy Policy | Terms &amp; Conditions</span>
        </div>
      </div>
    </footer>
  );
}
