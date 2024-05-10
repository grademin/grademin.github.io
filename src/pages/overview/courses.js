export async function run() {
    const hlp = await import("../../helpers.js");
    const site = await import("../../site.js");

    await hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="${hlp.gettheme("bg", "700")} text-white">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row ${hlp.gettheme("bg", "700")}">
                    <div class="flex justify-center items-center container mx-auto py-2 px-4">
                        <div id="go-back" class="-ml-4 flex-2 cursor-pointer py-3 pl-4 pr-2 rounded-full">
                            <svg class="w-[25px] pointer-events-none" viewBox="-14 -1000 1000 1000">
                                <path class="fill-white w-0" d="m213-480 278 277q22 23 22.5 55T491-94q-22 22-54.5 22T381-94L90-384q-20-21-30-45.5T50-480q0-27 10-51.5T90-576l291-292q23-22 55.5-22t54.5 22q22 22 22 55t-22 55L213-480Z"/>
                            </svg>
                        </div>
                        <span class="flex-grow font-bold text-center text-[22px]">Courses</span>
                        <div id="reload" class="-mr-2 flex-2 cursor-pointer py-3 pl-4 pr-2 rounded-full">
                            <svg class="w-[25px] pointer-events-none" viewBox="-14 -1000 1000 1000">
                                <path class="fill-white w-0" d="M476.28-113Q324-113 216.5-220 109-327 109-479t107.5-260Q324-847 476-847q78.29 0 148.15 31.5Q694-784 745-726v-68q0-22 14.8-37.5t37.7-15.5q22.9 0 38.2 15.5Q851-816 851-794v229q0 27.6-20.2 47.8Q810.6-497 783-497H552q-21.57 0-36.79-15.58Q500-528.16 500-550.28q0-21.69 15.5-36.71Q531-602 553-602h117q-33-50-83.9-78.5Q535.2-709 476-709q-96 0-163.5 66.92Q245-575.17 245-479q0 96.33 67.5 163.17Q380-249 476-249q56 0 104.61-25.81Q629.22-300.63 662-346q15.62-22.16 41.81-30.58Q730-385 754.74-375q26.26 10 37.76 32.5Q804-320 792-298q-48 84-132.19 134.5T476.28-113Z"/>
                            </svg>
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
                <div class="${hlp.gettheme("theme-card")}">
                    <div class="flex flex-row justify-between items-center">
                        <a id="overview" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="w-8 font-black pointer-events-none">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="${hlp.gettheme("fill", "700")}" d="M117-212v-341q0-33 14-61.5t40-47.5l227-171q37-27 82-27t82 27l227 171q26 19 40 47.5t14 61.5v341q0 57-39.5 96.5T707-76h-67q-29 0-48.5-20T572-144v-196q0-28-20-48t-48-20h-48q-28 0-48 20t-20 48v196q0 28-19.5 48T320-76h-67q-57 0-96.5-39.5T117-212Z"/>
                                </svg>
                            </span>
                        </a>
                        <a id="calendar" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="w-8 font-black pointer-events-none material-symbols-rounded">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="${hlp.gettheme("theme-fill")}" d="M210-34q-57.12 0-96.56-40.14Q74-114.28 74-170v-541q0-57.13 39.44-96.56Q152.88-847 210-847h15v-23q0-22.6 17.2-39.3Q259.4-926 282-926q24 0 40 16.7t16 39.3v23h284v-23q0-22.6 16.5-39.3 16.5-16.7 40-16.7t40 16.7Q735-892.6 735-870v23h15q57.13 0 96.56 39.44Q886-768.13 886-711v541q0 55.72-39.44 95.86Q807.13-34 750-34H210Zm0-136h540v-398H210v398Zm270.49-220q-20.91 0-35.7-14.59Q430-419.18 430-439.79q0-20.61 14.79-35.41 14.79-14.8 35.7-14.8 20.91 0 35.21 14.59t14.3 35.2q0 20.61-14.3 35.41-14.3 14.8-35.21 14.8Zm-160.28 0q-20.61 0-35.41-14.59-14.8-14.59-14.8-35.2 0-20.61 14.59-35.41 14.59-14.8 35.2-14.8 20.61 0 35.41 14.59 14.8 14.59 14.8 35.2 0 20.61-14.59 35.41-14.59 14.8-35.2 14.8Zm319.3 0Q620-390 605-404.59q-15-14.59-15-35.2 0-20.61 15-35.41 15-14.8 35.01-14.8 20.01 0 35 14.59Q690-460.82 690-440.21q0 20.61-14.79 35.41-14.79 14.8-35.7 14.8ZM480.49-230q-20.91 0-35.7-15Q430-260 430-280.01q0-20.01 14.79-35Q459.58-330 480.49-330q20.91 0 35.21 14.79t14.3 35.7Q530-260 515.7-245q-14.3 15-35.21 15Zm-160.28 0q-20.61 0-35.41-15-14.8-15-14.8-35.01 0-20.01 14.59-35Q299.18-330 319.79-330q20.61 0 35.41 14.79 14.8 14.79 14.8 35.7Q370-260 355.41-245q-14.59 15-35.2 15Zm319.3 0Q620-230 605-245q-15-15-15-35.01 0-20.01 15-35Q620-330 640.01-330q20.01 0 35 14.79Q690-300.42 690-279.51 690-260 675.21-245q-14.79 15-35.7 15Z"/>
                                </svg>
                            </span>
                        </a>
                        <a id="grades" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="w-8 font-black pointer-events-none material-symbols-rounded">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="${hlp.gettheme("theme-fill")}" d="M212-76q-57.4 0-96.7-39.3Q76-154.6 76-212v-536q0-57.4 39.3-96.7Q154.6-884 212-884h536q57.4 0 96.7 39.3Q884-805.4 884-748v536q0 57.4-39.3 96.7Q805.4-76 748-76H212Zm108.42-489q-18.42 0-31.92 13.2T275-520v201q0 18.6 13.28 31.8t32 13.2Q339-274 352-287.2t13-31.8v-201q0-18.6-13.08-31.8t-31.5-13.2Zm160-121q-18.42 0-31.92 13.2T435-641v322q0 18.6 13.28 31.8t32 13.2Q499-274 512-287.2t13-31.8v-322q0-18.6-13.08-31.8t-31.5-13.2Zm159.3 241Q621-445 608-431.5T595-400v81q0 18.6 13.08 31.8t31.5 13.2q18.42 0 31.92-13.2T685-319v-81q0-18-13.28-31.5t-32-13.5Z"/>
                                </svg>
                            </span>
                        </a>
                        <a id="settings" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="w-8 font-black pointer-events-none material-symbols-rounded">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="${hlp.gettheme("theme-fill")}" d="M405-34q-32 0-55-20t-27-51l-10-70q-3-2-6.5-4t-6.5-4l-65 27q-29 12-59 2.5T131-191L56-325q-16-27-10-57.5T77-431l54-42q0-2 .5-4t.5-4q0-2-.5-3.5t-.5-3.5l-53-40q-26-19-32-49.5T56-636l75-132q16-27 45-37t58 2l66 26q4-1 7.5-3t6.5-4l9-70q3-32 26.5-52.5T405-927h150q32 0 55.5 20.5T637-854l9 70 8 4 8 4 62-27q30-12 59.5-2t45.5 37l75 132q16 28 10 58.5T882-528l-55 40v8q0 2-.5 4t-.5 4l55 40q26 18 32 48.5T903-325l-76 134q-15 27-44.5 37t-59.5-2l-65-27q-3 1-6 3.5t-5 3.5l-10 71q-4 31-27 51t-55 20H405Zm73-296q63 0 107-44t44-107q0-62-44-106.5T478-632q-63 0-107 44.5T327-481q0 63 44 107t107 44Z"/>
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        `).click(async function (e) {
            switch ($(e.target).attr("id")) {
                /**
                 * Navbar
                 */
                case "go-back": {
                    await site.runtime("overview");
                    break;
                }
                case "reload": {
                    $("#courses").empty();
                    $("#course").remove();
                    await hlp.load(async function () {
                        await call();
                    });
                    break;
                }
                case "semi-back": {
                    hlp.page.setparams();
                    $("#semi-back").attr("id", "go-back");
                    $("#course").remove();
                    $("#courses").empty().show()
                    await hlp.load(async function () {
                        await call();
                    });
                    break;
                }

                /**
                 * Color legend
                 */
                case "agency":
                case "collaboration":
                case "knowlege":
                case "oral":
                case "written": {
                    $("body").addClass("overflow-hidden");
                    $("#overlays").append(`
                        <div id="overlay" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                            <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                <div class="${hlp.gettheme("theme-card")} rounded-xl max-w-lg px-5 py-5 pointer-events-auto">
                                    <div class="flex justify-center items-center mb-4">
                                        <h2 class="text-2xl font-bold ${hlp.gettheme("theme-text")} text-center">Color Legend</h2>
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

                /**
                 * Navigation
                 */
                case "calendar": {
                    hlp.page.setparams();
                    await site.runtime("calendar");
                    break;
                }
                case "grades": {
                    hlp.page.setparams();
                    await site.runtime("grades");
                    break;
                }
                case "overview": {
                    hlp.page.setparams();
                    site.runtime("overview");
                    break;
                }
                case "settings": {
                    hlp.page.setparams();
                    await site.runtime("settings");
                    break;
                }
            }
        });

        async function call() {
            let order = [];
            let courses = [];

            await hlp.prevent_errors(async function () {
                order = await $.ajax({
                    url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&entityid=${hlp.session.id}&path=Assets%2FBuzzCourseCardSettings.json`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });

                if (order.response.code != "OK") {
                    order = [];
                    throw new Error("Order couldn't be found!");
                }
            }, false);

            await hlp.prevent_errors(async function () {
                courses = await $.ajax({
                    url: hlp.api(`/cmd/listuserenrollments?_token=${hlp.session.token}&userid=${hlp.session.id}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });

                if (courses.response.code != "OK") {
                    courses = [];
                    throw new Error("No courses were found!");
                }
            }, false)

            let course_list = [];
            if (courses.length != 0) {
                $.each(courses.response.enrollments.enrollment, function (i, course) {
                    course_list.push({
                        order: order.length == 0 ? undefined : order[course.id].order,
                        id: course.id,
                        enrollmentid: course.enrollmentmetrics.enrollmentid,
                        courseid: course.courseid,
                        title: course.course.title.trim(),
                        start: new Date(course.course.startdate).toLocaleDateString(undefined, {month: "long", year: "numeric", day: "numeric" }),
                        end: new Date(course.course.enddate).toLocaleDateString(undefined, {month: "long", year: "numeric", day: "numeric"}),
                        score: hlp.decode_score(course.enrollmentmetrics, course.enrollmentmetrics)
                    })
                })
            }

            if (course_list != 0) {
                course_list = course_list.sort((first, last) => first.order - last.order);

                if (hlp.page.getparams != undefined && hlp.page.getparams[0].eid != undefined && hlp.page.getparams[1].courseid != undefined) {
                    await content(hlp.page.getparams[0].eid, hlp.page.getparams[1].courseid);   
                }

                await $.each(course_list, function (i, course) {
                    if (hlp.hidden(course.courseid)) {
                        return;
                    }

                    $("#courses").append(`
                        <div uid="${course.id}" eid="${course.enrollmentid}" courseid="${course.courseid}" class="flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                            <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                                <div class="flex justify-center items-center bg-${hlp.score_to_color(course.score)}-500 px-9 py-6 rounded-2xl">
                                    <span class="score-text text-1xl font-bold text-white w-0 flex justify-center whitespace-nowrap">
                                        ${isNaN(course.score) ? `<span class="${hlp.gettheme("theme-text")} w-max">N/A</span>` : `0`}
                                    </span>
                                    <span class="score hidden">${isNaN(course.score) ? `NULL` : `${course.score}`}</span>
                                </div>
                                <div class="flex flex-col">
                                    <h1 class="text-[22px] w-[2ch] md-sm:w-[5ch] lg-sm:w-[10ch] xl-sm:w-[15ch] 1xl-sm:w-[19ch] 2xl-sm:w-[22ch] md:w-[40ch] lg:w-full truncate font-bold">${course.title}</h1>
                                    <span class="font-bold w-[2ch] md-sm:w-[5ch] lg-sm:w-[10ch] xl-sm:w-[15ch] 1xl-sm:w-[19ch] 2xl-sm:w-[22ch] md:w-[40ch] lg:w-full truncate text-zinc-400">${course.start} - ${course.end}</span>
                                </div>
                            </div>
                            <div class="flex w-6 justify-center items-center pointer-events-none">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="${hlp.gettheme("theme-fill")}" d="M542-480 265-758q-23-22-23-54t22-55q23-22 55.5-22t54.5 22l292 291q20 20 29.5 44.5T705-480q0 26-9.5 50.5T666-384L374-93q-22 22-54 21.5T265-94q-22-22-22-54.5t22-54.5l277-277Z"/>
                                </svg>
                            </div>
                        </div>
                    `).children().off().click(function (e) {
                        hlp.load(async function () {
                            await content($(e.target).attr("eid"), $(e.target).attr("courseid"));
                        })
                    })
                })

                let wait = 0;
                $.each($("#courses div"), (i, score) => {
                    if ($(score).find(".score").text().trim() != "NULL") {
                        wait++;
                        setTimeout(function () {
                            var percentage = $(score).find(".score").text();
                            
                            $({scoreCounter: 0}).animate({scoreCounter: percentage}, {
                                duration: 1000,
                                easing: 'linear',
                                step: function () {
                                    $(score).find(".score-text").text(Math.ceil(this.scoreCounter));
                                },
                                complete: function () {
                                    $(score).find(".score-text").text(percentage);
                                }
                            });
                        }, wait * 15);
                    }
                });

                if ($("#courses div").length == 0) {
                    $("#courses").append(`
                        <div id="error" class="flex flex-col container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                            <div class="flex flex-row justify-between container mx-auto cursor-pointer">
                                <div class="flex flex-row justify-center items-center pointer-events-none w-full">
                                    <div class="flex flex-col justify-center items-center">
                                        <h1 class="text-[18px] font-bold">No courses were found.</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)
                }
            } else {
                $("#courses").append(`
                    <div id="error" class="flex flex-col container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                        <div class="flex flex-row justify-between container mx-auto cursor-pointer">
                            <div class="flex flex-row justify-center items-center pointer-events-none w-full">
                                <div class="flex flex-col justify-center items-center">
                                    <h1 class="text-[18px] font-bold">No courses were found.</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            }

            async function content(eid, courseid) {
                $("#go-back").attr("id", "semi-back")
                hlp.page.setparams({eid: eid}, {courseid: courseid});

                let landing = "";
                let course = [];
                let settings = [];
                let objectives = [];
                let agendas = [];
                let agenda = "";
                let work = [];
                let worklist = "";

                await hlp.prevent_errors(async function () {
                    landing = await $.ajax({
                        url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&entityid=${courseid}&path=Templates/Data/Course/landing-page.html`),
                        method: "GET",
                        dataType: "html",
                        contentType: "application/html; charset=utf-8"
                    });

                    if (landing == "") {
                        landing = "<span>No description for this course was found</span>";
                        throw new Error("No announcement info was found!");
                    } else {
                        landing = hlp.format(landing).replace(/\[~]/g, hlp.api(`/Resz/${hlp.session.token}/${eid}/Assets`));
                    }
                }, false, async function () {
                    landing = "<span>No description for this course was found</span>";
                })
                
                await hlp.prevent_errors(async function () {
                    course = await $.ajax({
                        url: hlp.api(`/cmd?cmd=getenrollment3&_token=${hlp.session.token}&enrollmentid=${eid}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    });
                    
                    if (course.response.code != "OK" || course.response == undefined) {
                        course = [];
                        hlp.page.setparams();
                        hlp.runtime("courses");
                        throw new Error(`The contents of ${eid} does not exist!`);
                    }
                }, false)

                let score = 0;
                if (course.length != 0) {
                    score = Math.round((course.response.enrollment.enrollmentmetrics.achieved / course.response.enrollment.enrollmentmetrics.possible) * 100);
                }

                if (isNaN(score)) {
                    score = 0;
                }
                
                await hlp.prevent_errors(async function () {
                    settings = await $.ajax({
                        url: hlp.api(`/dlap.ashx?cmd=getdomainsettings&domainid=//${hlp.session.userspace}&path=public/shadow/app/buzz/settings.xml`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    });
    
                    if (settings.response.code != "OK") {
                        settings = [];
                        throw new Error("No courses were found!");
                    }
                }, false)
    
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
                    await hlp.prevent_errors(async function () {
                        objectives = await $.ajax({
                            url: hlp.api(`/cmd/getobjectivelist?_token=${hlp.session.token}&guid=${guids}`),
                            method: "GET",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8"
                        })
                        
                        if (objectives.response.code != "OK") {
                            objectives = [];
                            throw new Error("No courses were found!");
                        }
                    }, false)

                    await hlp.prevent_errors(async function () {
                        objective = course.response.enrollment.enrollmentmetrics.objectivescores.objectivescore;                    
                    }, false);

                    a = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Agency")).guid));
                    c = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Collaboration")).guid));
                    k = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Knowledge & Thinking")).guid));
                    o = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Oral Communication")).guid));
                    w = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Written Communication")).guid));
                }

                await hlp.prevent_errors(async function () {
                    agendas = await $.ajax({
                        url: hlp.api(`/cmd/gestresourcelist2?_token=${hlp.session.token}&class=EVNT&path=AGND/*&entityid=${courseid}`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    });

                    if (agendas.response.code != "OK") {
                        agendas = [];
                        throw new Error("No announcement info was found!");
                    }
                }, false)

                if (agendas.length != 0) {
                    agendas.response.resources.resource.sort((first, last) => first.creationdate - last.creationdate);
                }

                await hlp.prevent_errors(async function () {
                    agenda = await $.ajax({
                        url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&class=EVNT&entityid=${courseid}&path=AGND/${new Date().toLocaleDateString('sv-SE')}`),
                        method: "GET",
                        dataType: "html",
                        contentType: "application/html; charset=utf-8"
                    });

                    if (agenda == "") {
                        agenda = `<span class="flex justify-center items-center">No agenda for today</span>`;
                        throw new Error("No announcement info was found!");
                    } else {
                        agenda = hlp.format(agenda);
                    }
                }, false, function () {
                    agenda = `<span class="flex justify-center font-bold items-center">No agenda for today</span>`;
                }, false)

                await hlp.prevent_errors(async function () {
                    work = await $.ajax({
                        url: hlp.api(`/cmd/getenrollmentgradebook2?_token=${hlp.session.token}&itemid=**&enrollmentid=${eid}`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8"
                    });

                    if (work.response.code != "OK") {
                        work = [];
                        throw new Error("No announcement info was found!");
                    }
                }, false)

                let new_a = undefined, new_c = undefined, new_k = undefined, new_o = undefined, new_w = undefined;
                if (work.length != 0) {
                    worklist = `
                        ${(() => {
                            let html = [];
                            $.each(work.response.enrollment.grades.items.item.reverse(), (i, item) => {                                
                                if (item.type != "Folder") {
                                    if (hlp.flags.grades(item.status).find(flag => flag == 0x4000) && !hlp.flags.grades(item.status).find(flag => flag == 0x80)) {
                                        hlp.prevent_errors(async function () {
                                            objective = item.objectivescores.objectivescore;                    
                                        })
                                        
                                        if (objectives.response != undefined) {
                                            new_a = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Agency")).guid));
                                            new_c = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Collaboration")).guid));
                                            new_k = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Knowledge & Thinking")).guid));
                                            new_o = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Oral Communication")).guid));
                                            new_w = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Written Communication")).guid));
                                        }

                                        let exists = 0;
                                        if (new_a != undefined || new_c != undefined || new_k != undefined || new_o != undefined || new_w != undefined) {
                                            if (new_a != undefined) {
                                                exists++
                                            } 
                                            if (new_c != undefined) {
                                                exists++
                                            }
                                            if (new_k != undefined) {
                                                exists++
                                            }
                                            if (new_o != undefined) {
                                                exists++
                                            }
                                            if (new_w != undefined) {
                                                exists++
                                            }

                                            let flex_type = "";

                                            switch (exists) {
                                                case 5:
                                                    flex_type = "3xl-sm:flex-none";
                                                    break;
                                                case 4:
                                                    flex_type = "2xl-sm:flex-none";
                                                    break;
                                                case 3:
                                                    flex_type = "xl-sm:flex-none";
                                                    break;
                                                case 2:
                                                    flex_type = "lg-sm:flex-none";
                                                    break;
                                                default:
                                                    flex_type = "md-sm:flex-none";
                                                    break;
                                            }

                                            console.log(flex_type)

                                            html.push(`
                                                <div class="flex flex-col gap-2">
                                                    <div class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                                        <div class="flex flex-row justify-center items-center gap-5 w-full">
                                                            <div class="flex flex-col w-full">
                                                                <h1 class="text-[22px] font-bold">${item.title}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="flex flex-row gap-2 flex-wrap container mx-auto">
                                                        ${new_a != undefined ? `
                                                        <div id="agency" class="relative w-min flex flex-1 ${flex_type} flex-row gap-5 justify-between cursor-pointer ${hlp.gettheme("theme-card")} rounded-xl py-2 px-3">
                                                            <span class="font-bold pointer-events-none">${hlp.decode_score(new_a)}</span>
                                                            <div class="rounded-lg bg-yellow-500 p-3 pointer-events-none"></div>
                                                        </div>
                                                        ` : ""}
                                                        ${new_c != undefined ? `
                                                        <div id="collaboration" class="relative w-min flex flex-1 ${flex_type} flex-row gap-5 justify-between cursor-pointer ${hlp.gettheme("theme-card")} rounded-xl py-2 px-3">
                                                            <span class="font-bold pointer-events-none">${hlp.decode_score(new_c)}</span>    
                                                            <div class="rounded-lg bg-violet-500 p-3 pointer-events-none"></div>
                                                        </div>
                                                        ` : ""}
                                                        ${new_k != undefined ? `
                                                        <div id="knowlege" class="relative w-min flex flex-1 ${flex_type} flex-row gap-5 justify-between cursor-pointer ${hlp.gettheme("theme-card")} rounded-xl py-2 px-3">
                                                            <span class="font-bold pointer-events-none">${hlp.decode_score(new_k)}</span>    
                                                            <div class="rounded-lg bg-blue-500 p-3 pointer-events-none"></div> 
                                                        </div>
                                                        ` : ""}
                                                        ${new_o != undefined ? `
                                                        <div id="oral" class="relative w-min flex flex-1 ${flex_type} flex-row gap-5 justify-between cursor-pointer ${hlp.gettheme("theme-card")} rounded-xl py-2 px-3">
                                                            <span class="font-bold pointer-events-none">${hlp.decode_score(new_o)}</span>
                                                            <div class="rounded-lg bg-green-500 p-3 pointer-events-none"></div>
                                                        </div>
                                                        ` : ""}
                                                        ${new_w != undefined ? `
                                                        <div id="written" class="relative w-min flex flex-1 ${flex_type} flex-row gap-5 justify-between cursor-pointer ${hlp.gettheme("theme-card")} rounded-xl py-2 px-3">
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
                                                    <div class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                                        <div class="flex flex-row justify-center items-center gap-5 w-full">
                                                            <div class="flex flex-col w-full">
                                                                <h1 class="text-[22px] font-bold">${item.title}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="flex flex-row gap-2 flex-wrap container mx-auto">
                                                        ${(() => {
                                                            let objectives = "";
                                                            for (let objective of item.objectivescores.objectivescore) {
                                                                objectives += `
                                                                    <div class="relative shadow-lg w-fiit flex flex-row gap-5 bg-${hlp.score_to_color(hlp.decode_score(objective))}-500 text-white justify-between rounded-xl py-2 px-3">
                                                                        <span class="font-bold">${hlp.decode_score(objective)}</span>
                                                                    </div>
                                                                `;
                                                            }

                                                            return objectives;
                                                        })()}
                                                    </div>
                                                </div>
                                            `);
                                        }
                                    } else if (hlp.flags.grades(item.status).find(flag => flag == 0x80) && !hlp.flags.grades(item.status).find(flag => flag == 0x01)) {
                                        html.push(`
                                            <div class="flex flex-col gap-2">
                                                <div class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                                    <div class="flex flex-row justify-center items-center gap-5 w-full">
                                                        <div class="flex flex-col w-full">
                                                            <h1 class="text-[22px] font-bold">${item.title}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex flex-row gap-2 container mx-auto">
                                                    <div class="relative w-min flex flex-row gap-5 ${hlp.gettheme("theme-card")} justify-between ${hlp.gettheme("theme-card")} rounded-xl py-2 px-3">
                                                        <span class="font-bold">Excused</span>
                                                    </div>
                                                </div>
                                            </div>
                                        `);
                                    } else if (hlp.flags.grades(item.status).find(flag => flag == 0x01)) {
                                        html.push(`
                                            <div class="flex flex-col gap-2">
                                                <div class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                                    <div class="flex flex-row justify-center items-center gap-5 w-full">
                                                        <div class="flex flex-col w-full">
                                                            <h1 class="text-[22px] font-bold">${item.title}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex flex-row gap-2 container mx-auto">
                                                    <div class="relative w-max nowrap flex flex-row gap-5 ${hlp.gettheme("theme-card")} justify-between ${hlp.gettheme("theme-card")} rounded-xl py-2 px-3">
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
                } else {
                    worklist = "";
                }

                await $("#courses").parent().append(`
                    <div id="course" class="flex flex-col gap-5">
                        <div class="flex flex-col gap-5">
                            <div class="flex ${a == undefined || c == undefined ? "flex-col" : "flex-col xl-sm:flex-row"} gap-5">
                                <div class="relative flex-1 flex flex-col justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                    <div class="flex justify-center items-center h-full">
                                        <svg width="136" height="136" viewBox="0 0 136 136">
                                            <circle class="${hlp.gettheme("theme-stroke")}" cx="68" cy="68" r="54" fill="none" stroke="inherit" stroke-width="16" />
                                            <circle class="stroke-${hlp.score_to_color(score)}-500" cx="68" cy="68" r="54" fill="none" stroke-width="16" stroke-dasharray="339.292" stroke-dashoffset="${339.292 * (1 - 0 / 100)}" transform="rotate(-90 68 68)" />
                                        </svg>
                                    </div>
                                    <div class="absolute inset-0 flex flex-col justify-center items-center">
                                        <span class="score-text font-bold text-3xl">0</span>
                                        <span class="score hidden">${score}</span>
                                        <span class="font-bold text-zinc-400 text-sm">Overall</span>
                                    </div>
                                </div>
                                ${objective.length != 0 && (a != undefined || c != undefined) ? `
                                <div class="flex flex-col gap-5">
                                    ${a != undefined ? `
                                    <div class="relative flex-1 ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                        <div class="flex flex-col gap-2">
                                            <span class="font-bold">Agency</span>
                                            <div class="flex flex-row gap-10 sm:gap-20 justify-between items-center">
                                                <span class="score-text font-bold">0</span>
                                                <span class="score hidden">${hlp.decode_score(a)}</span>
                                                <div class="rounded-xl bg-yellow-500 p-4"></div>
                                            </div>
                                        </div>
                                    </div>
                                    ` : ""}
                                    ${c != undefined ? `
                                    <div class="relative flex-1 ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                        <div class="flex flex-col gap-2">
                                            <span class="font-bold">Collaboration</span>
                                            <div class="flex flex-row gap-10 sm:gap-20 justify-between items-center">
                                                <span class="score-text font-bold">0</span>
                                                <span class="score hidden">${hlp.decode_score(c)}</span>
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
                                <div class="relative flex-1 ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                    <div class="flex flex-col gap-2">
                                        <span class="font-bold">K & T</span>
                                        <div class="flex flex-row gap-5 sm:gap-20 justify-between items-center">
                                            <span class="score-text font-bold">0</span>
                                            <span class="score hidden">${hlp.decode_score(k)}</span>
                                            <div class="rounded-xl bg-blue-500 p-4"></div>
                                        </div>
                                    </div>
                                </div>
                                ` : ""}
                                ${o != undefined ? `
                                <div class="relative flex-1 ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                    <div class="flex flex-col gap-2">
                                        <span class="font-bold">Comms</span>
                                        <div class="flex flex-row gap-5 sm:gap-20 justify-between items-center">
                                            <span class="score-text font-bold">0</span>
                                            <span class="score hidden">${hlp.decode_score(o)}</span>
                                            <div class="rounded-xl bg-green-500 p-4"></div>
                                        </div>
                                    </div>
                                </div>
                                ` : ""}
                                ${w != undefined ? `
                                <div class="relative flex-1 ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                    <div class="flex flex-col gap-2">
                                        <span class="font-bold">Written</span>
                                        <div class="flex flex-row gap-5 sm:gap-20 justify-between items-center">
                                            <span class="score-text font-bold">0</span>
                                            <span class="score hidden">${hlp.decode_score(w)}</span>
                                            <div class="rounded-xl bg-cyan-500 p-4"></div>
                                        </div>
                                    </div>
                                </div>
                                ` : ""}
                            </div>
                            ` : ""}
                        </div>
                        <div class="flex flex-col justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                            <span class="font-bold text-2xl border-b-[2px] border-zinc-700 pb-3">${course.response.enrollment.course.title}</span>
                            <div class="pt-3">
                                ${landing}
                            </div>
                        </div>
                        <div class="flex flex-col gap-5">
                            <div class="flex flex-col xl-sm:flex-row gap-5">
                                <div class="flex-1 flex flex-col md-sm:flex-row gap-5">
                                    <div id="agenda-back" type="backward" class="flex flex-2 flex-col ${hlp.gettheme("bg", "700")} transition text-white font-semibold rounded-xl justify-center items-center cursor-pointer rounded-xl py-3 px-3">
                                        <div class="flex w-6 justify-center items-center pointer-events-none">
                                            <svg class="w-full -rotate-180 h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                                <path class="fill-white" d="M542-480 265-758q-23-22-23-54t22-55q23-22 55.5-22t54.5 22l292 291q20 20 29.5 44.5T705-480q0 26-9.5 50.5T666-384L374-93q-22 22-54 21.5T265-94q-22-22-22-54.5t22-54.5l277-277Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div id="agenda-date" class="flex flex-col w-full ${hlp.gettheme("theme-card")} justify-center items-center rounded-xl py-3 px-3">
                                        <span class="font-bold flex-1 flex justify-center">${new Date().toLocaleDateString('en-US')}</span>
                                    </div>  
                                    <div id="agenda-forward" type="forward" class="flex flex-2 flex-col ${hlp.gettheme("bg", "700")} transition text-white font-semibold rounded-xl justify-center items-center cursor-pointer rounded-xl py-3 px-3">
                                        <div class="flex w-6 justify-center items-center pointer-events-none">
                                            <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                                <path class="fill-white" d="M542-480 265-758q-23-22-23-54t22-55q23-22 55.5-22t54.5 22l292 291q20 20 29.5 44.5T705-480q0 26-9.5 50.5T666-384L374-93q-22 22-54 21.5T265-94q-22-22-22-54.5t22-54.5l277-277Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <button id="today" type="today" class="flex flex-2 justify-center items-center px-4 py-3 ${hlp.gettheme("bg", "700")} transition text-white font-bold rounded-xl">Today</button>
                            </div>
                        </div>
                        <div id="agenda" class="flex flex-col justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                            ${agenda.replace(/\[~]/g, hlp.api(`/Resz/${hlp.session.token}/${eid}/Assets`))}
                        </div>
                        ${worklist.trim() != "" ? `
                        <div class="block w-full rounded-xl gap-5 shadow-lg ${hlp.gettheme("theme-card")} flex flex-row items-center">
                            <div class="pl-3">
                                <div class="flex w-6 justify-center items-center pointer-events-none">
                                    <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                        <path class="${hlp.gettheme("theme-fill")}" d="M371-289q-121.71 0-206.86-85.2Q79-459.41 79-581.2 79-703 164.2-788q85.21-85 207-85Q493-873 578-787.86q85 85.15 85 206.86 0 47-11.5 85T620-429l214 215q19 20 19 47.48 0 27.48-20 47.52-19.8 19-47.4 19-27.6 0-47.6-19L526.47-332Q497-313 457-301t-86 12Zm-.41-136q66.59 0 111.5-44.5T527-580.59q0-66.59-44.91-111.5T370.59-737Q304-737 259.5-692.09T215-580.59q0 66.59 44.5 111.09T370.59-425Z"/>
                                    </svg>
                                </div>
                            </div>
                            <input id="search" class="${hlp.gettheme("caret", "700")} bg-transparent pr-3 py-3 w-full font-bold focus:outline-none sm:text-sm">
                        </div>
                        <div id="worklist" class="flex flex-col gap-5">
                            ${worklist}
                        </div>
                        ` : ""}
                    </div>
                `).find("#courses").hide();

                // Overall Guage
                $.each($("#course svg"), (i, guage) => {
                    var circle = $(guage).find("[class^='stroke-'][class$='-500']");
                    var percentage = $(guage).parent().parent().find(".score").text();
                    var offset = 339.292 * (1 - percentage / 100);
                    circle.css("stroke-dashoffset", 339.292).animate({"stroke-dashoffset": offset}, 1000);
                    
                    $({scoreCounter: 0}).animate({scoreCounter: percentage}, {
                        duration: 1000,
                        easing: 'linear',
                        step: function () {
                            $(guage).parent().parent().find(".score-text").text(Math.ceil(this.scoreCounter));
                        },
                        complete: function () {
                            $(guage).parent().parent().find(".score-text").text(percentage);
                        }
                    });
                });

                // Objectives
                let wait = 0;
                $.each($("#course div > div > div:has(.score) > div"), (i, score) => {
                    wait++;
                    setTimeout(function () {
                        var percentage = $(score).find(".score").text();
                        
                        $({scoreCounter: 0}).animate({scoreCounter: percentage}, {
                            duration: 1000,
                            easing: 'linear',
                            step: function () {
                                $(score).find(".score-text").text(Math.ceil(this.scoreCounter));
                            },
                            complete: function () {
                                $(score).find(".score-text").text(percentage);
                            }
                        });
                    }, wait * 30);
                });
                
                if (worklist.trim() != "") {
                    $('#search').on('input', function() {
                        var search = $(this).val();
                        $('#worklist div h1').each(function() {
                            if (search.length === 0) {
                                $(this).html($(this).text()).show();
                                $(this).parent().parent().parent().parent().show()
                            } else {            
                                if ($(this).text().match(new RegExp(search, "gi"))) {
                                    var highlightedText = $(this).text().replace(new RegExp(search, "gi"), `<span class="${hlp.gettheme("text", "700")}">$&</span>`);
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
                $("#today, #agenda-back, #agenda-forward").click(async function (e) {
                    switch ($(e.target).attr("type")) {
                        case "forward": {
                            current_date.setDate(current_date.getDate() + 1);
                            break;
                        }
                        case "backward": {
                            current_date.setDate(current_date.getDate() - 1);
                            break;
                        }
                        case "today": {
                            current_date.setDate(new Date().getDate());
                            break;
                        }
                    }

                    $("#agenda-date span").html(new Date(current_date).toLocaleDateString('en-US'))

                    let new_agenda = "";
                    await hlp.prevent_errors(async function () {
                        new_agenda = await $.ajax({
                            url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&class=EVNT&entityid=${courseid}&path=AGND/${current_date.toLocaleDateString('sv-SE')}`),
                            method: "GET",
                            dataType: "html",
                            contentType: "application/html; charset=utf-8"
                        });
        
                        if (new_agenda == "") {
                            new_agenda = `<span class="flex justify-center items-center">No agenda for today</span>`;
                            throw new Error("No announcement info was found!");
                        } else {
                            new_agenda = hlp.format(new_agenda).replace(/\[~]/g, hlp.api(`/Resz/${hlp.session.token}/${eid}/Assets`));
                        }
                    }, false, function () {
                        new_agenda = `<span class="flex justify-center font-bold items-center">No agenda for today</span>`;
                    })

                    if (new_agenda != "") {
                        $("#agenda").html(new_agenda);
                        $("[goto]").on("click", function (event) {
                            window.open($(this).attr("goto"), "_blank")
                        })
                    }
                })
            }
        }
    
        await call();
    })
}