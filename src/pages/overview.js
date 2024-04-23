export async function run() {
    const hlp = await import("../helpers.js"),
          site = await import("../site.js");


    // TODO: clean

    await hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="${hlp.theme("bg", "700")} text-white">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row ${hlp.theme("bg", "700")}">
                    <div id="scrolled-title" class="flex justify-center items-center container mx-auto py-2 px-4 h-[60px]">
                        <div class="invisible -ml-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
                            <span class="w-0 -ml-[1px] font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                arrow_back_ios_new
                            </span>
                        </div>
                        <span class="flex-grow font-bold text-center text-[22px] hidden">Overview</span>
                        <div class="invisible -mr-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
                            <span class="w-0 font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                refresh
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row gap-10 justify-between container mx-auto pt-16 pb-5 px-4">
                    <div class="flex flex-col justify-center">
                        <h1 class="text-5xl sm:text-7xl font-bold pb-0 -m-[2px] mb-0">Overview</h1>
                        <div class="text-[18px] sm:text-[22px] font-bold">${new Date().toLocaleString("default", { month: "long" })} ${new Date().getDate()}, ${new Date().getFullYear()}</div>    
                    </div>
                    <div class="flex justify-between items-end cursor-pointer">
                        <div id="settings" class="rounded-full transition ${hlp.theme("bg", "600")} ${hlp.get("pfp", false).length == 0 ? "" : `bg-[url('${hlp.get("pfp", false)}')] bg-cover`} border-[6px] hover:${hlp.theme("border", "400")} active:${hlp.theme("border", "600")} ${hlp.theme("border", "500")} h-[4.5rem] w-[4.5rem] sm:h-[6rem] sm:w-[6rem] flex items-center justify-center text-2xl font-bold uppercase">
                            <span class="text-[20px] sm:text-[30px]">${hlp.get("pfp", false).length == 0 ? hlp.session.firstname.charAt(0).toUpperCase() : ""}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!---->
            <!---->
            <div class="flex flex-col gap-5 pt-[1.1rem] mb-[1.8rem] container mx-auto py-10 px-4">
                <div id="what-is-this" class="flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl cursor-pointer py-5 px-3 border-4 ${hlp.theme("border", "700")}">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-4 py-3 rounded-2xl">
                            <span class="text-3xl text-white material-symbols-rounded">
                                help
                            </span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">What is Proview?</h1>
                            <span class="font-bold text-[15px] text-zinc-400">About this site and it's purpose</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center pointer-events-none">
                        <span class="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div id="courses" class="relative relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-4 py-3 rounded-2xl">
                            <span class="text-3xl material-symbols-rounded text-white flex justify-center">
                                assignment
                            </span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Courses</h1>
                            <span class="font-bold text-[15px] text-zinc-400">View your current courses</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center pointer-events-none">
                        <span class="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div id="todo-list" class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-4 py-3 rounded-2xl">
                            <span class="text-3xl material-symbols-rounded text-white flex justify-center">
                                task
                            </span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Todo List</h1>
                            <span class="font-bold text-[15px] text-zinc-400">View due or past due work</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center pointer-events-none">
                        <span class="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div id="activity-stream" class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-4 py-3 rounded-2xl">
                            <span class="text-3xl material-symbols-rounded text-white flex justify-center">
                                group
                            </span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Activity Stream</h1>
                            <span class="font-bold text-[15px] text-zinc-400">View all recent activities</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center pointer-events-none">
                        <span class="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div id="announcements" class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-4 py-3 rounded-2xl">
                            <span class="text-3xl mt-1 material-symbols-rounded text-white flex justify-center">
                                feedback
                            </span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Announcements</h1>
                            <span class="font-bold text-[15px] text-zinc-400">View current announcements</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center pointer-events-none">
                        <span class="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div id="email" class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-4 py-3 rounded-2xl">
                            <span class="text-3xl material-symbols-rounded text-white flex justify-center">
                                alternate_email
                            </span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Contact Teachers</h1>
                            <span class="font-bold text-[15px] text-zinc-400">Email your teachers</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center pointer-events-none">
                        <span class="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
            </div>
            <!---->
            <!---->
            <div id="bottom" class="fixed bottom-0 left-0 right-0">
                <div class="${hlp.theme("theme-card")}">
                    <div class="flex flex-row justify-between items-center">
                        <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="text-[30px] font-black ${hlp.theme("text", "700")} pointer-events-none material-symbols-rounded">
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
                case "courses": {
                    await site.runtime("courses");
                    break;
                }

                case "todo-list": {
                    await site.runtime("todo-list");
                    break;
                }

                case "activity-stream": {
                    await site.runtime("activity-stream");
                    break;
                }

                case "announcements": {
                    await site.runtime("announcements");
                    break;
                }

                case "email": {
                    break;
                }


                
                case "calendar": {
                    await site.runtime("calendar");
                    break;
                }

                case "settings": {
                    await site.runtime("settings");
                    break;
                }



                case "what-is-this": {
                    $("body").addClass("overflow-hidden");
                    $("#overlays").append(`
                        <div id="overlay" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                            <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                <div class="${hlp.theme("theme-card")} ${hlp.theme("theme-text")} rounded-xl max-w-lg px-5 py-5 pointer-events-auto">
                                    <div class="flex justify-center items-center mb-4">
                                        <h2 class="text-2xl font-bold text-center">About Proview</h2>
                                    </div>
                                    <div>
                                        <p>This website was created to show that <b>Echo Viewer</b> by <b>Agilix, Inc</b> could have been better. This websites design is based off <b>GradeWay</b> by <b>Srujan Mupparapu</b>, this website is not meant to infringe or plagarize his work, If it does (specifically to Srujan) please send an issue <a class="${hlp.theme("text", "700")} hover:${hlp.theme("text", "600")} cursor-pointer transition" goto="https://github.com/wo-r-professional/proview/issues">here</a> and I will abide to whatever you ask.</p>
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
                    
                    $("[goto]").on("click", function (event) {
                        window.open($(this).attr("goto"), "_blank")
                    })
                    break;
                }
            }
        })

        try {
            let settings = hlp.get("settings");
            if (settings.find(option => option.setting.includes("chip-indicators")).$value) {
                // Announcement "viewed" count
                try {
                    let communications = await $.ajax({
                        url: hlp.api(`/cmd/getuserannouncementlist?_token=${hlp.session.token}&userid=${hlp.session.id}&daysactivepastend=14`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                    })

                    let unviewed = 0;
                    await $.each(communications.response.announcements.announcement, function (i, communication) {
                        if (!communication.viewed)
                            unviewed++
                    })
                    
                    if (unviewed != 0) {
                        await $("#announcements").append(`
                            <div class="absolute ${hlp.theme("theme-shadow")} text-white inline-flex right-0 top-0 h-8 w-8 -m-2 rounded-full ${hlp.theme("bg", "700")} justify-center items-center">
                                <span>${unviewed}</span>
                            </div> 
                        `)
                    }
                } catch (e) {}

                // Todo List current todos
                try {
                    let due = await $.ajax({
                        url: hlp.api(`/cmd/getduesoonlist?_token=${hlp.session.token}&days=3&userId=${hlp.session.id}&utcoffset=300`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                    })

                    // TOOD: add to others
                    let hid = 0;
                    $.each(due.response.items.item, function (i, due) {
                        try {
                            let hidden = hlp.get("hidden");
                            if (hidden.find(option => option.course.includes(due.entity.id)).$hidden)
                                hid++
                        } catch (e) {}
                    })

                    due.response.items.item.sort((a, b) => new Date(b.duedate) - new Date(a.duedate));

                    if (due.response.items.item.length != 0 && (due.response.items.item.length - hid) != 0) {
                        await $("#todo-list").append(`
                            <div class="absolute ${hlp.theme("theme-shadow")} text-white inline-flex right-0 top-0 h-8 w-8 -m-2 rounded-full ${hlp.theme("bg", "700")} justify-center items-center">
                                <span>${due.response.items.item.length - hid}</span>
                            </div> 
                        `)
                    }
                } catch (e) {}

                // Activity stream
                try {
                    let codes = "200|201|301|400|401|500|501|601|803";
                    try {
                        let settings = hlp.get("settings");
                        if (settings.find(option => option.setting.includes("include-self")).$value)
                            codes = "100|200|201|300|301|400|401|500|501|600|601|803";
                    } catch (e) {}

                    let activities = await $.ajax({
                        url: hlp.api(`/cmd/getuseractivitystream?_token=${hlp.session.token}&userid=${hlp.session.id}&types=${codes}`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                    })

                    activities.response.activities.activity.sort((a, b) => new Date(b.date) - new Date(a.date));
                            
                    let config = await $.ajax({
                        url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&entityid=${hlp.session.id}&path=Assets/BuzzTheme.json`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                    })

                    if (hlp.get("activities") == "") {
                        hlp.set("activities", {
                            data: {
                                items: [],
                                $unviewed: 0
                            }
                        })
                    }

                    let items = hlp.get("activities");
                    let unviewed = 0;
                    await $.each(activities.response.activities.activity, (i, activity) => {
                        if (new Date(activity.date) >= new Date(config.ActivityStreamLastRead)) {
                            if (!items.data.items.find(name => name.item.includes(activity.data.item.title))) {
                                unviewed++
                                items.data.$unviewed = unviewed
                                items.data.items.push({
                                    item: activity.data.item.title,
                                });
                                
                                hlp.set("activities", items);
                            }
                        }
                    })

                    if (hlp.get("activities").data.$unviewed != 0) {
                        await $("#activity-stream").append(`
                            <div class="absolute ${hlp.theme("theme-shadow")} text-white inline-flex right-0 top-0 h-8 w-8 -m-2 rounded-full ${hlp.theme("bg", "700")} justify-center items-center">
                                <span>${hlp.get("activities").data.$unviewed}</span>
                            </div> 
                        `)
                    }
                } catch (e) {}

            }
        } catch (e) {}

        hlp.animate_nav();
    })
}