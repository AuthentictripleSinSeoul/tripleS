// sw.js

const cacheName = 'my-cache-v1';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll([
                'generation.png',
                'rising.png',
                'cherry-talk.png',
                'touch-plus.png',
                'girls-capitalism.png',
                'invincible.png',
                'just-do-it.png',
            ]);
        })
    );
});


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
