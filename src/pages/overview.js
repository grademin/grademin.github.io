export async function run() {
    const hlp = await import("../helpers.js"),
          site = await import("../site.js");

    hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="bg-blue-700">
                <div class="fixed left-0 right-0 top-0 z-20 h-[46px] flex flex-row py-2 px-4 bg-blue-700">
                    <div id="scrolled-title" class="flex justify-center items-center container mx-auto px-4">
                        <div></div>
                        <span class="flex-grow font-bold text-center text-[20px]">Overview</span>
                        <div></div>
                    </div>
                </div>
                <div class="flex flex-row gap-10 justify-between container mx-auto pt-16 pb-5 px-4">
                    <div class="flex flex-col justify-center">
                        <h1 class="text-5xl sm:text-7xl font-bold pb-0 -m-[2px] mb-0">Overview</h1>
                        <div class="text-[18px] sm:text-[22px] font-semibold">${new Date().toLocaleString("default", { month: "long" })} ${new Date().getDate()}, ${new Date().getFullYear()}</div>    
                    </div>
                    <div class="flex justify-between items-end cursor-pointer">
                        <div id="settings" class="rounded-full transition bg-blue-600 ${hlp.get("pfp", false).includes("gravatar") ? "" : `bg-[url('${hlp.get("pfp", false)}')] bg-cover`} border-[6px] hover:border-blue-400 active:border-blue-600 border-blue-500 h-[4.5rem] w-[4.5rem] sm:h-[6rem] sm:w-[6rem] flex items-center justify-center text-2xl font-bold uppercase">
                            ${hlp.get("pfp", false).includes("gravatar") ? hlp.session.firstname.charAt(0).toUpperCase() : ""}
                        </div>                    
                    </div>
                </div>
            </div>
            <!---->
            <!---->
            <div class="flex flex-col gap-5 pt-[1.2rem] mb-[2rem] container mx-auto py-10 px-4">
                <div id="what-is-this" class="flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-5 px-3 border-4 border-blue-700">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                            <span class="text-3xl material-symbols-rounded">
                                help
                            </span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">What is this</h1>
                            <span class="font-bold text-[15px] text-zinc-400">Why was this was created</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center">
                        <span class="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div id="courses" class="relative relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                            <span class="text-3xl material-symbols-rounded flex justify-center">
                                assignment
                            </span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Courses</h1>
                            <span class="font-bold text-[15px] text-zinc-400">See your current courses</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center">
                        <span class="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div id="averages" class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                            <span class="text-3xl material-symbols-rounded flex justify-center">
                                show_chart
                            </span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Averages</h1>
                            <span class="font-bold text-[15px] text-zinc-400">See your objective averages</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center">
                        <span class="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div id="todo" class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                            <span class="text-3xl material-symbols-rounded flex justify-center">
                                task
                            </span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Todo List</h1>
                            <span class="font-bold text-[15px] text-zinc-400">See due or past due work</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center">
                        <span class="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div id="stream" class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                            <span class="text-3xl material-symbols-rounded flex justify-center">
                                group
                            </span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Activity Stream</h1>
                            <span class="font-bold text-[15px] text-zinc-400">See your activites</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center">
                        <span class="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div id="announcements" class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                            <span class="text-3xl mt-1 material-symbols-rounded flex justify-center">
                                feedback
                            </span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Announcements</h1>
                            <span class="font-bold text-[15px] text-zinc-400">See current announcements</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center">
                        <span class="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                <div id="email" class="relative flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center bg-blue-700 px-4 py-3 rounded-2xl">
                            <span class="text-3xl material-symbols-rounded flex justify-center">
                                alternate_email
                            </span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Contact Teachers</h1>
                            <span class="font-bold text-[15px] text-zinc-400">Email your teachers</span>
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
            <div id="bottom" class="fixed bottom-0 left-0 right-0">
                <div class="bg-zinc-800">
                    <div class="flex flex-row justify-between items-center">
                        <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="text-[30px] font-black text-blue-700 pointer-events-none material-symbols-rounded">
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
                ////////// MAIN PAGES

                case "courses": {
                    
                }

                case "averages": {

                }

                case "todo": {

                }

                case "stream": {

                }

                case "announcements": {
                    await site.runtime("announcements");
                    break;
                }

                case "email": {

                }


                ////////////////////////////////////////////////////////////
                ///////// BOTTOM NAVIGATION CONTROLS

                case "settings": {
                    await site.runtime("settings");
                    break;
                }


                ////////////////////////////////////////////////////////////
                ///////// OVERLAYS

                case "what-is-this": {
                    $("#overlays").append(`
                        <div id="overlay" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                            <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                <div class="bg-zinc-800 rounded-xl max-w-lg px-5 py-5 pointer-events-auto">
                                    <div class="flex justify-center items-center mb-4">
                                        <h2 class="text-2xl font-bold text-white text-center">About Proview</h2>
                                    </div>
                                    <div class="text-white">
                                        <p>This website was created to show that <b>Echo Viewer</b> by <b>Agilix, Inc</b> could have been better. This websites design is based off <b>GradeWay</b> by <b>Srujan Mupparapu</b>, this website is not meant to infringe or plagarize his work, If it does (specifically to Srujan) please send an issue <a class="text-blue-700 hover:text-blue-600 cursor-pointer transition" goto="https://github.com/wo-r-professional/proview/issues">here</a> and I will abide to whatever you ask.</p>
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

        hlp.animate_nav();
    })
}