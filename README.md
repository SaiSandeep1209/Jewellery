# 💎 Aurelia — Fine Jewellery (MERN)

A visual catalogue website for a jewellery store. It **showcases items** (image, price,
stock), lets visitors **enquire on WhatsApp** and **find the store on the map**, and gives the
owner an **admin page** to add / edit / delete items with price and quantity.

> Online purchase is intentionally **not** offered — enquiries happen over WhatsApp / in store.

## Stack
- **Client:** React (Vite), React Router, Tailwind CSS, Framer Motion, Swiper, Axios, React Hook Form
- **Server:** Node, Express, MongoDB + Mongoose, JWT auth, Multer (image upload to disk)

## Project layout
```
djewellry/
├── client/   React app (catalogue + admin)
└── server/   Express API (items, auth, uploads)
```

## Quick start
From the project root:
```bash
npm run install:all     # installs root + server + client deps
npm run dev             # runs API (:5000) and client (:5173) together
```
Then open **http://localhost:5173**.

- **No database required for dev:** if `MONGO_URI` is not set, the server starts an
  **in-memory MongoDB** and auto-seeds an admin user + sample items.
- To use a real database, copy `server/.env.example` to `server/.env` and set `MONGO_URI`
  (local MongoDB or Atlas).

## Admin
- Visit **/admin** and sign in with the seeded credentials:
  - **admin@aurelia.test / admin123** (change via `server/.env`)
- Add items with name, category, material, price, **quantity**, description, image and a
  “featured” flag. Items appear in the catalogue immediately.
- Uploaded images are stored in `server/uploads/` and served at `/uploads/...`.

## Configure the store
Edit **`client/src/config/site.js`**: store name, **WhatsApp number**, phone, address,
opening hours, and the **Google Maps embed** URL.

## Build
```bash
npm --prefix client run build   # production client build -> client/dist
npm --prefix server start       # production API (set MONGO_URI + JWT_SECRET)
```

Sample images are from Unsplash placeholders — replace them from the admin page before launch.
