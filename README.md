# Scoop Innovations — Technology for a Smarter Tomorrow

A premium, multi-page enterprise technology website for **Scoop Innovations**, built with plain HTML/CSS/JS (no frameworks). Dark navy / electric blue / cyan visual system with a floating white nav pill, glassmorphism cards, and a CSS/SVG hero globe.

## 📄 Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero with animated globe visual, solution icon strip, CTA banner |
| Solutions | `solutions.html` | Grid of 10 solution cards (ERP, CRM, HRMS, Sales, Dashboards, AI Assistant, Mobile Apps, Website Development, Custom Software, Cloud Solutions) |
| Industries | `industries.html` | Grid of 10 industry cards with gradient/icon art |
| Features | `features.html` | Split layout: feature list + live-style dashboard mockup |
| About | `about.html` | Company story, office panel illustration, core values, quote banner |
| Contact | `contact.html` | Contact info, socials, and a message form (opens the visitor's email client via `mailto:`) |

Every page shares the same `styles.css` design system and `site.js` behaviour (mobile drawer, scroll reveal, contact form), with a consistent floating navbar, footer, and mobile bottom nav (Home / current section / Contact).

## 💻 How to Run Locally

Open `index.html` directly in a browser, or serve it:

```powershell
cd "C:\Users\saravanan_ricago\.gemini\antigravity\scratch\enterprise-3d-solutions"
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## 🚀 Deployment

Hosted via GitHub Pages from the `main` branch at **https://me-saranv.github.io/scoop/**.
