// sw.js

const cacheName = 'Cheering-Guide-Cache-v2'; // Update cacheName to trigger an update
const cacheAssets = [
    '/tripleS/index.html',
    '/tripleS/styles.css',
    '/tripleS/script.js',
    '/tripleS/generation.png',
    '/tripleS/rising.png',
    '/tripleS/cherry-talk.png',
    '/tripleS/touch.png',
    '/tripleS/girls-capitalism.png',
    '/tripleS/invincible.png',
    '/tripleS/just-do-it.png',
    '/tripleS/1.mp4'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(cacheAssets);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Cache update logic
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
