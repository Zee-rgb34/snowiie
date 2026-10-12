import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Brand() {
  return (
    <Link to="/" className="logo">
      <img src={logo} alt="" />
      <div className="lt">
        <b>SNOW WHITE</b>
        <i>PRIVATE SCHOOLS</i>
      </div>
    </Link>
  );
}
