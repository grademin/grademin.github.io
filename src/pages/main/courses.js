export async function run() {
    "use strict";

    const hlp = await import("../../helpers.js");
    const site = await import("../../site.js");

    // TODO: add better container classes other than x-sm and stuf, so text does ... better. Also fix 
    // the score box getting longer and bigger if the score is 100
    // TODO: add order courses to fix some of these problems.

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
                            <span class="text-[30px] ${hlp.theme("text", "700")} font-black pointer-events-none material-symbols-rounded">
                                home
                            </span>
                        </a>
                        <a id="calendar" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="text-[30px] font-black pointer-events-none material-symbols-rounded">
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


                case "agency":
                case "collaboration":
                case "knowlege":
                case "oral":
                case "written": {
                    $("body").addClass("overflow-hidden");
                    $("#overlays").append(`
                        <div id="overlay" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                            <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                <div class="${hlp.theme("theme-card")} rounded-xl max-w-lg px-5 py-5 pointer-events-auto">
                                    <div class="flex justify-center items-center mb-4">
                                        <h2 class="text-2xl font-bold ${hlp.theme("theme-text")} text-center">Color Legend</h2>
                                    </div>
                                    <div class="flex flex-col gap-5">
                                        <div class="flex flex-row gap-5">
                                            <div class="rounded-lg flex-2 bg-yellow-500 p-4 float-left"></div>
                                            <span class="flex flex-1 items-center font-bold">Agency</span>
                                        </div>
                                        <div class="flex flex-row gap-5">
                                            <div class="rounded-lg flex-2 bg-violet-500 p-4 float-left"></div>
                                            <span class="flex flex-1 items-center font-bold">Collaboration</span>
                                        </div>
                                        <div class="flex flex-row gap-5">
                                            <div class="rounded-lg flex-2 bg-blue-500 p-4 float-left"></div>
                                            <span class="flex flex-1 items-center font-bold">Knowlege & Thinking</span>
                                        </div>
                                        <div class="flex flex-row gap-5">
                                            <div class="rounded-lg flex-2 bg-green-500 p-4 float-left"></div>
                                            <span class="flex flex-1 items-center font-bold">Oral Communication</span>
                                        </div>
                                        <div class="flex flex-row gap-5">
                                            <div class="rounded-lg flex-2 bg-cyan-500 p-4 float-left"></div>
                                            <span class="flex flex-1 items-center font-bold">Written Communication</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).on("click", function (event) {
                        switch ($(event.target).attr("id")) {
                            case "overlay": {
                                $("#overlay").fadeOut(400, function () {
                                    $("#overlays").empty();
                                });
                                $("body").removeClass("overflow-hidden");
                            }
                        }
                    })
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
                        try {
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
                        } catch (e) {}
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
                                <div class="flex justify-center items-center bg-${hlp.score_to_color(course.score)}-500 px-9 py-6 rounded-2xl">
                                    <span class="text-1xl font-bold text-white w-0 flex justify-center whitespace-nowrap">
                                        ${isNaN(course.score) ? `<span class="${hlp.theme("theme-text")} w-max">N/A</span>` : `${course.score}`}
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
            let work = [];

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

            try {
                work = await $.ajax({
                    url: hlp.api(`/cmd/getenrollmentgradebook2?_token=${hlp.session.token}&itemid=**&enrollmentid=${new URLSearchParams(window.location.search).get("eid")}`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            } catch (e) {}


            let worklist = "";
            let new_a = undefined, new_c = undefined, new_k = undefined, new_o = undefined, new_w = undefined;
            if (work.length == 0) {
                worklist = ``;
            } else {
                worklist = `
                    ${(() => {
                        let html = [];
                        $.each(work.response.enrollment.grades.items.item.reverse(), (i, item) => {
                            const statuses = {Completed: 0x01, Excluded: 0x80, Released: 0x100, ExtraCredit: 0x200,
                                NeedsGrading: 0x400, PasswordVerified: 0x800, SkipMasteryRestriction: 0x1000, PostDueDateZero: 0x2000,
                                ScoredByTeacher: 0x4000, HasNotes: 0x8000, AutoUnscoredZero: 0x10000};
          
                            const flags = [];
                            for (const key in statuses) {
                                if (item.status & statuses[key]) {
                                    flags.push(statuses[key]);
                                }
                            }
                            
                            if (item.type != "Folder") {
                                if (flags.find(scored => scored == statuses.ScoredByTeacher) && !flags.find(excluded => excluded == statuses.Excluded)) {
                                    try {
                                        objective = item.objectivescores.objectivescore;                    
                                    } catch (e) {}
                                    
                                    new_a = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Agency")).guid));
                                    new_c = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Collaboration")).guid));
                                    new_k = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Knowledge & Thinking")).guid));
                                    new_o = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Oral Communication")).guid));
                                    new_w = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Written Communication")).guid));

                                    if (new_a != undefined || new_c != undefined || new_k != undefined || new_o != undefined || new_w != undefined) {
                                        html.push(`
                                            <div class="flex flex-col gap-2">
                                                <div class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                                    <div class="flex flex-row justify-center items-center gap-5 w-full">
                                                        <div class="flex flex-col w-full">
                                                            <h1 class="text-[22px] font-bold">${item.title}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex flex-row gap-2 flex-wrap container mx-auto">
                                                    ${new_a != undefined ? `
                                                    <div id="agency" class="relative w-min flex flex-1 xs-sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                        <span class="font-bold pointer-events-none">${hlp.decode_score(new_a)}</span>
                                                        <div class="rounded-lg bg-yellow-500 p-3 pointer-events-none"></div>
                                                    </div>
                                                    ` : ""}
                                                    ${new_c != undefined ? `
                                                    <div id="collaboration" class="relative w-min flex flex-1 xs-sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                        <span class="font-bold pointer-events-none">${hlp.decode_score(new_c)}</span>    
                                                        <div class="rounded-lg bg-violet-500 p-3 pointer-events-none"></div>
                                                    </div>
                                                    ` : ""}
                                                    ${new_k != undefined ? `
                                                    <div id="knowlege" class="relative w-min flex flex-1 xs-sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                        <span class="font-bold pointer-events-none">${hlp.decode_score(new_k)}</span>    
                                                        <div class="rounded-lg bg-blue-500 p-3 pointer-events-none"></div> 
                                                    </div>
                                                    ` : ""}
                                                    ${new_o != undefined ? `
                                                    <div id="oral" class="relative w-min flex flex-1 xs-sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                        <span class="font-bold pointer-events-none">${hlp.decode_score(new_o)}</span>
                                                        <div class="rounded-lg bg-green-500 p-3 pointer-events-none"></div>
                                                    </div>
                                                    ` : ""}
                                                    ${new_w != undefined ? `
                                                    <div id="written" class="relative w-min flex flex-1 xs-sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                        <span class="font-bold pointer-events-none">${hlp.decode_score(new_w)}</span>
                                                        <div class="rounded-lg bg-cyan-500 p-3 pointer-events-none"></div>
                                                    </div>
                                                    ` : ""}
                                                </div>
                                            </div>
                                        `);
                                    } else {
                                        html.push(`
                                            <div class="flex flex-col gap-2">
                                                <div class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                                    <div class="flex flex-row justify-center items-center gap-5 w-full">
                                                        <div class="flex flex-col w-full">
                                                            <h1 class="text-[22px] font-bold">${item.title}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex flex-row gap-2 flex-wrap container mx-auto">
                                                    ${(() => {
                                                        if (item.objectivescore != undefined) {
                                                            for (let objective of item.objectivescores.objectivescore) {
                                                                return `
                                                                    <div class="relative shadow-lg w-min flex flex-row gap-5 bg-${hlp.score_to_color(hlp.decode_score(objective))}-500 text-white justify-between rounded-xl py-2 px-3">
                                                                        <span class="font-bold">${hlp.decode_score(objective)}</span>
                                                                    </div>
                                                                `;
                                                            }
                                                        } else {
                                                            return `
                                                                <div class="relative shadow-lg w-min flex flex-row gap-5 bg-${hlp.score_to_color(hlp.decode_score(item))}-500 text-white justify-between rounded-xl py-2 px-3">
                                                                    <span class="font-bold">${hlp.decode_score(item)}</span>
                                                                </div>
                                                            `;
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                        `);
                                    }
                                } else if (flags.find(excluded => excluded == statuses.Excluded) && !flags.find(self => self == statuses.Completed)) {
                                    html.push(`
                                        <div class="flex flex-col gap-2">
                                            <div class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                                <div class="flex flex-row justify-center items-center gap-5 w-full">
                                                    <div class="flex flex-col w-full">
                                                        <h1 class="text-[22px] font-bold">${item.title}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex flex-row gap-2 container mx-auto">
                                                <div class="relative w-min flex flex-row gap-5 ${hlp.theme("theme-card")} justify-between ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                    <span class="font-bold">Excused</span>
                                                </div>
                                            </div>
                                        </div>
                                    `);
                                } else if (flags.find(self => self == statuses.Completed)) {
                                    html.push(`
                                        <div class="flex flex-col gap-2">
                                            <div class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                                <div class="flex flex-row justify-center items-center gap-5 w-full">
                                                    <div class="flex flex-col w-full">
                                                        <h1 class="text-[22px] font-bold">${item.title}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex flex-row gap-2 container mx-auto">
                                                <div class="relative w-max nowrap flex flex-row gap-5 ${hlp.theme("theme-card")} justify-between ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                    <span class="font-bold">Not Graded</span>
                                                </div>
                                            </div>
                                        </div>
                                    `);
                                }
                            }
                        });
                        
                        return html.join('');
                    })()}
                `;
            }

            $("#course").remove();
            await $("#courses").parent().append(`
                <div id="course" class="flex flex-col gap-5">
                    <div class="flex flex-col gap-5">
                        <div class="flex ${a == undefined || c == undefined ? "flex-col" : "flex-row"} gap-5">
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
                            ${objective.length != 0 && (a != undefined || c != undefined) ? `
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
                        ${objective.length != 0 && (k != undefined || o != undefined || w != undefined) ? `
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
                        ${agenda.replace(/\[~]/g, `https://api.agilixbuzz.com/Resz/${hlp.session.token}/${new URLSearchParams(window.location.search).get("eid")}/Assets`)}
                    </div>
                    ${worklist != "" ? `
                    <div class="block w-full rounded-xl gap-5 shadow-lg ${hlp.theme("theme-card")} flex flex-row items-center">
                        <span class="text-3xl material-symbols-rounded ${hlp.theme("theme-text")} flex justify-center pl-3">
                            search
                        </span>
                        <input id="search" class="${hlp.theme("caret", "700")} bg-transparent pr-3 py-3 w-full font-bold focus:outline-none sm:text-sm">
                    </div>
                    ` : ""}
                    <div id="worklist" class="flex flex-col gap-5">
                        ${worklist}
                    </div>
                </div>
            `).find("#courses").hide();

            if (worklist != "") {
                $('#search').on('input', function() {
                    var search = $(this).val();
                    $('#worklist div h1').each(function() {
                        if (search.length === 0) {
                            $(this).html($(this).text()).show();
                            $(this).parent().parent().parent().parent().show()
                        } else {            
                            if ($(this).text().match(new RegExp(search, "gi"))) {
                                var highlightedText = $(this).text().replace(new RegExp(search, "gi"), `<span class="${hlp.theme("text", "700")}">$&</span>`);
                                $(this).html(highlightedText).show();
                                $(this).parent().parent().parent().parent().show()
                            } else {
                                $(this).parent().parent().parent().parent().hide();
                            }
                        }
                    });
                });
            }

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
                    })).replace(/\[~]/g, `https://api.agilixbuzz.com/Resz/${hlp.session.token}/${new URLSearchParams(window.location.search).get("eid")}/Assets`);
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
                    })).replace(/\[~]/g, `https://api.agilixbuzz.com/Resz/${hlp.session.token}/${new URLSearchParams(window.location.search).get("eid")}/Assets`);
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
                    })).replace(/\[~]/g, `https://api.agilixbuzz.com/Resz/${hlp.session.token}/${new URLSearchParams(window.location.search).get("eid")}/Assets`);
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

        hlp.animate_nav();
        await main();
    })
}