const CACHE_NAME = 'aroice-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/theme.js',
  '/micro-interactions.js',
  '/images/logo.webp',
  '/images/og-banner.png',
  '/shop/index.html',
  '/projects/index.html',
  '/404.html'
];

// Import external scripts
importScripts("https://cdn.brevo.com/js/sdk-loader.js");
Brevo.push([
    "init",
    {
        client_key: (location.search.match(/[?&]key=([^&]*)/) || [])[1],
    },
]);

// Install service worker and cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Clean up old caches during activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Serve from cache, falling back to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          
          // Clone the request to ensure it's consumable
          const fetchRequest = event.request.clone();
          
          return fetch(fetchRequest)
            .then(response => {
              // Check if response is valid
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clone the response to cache and return
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then(cache => {
                  // For navigations and HTML, only cache if fresh
                  if (event.request.mode === 'navigate' || 
                      (event.request.method === 'GET' && 
                       event.request.headers.get('accept').includes('text/html'))) {
                    cache.put(event.request, responseToCache);
                  }
                });
                
              return response;
            });
        })
    );
  }
});
