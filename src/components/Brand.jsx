
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Brand() {
  return (
    <Link
      to="/"
      className="brand"
      aria-label="Snow White Private Schools home"
    >
      <img
        className="brand__crest"
        src={logo}
        alt=""
        width="40"
        height="40"
      />

      <span className="brand__text">
        <span className="brand__name">SNOW WHITE</span>
        <span className="brand__subtitle">PRIVATE SCHOOLS</span>
      </span>
    </Link>
  );
}
