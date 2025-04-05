
const CACHE_NAME = 'quiz-app-v1';
const urlsToCache = [
  'https://eldrenpar.com/quiz-app/',
  'https://eldrenpar.com/quiz-app/index.html',
  'https://eldrenpar.com/quiz-app/images/icon-192x192.png',
  'https://eldrenpar.com/quiz-app/images/icon-512x512.png'
];

// Install the service worker and cache the essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached files when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if available, or fetch from network
        return cachedResponse || fetch(event.request);
      })
  );
});

// Update the service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
