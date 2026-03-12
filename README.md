# 💎 Jewelry Vault

A private, PIN-secured web app for tracking your personal jewelry collection.  
**Live:** https://ashi100sh.github.io/jewelry-vault

Install it on your phone like a native app — works fully offline.

---

## Features

### Security
- **PIN lock** — 4-digit PIN, default `1234`, changeable in Settings
- All data stays on **your device only** — nothing sent to any server
- Google Drive backup is **opt-in** and connects only to your own account

### Jewelry Tracking
- **Metal types** — Gold (22K / 24K / 18K / 14K), Silver (Sterling 925 / 999 / 800), Other
- **Jewelry types** — Necklace, Bangles, Ring, Earrings, Chain, Anklet, Bracelet, Pendant, Brooch
- **Fields** — Name, Metal, Karat/Purity, Type, Weight (g), Purchase Date, Price (₹), Location, Bill Reference, Notes
- **3-axis filter** — filter by Metal × Type × Location independently and in combination
- **Stats bar** — total pieces, total weight, total value, number of locations

### Photos
- Add a photo to each jewelry item
- Automatically converted to **WebP Q92** for best quality-to-size ratio
- Photos larger than **4000px** are scaled down proportionally (aspect ratio preserved)
- Photos under 4000px are stored at original resolution — never upscaled
- Stored in **IndexedDB** — no size limit (not localStorage)
- **Gallery view** with lightbox — swipe left/right or use keyboard arrow keys
- Download any individual photo

### Google Drive Sync
- One-tap connect with your Google account
- Syncs automatically on **every add / edit / delete** — no manual trigger needed
- **Atomic write** — uses a temp file + verify + promote pattern, so backup is never corrupted
- Keeps **two versions** on Drive: current backup + previous backup
- Only uses `drive.file` scope — cannot see any other files in your Drive

### Backup & Restore
- **Export Both** — downloads plain JSON + encrypted `.ejv` file together in one tap
- **JSON export** — plain readable backup with all photos embedded
- **Encrypted export** — AES-256-GCM encryption, `.ejv` format
- **Photos ZIP** — download all photos as a ZIP file
- **Universal import** — auto-detects `.json` or `.ejv`, just select the file

### Themes
- **Dark Gold** — default dark theme with gold accents
- **Pearl White** — light elegant theme
- **Rose Gold** — dark theme with rose gold accents

### PWA
- Installable on Android and iPhone from the browser
- Works fully offline after first load
- Home screen icon, splash screen, no browser UI

---

## How to Use

### First time
1. Open https://ashi100sh.github.io/jewelry-vault
2. Enter PIN `1234`
3. Tap **+ Add Jewelry** to add your first item
4. Optionally tap the **☁** icon → Settings → connect Google Drive for cloud backup

### Add a jewelry item
1. Tap **+ Add Jewelry**
2. Select Metal (Gold / Silver / Other) — karat options update automatically
3. Fill in the details — name is the only required field
4. Add a photo by tapping the photo area
5. Tap **Save Item**

### Change PIN
Settings (⚙) → Security → enter new 4-digit PIN → Save

### Connect Google Drive
Settings (⚙) → Google Drive → paste your OAuth Client ID → Connect Google Drive → sign in with Google

### Backup your data
Settings (⚙) → Backup & Restore → enter a backup password → tap **Both Files**  
Save both the `.json` and `.ejv` files somewhere safe.

### Restore from backup
Settings (⚙) → Backup & Restore → enter password (for `.ejv`) → Import Any File → select the file

---

## Storage Details

```
localStorage  → item metadata (name, weight, price, etc.) — instant reads
IndexedDB     → photos as raw Blobs — no size limit
Google Drive  → full backup including photos — atomic write, corruption-proof
```

Every change (add / edit / delete) writes to localStorage and IndexedDB instantly,
then syncs to Google Drive in the background if connected.

If the app crashes and localStorage is lost, it automatically recovers from an
IndexedDB checkpoint on next open.

---

## Encryption Details

| Property | Value |
|----------|-------|
| Algorithm | AES-256-GCM |
| Key derivation | PBKDF2 |
| Hash | SHA-256 |
| Iterations | 310,000 |
| File format | `.ejv` |
| Magic header | `EJV1` |
| Password stored? | Never |

**Important:** The backup password is never stored anywhere. If you forget it, the `.ejv` file cannot be decrypted. Always keep the plain `.json` backup as well.

---

## Google Drive Setup

> If your Client ID is already hardcoded into the app, skip steps 1–5.

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project → name it **Jewelry Vault**
3. **APIs & Services → Library** → search **Google Drive API** → Enable
4. **Google Auth Platform → Branding** → fill app name and domain
5. **Clients → Create Client**
   - Type: **Web application**
   - Authorised JavaScript origins: `https://ashi100sh.github.io`
   - Copy the **Client ID**
6. In the app: Settings → Google Drive → paste Client ID → Connect

### Drive files created

```
jewelry_vault_backup.json        ← current verified backup
jewelry_vault_backup_prev.json   ← previous backup (one version behind)
```

### Drive scope

Only `drive.file` — the app can only read and write files it created itself.
It cannot access any other files in your Google Drive.

---

## Deployment

| Property | Value |
|----------|-------|
| Repo | github.com/ashi100sh/jewelry-vault |
| Hosting | GitHub Pages |
| Live URL | https://ashi100sh.github.io/jewelry-vault |
| Update | Replace `index.html` on GitHub |
| Clear cache | Append `?v=2` to the URL after updating |

### Files in repo

```
index.html            ← the entire app (replace this to update)
manifest.json         ← PWA configuration
sw.js                 ← service worker for offline support
icon-192.png          ← app icon
icon-512.png          ← app icon (large)
apple-touch-icon.png  ← iOS home screen icon
```

---

## Default PIN

`1234` — change it immediately in Settings after first login.

---

## Tech Stack

- Vanilla JavaScript — no frameworks, no dependencies
- IndexedDB for photo storage
- localStorage for metadata
- Web Crypto API for AES-256-GCM encryption
- Google Identity Services for OAuth
- Google Drive API v3 for cloud backup
- Canvas API for WebP photo conversion
- Service Worker for offline / PWA
- CSS custom properties for theming
- JSZip (loaded from CDN on demand) for photo ZIP export
