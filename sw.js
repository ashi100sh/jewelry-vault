const VER    = 'gjv-v7.0';
const ASSETS = ['./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];

// Install — cache all assets, but DO NOT skipWaiting
// Page controls when to activate (smart 2-open strategy)
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VER).then(c => c.addAll(ASSETS))
  );
});

// Activate — delete old caches, claim all clients
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== VER).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
      .then(() => {
        // Tell all open clients new version activated
        self.clients.matchAll().then(clients => {
          clients.forEach(c => c.postMessage({ type: 'NEW_VERSION', version: VER }));
        });
      })
  );
});

// Listen for SKIP_WAITING message from page
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch — network-first for HTML, cache-first for assets
self.addEventListener('fetch', e => {
  const url = e.request.url;

  if (url.includes('googleapis.com') || url.includes('accounts.google.com') ||
      url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com') ||
      url.includes('cdnjs.cloudflare.com')) {
    e.respondWith(fetch(e.request).catch(() => new Response('', {status: 503})));
    return;
  }

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
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

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
