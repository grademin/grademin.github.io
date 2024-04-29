/**
 * © 2023-2024 Wo-r, Released under the GNU General Public License.
 */
(async function () {
    "use strict";

    const hlp = await import("/proview/src/helpers.js");
    const site = await import("/proview/src/site.js");

    /**
     * Set the site theme to match the currently set user theme.
     */
    {
        if (hlp.get("theme") == undefined) {
            hlp.set("theme", {
                sync: true,
                theme: "dark",
                color: "blue"
            });
        }

        // Automatically set the theme if sync is sync is enabled.
        let theme = hlp.get("theme");
        if (theme.sync) {
            theme.theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            hlp.set("theme", theme);
        }

        $("body").addClass(`${hlp.gettheme("theme-bg")} ${hlp.gettheme("theme-text")}`).removeClass("bg-blue-700");
        $("#pre-loader").addClass(hlp.gettheme("bg", "700"));
    }

    /**
     * Sets the tailwind configurations for the site.
     */
    tailwind.config = {
        plugins: [],
        theme: {
            extends: {
                width: {
                    "full": "100% !important"
                },
                screen: {
                    /*TODO:*/
                },
                // Keep original container sizes, since it will try to follow
                // screen widths for some reason.
                container: {
                    screens: {
                        sm: '640px',
                        md: '768px',
                        lg: '1024px',
                        xl: '1280px',
                        '2xl': '1536px',
                    },
                },
            }
        }
    };

    /**
     * Registers the Service Worker allowing the website to become a Web App.
     */
    if ("serviceWorker" in navigator) {
        self.addEventListener("install", function (e) {});
        self.addEventListener("activate", function (e) {});
        self.addEventListener("fetch", function (e) {
            e.respondWith(fetch(e.request));
        });

        navigator.serviceWorker.register("app.js");
    }

    /**
     * Anything localstorage must be setup, so it doesn't need more complex code
     * make sure it exists anyways.
     */
    {
        if (hlp.get("page") == undefined && hlp.session.exists) {
            hlp.set("page", {
                page: "overview",
                params: []
            });
        }

        if (hlp.get("page") == undefined || (hlp.get("page") != undefined && !hlp.session.exists)) {
            hlp.set("page", {
                page: "login",
                params: []
            });
        }

        if (hlp.get("settings") == undefined) {
            hlp.set("settings", [
                {
                    option: "include-self",
                    $value: false
                },
                {
                    option: "chip-indicators",
                    $value: true
                },
                {
                    option: "hide-excused",
                    $value: false
                }
            ]);
        }

        if (hlp.get("pfp") == undefined) {
            hlp.set("pfp", "");
        }

        if (hlp.get("courses") == undefined) {
            hlp.set("courses", []);
        }

        if (hlp.get("activities") == undefined) {
            hlp.set("activities", []);
        }
    }

    /**
     * Run the currently set page.
     */
    site.runtime(hlp.get("page").page)
})();