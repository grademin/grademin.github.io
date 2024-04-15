export async function run() {
    "use strict";

    const hlp = await import("../../helpers.js");
    const site = await import("../../site.js");


    await hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="${hlp.theme("bg", "700")} text-white">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row ${hlp.theme("bg", "700")}">
                    <div class="flex justify-center items-center container mx-auto py-2 px-4">
                        <div id="go-back" class="-ml-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
                            <span class="w-0 -ml-[1px] font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                arrow_back_ios_new
                            </span>
                        </div>
                        <span class="flex-grow font-bold text-center text-[22px]">Courses</span>
                        <div id="reload" class="-mr-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
                            <span class="w-0 font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                refresh
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!---->
            <!---->
            <div class="flex flex-col gap-5 pt-[2rem] mt-[46px] mb-[1.7rem] container mx-auto py-10 px-4">
                <div id="courses" class="flex flex-col gap-5"></div>
            </div>
            <!---->
            <!---->
            <div id="bottom" class="fixed bottom-0 left-0 right-0">
                <div class="${hlp.theme("theme-card")}">
                    <div class="flex flex-row justify-between items-center">
                        <a id="overview" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="text-[30px] font-black pointer-events-none material-symbols-rounded">
                                home
                            </span>
                        </a>
                        <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="text-[30px] material-symbols-rounded">
                                calendar_month
                            </span>
                        </a>
                        <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="text-[30px] font-black pointer-events-none material-symbols-rounded">
                                description
                            </span>
                        </a>
                        <a id="settings" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="text-[30px] font-black pointer-events-none material-symbols-rounded">
                                settings
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        `).on("click", async function (e) {
            switch ($(e.target).attr("id")) {
                case "go-back": {
                    history.pushState({}, "", `?page=overview`);
                    await site.runtime("overview");
                    break;
                }

                case "half-back": {
                    history.pushState({}, "", `?page=courses`);
                    $("#course").remove();
                    $("#courses").show();
                    $("#reload").removeClass("invisible");
                    $("#half-back").attr("id", "go-back");
                    break;
                }

                case "reload": {
                    hlp.load(async function () {
                        $("#courses").empty();
                        await main();
                    });
                    break;
                }



                case "overview": {
                    history.pushState({}, "", `?page=overview`);
                    await site.runtime("overview");
                    break;
                }

                case "calendar": {
                    history.pushState({}, "", `?page=calendar`);
                    await site.runtime("calendar");
                    break;
                }

                case "grades": {
                    history.pushState({}, "", `?page=grades`);
                    await site.runtime("grades");
                    break;
                }

                case "settings": {
                    history.pushState({}, "", `?page=settings`);
                    await site.runtime("settings");
                    break;
                }
            }
        })


        
        async function main() {
            let courses_order = [];
            let courses = [];
            let all_courses = [];

            try {
                courses_order = await $.ajax({
                    url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&entityid=${hlp.session.id}&path=Assets/BuzzCourseCardSettings.json`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                })
            } catch (e) {}

            try {
                courses = await $.ajax({
                    url: hlp.api(`/cmd/listuserenrollments?_token=${hlp.session.token}&userid=${hlp.session.id}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            } catch (e) {}

            if (courses_order.length == 0) {
                try {
                    $.each(courses.response.enrollments.enrollment, function (i, course) {
                        all_courses.push({
                            id: course.id,
                            enrollmentid: course.enrollmentmetrics.enrollmentid,
                            courseid: course.courseid,
                            title: course.course.title.trim(),
                            start: new Date(course.course.startdate).toLocaleDateString(undefined, {month: "long", year: "numeric", day: "numeric" }),
                            end: new Date(course.course.enddate).toLocaleDateString(undefined, {month: "long", year: "numeric", day: "numeric"}),
                            score: hlp.decode_score(course.enrollmentmetrics, course.enrollmentmetrics)
                        })
                    })
                } catch (e) {}
            } else {
                try {
                    $.each(courses.response.enrollments.enrollment, function (i, course) {
                        all_courses.push({
                            order: courses_order[course.id].order,
                            id: course.id,
                            enrollmentid: course.enrollmentmetrics.enrollmentid,
                            courseid: course.courseid,
                            title: course.course.title.trim(),
                            start: new Date(course.course.startdate).toLocaleDateString(undefined, {month: "long", year: "numeric", day: "numeric" }),
                            end: new Date(course.course.enddate).toLocaleDateString(undefined, {month: "long", year: "numeric", day: "numeric"}),
                            score: hlp.decode_score(course.enrollmentmetrics, course.enrollmentmetrics)
                        })
                    })
                    all_courses = all_courses.sort((first, last) => first.order - last.order);
                } catch (e) {}
            }
            
            if (all_courses.length == 0) {
                $("#courses").append(`
                    <div class="flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                        <span class="text-center w-full">You have no courses to view</span>
                    </div>
                `)
            } else {
                if (new URLSearchParams(window.location.search).get("eid") || new URLSearchParams(window.location.search).get("courseid")) {
                    await content(new URLSearchParams(window.location.search).get("eid"), new URLSearchParams(window.location.search).get("courseid"))
                }

                $.each(all_courses, (i, course) => {
                    try {
                        let hidden = hlp.get("hidden");
                        if (hidden.find(option => option.course.includes(course.courseid)).$hidden)
                            return;
                    } catch (e) {}

                    $("#courses").append(`
                        <div uid="${course.id}" eid="${course.enrollmentid}" courseid="${course.courseid}" class="flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                            <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                                <div class="flex justify-center items-center bg-${hlp.score_to_color(course.score)}-500 px-4 py-3 rounded-2xl">
                                    <span class="text-1xl font-bold text-white py-2 px-2 w-max flex justify-center">
                                        ${isNaN(course.score) ? `<span class="text-black">N/A</span>` : `${course.score}`}
                                    </span>
                                </div>
                                <div class="flex flex-col">
                                    <h1 class="text-[22px] w-[5ch] xl-sm:w-[11ch] x-sm:w-[20ch] sm:w-[30ch] md:w-[40ch] lg:w-full truncate font-bold">${course.title}</h1>
                                    <span class="font-bold text-[13px] sm:text-[15px] w-[15ch] x-sm:w-[20ch] sm:w-[30ch] truncate text-zinc-400">${course.start} - ${course.end}</span>
                                </div>
                            </div>
                            <div class="flex justify-center items-center pl-5 pointer-events-none">
                                <span class="material-symbols-rounded">
                                    arrow_forward_ios
                                </span>
                            </div>
                        </div>
                    `).children().off().on("click", function (e) {
                        hlp.load(async function () {
                            await content($(e.target).attr("eid"), $(e.target).attr("courseid"));
                        })
                    })
                })
            }
        }

        async function content(eid, courseid) {
            if (new URLSearchParams(window.location.search).get("eid") == null || new URLSearchParams(window.location.search).get("courseid") == null)
                history.pushState({}, "", `?page=${new URLSearchParams(window.location.search).get("page")}&eid=${eid}&courseid=${courseid}`);

            $("#go-back").attr("id", "half-back");

            let landing = "";
            let course_details = [];
            let settings = [];
            let objectives = [];
            let agendas = [];

            try {
                landing = hlp.format(await $.ajax({
                    url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&entityid=${(()=>{
                        return new URLSearchParams(window.location.search).get("courseid") == null ? courseid : new URLSearchParams(window.location.search).get("courseid");
                    })()}&path=Templates/Data/Course/landing-page.html`),
                    method: "GET",
                    dataType: "html",
                    contentType: "application/json; charset=utf-8"
                })).replace(/\[~]/g, `https://api.agilixbuzz.com/Resz/${hlp.session.token}/${new URLSearchParams(window.location.search).get("eid")}/Assets`);
            } catch (e) {}

            if (landing.length == 0 || landing.includes("errorId"))
                landing = "<span>No description for this course</span>"

            try {
                course_details = await $.ajax({
                    url: hlp.api(`/cmd?cmd=getenrollment3&_token=${hlp.session.token}&enrollmentid=${(()=>{
                        return new URLSearchParams(window.location.search).get("eid") == null ? eid : new URLSearchParams(window.location.search).get("eid");
                    })()}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                })
            } catch (e) {}

            let score = "0";
            if (course_details.length != 0) {
                score = Math.round((course_details.response.enrollment.enrollmentmetrics.achieved / course_details.response.enrollment.enrollmentmetrics.possible) * 100)
            }


            try {
                settings = await $.ajax({
                    url: hlp.api(`/dlap.ashx?cmd=getdomainsettings&domainid=//${hlp.session.userspace}&path=public/shadow/app/buzz/settings.xml`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            } catch (e) {}

            let guids = "";
            if (settings.length != 0) {
                $.each(settings.response.settings["scoring-objective-list"]["scoring-objective"], (i, objective) => {
                    if (i < settings.response.settings["scoring-objective-list"]["scoring-objective"].length - 1)
                        guids += `${objective.guid}|`
                    else 
                        guids += `${objective.guid}`;
                });
            }

            let objective = [];
            let a = undefined, c = undefined, k = undefined, o = undefined, w = undefined;
            if (guids != "") {
                try {
                    objectives = await $.ajax({
                        url: hlp.api(`/cmd/getobjectivelist?_token=${hlp.session.token}&guid=${guids}`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    })
                } catch (e) {}

                try {
                    objective = course_details.response.enrollment.enrollmentmetrics.objectivescores.objectivescore;                    
                } catch (e) {}
                
                a = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Agency")).guid));
                c = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Collaboration")).guid));
                k = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Knowledge & Thinking")).guid));
                o = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Oral Communication")).guid));
                w = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Written Communication")).guid));
            }



            try {
                agendas = await $.ajax({
                    url: hlp.api(`/cmd/gestresourcelist2?_token=${hlp.session.token}&class=EVNT&path=AGND/*&entityid=${(()=>{
                        return new URLSearchParams(window.location.search).get("courseid") == null ? courseid : new URLSearchParams(window.location.search).get("courseid");
                    })()}`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                })
                agendas.response.resources.resource.sort((first, last) => first.creationdate - last.creationdate);
            } catch (e) {}

            let agenda = ""
            try {
                agenda = hlp.format(await $.ajax({
                    url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&class=EVNT&entityid=${new URLSearchParams(window.location.search).get("courseid")}&path=AGND/${new Date().toLocaleDateString('sv-SE')}`),
                    method: "GET",
                    dataType: "html",
                    contentType: "application/json; charset=utf-8"
                }));
            } catch (e) {}
            
            if (agenda.includes("errorId") || agenda == "")
                agenda = `<span class="flex justify-center items-center">No agenda for today</span>`;

            $("#course").remove();
            await $("#courses").parent().append(`
                <div id="course" class="flex flex-col gap-5">
                    <div class="flex flex-col gap-5">
                        <div class="flex flex-row ${a == undefined ? c == undefined ? "flex-col" : "flex-col" : ""} gap-5">
                            <div class="relative flex-1 flex flex-col justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                <div class="flex justify-center items-center h-full">
                                    <svg width="136" height="136" viewBox="0 0 136 136">
                                        <circle class="${hlp.theme("theme-stroke")}" cx="68" cy="68" r="54" fill="none" stroke="inherit" stroke-width="16" />
                                        <circle class="stroke-${hlp.score_to_color(score)}-500" cx="68" cy="68" r="54" fill="none" stroke-width="16" stroke-dasharray="339.292" stroke-dashoffset="${339.292 * (1 - score / 100)}" transform="rotate(-90 68 68)" />
                                    </svg>
                                </div>
                                <div class="absolute inset-0 flex flex-col justify-center items-center">
                                    <span class="score font-bold text-3xl">${score}</span>
                                    <span class="font-bold text-zinc-400 text-sm">Overall</span>
                                </div>
                            </div>
                            ${objective.length != 0 ? `
                            <div class="flex flex-col gap-5">
                                ${a != undefined ? `
                                <div class="relative flex-1 ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                    <div class="flex flex-col gap-2">
                                        <span class="font-bold">Agency</span>
                                        <div class="flex flex-row gap-10 sm:gap-20 justify-between items-center">
                                            <span class="font-bold">${hlp.decode_score(a)}</span>
                                            <div class="rounded-xl bg-yellow-500 p-4"></div>
                                        </div>
                                    </div>
                                </div>
                                ` : ""}
                                ${c != undefined ? `
                                <div class="relative flex-1 ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                    <div class="flex flex-col gap-2">
                                        <span class="font-bold">Collaboration</span>
                                        <div class="flex flex-row gap-10 sm:gap-20 justify-between items-center">
                                            <span class="font-bold">${hlp.decode_score(c)}</span>
                                            <div class="rounded-xl bg-violet-500 p-4"></div>
                                        </div>
                                    </div>
                                </div>
                                ` : ""}
                            </div>
                            ` : ""}
                        </div>
                        ${objective.length != 0 ? `
                        <div class="flex flex-row flex-wrap gap-5">
                            ${k != undefined ? `
                            <div class="relative flex-1 ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                <div class="flex flex-col gap-2">
                                    <span class="font-bold">K & T</span>
                                    <div class="flex flex-row gap-5 sm:gap-20 justify-between items-center">
                                        <span class="font-bold">${hlp.decode_score(k)}</span>
                                        <div class="rounded-xl bg-blue-500 p-4"></div>
                                    </div>
                                </div>
                            </div>
                            ` : ""}
                            ${o != undefined ? `
                            <div class="relative flex-1 ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                <div class="flex flex-col gap-2">
                                    <span class="font-bold">Comms</span>
                                    <div class="flex flex-row gap-5 sm:gap-20 justify-between items-center">
                                        <span class="font-bold">${hlp.decode_score(o)}</span>
                                        <div class="rounded-xl bg-green-500 p-4"></div>
                                    </div>
                                </div>
                            </div>
                            ` : ""}
                            ${w != undefined ? `
                            <div class="relative flex-1 ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                <div class="flex flex-col gap-2">
                                    <span class="font-bold">Written</span>
                                    <div class="flex flex-row gap-5 sm:gap-20 justify-between items-center">
                                        <span class="font-bold">${hlp.decode_score(w)}</span>
                                        <div class="rounded-xl bg-cyan-500 p-4"></div>
                                    </div>
                                </div>
                            </div>
                            ` : ""}
                        </div>
                        ` : ""}
                    </div>
                    <div class="flex flex-col justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                        <span class="font-bold text-2xl border-b-[2px] border-zinc-700 pb-3">${course_details.response.enrollment.course.title}</span>
                        <div class="pt-3">
                            ${landing}
                        </div>
                    </div>
                    <div class="flex flex-col gap-5">
                        <div class="flex flex-row gap-5">
                            <div id="agenda-back" class="flex flex-2 flex-col ${hlp.theme("bg", "700")} transition text-white font-semibold rounded-xl hover:${hlp.theme("bg", "500")} focus:outline-none focus:ring-2 focus:${hlp.theme("ring", "500")} focus:ring-opacity-50 justify-center items-center cursor-pointer rounded-xl w-min py-3 px-3">
                                <span class="material-symbols-rounded">
                                    arrow_back_ios_new
                                </span>
                            </div>
                            <div id="agenda-date" class="flex flex-col w-full ${hlp.theme("theme-card")} justify-center items-center rounded-xl py-3 px-3">
                                <span class="font-bold flex-1 flex justify-center">${new Date().toLocaleDateString('en-US')}</span>
                            </div>  
                            <div id="agenda-forward" class="flex flex-2 flex-col ${hlp.theme("bg", "700")} transition text-white font-semibold rounded-xl hover:${hlp.theme("bg", "500")} focus:outline-none focus:ring-2 focus:${hlp.theme("ring", "500")} focus:ring-opacity-50 justify-center items-center cursor-pointer rounded-xl w-min py-3 px-3">
                                <span class="material-symbols-rounded">
                                    arrow_forward_ios
                                </span>
                            </div>
                            <button id="today" class="flex flex-1 justify-center items-center px-4 py-3 ${hlp.theme("bg", "700")} transition text-white font-semibold rounded-xl hover:${hlp.theme("bg", "500")} focus:outline-none focus:ring-2 focus:${hlp.theme("ring", "500")} focus:ring-opacity-50 transition text-white font-semibold rounded-xl focus:outline-none">Today</button>
                        </div> 
                    </div>
                    <div id="agenda" class="flex flex-col justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                        ${agenda}
                    </div>
                </div>
            `).find("#courses").hide();

            let current_date = new Date();

            $("#today").on("click", async function () {
                current_date.setDate(new Date().getDate());

                let new_agenda = ""
                try {
                    new_agenda = hlp.format(await $.ajax({
                        url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&class=EVNT&entityid=${new URLSearchParams(window.location.search).get("courseid")}&path=AGND/${current_date.toLocaleDateString('sv-SE')}`),
                        method: "GET",
                        dataType: "html",
                        contentType: "application/json; charset=utf-8"
                    }));
                } catch (e) {}

                $("#agenda-date span").html(new Date(current_date).toLocaleDateString('en-US'))

                if (new_agenda != "") {
                    $("#agenda").html(new_agenda);
                    $("[goto]").on("click", function (event) {
                        window.open($(this).attr("goto"), "_blank")
                    })
                } else {
                    $("#agenda").html(`<span class="flex justify-center items-center">No agenda for today</span>`)
                }
            })

            $("#agenda-back").on("click", async function () {
                current_date.setDate(current_date.getDate() - 1);

                let new_agenda = ""
                try {
                    new_agenda = hlp.format(await $.ajax({
                        url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&class=EVNT&entityid=${new URLSearchParams(window.location.search).get("courseid")}&path=AGND/${current_date.toLocaleDateString('sv-SE')}`),
                        method: "GET",
                        dataType: "html",
                        contentType: "application/json; charset=utf-8"
                    }));
                } catch (e) {}

                $("#agenda-date span:not(#agenda-date-day)").html(new Date(current_date).toLocaleDateString('en-US'))

                if (new_agenda != "") {
                    $("#agenda").html(new_agenda);
                    $("[goto]").on("click", function (event) {
                        window.open($(this).attr("goto"), "_blank")
                    })
                } else {
                    $("#agenda").html(`<span class="flex justify-center items-center">No agenda for today</span>`)
                }
            })

            $("#agenda-forward").on("click", async function () {
                current_date.setDate(current_date.getDate() + 1);

                let new_agenda = ""
                try {
                    new_agenda = hlp.format(await $.ajax({
                        url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&class=EVNT&entityid=${new URLSearchParams(window.location.search).get("courseid")}&path=AGND/${current_date.toLocaleDateString('sv-SE')}`),
                        method: "GET",
                        dataType: "html",
                        contentType: "application/json; charset=utf-8"
                    }));
                } catch (e) {}

                $("#agenda-date span").html(new Date(current_date).toLocaleDateString('en-US'))

                if (new_agenda != "") {
                    $("#agenda").html(new_agenda);
                    $("[goto]").on("click", function (event) {
                        window.open($(this).attr("goto"), "_blank")
                    })
                } else {
                    $("#agenda").html(`<span class="flex justify-center items-center">No agenda for today</span>`)
                }
            })

            $("[goto]").on("click", function (event) {
                window.open($(this).attr("goto"), "_blank")
            })
        }
        
        await main();
    })
}