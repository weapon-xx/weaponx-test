const CACHE_NAME = 'xx-cache';

this.addEventListener('install', (event) => {
    console.log('install event');
    // 创建和打开一个缓存库
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                // '/js/',
                '/js/sea.js',
                '/js/async.js',
            ]);
        })
    );
});

this.addEventListener('activate', (event) => {
    console.log('active event');
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

            return fetch(event.request.clone());
        })
    );
});







