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
    <header>
      <div className="nav">
        <Brand />
        <nav className={"links" + (open ? " open" : "")} aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end className={({ isActive }) => (isActive ? "on" : "")} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <Link className="btn" to="/contact">Enquire Now ➜</Link>
        <button className="menu" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
      </div>
    </header>
  );
}
