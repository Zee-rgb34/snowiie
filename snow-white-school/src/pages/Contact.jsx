import { useState } from "react";
import CallToAction from "../components/CallToAction.jsx";
import { contactInfo } from "../data.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const valid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.message.trim();

  const submit = (e) => {
    e.preventDefault();
    // TODO: send `form` to your email service or backend here.
    setSent(true);
  };

  return (
    <>
      <section className="pg">
        <div className="w">
          <div className="eb" style={{ color: "var(--red)" }}>Contact Us</div>
          <h1>We'd love to hear from you</h1>
          <p className="mut">Enquire about admissions, visits or anything else.</p>
        </div>
      </section>

      <section className="sec">
        <div className="w two">
          <div className="card pad">
            {sent ? (
              <div className="ok">Thank you, {form.name}. Your message is ready to be sent — connect this form to your email or backend.</div>
            ) : (
              <form onSubmit={submit}>
                <label htmlFor="name">Your name</label>
                <input id="name" value={form.name} onChange={set("name")} />
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={form.email} onChange={set("email")} />
                <label htmlFor="message">Message</label>
                <textarea id="message" rows={5} value={form.message} onChange={set("message")} />
                <p>
                  <button className="btn" type="submit" disabled={!valid} style={{ marginTop: 14, opacity: valid ? 1 : 0.5 }}>Send message ➜</button>
                </p>
              </form>
            )}
          </div>
          <div className="card pad">
            <h3>Contact Information</h3>
            {contactInfo.map((t) => <p key={t} style={{ margin: "10px 0" }}>{t}</p>)}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
