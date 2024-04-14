/**
 * The Service Worker allows the website to be installed as a Mobile App, without
 * the harsh requirements needed to upload such an app to the App Store or to the Play Store.
 */
if ("serviceWorker" in navigator) {
    self.addEventListener('install', function(e) {});
    self.addEventListener('activate', function(e) {});
    self.addEventListener('fetch', function(e) {
        e.respondWith(fetch(e.request));
    });
}
