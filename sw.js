// sw.js

const cacheName = 'my-cache-v1';
const cacheAssets = [
    '/',
    '/index.html',
    '/tripleS/styles.css',
    '/tripleS/script.js',
    '/tripleS/generation.png',
    '/tripleS/rising.jpg',
    '/tripleS/cherry-talk.jpg',
    '/tripleS/touch.jpg',
    '/tripleS/girls-capitalism.jpg',
    '/tripleS/invincible.jpg',
    '/tripleS/just-do-it.jpg'
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
