<div align="center">

# 💎 Jewelry Vault

**A private, PIN-secured PWA for tracking your personal jewelry collection**

[![Live App](https://img.shields.io/badge/Live%20App-Open%20Now-C8960C?style=for-the-badge&logo=github)](https://ashi100sh.github.io/jewelry-vault)
[![PWA](https://img.shields.io/badge/PWA-Installable-5A9A4A?style=for-the-badge&logo=pwa)](https://ashi100sh.github.io/jewelry-vault)
[![Version](https://img.shields.io/badge/Version-6.1-8A6020?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/License-Personal-888?style=for-the-badge)](#)

> Install on your phone like a native app — works fully offline — zero server, zero subscription

</div>

---

## ✨ Features at a Glance

| Category | Features |
|----------|----------|
| 🔐 **Security** | 4-digit PIN lock · AES-256-GCM encrypted backup · data stays on your device |
| 💍 **Jewelry** | Gold / Silver / Other · 9 jewelry types · weight, price, date, location, bill |
| 📸 **Photos** | WebP Q92 · max 4000px · stored in IndexedDB (no size limit) · gallery + lightbox |
| ☁️ **Drive Sync** | One-tap Google connect · syncs on every change · atomic write (never corrupts) |
| 💾 **Backup** | JSON + encrypted `.ejv` · Photos ZIP · universal import · auto-detects format |
| 🎨 **Themes** | Dark Gold · Pearl White · Rose Gold |
| 📱 **PWA** | Installable on Android & iPhone · offline support · auto-updates |

---

## 📱 Screenshots

> *Dark Gold — Pearl White — Rose Gold themes*

| PIN Screen | Main Vault | Add Item | Gallery |
|:---:|:---:|:---:|:---:|
| 🔐 | 💎 | ✏️ | 📸 |
| Secure entry | Your collection | Full details | Photo lightbox |

---

## 🚀 Getting Started

### Open the app
```
https://ashi100sh.github.io/jewelry-vault
```

### First login
Default PIN is **`1234`** — change it in ⚙️ Settings → Security immediately.

### Add your first item
1. Tap **＋ Add Jewelry**
2. Select **Metal** → Gold / Silver / Other
3. Choose **type** and **karat** — options update automatically per metal
4. Fill name, weight, price, location, bill reference
5. Add a **photo** — tap the photo area
6. Tap **Save Item** ✓

### Connect Google Drive *(optional)*
```
⚙️ Settings → Google Drive → Connect Google Drive → sign in with Google
```
Syncs automatically on every add, edit, and delete. No manual trigger needed.

---

## 🔐 Security

### PIN Lock
- Default PIN: `1234`
- Change anytime in Settings → Security
- PIN stored locally only — never in any backup file

### Encrypted Backup

| Property | Value |
|----------|-------|
| Algorithm | AES-256-GCM |
| Key derivation | PBKDF2 |
| Hash function | SHA-256 |
| Iterations | 310,000 |
| File format | `.ejv` |
| Password stored | Never |

> ⚠️ **Important:** The backup password is never stored. If forgotten, the `.ejv` file cannot be recovered. Always keep the plain `.json` backup as well.

---

## 📸 Photo Handling

```
Phone camera (e.g. 6000×4500px)
        ↓
Scale down if > 4000px — aspect ratio preserved
        ↓
Convert to WebP Q92 (best quality-to-size ratio)
        ↓
Store as raw Blob in IndexedDB (no 5MB localStorage limit)
        ↓
Display via URL.createObjectURL() — instant, no memory waste
```

- Photos **under 4000px** → stored at original resolution, never upscaled
- Photos **over 4000px** → scaled proportionally (e.g. 6000×4500 → 4000×3000)
- All photos included in JSON / `.ejv` / Drive backups as base64
- Download any photo individually or export all as ZIP

---

## ☁️ Google Drive Sync

### How it works
```
Add / Edit / Delete item
        ↓
1. Write metadata → localStorage    (instant)
2. Write photo Blob → IndexedDB     (instant)
3. Write checkpoint → IndexedDB     (crash recovery)
4. Sync → Google Drive              (background, atomic)
```

### Atomic write — backup never corrupts
```
Step 1 → Write to TEMP file
Step 2 → Read back + verify item count
Step 3 → Promote current → prev  (keeps previous version)
Step 4 → Promote TEMP → current
Step 5 → Delete TEMP

❌ Failure at any step → original backup untouched
```

### Drive files created
```
jewelry_vault_backup.json        ← current verified backup
jewelry_vault_backup_prev.json   ← previous backup (one version behind)
```

### Scope
Only `drive.file` — the app can **only** read and write files it created itself.
It **cannot** access any other files in your Google Drive.

---

## 💾 Backup & Restore

### Export options

| Button | What it does |
|--------|-------------|
| **Both Files** | Downloads plain `.json` + encrypted `.ejv` together in one tap |
| **JSON Only** | Plain readable backup with all photos embedded |
| **Encrypted** | AES-256-GCM `.ejv` file — needs password to restore |
| **Photos ZIP** | All photos as `.webp` files in a ZIP archive |

### Restore
```
⚙️ Settings → Backup & Restore → Import Any File
```
Auto-detects `.json` or `.ejv` — enter password first for encrypted files.

---

## 🎨 Themes

| Theme | Style |
|-------|-------|
| 🌑 **Dark Gold** | Dark background · gold accents · default |
| 🤍 **Pearl White** | Light elegant · warm cream tones |
| 🌹 **Rose Gold** | Dark background · rose gold accents |

Switch themes from the PIN screen or the main app — preference saved automatically.

---

## 🗄️ Storage Architecture

```
┌─────────────────────────────────────────────────────┐
│  Layer 1 — localStorage (instant, metadata only)    │
│  gjv_meta_v6   → item metadata (no photos)          │
│  gjv_cfg_v6    → config, PIN, theme                 │
│  gjv_dirty     → Drive sync needed flag             │
├─────────────────────────────────────────────────────┤
│  Layer 2 — IndexedDB (~1GB+, no size limit)         │
│  Store: photos      → raw Blob per item             │
│  Store: checkpoint  → crash recovery snapshot       │
├─────────────────────────────────────────────────────┤
│  Layer 3 — Google Drive (atomic, corruption-proof)  │
│  jewelry_vault_backup.json       ← current          │
│  jewelry_vault_backup_prev.json  ← previous         │
└─────────────────────────────────────────────────────┘
```

**Crash recovery** — if localStorage is wiped, app auto-restores from IndexedDB checkpoint on next open.

---

## 📦 Deployment

### Files in repo

```
index.html            ← entire app  ← only this file changes on update
sw.js                 ← service worker (update version string here too)
manifest.json         ← PWA config
icon-192.png          ← app icon
icon-512.png          ← app icon large
apple-touch-icon.png  ← iOS home screen icon
README.md             ← this file
```

### Deploy an update
```
1. Edit index.html
2. Bump version in sw.js  →  const VER = 'gjv-v6.2'
3. Upload both files to GitHub
4. Users see "⚡ New version available" toast automatically
5. Tap "Update Now" → instant refresh
```

### Clear cache manually
```
https://ashi100sh.github.io/jewelry-vault?v=2
```

---

## 🛠️ Tech Stack

```
Frontend      Vanilla JS — no frameworks, no build tools
Storage       IndexedDB (photos) + localStorage (metadata)
Encryption    Web Crypto API — AES-256-GCM + PBKDF2
Drive         Google Identity Services + Drive API v3
Photos        Canvas API → WebP conversion
Offline       Service Worker — network-first for HTML
PWA           Web App Manifest + install prompt
ZIP export    JSZip (CDN, loaded on demand)
Hosting       GitHub Pages — free, always HTTPS
```

---

## 📋 Filter System

Three independent axes — combine any way you like:

```
Metal    →  All Metals  /  🥇 Gold  /  🥈 Silver  /  💠 Other
Type     →  Necklace / Bangles / Ring / Earrings / Chain / Anklet / Bracelet / Pendant / Brooch
Location →  All Locations  /  📍 Bank Locker  /  📍 Home Safe  /  📍 ...
```

---

<div align="center">

Made with ❤️ for personal jewelry tracking · No ads · No tracking · No server

</div>
