export async function run() {
    const hlp = await import("../../helpers.js"),
          site = await import("../../site.js");

    hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="bg-blue-700">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row bg-blue-700">
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
                <div class="bg-zinc-800">
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
        `).on("click", async function (event) {
            switch ($(event.target).attr("id")) {
                ////////////////////////////////////////////////////////////
                ///////// MAIN CONTROLS

                case "semi-back": {
                    history.pushState({}, "", `?page=courses`);
                    $("#opened").remove();
                    $("#courses").show();
                    $("#reload").removeClass("invisible");
                    $("#semi-back").attr("id", "go-back");
                    break;
                }

                case "go-back": {
                    history.pushState({}, "", `?page=overview`);
                    await site.runtime("overview");
                    break;
                }

                case "reload": {
                    hlp.load(async function () {
                        await call();
                    });
                    break;
                }


                ////////////////////////////////////////////////////////////
                ///////// BOTTOM NAVIGATION CONTROLS

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


        ////////////////////////////////////////////////////////////


        async function call() {
            let order = await $.ajax({
                url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&entityid=${hlp.session.id}&path=Assets/BuzzCourseCardSettings.json`),
                method: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            });

            let courses = await $.ajax({
                url: hlp.api(`/cmd/listuserenrollments?_token=${hlp.session.token}&userid=${hlp.session.id}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                method: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            });

            let course_list = [];
            $.each(courses.response.enrollments.enrollment, function (i, course) {
                course_list.push({
                    order: order[course.id].order,
                    id: course.id,
                    enrollmentid: course.enrollmentmetrics.enrollmentid,
                    courseid: course.courseid,
                    title: course.course.title.trim(),
                    start: new Date(course.course.startdate).toLocaleDateString(undefined, {month: "long", year: "numeric", day: "numeric" }),
                    end: new Date(course.course.enddate).toLocaleDateString(undefined, {month: "long", year: "numeric", day: "numeric"}),
                    score: hlp.decode_score(course.enrollmentmetrics, course.enrollmentmetrics)
                })
            })
            
            course_list = course_list.sort((first, last) => first.order - last.order);

            if (new URLSearchParams(window.location.search).get("eid") != null && new URLSearchParams(window.location.search).get("courseid") != null) {
                let landing = "No description for this course", details, settings, objectives, agendas;
                try {
                    landing = await $.ajax({
                        url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&entityid=${new URLSearchParams(window.location.search).get("courseid")}&path=Templates/Data/Course/landing-page.html`),
                        method: "GET",
                        dataType: "html",
                        contentType: "application/json; charset=utf-8"
                    })
                } catch (e) {}

                try {
                    details = await $.ajax({
                        url: hlp.api(`/cmd?cmd=getenrollment3&_token=${hlp.session.token}&enrollmentid=${new URLSearchParams(window.location.search).get("eid")}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    })
                } catch (e) {}

                details = details.response.enrollment
                let score = Math.round((details.enrollmentmetrics.achieved / details.enrollmentmetrics.possible) * 100)

                
                ////////////////////////////////////////////////////////////
                ///////// OBJECTIVES
                try {
                    settings = await $.ajax({
                        url: hlp.api(`/dlap.ashx?cmd=getdomainsettings&domainid=//${hlp.session.userspace}&path=public/shadow/app/buzz/settings.xml`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    })
                } catch (e) {}


                let guids = "";
                $.each(settings.response.settings["scoring-objective-list"]["scoring-objective"], (i, objective) => {
                    if (i < settings.response.settings["scoring-objective-list"]["scoring-objective"].length - 1)
                        guids += `${objective.guid}|`
                    else 
                        guids += `${objective.guid}`;
                });

                objectives = await $.ajax({
                    url: hlp.api(`/cmd/getobjectivelist?_token=${hlp.session.token}&guid=${guids}`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                })
                
                let objective_score = [];

                try {
                    objective_score = details.enrollmentmetrics.objectivescores.objectivescore;
                } catch (e) {}
                
                let agency = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Agency")).guid)),
                    collaboration = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Collaboration")).guid)),
                    kt = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Knowledge & Thinking")).guid)),
                    oral = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Oral Communication")).guid)),
                    written = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Written Communication")).guid))
                ////////////////////////////////////////////////////////////


                ////////////////////////////////////////////////////////////
                ///////// AGENDA
                try {
                    agendas = await $.ajax({
                        url: hlp.api(`/cmd/getresourcelist2?_token=${hlp.session.token}&class=EVNT&path=AGND/*&entityid=${new URLSearchParams(window.location.search).get("courseid")}`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    })
                } catch (e) {}

                let agenda = "";
                if (agendas.response.resources.resource.some(date => date.path === `AGND/${new Date().toLocaleDateString('sv-SE')}`)) {
                    try {
                        agenda = await $.ajax({
                            url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&class=EVNT&entityid=${new URLSearchParams(window.location.search).get("courseid")}&path=AGND/${new Date().toLocaleDateString('sv-SE')}`),
                            method: "GET",
                            dataType: "html",
                            contentType: "application/json; charset=utf-8"
                        })
                    } catch (e) {}
                } else {
                    agenda = `<span class="flex justify-center items-center">No agenda for today</span>`;
                }
                ////////////////////////////////////////////////////////////


                ////////////////////////////////////////////////////////////
                ///////// ACTIVITIES
                // TODO:
                ////////////////////////////////////////////////////////////


                $("#go-back").attr("id", "semi-back");
                $("#reload").addClass("invisible");

                await $("#courses").parent().append(`
                    <div id="opened" class="flex flex-col gap-5">
                        <div class="flex flex-col gap-5">
                            <div class="flex flex-row gap-5">
                                <div class="relative flex-1 flex flex-col justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                                    <div class="flex justify-center items-center h-full">
                                        <svg width="136" height="136" viewBox="0 0 136 136">
                                            <circle class="stroke-zinc-700" cx="68" cy="68" r="54" fill="none" stroke="inherit" stroke-width="16" />
                                            <circle class="stroke-${hlp.score_to_color(score)}-500" cx="68" cy="68" r="54" fill="none" stroke-width="16" stroke-dasharray="339.292" stroke-dashoffset="${339.292 * (1 - score / 100)}" transform="rotate(-90 68 68)" />
                                        </svg>
                                    </div>
                                    <div class="absolute inset-0 flex flex-col justify-center items-center">
                                        <span class="score font-bold text-3xl">${isNaN(score) ? "0" : score}</span>
                                        <span class="font-bold text-zinc-400 text-sm">Overall</span>
                                    </div>
                                </div>
                                ${objective_score.length != 0 ? `
                                <div class="flex flex-col gap-5">
                                    ${agency != undefined ? `
                                    <div class="relative flex-1 bg-zinc-800 rounded-xl py-3 px-3">
                                        <div class="flex flex-col gap-2">
                                            <span class="font-bold">Agency</span>
                                            <div class="flex flex-row gap-10 sm:gap-20 justify-between items-center">
                                                <span class="font-bold">${hlp.decode_score(agency)}</span>
                                                <div class="rounded-xl bg-yellow-500 p-4"></div>
                                            </div>
                                        </div>
                                    </div>
                                    ` : ""}
                                    ${collaboration != undefined ? `
                                    <div class="relative flex-1 bg-zinc-800 rounded-xl py-3 px-3">
                                        <div class="flex flex-col gap-2">
                                            <span class="font-bold">Collaboration</span>
                                            <div class="flex flex-row gap-10 sm:gap-20 justify-between items-center">
                                                <span class="font-bold">${hlp.decode_score(collaboration)}</span>
                                                <div class="rounded-xl bg-violet-500 p-4"></div>
                                            </div>
                                        </div>
                                    </div>
                                    ` : ""}
                                </div>
                                ` : ""}
                            </div>
                            ${objective_score.length != 0 ? `
                            <div class="flex flex-row flex-wrap gap-5">
                                ${kt != undefined ? `
                                <div class="relative flex-1 bg-zinc-800 rounded-xl py-3 px-3">
                                    <div class="flex flex-col gap-2">
                                        <span class="font-bold">K & T</span>
                                        <div class="flex flex-row gap-5 sm:gap-20 justify-between items-center">
                                            <span class="font-bold">${hlp.decode_score(kt)}</span>
                                            <div class="rounded-xl bg-blue-500 p-4"></div>
                                        </div>
                                    </div>
                                </div>
                                ` : ""}
                                ${oral != undefined ? `
                                <div class="relative flex-1 bg-zinc-800 rounded-xl py-3 px-3">
                                    <div class="flex flex-col gap-2">
                                        <span class="font-bold">Comms</span>
                                        <div class="flex flex-row gap-5 sm:gap-20 justify-between items-center">
                                            <span class="font-bold">${hlp.decode_score(kt)}</span>
                                            <div class="rounded-xl bg-green-500 p-4"></div>
                                        </div>
                                    </div>
                                </div>
                                ` : ""}
                                ${written != undefined ? `
                                <div class="relative flex-1 bg-zinc-800 rounded-xl py-3 px-3">
                                    <div class="flex flex-col gap-2">
                                        <span class="font-bold">Written</span>
                                        <div class="flex flex-row gap-5 sm:gap-20 justify-between items-center">
                                            <span class="font-bold">${hlp.decode_score(written)}</span>
                                            <div class="rounded-xl bg-cyan-500 p-4"></div>
                                        </div>
                                    </div>
                                </div>
                                ` : ""}
                            </div>
                            ` : ""}
                        </div>
                        <div class="flex flex-col justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                            <span class="font-bold text-2xl border-b-[2px] border-zinc-700 pb-3">${details.course.title}</span>
                            <div class="pt-3">
                                ${hlp.format(landing).replace(/\[~]/g, `https://api.agilixbuzz.com/Resz/${hlp.session.token}/${new URLSearchParams(window.location.search).get("eid")}/Assets`)}
                            </div>
                        </div>
                        <div class="flex flex-row gap-5">
                            <div id="agenda-date" class="flex flex-1 flex-col bg-zinc-800 justify-center items-center rounded-xl w-min py-3 px-3">
                                <span class="font-bold">${new Date().toLocaleDateString('en-US')}</span>
                            </div>
                            <div id="agenda-back" class="flex flex-2 flex-col bg-zinc-800 justify-center items-center cursor-pointer rounded-xl w-min py-3 px-3">
                                <span class="material-symbols-rounded">
                                    arrow_back_ios_new
                                </span>
                            </div>
                            <div id="agenda-forward" class="flex flex-2 flex-col bg-zinc-800 justify-center items-center cursor-pointer rounded-xl w-min py-3 px-3">
                                <span class="material-symbols-rounded">
                                    arrow_forward_ios
                                </span>
                            </div>
                        </div>
                        <div class="flex flex-col justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                            ${hlp.format(agenda)}
                        </div>
                    </div>
                `).find("#courses").hide();

                // TODO: Do the thing with agenda to go to previous agendas

                $("[goto]").on("click", function (event) {
                    window.open($(this).attr("goto"), "_blank")
                })
            }

            $("#courses").empty();
            $.each(course_list, function (i, course) {
                try {
                    let hidden_courses = hlp.get("hidden");
                    if (hidden_courses.find(name => name.course.includes(course.courseid)).$hidden)
                        return;
                } catch (e) {}

                $("#courses").append(`
                    <div uid="${course.id}" eid="${course.enrollmentid}" courseid="${course.courseid}" class="flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                        <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                            <div class="flex justify-center items-center bg-${hlp.score_to_color(course.score)}-500 px-4 py-3 rounded-2xl">
                                <span class="text-1xl font-bold py-2 px-2 w-max flex justify-center">
                                ${isNaN(course.score) ? "N/A" : `${course.score}`}
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
                `).children().off().on("click", function (event) {
                    hlp.load(async function () {
                        history.pushState({}, "", `?page=${new URLSearchParams(window.location.search).get("page")}&target=activity&eid=${$(event.target).attr("eid")}&courseid=${$(event.target).attr("courseid")}`);
                        
                        let landing = "No description for this course", details, settings, objectives, agendas;
                        
                        try {
                            landing = await $.ajax({
                                url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&entityid=${$(event.target).attr("courseid")}&path=Templates/Data/Course/landing-page.html`),
                                method: "GET",
                                dataType: "html",
                                contentType: "application/json; charset=utf-8"
                            })
                        } catch (e) {}

                        try {
                            details = await $.ajax({
                                url: hlp.api(`/cmd?cmd=getenrollment3&_token=${hlp.session.token}&enrollmentid=${$(event.target).attr("eid")}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                                method: "GET",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8"
                            })
                        } catch (e) {}

                        details = details.response.enrollment
                        let score = Math.round((details.enrollmentmetrics.achieved / details.enrollmentmetrics.possible) * 100)

                        
                        ////////////////////////////////////////////////////////////
                        ///////// OBJECTIVES
                        try {
                            settings = await $.ajax({
                                url: hlp.api(`/dlap.ashx?cmd=getdomainsettings&domainid=//${hlp.session.userspace}&path=public/shadow/app/buzz/settings.xml`),
                                method: "GET",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8"
                            })
                        } catch (e) {}

                        let guids = "";
                        $.each(settings.response.settings["scoring-objective-list"]["scoring-objective"], (i, objective) => {
                            if (i < settings.response.settings["scoring-objective-list"]["scoring-objective"].length - 1)
                                guids += `${objective.guid}|`
                            else 
                                guids += `${objective.guid}`;
                        });

                        try {
                            objectives = await $.ajax({
                                url: hlp.api(`/cmd/getobjectivelist?_token=${hlp.session.token}&guid=${guids}`),
                                method: "GET",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8"
                            })
                        } catch (e) {}
                        
                        let objective_score = [];

                        try {
                            objective_score = details.enrollmentmetrics.objectivescores.objectivescore;
                        } catch (e) {}
                        
                        let agency = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Agency")).guid)),
                            collaboration = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Collaboration")).guid)),
                            kt = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Knowledge & Thinking")).guid)),
                            oral = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Oral Communication")).guid)),
                            written = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Written Communication")).guid))
                        ////////////////////////////////////////////////////////////


                        ////////////////////////////////////////////////////////////
                        ///////// AGENDA
                        try {
                            agendas = await $.ajax({
                                url: hlp.api(`/cmd/getresourcelist2?_token=${hlp.session.token}&class=EVNT&path=AGND/*&entityid=${$(event.target).attr("courseid")}`),
                                method: "GET",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8"
                            })
                        } catch (e) {}

                        let agenda = "";
                        if (agendas.response.resources.resource.some(date => date.path === `AGND/${new Date().toLocaleDateString('sv-SE')}`)) {
                            try {
                                agenda = await $.ajax({
                                    url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&class=EVNT&entityid=${$(event.target).attr("courseid")}&path=AGND/${new Date().toLocaleDateString('sv-SE')}`),
                                    method: "GET",
                                    dataType: "html",
                                    contentType: "application/json; charset=utf-8"
                                })
                            } catch (e) {}
                        } else {
                            agenda = `<span class="flex justify-center items-center">No agenda for today</span>`;
                        }
                        ////////////////////////////////////////////////////////////


                        ////////////////////////////////////////////////////////////
                        ///////// ACTIVITIES
                        // TODO:
                        ////////////////////////////////////////////////////////////


                        $("#go-back").attr("id", "semi-back");
                        $("#reload").addClass("invisible");

                        await $("#courses").parent().append(`
                            <div id="opened" class="flex flex-col gap-5">
                                <div class="flex flex-col gap-5">
                                    <div class="flex flex-row gap-5">
                                        <div class="relative flex-1 flex flex-col justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                                            <div class="flex justify-center items-center h-full">
                                                <svg width="136" height="136" viewBox="0 0 136 136">
                                                    <circle class="stroke-zinc-700" cx="68" cy="68" r="54" fill="none" stroke="inherit" stroke-width="16" />
                                                    <circle class="stroke-${hlp.score_to_color(score)}-500" cx="68" cy="68" r="54" fill="none" stroke-width="16" stroke-dasharray="339.292" stroke-dashoffset="${339.292 * (1 - score / 100)}" transform="rotate(-90 68 68)" />
                                                </svg>
                                            </div>
                                            <div class="absolute inset-0 flex flex-col justify-center items-center">
                                                <span class="score font-bold text-3xl">${isNaN(score) ? "0" : score}</span>
                                                <span class="font-bold text-zinc-400 text-sm">Overall</span>
                                            </div>
                                        </div>
                                        ${objective_score.length != 0 ? `
                                        <div class="flex flex-col gap-5">
                                            ${agency != undefined ? `
                                            <div class="relative flex-1 bg-zinc-800 rounded-xl py-3 px-3">
                                                <div class="flex flex-col gap-2">
                                                    <span class="font-bold">Agency</span>
                                                    <div class="flex flex-row gap-10 sm:gap-20 justify-between items-center">
                                                        <span class="font-bold">${hlp.decode_score(agency)}</span>
                                                        <div class="rounded-xl bg-yellow-500 p-4"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            ` : ""}
                                            ${collaboration != undefined ? `
                                            <div class="relative flex-1 bg-zinc-800 rounded-xl py-3 px-3">
                                                <div class="flex flex-col gap-2">
                                                    <span class="font-bold">Collaboration</span>
                                                    <div class="flex flex-row gap-10 sm:gap-20 justify-between items-center">
                                                        <span class="font-bold">${hlp.decode_score(collaboration)}</span>
                                                        <div class="rounded-xl bg-violet-500 p-4"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            ` : ""}
                                        </div>
                                        ` : ""}
                                    </div>
                                    ${objective_score.length != 0 ? `
                                    <div class="flex flex-row flex-wrap gap-5">
                                        ${kt != undefined ? `
                                        <div class="relative flex-1 bg-zinc-800 rounded-xl py-3 px-3">
                                            <div class="flex flex-col gap-2">
                                                <span class="font-bold">K & T</span>
                                                <div class="flex flex-row gap-5 sm:gap-20 justify-between items-center">
                                                    <span class="font-bold">${hlp.decode_score(kt)}</span>
                                                    <div class="rounded-xl bg-blue-500 p-4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        ` : ""}
                                        ${oral != undefined ? `
                                        <div class="relative flex-1 bg-zinc-800 rounded-xl py-3 px-3">
                                            <div class="flex flex-col gap-2">
                                                <span class="font-bold">Comms</span>
                                                <div class="flex flex-row gap-5 sm:gap-20 justify-between items-center">
                                                    <span class="font-bold">${hlp.decode_score(kt)}</span>
                                                    <div class="rounded-xl bg-green-500 p-4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        ` : ""}
                                        ${written != undefined ? `
                                        <div class="relative flex-1 bg-zinc-800 rounded-xl py-3 px-3">
                                            <div class="flex flex-col gap-2">
                                                <span class="font-bold">Written</span>
                                                <div class="flex flex-row gap-5 sm:gap-20 justify-between items-center">
                                                    <span class="font-bold">${hlp.decode_score(written)}</span>
                                                    <div class="rounded-xl bg-cyan-500 p-4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        ` : ""}
                                    </div>
                                    ` : ""}
                                </div>
                                <div class="flex flex-col justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                                    <span class="font-bold text-2xl border-b-[2px] border-zinc-700 pb-3">${details.course.title}</span>
                                    <div class="pt-3">
                                        ${hlp.format(landing).replace(/\[~]/g, `https://api.agilixbuzz.com/Resz/${hlp.session.token}/${$(event.target).attr("eid")}/Assets`)}
                                    </div>
                                </div>
                                <div class="flex flex-row gap-5">
                                    <div id="agenda-date" class="flex flex-1 flex-col bg-zinc-800 justify-center items-center rounded-xl w-min py-3 px-3">
                                        <span class="font-bold">${new Date().toLocaleDateString('en-US')}</span>
                                    </div>
                                    <div id="agenda-back" class="flex flex-2 flex-col bg-zinc-800 justify-center items-center cursor-pointer rounded-xl w-min py-3 px-3">
                                        <span class="material-symbols-rounded">
                                            arrow_back_ios_new
                                        </span>
                                    </div>
                                    <div id="agenda-forward" class="flex flex-2 flex-col bg-zinc-800 justify-center items-center cursor-pointer rounded-xl w-min py-3 px-3">
                                        <span class="material-symbols-rounded">
                                            arrow_forward_ios
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-col justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                                    ${hlp.format(agenda)}
                                </div>
                            </div>
                        `).find("#courses").hide();

                        // TODO: Do the thing with agenda to go to previous agendas

                        $("[goto]").on("click", function (event) {
                            window.open($(this).attr("goto"), "_blank")
                        })
                    })
                })
            })
        }

        await call();
    })
}