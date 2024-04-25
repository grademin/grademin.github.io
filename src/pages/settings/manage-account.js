export async function run() {
    const hlp = await import("../../helpers.js"),
          site = await import("../../site.js");

    // TODO: clean

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
                        <span class="flex-grow font-bold text-center text-[22px]">Manage Account</span>
                        <div class="invisible -mr-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
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
                <div class="flex flex-col gap-5 container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                    <div class="flex flex-row gap-5">
                        <div class="relative text-white rounded-full border-[6px] ${hlp.theme("border", "500")} ${hlp.theme("bg", "600")} ${hlp.get("pfp", false).length == 0 ? "" : `bg-[url('${hlp.get("pfp", false)}')] bg-cover bg-no-repeat bg-center`} h-20 w-20 flex items-center justify-center text-2xl sm:text-2xl font-bold uppercase">
                            <span class="z-1">${hlp.get("pfp", false).length == 0 ? hlp.session.firstname.charAt(0).toUpperCase() : ""}</span>
                        </div>
                        <div class="flex flex-col justify-center">
                            <h1 class="text-[24px] font-bold">${hlp.session.fullname}</h1>
                            <span class="font-bold text-[18px] text-zinc-400">${hlp.session.username}</span>
                        </div>
                    </div>
                    <button id="full-logout" class="w-full px-4 ${hlp.theme("theme-shadow")} py-3 bg-red-600 text-white transition font-semibold rounded-xl hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50">Remove From This Device</button>
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
                        <a id="grades" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="text-[30px] font-black pointer-events-none material-symbols-rounded">
                                insert_chart
                            </span>
                        </a>
                        <a id="settings" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="text-[30px] ${hlp.theme("text", "700")} font-black pointer-events-none material-symbols-rounded">
                                settings
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        `).on("click", async function (event) {
            switch ($(event.target).attr("id")) {
                case "go-back": {
                    await site.runtime("settings");
                    break;
                }


                
                case "full-logout": {
                    hlp.load(async function () {
                        await $.ajax({
                            url: hlp.api("/cmd"),
                            method: "POST",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify({"request": {
                                cmd: "logout",
                            }}),
                            success: async function () {
                                hlp.remove("session");
                                hlp.remove("remembered");
                                hlp.set("pfp", "");
                                hlp.remove("gpa")
                                hlp.set("hidden", []);
                                hlp.set("activities", []);

                                hlp.set("theme_settings", {"sync":true,"theme":"dark","theme_color":"blue"});
                                hlp.set("settings", [{"setting":"include-self","$value":true},{"setting":"hide-lti-details","$value":false},{"setting":"chip-indicators","$value":true},{"setting":"hide-excused","$value":false},{"setting":"self-activities","$value":false}]);
                                
                                $("body").removeClass("bg-white").removeClass("bg-black");
                                $("body").removeClass("text-white").removeClass("text-black");

                                $("body").addClass(`${hlp.theme("theme-bg")} ${hlp.theme("theme-text")}`);
                                $("#pre-loader").addClass(hlp.theme("bg", "700"));

                                await site.runtime("login");
                            }
                        })
                    })
                    break;
                }
                

                case "calendar": {
                    await site.runtime("calendar");
                    break;
                }

                case "grades": {
                    await site.runtime("grades");
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

        hlp.animate_nav();
    });
}