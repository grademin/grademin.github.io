/**
 * Sends a notification from the web app
 * @param {string} title
 * @param {ArrayLike} content
 */
export async function notify(title, content) {
    await Notification.requestPermission().then((result) => {
        if (result === "granted") {
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification(title, content);
            });
        }
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