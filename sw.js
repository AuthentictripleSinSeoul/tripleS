const cacheName = 'Cheering-Guide-Cache-v1';
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

self.addEventListener('activate', event => {
    event.waitUntil(
        // 현재 캐시 버전 이외의 다른 버전의 캐시를 모두 삭제
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
    // 강제로 서비스 워커를 활성화
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
