(async function () {
    "use strict";

    // functions

    function imageValid(url, callback) {
        var img = new Image();
        img.onload = function() {callback(true, url);};
        img.onerror = function() {callback(false, url);};
        img.src = url;
    }

    function urlRedirects(url, callback) {
        fetch(url, {
            method: "get",
            redirect: "follow", // This instructs fetch to follow redirects
        })
        .then(response => {
            callback(response.url, response.ok);
        })
        .catch(error => {
            callback(url, false);
        });
    }


    // inital


    const api = (_t) => { return `https://api.agilixbuzz.com${_t}` };
    
    // When the user has logged in, or the user somehow removed `ul`, this will make sure they
    // end up on some sort of default page.
    if (localStorage.getItem("ul") == undefined && localStorage.getItem("session") != undefined)
        localStorage.setItem("ul", "overview");

    // If `session` or `ul` are undefined, then set page to login.
    if (localStorage.getItem("ul") == undefined || (localStorage.getItem("ul") != undefined && localStorage.getItem("session") == undefined))
        localStorage.setItem("ul", "login")
    
    if (localStorage.getItem("settings") == undefined)
        localStorage.setItem("settings", JSON.stringify([]));

    await runtime(localStorage.getItem("ul"));

    /**
     * Handles every section of Proview.
     */
    async function runtime(ul) {
        document.title = `${ul.charAt(0).toUpperCase() + ul.slice(1)}`;

        localStorage.setItem("ul", ul);
        $("#root").attr("ul", ul);

        $("head meta[content=\"#18181b\"]").remove();
        $("head").append(`
            <meta name="theme-color" content="#1d4ed8">
        `)

        // bases
        $("#overlays").empty();
        $("*").off() // reset events

        // Switch between each page
        switch (ul) {
            case "login":
                $("head meta[content=\"#1d4ed8\"]").remove();
                $("head").append(`
                    <meta name="theme-color" content="#18181b">
                `)

                let remembered_details = "", hide_inputs = "";
                if (localStorage.getItem("remembered") != undefined) {
                    remembered_details = `
                        <div class="mt-1 mb-5 block w-full px-5 py-4 border-4 border-blue-700 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                            <div class="flex flex-row gap-5 items-center">
                                <div class="flex justify-between items-center">
                                    <div class="rounded-full border-[6px] border-blue-500 bg-blue-600 ${localStorage.getItem("profile_picture").includes("gravatar") ? "" : `bg-[url('${localStorage.getItem("profile_picture")}')] bg-cover`} h-16 w-16 flex items-center justify-center text-2xl sm:text-2xl font-bold uppercase">
                                        ${localStorage.getItem("profile_picture").includes("gravatar") ? JSON.parse(localStorage.getItem("remembered")).firstname.charAt(0).toUpperCase() : ""}
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
                    <div class="relative h-[75svh] h-[75vh] flex justify-center">
                        <div class="pt-20 rounded-lg container mx-auto px-4">
                            <div class="flex flex-col mb-10">
                                <h2 class="text-7xl tracking-tight leading-wider font-black text-blue-700">Proview</h2>
                                <span class="text-2xl tracking-wide font-bold">Log In</span>
                            </div>
                            <form class="mt-16 flex flex-col justify-between h-full">
                                <div>
                                    ${remembered_details}
                                    <div class="flex mb-4 space-x-2 ${hide_inputs}">
                                        <div class="flex-1">
                                            <input style="background: transparent;" placeholder="District / Website" type="text" id="district" name="userspace" class="caret-blue-700 font-bold mt-1 block w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                                        </div>
                                        <div class="flex-1">
                                            <input style="background: transparent;" placeholder="Username" type="text" id="username" name="username" class="caret-blue-700 font-bold mt-1 block w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                                        </div>
                                    </div>
                                    <div class="mb-6">
                                        <input style="background: transparent;" placeholder="Password" type="password" id="password" name="password" class="caret-blue-700 font-bold mt-1 block w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                                    </div>
                                </div>
                                <div class="container mx-auto">
                                    <button type="submit" class="w-full px-4 py-2 bg-blue-700 transition text-white font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Log in</button>
                                </div>        
                            </form>
                        </div>
                    </div>
                `).submit(async function (event) {
                    event.preventDefault();

                    if ((($("#district").val() != "" && $("#username").val() != "" && $("#password").val() != "") && localStorage.getItem("remembered") == undefined) || $("#password").val() != "" && localStorage.getItem("remembered") != undefined) {
                        $("#overlays").append(`
                            <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
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
                                    
                                    // Get users profile picture (if none is found then we set this as "")
                                    let check_for_image = setInterval(function () {
                                        if (localStorage.getItem("session") != undefined) {
                                            imageValid(api(`/cmd/getprofilepicture?_token=${JSON.parse(localStorage.getItem("session")).token}&entityid=${JSON.parse(localStorage.getItem("session")).user.userid}`), function (avatar_exists, url) {
                                                if (avatar_exists) {
                                                    urlRedirects(url, function (newUrl, valid) {
                                                        if (valid) {
                                                            localStorage.setItem("profile_picture", newUrl)
                                                        } else {
                                                            // It is a CORS blocked url, fallback to echo url
                                                            localStorage.setItem("profile_picture", newUrl);
                                                        }

                                                        clearInterval(check_for_image);
                                                        runtime("overview");
                                                    })
                                                }
                                            });
                                        }
                                        else
                                            localStorage.setItem("profile_picture", "gravatar")
                                    }, 200)
                                }
                            }
                        });
                    }
                })
                break;
            case "overview":
                $("#overlays").append(`
                    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div class="loader"><div></div><div></div><div></div><div></div></div>
                    </div>
                `);

                await $("#root").html(`
                    <div id="topnav" class="fixed top-0 left-0 right-0 hidden z-50">
                        <div class="flex flex-row py-2 px-4 bg-blue-700">
                            <div class="flex justify-center items-center container mx-auto px-4">
                                <span class="font-black text-[20px]">Overview</span>
                            </div>
                        </div>
                    </div>

                    <div id="toptitle" class="bg-blue-700">
                        <div class="flex flex-row gap-10 justify-between container mx-auto py-10 px-4">
                            <div class="flex flex-col gap-1 justify-center">
                                <h1 class="text-5xl font-bold tracking-tight mb-0">Overview</h1>
                                <div class="text-[20px] font-bold">${new Date().toLocaleString("default", { month: "long" })} ${new Date().getDate()}, ${new Date().getFullYear()}</div>    
                            </div>
                            <div class="flex justify-between items-end cursor-pointer">
                                <div id="profile" class="rounded-full transition bg-blue-600 ${localStorage.getItem("profile_picture").includes("gravatar") ? "" : `bg-[url('${localStorage.getItem("profile_picture")}')] bg-cover`} border-[6px] hover:border-blue-400 active:border-blue-600 border-blue-500 h-[4.5rem] w-[4.5rem] flex items-center justify-center text-2xl font-bold uppercase">
                                    ${localStorage.getItem("profile_picture").includes("gravatar") ? JSON.parse(localStorage.getItem("session")).user.firstname.charAt(0).toUpperCase() : ""}
                                </div>                    
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-5 pt-10 mb-10 container mx-auto py-10 px-4">
                        <div id="what_is_this" class="flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-5 px-3 border-4 border-blue-700">
                            <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                                <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded">
                                        help
                                    </span>
                                </div>
                                <div class="flex flex-col">
                                    <h1 class="text-[22px] font-bold">What is this</h1>
                                    <span class="font-bold text-[15px] text-zinc-400">Why was this was created</span>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <span class="material-symbols-rounded">
                                    arrow_forward_ios
                                </span>
                            </div>
                        </div>
                        <div id="courses" class="relative relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                            <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                                <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded">
                                        assignment
                                    </span>
                                </div>
                                <div class="flex flex-col">
                                    <h1 class="text-[22px] font-bold">Courses</h1>
                                    <span class="font-bold text-[15px] text-zinc-400">See your current courses</span>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <span class="material-symbols-rounded">
                                    arrow_forward_ios
                                </span>
                            </div>
                        </div>
                        <div id="averages" class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                            <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                                <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded">
                                        show_chart
                                    </span>
                                </div>
                                <div class="flex flex-col">
                                    <h1 class="text-[22px] font-bold">Averages</h1>
                                    <span class="font-bold text-[15px] text-zinc-400">See your objective averages</span>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <span class="material-symbols-rounded">
                                    arrow_forward_ios
                                </span>
                            </div>
                        </div>
                        <div id="todo" class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                            <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                                <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded">
                                        task
                                    </span>
                                </div>
                                <div class="flex flex-col">
                                    <h1 class="text-[22px] font-bold">Todo List</h1>
                                    <span class="font-bold text-[15px] text-zinc-400">See due or past due work</span>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <span class="material-symbols-rounded">
                                    arrow_forward_ios
                                </span>
                            </div>
                        </div>
                        <div id="stream" class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                            <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                                <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded">
                                        group
                                    </span>
                                </div>
                                <div class="flex flex-col">
                                    <h1 class="text-[22px] font-bold">Activity Stream</h1>
                                    <span class="font-bold text-[15px] text-zinc-400">See your activites</span>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <span class="material-symbols-rounded">
                                    arrow_forward_ios
                                </span>
                            </div>
                        </div>
                        <div id="announcements" class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                            <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                                <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded">
                                        feedback
                                    </span>
                                </div>
                                <div class="flex flex-col">
                                    <h1 class="text-[22px] font-bold">Announcements</h1>
                                    <span class="font-bold text-[15px] text-zinc-400">See current announcements</span>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <span class="material-symbols-rounded">
                                    arrow_forward_ios
                                </span>
                            </div>
                        </div>
                        <div id="email" class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                            <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                                <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded">
                                        alternate_email
                                    </span>
                                </div>
                                <div class="flex flex-col">
                                    <h1 class="text-[22px] font-bold">Contact Teachers</h1>
                                    <span class="font-bold text-[15px] text-zinc-400">Email your teachers</span>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <span class="material-symbols-rounded">
                                    arrow_forward_ios
                                </span>
                            </div>
                        </div>
                    </div>

                    <div id="bottomnav" class="fixed bottom-0 left-0 right-0">
                        <div class="bg-zinc-800">
                            <div class="flex flex-row justify-between items-center">
                                <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                                    <span class="font-black text-blue-700 pointer-events-none material-symbols-rounded">
                                        home
                                    </span>
                                </a>
                                <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                                    <span class="material-symbols-rounded">
                                        calendar_month
                                    </span>
                                </a>
                                <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                                    <span class="font-black pointer-events-none material-symbols-rounded">
                                        description
                                    </span>
                                </a>
                                <a id="profile" class="cursor-pointer flex justify-center items-center py-3 w-full">
                                    <span class="font-black pointer-events-none material-symbols-rounded">
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
                        case "announcements":
                            runtime("announcements");
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
                                                <p>This website was created to show that <b>Echo Viewer</b> by <b>Agilix, Inc</b> could have been better. This websites design is based off <b>GradeWay</b> by <b>Srujan Mupparapu</b>, this website is not meant to infringe or plagarize his work, If it does (specifically to Srujan) please send an issue <a class="text-blue-700 hover:text-blue-600 cursor-pointer transition" goto="https://github.com/wo-r-professional/proview/issues">here</a> and I will abide to whatever you ask.</p>
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
                            
                            $("[goto]").on("click", function (event) {
                                window.open($(this).attr("goto"), "_blank")
                            })

                            break;
                    }
                })

                if ($(window).scrollTop() > $("#toptitle").offset().top + $("#toptitle").outerHeight() - 50 || $(window).scrollTop() < $("#toptitle").offset().top - $(window).height()) {
                    $("#topnav").fadeIn(0);
                } else {
                    $("#topnav").fadeOut(0);
                }
                
                // Manages when we scroll
                $(window).scroll(function() {
                    if ($(this).scrollTop() > $("#toptitle").offset().top + $("#toptitle").outerHeight() - 50 || $(this).scrollTop() < $("#toptitle").offset().top - $(window).height()) {
                        $("#topnav").fadeIn(50);
                    } else {
                        $("#topnav").fadeOut(100);
                    }
                });

                // Announcement viewed count
                await $.ajax({
                    url: api(`/cmd/getuserannouncementlist?_token=${JSON.parse(localStorage.getItem("session")).token}&userid=${JSON.parse(localStorage.getItem("session")).user.userid}&daysactivepastend=14`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: async function (communications) {
                        let counted = 0;
                        await $.each(communications.response.announcements.announcement, function (i, communication) {
                            if (!communication.viewed)
                                counted++
                        })
                        
                        if (counted != 0) {
                            $("#announcements").append(`
                                <div class="absolute inline-flex right-0 top-0 h-8 w-8 -m-2 rounded-full bg-blue-700 opacity-75 justify-center items-center">
                                    <span>${counted}</span>
                                </div> 
                            `)
                        }
                    }
                })

                $("#overlays").empty();

                break;
            case "courses":
                runtime("overview")
                break;
            case "averages":
                $("#overlays").append(`
                    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div class="loader"><div></div><div></div><div></div><div></div></div>
                    </div>
                `);

                $("#root").html(`
                    <div id="topnav" class="fixed top-0 left-0 right-0 hidden z-50">
                        <div class="flex flex-row py-2 bg-blue-700">
                            <div class="flex justify-between items-center container mx-auto px-4">
                                <a class="cursor-pointer flex justify-center items-center w-0">
                                    <span id="back" class="font-black w-0 text-1xl material-symbols-rounded">
                                        arrow_back_ios_new
                                    </span>
                                </a>
                                <span class="font-black text-[20px]">Averages</span>
                                <a class="cursor-pointer flex justify-center items-center">
                                    <span id="reload" class="font-black material-symbols-rounded">
                                        refresh
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div id="toptitle">
                        <div class="py-5 bg-blue-700">
                            <div class="flex justify-between items-center container mx-auto px-4">
                                <a class="cursor-pointer flex justify-center items-center w-0">
                                    <span id="back" class="font-black w-0 text-1xl material-symbols-rounded">
                                        arrow_back_ios_new
                                    </span>
                                </a>
                                <span class="font-black text-[20px]">Averages</span>
                                <a class="cursor-pointer flex justify-center items-center">
                                    <span id="reload" class="font-black material-symbols-rounded">
                                        refresh
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-5 pt-10 mb-10 container mx-auto py-10 px-4">
                        <div class="relative container mx-auto bg-zinc-800 rounded-xl py-4 px-3">
                            <h1 class="flex text-4xl font-black justify-center items-center">Classwide Averages</h1>
                            <div id="averages" class="mt-10 grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5"></div>
                        </div>
                    </div>


                `).on("click", function (event) {
                    switch ($(event.target).attr("id")) {
                        case "back":
                            runtime("overview");
                            break;
                        case "reload":
                            // TODO:
                            break;
                    }
                })

                if ($(window).scrollTop() > $("#toptitle").offset().top + $("#toptitle").outerHeight() - 50 || $(window).scrollTop() < $("#toptitle").offset().top - $(window).height()) {
                    $("#topnav").fadeIn(0);
                } else {
                    $("#topnav").fadeOut(0);
                }

                // Manages when we scroll
                $(window).scroll(function() {
                    if ($(this).scrollTop() > $("#toptitle").offset().top + $("#toptitle").outerHeight() - 50 || $(this).scrollTop() < $("#toptitle").offset().top - $(window).height()) {
                        $("#topnav").fadeIn(50);
                    } else {
                        $("#topnav").fadeOut(100);
                    }
                });

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

                                        // TODO:
                                        await $.each(Object.keys(targets), async (i, target) => {
                                            const average = targets[target].count > 0 ? targets[target].sum / targets[target].count : 0;
                                            await $("#averages").append(`
                                                <div id="${target.toLocaleLowerCase()}" class="bg-blue-700 py-10 rounded flex flex-col justify-center items-center gap-5">
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

                $("#overlays").empty();

                break;
            case "announcements":
                $("#overlays").append(`
                    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div class="loader"><div></div><div></div><div></div><div></div></div>
                    </div>
                `);
                
                await $("#root").html(`
                    <div id="topnav" class="fixed top-0 left-0 right-0 hidden z-50">
                        <div class="flex flex-row py-2 bg-blue-700">
                            <div class="flex justify-between items-center container mx-auto px-4">
                                <a class="cursor-pointer flex justify-center items-center w-0">
                                    <span id="back" class="font-black w-0 text-1xl material-symbols-rounded">
                                        arrow_back_ios_new
                                    </span>
                                </a>
                                <span class="font-black text-[20px]">Announcements</span>
                                <a class="cursor-pointer flex justify-center items-center">
                                    <span id="reload"  class="font-black material-symbols-rounded">
                                        refresh
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div id="toptitle">
                        <div class="py-5 bg-blue-700">
                            <div class="flex justify-between items-center container mx-auto px-4">
                                <a class="cursor-pointer flex justify-center items-center w-0">
                                    <span id="back" class="font-black w-0 text-1xl material-symbols-rounded">
                                        arrow_back_ios_new
                                    </span>
                                </a>
                                <span class="font-black text-[20px]">Announcements</span>
                                <a class="cursor-pointer flex justify-center items-center">
                                    <span id="reload" class="font-black material-symbols-rounded">
                                        refresh
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-5 pt-10 mb-10 container mx-auto py-10 px-4">
                        <div id="communication" class="flex flex-col gap-5">
                        </div>
                    </div>

                    <div id="bottomnav" class="fixed bottom-0 left-0 right-0">
                        <div class="bg-zinc-800">
                            <div class="flex flex-row justify-between items-center">
                                <a id="overview" class="cursor-pointer flex justify-center items-center py-3 w-full">
                                    <span class="font-black pointer-events-none material-symbols-rounded">
                                        home
                                    </span>
                                </a>
                                <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                                    <span class="material-symbols-rounded">
                                        calendar_month
                                    </span>
                                </a>
                                <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                                    <span class="font-black pointer-events-none material-symbols-rounded">
                                        description
                                    </span>
                                </a>
                                <a id="profile" class="cursor-pointer flex justify-center items-center py-3 w-full">
                                    <span class="font-black pointer-events-none material-symbols-rounded">
                                        settings
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                `).on("click", async function (event) {
                    switch ($(event.target).attr("id")) {
                        case "back":
                            runtime("overview");
                            break;
                        case "semiback":
                            $("#communication").empty();

                            await $.ajax({
                                url: api(`/cmd/getuserannouncementlist?_token=${JSON.parse(localStorage.getItem("session")).token}&userid=${JSON.parse(localStorage.getItem("session")).user.userid}&daysactivepastend=14`),
                                method: "GET",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                success: function (communications) {
                                    communications.response.announcements.announcement.sort((a, b) => new Date(b.startdate) - new Date(a.startdate));
                                    $("#communication").empty(); // tuff
                                    $.each(communications.response.announcements.announcement, function (i, communication) {
                                        $("#communication").append(`
                                            <div uid="${communication.entityid}" path="${communication.path}" class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                                                <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                                                    <div class="flex flex-col">
                                                        <h1 class="text-[22px] font-bold">${communication.title}</h1>
                                                    </div>
                                                </div>
                                                <div class="flex justify-center items-center pointer-events-none">
                                                    <span class="material-symbols-rounded">
                                                        arrow_forward_ios
                                                    </span>
                                                </div>
                                                ${communication.viewed ? "" : `<div class="absolute pointer-events-none inline-flex right-0 top-0 h-4 w-4 -m-1 animate-ping duration-700 rounded-full bg-blue-700 opacity-75 justify-center items-center"></div>`}
                                            </div>
                                        `)
                                    })
                                }
                            })
                            
                            $("#communication").show();
                            $("#toptitle #reload, #topnav #reload").removeClass("invisible")
                            $("#toptitle, #topnav").find("#semiback").attr("id", "back");
                            $("#current_communication").remove();
                            break;
                        case "overview":
                            runtime("overview");
                            break;
                        case "profile":
                            runtime("settings");
                            break;
                        case "reload":
                            console.log("realoded")
                            $("#overlays").append(`
                                <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                                    <div class="loader"><div></div><div></div><div></div><div></div></div>
                                </div>
                            `);

                            $("#communication").empty();
                            await $.ajax({
                                url: api(`/cmd/getuserannouncementlist?_token=${JSON.parse(localStorage.getItem("session")).token}&userid=${JSON.parse(localStorage.getItem("session")).user.userid}&daysactivepastend=14`),
                                method: "GET",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                success: function (communications) {
                                    communications.response.announcements.announcement.sort((a, b) => new Date(b.startdate) - new Date(a.startdate));
                                    $.each(communications.response.announcements.announcement, function (i, communication) {
                                        $("#communication").append(`
                                            <div uid="${communication.entityid}" path="${communication.path}" class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                                                <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                                                    <div class="flex flex-col">
                                                        <h1 class="text-[22px] font-bold">${communication.title}</h1>
                                                    </div>
                                                </div>
                                                <div class="flex justify-center items-center pointer-events-none">
                                                    <span class="material-symbols-rounded">
                                                        arrow_forward_ios
                                                    </span>
                                                </div>
                                                ${communication.viewed ? "" : `<div class="absolute pointer-events-none inline-flex right-0 top-0 h-4 w-4 -m-1 animate-ping duration-700 rounded-full bg-blue-700 opacity-75 justify-center items-center"></div>`}
                                            </div>
                                        `)
                                    })
                                }
                            })

                            $("#overlays").empty();
                            break;
                    }

                    if ($(event.target).attr("uid") != undefined) {
                        $("#overlays").append(`
                            <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                                <div class="loader"><div></div><div></div><div></div><div></div></div>
                            </div>
                        `);

                        $("#communication").hide();
                        
                        await $.ajax({
                            url: api(`/cmd/getannouncementinfo?_token=${JSON.parse(localStorage.getItem("session")).token}&packagetype=data&entityid=${JSON.parse(localStorage.getItem("session")).user.domainid}&path=${$(event.target).attr("path")}`),
                            method: "GET",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: async (comminfo) => {
                                await $.ajax({
                                    url: api(`/cmd/getannouncement?_token=${JSON.parse(localStorage.getItem("session")).token}&packagetype=data&entityid=${JSON.parse(localStorage.getItem("session")).user.domainid}&path=${$(event.target).attr("path")}`),
                                    method: "GET",
                                    dataType: "json",
                                    contentType: "application/json; charset=utf-8",
                                    success: (commdetails) => {
                                        $("#toptitle #reload, #topnav #reload").addClass("invisible")
                                        $("#toptitle, #topnav").find("#back").attr("id", "semiback");
                                        $("#communication").parent().append(`
                                            <div id="current_communication" class="relative flex flex-col justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                                                <div class="flex flex-col border-b-[2px] border-zinc-700 pb-3">
                                                    <h1 class="text-[22px] font-bold">${commdetails.announcement.title}</h1>
                                                    <span class="font-bold text-[15px] text-zinc-400">Written ${new Date(commdetails.announcement.startdate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} by ${comminfo.response.announcement.creator.firstname} ${comminfo.response.announcement.creator.lastname}</span>
                                                </div>
                                                <div class="flex flex-col pt-3">
                                                    ${commdetails.announcement.body.$xml.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/style\s*=\s*["'][^"']*["']/gi, '').replace(/<img/g, "<img class=\"rounded-xl\"").replace("href", "goto").replace(/<a/g, `<a class="text-blue-700 hover:text-blue-600 cursor-pointer transition"`)}
                                                </div>
                                            </div>
                                        `)

                                        $("[goto]").on("click", function (event) {
                                            window.open($(this).attr("goto"), "_blank")
                                        })

                                        // They viewed so get rid of the viewed state
                                        $.ajax({
                                            url: api(`/cmd/updateannouncementviewed?_token=${JSON.parse(localStorage.getItem("session")).token}`),
                                            method: "POST",
                                            dataType: "json",
                                            contentType: "application/json; charset=utf-8",
                                            data: JSON.stringify({"requests": {
                                                announcement: [{
                                                    entityid: comminfo.response.announcement.entityid,
                                                    path: comminfo.response.announcement.path,
                                                    viewed: true
                                                }]
                                            }})
                                        })
                                    }
                                })
                            }
                        })

                        $("#overlays").empty();
                    }
                })

                if ($(window).scrollTop() > $("#toptitle").offset().top + $("#toptitle").outerHeight() - 50 || $(window).scrollTop() < $("#toptitle").offset().top - $(window).height()) {
                    $("#topnav").fadeIn(0);
                } else {
                    $("#topnav").fadeOut(0);
                }

                // Manages when we scroll
                $(window).scroll(function() {
                    if ($(this).scrollTop() > $("#toptitle").offset().top + $("#toptitle").outerHeight() - 50 || $(this).scrollTop() < $("#toptitle").offset().top - $(window).height()) {
                        $("#topnav").fadeIn(50);
                    } else {
                        $("#topnav").fadeOut(100);
                    }
                });

                await $.ajax({
                    url: api(`/cmd/getuserannouncementlist?_token=${JSON.parse(localStorage.getItem("session")).token}&userid=${JSON.parse(localStorage.getItem("session")).user.userid}&daysactivepastend=14`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (communications) {
                        communications.response.announcements.announcement.sort((a, b) => new Date(b.startdate) - new Date(a.startdate));
                        $.each(communications.response.announcements.announcement, function (i, communication) {
                            $("#communication").append(`
                                <div uid="${communication.entityid}" path="${communication.path}" class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                                        <div class="flex flex-col">
                                            <h1 class="text-[22px] font-bold">${communication.title}</h1>
                                        </div>
                                    </div>
                                    <div class="flex justify-center items-center pointer-events-none">
                                        <span class="material-symbols-rounded">
                                            arrow_forward_ios
                                        </span>
                                    </div>
                                    ${communication.viewed ? "" : `<div class="absolute pointer-events-none inline-flex right-0 top-0 h-4 w-4 -m-1 animate-ping duration-700 rounded-full bg-blue-700 opacity-75 justify-center items-center"></div>`}
                                </div>
                            `)
                        })
                    }
                })

                $("#overlays").empty();

                break;
            case "settings":
                $("#overlays").append(`
                    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div class="loader"><div></div><div></div><div></div><div></div></div>
                    </div>
                `);

                await $("#root").html(`
                    <div id="topnav" class="fixed top-0 left-0 right-0 hidden z-50">
                        <div class="flex flex-row py-2 bg-blue-700">
                            <div class="flex justify-between items-center container mx-auto px-4">
                                <a class="cursor-pointer flex justify-center items-center w-0">
                                    <span id="back" class="font-black w-0 text-1xl material-symbols-rounded">
                                        arrow_back_ios_new
                                    </span>
                                </a>
                                <span class="font-black text-[20px]">Settings</span>
                                <a class="cursor-pointer flex justify-center items-center invisible"></a>
                            </div>
                        </div>
                    </div>

                    <div id="toptitle">
                        <div class="py-5 bg-blue-700">
                            <div class="flex justify-between items-center container mx-auto px-4">
                                <a class="cursor-pointer flex justify-center items-center w-0">
                                    <span id="back" class="font-black w-0 text-1xl material-symbols-rounded">
                                        arrow_back_ios_new
                                    </span>
                                </a>
                                <span class="font-black text-[20px]">Settings</span>
                                <a class="cursor-pointer flex justify-center items-center invisible"></a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex flex-col gap-5 pt-10 mb-10 container mx-auto py-10 px-4">
                        <div class="flex flex-col justify-center items-center container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                            <div class="flex justify-between items-center">
                                <div class="relative rounded-full border-[6px] border-blue-500 bg-blue-600 ${localStorage.getItem("profile_picture").includes("gravatar") ? "" : `bg-[url('${localStorage.getItem("profile_picture")}')] bg-cover`} h-20 w-20 flex items-center justify-center text-2xl sm:text-2xl font-bold uppercase">
                                    <span class="z-1">${localStorage.getItem("profile_picture").includes("gravatar") ? JSON.parse(localStorage.getItem("remembered")).firstname.charAt(0).toUpperCase() : ""}</span>
                                </div>
                            </div>
                            <h1 class="text-[28px] font-bold">${JSON.parse(localStorage.getItem("session")).user.fullname}</h1>
                            <div class="flex flex-row w-full mt-5 gap-5">
                                <div class="flex-1">
                                    <button id="change_name" class="w-full px-4 py-2 bg-blue-700 text-white transition font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Change Name</button>
                                </div>
                                <div class="flex-1">
                                    <button id="change_pfp" class="w-full px-4 py-2 bg-blue-700 text-white transition font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Change Picture</button>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                            <div id="color_coding" class="flex flex-row justify-between container mx-auto cursor-pointer border-b-[2px] border-zinc-700 pb-3">
                                <div  class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                                    <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                        <span class="text-3xl material-symbols-rounded">
                                            palette
                                        </span>
                                    </div>
                                    <div class="flex flex-col">
                                        <h1 class="text-[20px] font-bold">Color Coding</h1>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center">
                                    <input setting_name="colorcoding" type="checkbox" class="hidden">
                                    <label class="flex items-center cursor-pointer">
                                        <div class="w-[3.7rem] h-[33px] bg-zinc-600 rounded-full p-1">
                                            <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div id="include_self" class="flex flex-row justify-between container mx-auto cursor-pointer border-b-[2px] border-zinc-700  py-4">
                                <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                                    <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                        <span class="text-3xl material-symbols-rounded">
                                            group_add
                                        </span>
                                    </div>
                                    <div class="flex flex-col">
                                        <h1 class="text-[20px] font-bold">Include Self Activities</h1>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center">
                                    <input setting_name="includeself" type="checkbox" class="hidden">
                                    <label class="flex items-center cursor-pointer">
                                        <div class="w-[3.7rem] h-[33px] bg-zinc-600 rounded-full p-1">
                                            <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div id="hide_excused" class="flex flex-row justify-between container mx-auto cursor-pointer pt-3">
                                <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                                    <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                        <span class="text-3xl material-symbols-rounded">
                                            visibility
                                        </span>
                                    </div>
                                    <div class="flex flex-col">
                                        <h1 class="text-[20px] font-bold">Hide Excused Activities</h1>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center">
                                    <input setting_name="hideexcused" type="checkbox" class="hidden">
                                    <label class="flex items-center cursor-pointer">
                                        <div class="w-[3.7rem] h-[33px] bg-zinc-600 rounded-full p-1">
                                            <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                            <div id="allow_email_lti" class="flex flex-row justify-between container mx-auto cursor-pointer border-b-[2px] border-zinc-700 pb-3">
                                <div class="flex flex-row justify-center items-center gap-4 ">
                                    <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                        <span class="text-3xl material-symbols-rounded">
                                            email
                                        </span>
                                    </div>
                                    <div class="flex flex-col">
                                        <h1 class="text-[20px] font-bold">Hide Your Email From LTI</h1>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center">
                                    <input setting_name="hideltiemail" type="checkbox" class="hidden">
                                    <label class="flex items-center cursor-pointer">
                                        <div class="w-[3.7rem] h-[33px] bg-zinc-600 rounded-full p-1">
                                            <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div id="allow_name_lti" class="flex flex-row justify-between container mx-auto cursor-pointer pt-3">
                                <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                                    <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                        <span class="text-3xl material-symbols-rounded">
                                            id_card
                                        </span>
                                    </div>
                                    <div class="flex flex-col">
                                        <h1 class="text-[20px] font-bold">Hide Your Name From LTI</h1>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center">
                                    <input setting_name="hideltiname" type="checkbox" class="hidden">
                                    <label class="flex items-center cursor-pointer">
                                        <div class="w-[3.7rem] h-[33px] bg-zinc-600 rounded-full p-1">
                                            <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                            <div id="install" class="flex flex-row justify-between container mx-auto cursor-pointer">
                                <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                                    <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                        <span class="text-3xl material-symbols-rounded">
                                            install_mobile
                                        </span>
                                    </div>
                                    <div class="flex flex-col">
                                        <h1 class="text-[20px] font-bold">Run As An App</h1>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center pointer-events-none">
                                    <div class="flex justify-center items-center">
                                        <span class="text-3xl material-symbols-rounded">
                                            add
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                            <div id="echo_plus" goto="https://github.com/wo-r-professional/echo-plus" class="flex flex-row justify-between container mx-auto cursor-pointer border-b-[2px] border-zinc-700 pb-3">
                                <div class="flex flex-row justify-center items-center gap-4 ">
                                    <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                        <span class="text-3xl material-symbols-rounded">
                                            add_task
                                        </span>
                                    </div>
                                    <div class="flex flex-col">
                                        <h1 class="text-[20px] font-bold">Echo plus</h1>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center">
                                    <div class="flex justify-center items-center">
                                        <span class="text-3xl material-symbols-rounded -rotate-45">
                                            link
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div id="this_project" goto="https://github.com/wo-r-professional/proview" class="flex flex-row justify-between container mx-auto cursor-pointer pt-3">
                                <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                                    <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                        <span class="text-3xl material-symbols-rounded">
                                            verified
                                        </span>
                                    </div>
                                    <div class="flex flex-col">
                                        <h1 class="text-[20px] font-bold">Proview</h1>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center">
                                    <div class="flex justify-center items-center">
                                        <span class="text-3xl material-symbols-rounded -rotate-45">
                                            link
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button id="logout" class="w-full px-4 py-2 bg-red-600 text-white transition font-semibold rounded-xl hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50">Logout</button>
                    
                        <div class="flex flex-col justify-center items-center align-center">
                            <span class="text-sm font-bold">Proview v0.1.5</span>
                            <span class="text-sm font-bold">&copy; ${new Date().getFullYear()} Wo-r, Design from Srujan Mupparapu</span>
                            <span class="text-xs font-bold text-zinc-400">Created for the betterment of Echo!</span>
                        </div>    
                    </div>

                    <div id="bottomnav" class="fixed bottom-0 left-0 right-0">
                        <div class="bg-zinc-800">
                            <div class="flex flex-row justify-between items-center">
                                <a id="overview" class="cursor-pointer flex justify-center items-center py-3 w-full">
                                    <span class="font-black pointer-events-none material-symbols-rounded">
                                        home
                                    </span>
                                </a>
                                <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                                    <span class="material-symbols-rounded">
                                        calendar_month
                                    </span>
                                </a>
                                <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                                    <span class="font-black pointer-events-none material-symbols-rounded">
                                        description
                                    </span>
                                </a>
                                <a id="profile" class="cursor-pointer flex justify-center items-center py-3 w-full">
                                    <span class="font-black text-blue-700 pointer-events-none material-symbols-rounded">
                                        settings
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
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
                        case "overview":
                            runtime("overview");
                            break;
                        case "back":
                            runtime("overview");
                            break;
                        case "install":
                            navigator.serviceWorker.register('service-worker.js');
                            break;
                        case "change_name":
                            $("#overlays").append(`
                                <div id="overlay" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                                    <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                        <div class="bg-zinc-800 rounded-xl max-w-lg px-5 py-5 pointer-events-auto w-[25rem]">
                                            <div class="flex justify-center items-center mb-4">
                                                <h2 class="text-2xl font-bold text-white text-center">Change Name</h2>
                                            </div>
                                            <div class="text-white">
                                                <div class="flex flex-row space-x-2">
                                                    <input placeholder="New First Name" value="${JSON.parse(localStorage.getItem("session")).user.firstname}" class="caret-blue-700 flex-1 font-bold bg-zinc-700 mt-1 block w-full px-5 py-4 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                                                    <input placeholder="New Last Name" value="${JSON.parse(localStorage.getItem("session")).user.lastname}" class="caret-blue-700 flex-1 font-bold bg-zinc-700 mt-1 block w-full px-5 py-4 rounded-xl shadow-sm focus:outline-none sm:text-sm">    
                                                </div>
                                                <button id="submit" class="w-full mt-2 px-4 py-2 bg-blue-600 text-white transition font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Done</button>
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
                        case "change_pfp":
                            $("#overlays").append(`
                                <div id="overlay" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                                    <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                        <div class="bg-zinc-800 rounded-xl max-w-lg px-5 py-5 pointer-events-auto w-[25rem]">
                                            <div class="flex justify-center items-center mb-4">
                                                <h2 class="text-2xl font-bold text-white text-center">Change Profile Picture</h2>
                                            </div>
                                            <div class="text-white">
                                                <input placeholder="New Profile Picture" value="${localStorage.getItem("profile_picture").includes("gravatar") ? "" : localStorage.getItem("profile_picture")}" class="caret-blue-700 font-bold bg-zinc-700 mt-1 block w-full px-5 py-4 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                                                <button id="submit" class="w-full mt-2 px-4 py-2 bg-blue-600 text-white transition font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Done</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).on("mousedown", async function (event) {
                                switch ($(event.target).attr("id")) {
                                    case "overlay":
                                        $("#overlay").fadeOut(400, function () {
                                            $("#overlays").empty();
                                            runtime("settings"); // it's easier if its here
                                        });
                                    case "submit":
                                        if (localStorage.getItem("profile_picture") != $(event.target).parent().find("input").val())
                                            await $.ajax({
                                                url: api(`/cmd/updateusers?_token=${JSON.parse(localStorage.getItem("session")).token}`),
                                                method: "POST",
                                                dataType: "json",
                                                contentType: "application/json; charset=utf-8",
                                                data: JSON.stringify({"requests": {
                                                    "user": {
                                                        "userid": JSON.parse(localStorage.getItem("session")).user.userid,
                                                        "data": {
                                                            "profilepicture": {
                                                                "$value": $(event.target).parent().find("input").val()
                                                            }
                                                        }
                                                    }
                                                }}),
                                                success: function () {
                                                    let check_for_new_image = setInterval(function () {
                                                        // Get users profile picture (if none is found then we set this as "")
                                                        if (localStorage.getItem("profile_picture") != $(event.target).parent().find("input").val()) {
                                                            imageValid(api(`/cmd/getprofilepicture?_token=${JSON.parse(localStorage.getItem("session")).token}&entityid=${JSON.parse(localStorage.getItem("session")).user.userid}`), function (avatar_exists, url) {                                                                
                                                                urlRedirects(url, function (newUrl, valid) {
                                                                    if (valid) {
                                                                        newUrl = newUrl.includes("gravatar") ? "gravatar" : newUrl.includes("_token") ? "" : newUrl;

                                                                        if (newUrl == $(event.target).parent().find("input").val() || newUrl == "gravatar" && $(event.target).parent().find("input").val() == "") {
                                                                            localStorage.setItem("profile_picture", newUrl)
                                                                            clearInterval(check_for_new_image);

                                                                            $("#overlay").fadeOut(400, function () {
                                                                                $("#overlays").empty();
                                                                                runtime("settings")
                                                                            });
                                                                        }
                                                                    } else {
                                                                        // It is a CORS blocked url, fallback to echo url
                                                                        localStorage.setItem("profile_picture", newUrl)
                                                                        clearInterval(check_for_new_image);
                                                                        
                                                                        $("#overlay").remove();
                                                                        $("#overlays").addClass("bg-opacity-0").append(`
                                                                            <div id="error" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                                                                                <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                                                                    <div class="bg-zinc-800 rounded-xl max-w-lg px-5 py-5 pointer-events-auto w-[25rem]">
                                                                                        <div class="flex justify-center items-center mb-4">
                                                                                            <h2 class="text-2xl font-bold text-white text-center">Uh Oh!</h2>
                                                                                        </div>
                                                                                        <div class="text-white">
                                                                                            <p>An error occurred. This image seems to have origin policies in place. Your custom image will still work for your profile picture; however, it will use Echo's fallback URL to prevent futhur issues with this image.</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        `).on("click", function (event) {
                                                                            if ($(event.target).attr("id") == "error")
                                                                                $("#error").fadeOut(400, function () {
                                                                                    $("#overlays").empty();
                                                                                    runtime("settings")
                                                                                });
                                                                        })
                                                                    }
                                                                })
                                                            });
                                                        }
                                                    }, 200)
                                                }
                                            })
                                        else
                                            $("#overlay").fadeOut(400, function () {
                                                $("#overlays").empty();
                                                runtime("settings")
                                            });
                                }
                            })
                            break;
                        case "lti_info":
                            $("#overlays").append(`
                                <div id="overlay" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                                    <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                        <div class="bg-zinc-800 rounded-xl max-w-lg px-5 py-5 pointer-events-auto w-[25rem]">
                                            <div class="flex justify-center items-center mb-4">
                                                <h2 class="text-2xl font-bold text-white text-center">Change Profile Picture</h2>
                                            </div>
                                            <div class="text-white">
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
                });

                if ($(window).scrollTop() > $("#toptitle").offset().top + $("#toptitle").outerHeight() - 50 || $(window).scrollTop() < $("#toptitle").offset().top - $(window).height()) {
                    $("#topnav").fadeIn(0);
                } else {
                    $("#topnav").fadeOut(0);
                }

                // Manages when we scroll
                $(window).scroll(function() {
                    if ($(this).scrollTop() > $("#toptitle").offset().top + $("#toptitle").outerHeight() - 50 || $(this).scrollTop() < $("#toptitle").offset().top - $(window).height()) {
                        $("#topnav").fadeIn(50);
                    } else {
                        $("#topnav").fadeOut(100);
                    }
                });

                let settings = JSON.parse(localStorage.getItem("settings"));

                $.each(settings, (i, setting) => {
                    if (setting.$value) {
                        $(`input[setting_name="${setting.setting}"]`).prop("checked", setting.$value)
                        $(`input[setting_name="${setting.setting}"]`).parent().find("label div>div").removeClass("translate-x-0").addClass("translate-x-full").parent().removeClass("bg-zinc-600").addClass("bg-blue-700");
                    }
                })

                $("[goto]").on("click", function (event) {
                    window.open($(this).attr("goto"), "_blank")
                })

                $("#root div[id]:has(input)").on("click", function() {
                    if ($(this).find("input").prop("checked"))
                        $(this).find("input").prop("checked", "")
                    else
                        $(this).find("input").prop("checked", "true")


                    if ($(this).find("input").prop("checked")) {
                        $(this).find("label div>div").removeClass("translate-x-0").addClass("translate-x-full duration-300 ease-in-out").parent().removeClass("bg-zinc-600").addClass("bg-blue-700");
                    } else {
                        $(this).find("label div div").removeClass("translate-x-full").addClass("translate-x-0 duration-300 ease-in-out").parent().removeClass("bg-blue-700").addClass("bg-zinc-600");
                    }

                    if (!JSON.stringify(settings).includes($(this).find("input").attr("setting_name"))) {
                        settings.push({
                            setting: $(this).find("input").attr("setting_name"),
                            $value:  $(this).find("input").prop("checked")
                        })

                        localStorage.setItem("settings", JSON.stringify(settings));
                    } else {
                        settings.find(name => name.setting.includes($(this).find("input").attr("setting_name"))).$value = $(this).find("input").prop("checked")
                        localStorage.setItem("settings", JSON.stringify(settings));
                    }
                });

                $("#overlays").empty();
                break;
        }
    }
})();



/** this is a whole bunch of code that i need later */


            /*

                            <div class="absolute inline-flex right-0 top-0 h-8 w-8 -m-2 rounded-full bg-blue-700 opacity-75 justify-center items-center">
                                <span class="mb-1">5</span>
                            </div>  
            
            */

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
                                <span class="font-black material-symbols-rounded">
                                    arrow_back_ios_new
                                </span>
                            </a>
                            <span class="font-black text-2xl">Overview</span>
                            <a class="cursor-pointer flex justify-center items-center">
                                <span class="font-black material-symbols-rounded">
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