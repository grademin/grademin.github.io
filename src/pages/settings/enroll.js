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
                        <span class="flex-grow font-bold text-center text-[22px]">Enroll</span>
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
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-col">
                            <h1 class="text-[24px] font-bold">Enroll In A Course</h1>
                            <span>Enter a registration code to enroll in a course.</span>
                        </div>
                        <input placeholder="Registration Code" id="enroll-input" class="${hlp.theme("caret", "700")} font-bold ${hlp.theme("theme-input")} mt-1 block w-full px-5 py-4 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                    </div>
                    <button id="enroll" class="w-full px-4 py-3 ${hlp.theme("bg", "700")} text-white transition font-semibold rounded-xl hover:${hlp.theme("bg", "500")} focus:outline-none focus:ring-2 focus:${hlp.theme("ring", "700")} focus:ring-opacity-50">Verify Code</button>
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


                case "enroll": {
                    if ($("#enroll-input").val() == "") {
                        $("#enroll-input").addClass("shake border border-red-300").one("animationend webkitAnimationEnd", function() {
                            $(this).removeClass("shake border border-red-300");
                        });
                    } else {
                        $("#enroll-input").addClass("shake border border-red-300").one("animationend webkitAnimationEnd", function() {
                            $(this).removeClass("shake border border-red-300");
                        });
                    }
                    break;
                }
                

                
                case "calendar": {
                    await site.runtime("calendar");
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
    });
}