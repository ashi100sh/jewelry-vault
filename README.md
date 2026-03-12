<div align="center">

# 💎 Jewelry Vault — Manoratha

**A private, PIN-secured PWA for tracking your personal jewelry collection**

[![Live App](https://img.shields.io/badge/Live%20App-Open%20Now-C8960C?style=for-the-badge&logo=github)](https://ashi100sh.github.io/jewelry-vault)
[![PWA](https://img.shields.io/badge/PWA-Installable-5A9A4A?style=for-the-badge&logo=pwa)](https://ashi100sh.github.io/jewelry-vault)
[![Version](https://img.shields.io/badge/Version-6.2-8A6020?style=for-the-badge)](#)
[![Offline](https://img.shields.io/badge/Works-Offline-4A7A9B?style=for-the-badge)](#)

> Install on your phone like a native app · Works fully offline · Zero server · Zero subscription · Zero ads

</div>

---

## ✨ Features at a Glance

| Category | Features |
|----------|----------|
| 🔐 **Security** | 4-digit PIN lock · AES-256-GCM encrypted backup · all data stays on your device |
| 💍 **Jewelry** | Gold / Silver / Other · 9 types · weight, price, date, location, notes |
| 📸 **Photos** | WebP Q92 · max 4000px · stored in IndexedDB · gallery with lightbox · swipe & keyboard |
| 📎 **Bill Attachment** | Attach PDF or image bill per item · view / download anytime |
| ☁️ **Drive Sync** | One-tap Google connect · auto-syncs on every change · atomic write (never corrupts) |
| 💾 **Backup** | JSON + encrypted `.ejv` · Photos ZIP · universal import · photos & bills embedded |
| 🔍 **Filters** | 5-axis: Metal · Type · Location · Photo · Bill |
| 📋 **All Items View** | Tabs by bill / photo / location · sort by date, name, value, metal · Google Maps link |
| 🎨 **Themes** | Dark Gold · Pearl White · Rose Gold |
| 📱 **PWA** | Installable on Android & iPhone · offline · auto-updates silently |

---

## 🚀 Getting Started

### Open the app
```
https://ashi100sh.github.io/jewelry-vault
```

### First login
Default PIN is **`1234`** — change it immediately in ⚙️ Settings → Security.

### Install on phone
- **Android** — tap the browser menu → *Add to Home Screen*
- **iPhone** — tap Share → *Add to Home Screen*

Once installed it opens full-screen like a native app and works offline.

### Add your first item
1. Tap **＋ Add Jewelry**
2. Select **Metal** → Gold / Silver / Other
3. Choose type and karat — options update automatically
4. Fill name, weight, price, location (e.g. *Bank Locker*, *Mumbai*)
5. Add a **photo** — tap the photo area
6. Attach a **bill** (PDF or image) — tap Bill Attachment
7. Tap **Save Item** ✓

---

## 🔍 Filter System — 5 Axes

Filter your vault from the main screen using any combination:

| Filter | Options |
|--------|---------|
| **Metal** | All · 🥇 Gold · 🥈 Silver · 💠 Other |
| **Type** | Necklace · Bangles · Ring · Earrings · Chain · Anklet · Bracelet · Pendant · Brooch |
| **Location** | All · any location you have entered (Mumbai, Bank Locker, Home Safe…) |
| **📸 Photo** | All · Has Photo · No Photo |
| **📎 Bill** | All · Has Bill · No Bill |

Filter count shows `Showing X of Y` whenever any filter is active. **Clear** button resets all 5 axes at once.

---

## 📸 Gallery

Tap **Gallery** from the main screen to see all your jewelry visually.

- Every item appears — items without photos show their jewelry emoji
- Metal filter chips to narrow by Gold / Silver / Other
- Tap any item to open the **lightbox**
  - Swipe left / right to navigate
  - Arrow keys on desktop
  - Download photo button
- 📸 badge = has photo · 📎 badge = has bill attached

---

## 📋 All Items View

Tap **Records** from the main screen for a full scrollable list of all jewelry.

### Tabs
| Tab | Shows |
|-----|-------|
| **All** | Every item |
| **📎 Bill** | Items with a bill reference or attached file |
| **📸 Photo** | Items with a photo |
| **📍 Location** | Items with a location set |

### Sort
Sort by Date · Name · Value (₹) · Metal

### Per-item actions
- Tap the card → opens Edit view
- **📎 View** — opens attached bill PDF or image in new tab
- **🗺️ Map** — opens Google Maps search for the item's location

---

## 🔐 Security

### PIN Lock
- Default PIN: `1234`
- Change anytime in ⚙️ Settings → Security
- PIN stored locally only — never in any backup

### Encrypted Backup (`.ejv` format)

| Property | Value |
|----------|-------|
| Algorithm | AES-256-GCM |
| Key derivation | PBKDF2 · SHA-256 |
| Iterations | 310,000 |
| Salt | 16 bytes random |
| IV | 12 bytes random |
| File extension | `.ejv` |

> ⚠️ The backup password is never stored anywhere. If forgotten, the `.ejv` file cannot be recovered. Always keep a plain `.json` backup too.

---

## 📸 Photo Handling

```
Camera photo (e.g. 6000 × 4500 px)
        ↓
Scale down proportionally if wider than 4000 px
        ↓
Convert to WebP at quality 0.92
        ↓
Store as raw Blob in IndexedDB  ← no 5MB localStorage limit
        ↓
Display via URL.createObjectURL()  ← instant, memory-efficient
```

- Photos **under 4000px** → stored at original resolution, never upscaled
- All photos included as base64 in JSON, encrypted `.ejv`, and Drive backups

---

## 📎 Bill Attachment

Attach a PDF or image bill to any jewelry item.

- **Formats**: PDF · JPG · PNG · WebP · GIF
- **Max size**: 10 MB per file
- Stored in IndexedDB alongside photos — no size limit issues
- **View** opens the file in a new browser tab
- **Save** downloads the file with a sensible filename
- Bills are included in all backups (JSON, encrypted, Drive) and restored on import

---

## ☁️ Google Drive Sync

### One-tap connect
```
⚙️ Settings → Google Drive → Connect Google Drive → sign in
```
No Client ID needed — it is built into the app.
Syncs automatically on every add, edit, and delete.

### Atomic write — backup is never corrupted
```
Step 1 → Write to TEMP file
Step 2 → Read back TEMP and verify item count matches
Step 3 → Promote current → prev   (keeps previous version)
Step 4 → Promote TEMP → current
Step 5 → Delete TEMP

Failure at any step → original backup untouched
```

### Files created in your Drive
```
jewelry_vault_backup.json        ← current verified backup
jewelry_vault_backup_prev.json   ← one version behind
```

### Scope
`drive.file` only — the app can read and write **only the files it created**. It cannot see any other files in your Google Drive.

---

## 💾 Backup & Restore

### Export options

| Button | What it creates |
|--------|----------------|
| **Both Files** | Plain `.json` + encrypted `.ejv` in one tap |
| **JSON Only** | Plain readable backup — photos and bills embedded as base64 |
| **Encrypted** | AES-256-GCM `.ejv` — needs password to restore |
| **Photos ZIP** | All photos as `.webp` files in a ZIP archive |

### What's inside a backup
Every item's metadata, photos (base64), and bill attachments (base64) are all included. Restoring on a new device gives you everything back exactly as it was — including all locations you entered.

### Restore
```
⚙️ Settings → Backup & Restore → Import Any File
```
Auto-detects `.json` or `.ejv` — enter password first for encrypted files.

---

## 🗄️ Storage Architecture

```
┌────────────────────────────────────────────────────────┐
│  Layer 1 — localStorage  (instant, metadata only)      │
│  gjv_meta_v6   → item metadata array (no photos)       │
│  gjv_cfg_v6    → config, PIN, theme                    │
│  gjv_dirty     → Drive sync needed flag                │
├────────────────────────────────────────────────────────┤
│  Layer 2 — IndexedDB  (~1 GB+, no size limit)          │
│  Store: photos      → raw Blob per item                │
│  Store: bills       → { blob, name, mimeType, size }   │
│  Store: checkpoint  → crash recovery snapshot          │
├────────────────────────────────────────────────────────┤
│  Layer 3 — Google Drive  (atomic, corruption-proof)    │
│  jewelry_vault_backup.json       ← current             │
│  jewelry_vault_backup_prev.json  ← previous            │
└────────────────────────────────────────────────────────┘
```

### Write pipeline (every add / edit / delete)
```
1. Write metadata  → localStorage      instantly
2. Write photo     → IndexedDB         instantly
3. Write bill      → IndexedDB         instantly
4. Write snapshot  → IDB checkpoint    crash recovery
5. Sync            → Google Drive      background, atomic
```

### Crash recovery
If localStorage is wiped (browser clear, OS crash), the app auto-restores all metadata from the IndexedDB checkpoint on next open — silently, before showing the vault.

---

## 🎨 Themes

| Theme | Style |
|-------|-------|
| 🌑 **Dark Gold** | Dark background · gold accents · default |
| 🤍 **Pearl White** | Light elegant · warm cream tones |
| 🌹 **Rose Gold** | Dark background · rose gold accents |

Switch from the PIN screen or the main app — saved automatically.

---

## 📦 Files in Repo

```
index.html            ← entire app (update this to ship new features)
sw.js                 ← service worker (bump VER string to push update notification)
manifest.json         ← PWA config
icon-192.png          ← app icon
icon-512.png          ← app icon large
apple-touch-icon.png  ← iOS home screen icon
README.md             ← this file
```

### Releasing an update
```
1. Edit index.html  — bump APP_VERSION = '6.x'
2. Edit sw.js       — bump VER = 'gjv-v6.x'
3. Upload both files to GitHub
4. Users see  ⚡ "New version available — Update Now"  toast within 60 seconds
5. Tap Update Now → instant reload, no app store needed
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla JS · no frameworks · no build step |
| Storage | IndexedDB (photos + bills) · localStorage (metadata) |
| Encryption | Web Crypto API · AES-256-GCM · PBKDF2 |
| Drive | Google Identity Services · Drive API v3 · `drive.file` scope |
| Photos | Canvas API → WebP conversion |
| Offline | Service Worker · network-first for HTML |
| PWA | Web App Manifest · install prompt |
| ZIP export | JSZip (CDN, loaded on demand) |
| Hosting | GitHub Pages · free · always HTTPS |

---

## 🚀 Deployment

```
Repo:   github.com/ashi100sh/jewelry-vault
Pages:  Settings → Pages → Branch: main / (root)
Live:   https://ashi100sh.github.io/jewelry-vault
```

Hard-reload after update:
```
https://ashi100sh.github.io/jewelry-vault?v=1
```

---

<div align="center">

Made with ❤️ for personal jewelry tracking · No ads · No tracking · No server · No subscription

</div>
