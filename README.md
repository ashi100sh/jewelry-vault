# ✦ Jewelry Vault

> A private, PIN-locked jewelry tracker for Gold & Silver collections — installable as a mobile app (PWA)

**Live App → [https://ashi100sh.github.io/jewelry-vault](https://ashi100sh.github.io/jewelry-vault)**

![PIN Screen](https://img.shields.io/badge/PIN-Secured-gold?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-Installable-blue?style=flat-square)
![Offline](https://img.shields.io/badge/Works-Offline-green?style=flat-square)
![No Server](https://img.shields.io/badge/No%20Server-100%25%20Local-orange?style=flat-square)
![Encrypted](https://img.shields.io/badge/AES--256--GCM-Encrypted%20Backup-red?style=flat-square)

---

## 📱 What It Does

Track your entire jewelry collection — gold, silver, and other metals — with photos, weights, purchase prices, bill references, and storage locations. Everything stays **on your device**. No account, no server, no cloud required.

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
| 💾 Plain Backup | JSON export with all photos embedded (base64) |
| 🔒 Encrypted Backup | AES-256-GCM encrypted `.ejv` file — password protected |
| 📦 Export Both | Downloads plain JSON + encrypted file simultaneously |
| 📥 Smart Import | Auto-detects plain or encrypted file on restore |
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

Open **Settings → Backup & Restore** to manage your backups.

### Export Both (recommended) 📦
Tap **Export Both** to download two files at once:
- `jewelry_vault_YYYY-MM-DD.json` — plain readable backup
- `jewelry_vault_YYYY-MM-DD.ejv` — AES-256-GCM encrypted backup

Enter a password in the **Backup Password** field before exporting. Keep it safe — it cannot be recovered.

### Plain JSON Backup 💾
- No password needed
- Human-readable, can be opened in any text editor
- Includes all photos embedded as base64

### Encrypted Backup 🔒
- Enter password → tap **Encrypted Only**
- Produces a `.ejv` file — binary, unreadable without the password
- Safe to store on shared drives, email to yourself, etc.

### Import / Restore 📥
- Tap **Import Any File** — works with both `.json` and `.ejv`
- Auto-detects the file type
- For encrypted files: enter your password first, then import
- Wrong password → instant error, nothing overwritten

### Encryption Details
| Property | Value |
|---|---|
| Algorithm | AES-256-GCM |
| Key derivation | PBKDF2-SHA256 |
| Iterations | 310,000 (OWASP 2024 recommended) |
| Salt | 16 bytes random per export |
| IV | 12 bytes random per export |
| File magic | `EJV1` header |
| Library | None — browser Web Crypto API only |

---

## ☁️ Google Drive Backup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com)
2. Enable Google Drive API
3. Create OAuth Client ID (Web application)
4. Add authorised JS origin: `https://ashi100sh.github.io`
5. Paste Client ID in app Settings → Connect Google Drive
6. Auto-backup fires 3 seconds after every save
7. Backup file: `jewelry_vault_backup.json` (plain JSON, includes photos)

> Drive backup uses `drive.file` scope only — app cannot access any other Drive files.

---

## 🗂️ Fields Tracked

| Field | Notes |
|---|---|
| Photo | WebP Q92 · up to 4000px · full quality · included in backup |
| Metal | Gold / Silver / Other |
| Jewelry Type | Necklace · Ring · Bangles · Earrings · Chain · Anklet · Bracelet · Pendant · Brooch |
| Karat / Purity | 22K/24K/18K/14K (Gold) · Sterling 925/999/800 (Silver) |
| Weight | Grams |
| Purchase Price | ₹ with Indian number formatting |
| Purchase Date | |
| Location | Bank Locker, Home Safe, etc. — used in filter + stats |
| Bill Reference | Shop name, bill number, receipt ID, etc. |
| Notes | Occasion, gift from, any free text |

---

## 🔒 Privacy & Security

| Concern | Answer |
|---|---|
| Where is data stored? | Browser `localStorage` only — never sent anywhere |
| Are photos uploaded? | No — stored locally, embedded in backup file |
| What does Google Drive see? | Only the backup file the app creates (`drive.file` scope) |
| Is the PIN stored? | Yes, in `localStorage` — but only on your device |
| Is the encryption password stored? | Never — not in localStorage, not in the file |
| Can I recover an encrypted backup without the password? | No — mathematically impossible |

---

## 🔑 PIN Notes

- Default PIN: `1234` — change immediately in Settings
- PIN is stored in `localStorage` on your device only
- PIN is **not included** in backup files — reset to `1234` on new device restore, then change again in Settings

---

## 📁 Files

```
jewelry-vault/
├── index.html            ← Complete PWA app (single file, ~70KB)
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
2. Upload all 7 files to the repo root
3. Go to **Settings → Pages → Branch: main / (root) → Save**
4. App is live at `https://YOUR_USERNAME.github.io/jewelry-vault`
5. For Google Drive backup, update the authorised JS origin in Google Cloud Console

---

## 🛠️ Tech Stack

- **Vanilla HTML + CSS + JavaScript** — zero dependencies, zero build step
- **Web Crypto API** — AES-256-GCM encryption + PBKDF2 key derivation (built into browser)
- **Canvas API** — WebP Q92 image compression (no libraries)
- **Service Worker** — offline-first caching
- **localStorage** — all data storage
- **Google Identity Services** — OAuth for Drive backup
- **JSZip** — loaded on-demand only for photo ZIP export

---

*Built with ❤️ for keeping track of what matters most*
