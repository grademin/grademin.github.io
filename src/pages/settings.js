export async function run() {
    const hlp = await import("../helpers.js"),
          site = await import("../site.js");

    hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="bg-blue-700">
                <div class="fixed left-0 right-0 top-0 z-20 h-[46px] flex flex-row py-2 px-4 bg-blue-700">
                    <div id="scrolled-title" class="flex justify-center items-center container mx-auto px-4">
                        <div></div>
                        <span class="flex-grow font-bold text-center text-[20px]">Settings</span>
                        <div></div>
                    </div>
                </div>
                <div class="flex flex-row gap-10 justify-between container mx-auto pt-16 pb-5 px-4">
                    <div class="flex flex-col flex-grow justify-center">
                        <h1 class="text-5xl font-bold pb-0 -m-[2px] mb-0">Settings</h1>
                    </div>
                </div>
            </div>
            <!---->
            <!---->
            <div class="flex flex-col gap-5 pt-[1.2rem] mb-[2rem] container mx-auto py-10 px-4">
                <div class="flex flex-col justify-center items-center container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                    <div class="flex justify-between items-center">
                        <div class="relative rounded-full border-[6px] border-blue-500 bg-blue-600 ${hlp.get("pfp", false).includes("gravatar") ? "" : `bg-[url('${hlp.get("pfp", false)}')] bg-cover`} h-20 w-20 flex items-center justify-center text-2xl sm:text-2xl font-bold uppercase">
                            <span class="z-1">${hlp.get("pfp", false).includes("gravatar") ? hlp.session.firstname.charAt(0).toUpperCase() : ""}</span>
                        </div>
                    </div>
                    <h1 class="text-[28px] font-bold">${JSON.parse(localStorage.getItem("session")).user.fullname}</h1>
                    <div class="flex flex-row w-full mt-5 gap-5">
                        <div class="flex-1">
                            <button id="change-name" class="w-full px-4 py-3 bg-blue-700 text-white transition font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Change Name</button>
                        </div>
                        <div class="flex-1">
                            <button id="change-pfp" class="w-full px-4 py-3 bg-blue-700 text-white transition font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Change Picture</button>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="flex flex-col container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                    <div id="color_coding" class="flex flex-row justify-between container mx-auto cursor-pointer border-b-[2px] border-zinc-700 pb-3">
                        <div  class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                <span class="text-3xl material-symbols-rounded">
                                    palette
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[20px] font-bold">Color Coding</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input setting_name="colorcoding" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] bg-zinc-600 rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div id="include_self" class="flex flex-row justify-between container mx-auto cursor-pointer border-b-[2px] border-zinc-700  py-4">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                <span class="text-3xl material-symbols-rounded">
                                    group_add
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[20px] font-bold">Include Self Activities</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input setting_name="includeself" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] bg-zinc-600 rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div id="hide_excused" class="flex flex-row justify-between container mx-auto cursor-pointer pt-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                <span class="text-3xl material-symbols-rounded">
                                    visibility
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[20px] font-bold">Hide Excused Activities</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input setting_name="hideexcused" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] bg-zinc-600 rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <!---->
                <button id="logout" class="w-full px-4 py-3 bg-red-600 text-white transition font-semibold rounded-xl hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50">Logout</button>
                <!---->
                <div class="flex flex-col justify-center items-center align-center">
                    <span class="text-sm font-bold">Proview v0.1.5</span>
                    <span class="text-sm font-bold">&copy; ${new Date().getFullYear()} Wo-r, Design from Srujan Mupparapu</span>
                    <span class="text-xs font-bold text-zinc-400">Created for the betterment of Echo!</span>
                </div>     
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
                            <span class="text-[30px] font-black text-blue-700 pointer-events-none material-symbols-rounded">
                                settings
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        `).on("click", async function (event) {
            switch ($(event.target).attr("id")) {
                case "logout": {
                    hlp.load(async function () {
                        await $.ajax({
                            url: hlp.api("/cmd"),
                            method: "POST",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify({"request": {
                                cmd: "logout",
                            }}),
                            success: function () {
                                hlp.remove("session");
                                site.runtime("login");
                            }
                        })
                    })
                    break;
                }
                case "overview": {
                    hlp.load(async function () {
                        site.runtime("overview");
                    })
                    break;
                }
            }
        })

        hlp.animate_nav();
    })
}