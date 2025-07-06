// Service Worker for Image Caching and Performance
const CACHE_NAME = 'havre-bakery-images-v1';
const IMAGE_CACHE_NAME = 'havre-bakery-images';

// URLs to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/manifest.json',
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CRITICAL_RESOURCES))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle image requests with cache-first strategy
  if (request.destination === 'image' || 
      url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ||
      url.hostname === 'picsum.photos') {
    
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // Return cached image immediately
            return cachedResponse;
          }

          // Fetch from network and cache
          return fetch(request).then((networkResponse) => {
            // Only cache successful responses
            if (networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Return a fallback image if network fails
            return new Response(
              `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f8f9fa"/>
                <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6c757d" font-family="Arial, sans-serif" font-size="16">
                  Image unavailable
                </text>
              </svg>`,
              {
                headers: {
                  'Content-Type': 'image/svg+xml',
                  'Cache-Control': 'no-cache'
                }
              }
            );
          });
        });
      })
    );
    return;
  }

  // Handle other requests with network-first strategy
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// Background sync for failed image loads
self.addEventListener('sync', (event) => {
  if (event.tag === 'retry-failed-images') {
    event.waitUntil(retryFailedImages());
  }
});

async function retryFailedImages() {
  // Implementation for retrying failed image loads
  console.log('Retrying failed image loads...');
}

// Message handling for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_IMAGE_CACHE') {
    event.waitUntil(
      caches.delete(IMAGE_CACHE_NAME).then(() => {
        event.ports[0].postMessage({ success: true });
      })
    );
  }
  
  if (event.data && event.data.type === 'PRELOAD_IMAGES') {
    const { images } = event.data;
    event.waitUntil(preloadImages(images));
  }
});

async function preloadImages(imageUrls) {
  const cache = await caches.open(IMAGE_CACHE_NAME);
  
  const preloadPromises = imageUrls.map(async (url) => {
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        await cache.put(url, response);
      }
    } catch (error) {
      console.warn(`Failed to preload image: ${url}`, error);
    }
  });
  
  await Promise.allSettled(preloadPromises);
}
