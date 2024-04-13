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
    else {
        switch (hlp.get("theme_settings").theme_color) {
            case "blue": {
                $(`head [name="theme-color"]`).attr("content", "rgb(29, 78, 216)");
                $(`head [name="background-color"]`).attr("content", "rgb(29, 78, 216)");
                break;
            }
            case "green": {
                $(`head [name="theme-color"]`).attr("content", "rgb(34, 197, 94)");
                $(`head [name="background-color"]`).attr("content", "rgb(34, 197, 94)");
                break;
            }
            case "orange": {
                $(`head [name="theme-color"]`).attr("content", "rgb(251, 146, 60)");
                $(`head [name="background-color"]`).attr("content", "rgb(251, 146, 60)");
                break;
            }
            case "violet": {
                $(`head [name="theme-color"]`).attr("content", "rgb(124, 58, 237)");
                $(`head [name="background-color"]`).attr("content", "rgb(124, 58, 237)");
                break;
            }
            case "rose": {
                $(`head [name="theme-color"]`).attr("content", "rgb(190, 18, 60)");
                $(`head [name="background-color"]`).attr("content", "rgb(190, 18, 60)");
                break;
            }
            case "indigo": {
                $(`head [name="theme-color"]`).attr("content", "rgb(67, 56, 202)");
                $(`head [name="background-color"]`).attr("content", "rgb(67, 56, 202)");
                break;
            }
            case "fuchsia": {
                $(`head [name="theme-color"]`).attr("content", "rgb(192, 38, 211)");
                $(`head [name="background-color"]`).attr("content", "rgb(192, 38, 211)");
                break;
            }
            case "teal": {
                $(`head [name="theme-color"]`).attr("content", "rgb(45, 212, 191)");
                $(`head [name="background-color"]`).attr("content", "rgb(45, 212, 191)");
                break;
            }
        }
    }
    
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

        case "activity-stream": {
            const stream = await import("/proview/src/pages/main/activity-stream.js");
            stream.run();
            break;
        }

        ////////////////////////////////////////////////////////////

        case "theme-color": {
            const theme_color = await import("/proview/src/pages/settings/theme-color.js");
            theme_color.run();
            break;
        }

        case "hide-courses": {
            const hide_courses = await import("/proview/src/pages/settings/hide-courses.js");
            hide_courses.run();
            break;
        }
    }
}