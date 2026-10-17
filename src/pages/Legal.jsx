import { Link } from "react-router-dom";
import SeoMeta from "../components/SeoMeta.jsx";

function LegalPage({ title, intro, children }) {
  return (
    <div className="legal-page">
      <SeoMeta
        title={title}
        description={intro}
        pathname={window.location.pathname || "/"}
      />
      <section className="pg legal-page-hero" data-reveal="fade-up">
        <div className="w">
          <div className="eb">Snow White Private Schools</div>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </section>

      <section className="legal-page-content" data-reveal="slide-right">
        <div className="w legal-page-inner">
          {children}

          <div className="legal-page-footer">
            <p>
              If you have questions about this policy or these terms, please contact the school through the
              <Link to="/contact"> contact page</Link> or by phone on 0992 68 68 91.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This Privacy Policy explains how Snow White Private Schools handles personal information collected through this website, including enquiries, testimonials, and email subscriptions."
    >
      <div className="legal-page-block">
        <h2>1. Information we collect</h2>
        <p>
          When you use the contact form, we collect your name, email address, enquiry topic, and message. If you share a
          testimonial, we collect the display name, your connection to the school if provided, your testimonial, and your
          consent to publish it. If you subscribe to school updates, we collect your email address. Please do not include
          sensitive information or unnecessary details about a child.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>2. How we use your information</h2>
        <p>
          We use enquiry details to respond to your questions and support admissions communication. Testimonials are
          published on the website with the submitter's consent and are also used to notify the school. Subscriber email
          addresses are used to provide school updates. Contact the school to stop receiving updates or request removal.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>3. Contact and enquiry forms</h2>
        <p>
          Contact form submissions are sent to the school's email inbox through the website's form provider. The school
          may retain the resulting email according to its communications and record-keeping practices. Testimonial
          submissions are stored by the website provider and displayed publicly as soon as submitted. Email subscriptions
          are stored by the website provider for school updates. A name and testimonial can be removed, and a subscription
          can be cancelled, by contacting the school.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>4. Storage, security and retention</h2>
        <p>
          Website form submissions, published testimonials, and email subscriptions are processed using Supabase. Enquiry
          notifications are delivered using Resend. A one-way hash of the connection address may be used to limit repeated
          form submissions and is removed within one day. The school retains enquiry emails according to its operational
          and legal record-keeping needs. Testimonials remain public until removal is requested or the school removes them.
          Subscription details are retained until you unsubscribe or request removal. Service providers may process
          information in locations outside Malawi under their own terms and privacy practices.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>5. Children and family information</h2>
        <p>
          The forms are intended for parents, guardians, adult learners, and other members of the school community. A
          parent or guardian should submit information about a child only when necessary for an enquiry. Testimonials are
          public, so do not include a child's full name or other identifying details unless you have authority and wish to
          disclose them publicly.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>6. Cookies, analytics and third-party services</h2>
        <p>
          The website does not currently use an analytics service. The embedded Google map and the Supabase and Resend
          services may receive technical information when they are used. These providers operate under their own privacy
          practices. External social media links are governed by the relevant platform's terms and privacy information.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>7. Data sharing</h2>
        <p>
          We do not sell personal information. Form information and subscription details are processed by Supabase to
          handle submissions and by Resend to deliver email notifications. Testimonials are made available publicly on
          the website after submission and consent. Please consult those providers' privacy notices for details about
          their own processing.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>8. Your rights</h2>
        <p>
          Depending on the circumstances and applicable law, you may have the right to request access to the personal
          information we hold about you, ask for corrections, request deletion where appropriate, or ask for further details
          about how your information is processed. You may also object to certain processing activities where the legal basis
          does not justify continued use. To exercise such requests, please contact the school using the contact details on the
          website.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>9. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in the website, school operations, or legal
          requirements. Any revised policy will be reflected on this page with updated wording.
        </p>
      </div>
    </LegalPage>
  );
}

export function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      intro="These Terms and Conditions set out the rules for using the Snow White Private Schools website and the information it provides."
    >
      <div className="legal-page-block">
        <h2>1. Website use</h2>
        <p>
          By using this website, you agree to use it for lawful purposes only. You may not misuse the website, attempt to
          interfere with its performance, or use it to transmit harmful or inappropriate material.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>2. Intellectual property</h2>
        <p>
          The content on this website, including text, images, branding, layout, and design, is owned by or licensed to Snow
          White Private Schools. Unless otherwise stated, you may not copy, reproduce, distribute, or republish website
          content without prior permission.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>3. Enquiries and admissions information</h2>
        <p>
          Information published on this website is intended to help families understand the school, its values, programmes,
          and opportunities. Enquiry forms and contact channels are used to support communication and admissions-related
          conversations. Information may change, and visitors should confirm the latest details directly with the school.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>4. Testimonials shared by visitors</h2>
        <p>
          By submitting a testimonial and checking the consent box, you confirm that you have the right to share its
          contents and agree that your display name, stated connection to the school, and testimonial may appear publicly
          on this website immediately. Do not submit confidential, misleading, or identifying information about another
          person without their permission. Contact the school to request a correction or removal.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>5. Accuracy of information</h2>
        <p>
          We aim to keep website information accurate and up to date, but we do not guarantee that all content will always be
          complete, current, or free from errors. The school may update or amend information at any time without notice.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>6. Third-party links</h2>
        <p>
          This website may contain links to external websites or social media pages. These links are provided for convenience
          only and do not constitute an endorsement or guarantee of content, quality, safety, or accuracy. We encourage you to
          review the terms and privacy practices of any third-party website before using it.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>7. Limitation of liability</h2>
        <p>
          Snow White Private Schools does not accept liability for any loss, damage, or inconvenience arising from the use of this
          website, including interruptions, inaccurate information, or reliance on content supplied by third parties. We aim to
          provide a safe and useful website, but all use is at your own risk.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>8. Changes to the website</h2>
        <p>
          We may change, suspend, or discontinue any part of the website at any time without notice. We may also update headings,
          links, or content to reflect current operations and communication practices.
        </p>
      </div>

      <div className="legal-page-block">
        <h2>9. Contact</h2>
        <p>
          If you have questions about these Terms and Conditions, or if you need more information about the website or school,
          please contact the school through the contact page or by phone on 0992 68 68 91.
        </p>
      </div>
    </LegalPage>
  );
}

export default LegalPage;
