export async function run() {
    const hlp = await import("../../helpers.js");
    const site = await import("../../site.js");

    await hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="${hlp.theme("bg", "700")} text-white">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row ${hlp.theme("bg", "700")}">
                    <div id="scrolled-title" showreload class="flex justify-center items-center container mx-auto py-2 px-4 h-[60px]">
                        <div class="invisible -ml-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
                            <span class="w-0 -ml-[1px] font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                arrow_back_ios_new
                            </span>
                        </div>
                        <span class="flex-grow font-bold text-center text-[22px]">
                            <span class="inner">Grades</span>
                        </span>
                        <div id="reload" class="-mr-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
                            <span class="w-0 font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                refresh
                            </span>
                        </div>
                    </div>
                </div>
                <div class="relative overflow-hidden flex flex-row gap-10 justify-between container mx-auto pt-16 pb-5 px-4">
                    <div class="flex flex-col flex-grow justify-center">
                        <h1 class="text-5xl sm:text-7xl font-bold pb-0 -m-[2px] mb-0">Grades</h1>
                    </div>
                </div>
            </div>
            <!---->
            <!---->
            <div class="flex flex-col gap-5 pt-[1.1rem] mb-[1.8rem] container mx-auto py-10 px-4">
                <div class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">
                    <div id="gpa-calculator" class="flex flex-row justify-between container mx-auto cursor-pointer py-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                            <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-2 py-1 rounded-2xl">
                                <span class="text-3xl material-symbols-rounded text-white">
                                    calculate
                                </span>
                            </div>
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Gpa Calculator</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <span class="material-symbols-rounded">
                                arrow_forward_ios
                            </span>
                        </div>
                    </div>
                </div>
                <!---->
                <!---->
                <!--TODO:-->
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
                            <span class="text-[30px] ${hlp.theme("text", "700")} font-black pointer-events-none material-symbols-rounded">
                                insert_chart
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
                case "reload": {
                    hlp.load(async function () {
                        await call();
                    });
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

        hlp.animate_nav();
        await call();
    })
}