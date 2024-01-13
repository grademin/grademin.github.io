(async function () {
    "use strict";


    const api = (to) => { return `https://api.agilixbuzz.com/${to}` };

    async function request(type, url, dtype, data) {
        let request = await $.ajax({ type: type, url: url, data: data, dataType: dtype, contentType: "application/json; charset=utf-8" })
        if (request.response && request.response.code.includes("NoAuth")) {
            $(".overlay-container").html(`
                <div id="overlay-1">
                    <div class="overlay-backdrop"></div>
                    <div class="overlay-wrapper">
                        <div class="overlay-pane">
                            <div class="dialog">
                                <div class="dialog-container">
                                    <div class="dialog-surface" style="width: 20rem;">
                                        <div class="dialog-content">
                                            <p>Logging back in...</p>
                                            <div class="progress-bar">
                                                <div class="inner"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            let relogin = await $.ajax({
                type: "post", url: api("cmd"), data: JSON.stringify({
                    "request": {
                        cmd: "login2",
                        password: JSON.parse(localStorage.getItem("_user")).user.password,
                        username: `${JSON.parse(localStorage.getItem("_user")).user.userspace}/${JSON.parse(localStorage.getItem("_user")).user.username}`,
                    }
                }), dataType: "json", contentType: "application/json; charset=utf-8"
            })

            if (relogin.response.code == "OK") {
                $("#overlay-1").remove();
                delete relogin.response.code;
                relogin.response.user.password = JSON.parse(localStorage.getItem("_user")).user.password;
                localStorage.setItem("_user", JSON.stringify(relogin.response));
                window.location.reload();
            }
        }
        return request;
    };

    let status = await request("get", api("cmd?cmd=getstatus"), "json", "")
    if (status.response.code != "OK" || status.response.status.status != "OK") {
        $(".overlay-container").html(`
            <div id="overlay-1">
                <div class="overlay-backdrop"></div>
                <div class="overlay-wrapper">
                    <div class="overlay-pane">
                        <div class="dialog">
                            <div class="dialog-container">
                                <div class="dialog-surface" style="width: 20rem;">
                                    <div class="dialog-content">
                                        <p><a href="https://api.agilixbuzz.com/">Buzz</a> is currently down, please wait a while before attempting to access this website again.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
    }

    if (localStorage.getItem("_page") == null && localStorage.getItem("_user") != null)
        localStorage.setItem("_page", "course");

    if (localStorage.getItem("_page") == null || (localStorage.getItem("_page") != null && localStorage.getItem("_user") == null))
        localStorage.setItem("_page", "login");

    load_page(localStorage.getItem("_page"));

    async function load_page(page) {
        document.title = `${page} · ProView`;
        window.location.href = `#/student/${page}`;

        localStorage.setItem("_page", page);
        $("*").off(); // Prevent event listeners from doubling

        switch (page) {
            case "course":
                $("root").html(`
                    <app-after-login>
                        <app-home-tabs>
                            <div class="tab-group">
                                <div class="tab-list">
                                    <div id="course" class="tab" active>
                                        <span class="label">Courses</span>
                                    </div>
                                    <div id="todo" class="tab">
                                        <span class="label">To-Do</span>
                                    </div>
                                    <div id="stream" class="tab">
                                        <span class="label">Stream</span>
                                    </div>
                                </div>
                            </div>
                            <div class="greet">
                                <h1>Hello, ${JSON.parse(localStorage.getItem("_user")).user.firstname}</h1>
                                <p>Welcome to agilix-viewer, the one place to easily see all grades, work, todos, and more without the hassle from echo viewer!</p>
                            </div>
                            <div class="course">
                                <div class="card">
                                    <div class="wrapper">
                                        <div class="date">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                        <div id="communication" class="communication">
                                            <span class="label">
                                                <span class="material-symbols-outlined">
                                                    feedback
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="courses" id="courses"></div>
                            </div>
                        </app-home-tabs>
                    </app-after-login>
                `).on("click", function (event) {
                    if ($(event.target).attr("id") == "communication") {
                        load_page("communication");
                    }

                    if ($(event.target).attr("id") == "todo") {
                        load_page("todo");
                    }

                    if ($(event.target).attr("class") == "card") {
                        localStorage.setItem("_agenda_target", JSON.stringify({
                            courseid: $(event.target).attr("courseid"),
                            id: $(event.target).attr("uid"),
                        }));

                        load_page("agenda");
                    }

                    /* TODO: move to settings when finished
                    if ($(event.target).attr("id") == "logout") {
                        localStorage.removeItem("_user");
                        window.location.reload();
                    }
                    if ($(event.target).parent().attr("id") == "hide") {
                        if (localStorage.getItem("_hide_courses") == null)
                            localStorage.setItem("_hide_courses", "");
    
                        let hide_course = localStorage.getItem("_hide_courses");
                        if (hide_course.includes($(event.target).parent().parent().attr("courseid")))
                            return;
    
                        hide_course += `${$(event.target).parent().parent().attr("courseid")}, `;
                        localStorage.setItem("_hide_courses", hide_course);
                        window.location.reload();
                    }
                    */
                })

                let courses = await request("get", api(`cmd/listuserenrollments?_token=${JSON.parse(localStorage.getItem("_user")).user.token}&userid=${JSON.parse(localStorage.getItem("_user")).user.userid}&privileges=1&select=data,course,course.data,course.teachers,metrics`), "json", "");
                let order = await request("get", api(`cmd/getresource?_token=${JSON.parse(localStorage.getItem("_user")).user.token}&entityid=${JSON.parse(localStorage.getItem("_user")).user.userid}&path=Assets%2FBuzzCourseCardSettings.json`), "json", "")
                let all = [];

                $.each(courses.response.enrollments.enrollment, function () {
                    all.push({
                        order: order[this.id].order,
                        id: this.id,
                        courseid: this.courseid,
                        title: this.course.title,
                        start: (new Date(this.course.startdate).getMonth() + 1) + '/' + (new Date(this.course.startdate).getDate()) + '/' + (new Date(this.course.startdate).getFullYear() % 100),
                        end: (new Date(this.course.enddate).getMonth() + 1) + '/' + (new Date(this.course.enddate).getDate()) + '/' + (new Date(this.course.enddate).getFullYear() % 100),
                        scored: Math.round((this.enrollmentmetrics.achieved / this.enrollmentmetrics.possible) * 100),
                    });
                })

                all = all.sort((a, b) => a.order - b.order);
                $.each(all, function () {
                    if (localStorage.getItem("_hide_courses") != null && localStorage.getItem("_hide_courses").includes(this.courseid))
                        return;

                    $("#courses").append(`
                        <div class="card" courseid="${this.courseid}" uid="${this.id}">
                            <div class="wrapper">
                                <div class="class">
                                    <span>${this.title}</span>
                                    <span>${this.start} - ${this.end}</span>
                                </div>
                                <div class="grade ${isNaN(this.scored) ? '' : this.scored <= 50 ? 'fail' : this.scored <= 60 ? 'warn' : 'pass'}">${isNaN(this.scored) ? "--" : this.scored + "%"}</div>
                            </div>
                        </div>
                    `)
                })
                break;
            case "agenda":
                // TODO: 
                // make functions that simplify the request functions

                let template = {
                    title: null,
                    teacher: null,
                    scored: null,
                    start: null,
                    end: null,
                    description: "No class description was provided",
                    agenda: "No agenda for today",
                    agenda_dates: [] // TODO:
                }

                let description = await request("get", api(`cmd/getresource?_token=${JSON.parse(localStorage.getItem("_user")).user.token}&entityid=${JSON.parse(localStorage.getItem("_agenda_target")).courseid}&path=Templates%2FData%2FCourse%2Flanding-page.html`), "html", "");
                template.description = description.replace(/style\s*=\s*["'][^"']*["']/gi, '');
                let course = await request("get", api(`cmd/listuserenrollments?_token=${JSON.parse(localStorage.getItem("_user")).user.token}&privileges=1&daysactivepastend=14&select=data,course,course.data,course.teachers,metrics&userid=${JSON.parse(localStorage.getItem("_user")).user.userid}`), "json", "");
                course = course.response.enrollments.enrollment.find(course => course.courseid == JSON.parse(localStorage.getItem("_agenda_target")).courseid);
                template.title = course.course.title;
                template.teacher = course.course.teachers.teacher;
                template.scored = Math.round((course.enrollmentmetrics.achieved / course.enrollmentmetrics.possible) * 100)
                template.start = (new Date(course.course.startdate).getMonth() + 1) + '/' + (new Date(course.course.startdate).getDate()) + '/' + (new Date(course.course.startdate).getFullYear() % 100)
                template.end = (new Date(course.course.enddate).getMonth() + 1) + '/' + (new Date(course.course.enddate).getDate()) + '/' + (new Date(course.course.enddate).getFullYear() % 100)
                let agenda_dates = await request("get", api(`cmd/getresourcelist2?_token=${JSON.parse(localStorage.getItem("_user")).user.token}&class=EVNT&path=AGND%2F*&entityid=${JSON.parse(localStorage.getItem("_agenda_target")).courseid}`), "json", "")
                template.agenda_dates = agenda_dates.response.resources.resource;
                if (agenda_dates.response.resources.resource.some(date => date.path === `AGND/${new Date(new Date().setDate(new Date().getDate() + 0)).getFullYear()}-${String(new Date(new Date().setDate(new Date().getDate() + 0)).getMonth() + 1).padStart(2, '0')}-${String(new Date(new Date().setDate(new Date().getDate() + 0)).getDate()).padStart(2, '0')}`)) {
                    let agenda = await request("get", api(`cmd/getresource?_token=${JSON.parse(localStorage.getItem("_user")).user.token}&class=EVNT&entityid=${JSON.parse(localStorage.getItem("_agenda_target")).courseid}&path=AGND/${`${new Date(new Date().setDate(new Date().getDate() + 0)).getFullYear()}-${String(new Date(new Date().setDate(new Date().getDate() + 0)).getMonth() + 1).padStart(2, '0')}-${String(new Date(new Date().setDate(new Date().getDate() + 0)).getDate()).padStart(2, '0')}`}`, "html", ""));
                    template.agenda = agenda.replace(/style\s*=\s*["'][^"']*["']/gi, '');
                }

                window.location.href = `#/student/${page}/${JSON.parse(localStorage.getItem("_agenda_target")).courseid}/activity`;

                $("root").html(`
                    <app-after-login>
                        <course-preview>
                            <div class="tab-group">
                                <div class="tab-list">
                                    <div id="course" class="tab">
                                        <span class="label">Courses</span>
                                    </div>
                                    <div id="todo" class="tab">
                                        <span class="label">To-Do</span>
                                    </div>
                                    <div id="stream" class="tab">
                                        <span class="label">Stream</span>
                                    </div>
                                </div>
                            </div>
                            <div class="date-banner">
                                <span>${template.start} - ${template.end}</span>
                            </div>
                            <div class="card">
                                <div class="main">
                                    <div class="class">
                                        <span>${template.title}</span>
                                        <span>${template.teacher[0].firstname} ${template.teacher[0].lastname}</span>
                                    </div>
                                    <div class="grade ${isNaN(template.scored) ? '' : template.scored <= 50 ? 'fail' : template.scored <= 60 ? 'warn' : 'pass'}">${isNaN(template.scored) ? "--" : template.scored + "%"}</div>
                                </div>
                                <hr>
                                <div class="description">
                                    ${template.description}
                                </div>
                                <hr>
                                <div class="agenda">
                                    ${template.agenda}
                                </div>
                            </div>
                        </course-preview>
                    </app-after-login>
                `).on("click", function (event) {
                    if ($(event.target).attr("id") == "course") {
                        load_page("course");
                    }

                    if ($(event.target).attr("id") == "todo") {
                        load_page("todo");
                    }
                });
                break;
            case "todo":
                $("root").html(`
                    <app-after-login>
                        <user-todos>
                            <div class="tab-group">
                                <div class="tab-list">
                                    <div id="course" class="tab">
                                        <span class="label">Courses</span>
                                    </div>
                                    <div id="todo" class="tab" active>
                                        <span class="label">To-Do</span>
                                    </div>
                                    <div id="stream" class="tab">
                                        <span class="label">Stream</span>
                                    </div>
                                </div>
                            </div>
                            <div id="todos" class="todos"></div>
                        </user-todos>
                    </app-after-login>
                `).on("click", function (event) {
                    if ($(event.target).attr("id") == "course") {
                        load_page("course");
                    }
                })

                let todo = await request("get", api(`cmd/getduesoonlist?_token=${JSON.parse(localStorage.getItem("_user")).user.token}&days=3&userId=${JSON.parse(localStorage.getItem("_user")).user.userid}&utcoffset=360`), "json", "")
                $.each(todo.response.items.item, function () {
                    console.log(this)
                    $("#todos").append(`
                        <div class="todo">
                            <div class="class">
                                <span>${this.title}</span>
                                <span>${this.entity.title}</span>
                            </div>
                            <div class="info">
                                <span>${new Date() > new Date(this.duedate) ? "Past due" : new Date(this.duedate) - new Date() < 7 * 24 * 60 * 60 * 1000 ? "Due soon" : "Due"}</span>
                            </div>
                        </div>
                    `)
                })

                break;
            case "stream":
                break;
            case "communication":
                $("root").html(`
                    <app-after-login>
                        <communications>
                            <div class="tab-group">
                                <div class="tab-list">
                                    <div id="course" class="tab">
                                        <span class="label">Courses</span>
                                    </div>
                                    <div id="todo" class="tab">
                                        <span class="label">To-Do</span>
                                    </div>
                                    <div id="stream" class="tab">
                                        <span class="label">Stream</span>
                                    </div>
                                </div>
                            </div>
                            <div id="communications" class="communication"></div>
                        </communications>
                    </app-after-login>
                `).on("click", async function (event) {
                    if ($(event.target).attr("id") == "course") {
                        load_page("course");
                    }

                    if ($(event.target).attr("id") == "todo") {
                        load_page("todo");
                    }

                    if ($(event.target).attr("class") == "dropdown" && $(event.target).find(".info").attr("class").includes("hide")) {
                        $(event.target).find(".info").removeClass("hide");
                        $(event.target).find(".info").addClass("active");

                        let getfrom = await request("get", api(`cmd/getannouncementinfo?_token=${JSON.parse(localStorage.getItem("_user")).user.token}&packagetype=data&entityid=${JSON.parse(localStorage.getItem("_user")).user.domainid}&path=${$(event.target).attr("path")}`), "json", "")
                        let getbody = await request("get", api(`cmd/getannouncement?_token=${JSON.parse(localStorage.getItem("_user")).user.token}&packagetype=data&entityid=${JSON.parse(localStorage.getItem("_user")).user.domainid}&path=${$(event.target).attr("path")}`), "json", "");

                        $(event.target).find(".info").html(`
                            <hr>
                            <div class="from">
                                <div class="name">${getfrom.response.announcement.creator.firstname} ${getfrom.response.announcement.creator.lastname}</div>
                                <div class="dates">
                                    <span><b>Created:</b> ${(new Date(getfrom.response.announcement.startdate).getMonth() + 1) + '/' + (new Date(getfrom.response.announcement.startdate).getDate()) + '/' + (new Date(getfrom.response.announcement.startdate).getFullYear() % 100)}</span>
                                    <span><b>Expires:</b> ${(new Date(getfrom.response.announcement.enddate).getMonth() + 1) + '/' + (new Date(getfrom.response.announcement.enddate).getDate()) + '/' + (new Date(getfrom.response.announcement.enddate).getFullYear() % 100)}</span>
                                </div>
                            </div>
                            <div class="details">
                                ${getbody.announcement.body.$xml.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/style\s*=\s*["'][^"']*["']/gi, '')}
                            </div>
                        `);

                        window.location.href = `#/student/${page}/${getfrom.response.announcement.entityid}`;

                        return;
                    }

                    if ($(event.target).attr("class") == "dropdown" && $(event.target).find(".info").attr("class").includes("active")) {
                        $(event.target).find(".info").removeClass("active");
                        $(event.target).find(".info").addClass("hide");

                        window.location.href = `#/student/${page}`;

                        return;
                    }
                })


                let communication = await request("get", api(`cmd/getuserannouncementlist?_token=${JSON.parse(localStorage.getItem("_user")).user.token}&userid=${JSON.parse(localStorage.getItem("_user")).user.userid}&daysactivepastend=14`), "json", "")

                $.each(communication.response.announcements.announcement, function () {
                    $("#communications").append(`
                        <div class="dropdown" uid="${this.entityid}" path="${this.path}">
                            <div class="main">
                                <span>${this.title}</span>
                                <span>${(new Date(this.startdate).getMonth() + 1) + '/' + (new Date(this.startdate).getDate()) + '/' + (new Date(this.startdate).getFullYear() % 100)}</span>
                            </div>
                            <div class="info hide">
                            </div>
                        </div>
                    `)
                })

                break;
            case "settings":
                break;
            case "login":
                $("root").html(`
                    <app-before-login>
                        <app-login>
                            <div class="login-modal">
                                <form>
                                    <div class="fields">
                                        ${localStorage.getItem("_district") == null ? `
                                            <div class="form-field">
                                                <div class="field-wrapper">
                                                    <div class="field-icon">
                                                        <span title="Provide the school district. If you cannot find it, then look at the subdomain of your Echo website (subdomain.echo-ntn.org); that will be your district. If you don't want to do that, then just copy the website URL in full and paste it." class="material-symbols-outlined">
                                                            school
                                                        </span>
                                                    </div>
                                                    <div class="field-input">
                                                        <input type="text" id="input-0" placeholder="District / Website URL" required>
                                                    </div>
                                                </div>
                                                <div class="field-subscript">
                                                    <div class="field-info">
                                                        <span>* will be automatically saved for future sign-ins.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ` : ""}
                                        <div class="form-field">
                                            <div class="field-wrapper">
                                                <div class="field-icon">
                                                    <span class="material-symbols-outlined">
                                                        person
                                                    </span>
                                                </div>
                                                <div class="field-input">
                                                    <input type="text" id="input-1" placeholder="Username" required>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-field">
                                            <div class="field-wrapper">
                                                <div class="field-icon">
                                                    <span class="material-symbols-outlined">
                                                        lock
                                                    </span>
                                                </div>
                                                <div class="field-input">
                                                    <input type="password" id="input-2" placeholder="Password" required>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit">
                                        <span class="label">SIGN IN</span>
                                    </button>
                                </form>
                            </div>
                        </app-login>
                    </app-before-login>
                `)

                $("app-before-login form").submit(async function (event) {
                    event.preventDefault();

                    // Attempt to login with details provided
                    $(".overlay-container").append(`
                        <div id="overlay-1">
                            <div class="overlay-backdrop"></div>
                            <div class="overlay-wrapper">
                                <div class="overlay-pane">
                                    <div class="dialog">
                                        <div class="dialog-container">
                                            <div class="dialog-surface" style="width: 20rem;">
                                                <div class="dialog-content">
                                                    <p>Please wait...</p>
                                                    <div class="progress-bar">
                                                        <div class="inner"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)

                    let login = await request("post", api("cmd"), "json", JSON.stringify({
                        "request": {
                            cmd: "login2",
                            password: $("#input-2").val(),
                            username: `${localStorage.getItem("_district") == null ? $("#input-0").val().replace(/^https?:\/\//, "").split(".")[0] : localStorage.getItem("_district")}/${$("#input-1").val()}`,
                        }
                    }), "");

                    if (login.response.code == "OK") {
                        if (localStorage.getItem("_district") == null)
                            localStorage.setItem("_district", $("#input-0").val().replace(/^https?:\/\//, "").split(".")[0])

                        $("#overlay-1").remove()
                        delete login.response.code;
                        login.response.user.password = $("#input-2").val();
                        localStorage.setItem("_user", JSON.stringify(login.response));
                        load_page("course");
                    } else {
                        $("#overlay-1").remove()
                        $(".overlay-container").append(`
                            <div id="overlay-1">
                                <div class="overlay-backdrop"></div>
                                <div class="overlay-wrapper">
                                    <div class="overlay-pane">
                                        <div class="dialog">
                                            <div class="dialog-container">
                                                <div class="dialog-surface">
                                                    <div class="dialog-content">
                                                        <p>Invalid username or password</p>
                                                        <br>
                                                        <table class="error-details">
                                                            <tr>
                                                                <td><b>Code:</b></td>
                                                                <td>${login.response.code}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Message:</b></td>
                                                                <td>${login.response.message}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Error ID:</b></td>
                                                                <td>${login.response.errorId}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div class="dialog-action">
                                                        <button id="close">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).on("click", function (event) {
                            if ($(event.target).attr("id") == "close")
                                $("#overlay-1").remove()
                        })
                    }
                })
                break;
            default:
                localStorage.setItem("_page", "login");
                break;
        }
    }
})();