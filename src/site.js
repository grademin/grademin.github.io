/**
 * Sets the current page of the website.
 * 
 * @param {string} page 
 */
export async function runtime(page) {
    const hlp = await import("/proview/src/helpers.js");

    // Set the current title of the page.
    let title = page.includes("-") ? page.split("-")[0].charAt(0).toUpperCase() + page.split("-")[0].slice(1) + " " + page.split("-")[1].charAt(0).toUpperCase() + page.split("-")[1].slice(1) : page.charAt(0).toUpperCase() + page.slice(1);
    switch (title) {
        case "Gpa Calculator":
            document.title = "GPA Calculator";
            break;
        default:
            document.title = title;
    }

    // Set the current page from `page` value.
    let getpage = hlp.get("page");
    getpage.page = page;
    hlp.set("page", getpage);
    
    // Unset events
    $("#root").off("click");

    /**
     * Determine the current page based off name, then run that current page from dynamic importing.
     */
    {
        await hlp.prevent_errors(async function () {
            switch (page) {
                /**
                 * Main pages section
                 */
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
                case "calendar": {
                    const calendar = await import("/proview/src/pages/calendar.js");
                    await calendar.run();
                    break;
                }
                case "grades": {
                    const grades = await import("/proview/src/pages/grades.js");
                    await grades.run();
                    break;
                }
                case "settings": {
                    const settings = await import("/proview/src/pages/settings.js");
                    await settings.run();
                    break;
                }
                case "error": {
                    const error = await import("/proview/src/pages/error.js");
                    await error.run();
                    break;
                }
                
                /**
                 * Overview section
                 */
                case "courses": {
                    const courses = await import("/proview/src/pages/overview/courses.js");
                    await courses.run();
                    break;
                }
                case "announcements": {
                    const announcements = await import("/proview/src/pages/overview/announcements.js");
                    await announcements.run();
                    break;
                }
                case "contact": {
                    const contact = await import("/proview/src/pages/overview/contact.js");
                    await contact.run();
                    break;
                }
                case "todo-list": {
                    const todo_list = await import("/proview/src/pages/overview/todo-list.js")
                    await todo_list.run();
                    break;
                }
                case "activity-stream": {
                    const stream = await import("/proview/src/pages/overview/activity-stream.js");
                    await stream.run();
                    break;
                }
                
                /**
                 * Settings section
                 */
                case "theme-color": {
                    const theme_color = await import("/proview/src/pages/settings/theme-color.js");
                    await theme_color.run();
                    break;
                }
                case "gpa-config": {
                    const gpa_config = await import("/proview/src/pages/settings/gpa-config.js");
                    await gpa_config.run();
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
        }, true, async function (e) {
            hlp.remove("session");
            await runtime("login");
        }, `A path could not be found to "${page}".`);
    }
}