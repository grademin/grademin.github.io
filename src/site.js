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
    
    if (new URLSearchParams(window.location.search).get("page") == "login")
        $(`head [name="theme-color"]`).attr("content", "#000000");
    else
        $(`head [name="theme-color"]`).attr("content", "#1d4ed8");

    
    ////////////////////////////////////////////////////////////


    switch(page) {
        case "login": {
            const login = await import("/proview/src/pages/login.js");
            login.run()
            break;
        }
        case "overview": {
            const overview = await import("/proview/src/pages/overview.js");
            overview.run();
            break;
        }
        case "settings": {
            const settings = await import("/proview/src/pages/settings.js");
            settings.run();
            break;
        }
        
        ////////////////////////////////////////////////////////////

        case "courses": {
            const courses = await import("/proview/src/pages/main/courses.js");
            courses.run();
            break;
        }

        case "announcements": {
            const announcements = await import("/proview/src/pages/main/announcements.js");
            announcements.run();
            break;
        }

        case "todo-list": {
            const todo_list = await import("/proview/src/pages/main/todo-list.js")
            todo_list.run();
            break;
        }

        ////////////////////////////////////////////////////////////

        case "hide-courses": {
            const hide_courses = await import("/proview/src/pages/settings/hide-courses.js");
            hide_courses.run();
            break;
        }
    }
}