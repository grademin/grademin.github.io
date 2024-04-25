export async function runtime(page) {
    const hlp = await import("/proview/src/helpers.js");

    if (page.includes("-") ? page.split("-")[0].charAt(0).toUpperCase() + page.split("-")[0].slice(1) + " " + page.split("-")[1].charAt(0).toUpperCase() + page.split("-")[1].slice(1) : page.charAt(0).toUpperCase() + page.slice(1) === "Gpa Calculator")
        document.title = "GPA Calculator"
    else
        document.title = page.includes("-") ? page.split("-")[0].charAt(0).toUpperCase() + page.split("-")[0].slice(1) + " " + page.split("-")[1].charAt(0).toUpperCase() + page.split("-")[1].slice(1) : page.charAt(0).toUpperCase() + page.slice(1);

    let pages = hlp.get("page")
    pages.page = page;
    hlp.set("page", pages)
    
    $("#root").off("click");

    
    ////////////////////////////////////////////////////////////


    switch(page) {
        case "login": {
            const login = await import("/proview/src/pages/login.js");
            await login.run()
            break;
        }

        case "grades": {
            const grades = await import("/proview/src/pages/main/grades.js");
            await grades.run();
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

        case "calendar": {
            const calendar = await import("/proview/src/pages/main/calendar.js");
            await calendar.run();
            break;
        }

        case "contact": {
            const contact = await import("/proview/src/pages/main/contact.js");
            await contact.run();
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

        case "gpa-calculator": {
            const gpa_calculator = await import("/proview/src/pages/main/grades/gpa-calculator.js");
            await gpa_calculator.run();
            break;
        }

        ////////////////////////////////////////////////////////////

        case "theme-color": {
            const theme_color = await import("/proview/src/pages/settings/theme-color.js");
            await theme_color.run();
            break;
        }

        case "hide-courses": {
            const hide_courses = await import("/proview/src/pages/settings/hide-courses.js");
            await hide_courses.run();
            break;
        }

        case "help-center": {
            const help_center = await import("/proview/src/pages/settings/help-center.js");
            await help_center.run();
            break;
        }

        case "manage-account": {
            const manage_account = await import("/proview/src/pages/settings/manage-account.js");
            await manage_account.run();
            break;
        }
    }
}