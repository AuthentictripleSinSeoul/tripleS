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
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // 캐시에 해당 자원이 있으면 반환
            if (cachedResponse) {
                return cachedResponse;
            }

            // 캐시에 해당 자원이 없으면 네트워크에서 가져오기 시도
            return fetch(event.request).then(networkResponse => {
                // 네트워크에서 가져온 자원을 캐시에 저장 후 반환
                caches.open(cacheName).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                });

                // Response 객체를 생성해서 반환
                return new Response(networkResponse.body, {
                    status: networkResponse.status,
                    statusText: networkResponse.statusText,
                    headers: networkResponse.headers
                });
            }).catch(error => {
                // 네트워크에서 자원을 가져오지 못하면 예외 처리
                console.error('Fetch failed:', error);
            });
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
        caches.match(event.request).then(cachedResponse => {
            // 캐시에 해당 자원이 있으면 반환
            if (cachedResponse) {
                return cachedResponse;
            }

            // 캐시에 해당 자원이 없으면 네트워크에서 가져오기 시도
            return fetch(event.request)
                .then(networkResponse => {
                    // Response 객체를 생성해서 반환
                    return new Response(networkResponse.body, {
                        status: networkResponse.status,
                        statusText: networkResponse.statusText,
                        headers: networkResponse.headers
                    });
                })
                .catch(error => {
                    // 네트워크에서 자원을 가져오지 못하면 예외 처리
                    console.error('Fetch failed:', error);

                    // 적절한 에러 응답을 생성해서 반환
                    return new Response('Network error occurred.', {
                        status: 500,
                        statusText: 'Internal Server Error'
                    });
                });
        })
    );
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // 캐시에 해당 자원이 있으면 반환
            if (cachedResponse) {
                return cachedResponse;
            }

            // 캐시에 해당 자원이 없으면 네트워크에서 가져오기 시도
            return fetch(event.request).then(networkResponse => {
                // 네트워크에서 가져온 자원을 캐시에 저장 후 반환
                caches.open(cacheName).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                });
                return networkResponse;
            }).catch(error => {
                // 네트워크에서 자원을 가져오지 못하면 예외 처리
                console.error('Fetch failed:', error);
            });
        })
    );
});
