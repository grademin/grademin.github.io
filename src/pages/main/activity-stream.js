import { set } from "../../helpers.js";

export async function run() {
    const hlp = await import("../../helpers.js"),
          site = await import("../../site.js");

    // TODO: add feedback to activity stream
    // TODO: fix this lol
          
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

                try {
                    objective = course_details.response.enrollment.enrollmentmetrics.objectivescores.objectivescore;                    
                } catch (e) {}
                
                a = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Agency")).guid));
                c = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Collaboration")).guid));
                k = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Knowledge & Thinking")).guid));
                o = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Oral Communication")).guid));
                w = objective.find(score => score.guid.includes(objectives.response.objectives.objective.find(type => type.id.includes("Written Communication")).guid));
            }

            $("#activity-stream").empty();
            content(activities.response.activities.activity);
            window.onscroll = async function() {
                if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
                    try {
                        next_activities = await $.ajax({
                            url: hlp.api(`/cmd/getuseractivitystream?_token=${hlp.session.token}&userid=${hlp.session.id}&types=${codes}&startkey=${pagnateKey}`),
                            method: "GET",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8"
                        })
                    } catch (e) {}

                    if (next_activities.length != 0) {
                        next_activities.response.activities.activity.sort((a, b) => new Date(b.date) - new Date(a.date));
                        pagnateKey = next_activities.response.activities.endkey;

                        content(next_activities.response.activities.activity)
                    }
                }
            }


            // TODO:
            //"100|200|201|300|301|400|401|500|501|600|601|803"
            //"200|201|301|400|401|500|501|601|803"
            function content(json) {
                $.each(json, (i, activity) => {
                    switch (activity.type) {
                        case 100: {
                            // You submitted something
                            $("#activity-stream").append(`
                                <div class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
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
                            // Grade Posted
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
                            break;
                        }
                    }
                })
            }
        }

        await main();
    });
};