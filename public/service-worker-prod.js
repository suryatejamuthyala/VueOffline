// Hey there! This is an over-simplified ServiceWorker for a tutorial.
// For any real apps, please use workboxjs.org or similar
// If you do want to use this, you'll need to update the file manually for every change to trigger an update
// Last modified: 2018-04-25 12:58PT

const cacheName = 'docappsui-v1';
//This should be name of old cache
const oldCacheName = 'docappsui-v1';

self.addEventListener('install', async function () {

});

// Optional: clents.claim() makes the service worker take over the current page
// instead of waiting until next load. Useful if you have used SW to prefetch content
// that's needed on other routes. But potentially dangerous as you are still running the
// previous version of the app, but with new resources.
// 
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());

});

self.addEventListener('fetch', event => {
    const req = event.request;
    event.respondWith(cacheFirst(req));

});

/*async function networkFirst(req) {
    let cachedResponse = null;

    try {
        if (req.cache === 'only-if-cached' && req.mode !== 'same-origin') return;
        else {
            const fresh = await fetch(req);
            if (req.method == 'GET') {
                const cache = await caches.open(cacheName);
                cache.add(req);
            }
            return fresh;
        }
    } catch (e) {
        const cache = await caches.open(cacheName);
        cachedResponse = cache.match(req);
        return cachedResponse;
    }
}*/


async function cacheFirst(req) {
    let cachedResponse = null;
    try {
        if (req.cache === 'only-if-cached' && req.mode !== 'same-origin') return;
        else {
            if (req.method == 'GET') {
                const cache = await caches.open(cacheName);
                cachedResponse = await cache.match(req);
                console.log("Error getting the file via cache first" + cachedResponse);
                if (!cachedResponse) {
                    cachedResponse = await fetch(req);
                    cache.add(req);
                }
                return cachedResponse;
            }
        }
    } catch (e) {
        console.log("Error getting the file via cache first");
        return cachedResponse;
    }
}








