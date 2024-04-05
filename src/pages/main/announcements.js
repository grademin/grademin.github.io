import { format } from "../../helpers.js";

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
                        <span class="flex-grow font-bold text-center text-[22px]">Announcements</span>
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
                <div id="communication" class="flex flex-col gap-5"></div>
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
                    history.pushState({}, "", `?page=announcements`);
                    $("#opened").remove();
                    $("#communication").show();
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
                    history.pushState({}, "", `?page=overview`);
                    await site.runtime("overview");
                    break;
                }

                case "settings": {
                    history.pushState({}, "", `?page=settings`);
                    await site.runtime("settings");
                    break;
                }
            }
        });


        ////////////////////////////////////////////////////////////

        // F U ajax with non-async success functions
        // literally only takes an "async" next to a function to fix it bruh
        
        async function call() {
            const communications = await $.ajax({
                url: hlp.api(`/cmd/getuserannouncementlist?_token=${hlp.session.token}&userid=${hlp.session.id}&daysactivepastend=14`),
                method: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            });

            // Sort them by latest
            communications.response.announcements.announcement.sort((a, b) => new Date(b.startdate) - new Date(a.startdate));

            if (new URLSearchParams(window.location.search).get("path") != null) {
                $("#communication").hide();

                const comminfo = await $.ajax({
                    url: hlp.api(`/cmd/getannouncementinfo?_token=${hlp.session.token}&packagetype=data&entityid=${hlp.session.domainid}&path=${new URLSearchParams(window.location.search).get("path")}`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });

                const commdetails = await $.ajax({
                    url: hlp.api(`/cmd/getannouncement?_token=${hlp.session.token}&packagetype=data&entityid=${hlp.session.domainid}&path=${comminfo.response.announcement.path}`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });

                // Append the content from the announcement they clicked
                $("#communication").parent().append(`
                    <div id="opened" class="relative flex flex-col justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                        <div class="flex flex-col border-b-[2px] border-zinc-700 pb-3">
                            <h1 class="text-[22px] font-bold">${commdetails.announcement.title}</h1>
                            <span class="font-bold text-[15px] text-zinc-400">Written ${new Date(commdetails.announcement.startdate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} by ${comminfo.response.announcement.creator.firstname} ${comminfo.response.announcement.creator.lastname}</span>
                        </div>
                        <div id="body" class="flex flex-col pt-3">
                            ${hlp.format(commdetails.announcement.body.$xml)}
                        </div>
                    </div>
                `).find("#communication").hide();

                $("#go-back").attr("id", "semi-back")
                $("#reload").addClass("invisible");

                // User viewed the announcement, ensure it is not viewed anymore.
                await $.ajax({
                    url: hlp.api(`/cmd/updateannouncementviewed?_token=${hlp.session.token}`),
                    method: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        "requests": {
                            announcement: [{
                                entityid: comminfo.response.announcement.entityid,
                                path: comminfo.response.announcement.path,
                                viewed: true
                            }]
                        }
                    }),
                    success: async () => {
                        try {
                            await $(`#communication #unviewed-${comminfo.response.announcement.path.replace(".zip", "")}`).remove();
                        } catch (e) {}
                    }
                })

                $("[goto]").on("click", function (event) {
                    window.open($(this).attr("goto"), "_blank")
                })
            }

            $("#communication").empty();
            await $.each(communications.response.announcements.announcement, async function (i, communication) {
                $("#communication").append(`
                    <div path="${communication.path}" class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                        <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                            <div class="flex flex-col">
                                <h1 class="text-[18px] sm:text-[22px] font-bold">${communication.title}</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center pointer-events-none">
                            <span class="material-symbols-rounded">
                                arrow_forward_ios
                            </span>
                        </div>
                        ${communication.viewed ? "" : `<div id="unviewed-${communication.path.replace(".zip", "")}" class="absolute pointer-events-none inline-flex right-0 top-0 h-4 w-4 -m-1 animate-ping duration-700 rounded-full bg-blue-700 opacity-75 justify-center items-center"></div>`}
                    </div>
                `).children().off().on("click", async function (event) {
                    hlp.load(async function () {
                        history.pushState({}, "", `?page=${new URLSearchParams(window.location.search).get("page")}&path=${$(event.target).attr("path")}`);

                        const comminfo = await $.ajax({
                            url: hlp.api(`/cmd/getannouncementinfo?_token=${hlp.session.token}&packagetype=data&entityid=${hlp.session.domainid}&path=${$(event.target).attr("path")}`),
                            method: "GET",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8"
                        });

                        const commdetails = await $.ajax({
                            url: hlp.api(`/cmd/getannouncement?_token=${hlp.session.token}&packagetype=data&entityid=${hlp.session.domainid}&path=${comminfo.response.announcement.path}`),
                            method: "GET",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8"
                        });

                        $("#go-back").attr("id", "semi-back")
                        $("#reload").addClass("invisible");

                        // User viewed the announcement, ensure it is not viewed anymore.
                        await $.ajax({
                            url: hlp.api(`/cmd/updateannouncementviewed?_token=${hlp.session.token}`),
                            method: "POST",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify({
                                "requests": {
                                    announcement: [{
                                        entityid: comminfo.response.announcement.entityid,
                                        path: comminfo.response.announcement.path,
                                        viewed: true
                                    }]
                                }
                            }),
                            success: async () => {
                                try {
                                    await $(`#communication #unviewed-${comminfo.response.announcement.path.replace(".zip", "")}`).remove();
                                } catch (e) {}
                            }
                        })

                        // Append the content from the announcement they clicked
                        $("#communication").parent().append(`
                            <div id="opened" class="relative flex flex-col justify-between container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                                <div class="flex flex-col border-b-[2px] border-zinc-700 pb-3">
                                    <h1 class="text-[22px] font-bold">${commdetails.announcement.title}</h1>
                                    <span class="font-bold text-[15px] text-zinc-400">Written ${new Date(commdetails.announcement.startdate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} by ${comminfo.response.announcement.creator.firstname} ${comminfo.response.announcement.creator.lastname}</span>
                                </div>
                                <div class="flex flex-col pt-3">
                                    ${hlp.format(commdetails.announcement.body.$xml)}
                                </div>
                            </div>
                        `).find("#communication").hide();

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