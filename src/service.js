/**
 * The Service Worker allows the website to be installed as a Mobile App, without
 * the harsh requirements needed to upload such an app to the App Store or to the Play Store.
 */
if ("serviceWorker" in navigator) {
    self.addEventListener('install', function(event) {});
    self.addEventListener('activate', function(event) {});
    self.addEventListener('fetch', function(event) {
        event.respondWith(fetch(event.request));
    });
}

/**
 * This registers the Service Worker.
 * @param path {string}
 * @example sw.register(path);
 */
export async function register (path) {
    navigator.serviceWorker.register(path);
}

/**
 * Checks if the Service Worker is installed.
 * @returns {true|false}
 * @example sw.installed();
 */
export async function installed() {
    if (navigator.serviceWorker.controller)
        return true;

    return false;
}