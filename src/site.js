export async function runtime(page) {
    const hlp = await import("/proview/src/helpers.js");

    document.title = page.includes("-") ? page.split("-")[0].charAt(0).toUpperCase() + page.split("-")[0].slice(1) + " " + page.split("-")[1].charAt(0).toUpperCase() + page.split("-")[1].slice(1) : page.charAt(0).toUpperCase() + page.slice(1);

    let params = "";
    new URLSearchParams(window.location.search).forEach(function (key, param) {
        if (param != "page")
            params += `&${param}=${key}`
    })

    history.pushState({}, "", `?page=${page}${params}`);
    hlp.set("page", new URLSearchParams(window.location.search).get("page"), false);
    
    $("#root").off("click");

    
    ////////////////////////////////////////////////////////////


    switch(page) {
        case "login": {
            const login = await import("/proview/src/pages/login.js");
            await login.run()
            break;
        }
        case "overview": {
            const overview = await import("/proview/src/pages/overview.js");
            await overview.run();
            break;
        }
        case "settings": {
            const settings = await import("/proview/src/pages/settings.js");
            await settings.run();
            break;
        }
        
        ////////////////////////////////////////////////////////////

        case "courses": {
            const courses = await import("/proview/src/pages/main/courses.js");
            await courses.run();
            break;
        }

        case "announcements": {
            const announcements = await import("/proview/src/pages/main/announcements.js");
            await announcements.run();
            break;
        }

        case "todo-list": {
            const todo_list = await import("/proview/src/pages/main/todo-list.js")
            await todo_list.run();
            break;
        }

        case "activity-stream": {
            const stream = await import("/proview/src/pages/main/activity-stream.js");
            await stream.run();
            break;
        }

        ////////////////////////////////////////////////////////////

        case "theme-color": {
            const theme_color = await import("/proview/src/pages/settings/theme-color.js");
            await theme_color.run();
            break;
        }

        case "notifications": {
            const notifications = await import("/proview/src/pages/settings/notifications.js");
            await notifications.run();
            break;
        }

        case "hide-courses": {
            const hide_courses = await import("/proview/src/pages/settings/hide-courses.js");
            await hide_courses.run();
            break;
        }
    }
}