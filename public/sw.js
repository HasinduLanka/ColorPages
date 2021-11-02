
self.addEventListener('install', event => event.waitUntil(onInstall(event)));
self.addEventListener('activate', event => event.waitUntil(onActivate(event)));
self.addEventListener('fetch', event => event.respondWith(onFetch(event)));

const cacheName = 'offline-cache'

async function onInstall(event) {
    console.info('Service worker: Install');
}

async function onActivate(event) {
    console.info('Service worker: Activate');
}

async function onFetch(event) {
    let cachedResponse = null;
    if (event.request.method === 'GET') {
        const request = event.request;
        const cache = await caches.open(cacheName);
        cachedResponse = await cache.match(request);
    }

    return cachedResponse || fetch(event.request);
}