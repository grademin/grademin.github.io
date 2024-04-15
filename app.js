/**
 * Copyright 2023-2024 Wo-r for source code.
 */
(async function () {
    "use strict";


    // TODO: clean

    /**
     * Manages custom css stuff that tailwind can handle for us
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

    const sw = await import("/proview/src/service.js"),
          hlp = await import("/proview/src/helpers.js"),
          site = await import("/proview/src/site.js");

    /**
     * Determine if Echo api is down or not
     */
    try {
        let status = await $.ajax({
            url: hlp.api("/cmd?cmd=getstatus"),
            method: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
        });

        // Response is not "Idea" or "Acceptable" and is instead "Degradable" or "Failiure"
        // this means we should most likely not use the api, so send an overlay that warns this
        if (status.response.status.rating <= 2) {
            $("#overlays").append(`
                <div id="error" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                    <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                        <div class="bg-zinc-800 rounded-xl max-w-lg px-5 py-5 pointer-events-auto">
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
    } catch (e) {}

    
    // This will register a Service Worker for allowing the user to install
    // the website as an app through chrome, firefox, opera, etc.
    await sw.register("app-worker.js");


    if (hlp.get("page", false) == "" && hlp.session.exists)
        hlp.set("page", "overview", false);

    if (hlp.get("page", false) == "" || (hlp.get("page", false) != "" && !hlp.session.exists))
        hlp.set("page", "login", false);
    
    if (hlp.get("settings") == "")
        hlp.set("settings", []);

    if (hlp.get("theme_settings") == "")
        hlp.set("theme_settings", {"sync":true,"theme":"dark","theme_color":"blue"});

    if (hlp.get("pfp", false) == "")
        hlp.set("pfp", "", false);

    if (hlp.get("hidden") == "")
        hlp.set("hidden", []);

    if (hlp.get("notifications") == "")
        hlp.set("notifications", [{"option":"chip-indicators","$value":true},{"option":"posted","$value":true},{"option":"past-due","$value":true},{"option":"new-grade","$value":true}]);


    ////////////////////////////////////////////////////////////

    setInterval(async function () {
        // new assignement posted
        let notifications = hlp.get("notifications");
        if (notifications.find(name => name.option.includes("posted")).$value) {
            try {
                if (hlp.session.exists) {
                    let due = await $.ajax({
                        url: hlp.api(`/cmd/getduesoonlist?_token=${hlp.session.token}&days=3&userId=${hlp.session.id}&utcoffset=300`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                    })
        
                    due.response.items.item.sort((a, b) => new Date(b.duedate) - new Date(a.duedate));
        
                    if (hlp.get("todos") == "") {
                        hlp.set("todos", {
                            start: new Date().toLocaleDateString('en-US'),
                            data: {
                                items: [],
                                $unviewed: 0
                            }
                        })
                    }
                    
                    let items = hlp.get("todos");
                    let unviewed = 0;
                    await $.each(due.response.items.item, (i, item) => {
                        if (new Date(item.duedate) >= new Date(hlp.get("todos").start)) {
                            if (!items.data.items.find(name => name.item.includes(item.title))) {
                                unviewed++
                                items.data.$unviewed = unviewed
                                items.data.items.push({
                                    item: item.title,
                                    course: item.entity.title
                                });
        
                                hlp.set("todos", items);
                            }
                        }
                    })
        
                    if (hlp.get("todos").data.$unviewed != 0) {
                        if (items.data.items.length > 1) {
                            sw.notify("Multiple new assignments were posted", {
                                "body": `Please head over to your todo list to see all your current todos.`,
                                "icon": "src/logo/logo.png",
                                "vibrate": [200, 100, 200, 100, 200, 100, 200],
                            })
                        } else {
                            await $.each(items.data.items, (i, todo) => {
                                sw.notify("A new assignment was posted", {
                                    "body": `${todo.item} was assigned by ${todo.course}`,
                                    "icon": "src/logo/logo.png",
                                    "vibrate": [200, 100, 200, 100, 200, 100, 200],
                                })
                            })
                        }
                    }
        
                    let todos_viewed = hlp.get("todos");
                    todos_viewed.data.$unviewed = 0;
                    todos_viewed.start = new Date().toLocaleDateString('en-US');
                    hlp.set("todos", todos_viewed); 
                }
            } catch (e) {console.log(e)}
        }

        // TODO: new grade / assignement past due
    }, 60000)

        
    ////////////////////////////////////////////////////////////


    let theme_settings = hlp.get("theme_settings");
    // Did user change there agent theme?
    if (theme_settings.sync)
        theme_settings.theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
        
    hlp.set("theme_settings", theme_settings);

    $("body").addClass(`${hlp.theme("theme-bg")} ${hlp.theme("theme-text")}`);

    // If the user "attempts" to change the page url to something it is not, then stop and don't 
    // follow the url parameters.
    if (hlp.get("page", false) == new URLSearchParams(window.location.search).get("page"))
        await site.runtime(new URLSearchParams(window.location.search).get("page"))
    else
        await site.runtime(hlp.get("page", false))
})();