# Turkey Winter Escape – Interactive Itinerary

A working family itinerary for eight winter nights in Istanbul (hotel nights Dec 26, 2026 – Jan 3, 2027), built as a single static page.

## Features
- Full-bleed hero, "still to confirm" board for open (TBD) items
- Flights with Google Maps route embeds and Google Flights search links
- Hotels (lead pick plus alternates)
- Accessible day-by-day accordion: every stop has a photo, a short write-up, and a "getting there" leg (mode, approximate time, Google Maps directions)
- A Leaflet map for each day, numbered in order from the hotel
- City map of every stop, color-coded by day, with a legend
- Restaurants, and photo credits for every Wikimedia Commons image
- Responsive, respects `prefers-reduced-motion`, print-friendly

## How it's built
Plain static files, no build step: `index.html`, `styles.css` (hand-written), `app.js` (vanilla JS), `images/` (resized WebP from Wikimedia Commons), and Leaflet 1.9.4 vendored in `vendor/leaflet/`. Map tiles © OpenStreetMap contributors.

## Live
Deployed by Vercel as static files from this repo.
