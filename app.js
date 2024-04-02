/**
 * Copyright 2023-2024 Wo-r for source code.
 */
(async function () {
    "use strict";


    const sw = await import("/proview/src/service.js"),
          hlp = await import("/proview/src/helpers.js"),
          site = await import("/proview/src/site.js");

    
    // This will register a Service Worker for allowing the user to install
    // the website as an app through chrome, firefox, opera, etc.
    sw.register("src/service.js");


    if (hlp.get("page", false) == "" && hlp.session.exists)
        hlp.set("page", "overview", false);

    if (hlp.get("page", false) == "" || (hlp.get("page", false) != "" && !hlp.session.exists))
        hlp.set("page", "login", false);
    
    if (hlp.get("settings") == "")
        hlp.set("settings", []);


    ////////////////////////////////////////////////////////////


    // If the user tries to go back in history, handle it.
    $(window).on("popstate", async function (event) {
        if (!hlp.session.exists && new URLSearchParams(window.location.search).get("page") != "login") {
            await site.runtime("login")
        }
        else if (hlp.session.exists && new URLSearchParams(window.location.search).get("page") == "login") {
            await site.runtime(hlp.get("page", false));
        }
        else
            await site.runtime(new URLSearchParams(window.location.search).get("page"))
    })

    $("head").append(`<meta name="theme-color" content="">`)

    // Head styling
    $("head").append(`
        <style is="loader">
            .loader {
                display: inline-block;
                position: relative;
                width: 40px;
                height: 0px;
            }

            .loader div {
                box-sizing: border-box;
                display: block;
                position: absolute;
                width: 40px;
                height: 40px;
                border: 4px solid #fff;
                border-radius: 50%;
                animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                border-color: rgb(29, 78, 216) transparent transparent transparent;
            }
            
            .loader div:nth-child(1) {
                animation-delay: -0.45s;
            }

            .loader div:nth-child(2) {
                animation-delay: -0.3s;
            }

            .loader div:nth-child(3) {
                animation-delay: -0.15s;
            }
            
            @keyframes loader {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        </style>
        <style is="shake">
            @keyframes shake {
                0% { transform: translateX(0); }
                25% { transform: translateX(-8px); }
                50% { transform: translateX(8px); }
                75% { transform: translateX(-4px); }
                100% { transform: translateX(0); }
            }
            
            .shake {
                animation: shake 0.5s ease-in-out;
                animation-duration: 800ms;
            }
        </style>
        <style is="app-loader">
            .app-loading {
                position: absolute;
                top: calc(50% - 32px);
                left: calc(50% - 32px);
            }
        </style>
    `)

    // If the user "attempts" to change the page url to something it is not, then stop and don't 
    // follow the url parameters.
    if (hlp.get("page", false) == new URLSearchParams(window.location.search).get("page"))
        await site.runtime(new URLSearchParams(window.location.search).get("page"))
    else
        await site.runtime(hlp.get("page", false))
})();