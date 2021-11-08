
self.addEventListener('install', event => event.waitUntil(onInstall(event)));
self.addEventListener('activate', event => event.waitUntil(onActivate(event)));
self.addEventListener('fetch', event => event.respondWith(onFetch(event)));

const version = 'rv0900';

const CacheName = 'colorbook-' + version;

async function onInstall(event) {

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('colorbook-') &&
                        cacheName != CacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );

    event.waitUntil(
        caches.open(CacheName).then(function (cache) {
            return cache.addAll([
                '/',
                'index.html',
                'favicon.png',
                'build/bundle.css',
                'build/bundle.js',
                'manifest.json'
            ]);
        })
    );

    console.info('Service worker: Install');
}

async function onActivate(event) {
    console.info('Service worker: Activate');
}

async function onFetch(event) {
    let cachedResponse = null;
    if (event.request.method === 'GET') {
        const request = event.request;
        const cache = await caches.open(CacheName);
        cachedResponse = await cache.match(request);
    }

    return cachedResponse || fetch(event.request);

}