const VER    = 'gjv-v6.1';
const ASSETS = ['./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];

// Install — cache all assets, activate immediately
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VER)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())   // activate new SW without waiting
  );
});

// Activate — delete old caches, claim all clients
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== VER).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())   // take control of all open tabs
      .then(() => {
        // Tell all open clients a new version is available
        self.clients.matchAll().then(clients => {
          clients.forEach(c => c.postMessage({ type: 'NEW_VERSION', version: VER }));
        });
      })
  );
});

// Fetch — network-first for HTML (always fresh), cache-first for assets
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Pass through Google APIs and fonts — never cache
  if (url.includes('googleapis.com') || url.includes('accounts.google.com') ||
      url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com') ||
      url.includes('cdnjs.cloudflare.com')) {
    e.respondWith(fetch(e.request).catch(() => new Response('', {status: 503})));
    return;
  }

  // Network-first for HTML — ensures latest version always loads
  if (e.request.destination === 'document' || url.endsWith('index.html')) {
    e.respondWith(
      fetch(e.request)
        .then(resp => {
          if (resp && resp.status === 200) {
            const clone = resp.clone();
            caches.open(VER).then(c => c.put(e.request, clone));
          }
          return resp;
        })
        .catch(() => caches.match('./index.html'))  // offline fallback
    );
    return;
  }

  // Cache-first for all other assets (icons, manifest)
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp && resp.status === 200) {
          const clone = resp.clone();
          caches.open(VER).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
