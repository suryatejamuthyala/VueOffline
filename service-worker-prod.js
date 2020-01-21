
// Hey there! This is an over-simplified ServiceWorker for a tutorial.
// For any real apps, please use workboxjs.org or similar
// If you do want to use this, you'll need to update the file manually for every change to trigger an update
// Last modified: 2018-04-25 12:58PT

const cacheName = 'docappsui-v2';
//This should be name of old cache
// eslint-disable-next-line no-unused-vars
const oldCacheName = 'docappsui-v1';

const staticAssets = ['./index.html', './main.js', './App.vue'];

self.addEventListener('install', async function () {
    const cache = await caches.open(cacheName);
    cache.addAll(staticAssets);

});

// Optional: clents.claim() makes the service worker take over the current page
// instead of waiting until next load. Useful if you have used SW to prefetch content
// that's needed on other routes. But potentially dangerous as you are still running the
// previous version of the app, but with new resources.
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    const req = event.request;
    event.respondWith(cacheFirst(req));

});

// eslint-disable-next-line no-unused-vars
async function networkFirst(req) {
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
        cachedResponse = await cache.match(req);
        return cachedResponse;
    }
}

async function cacheFirst(req) {
    let cachedResponse = null;
    let fresh = null
    try {
        if (req.cache === 'only-if-cached' && req.mode !== 'same-origin') return;
        else {
            if (req.method == 'GET') {
                const cache = await caches.open(cacheName);
                cachedResponse = await cache.match(req);
                if (!cachedResponse) {
                    fresh = await fetch(req);
                    cache.add(req);
                }
                else
                    return cachedResponse;

                return fresh;
            }
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log("Error getting the file via cache first");
    }
}
