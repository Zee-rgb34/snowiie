# Snow White Private Schools

React 18 and Vite website for Snow White Private Schools.

## Local development

```sh
npm install
npm run dev
npm run build
npm run preview
```

The production build is written to `dist/`. The site uses React Router; configure
the production host to serve `index.html` for application routes.

## Pages and source

- `src/pages/` contains Home, About, Contact, legal, and not-found pages.
- `src/components/` contains the shared navigation, footer, heroes, and page sections.
- `src/assets/` contains the school logo and photography.
- `src/styles/global.css` contains shared and page-scoped styles.
- `src/data.js` contains shared school contact and display information.

## Search indexing

Set `VITE_SITE_ORIGIN` to the school's verified HTTPS production origin when
building. The Vite build generates `sitemap.xml` and adds its URL to
`robots.txt` only when this value is valid. Do not use a placeholder origin.

## Forms and subscriptions

The enquiry form, testimonial form, and newsletter subscription use the
`submit-school-message` Supabase Edge Function. Testimonials are published
immediately after consent. Newsletter addresses are stored for school updates;
an email campaign sender and self-service unsubscribe link are not included.

1. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the frontend build
   environment. The anon key is public and is used only with the database's
   public testimonial read policy.
2. Apply the SQL migrations with the Supabase CLI:
   `supabase db push`.
3. Set the Edge Function secrets `ALLOWED_ORIGIN`, `SUPABASE_URL`,
   `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, and `SENDER_EMAIL`. Set
   `ALLOWED_ORIGIN` to the exact HTTPS website origin, without a path. Local
   development can use an explicit `http://localhost:5173` origin.
4. Deploy the function with:
   `supabase functions deploy submit-school-message`.
5. Verify the sender domain with Resend before relying on email delivery.

Never put the service-role key, Resend API key, or sender credentials in a
`VITE_` variable or browser code. The function validates inputs, limits request
body size and repeated submissions, checks the configured browser origin, and
keeps subscriber data inaccessible to anonymous database clients.

## Hosting security

`public/_headers` sets baseline browser security headers on Netlify and
Cloudflare Pages. For other hosts, configure the equivalent headers in the host
dashboard or web-server configuration. A static file alone cannot configure
response headers on every hosting provider.

## Production checks

- Build with the verified canonical domain and production Supabase frontend
  variables.
- Apply database migrations and deploy the Edge Function with server-only
  secrets.
- Test contact delivery to the school inbox, testimonial publishing, and
  newsletter storage with production services before launch.
