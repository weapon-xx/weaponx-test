const CACHE_NAME = 'xx-cache';

this.addEventListener('install', (event) => {
    console.log('install event');
    event.waitUntil(
        // 打开一个缓存库
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                // '/js/',
                '/js/sea.js',
                '/js/async.js',
            ]);
        })
    );
    
    this.skipWaiting(); // 假如代码变更，强制更新 sw
});

this.addEventListener('activate', (event) => {
    console.log('active event');
    event.waitUntil(
        caches.keys().then((keys) => {
            Promise.all(keys.map((key) => {
                console.log(key); // xx-cache
                caches.delete(key); // 删除旧的 cache storage
            }));
        }).then(() => {
            // 查看所有匹配缓存
            this.clients.matchAll().then((clients) => {
                console.log(clients);
            });
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('fetch event');
    const url = new URL(event.request.url);
    console.log(url);

    event.respondWith(
        caches.match(event.request).then(response => {
            // cache hit
            if (response) {
                return response;
            }

            return fetch(event.request.clone()).then((response) => {
                if(!response || response.status !== 200 || response.type !== 'basic' || /\.html$/.test(response.url)) {
                    return response;
                }

                const responseToCache = response.clone();

                caches.open(CACHE_NAME)
                .then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        })
    );
});







