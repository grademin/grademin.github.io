(async function () {
    "use strict";

    
    // inital


    const api = (_t) => { return `https://api.agilixbuzz.com${_t}` };


    // When the user has logged in, or the user somehow removed `ul`, this will make sure they
    // end up on some sort of default page.
    if (localStorage.getItem("ul") == undefined && localStorage.getItem("session") != undefined)
        localStorage.setItem("ul", "overview");

    // If `session` or `ul` are undefined, then set page to login.
    if (localStorage.getItem("ul") == undefined || (localStorage.getItem("ul") != undefined && localStorage.getItem("session") == undefined))
        localStorage.setItem("ul", "login")
    

    await runtime(localStorage.getItem("ul"));

    /**
     * Handles every section of Proview.
     */
    async function runtime(ul) {
        document.title = `${ul.charAt(0).toUpperCase() + ul.slice(1)}`;

        localStorage.setItem("ul", ul);
        $("#root").attr("ul", ul);

        // bases
        $("#overlays").empty();

        // Switch between each page
        switch (ul) {
        case "login":
            let remembered_details = "", hide_inputs = "";
            if (localStorage.getItem("remembered") != undefined) {
                remembered_details = `
                    <div class="mt-1 mb-5 block w-full px-5 py-4 border-4 border-blue-700 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                        <div class="flex flex-row gap-5 items-center">
                            <div class="flex justify-between items-center">
                                <div class="rounded-full border-[6px] border-blue-500 bg-blue-600 h-16 w-16 flex items-center justify-center text-2xl sm:text-2xl font-bold uppercase">
                                    ${JSON.parse(localStorage.getItem("remembered")).firstname.charAt(0).toUpperCase()}
                                </div>                    
                            </div>
                            <div class="flex flex-col">
                                <h1 class="font-black leading-wider tracking-tight text-2xl">${JSON.parse(localStorage.getItem("remembered")).fullname}</h1>
                                <span class="font-bold text-[18px] text-zinc-400">${JSON.parse(localStorage.getItem("remembered")).username}</span>    
                            </div>
                        </div>
                    </div>
                `;
                hide_inputs = "hidden";
            }

            await $("#root").html(`
                <div class="relative min-h-screen flex justify-center">
                    <div class="p-20 rounded-lg container mx-auto px-4">
                        <div class="flex flex-col mb-10">
                            <h2 class="text-7xl tracking-tight leading-wider font-black text-blue-700">Proview</h2>
                            <span class="text-2xl tracking-wide font-bold">Log In</span>
                        </div>
                        <form class="mt-16">
                            ${remembered_details}
                            <div class="flex mb-4 space-x-2 ${hide_inputs}">
                                <div class="flex-1">
                                    <input style="background: transparent;" placeholder="District / Website" type="text" id="district" name="userspace" class="caret-blue-700 mt-1 block w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                                </div>
                                <div class="flex-1">
                                    <input style="background: transparent;" placeholder="Username" type="text" id="username" name="username" class="caret-blue-700 mt-1 block w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                                </div>
                            </div>
                            <div class="mb-6">
                                <input style="background: transparent;" placeholder="Password" type="password" id="password" name="password" class="caret-blue-700 mt-1 block w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                            </div>
                            <div class="absolute bottom-0 left-0 right-0 container mx-auto px-4 mb-10">
                                <button type="submit" class="w-full px-4 py-2 bg-blue-700 transition text-white font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Log in</button>
                            </div>        
                        </form>
                    </div>
                </div>
            `).submit(async function (event) {
                event.preventDefault();

                if ((($("#district").val() != "" && $("#username").val() != "" && $("#password").val() != "") && localStorage.getItem("remembered") == undefined) || $("#password").val() != "" && localStorage.getItem("remembered") != undefined) {
                    $("#overlays").append(`
                        <div class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                            <div class="loader"><div></div><div></div><div></div><div></div></div>
                        </div>
                    `)

                    $("#district, #username, #password").removeClass("shake").removeClass("border-red-300");

                    let district = localStorage.getItem("remembered") == undefined ? $("#district").val() : JSON.parse(localStorage.getItem("remembered")).userspace;
                    if (district.includes("//"))
                        district = district.replace(/^https?:\/\//, "").split(".")[0];

                    await $.ajax({
                        url: api("/cmd"),
                        method: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({"request": {
                            cmd: "login3",
                            expireseconds: "-999",
                            username: `${district}/${localStorage.getItem("remembered") == undefined ? $("#username").val() : JSON.parse(localStorage.getItem("remembered")).username}`,
                            password: $("#password").val()
                        }}),
                        success: async (login3) => {
                            console.log(login3)
                            if (login3.response.code != "OK") {
                                $("#overlays").empty();
                                await $("#district, #username, #password").addClass("shake").addClass("border-red-300");
                            } else {
                                delete login3.response.code;
                                login3.response.token = login3.response.user.token;
                                delete login3.response.user.token;
                                login3.response.user.fullname = `${login3.response.user.firstname.charAt(0).toUpperCase() + login3.response.user.firstname.slice(1)} ${login3.response.user.lastname.charAt(0).toUpperCase() + login3.response.user.lastname.slice(1)}`;

                                localStorage.setItem("remembered", JSON.stringify({
                                    "username": login3.response.user.username,
                                    "userspace": login3.response.user.userspace,
                                    "firstname": login3.response.user.firstname,
                                    "lastname": login3.response.user.lastname,
                                    "fullname": login3.response.user.fullname
                                }))
                                localStorage.setItem("session", JSON.stringify(login3.response));
                                runtime("overview")
                            }
                        }
                    });
                }
            })
            break;
        case "overview":
            $("#overlays").append(`
                <div class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div class="loader"><div></div><div></div><div></div><div></div></div>
                </div>
            `);

            await $("#root").html(`
                <div id="topnav" class="fixed top-0 left-0 right-0 hidden">
                    <div class="flex flex-row py-2 px-4 bg-blue-700">
                        <div class="flex justify-center items-center container mx-auto px-4">
                            <span class="font-black text-[18px]">Overview</span>
                        </div>
                    </div>
                </div>

                <div id="toptitle" class="bg-blue-700">
                    <div class="flex flex-row gap-10 justify-between container mx-auto py-10 px-4">
                        <div class="flex flex-col gap-1 justify-center">
                            <h1 class="text-5xl font-bold tracking-tight mb-0">Overview</h1>
                            <div class="text-[20px] font-bold">${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getDate()}, ${new Date().getFullYear()}</div>    
                        </div>
                        <div class="flex justify-between items-end cursor-pointer">
                            <div id="profile" class="rounded-full transition bg-blue-600 border-8 hover:border-blue-400 active:border-blue-600 border-blue-500 h-[4.5rem] w-[4.5rem] flex items-center justify-center text-2xl font-bold uppercase">
                                ${JSON.parse(localStorage.getItem("session")).user.firstname.charAt(0).toUpperCase()}
                            </div>                    
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-5 pt-10 mb-24 container mx-auto py-10 px-4">
                    <div id="what_is_this" class="flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-5 px-3 border-4 border-blue-700">
                        <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                                <span class="text-3xl material-symbols-outlined">
                                    help
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[22px] font-bold">What is this</h1>
                                <span class="font-bold text-[15px] text-zinc-400">Read about why this was created</span>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <span class="material-symbols-outlined">
                                arrow_forward_ios
                            </span>
                        </div>
                    </div>

                    <div id="view_courses" class="flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                        <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                                <span class="text-3xl material-symbols-outlined">
                                    assignment
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[22px] font-bold">View courses</h1>
                                <span class="font-bold text-[15px] text-zinc-400">See your current courses</span>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <span class="material-symbols-outlined">
                                arrow_forward_ios
                            </span>
                        </div>
                    </div>
                    <div id="view_courses" class="flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                        <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                                <span class="text-3xl material-symbols-outlined">
                                    show_chart
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[22px] font-bold">Averages</h1>
                                <span class="font-bold text-[15px] text-zinc-400">See your objective averages</span>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <span class="material-symbols-outlined">
                                arrow_forward_ios
                            </span>
                        </div>
                    </div>
                    <div id="mail_teachers" class="flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                        <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                                <span class="text-3xl material-symbols-outlined">
                                    alternate_email
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[22px] font-bold">Contact Teachers</h1>
                                <span class="font-bold text-[15px] text-zinc-400">Email your teachers</span>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <span class="material-symbols-outlined">
                                arrow_forward_ios
                            </span>
                        </div>
                    </div>
                    
                </div>

                <div id="bottomnav" class="fixed bottom-0 left-0 right-0">
                    <div class="bg-zinc-800">
                        <div class="flex flex-row justify-between items-center">
                            <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                                <span class="font-black active pointer-events-none material-symbols-outlined">
                                    home
                                </span>
                            </a>
                            <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                                <span class="material-symbols-outlined">
                                    calendar_month
                                </span>
                            </a>
                            <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                                <span class="font-black pointer-events-none material-symbols-outlined">
                                    description
                                </span>
                            </a>
                            <a id="profile" class="cursor-pointer flex justify-center items-center py-3 w-full">
                                <span class="font-black pointer-events-none material-symbols-outlined">
                                    settings
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            `).on("click", function (event) {
                switch ($(event.target).attr("id")) {
                    case "profile":
                        runtime("settings");
                        break;
                    case "courses":
                        runtime("courses");
                        break;
                    case "averages":
                        runtime("averages");
                        break;
                    case "what_is_this":
                        $("#overlays").append(`
                            <div id="overlay" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                                <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                    <div class="bg-zinc-800 rounded-xl max-w-lg px-5 py-5 pointer-events-auto">
                                        <div class="flex justify-center items-center mb-4">
                                            <h2 class="text-2xl font-bold text-white text-center">About Proview</h2>
                                        </div>
                                        <div class="text-white">
                                            <p>This website was created to show that <b>Echo Viewer</b> by <b>Agilix, Inc</b> could have been better. This websites design is based off <b>GradeWay</b> by <b>Srujan Mupparapu</b>, this website is not meant to infringe or plagarize his work, If it does (specifically to Srujan) please send an issue <a class="text-blue-700 hover:text-blue-600 transition" href="https://github.com/wo-r-professional/proview/issues">here</a> and I will abide to whatever you ask.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).on("mousedown", function (event) {
                            switch ($(event.target).attr("id")) {
                                case "overlay":
                                    $("#overlay").fadeOut(400, function () {
                                        $("#overlays").empty();
                                    });
                            }
                        })
                        break;
                }
            })
            
            // Manages when we scroll
            $(window).scroll(function() {
                if ($(this).scrollTop() > $("#toptitle").offset().top + $("#toptitle").outerHeight() - 50 || $(this).scrollTop() < $("#toptitle").offset().top - $(window).height()) {
                    $("#topnav").fadeIn(100);
                } else {
                    $("#topnav").fadeOut(200);
                }
            });

            $("#overlays").empty();

            break;
        case "courses":
            break;
        case "averages":
            break;
        case "settings":
            await $("#root").html(`
                <button id="logout" class="w-full px-4 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Logout</button>
            `).on("click", function (event) {
                switch ($(event.target).attr("id")) {
                    case "logout":
                        $("#overlays").append(`
                            <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                                <div class="loader"><div></div><div></div><div></div><div></div></div>
                            </div>
                        `);

                        $.ajax({
                            url: api("/cmd"),
                            method: "POST",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify({"request": {
                                cmd: "logout",
                            }}),
                            success: function () {
                                localStorage.removeItem("session");
                                runtime("login");
                                $("#overlays").empty()
                            }
                        })
                        break;
                }
            });
            break;
        }
    }
})();



/** this is a whole bunch of code that i need later */




            /*

            <div class="flex flex-col pl-5 pr-5 sm:pl-0 sm:pr-0">
                        <div class="py-10 flex flex-col justify-between container mx-auto px-4 sm:px-6 lg:px-8 bg-zinc-800 rounded-xl">
                            <h1 class="font-black text-2xl sm:text-4xl">Averages</h1>
                            <span>These are your averages from <b>Agency, Collab, K&T, Oral and Comms</b>.
                            <div id="averages" class="mt-10 mb-2 grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5"></div>
                            <i class="mt-10">* These scores can be skewed due to Echo not providing a check for <u>Expired</u> classes.</i>
                        </div>
                    </div>

            // Get current averages
            await $.ajax({
                url: api(`/dlap.ashx?cmd=getdomainsettings&domainid=//${JSON.parse(localStorage.getItem("session")).user.userspace}&path=public/shadow/app/buzz/settings.xml&includesource=true`),
                method: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: async (settings) => {
                    let guids = "", guids_with_ids = [];
                    $.each(settings.response.settings["scoring-objective-list"]["scoring-objective"], (i, objective) => {
                        if (i < settings.response.settings["scoring-objective-list"]["scoring-objective"].length - 1)
                            guids += `${objective.guid}|`
                        else 
                            guids += `${objective.guid}`;
                    });

                    await $.ajax({
                        url: api(`/cmd/getobjectivelist?_token=${JSON.parse(localStorage.getItem("session")).token}&guid=${guids}`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: async (objectives) => {
                            $.each(objectives.response.objectives.objective, (i, objective) => {
                                guids_with_ids.push({
                                    "target": objective.id,
                                    "guid": objective.guid
                                })
                            })

                            await $.ajax({
                                url: api(`/cmd/listuserenrollments?_token=${JSON.parse(localStorage.getItem("session")).token}&userid=${JSON.parse(localStorage.getItem("session")).user.userid}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                                method: "GET",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                success: async (courses) => {
                                    let course_metrics = []
                                    $.each(courses.response.enrollments.enrollment, (i, course) => {
                                        try {
                                            $.each(course.enrollmentmetrics.objectivescores.objectivescore, (i, score) => {
                                                course_metrics.push(score)
                                            })
                                        } catch (e) {}
                                    })

                                    // Gets the guid and target for averages
                                    let final_objectives = []
                                    try {
                                        $.each(guids_with_ids, (i, guid) => {
                                            course_metrics.find(g => {
                                                if (g.guid.includes(guid.guid))
                                                    final_objectives.push({
                                                        "guid": guid.guid,
                                                        "target": guid.target,
                                                        "score": Number(((g.achieved / g.possible) * 100).toFixed(2)),
                                                    })
                                            })
                                        })
                                    } catch (e) {}

                                    const targets = {
                                        "Agency": {sum: 0, count: 0},
                                        "Collaboration": {sum: 0, count: 0},
                                        "Knowledge & Thinking": {sum: 0, count: 0},
                                        "Oral Communication": {sum: 0, count: 0},
                                        "Written Communication": {sum: 0, count: 0}
                                    };

                                    await $.each(final_objectives, (i, score) => {
                                        if (targets.hasOwnProperty(score.target)) {
                                            targets[score.target].sum += score.score;
                                            targets[score.target].count++;
                                        }
                                    });

                                    await $.each(Object.keys(targets), async (i, target) => {
                                        const average = targets[target].count > 0 ? targets[target].sum / targets[target].count : 0;
                                        await $("#averages").append(`
                                            <div id="${target.toLocaleLowerCase()}" class="bg-blue-600 pop-in py-10 rounded flex flex-col justify-center items-center gap-5">
                                                <span class="font-black text-2xl">${Math.round(average)}%</span>
                                                <h2 class="font-bold text-1xl">${target}</h2>
                                            </div>
                                        `)
                                    });
                                           
                                }
                            });
                        }
                    })
                }
            })
            */

            /**
             
                <div id="topnav" class="fixed top-0 left-0 right-0 hidden">
                    <div class="py-5 px-5 bg-blue-700">
                        <div class="flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8">
                            <a class="cursor-pointer flex justify-center items-center w-4">
                                <span class="font-black material-symbols-outlined">
                                    arrow_back_ios_new
                                </span>
                            </a>
                            <span class="font-black text-2xl">Overview</span>
                            <a class="cursor-pointer flex justify-center items-center">
                                <span class="font-black material-symbols-outlined">
                                    refresh
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

             */

            /*
            // Get course order
            <div class="flex flex-col gap-5 pl-5 pr-5 sm:pl-0 sm:pr-0" id="courses"></div>

            await $.ajax({
                url: api(`/cmd/getresource?_token=${JSON.parse(localStorage.getItem("session")).token}&entityid=${JSON.parse(localStorage.getItem("session")).user.userid}&path=Assets%2FBuzzCourseCardSettings.json`),
                method: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: async function (orders) {
                    // Get courses
                    await $.ajax({
                        url: api(`/cmd/listuserenrollments?_token=${JSON.parse(localStorage.getItem("session")).token}&userid=${JSON.parse(localStorage.getItem("session")).user.userid}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: async function (courses) {
                            let userlist = [];
                            await $.each(courses.response.enrollments.enrollment, function (i, course) {
                                userlist.push({
                                    order: orders[course.id].order,
                                    id: course.id,
                                    courseid: course.courseid,
                                    title: course.course.title.trim(),
                                    start: (new Date(course.course.startdate).getMonth() + 1) + '/' + (new Date(course.course.startdate).getDate()) + '/' + (new Date(course.course.startdate).getFullYear() % 100),
                                    end: (new Date(course.course.enddate).getMonth() + 1) + '/' + (new Date(course.course.enddate).getDate()) + '/' + (new Date(course.course.enddate).getFullYear() % 100),
                                    scored: Math.round((course.enrollmentmetrics.achieved / course.enrollmentmetrics.possible) * 100)
                                })
                            })


                            // Sort and append
                            userlist = userlist.sort((first, last) => first.order - last.order);
                            await $.each(userlist, function (i, course) {
                                let score_color;
                            
                                if (isNaN(course.scored))
                                    score_color = "";
                                else if (course.scored >= 80)
                                    score_color = "text-green-500";
                                else if (course.scored < 80 && course.scored > 60) {
                                    $("body").css("--warn-color", "#fdae61");
                                    score_color = "text-yellow-500";
                                }
                                else if (course.scored < 60)
                                    score_color = "text-red-500";

                                $("#courses").append(`
                                    <div class="py-10 flex flex-col justify-between container mx-auto px-4 sm:px-6 lg:px-8 bg-zinc-800 rounded-xl cursor-pointer" id="${course.courseid}">
                                        <h1 class="text-2xl font-bold leading-normal tracking-wider">${course.title}</h1>
                                        <span class="font-bold text-gray-300">${course.start} - ${course.end}</span>
                                        <div class="font-black ${score_color}">${isNaN(course.scored) ? "--" : `${course.scored}%`}</div>
                                    </div>
                                `)
                            })                            
                        }
                    })
                }
            })
            */