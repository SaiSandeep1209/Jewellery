# Claude Project Specification: Luxury Jewelry Website (MERN)

## Project Goal

Build an original luxury jewelry e-commerce website inspired by the
overall premium feel of the reference site, **without copying its
branding, content, images, or layout verbatim**.

## Tech Stack

### Frontend

-   React (Vite)
-   React Router
-   Tailwind CSS
-   Framer Motion
-   Swiper
-   Axios
-   React Hook Form

### Backend

-   Node.js
-   Express.js
-   MongoDB + Mongoose
-   JWT Authentication
-   Cloudinary
-   Multer
-   Nodemailer

## Design Direction

-   Minimal luxury
-   Large imagery placeholders
-   Generous whitespace
-   Elegant serif headings
-   Clean sans-serif body
-   Warm neutral palette
-   Smooth animations
-   Mobile-first

## Pages

1.  Home
2.  Collections
3.  Product Listing
4.  Product Details
5.  About
6.  Journal
7.  Contact
8.  Login/Register
9.  Wishlist
10. Cart
11. Checkout
12. User Profile
13. Admin Dashboard

## Home Sections

-   Transparent Navbar
-   Hero Banner
-   Featured Collections
-   Featured Products
-   Brand Story
-   Craftsmanship
-   Testimonials
-   Instagram Gallery
-   Newsletter
-   Footer

## Components

Navbar Footer Hero CollectionCard ProductCard ProductGallery Button
SectionTitle Newsletter Testimonials Loader ScrollProgress

## Backend Models

User Product Category Order Review Wishlist Coupon Blog Newsletter

## API

/auth /products /categories /orders /reviews /blog /contact /newsletter

## Folder Structure

client/ src/ assets/ components/ pages/ hooks/ context/ services/
styles/ server/ controllers/ models/ routes/ middleware/ config/

## Tailwind

Use Tailwind for: - Layout - Responsive design - Typography - Forms -
Cards - Navigation

## Custom CSS

Only for: - Cursor - Hero overlays - Fancy hover effects - Keyframe
animations - Scrollbar - Glassmorphism refinements

## Animations

-   Fade
-   Slide
-   Zoom
-   Stagger
-   Parallax hero
-   Hover lift

## Performance

-   Lazy loading
-   Code splitting
-   Optimized images
-   Lighthouse \>95

## Claude Instructions

You are a senior full-stack engineer.

Build this project incrementally.

Rules: - Write clean, production-ready code. - Use reusable React
components. - Use Tailwind CSS first. - Only use vanilla CSS when
Tailwind is insufficient. - Keep components modular. - Build responsive
layouts. - Follow accessibility best practices. - Use REST APIs. - Use
MongoDB with Mongoose. - Validate forms. - Add loading and error
states. - Never copy text, branding, or assets from the inspiration
website. - Use placeholder images from public sources until replaced.
