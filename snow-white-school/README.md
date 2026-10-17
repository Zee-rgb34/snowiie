# Snow White Private Schools – React website

Pages: Home, About Us, Contact Us.

## Run
    npm install
    npm run dev       # development
    npm run build     # production files go to /dist (upload these to your host)

## Structure
- src/pages – Home, About, Contact
- src/components – Header, Footer, Brand, CallToAction, Icon
- src/assets – images (replace with your own photos, same file names)
- src/styles/global.css – all styling (colours are CSS variables at the top)
- src/data.js – text content for cards and values

The contact form shows a thank-you message only; connect it to your email service or backend in src/pages/Contact.jsx.
