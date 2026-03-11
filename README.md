# ✦ Jewelry Vault

> A private, PIN-locked jewelry tracker for Gold & Silver collections — installable as a mobile app (PWA)

**Live App → [https://ashi100sh.github.io/jewelry-vault](https://ashi100sh.github.io/jewelry-vault)**

![PIN Screen](https://img.shields.io/badge/PIN-Secured-gold?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-Installable-blue?style=flat-square)
![Offline](https://img.shields.io/badge/Works-Offline-green?style=flat-square)
![No Server](https://img.shields.io/badge/No%20Server-100%25%20Local-orange?style=flat-square)

---

## 📱 What It Does

Track your entire jewelry collection — gold, silver, and other metals — with photos, weights, purchase prices, bill references, and storage locations. Everything stays **on your device**. No account needed.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔐 PIN Lock | 4-digit PIN protects all data on open |
| 🥇 Gold / 🥈 Silver / 💠 Other | Separate metal tracking with karat/purity options |
| 📍 Location Tracking | Bank Locker, Home Safe, etc. — filter by location |
| 🖼️ Photo Gallery | Full-screen gallery with swipe lightbox |
| 📄 Bills View | Scrollable list of all bill references |
| 🔍 3-Axis Filter | Filter by Metal + Jewelry Type + Location |
| 💾 Backup / Restore | JSON export with all photos embedded (base64) |
| ☁️ Google Drive | Auto-backup after every save |
| 📲 Install as App | Works on Android (Chrome) and iPhone (Safari) |
| 🌙 3 Themes | Dark Gold · Pearl White · Rose Gold |
| ✈️ Offline | Full offline support via Service Worker |

---

## 📲 Install on Phone

**Android**
1. Open Chrome → go to the app URL
2. Tap **"Add to Home Screen"** banner → Install
3. App icon appears on your home screen

**iPhone**
1. Open Safari → go to the app URL
2. Tap **Share icon** (□↑) → **"Add to Home Screen"** → Add

---

## 🎨 Themes

Switch between 3 themes using the dots on the PIN screen or inside the app:

- 🖤 **Dark Gold** — deep black with warm gold accents (default)
- 🤍 **Pearl White** — warm ivory / cream, elegant for daytime
- 🌹 **Rose Gold** — deep burgundy with rose-gold accents

---

## 💾 Backup & Restore

### Manual Backup (💾 button)
Exports a `.json` file that includes **all photos embedded** as base64. Import this file on any device to fully restore your collection.

### Google Drive (☁ button → Settings)
1. Create a project in [Google Cloud Console](https://console.cloud.google.com)
2. Enable Google Drive API
3. Create OAuth Client ID (Web application)
4. Add authorised origin: `https://ashi100sh.github.io`
5. Paste Client ID in app Settings → Connect
6. Auto-backup fires 3 seconds after every save

---

## 🗂️ Fields Tracked

| Field | Notes |
|---|---|
| Photo | WebP Q92 compression · Full quality · No size limit |
| Metal | Gold / Silver / Other |
| Jewelry Type | Necklace, Ring, Bangles, Earrings, Chain, Anklet, Bracelet, Pendant, Brooch |
| Karat / Purity | 22K/24K/18K/14K (Gold) · Sterling 925/999/800 (Silver) |
| Weight | Grams |
| Purchase Price | ₹ with Indian number formatting |
| Purchase Date | |
| Location | Bank Locker, Home Safe, etc. — used for filter |
| Bill Reference | Shop name, bill number, etc. |
| Notes | Occasion, gift from, etc. |

---

## 🔒 Privacy

- **No server, no database, no account** — all data in browser `localStorage`
- Photos stored locally as base64 inside the JSON backup
- Google Drive integration uses `drive.file` scope only — app cannot see other Drive files
- PIN lock prevents anyone from opening the app without the code

---

## 📁 Files

```
jewelry-vault/
├── index.html            ← Complete PWA app (single file)
├── manifest.json         ← PWA config (name, icons, theme color)
├── sw.js                 ← Service worker (offline caching)
├── icon-192.png          ← Android home screen icon
├── icon-512.png          ← Splash screen icon
├── apple-touch-icon.png  ← iPhone home screen icon
└── README.md             ← This file
```

---

## 🚀 Self-Hosting

1. Fork this repo or create a new one named `jewelry-vault`
2. Upload all files to the repo root
3. Go to **Settings → Pages → Branch: main / (root) → Save**
4. App is live at `https://YOUR_USERNAME.github.io/jewelry-vault`

For Google Drive backup, update the authorised JS origin in Google Cloud Console to match your URL.

---

## 🛠️ Tech Stack

- **Vanilla HTML + CSS + JavaScript** — zero dependencies, zero build step
- **Canvas API** — WebP Q92 image compression (no libraries)
- **Service Worker** — offline-first caching
- **localStorage** — all data storage
- **Google Identity Services** — OAuth for Drive backup
- **JSZip** — loaded on-demand only for photo ZIP export

---

*Built with ❤️ for keeping track of what matters most*
