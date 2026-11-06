# Raju Ghee Sweets — website

Homepage for Raju Ghee Sweets, Vijayatakies Centre, Vijayawada.
React 19 + Vite, with Framer Motion for animation and Lenis for smooth scrolling.
All imagery is real photography (Pexels and Unsplash, free for commercial use).

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve the production build
```

Deploy by uploading `dist/` to any static host (Vercel, Netlify, cPanel `public_html`, S3).

## Edit the content

| What | File |
| --- | --- |
| Shop details: address, hours, phone, WhatsApp, branches, socials, "since" year | `src/config/site.js` |
| Sweets menu (tabs), Andhra specials, snacks, gifting cards, craft steps, marquee | `src/data/content.js` |
| Every photo (one place) | `src/data/images.js` |
| Colours (taken from the logo), fonts, spacing | tokens at the top of `src/styles/global.css` |
| Logo and icons (cut from the final logo PDF, crimson version) | `public/logo.webp`, `public/logo-full.webp` (with tagline), `public/favicon.png`, `public/apple-touch-icon.png` |

**Fill in before launch** (they show as `[placeholders]` on the page until you do):
`phone`, `whatsapp`, `since`, the two branch addresses and the social links in `src/config/site.js`.
Once `whatsapp` is set, every "Order" and "Add to an order" button opens WhatsApp with a pre-filled message naming the sweet.

## Online orders

Customers add sweets, snacks and Andhra specials to a cart (choosing a pack size), then
pick **pickup**, **delivery in Vijayawada** or **courier across India**, fill in their
details and press **Send order on WhatsApp**. The whole order arrives on the shop's
WhatsApp as one message; the customer pays by UPI or cash once the shop confirms.
There is no payment gateway, server or fee.

Before launch:

1. Set `whatsapp` in `src/config/site.js`. Until it's set, checkout shows a message
   asking customers to call instead.
2. Fill in prices in `PRICES` in `src/data/shop.js` (per pack: `'250 g'`, `'500 g'`, `'1 kg'`,
   or pieces for pootharekulu, bobbatlu and malpua). Anything without a price shows
   "Price on request" and the order asks the shop to confirm it.
3. Optional: set delivery charges (`DELIVERY.local.fee`, `DELIVERY.courier.fee`), and
   adjust which sweets can't go by courier (`NO_COURIER`) in the same file.

The cart is saved in the visitor's browser, so it survives a page reload.

## Use the shop's own photos

The photos are good stock shots of the same sweets, but they aren't Raju's counter.
To swap any of them:

1. Put the file in `public/images/`, e.g. `public/images/motichoor.jpg`.
2. In `src/data/images.js`, add `local: '/images/motichoor.jpg'` to that entry
   (and update its `alt` text). The site uses the local file instead.

The Andhra specials photos and three snack photos come from Wikimedia Commons under
CC BY-SA, which requires credit, so keep the footer's "Photo credits" while they are in
use (see `CREDITS.md`).

## What's on the page

1. **Preloader**: the logo, Telugu name and counter; a curtain lifts.
2. **Hero**: a full-screen looping video (`public/video/`) behind a line-by-line headline and a live "Open now" pill (calculated in India time). Phones
   get a lighter 480p file; data-saver and reduced-motion visitors see the still poster.
   To replace the video, re-export `hero-sweets-720.mp4`, `hero-sweets-480.mp4` and `hero-sweets-poster.jpg`
   (muted, H.264, a few MB at most).
   The current video was made with Gemini; its bottom-right corner (where Gemini's mark
   sat) is cropped out of the exported files. Real footage from the shop's kitchen is the
   best replacement when you have it.
3. **Marquee**: two rows of sweet names and photo thumbnails that speed up and reverse
   with your scroll.
4. **Our promise**: the story text lights up word by word as you scroll.
5. **The counter**: tabbed menu (Ghee Classics / Milk & Syrup) with a sliding tab pill,
   small photo cards (five across on desktop) with an "Add to order" button.
6. **Andhra specials**: each sweet in a round photo with the logo's gold double ring.
7. **Snacks**: on desktop the section pins and the cards slide sideways as you scroll;
   on phones it's a swipeable row.
8. **Gifting**: ribbon-wrapped gift cards with hanging gift tags (festival box leads, full width) and a four-step "how a gift box comes together" strip.
9. **The craft**: four tall photo panels; the one you hover, tap or focus widens to tell its step (stacked cards on phones).
10. **Visit**: store card with live open/closed status, branches and an illustrative map.
11. **Footer**: animated outlined wordmark, links and photo credits.

Also: a floating WhatsApp "Order" button after the hero, a crimson cursor ring on desktop,
a full-screen menu on phones, and `prefers-reduced-motion` support (no smooth scroll,
no preloader, no motion).

## Structure

```
src/
  App.jsx                 page assembly, Lenis, preloader
  config/site.js          store details + link helpers
  data/content.js         all copy and menus
  data/images.js          all photos (+ helpers, local override)
  lib/motion.js           easing curves, spotlight helper
  hooks/index.js          useMedia, useOpenStatus, Lenis context
  components/ui/          Img, Reveal, RevealLines, Magnetic, Tilt,
                          Cursor, Preloader, Icon
  components/sections/    Nav, Hero, Marquee, Story, Menu, Specials, Snacks,
                          Gifting, Craft, Visit, Footer
  styles/global.css
```

Photo credits: see `CREDITS.md`. Fonts: Rozha One, Hind and Ramaraja
(Google Fonts, SIL Open Font License).
