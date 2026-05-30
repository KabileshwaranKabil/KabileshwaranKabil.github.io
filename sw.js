const CACHE_VERSION = "study-review-v2";
const CORE_CACHE = `core-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const IMAGE_CACHE_MAX_ENTRIES = 60;

const CORE_ASSETS = [
  "./",
  "./about",
  "./contact",
  "./dsa",
  "./index.html",
  "./offline.html",
  "./manifest.json",
  "./assets/css/style.css",
  "./assets/js/app.js",
  "./assets/images/profile.png",
  "./assets/images/app-icon.svg",
  "./notes",
  "./portfolio",
  "./posts",
  "./projects",
  "./privacy",
  "./reflections",
  "./review"
];

const NAVIGATION_FALLBACKS = new Set([
  "/",
  "/about",
  "/contact",
  "/dsa",
  "/notes",
  "/portfolio",
  "/posts",
  "/projects",
  "/privacy",
  "/reflections",
  "/review"
]);

self.addEventListener("install", (event) => {
  // Precache core assets but don't fail the install if some resources fail.
  event.waitUntil(
    caches.open(CORE_CACHE)
      .then((cache) =>
        Promise.allSettled(
          CORE_ASSETS.map((asset) => cache.add(asset).catch(() => null))
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => !key.includes(CACHE_VERSION))
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET") {
    return;
  }

  if (request.mode === "navigate") {
    const pathname = url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
    const isAppRoute = NAVIGATION_FALLBACKS.has(pathname);

    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) {
            return cached;
          }
          if (isAppRoute) {
            return caches.match("./offline.html");
          }
          return caches.match("./offline.html");
        })
    );
    return;
  }

  event.respondWith(
    (async function() {
      // images: use separate runtime cache with eviction
      if (request.destination === 'image') {
        const cache = await caches.open(IMAGE_CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const response = await fetch(request);
          if (response && response.status === 200) {
            cache.put(request, response.clone());
            // trim cache
            cache.keys().then(keys => {
              if (keys.length > IMAGE_CACHE_MAX_ENTRIES) {
                cache.delete(keys[0]);
              }
            });
          }
          return response;
        } catch (e) {
          return caches.match('./offline.html');
        }
      }

      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response && response.status === 200 && response.type !== 'opaque') {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(request, clone));
        }
        return response;
      } catch (e) {
        return caches.match('./offline.html');
      }
    })()
  );
});