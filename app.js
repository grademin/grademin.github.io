(async function () {
    "use strict";

    
    // inital


    const api = (_t) => { return `https://api.agilixbuzz.com${_t}` };


    // When the user has logged in, or the user somehow removed `ul`, this will make sure they
    // end up on some sort of default page.
    if (localStorage.getItem("ul") == undefined && localStorage.getItem("session") != undefined)
        localStorage.setItem("ul", "courses");

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
        case "login": // First page that anyone sees
            let remembered_details = "", hide_inputs = "";
            if (localStorage.getItem("remembered") != undefined) {
                remembered_details = `
                    <div class="mt-1 mb-5 block w-full px-5 py-4 border-4 border-blue-700 rounded-md shadow-sm focus:outline-none sm:text-sm">
                        <div class="flex flex-row gap-5 items-center select-none">
                            <div class="flex justify-between items-center">
                                <div class="rounded-full border-[6px] border-blue-500 bg-blue-600 h-16 w-16 flex items-center justify-center text-2xl sm:text-2xl font-bold uppercase">
                                    ${JSON.parse(localStorage.getItem("remembered")).firstname.charAt(0).toUpperCase()}
                                </div>                    
                            </div>
                            <div class="flex flex-col">
                                <h1 class="font-black leading-wider tracking-tight text-2xl">${JSON.parse(localStorage.getItem("remembered")).fullname}</h1>
                                <span class="font-bold text-1xl text-gray-300">${JSON.parse(localStorage.getItem("remembered")).username}</span>    
                            </div>
                        </div>
                    </div>
                `;
                hide_inputs = "hidden";
            }

            await $("#root").html(`
                <div class="h-screen flex justify-center ">
                    <div class="p-8 rounded-lg container mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex flex-col mb-10">
                            <h2 class="text-7xl tracking-tight leading-wider font-black text-blue-700">Proview</h2>
                            <span class="text-2xl tracking-wide font-bold">Log In</span>
                        </div>
                        <form class="mt-16">
                            ${remembered_details}
                            <div class="flex mb-4 space-x-2 ${hide_inputs}">
                                <div class="flex-1">
                                    <input style="background: transparent;" placeholder="District / Website" type="text" id="district" name="userspace" class="caret-blue-700 mt-1 block w-full px-5 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                                </div>
                                <div class="flex-1">
                                    <input style="background: transparent;" placeholder="Username" type="text" id="username" name="username" class="caret-blue-700 mt-1 block w-full px-5 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                                </div>
                            </div>
                            <div class="mb-6">
                                <input style="background: transparent;" placeholder="Password" type="password" id="password" name="password" class="caret-blue-700 mt-1 block w-full px-5 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm">
                            </div>
                            <div class="fixed bottom-0 left-0 right-0 container mx-auto px-4 sm:px-6 lg:px-8 mb-5">
                                <button type="submit" class="w-full px-4 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Log in</button>
                            </div>        
                        </form>
                    </div>
                </div>
            `).submit(async function (event) {
                event.preventDefault();

                if ((($("#district").val() != "" && $("#username").val() != "" && $("#password").val() != "") && localStorage.getItem("remembered") == undefined) || $("#password").val() != "" && localStorage.getItem("remembered") != undefined) {
                    $("#overlays").append(`
                        <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
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
                                runtime("courses")
                            }
                        }
                    });
                }
            })
            break;
        case "courses": // If you login, this is where you end up
            $("#overlays").append(`
                <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div class="loader"><div></div><div></div><div></div><div></div></div>
                </div>
            `);

            await $("#root").html(`
                <div id="topnav" class="fixed top-0 left-0 right-0 hidden">
                    <div class="py-5 px-5 bg-blue-700">
                        <div class="flex justify-center items-center container mx-auto px-4 sm:px-6 lg:px-8">
                            <span class="font-black text-[18px] sm:text-2xl">Home</span>
                        </div>
                    </div>
                </div>
                <div id="toptitle" class="bg-blue-700">
                    <div class="py-10 flex flex-row gap-10 justify-between container mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex flex-col gap-1 justify-center">
                            <h1 class="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-normal mb-0">Welcome, ${JSON.parse(localStorage.getItem("session")).user.fullname}</h1>
                            <div class="text-1xl sm:text-2xl font-bold">${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getDate()}, ${new Date().getFullYear()}</div>    
                        </div>
                        <div class="flex justify-between items-center select-none cursor-pointer">
                            <div id="profile" class="rounded-full bg-blue-600 border-8 hover:border-blue-400 active:border-blue-600 border-blue-500 h-[4.5rem] w-[4.5rem] sm:h-24 sm:w-24 flex items-center justify-center text-2xl sm:text-4xl font-bold uppercase">
                                ${JSON.parse(localStorage.getItem("session")).user.firstname.charAt(0).toUpperCase()}
                            </div>                    
                        </div>
                    </div>
                </div>
                <div class="mt-14 mb-28 flex flex-col gap-5">
                    <div class="py-10 flex flex-col justify-between container mx-auto px-4 sm:px-6 lg:px-8 bg-zinc-800 rounded-xl">
                        <h1 class="font-black text-2xl sm:text-4xl">Averages</h1>
                        <span>These are your averages from <b>Agency, Collab, K&T, Oral and Comms</b>.
                        <div id="averages" class="mt-10 grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 select-none">
                            
                        </div>
                    </div>
                </div>

                <div id="bottomnav" class="fixed bottom-0 left-0 right-0">
                    <div class="bg-zinc-800">
                        <div class="flex flex-row justify-between items-center">
                            <a class="cursor-pointer select-none flex justify-center items-center hover:bg-blue-700 active:bg-blue-600 px-10 py-5 w-full">
                                <span class="font-black material-symbols-outlined">
                                    home
                                </span>
                            </a>
                            <a class="cursor-pointer select-none flex justify-center items-center hover:bg-blue-700 active:bg-blue-600 px-10 py-5 w-full">
                                <span class="font-black material-symbols-outlined">
                                    check_circle
                                </span>
                            </a>
                            <a id="profile" class="cursor-pointer select-none flex justify-center items-center hover:bg-blue-700 active:bg-blue-600 px-10 py-5 w-full">
                                <span class="font-black material-symbols-outlined">
                                    settings
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            `).on("click", function (event) {
                if ($(event.target).attr("id") == "profile")
                    runtime("settings");
            })
            
            // Manages when we scroll
            $(window).scroll(function() {
                if ($(this).scrollTop() > $("#toptitle").offset().top + $("#toptitle").outerHeight() - 80 || $(this).scrollTop() < $("#toptitle").offset().top - $(window).height()) {
                    $("#topnav").fadeIn(100);
                } else {
                    $("#topnav").fadeOut(200);
                }
            });

            // getting objective averages needs api `getobjectivelist` and `listuserenrollments`
            await $.ajax({
                url: api(`/dlap.ashx?cmd=getdomainsettings&domainid=//${JSON.parse(localStorage.getItem("session")).user.userspace}&path=public/shadow/app/buzz/settings.xml&includesource=true`),
                method: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: async (settings) => {
                    let guids = "", guids_with_ids = [];
                    await $.each(settings.response.settings["scoring-objective-list"]["scoring-objective"], (i, objective) => {
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
                            await $.each(objectives.response.objectives.objective, (i, objective) => {
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
                                    await $.each(courses.response.enrollments.enrollment, async (i, course) => {
                                        try {
                                        await $.each(course.enrollmentmetrics.objectivescores.objectivescore, (i, score) => {
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
                                                        "score": Math.round((g.achieved / g.possible) * 100)
                                                    })
                                            })
                                        })
                                    } catch (e) {}

                                    $.each(final_objectives, (i, score) => {
                                        // Agency
                                        {
                                            if (score.target == "Agency") {
                                                //score.map()
                                            }

                                            /*if (!$("#agency").length)
                                                $("#averages").append(`
                                                    <div id="agency" class="bg-blue-600 pop-in py-10 rounded flex flex-col justify-center items-center gap-5">
                                                        <span class="font-black text-2xl">${agency_average}</span>
                                                        <h2 class="font-bold text-1xl">Agency</h2>
                                                    </div>
                                                `)*/
                                        }
                                    })                                    
                                }
                            });
                        }
                    })
                }
            })


            /**
             
                <div id="topnav" class="fixed top-0 left-0 right-0 hidden">
                    <div class="py-5 px-5 bg-blue-700">
                        <div class="flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8">
                            <a class="cursor-pointer select-none flex justify-center items-center w-4">
                                <span class="font-black material-symbols-outlined">
                                    arrow_back_ios_new
                                </span>
                            </a>
                            <span class="font-black text-2xl">Overview</span>
                            <a class="cursor-pointer select-none flex justify-center items-center">
                                <span class="font-black material-symbols-outlined">
                                    refresh
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

             */

            /**
                        <div class="bg-blue-600 pop-in py-10 rounded flex flex-col justify-center items-center gap-5">
                            <span class="font-black text-2xl">90%</span>
                            <h2 class="font-bold text-1xl">Agency</h2>
                        </div>
                        <div class="bg-blue-600 pop-in py-10 rounded flex flex-col justify-center items-center gap-5">
                            <span class="font-black text-2xl">79%</span>
                            <h2 class="font-bold text-1xl">Collaboration</h2>
                        </div>
                        <div class="bg-blue-600 pop-in py-10 rounded flex flex-col justify-center items-center gap-5">
                            <span class="font-black text-2xl">98%</span>
                            <h2 class="font-bold text-1xl">Knowledge & Thinking</h2>
                        </div>
                        <div class="bg-blue-600 pop-in py-10 rounded flex flex-col justify-center items-center gap-5">
                            <span class="font-black text-2xl">87%</span>
                            <h2 class="font-bold text-1xl">Oral Communication</h2>
                        </div>
                        <div class="bg-blue-600 pop-in py-10 rounded flex flex-col justify-center items-center gap-5">
                            <span class="font-black text-2xl">97%</span>
                            <h2 class="font-bold text-1xl">Written Communication</h2>
                        </div>
             */

            

            $("#overlays").empty();

            // Get courses & append

            /*

            <div class="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4" id="courses"></div>


            // Get course order
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
                                    <a class="bg-gray-300 p-4 rounded shadow cursor-pointer text-black flex flex-col justify-between gap-10 select-none" courseid="${course.courseid}" uid="${course.id}">
                                        <div>
                                            <h2 class="text-2xl">${course.title}</h2>
                                            <span>${course.start} - ${course.end}</span>
                                        </div>
                                        <div class="font-black ${score_color}">${isNaN(course.scored) ? "--" : `${course.scored}%`}</div>
                                    </a>
                                `)
                            })

                            // Remove overlay
                            $("#overlays").empty();
                        }
                    })
                }
            })
            */

            break;
        case "settings":
            await $("#root").html(`
                <button id="logout" class="w-full px-4 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Logout</button>
            `).on("click", function (event) {
                if ($(event.target).attr("id") == "logout") {
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
                }
            });
            break;
        }
    }
})();