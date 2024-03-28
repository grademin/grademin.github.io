self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('Proview').then(function(cache) {
            return cache.addAll([
                "/",
                "index.html",
                "app.js",
                "jquery.js",
                "tailwind.js"
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
