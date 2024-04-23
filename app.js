/**
 * Copyright 2023-2024 Wo-r for source code.
 */
(async function () {
    "use strict";

    const sw = await import("/proview/src/service.js");
    const hlp = await import("/proview/src/helpers.js");
    const site = await import("/proview/src/site.js");

    /**
     * Handles themes automatically. (should run first since color is something the user sees first)
     */
    {
        if (hlp.get("theme_settings") == "") {
            hlp.set("theme_settings", {"sync":true,"theme":"dark","theme_color":"blue"});
        }

        let theme_settings = hlp.get("theme_settings");
        if (theme_settings.sync) {
            theme_settings.theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
        }
        hlp.set("theme_settings", theme_settings);
    
        $("body").addClass(`${hlp.theme("theme-bg")} ${hlp.theme("theme-text")}`);
        $("#pre-loader").addClass(hlp.theme("bg", "700"));
    }

    /**
     * Manages custom css stuff that tailwind can handle for us.
     * TODO: add better sizes for smaller phones
     */
    tailwind.config = {
        theme: {
            extend: {
                width: {
                    'full': '100% !important',
                },
                screens: {
                    "x-sm": "475px",
                    "xs-sm": "375px",
                    "xl-sm": "325px",
                    "xxl-sm": "245px"
                },
                container: {
                    screens: {
                        sm: '640px',
                        md: '768px',
                        lg: '1024px',
                        xl: '1280px',
                        '2xl': '1536px',
                    },
                },
            },
        },
        plugins: [],
    }

    /**
     * Determine if Echo api is down or not.
     */
    await hlp.prevent_errors(async function () {
        let status = await $.ajax({
            url: hlp.api("/cmd?cmd=getstatus"),
            method: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
        });

        // Response is not "Ideal" or "Acceptable" and is instead "Degradable" or "Failiure"
        // this means we should most likely not use the api, so send an overlay that warns this.
        if (status.response.status.rating <= 2) {
            $("#overlays").append(`
                <div id="error" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-end">
                    <div class="container mx-auto px-4 flex justify-center items-center h-full">
                        <div class="bg-zinc-800 rounded-xl max-w-lg px-5 py-5">
                            <div class="flex justify-center items-center mb-4">
                                <h2 class="text-2xl font-bold text-white text-center">API is down</h2>
                            </div>
                            <div class="text-white">
                                <p class="text-center">This is a rare issue. Unfortunately, the API this website uses is down. Please wait as we attempt to get the API back online.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            
            let check = setInterval(async () => {
                await $.ajax({
                    url: hlp.api("/cmd?cmd=getstatus"),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: async (recheck) => {
                        if (recheck.response.status.rating > 2) {
                            $("#overlays #error").remove();
                            clearInterval(check);
                            await site.runtime(hlp.get("page", false))
                        }
                    }
                });
            }, 2000);
        }
    }, false)

    // This will register a Service Worker for allowing the user to install
    // the website as an app through chrome, firefox, opera, etc.
    await sw.register("app-worker.js");

    /**
     * Handles all the localstorage items that need to be setup before hand.
     */
    {
        if (hlp.get("page", false) == "" && hlp.session.exists) {
            hlp.set("page", {
                page: "overview",
                params: []
            });
        }

        if (hlp.get("page", false) == "" || (hlp.get("page", false) != "" && !hlp.session.exists)) {
            hlp.set("page", {
                page: "login",
                params: []
            });
        }
        
        if (hlp.get("settings") == "") {
            hlp.set("settings", [{"setting":"include-self","$value":true},{"setting":"hide-lti-details","$value":false},{"setting":"chip-indicators","$value":true},{"setting":"hide-excused","$value":false}]);
        }

        if (hlp.get("pfp", false) == "") {
            hlp.set("pfp", "", false);
        }

        if (hlp.get("hidden") == "") {
            hlp.set("hidden", []);
        }

        if (hlp.get("activities") == "") {
            hlp.set("activities", []);
        }
    }

    // If the user "attempts" to change the page url to something it is not, then stop and don't 
    // follow the url parameters.

    await site.runtime(hlp.get("page").page)
})();