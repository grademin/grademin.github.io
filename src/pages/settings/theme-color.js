export async function run() {
    const hlp = await import("../../helpers.js"),
          site = await import("../../site.js");


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
                        <span class="flex-grow font-bold text-center text-[22px]">Theme Color</span>
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
                <div class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                    <div id="sync-appearance" class="flex flex-row justify-between container mx-auto cursor-pointer">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Sync to System Appearance</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input theme_setting="sync-appearance" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] ${hlp.theme("theme-toggle")} rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div id="themes" class="flex flex-col gap-5"></div>
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
                            <span class="text-[30px] font-black ${hlp.theme("text", "700")} pointer-events-none material-symbols-rounded">
                                settings
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        `).on("click", async function (e) {
            switch ($(e.target).attr("id")) {
                case "go-back": {
                    history.pushState({}, "", `?page=settings`);
                    await site.runtime("settings");
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
        })



        let theme_settings = hlp.get("theme_settings");

        content(theme_settings)

        if (theme_settings.sync) {
            $("#sync-appearance input").prop("checked", theme_settings.sync)
            $("#sync-appearance").find("label div>div").removeClass("translate-x-0").addClass("translate-x-full").parent().removeClass(`${hlp.theme("theme-toggle")}`).addClass(`${hlp.theme("bg", "700")}`);
        }

        $("#root #sync-appearance").on("click", function() {
            if ($(this).find("input").prop("checked"))
                $(this).find("input").prop("checked", "")
            else
                $(this).find("input").prop("checked", "true")


            if ($(this).find("input").prop("checked")) {
                $(this).find("label div>div").removeClass("translate-x-0").addClass("translate-x-full duration-300 ease-in-out").parent().removeClass(`${hlp.theme("theme-toggle")}`).addClass(`${hlp.theme("bg", "700")}`);
                theme_settings.sync = true;
                theme_settings.theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
                
                theme_settings.theme == "light" ? $("body").removeClass("text-white").removeClass("text-black").addClass("text-black") : $("body").removeClass("text-black").removeClass("text-white").addClass("text-white");
                theme_settings.theme == "light" ? $("body").removeClass("bg-black").removeClass("bg-white").addClass("text-white") : $("body").removeClass("bg-white").removeClass("bg-black").addClass("bg-black");
                site.runtime("theme-color");
            } else {
                $(this).find("label div div").removeClass("translate-x-full").addClass("translate-x-0 duration-300 ease-in-out").parent().removeClass(`${hlp.theme("bg", "700")}`).addClass(`${hlp.theme("theme-toggle")}`);
                theme_settings.sync = false;
            }

            hlp.set("theme_settings", theme_settings);
            content(theme_settings)
        });


        function content(theme) {
            if (theme.sync) {
                $("#themes").empty().append(`
                    <div class="relative overflow-hidden flex flex-col container mx-auto rounded-xl cursor-pointer">
                        <div id="theme-blue" class="flex flex-col">
                            <div class="bg-blue-700 w-full py-2 px-3 pointer-events-none">
                                <span class="font-bold text-white">Classic Blue</span>
                            </div>
                            <div class="flex pointer-events-none flex-row gap-5 px-3 py-3" style="background-image: -webkit-linear-gradient(-30deg, rgb(228, 228, 231) 50%, rgb(15, 15, 15) 50%);">
                                <div class="flex flex-1 gap-1 flex-col justify-between">
                                    <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                    <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                </div>
                                <div class="flex items-center invisible">
                                    <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                        <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                            check
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative overflow-hidden flex flex-col container mx-auto rounded-xl cursor-pointer">
                        <div id="theme-green" class="flex flex-col">
                            <div class="bg-green-500 w-full py-2 px-3 pointer-events-none">
                                <span class="font-bold text-white">Spring Green</span>
                            </div>
                            <div class="flex flex-row pointer-events-none gap-5 px-3 py-3" style="background-image: -webkit-linear-gradient(-30deg, rgb(228, 228, 231) 50%, rgb(15, 15, 15) 50%);">
                                <div class="flex flex-1 gap-1 flex-col justify-between">
                                    <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                    <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                </div>
                                <div class="flex items-center invisible">
                                    <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                        <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                            check
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative overflow-hidden flex flex-col container mx-auto rounded-xl cursor-pointer">
                        <div id="theme-orange" class="flex flex-col">
                            <div class="bg-orange-400 w-full py-2 px-3 pointer-events-none">
                                <span class="font-bold text-white">Tangarine</span>
                            </div>
                            <div class="flex flex-row pointer-events-none gap-5 px-3 py-3" style="background-image: -webkit-linear-gradient(-30deg, rgb(228, 228, 231) 50%, rgb(15, 15, 15) 50%);">
                                <div class="flex flex-1 gap-1 flex-col justify-between">
                                    <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                    <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                </div>
                                <div class="flex items-center invisible">
                                    <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                        <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                            check
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative overflow-hidden flex flex-col container mx-auto rounded-xl cursor-pointer">
                        <div id="theme-violet" class="flex flex-col">
                            <div class="bg-violet-600 w-full py-2 px-3 pointer-events-none">
                                <span class="font-bold text-white">Eletric Purple</span>
                            </div>
                            <div class="flex flex-row pointer-events-none gap-5 px-3 py-3" style="background-image: -webkit-linear-gradient(-30deg, rgb(228, 228, 231) 50%, rgb(15, 15, 15) 50%);">
                                <div class="flex flex-1 gap-1 flex-col justify-between">
                                    <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                    <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                </div>
                                <div class="flex items-center invisible">
                                    <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                        <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                            check
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative overflow-hidden flex flex-col container mx-auto rounded-xl cursor-pointer">
                        <div id="theme-rose" class="flex flex-col">
                            <div class="bg-rose-700 w-full py-2 px-3 pointer-events-none">
                                <span class="font-bold text-white">Cardinal Red</span>
                            </div>
                            <div class="flex flex-row pointer-events-none gap-5 px-3 py-3" style="background-image: -webkit-linear-gradient(-30deg, rgb(228, 228, 231) 50%, rgb(15, 15, 15) 50%);">
                                <div class="flex flex-1 gap-1 flex-col justify-between">
                                    <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                    <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                </div>
                                <div class="flex items-center invisible">
                                    <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                        <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                            check
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative overflow-hidden flex flex-col container mx-auto rounded-xl cursor-pointer">
                        <div id="theme-indigo" class="flex flex-col">
                            <div class="bg-indigo-700 w-full py-2 px-3 pointer-events-none">
                                <span class="font-bold text-white">Indigo</span>
                            </div>
                            <div class="flex flex-row pointer-events-none gap-5 px-3 py-3" style="background-image: -webkit-linear-gradient(-30deg, rgb(228, 228, 231) 50%, rgb(15, 15, 15) 50%);">
                                <div class="flex flex-1 gap-1 flex-col justify-between">
                                    <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                    <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                </div>
                                <div class="flex items-center invisible">
                                    <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                        <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                            check
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative overflow-hidden flex flex-col container mx-auto rounded-xl cursor-pointer">
                        <div id="theme-fuchsia" class="flex flex-col">
                            <div class="bg-fuchsia-600 w-full py-2 px-3 pointer-events-none">
                                <span class="font-bold text-white">Magenta</span>
                            </div>
                            <div class="flex flex-row gap-5 pointer-events-none px-3 py-3" style="background-image: -webkit-linear-gradient(-30deg, rgb(228, 228, 231) 50%, rgb(15, 15, 15) 50%);">
                                <div class="flex flex-1 gap-1 flex-col justify-between">
                                    <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                    <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                </div>
                                <div class="flex items-center invisible">
                                    <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                        <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                            check
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative overflow-hidden flex flex-col container mx-auto rounded-xl cursor-pointer">
                        <div id="theme-teal" class="flex flex-col">
                            <div class="bg-teal-400 w-full py-2 px-3 pointer-events-none">
                                <span class="font-bold text-white">Turquoise</span>
                            </div>
                            <div class="flex flex-row gap-5 pointer-events-none px-3 py-3" style="background-image: -webkit-linear-gradient(-30deg, rgb(228, 228, 231) 50%, rgb(15, 15, 15) 50%);">
                                <div class="flex flex-1 gap-1 flex-col justify-between">
                                    <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                    <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                </div>
                                <div class="flex items-center invisible">
                                    <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                        <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                            check
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).off().on("click", function (e) {
                    if ($(e.target).attr("id").includes("theme-")) {
                        theme_settings.theme_color = $(e.target).attr("id").split("-")[1];
                        theme_settings.theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";

                        theme_settings.theme == "light" ? $("body").removeClass("text-white").removeClass("text-black").addClass("text-black") : $("body").removeClass("text-black").removeClass("text-white").addClass("text-white");
                        theme_settings.theme == "light" ? $("body").removeClass("bg-black").removeClass("bg-white").addClass("text-white") : $("body").removeClass("bg-white").removeClass("bg-black").addClass("bg-black");

                        hlp.set("theme_settings", theme_settings);
                        site.runtime("theme-color");
                    }
                })

                $(`#theme-${theme.theme_color} .flex-row .invisible`).addClass("visible").removeClass("invisible")
            } else {
                $("#themes").empty().append(`
                    <div class="flex flex-row gap-5">
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-blue-light" class="flex flex-col flex-1">
                                <div class="bg-blue-700 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Classic Blue Light</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 pointer-events-none rounded-b-xl" style="background: rgb(228, 228, 231);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-blue-dark" class="flex flex-col flex-1">
                                <div class="bg-blue-700 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Classic Blue Dark</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 pointer-events-none rounded-b-xl" style="background: rgb(15, 15, 15);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row gap-5">
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-green-light" class="flex flex-col flex-1">
                                <div class="bg-green-500 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Spring Green Light</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(228, 228, 231);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-green-dark" class="flex flex-col flex-1">
                                <div class="bg-green-500 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Spring Green Dark</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(15, 15, 15);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row gap-5">
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-orange-light" class="flex flex-col flex-1">
                                <div class="bg-orange-400 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Tangarine Light</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(228, 228, 231);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-orange-dark" class="flex flex-col flex-1">
                                <div class="bg-orange-400 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Tangarine Dark</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(15, 15, 15);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row gap-5">
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-violet-light" class="flex flex-col flex-1">
                                <div class="bg-violet-600 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Eletric Purple Light</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(228, 228, 231);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-violet-dark" class="flex flex-col flex-1">
                                <div class="bg-violet-600 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Eletric Purple Dark</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(15, 15, 15);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row gap-5">
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-rose-light" class="flex flex-col flex-1">
                                <div class="bg-rose-700 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Cardinal Red Light</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(228, 228, 231);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-rose-dark" class="flex flex-col flex-1">
                                <div class="bg-rose-700 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Cardinal Red Dark</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(15, 15, 15);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row gap-5">
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-indigo-light" class="flex flex-col flex-1">
                                <div class="bg-indigo-700 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Indigo Light</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(228, 228, 231);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-indigo-dark" class="flex flex-col flex-1">
                                <div class="bg-indigo-700 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Indigo Dark</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(15, 15, 15);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row gap-5">
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-fuchsia-light" class="flex flex-col flex-1">
                                <div class="bg-fuchsia-600 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Magenta Light</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(228, 228, 231);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-fuchsia-dark" class="flex flex-col flex-1">
                                <div class="bg-fuchsia-600 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Magenta Dark</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(15, 15, 15);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row gap-5">
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-teal-light" class="flex flex-col flex-1">
                                <div class="bg-teal-400 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Turquoise Light</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(228, 228, 231);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-teal-dark" class="flex flex-col flex-1">
                                <div class="bg-teal-400 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Turquoise Dark</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(15, 15, 15);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full px-3 py-1 ${hlp.theme("bg", "700")}">
                                            <span class="text-sm w-1 flex justify-center items-center material-symbols-rounded text-white">
                                                check
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).off().on("click", function (e) {
                    if ($(e.target).attr("id").includes("theme-")) {
                        theme_settings.theme_color = $(e.target).attr("id").split("-")[1];
                        theme_settings.theme = $(e.target).attr("id").split("-")[2];
                        
                        theme_settings.theme == "light" ? $("body").removeClass("text-white").removeClass("text-black").addClass("text-black") : $("body").removeClass("text-black").removeClass("text-white").addClass("text-white");
                        theme_settings.theme == "light" ? $("body").removeClass("bg-black").removeClass("bg-white").addClass("text-white") : $("body").removeClass("bg-white").removeClass("bg-black").addClass("bg-black");

                        hlp.set("theme_settings", theme_settings);
                        site.runtime("theme-color");
                    }
                })

                $(`#theme-${theme.theme_color}-${theme.theme} .flex-row .invisible`).addClass("visible").removeClass("invisible")

            }
        }

        hlp.animate_nav();
    })
}