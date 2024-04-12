import { set } from "../../helpers.js";

export async function run() {
    const hlp = await import("../../helpers.js"),
          site = await import("../../site.js");

    // TODO: add feedback to activity stream
    // TODO: fix this lol
          
    hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="${hlp.theme("bg", "700")} text-white">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row ${hlp.theme("bg", "700")}">
                    <div class="flex justify-center items-center container mx-auto py-2 px-4">
                        <div id="go-back" class="-ml-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
                            <span class="w-0 -ml-[1px] font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                arrow_back_ios_new
                            </span>
                        </div>
                        <span class="flex-grow font-bold text-center text-[22px]">Activity Stream</span>
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
                <div id="activity-stream" class="flex flex-col gap-5"></div>
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
                    // TODO: remove event listener for scroll
                    history.pushState({}, "", `?page=overview`);
                    window.onscroll = null;
                    await site.runtime("overview");
                    break;
                }

                case "reload": {
                    hlp.load(async function () {
                        await call();
                    })
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
                    window.onscroll = null;
                    await site.runtime("overview");
                    break;
                }

                case "settings": {
                    window.onscroll = null;
                    await site.runtime("settings");
                    break;
                }
            }
        });
        

        async function main() {
            let viewed = hlp.get("activities");
            viewed.start = new Date().toLocaleDateString('en-US');
            viewed.data.$unviewed = 0;
            hlp.set("activities", viewed); 


            let codes = "200|201|301|400|401|500|501|601|803";
            let pagnateKey = "";
            let activities = [];
            let settings = [];
            let objectives = [];
            let next_activities = [];

            try {
                let settings = hlp.get("settings");
                if (settings.find(name => name.setting.includes("include-self")).$value)
                    codes = "100|200|201|300|301|400|401|500|501|600|601|803";
            } catch (e) {}

            try {
                activities = await $.ajax({
                    url: hlp.api(`/cmd/getuseractivitystream?_token=${hlp.session.token}&userid=${hlp.session.id}&types=${codes}`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                })
                activities.response.activities.activity.sort((a, b) => new Date(b.date) - new Date(a.date));
                pagnateKey = activities.response.activities.endkey;
            } catch (e) {}
            


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
            }

            $("#activity-stream").empty();
            content(activities.response.activities.activity);
            window.onscroll = async function() {
                if ((window.innerHeight + window.scrollY) + 50 >= document.documentElement.scrollHeight) {
                    try {
                        next_activities = await $.ajax({
                            url: hlp.api(`/cmd/getuseractivitystream?_token=${hlp.session.token}&userid=${hlp.session.id}&types=${codes}&startkey=${pagnateKey}`),
                            method: "GET",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8"
                        })

                        if (next_activities.length != 0) {
                            next_activities.response.activities.activity.sort((a, b) => new Date(b.date) - new Date(a.date));
                            pagnateKey = next_activities.response.activities.endkey;
                            
                            content(next_activities.response.activities.activity)
                        }
                    } catch (e) {}
                }
            }

            function content(json) {
                $.each(json, (i, activity) => {
                    switch (activity.type) {
                        case 100: {
                            // You submitted something
                            $("#activity-stream").append(`
                                <div class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                        <div class="flex flex-col w-full">
                                            <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${activity.data.item.title}</h1>
                                            <span class="font-bold text-[15px] text-zinc-400">Submitted ${new Date(activity.date).toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})} by you</span>
                                        </div>
                                    </div>
                                </div>
                            `)
                            break;
                        }
                        case 201:
                        case 200: {
                            // User has been excused
                            if (activity.data.item.gradeflags == 16) {
                                if (activity.data.newgrade.objectivescores == undefined) {
                                    $("#activity-stream").append(`
                                        <div class="flex flex-col gap-2">
                                            <div class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                                <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                                    <div class="flex flex-col w-full">
                                                        <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${activity.data.item.title}</h1>
                                                        <span class="font-bold text-[15px] text-zinc-400">Grade posted ${new Date(activity.date).toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})} by ${activity.data.user.firstname} ${activity.data.user.lastname}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex flex-row gap-2 container mx-auto">
                                                <div class="relative w-min flex flex-row gap-5 ${hlp.theme("theme-card")} justify-between ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                    <span class="font-bold">Excused</span>
                                                </div>
                                                <div class="relative w-min flex flex-row gap-5 bg-${hlp.score_to_color(hlp.decode_score(activity.data.newgrade))}-500 justify-between ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                    <span class="font-bold">${hlp.decode_score(activity.data.newgrade)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    `)
                                    return;
                                }
                            }

                            // Grade Posted
                            if (activity.data.newgrade.objectivescores != undefined) {
                                try {
                                    try {
                                        objective = activity.data.newgrade.objectivescores.objectivescore;                
                                    } catch (e) {}
                                                        
                                    a = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Agency")).guid));
                                    c = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Collaboration")).guid));
                                    k = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Knowledge & Thinking")).guid));
                                    o = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Oral Communication")).guid));
                                    w = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Written Communication")).guid));
                                } catch (e) {}
                                
                                if (a != undefined || c != undefined || k != undefined || o != undefined || w != undefined) {
                                    $("#activity-stream").append(`
                                        <div class="flex flex-col gap-2">
                                            <div class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                                <div class="flex flex-row justify-center items-center gap-5 w-full">
                                                    <div class="flex flex-col w-full">
                                                        <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${activity.data.item.title}</h1>
                                                        <span class="font-bold text-[15px] text-zinc-400">Grade posted ${new Date(activity.date).toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})} by ${activity.data.user.firstname} ${activity.data.user.lastname}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex flex-row gap-2 flex-wrap container mx-auto">
                                                ${a != undefined ? `
                                                <div id="agency" class="relative w-min flex flex-1 xs-sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                    <span class="font-bold pointer-events-none">${hlp.decode_score(a)}</span>
                                                    <div class="rounded-lg bg-yellow-500 p-3 pointer-events-none"></div>
                                                </div>
                                                ` : ""}
                                                ${c != undefined ? `
                                                <div id="collaboration" class="relative w-min flex flex-1 xs-sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                    <span class="font-bold pointer-events-none">${hlp.decode_score(c)}</span>    
                                                    <div class="rounded-lg bg-violet-500 p-3 pointer-events-none"></div>
                                                </div>
                                                ` : ""}
                                                ${k != undefined ? `
                                                <div id="knowlege" class="relative w-min flex flex-1 xs-sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                    <span class="font-bold pointer-events-none">${hlp.decode_score(k)}</span>    
                                                    <div class="rounded-lg bg-blue-500 p-3 pointer-events-none"></div> 
                                                </div>
                                                ` : ""}
                                                ${o != undefined ? `
                                                <div id="oral" class="relative w-min flex flex-1 xs-sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                    <span class="font-bold pointer-events-none">${hlp.decode_score(o)}</span>
                                                    <div class="rounded-lg bg-green-500 p-3 pointer-events-none"></div>
                                                </div>
                                                ` : ""}
                                                ${w != undefined ? `
                                                <div id="written" class="relative w-min flex flex-1 xs-sm:flex-none flex-row gap-5 justify-between cursor-pointer ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                    <span class="font-bold pointer-events-none">${hlp.decode_score(w)}</span>
                                                    <div class="rounded-lg bg-cyan-500 p-3 pointer-events-none"></div>
                                                </div>
                                                ` : ""}
                                            </div>
                                        </div>
                                    `)
                                } else {
                                    // TODO: This can have learning objectives (different from normal objectives)
                                    $("#activity-stream").append(`
                                        <div class="flex flex-col gap-2">
                                            <div class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                                <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                                    <div class="flex flex-col w-full">
                                                        <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${activity.data.item.title}</h1>
                                                        <span class="font-bold text-[15px] text-zinc-400">Objective posted ${new Date(activity.date).toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})} by ${activity.data.user.firstname} ${activity.data.user.lastname}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `)
                                }
                            } else {
                                $("#activity-stream").append(`
                                    <div class="flex flex-col gap-2">
                                        <div class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                            <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                                <div class="flex flex-col w-full">
                                                    <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${activity.data.item.title}</h1>
                                                    <span class="font-bold text-[15px] text-zinc-400">Grade posted ${new Date(activity.date).toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})} by ${activity.data.user.firstname} ${activity.data.user.lastname}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-row gap-2 container mx-auto">
                                            <div class="relative w-min flex flex-row gap-5 bg-${hlp.score_to_color(hlp.decode_score(activity.data.newgrade))}-500 justify-between ${hlp.theme("theme-card")} rounded-xl py-2 px-3">
                                                <span class="font-bold">${hlp.decode_score(activity.data.newgrade)}</span>
                                            </div>
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
                            // Grade below passing (TODO: add this to notifications)
                            break;
                        }
                        case 803: {
                            // An assignment was allowed a retry
                            $("#activity-stream").append(`
                                <div class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                        <div class="flex flex-col w-full">
                                            <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${activity.data.item.title}</h1>
                                            <span class="font-bold text-[15px] text-zinc-400">A retry has been allowed for this assignement</span>
                                        </div>
                                    </div>
                                </div>
                            `)
                            break;
                        }
                        // TODO: find excused items: 0x2 in data.item.gradeflags
                    }
                })
            }
        }

        await main();
    });
};