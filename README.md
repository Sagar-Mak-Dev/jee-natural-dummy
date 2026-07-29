# 🌿 Jee's Natural — Fruit Shots Bar Website

> **Pure Nature. Zero Artifice.**
> A modern, animated one-page website for **Jee's Natural**, a 100% real fruit shots bar located in Nikol, Ahmedabad, Gujarat.

This repository contains the complete source code for the Jee's Natural landing page — a fast, mobile-friendly, animation-rich website built to showcase the menu, location, and customer reviews for the shop.

---

## ✨ Features

- **Animated intro loader** with bouncing fruit emojis and a "squeezing juice" progress bar
- **Sticky, scroll-aware navbar** with smooth-scroll navigation links
- **Hero section** with a rotating typewriter-style tagline
- **Floating fruit particle background animation** (canvas-based)
- **Signature product highlight** section (Jamun Shot spotlight)
- **Interactive menu grid** showcasing all fruit shots and juices
- **Animated stats counter bar** (Google rating, happy customers, etc.)
- **"Why Choose Us" feature cards** with scroll-triggered animations
- **Customer reviews / testimonials** section
- **Contact section** with embedded Google Maps, address, timings, and quick "Call" / "WhatsApp" buttons
- **Floating WhatsApp button** for quick customer contact
- Fully **responsive design** — optimized for mobile, tablet, and desktop
- Smooth transitions and micro-interactions powered by **Motion (Framer Motion)**

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **TypeScript** | Type-safe development |
| **Vite** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Motion (motion/react)** | Animations & transitions |
| **Lucide React** | Icon set |

---

## 📁 Project Structure

```
jee-natural/
├── dist/                  # Production build output (generated)
├── src/
│   ├── App.tsx             # Main application component (all sections/UI)
│   ├── main.tsx             # React entry point
│   ├── index.css             # Global styles & Tailwind theme config
│   └── vite-env.d.ts         # Vite/TypeScript environment types
├── index.html               # HTML template
├── metadata.json             # Project metadata
├── package.json               # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts                # Vite build configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/jee-natural.git
   cd jee-natural
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

### Build for Production

To create an optimized production build:

```bash
npm run build
```

The compiled output will be generated inside the `dist/` folder, ready to be deployed to any static hosting service.

To preview the production build locally:

```bash
npm run preview
```

### Other Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local development server |
| `npm run build` | Builds the app for production |
| `npm run preview` | Serves the production build locally |
| `npm run clean` | Removes the `dist/` folder |
| `npm run lint` | Runs TypeScript type-checking |

---

## 🎨 Customization

- **Brand colors**, fonts, and theme variables can be edited in `src/index.css` under the `@theme` block.
- **Menu items, reviews, navigation links,** and other content can be updated directly inside `src/App.tsx`.
- **Contact details** (phone number, WhatsApp link, address) can be updated in the Contact and Footer sections of `src/App.tsx`.

---

## 📍 About Jee's Natural

Jee's Natural is a fruit shots bar located near the Fire Station, Samshera Box Cricket, Nikol, Ahmedabad, Gujarat 380049. The shop is known for serving 100% real fruit shots with zero artificial flavours, at affordable prices.

---

## 📄 License

This project is provided as-is for use by Jee's Natural. All rights reserved © 2025 Jee's Natural.

---

## 🙌 Credits

Designed & Developed by **Sagar Makwana**
