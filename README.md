# Cresco Prime 📈

> **Institutional-grade capital and proprietary technology for serious traders.**

Cresco Prime is an elite, state-of-the-art proprietary trading platform designed to give serious traders access to institutional capital, professional terminals, and the education required to become consistently profitable.

![Cresco Prime Banner](./public/bull_premium_render.png)

---

## 🚀 Core Features

* **Immersive 3D WebGL Experience:** A fully interactive, dynamic 3D charging bull model built with React Three Fiber (`@react-three/fiber`) and Three.js.
* **Premium Animations:** High-performance, scroll-triggered animations powered by **GSAP** and smooth scrolling via **Lenis**.
* **ReactBits StarBorder CTA Buttons:** Smooth glowing star-border animations on the primary call-to-actions, including `Start Trading` and navbar/drawer logins.
* **ReactBits ElectricBorder Cards:** Glowing electric borders outlining the Team Director profiles on the About page on hover.
* **Modern Tech Stack:** React 18, Vite, and TypeScript for rapid compilation and strict type safety.

---

## 🔒 Confidential Department Portal Architecture

Cresco Prime utilizes a secure, department-segmented login portal for staff members to access confidential trading desks.

### 🛡️ Privacy & Access Routing
1. **Direct Routing**: Immediately upon login, users are routed to their designated department dashboard (e.g. `/dashboard/crypto`) rather than a shared portal hub.
2. **Confidentiality Guard**: All access to the general `/dashboard` is automatically hijacked and redirected to the user's specific desk based on their active session. 
3. **Desk Isolation**: Standard website navigation elements (Navbar/Footer) are completely hidden inside the `/dashboard/*` terminal workspace to ensure clean and focused operations.

### 🔑 Staff Credentials & Desk Desks
Trading desks are configured via Firebase Authentication. Depending on the desk card clicked, the appropriate password maps to its assigned account:

| Trading Desk | Email Address | Password |
| :--- | :--- | :--- |
| **Accounts** | `accounts@crescoprime.com` | `Matrix@2027` |
| **Crypto** | `hr@crescoprime.com` | `Matrix@2030` |
| **HR Department** | `hr@crescoprime.com` | `Matrix@2026` |
| **Operations** | `hr@crescoprime.com` | `Matrix@2028` |
| **Commodities** | `hr@crescoprime.com` | `Matrix@2029` |

---

## 🛠 Tech Stack

* **Frontend:** React 18 (Vite, SPA)
* **Language:** TypeScript
* **Database & Auth:** Firebase Authentication (v10)
* **Styling:** Tailwind CSS (Curated Dark Mode system) & CSS Modules
* **3D Engine:** Three.js, React Three Fiber, React Three Drei
* **Animations:** GSAP (ScrollTrigger), Framer Motion concepts
* **Scroll Engine:** Lenis Smooth Scroll
* **Routing:** React Router DOM

---

## 📦 Setup & Environment Configuration

### 1. Environment Variables
To keep credentials secure, Firebase configuration values are retrieved dynamically via Vite's `import.meta.env` system.

Copy the `.env.example` file to `.env` in the root directory:
```bash
cp .env.example .env
```
Fill in your Firebase client config parameters:
```env
VITE_FIREBASE_API_KEY=AIzaSyDd6Xjz-TSv...
VITE_FIREBASE_AUTH_DOMAIN=crescoprime-portal.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=crescoprime-portal
VITE_FIREBASE_STORAGE_BUCKET=crescoprime-portal.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=533803169754
VITE_FIREBASE_APP_ID=1:533803169754:web:260beef043fa0f...
```

### 2. Local Development
Install dependencies and run the Vite dev server:
```bash
# Install packages
npm install

# Start local server
npm run dev

# Build for production
npm run build
```

---

## ☁️ Netlify Deployment Guide

The Cresco Prime repository is configured for automated builds and deployment on **Netlify**.

### ⚙️ Netlify Build Configurations
Set the following settings in your Netlify site settings:
* **Build Command:** `npm run build`
* **Publish Directory:** `dist`

### 🔑 Environment Variables Config
Under **Site settings > Environment variables** in your Netlify panel, add the keys from your `.env` file:
* `VITE_FIREBASE_API_KEY`
* `VITE_FIREBASE_AUTH_DOMAIN`
* `VITE_FIREBASE_PROJECT_ID`
* `VITE_FIREBASE_STORAGE_BUCKET`
* `VITE_FIREBASE_MESSAGING_SENDER_ID`
* `VITE_FIREBASE_APP_ID`

### 🔀 Single Page App (SPA) Routing Redirection
Netlify requires a `_redirects` file to handle routing history fallback for client-side routing.
This has already been pre-configured in the `public/_redirects` directory:
```text
/* /index.html 200
```
This configuration ensures that reloading dashboard paths (e.g. crescoprime.com/dashboard/hr) directly in browser address bars routes correctly instead of throwing `404 Not Found` pages.

---

## 🔒 License & Copyright

© 2026 Cresco Prime. All rights reserved. 
Proprietary trading software and interfaces are not open-source unless explicitly stated.
