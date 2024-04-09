import { set } from "../../helpers.js";

export async function run() {
    const hlp = await import("../../helpers.js"),
          site = await import("../../site.js");

    // TODO:
          
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
        `).on("click", async function (event) {
            switch ($(event.target).attr("id")) {
                ////////////////////////////////////////////////////////////
                ///////// MAIN CONTROLS

                case "go-back": {
                    history.pushState({}, "", `?page=overview`);
                    await site.runtime("overview");
                    break;
                }

                case "reload": {
                    hlp.load(async function () {
                        await call();
                    })
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
        

        async function call() {
            let codes = "200|201|301|400|401|500|501|601|803";
            try {
                let settings = hlp.get("settings");
                if (settings.find(name => name.setting.includes("include-self")).$value)
                    codes = "100|200|201|300|301|400|401|500|501|600|601|803";
            } catch (e) {}

            let activity = await $.ajax({
                url: hlp.api(`/cmd/getuseractivitystream?_token=${hlp.session.token}&userid=${hlp.session.id}&types=${codes}`),
                method: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            })

            activity.response.activities.activity.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            let pagnateKey = activity.response.activities.endkey;

            let settings, objectives, manifest, learning_objectives;

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
            
            $("#activity-stream").empty();
            $.each(activity.response.activities.activity, (i, activity) => {
                // Undefined means the user submitted in that activity
                if (activity.data.studentuser == undefined) {
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
                } else if (activity.data.newgrade.objectivescores != undefined) {
                    let objective_score = activity.data.newgrade.objectivescores.objectivescore;
                    let agency = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Agency")).guid)),
                        collaboration = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Collaboration")).guid)),
                        kt = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Knowledge & Thinking")).guid)),
                        oral = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Oral Communication")).guid)),
                        written = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Written Communication")).guid))

                    if (agency != undefined || collaboration != undefined || kt != undefined || oral != undefined || written != undefined) {
                        $("#activity-stream").append(`
                            <div class="flex flex-col gap-2">
                                <div class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                        <div class="flex flex-col w-full">
                                            <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${activity.data.item.title}</h1>
                                            <span class="font-bold text-[15px] text-zinc-400">Grade posted ${new Date(activity.date).toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})} by ${activity.data.user.firstname} ${activity.data.user.lastname}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-row gap-5 container mx-auto">
                                    ${agency != undefined ? `
                                    <div class="relative w-min flex flex-row gap-5 justify-between bg-zinc-800 rounded-xl py-2 px-3">
                                        <span class="font-bold">${hlp.decode_score(agency)}</span>
                                        <div class="rounded-lg bg-yellow-500 p-3"></div>
                                    </div>
                                    ` : ""}
                                    ${collaboration != undefined ? `
                                    <div class="relative w-min flex flex-row gap-5 justify-between bg-zinc-800 rounded-xl py-2 px-3">
                                        <span class="font-bold">${hlp.decode_score(collaboration)}</span>    
                                        <div class="rounded-lg bg-violet-500 p-3"></div>
                                    </div>
                                    ` : ""}
                                    ${kt != undefined ? `
                                    <div class="relative w-min flex flex-row gap-5 justify-between bg-zinc-800 rounded-xl py-2 px-3">
                                        <span class="font-bold">${hlp.decode_score(kt)}</span>    
                                        <div class="rounded-lg bg-blue-500 p-3"></div> 
                                    </div>
                                    ` : ""}
                                    ${oral != undefined ? `
                                    <div class="relative w-min flex flex-row gap-5 justify-between bg-zinc-800 rounded-xl py-2 px-3">
                                        <span class="font-bold">${hlp.decode_score(oral)}</span>
                                        <div class="rounded-lg bg-green-500 p-3"></div>
                                    </div>
                                    ` : ""}
                                    ${written != undefined ? `
                                    <div class="relative w-min flex flex-row gap-5 justify-between bg-zinc-800 rounded-xl py-2 px-3">
                                        <span class="font-bold">${hlp.decode_score(written)}</span>
                                        <div class="rounded-lg bg-cyan-500 p-3"></div>
                                    </div>
                                    ` : ""}
                                </div>
                            </div>
                        `)
                    } else {
                        $("#activity-stream").append(`
                            <div class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                                <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                    <div class="flex flex-col w-full">
                                        <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${activity.data.item.title}</h1>
                                        <span class="font-bold text-[15px] text-zinc-400"> posted ${new Date(activity.date).toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})} by ${activity.data.user.firstname} ${activity.data.user.lastname}</span>
                                    </div>
                                </div>
                            </div>
                        `)
                    }
                } else {
                    $("#activity-stream").append(`
                        <div class="flex flex-col gap-2">
                            <div class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                                <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                    <div class="flex flex-col w-full">
                                        <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${activity.data.item.title}</h1>
                                        <span class="font-bold text-[15px] text-zinc-400">Grade posted ${new Date(activity.date).toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})} by ${activity.data.user.firstname} ${activity.data.user.lastname}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-row gap-5 container mx-auto">
                                <div class="relative w-min flex flex-row gap-5 bg-${hlp.score_to_color(hlp.decode_score(newactivity.data.newgrade))}-500 justify-between bg-zinc-800 rounded-xl py-2 px-3">
                                    <span class="font-bold">${hlp.decode_score(newactivity.data.newgrade)}</span>
                                </div>
                            </div>
                        </div>
                    `)
                }

                window.onscroll = async function(ev) {
                    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
                        let newactivity = await $.ajax({
                            url: hlp.api(`/cmd/getuseractivitystream?_token=${hlp.session.token}&userid=${hlp.session.id}&types=${codes}&startkey=${pagnateKey}`),
                            method: "GET",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8"
                        })
            
                        newactivity.response.activities.activity.sort((a, b) => new Date(b.date) - new Date(a.date));
                        
                        console.log(newactivity.response.activities.activity)

                        pagnateKey = newactivity.response.activities.endkey;
                        $.each(newactivity.response.activities.activity, async (i, newactivity) => {
                            // Undefined means the user submitted in that activity
                            if (newactivity.data.studentuser == undefined) {
                                $("#activity-stream").append(`
                                    <div class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                                        <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                            <div class="flex flex-col w-full">
                                                <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${newactivity.data.item.title}</h1>
                                                <span class="font-bold text-[15px] text-zinc-400">Submitted ${new Date(newactivity.date).toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})} by you</span>
                                            </div>
                                        </div>
                                    </div>
                                `)
                            } else if (newactivity.data.newgrade.objectivescores != undefined) {
                                let objective_score = newactivity.data.newgrade.objectivescores.objectivescore;
                                let agency = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Agency")).guid)),
                                    collaboration = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Collaboration")).guid)),
                                    kt = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Knowledge & Thinking")).guid)),
                                    oral = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Oral Communication")).guid)),
                                    written = objective_score.find(name => name.guid.includes(objectives.response.objectives.objective.find(name => name.id.includes("Written Communication")).guid))

                                if (agency != undefined || collaboration != undefined || kt != undefined || oral != undefined || written != undefined) {
                                    $("#activity-stream").append(`
                                        <div class="flex flex-col gap-2">
                                            <div class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                                                <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                                    <div class="flex flex-col w-full">
                                                        <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${newactivity.data.item.title}</h1>
                                                        <span class="font-bold text-[15px] text-zinc-400">Grade posted ${new Date(newactivity.date).toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})} by ${newactivity.data.user.firstname} ${newactivity.data.user.lastname}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex flex-row gap-5 container mx-auto">
                                                ${agency != undefined ? `
                                                <div class="relative w-min flex flex-row gap-5 justify-between bg-zinc-800 rounded-xl py-2 px-3">
                                                    <span class="font-bold">${hlp.decode_score(agency)}</span>
                                                    <div class="rounded-lg bg-yellow-500 p-3"></div>
                                                </div>
                                                ` : ""}
                                                ${collaboration != undefined ? `
                                                <div class="relative w-min flex flex-row gap-5 justify-between bg-zinc-800 rounded-xl py-2 px-3">
                                                    <span class="font-bold">${hlp.decode_score(collaboration)}</span>    
                                                    <div class="rounded-lg bg-violet-500 p-3"></div>
                                                </div>
                                                ` : ""}
                                                ${kt != undefined ? `
                                                <div class="relative w-min flex flex-row gap-5 justify-between bg-zinc-800 rounded-xl py-2 px-3">
                                                    <span class="font-bold">${hlp.decode_score(kt)}</span>    
                                                    <div class="rounded-lg bg-blue-500 p-3"></div> 
                                                </div>
                                                ` : ""}
                                                ${oral != undefined ? `
                                                <div class="relative w-min flex flex-row gap-5 justify-between bg-zinc-800 rounded-xl py-2 px-3">
                                                    <span class="font-bold">${hlp.decode_score(oral)}</span>
                                                    <div class="rounded-lg bg-green-500 p-3"></div>
                                                </div>
                                                ` : ""}
                                                ${written != undefined ? `
                                                <div class="relative w-min flex flex-row gap-5 justify-between bg-zinc-800 rounded-xl py-2 px-3">
                                                    <span class="font-bold">${hlp.decode_score(written)}</span>
                                                    <div class="rounded-lg bg-cyan-500 p-3"></div>
                                                </div>
                                                ` : ""}
                                            </div>
                                        </div>
                                    `)
                                } else {
                                    $("#activity-stream").append(`
                                        <div class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                                            <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                                <div class="flex flex-col w-full">
                                                    <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${activity.data.item.title}</h1>
                                                    <span class="font-bold text-[15px] text-zinc-400">Objective posted ${new Date(newactivity.date).toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})} by ${activity.data.user.firstname} ${activity.data.user.lastname}</span>
                                                </div>
                                            </div>
                                        </div>
                                    `)
                                }
                            } else {
                                $("#activity-stream").append(`
                                    <div class="flex flex-col gap-2">
                                        <div class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                                            <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                                <div class="flex flex-col w-full">
                                                    <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${activity.data.item.title}</h1>
                                                    <span class="font-bold text-[15px] text-zinc-400">Grade posted ${new Date(newactivity.date).toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})} by ${activity.data.user.firstname} ${activity.data.user.lastname}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-row gap-5 container mx-auto">
                                            <div class="relative w-min flex flex-row gap-5 bg-${hlp.score_to_color(hlp.decode_score(newactivity.data.newgrade))}-500 justify-between bg-zinc-800 rounded-xl py-2 px-3">
                                                <span class="font-bold">${hlp.decode_score(newactivity.data.newgrade)}</span>
                                            </div>
                                        </div>
                                    </div>
                                `)
                            }
                        });
                    }
                };
            })
        }

        await call();
    });
};