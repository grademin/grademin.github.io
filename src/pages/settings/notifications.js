export async function run() {
    const hlp = await import("../../helpers.js"),
          site = await import("../../site.js"),
          sw = await import("../../service.js");

    // TODO: clean
    // TODO: use the fixed items for everything else. these:
    // <div class="flex flex-col gap-5 pt-[2rem] mt-[46px] mb-[1.7rem] container mx-auto py-10 px-4">
    //   <div class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">

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
                        <span class="flex-grow font-bold text-center text-[22px]">Notifications</span>
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
                <div class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">
                    <div id="enable" class="flex flex-row justify-between container mx-auto cursor-pointer py-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Enable Notifications</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input setting_name="include-self" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] ${hlp.theme("theme-toggle")} rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">
                    <div id="chip-indicators" class="flex flex-row justify-between container mx-auto cursor-pointer py-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Visual Chip Indicators</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input setting_name="include-self" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] ${hlp.theme("theme-toggle")} rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">
                    <div id="posted" class="flex flex-row justify-between container mx-auto cursor-pointer gap-5 py-3 border-b-[2px] border-zinc-700">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Notify When an Assignement is Posted</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input setting_name="include-self" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] ${hlp.theme("theme-toggle")} rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div id="past-due" class="flex flex-row justify-between container mx-auto cursor-pointer gap-5 py-3 border-b-[2px] border-zinc-700">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Notify When an Assignment is Past Due</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input setting_name="include-self" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] ${hlp.theme("theme-toggle")} rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div id="new-grade" class="flex flex-row justify-between container mx-auto cursor-pointer gap-5 py-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Notify When a New Grade is Posted</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input setting_name="include-self" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] ${hlp.theme("theme-toggle")} rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">
                    <div id="test_push" class="flex flex-row justify-between container mx-auto cursor-pointer py-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Test Push</h1>
                            </div>
                        </div>
                    </div>
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
                    history.pushState({}, "", `?page=settings`);
                    await site.runtime("settings");
                    break;
                }


                case "test_push": {
                    await Notification.requestPermission().then((result) => {
                        if (result === "granted") {
                            navigator.serviceWorker.ready.then((registration) => {
                                registration.showNotification("Test Notification! #2", {
                                    "body": "This is a test notification. It could include Grades, Past Due or Due Assignements, ect!",
                                    "icon": "../../logo/logo-full.png",
                                    "tag": "notification-sample",
                                    "vibrate": [200, 100, 200, 100, 200, 100, 200],
                                });
                            });
                        }
                    })
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


        async function call() {

        }

        await call();
    });
}