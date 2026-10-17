import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Brand from "./Brand.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav">
        <Brand />
        <nav
          id="primary-navigation"
          className={`links${open ? " open" : ""}`}
          aria-label="Main"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) => (isActive ? "on" : "")}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <Link className="btn site-header-enquire" to="/contact">
          Enquire Now
          <span aria-hidden="true">→</span>
        </Link>
        <button
          className={`menu${open ? " is-open" : ""}`}
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <span className="menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  );
}
