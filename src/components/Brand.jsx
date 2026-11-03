
import { Link } from "react-router-dom";
import logo from "../assets/snow-white-crest-optimized.jpg";

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
        width="320"
        height="321"
        decoding="async"
      />

      <span className="brand__text">
        <span className="brand__name">SNOW WHITE</span>
        <span className="brand__subtitle">PRIVATE SCHOOLS</span>
      </span>
    </Link>
  );
}
