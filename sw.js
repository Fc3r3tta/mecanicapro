const CACHE_NAME = 'mecanicapro-v1';
const ASSETS = [
  'frota.html',
  'manifest.json'
];

// Instalação do Service Worker e Cache dos arquivos do App
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Faz o App carregar mesmo sem internet se os arquivos já estiverem no Cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request);
    })
  );
});