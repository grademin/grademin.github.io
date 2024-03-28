// Initates the service worker
export async function execute_worker() {
    $(window).on("load", function () {
        navigator.serviceWorker.register('service-worker.js');
    })

    self.addEventListener('install', function(event) {});
    self.addEventListener('activate', function(event) {});

    self.addEventListener('fetch', function(event) {
        event.respondWith(fetch(event.request));
    });
}