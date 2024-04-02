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

    // If the user "attempts" to change the page url to something it is not, then stop and don't 
    // follow the url parameters.
    if (hlp.get("page", false) == new URLSearchParams(window.location.search).get("page"))
        await site.runtime(new URLSearchParams(window.location.search).get("page"))
    else
        await site.runtime(hlp.get("page", false))
})();