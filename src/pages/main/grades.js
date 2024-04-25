export async function run() {
    const hlp = await import("../../helpers.js");
    const site = await import("../../site.js");

    // TODO: get gpa calculator details using gradeways way of grades, also have checkmarks to determine if a class is AP
    // then, once the gpa calculator has calculated at least once, uses that gpa in the grades main page.
    //
    // after that, show the average objectives compiled from all classes (excluding hidden)
    //
    // after that, show the class grades of each class again, since its a grades page.

    await hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="${hlp.theme("bg", "700")} text-white">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row ${hlp.theme("bg", "700")}">
                    <div id="scrolled-title-reload" showreload class="flex justify-center items-center container mx-auto py-2 px-4 h-[60px]">
                        <div class="invisible -ml-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
                            <span class="w-0 -ml-[1px] font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                arrow_back_ios_new
                            </span>
                        </div>
                        <span class="flex-grow font-bold text-center text-[22px]">
                            <span class="inner">Grades</span>
                        </span>
                        <div id="reload" class="-mr-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
                            <span class="w-0 font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                refresh
                            </span>
                        </div>
                    </div>
                </div>
                <div class="relative overflow-hidden flex flex-row gap-10 justify-between container mx-auto pt-16 pb-5 px-4">
                    <div class="flex flex-col flex-grow justify-center">
                        <h1 class="text-5xl sm:text-7xl font-bold pb-0 -m-[2px] mb-0">Grades</h1>
                    </div>
                </div>
            </div>
            <!---->
            <!---->
            <div class="flex flex-col gap-5 pt-[1.1rem] mb-[1.8rem] container mx-auto py-10 px-4">
                <div class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">
                    <div id="gpa-calculator" class="flex flex-row justify-between container mx-auto cursor-pointer py-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                            <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-2 py-1 rounded-2xl">
                                <span class="text-3xl material-symbols-rounded text-white">
                                    calculate
                                </span>
                            </div>
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">GPA Calculator</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <span class="material-symbols-rounded">
                                arrow_forward_ios
                            </span>
                        </div>
                    </div>
                </div>
                <!---->
                <!---->
                <!-- TODO:
                <div id="gpas">
                    <div class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">
                        <div class="flex flex-row justify-between container mx-auto py-3 border-b-[2px] border-zinc-700">
                            <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                                <div class="flex flex-col items-center">
                                    <h1 class="text-[20px] font-bold">GPA</h1>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <div class="rounded-lg px-3 font-bold py-1 bg-green-500">
                                    3.18
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-row justify-between container mx-auto py-3">
                            <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                                <div class="flex flex-col items-center">
                                    <h1 class="text-[20px] font-bold">GPA Weighted</h1>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <div class="rounded-lg px-3 font-bold py-1 bg-green-500">
                                    3.24
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                -->
                <!---->
                <div id="averages" class="flex flex-col gap-5">
                </div>
                <div id="courses" class="flex flex-col gap-5">
                </div>
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
                        <a id="calendar" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="text-[30px] font-black pointer-events-none material-symbols-rounded">
                                calendar_month
                            </span>
                        </a>
                        <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="text-[30px] ${hlp.theme("text", "700")} font-black pointer-events-none material-symbols-rounded">
                                insert_chart
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
                case "reload": {
                    hlp.load(async function () {
                        await call();
                    });
                    break;
                }


                case "calendar": {
                    await site.runtime("calendar");
                    break;
                }

                case "overview": {
                    await site.runtime("overview");
                    break;
                }

                case "settings": {
                    await site.runtime("settings");
                    break;
                }
            }
        });

        async function call() {
            let settings = [];
            let objectives = [];
            let courses_order = [];
            let courses = [];

            try {
                settings = await $.ajax({
                    url: hlp.api(`/dlap.ashx?cmd=getdomainsettings&domainid=//${hlp.session.userspace}&path=public/shadow/app/buzz/settings.xml`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                })
            } catch (e) {}

            let guids = "";
            if (settings.length != 0) {
                await $.each(settings.response.settings["scoring-objective-list"]["scoring-objective"], (i, objective) => {
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
            }

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

            let overall = [];
            if (courses.length != 0 || courses.response.code == "OK") {
                $.each(courses.response.enrollments.enrollment, (i, course) => {
                    try {
                        let hidden = hlp.get("hidden");
                        if (hidden.find(option => option.course.includes(course.course.id)).$hidden)
                            return;
                    } catch (e) {}

                    try {
                        objective = course.enrollmentmetrics.objectivescores.objectivescore;                    
                    } catch (e) {}

                    a = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Agency")).guid));
                    c = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Collaboration")).guid));
                    k = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Knowledge & Thinking")).guid));
                    o = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Oral Communication")).guid));
                    w = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Written Communication")).guid));

                    if (a != undefined) {
                        overall.push({
                            type: "Agency",
                            score: hlp.decode_score(a)
                        })
                    } 
                    
                    if (c != undefined) {
                        overall.push({
                            type: "Collaboration",
                            score: hlp.decode_score(c)
                        })
                    } 
                    
                    if (k != undefined) {
                        overall.push({
                            type: "Knowledge & Thinking",
                            score: hlp.decode_score(k)
                        })
                    } 
                    
                    if (o != undefined) {
                        overall.push({
                            type: "Oral Communication",
                            score: hlp.decode_score(o)
                        })
                    } 
                    
                    if (w != undefined) {
                        overall.push({
                            type: "Written Communication",
                            score: hlp.decode_score(w)
                        })
                    }
                })
            }

            let targets = {
                "Agency": {sum: 0, count: 0},
                "Collaboration": {sum: 0, count: 0},
                "Knowledge & Thinking": {sum: 0, count: 0},
                "Oral Communication": {sum: 0, count: 0},
                "Written Communication": {sum: 0, count: 0}
            };

            await $.each(overall, (i, objective) => {
                if (targets.hasOwnProperty(objective.type)) {
                    targets[objective.type].sum += objective.score;
                    targets[objective.type].count++;
                }
            });
            
            let final_overall = [];
            await $.each(Object.keys(targets), async (i, target) => {
                const average = targets[target].count > 0 ? Math.round(targets[target].sum / targets[target].count) : 0;

                final_overall.push({
                    type: target,
                    score: average
                })
            });

            console.log(final_overall)
            if (final_overall.length != 0) {
                $("#averages").append(`
                    ${(final_overall.find(type => type.type == "Agency") != undefined || final_overall.find(type => type.type == "Collaboration" != undefined) ? `
                    <div class="flex flex-row gap-5">
                        ${final_overall.find(type => type.type == "Agency") != undefined ? `
                        <div class="relative flex-1 flex flex-col justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                            <div class="flex justify-center items-center h-full">
                                <svg width="136" height="136" viewBox="0 0 136 136">
                                    <circle class="${hlp.theme("theme-stroke")}" cx="68" cy="68" r="54" fill="none" stroke="inherit" stroke-width="16" />
                                    <circle class="stroke-yellow-500" cx="68" cy="68" r="54" fill="none" stroke-width="16" stroke-dasharray="339.292" stroke-dashoffset="${339.292 * (1 - final_overall.find(type => type.type == "Agency").score / 100)}" transform="rotate(-90 68 68)" />
                                </svg>
                            </div>
                            <div class="absolute inset-0 flex flex-col justify-center items-center">
                                <span class="score font-bold text-3xl">${final_overall.find(type => type.type == "Agency").score}</span>
                                <span class="font-bold text-zinc-400 text-sm">Agency</span>
                            </div>
                        </div>
                        ` : ""}
                        ${final_overall.find(type => type.type == "Collaboration") != undefined ? `
                        <div class="relative flex-1 flex flex-col justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                            <div class="flex justify-center items-center h-full">
                                <svg width="136" height="136" viewBox="0 0 136 136">
                                    <circle class="${hlp.theme("theme-stroke")}" cx="68" cy="68" r="54" fill="none" stroke="inherit" stroke-width="16" />
                                    <circle class="stroke-violet-500" cx="68" cy="68" r="54" fill="none" stroke-width="16" stroke-dasharray="339.292" stroke-dashoffset="${339.292 * (1 - final_overall.find(type => type.type == "Collaboration").score / 100)}" transform="rotate(-90 68 68)" />
                                </svg>
                            </div>
                            <div class="absolute inset-0 flex flex-col justify-center items-center">
                                <span class="score font-bold text-3xl">${final_overall.find(type => type.type == "Collaboration").score}</span>
                                <span class="font-bold text-zinc-400 text-sm">Collab</span>
                            </div>
                        </div>
                        ` : ""}
                    </div>
                    <div class="flex flex-row gap-5">
                        ${final_overall.find(type => type.type == "Knowledge & Thinking") != undefined ? `
                        <div class="relative flex-1 flex flex-col justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                            <div class="flex justify-center items-center h-full">
                                <svg width="136" height="136" viewBox="0 0 136 136">
                                    <circle class="${hlp.theme("theme-stroke")}" cx="68" cy="68" r="54" fill="none" stroke="inherit" stroke-width="16" />
                                    <circle class="stroke-blue-500" cx="68" cy="68" r="54" fill="none" stroke-width="16" stroke-dasharray="339.292" stroke-dashoffset="${339.292 * (1 - final_overall.find(type => type.type == "Knowledge & Thinking").score / 100)}" transform="rotate(-90 68 68)" />
                                </svg>
                            </div>
                            <div class="absolute inset-0 flex flex-col justify-center items-center">
                                <span class="score font-bold text-3xl">${final_overall.find(type => type.type == "Knowledge & Thinking").score}</span>
                                <span class="font-bold text-zinc-400 text-sm">K & T</span>
                            </div>
                        </div>
                        ` : ""}
                        ${final_overall.find(type => type.type == "Oral Communication") != undefined ? `
                        <div class="relative flex-1 flex flex-col justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                            <div class="flex justify-center items-center h-full">
                                <svg width="136" height="136" viewBox="0 0 136 136">
                                    <circle class="${hlp.theme("theme-stroke")}" cx="68" cy="68" r="54" fill="none" stroke="inherit" stroke-width="16" />
                                    <circle class="stroke-green-500" cx="68" cy="68" r="54" fill="none" stroke-width="16" stroke-dasharray="339.292" stroke-dashoffset="${339.292 * (1 - final_overall.find(type => type.type == "Oral Communication").score / 100)}" transform="rotate(-90 68 68)" />
                                </svg>
                            </div>
                            <div class="absolute inset-0 flex flex-col justify-center items-center">
                                <span class="score font-bold text-3xl">${final_overall.find(type => type.type == "Oral Communication").score}</span>
                                <span class="font-bold text-zinc-400 text-sm">Oral</span>
                            </div>
                        </div>
                        ` : ""}
                    </div>
                    ${final_overall.find(type => type.type == "Written Communication") != undefined ? `
                    <div class="relative flex-1 flex flex-col justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                        <div class="flex justify-center items-center h-full">
                            <svg width="136" height="136" viewBox="0 0 136 136">
                                <circle class="${hlp.theme("theme-stroke")}" cx="68" cy="68" r="54" fill="none" stroke="inherit" stroke-width="16" />
                                <circle class="stroke-cyan-500" cx="68" cy="68" r="54" fill="none" stroke-width="16" stroke-dasharray="339.292" stroke-dashoffset="${339.292 * (1 - final_overall.find(type => type.type == "Written Communication").score / 100)}" transform="rotate(-90 68 68)" />
                            </svg>
                        </div>
                        <div class="absolute inset-0 flex flex-col justify-center items-center">
                            <span class="score font-bold text-3xl">${final_overall.find(type => type.type == "Written Communication").score}</span>
                            <span class="font-bold text-zinc-400 text-sm">Written</span>
                        </div>
                    </div>
                    ` : ""}
                    ` : "")}
                `)
            }

            let all_courses = [];
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

            if (all_courses.length != 0) {
                $.each(all_courses, (i, course) => {
                    try {
                        let hidden = hlp.get("hidden");
                        if (hidden.find(option => option.course.includes(course.courseid)).$hidden)
                            return;
                    } catch (e) {}

                    $("#courses").append(`
                        <div class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">
                            <div class="flex flex-row justify-between container mx-auto py-3">
                                <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                                    <div class="flex flex-col items-center">
                                        <h1 class="text-[20px] w-[5ch] xl-sm:w-[17ch] x-sm:w-[28ch] sm:w-[30ch] md:w-[40ch] lg:w-full truncate font-bold">${course.title}</h1>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center">
                                    <div class="rounded-lg px-3 py-1 font-bold bg-${hlp.score_to_color(course.score)}-500">
                                        ${isNaN(course.score) ? `<span class="${hlp.theme("theme-text")} w-max">N/A</span>` : `${course.score}`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)
                });

            }
        }

        hlp.animate_nav();
        await call();
    })
}