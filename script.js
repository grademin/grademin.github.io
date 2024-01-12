(async function() {
    "use strict";


    const api = (to) => {return `https://api.agilixbuzz.com/${to}`};

    async function request(type, url, dtype, data) {
        let request = await $.ajax({type: type, url: url, data: data, dataType: dtype, contentType: "application/json; charset=utf-8"})
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

            let relogin = await $.ajax({type: "post", url: api("cmd"), data: JSON.stringify({"request": {
                cmd: "login2",
                password: JSON.parse(localStorage.getItem("_user")).user.password,
                username: `${JSON.parse(localStorage.getItem("_user")).user.userspace}/${JSON.parse(localStorage.getItem("_user")).user.username}`,
            }}), dataType: "json", contentType: "application/json; charset=utf-8"})

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

    if (localStorage.getItem("_page") == null || (localStorage.getItem("_page") != null && localStorage.getItem("_user") == null))
        localStorage.setItem("_page", "login");

    load_page(localStorage.getItem("_page"));

    async function load_page(page) {
        localStorage.setItem("_page", page);

        switch(page) {
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
                if ($(event.target).attr("id") == "logout") {
                    localStorage.removeItem("_user");
                    window.location.reload();
                }

                if ($(event.target).attr("class") == "card") {
                    localStorage.setItem("_agenda_target", JSON.stringify({
                        courseid: $(event.target).attr("courseid"),
                        id: $(event.target).attr("uid"),
                    }));

                    load_page("agenda");
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
            
            all = all.sort((a,b) => a.order - b.order);
            $.each(all, function () {
                if (localStorage.getItem("_hide_courses") != null && localStorage.getItem("_hide_courses").includes(this.courseid))
                    return;

                $("#courses").append(`
                    <div class="card" courseid="${this.courseid}" uid="${this.id}">
                        <div title="Hides the course from the list (can be revealed again in settings)" id="hide" class="hide">
                            <span class="material-symbols-outlined">
                                remove
                            </span>
                        </div>
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
            // get specific enrollment that we are viewing for the rest of the placeholder variable
            // strip all styling from objects (smartly, e.g: don't ruin the looks but remove coloring and other stuff)
            // use the agenda_date list api to determine if the current date will have an agenda to prevent error

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

            try {
                let description = await request("get", api(`cmd/getresource?_token=${JSON.parse(localStorage.getItem("_user")).user.token}&entityid=${JSON.parse(localStorage.getItem("_agenda_target")).courseid}&path=Templates%2FData%2FCourse%2Flanding-page.html`), "html", "");
                template.description = description.replace(/style\s*=\s*["'][^"']*["']/gi, '');
                let course = await request("get", api(`cmd/listuserenrollments?_token=${JSON.parse(localStorage.getItem("_user")).user.token}&privileges=1&daysactivepastend=14&select=data,course,course.data,course.teachers,metrics&userid=${JSON.parse(localStorage.getItem("_user")).user.userid}`), "json", "");
                course = course.response.enrollments.enrollment.find(course => course.courseid == JSON.parse(localStorage.getItem("_agenda_target")).courseid);
                template.title = course.course.title;
                template.teacher = course.course.teachers.teacher;
                template.scored = Math.round((course.enrollmentmetrics.achieved / course.enrollmentmetrics.possible) * 100)
                template.start = (new Date(course.course.startdate).getMonth() + 1) + '/' + (new Date(course.course.startdate).getDate()) + '/' + (new Date(course.course.startdate).getFullYear() % 100)
                template.end = (new Date(course.course.enddate).getMonth() + 1) + '/' + (new Date(course.course.enddate).getDate()) + '/' + (new Date(course.course.enddate).getFullYear() % 100)
                let agenda = await request("get", api(`cmd/getresource?_token=${JSON.parse(localStorage.getItem("_user")).user.token}&class=EVNT&entityid=${JSON.parse(localStorage.getItem("_agenda_target")).courseid}&path=AGND/${`${new Date(new Date().setDate(new Date().getDate() + 0)).getFullYear()}-${String(new Date(new Date().setDate(new Date().getDate() + 0)).getMonth() + 1).padStart(2, '0')}-${String(new Date(new Date().setDate(new Date().getDate() + 0)).getDate()).padStart(2, '0')}`}`, "html", ""));
                template.agenda = agenda.replace(/style\s*=\s*["'][^"']*["']/gi, '');
            } catch (e) {}
            
            console.log(template)

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
            });
            break;
        case "todo":
            break;
        case "stream":
            break;
        case "communication":
            break;
        case "grades":
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

                let login = await request("post", api("cmd"), "json", JSON.stringify({"request": {
                    cmd: "login2",
                    password: $("#input-2").val(),
                    username: `${localStorage.getItem("_district") == null ? $("#input-0").val().replace(/^https?:\/\//, "").split(".")[0] : localStorage.getItem("_district")}/${$("#input-1").val()}`,
                }}), "");

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
