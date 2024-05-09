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
                        <span class="flex-grow font-bold text-center text-[22px]">Activity Stream</span>
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
                <div id="stream" class="flex flex-col gap-5"></div>
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
                    $("#stream").empty();
                    window.onscroll = null;
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
                    await site.runtime("calendar");
                    break;
                }
                case "grades": {
                    await site.runtime("grades");
                    break;
                }
                case "overview": {
                    site.runtime("overview");
                    break;
                }
                case "settings": {
                    await site.runtime("settings");
                    break;
                }
            }
        });

        async function call() {
            // If there are unviewed activities, clear that list.
            if (hlp.activities.exists) {
                let config = [];
                await hlp.prevent_errors(async function () {
                    config = await $.ajax({
                        url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&entityid=${hlp.session.id}&path=Assets/BuzzTheme.json`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                    })

                    if (config.response.code != "OK") {
                        config = [];
                        throw new Error("Config could not be found!");
                    }
                }, false)

                if (config.length != 0) {
                    config.ActivityStreamLastRead = new Date().toLocaleString('en-US');

                    await hlp.prevent_errors(async function () {
                        await $.ajax({
                            url: hlp.api(`/cmd/putresource?_token=${hlp.session.token}&entityid=${hlp.session.id}&path=Assets/BuzzTheme.json`),
                            method: "POST",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            data: hlp.stringify(config)
                        })
                    }, false)

                    hlp.activities.updateviews(0);
                }
            }

            let codes = "200|201|301|400|401|500|501|601|803";
            if (hlp.settings.include_self) {
                codes = "100|200|201|300|301|400|401|500|501|600|601|803";
            }

            let pagnateKey = undefined;
            let activities = [];
            let next_activities = [];
            let settings = [];
            let objectives = [];

            await hlp.prevent_errors(async function () {
                activities = await $.ajax({
                    url: hlp.api(`/cmd/getuseractivitystream?_token=${hlp.session.token}&userid=${hlp.session.id}&types=${codes}`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });

                if (activities.response.code != "OK") {
                    activities = [];
                    throw new Error("Order couldn't be found!");
                }
            }, false);

            if (activities.length != 0 && activities.response.activities.length != 0) {
                activities.response.activities.activity.sort((a, b) => new Date(b.date) - new Date(a.date));
                pagnateKey = activities.response.activities.endkey;

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
                }

                content(activities.response.activities.activity);
                window.onscroll = async function() {
                    if ((window.innerHeight + window.scrollY) + 50 >= document.documentElement.scrollHeight) {
                        await hlp.prevent_errors(async function () {
                            next_activities = await $.ajax({
                                url: hlp.api(`/cmd/getuseractivitystream?_token=${hlp.session.token}&userid=${hlp.session.id}&types=${codes}&startkey=${encodeURIComponent(pagnateKey)}`),
                                method: "GET",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8"
                            })

                            if (next_activities.response.code != "OK") {
                                next_activities = [];
                                throw new Error("Order couldn't be found!");
                            }                            
                        }, false)

                        if (next_activities.length != 0) {
                            next_activities.response.activities.activity.sort((a, b) => new Date(b.date) - new Date(a.date));
                            pagnateKey = next_activities.response.activities.endkey;
                            content(next_activities.response.activities.activity)
                        }
                    }
                };
            } else {
                $("#stream").append(`
                    <div id="error" class="flex flex-col container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                        <div class="flex flex-row justify-between container mx-auto cursor-pointer">
                            <div class="flex flex-row justify-center items-center pointer-events-none w-full">
                                <div class="flex flex-col justify-center items-center">
                                    <h1 class="text-[18px] font-bold">No activities were found.</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                `)
            }

            function content(json) {
                $.each(json, (i, activity) => {
                    switch (activity.type) {
                        case 100: {
                            // Self Submission
                            $("#stream").append(`
                                <div class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                        <div class="flex flex-col w-full">
                                            <h1 class="text-[18px] sm:text-[22px] w-[7ch] lg-sm:w-[17ch] xl-sm:w-[23ch] 1xl-sm:w-[27ch] md:w-[40ch] lg:w-full truncate font-bold">${activity.data.item.title}</h1>
                                            <span class="font-bold text-[15px] text-zinc-400">Submitted ${new Date(activity.date).toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})} by You</span>
                                        </div>
                                    </div>
                                </div>
                            `);
                            break;
                        }
                        case 201:
                        case 200: {
                            // Assignment Graded
                            if (hlp.hidden(activity.data.course.id)) {
                                return;
                            }

                            if (hlp.flags.grades(activity.data.newgrade.status).find(flag => flag == 0x4000) && !hlp.flags.grades(activity.data.newgrade.status).find(flag => flag == 0x80)) {
                                let objective = [];
                                let a = undefined, c = undefined, k = undefined, o = undefined, w = undefined;
                                
                                hlp.prevent_errors(function () {
                                    objective = activity.data.newgrade.objectivescores.objectivescore;                    
                                }, false);
            
                                a = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Agency")).guid));
                                c = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Collaboration")).guid));
                                k = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Knowledge & Thinking")).guid));
                                o = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Oral Communication")).guid));
                                w = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Written Communication")).guid));
                                
                                if (a != undefined || c != undefined || k != undefined || o != undefined || w != undefined) {
                                    $("#stream").append(`
                                        <div class="flex flex-col gap-2">
                                            <div class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                                <div class="flex flex-row justify-center items-center gap-5 w-full">
                                                    <div class="flex flex-col w-full">
                                                        <h1 class="text-[18px] sm:text-[22px] w-[7ch] lg-sm:w-[17ch] xl-sm:w-[23ch] 1xl-sm:w-[27ch] md:w-[40ch] lg:w-full truncate font-bold">${activity.data.item.title}</h1>
                                                        <span class="font-bold text-[15px] text-zinc-400">Grade posted ${(() => {
                                                            let getdue = new Date(activity.date);
                                                            let today = new Date();
                                                            today.setHours(0, 0, 0, 0);
                        
                                                            let tomorrow = new Date(today);
                                                            tomorrow.setDate(tomorrow.getDate() + 1);
                        
                                                            if (getdue < today) {
                                                                return `${getdue.toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})}`;
                                                            } else if (getdue.toDateString() === today.toDateString()) {
                                                                return "Today";
                                                            } else if (getdue.toDateString() === tomorrow.toDateString()) {
                                                                return `${tomorrow.toLocaleDateString(undefined, {weekday: "long"})}`;
                                                            } else {
                                                                return `${getdue.toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})}`;
                                                            }
                                                        })()} by ${activity.data.user.firstname} ${activity.data.user.lastname}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex flex-row gap-2 flex-wrap container mx-auto">
                                                ${a != undefined ? `
                                                <div id="agency" class="relative w-min flex flex-1 sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.gettheme("theme-card")} rounded-xl py-2 px-3">
                                                    <span class="font-bold pointer-events-none">${hlp.decode_score(a)}</span>
                                                    <div class="rounded-lg bg-yellow-500 p-3 pointer-events-none"></div>
                                                </div>
                                                ` : ""}
                                                ${c != undefined ? `
                                                <div id="collaboration" class="relative w-min flex flex-1 sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.gettheme("theme-card")} rounded-xl py-2 px-3">
                                                    <span class="font-bold pointer-events-none">${hlp.decode_score(c)}</span>    
                                                    <div class="rounded-lg bg-violet-500 p-3 pointer-events-none"></div>
                                                </div>
                                                ` : ""}
                                                ${k != undefined ? `
                                                <div id="knowlege" class="relative w-min flex flex-1 sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.gettheme("theme-card")} rounded-xl py-2 px-3">
                                                    <span class="font-bold pointer-events-none">${hlp.decode_score(k)}</span>    
                                                    <div class="rounded-lg bg-blue-500 p-3 pointer-events-none"></div> 
                                                </div>
                                                ` : ""}
                                                ${o != undefined ? `
                                                <div id="oral" class="relative w-min flex flex-1 sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.gettheme("theme-card")} rounded-xl py-2 px-3">
                                                    <span class="font-bold pointer-events-none">${hlp.decode_score(o)}</span>
                                                    <div class="rounded-lg bg-green-500 p-3 pointer-events-none"></div>
                                                </div>
                                                ` : ""}
                                                ${w != undefined ? `
                                                <div id="written" class="relative w-min flex flex-1 sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.gettheme("theme-card")} rounded-xl py-2 px-3">
                                                    <span class="font-bold pointer-events-none">${hlp.decode_score(w)}</span>
                                                    <div class="rounded-lg bg-cyan-500 p-3 pointer-events-none"></div>
                                                </div>
                                                ` : ""}
                                            </div>
                                        </div>
                                    `)
                                } else {
                                    $("#stream").append(`
                                        <div class="flex flex-col gap-2">
                                            <div class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                                <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                                    <div class="flex flex-col w-full">
                                                        <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${activity.data.item.title}</h1>
                                                        <span class="font-bold text-[15px] text-zinc-400">Grade posted ${(() => {
                                                            let getdue = new Date(activity.date);
                                                            let today = new Date();
                                                            today.setHours(0, 0, 0, 0);
                        
                                                            let tomorrow = new Date(today);
                                                            tomorrow.setDate(tomorrow.getDate() + 1);
                        
                                                            if (getdue < today) {
                                                                return `${getdue.toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})}`;
                                                            } else if (getdue.toDateString() === today.toDateString()) {
                                                                return "Today";
                                                            } else if (getdue.toDateString() === tomorrow.toDateString()) {
                                                                return `${tomorrow.toLocaleDateString(undefined, {weekday: "long"})}`;
                                                            } else {
                                                                return `${getdue.toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})}`;
                                                            }
                                                        })()} by ${activity.data.user.firstname} ${activity.data.user.lastname}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex flex-row gap-2 container mx-auto">
                                                ${(() => {
                                                    let objectives = "";
                                                    for (let objective of activity.data.newgrade.objectivescores.objectivescore) {
                                                        objectives += `
                                                            <div class="relative shadow-lg w-min flex flex-row gap-5 bg-${hlp.score_to_color(hlp.decode_score(objective))}-500 text-white justify-between rounded-xl py-2 px-3">
                                                                <span class="font-bold">${hlp.decode_score(objective)}</span>
                                                            </div>
                                                        `;
                                                    }

                                                    return objectives;
                                                })()}
                                            </div>
                                        </div>
                                    `)
                                }                             
                            } else if (hlp.flags.grades(activity.data.newgrade.status).find(flag => flag == 0x80) && !hlp.flags.grades(activity.data.newgrade.status).find(flag => flag == 0x01) && !hlp.settings.hide_excused) {
                                $("#stream").append(`
                                    <div class="flex flex-col gap-2">
                                        <div class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                            <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                                <div class="flex flex-col w-full">
                                                    <h1 class="text-[18px] sm:text-[22px] w-[7ch] lg-sm:w-[17ch] xl-sm:w-[23ch] 1xl-sm:w-[27ch] md:w-[40ch] lg:w-full truncate font-bold">${activity.data.item.title}</h1>
                                                    <span class="font-bold text-[15px] text-zinc-400">Grade posted ${(() => {
                                                        let getdue = new Date(activity.date);
                                                        let today = new Date();
                                                        today.setHours(0, 0, 0, 0);
                    
                                                        let tomorrow = new Date(today);
                                                        tomorrow.setDate(tomorrow.getDate() + 1);
                    
                                                        if (getdue < today) {
                                                            return `${getdue.toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})}`;
                                                        } else if (getdue.toDateString() === today.toDateString()) {
                                                            return "Today";
                                                        } else if (getdue.toDateString() === tomorrow.toDateString()) {
                                                            return `${tomorrow.toLocaleDateString(undefined, {weekday: "long"})}`;
                                                        } else {
                                                            return `${getdue.toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})}`;
                                                        }
                                                    })()} by ${activity.data.user.firstname} ${activity.data.user.lastname}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-row gap-2 container mx-auto">
                                            <div class="relative shadow-lg w-min flex flex-row gap-5 ${hlp.gettheme("theme-card")} justify-between ${hlp.gettheme("theme-card")} rounded-xl py-2 px-3">
                                                <span class="font-bold">Excused</span>
                                            </div>
                                        </div>
                                    </div>
                                `)
                            } else {
                                // Somehow nothing was there so just get Achieved and Possible
                                $("#stream").append(`
                                    <div class="flex flex-col gap-2">
                                        <div class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                                            <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                                <div class="flex flex-col w-full">
                                                    <h1 class="text-[18px] sm:text-[22px] w-[7ch] lg-sm:w-[17ch] xl-sm:w-[23ch] 1xl-sm:w-[27ch] md:w-[40ch] lg:w-full truncate font-bold">${activity.data.item.title}</h1>
                                                    <span class="font-bold text-[15px] text-zinc-400">Grade posted ${(() => {
                                                        let getdue = new Date(activity.date);
                                                        let today = new Date();
                                                        today.setHours(0, 0, 0, 0);
                    
                                                        let tomorrow = new Date(today);
                                                        tomorrow.setDate(tomorrow.getDate() + 1);
                    
                                                        if (getdue < today) {
                                                            return `${getdue.toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})}`;
                                                        } else if (getdue.toDateString() === today.toDateString()) {
                                                            return "Today";
                                                        } else if (getdue.toDateString() === tomorrow.toDateString()) {
                                                            return `${tomorrow.toLocaleDateString(undefined, {weekday: "long"})}`;
                                                        } else {
                                                            return `${getdue.toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})}`;
                                                        }
                                                    })()} by ${activity.data.user.firstname} ${activity.data.user.lastname}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-row gap-2 container mx-auto">
                                            ${(() => {
                                                let objectives = "";
                                                hlp.prevent_errors(function () {
                                                    for (let objective of activity.data.newgrade.objectivescores.objectivescore) {
                                                        objectives += `
                                                            <div class="relative shadow-lg w-min flex flex-row gap-5 bg-${hlp.score_to_color(hlp.decode_score(objective))}-500 text-white justify-between rounded-xl py-2 px-3">
                                                                <span class="font-bold">${hlp.decode_score(objective)}</span>
                                                            </div>
                                                        `;
                                                    }
                                                }, false)

                                                if (objectives == "") {
                                                    objectives = `
                                                        <div class="relative shadow-lg w-min flex flex-row gap-5 bg-${hlp.score_to_color(hlp.decode_score(activity.data.newgrade))}-500 text-white justify-between rounded-xl py-2 px-3">
                                                            <span class="font-bold">${hlp.decode_score(activity.data.newgrade)}</span>
                                                        </div>
                                                    `;
                                                }
                                                
                                                return objectives;
                                            })()}
                                        </div>
                                    </div>
                                `)
                            }

                            break;
                        }
                        case 300: {
                            // Student posted a board post (ex: comment)
                            break;
                        }
                        case 301: {
                            // Board post (ex: comments)
                            break;
                        }
                        case 400: {
                            // Course announcement
                            break;
                        }
                        case 401: {
                            // Course announcement deleted
                            break;
                        }
                        case 501:
                        case 500: {
                            // Badge has been given to the student
                            break;
                        }
                        case 600: {
                            // Student sent an email
                            break;
                        }
                        case 601: {
                            // Student got an email
                            break;
                        }
                        case 800: {
                            // Grade below passing
                            break;
                        }
                        case 803: {
                            // Assignment was allowed a retry
                            if (hlp.hidden(activity.data.course.id)) {
                                return;
                            }

                            $("#stream").append(`
                                <div class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                        <div class="flex flex-col w-full">
                                            <h1 class="text-[18px] sm:text-[22px] w-[7ch] lg-sm:w-[17ch] xl-sm:w-[23ch] 1xl-sm:w-[27ch] md:w-[40ch] lg:w-full truncate font-bold">${activity.data.item.title}</h1>
                                            <span class="font-bold text-[15px] text-zinc-400">A retry has been allowed for this assignment</span>
                                        </div>
                                    </div>
                                </div>
                            `);
                            break;
                        }
                    }
                })

                if ($("#stream div").length == 0) {
                    $("#stream").append(`
                        <div id="error" class="flex flex-col container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                            <div class="flex flex-row justify-between container mx-auto cursor-pointer">
                                <div class="flex flex-row justify-center items-center pointer-events-none w-full">
                                    <div class="flex flex-col justify-center items-center">
                                        <h1 class="text-[18px] font-bold">No activities were found.</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)
                }
            } 
        }
    
        await call();
    })
}