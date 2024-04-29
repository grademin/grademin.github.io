export async function run() {
    const hlp = await import("../helpers.js");
    const site = await import("../site.js");

    hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="${hlp.gettheme("bg", "700")} text-white">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row ${hlp.gettheme("bg", "700")}">
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
                        <div id="settings" class="rounded-full transition ${hlp.gettheme("bg", "600")} ${!hlp.get("pfp").includes("data:") ? "" : `bg-[url('${hlp.get("pfp")}')] bg-cover bg-no-repeat bg-center`} border-[6px] hover:${hlp.gettheme("border", "400")} ${hlp.gettheme("border", "500")} h-[4.5rem] w-[4.5rem] sm:h-[6rem] sm:w-[6rem] flex items-center justify-center text-2xl font-bold uppercase">
                            <span class="text-[20px] sm:text-[30px]">${!hlp.get("pfp").includes("data:") ? hlp.session.firstname.charAt(0).toUpperCase() : ""}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!---->
            <!---->
            <div class="flex flex-col gap-5 pt-[1.1rem] mb-[1.8rem] container mx-auto py-10 px-4">
                <div id="what-is-this" class="flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl cursor-pointer py-5 px-3 border-4 ${hlp.gettheme("border", "700")}">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center ${hlp.gettheme("bg", "700")} p-[14px] rounded-2xl">
                            <span class="text-3xl text-white material-symbols-rounded p-[17px] bg-cover bg-center bg-[url('src/icons/help.svg')]"></span>
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
                <div id="courses" class="relative relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center ${hlp.gettheme("bg", "700")} p-[14px] rounded-2xl">
                            <span class="text-3xl material-symbols-rounded text-white flex justify-center p-[17px] bg-cover bg-center bg-[url('src/icons/assignment.svg')]"></span>
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
                <div id="todo-list" class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center ${hlp.gettheme("bg", "700")} p-[14px] rounded-2xl">
                            <span class="text-3xl material-symbols-rounded text-white flex justify-center p-[17px] bg-cover bg-center bg-[url('src/icons/task.svg')]"></span>
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
                <div id="activity-stream" class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center ${hlp.gettheme("bg", "700")} p-[14px] rounded-2xl">
                            <span class="text-3xl material-symbols-rounded text-white flex justify-center p-[17px] bg-cover bg-center bg-[url('src/icons/group.svg')]"></span>
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
                <div id="announcements" class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center ${hlp.gettheme("bg", "700")} p-[14px] rounded-2xl">
                            <span class="text-3xl mt-1 material-symbols-rounded text-white flex justify-center p-[17px] bg-cover bg-center bg-[url('src/icons/feedback.svg')]"></span>
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
                <div id="contact" class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center ${hlp.gettheme("bg", "700")} p-[14px] rounded-2xl">
                            <span class="text-3xl material-symbols-rounded text-white flex justify-center p-[17px] bg-cover bg-center bg-[url('src/icons/alt-email.svg')]"></span>
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
                <div class="${hlp.gettheme("theme-card")}">
                    <div class="flex flex-row justify-between items-center">
                        <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="w-8 font-black pointer-events-none">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="0 -1000 1000 1000">
                                    <path class="${hlp.gettheme("fill", "700")}" d="M117-212v-341q0-33 14-61.5t40-47.5l227-171q37-27 82-27t82 27l227 171q26 19 40 47.5t14 61.5v341q0 57-39.5 96.5T707-76h-67q-29 0-48.5-20T572-144v-196q0-28-20-48t-48-20h-48q-28 0-48 20t-20 48v196q0 28-19.5 48T320-76h-67q-57 0-96.5-39.5T117-212Z"/>
                                </svg>
                            </span>
                        </a>
                        <a id="calendar" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="w-8 font-black pointer-events-none material-symbols-rounded">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="0 -1000 1000 1000">
                                    <path class="${hlp.gettheme("theme-fill")}" d="M210-34q-57.12 0-96.56-40.14Q74-114.28 74-170v-541q0-57.13 39.44-96.56Q152.88-847 210-847h15v-23q0-22.6 17.2-39.3Q259.4-926 282-926q24 0 40 16.7t16 39.3v23h284v-23q0-22.6 16.5-39.3 16.5-16.7 40-16.7t40 16.7Q735-892.6 735-870v23h15q57.13 0 96.56 39.44Q886-768.13 886-711v541q0 55.72-39.44 95.86Q807.13-34 750-34H210Zm0-136h540v-398H210v398Zm270.49-220q-20.91 0-35.7-14.59Q430-419.18 430-439.79q0-20.61 14.79-35.41 14.79-14.8 35.7-14.8 20.91 0 35.21 14.59t14.3 35.2q0 20.61-14.3 35.41-14.3 14.8-35.21 14.8Zm-160.28 0q-20.61 0-35.41-14.59-14.8-14.59-14.8-35.2 0-20.61 14.59-35.41 14.59-14.8 35.2-14.8 20.61 0 35.41 14.59 14.8 14.59 14.8 35.2 0 20.61-14.59 35.41-14.59 14.8-35.2 14.8Zm319.3 0Q620-390 605-404.59q-15-14.59-15-35.2 0-20.61 15-35.41 15-14.8 35.01-14.8 20.01 0 35 14.59Q690-460.82 690-440.21q0 20.61-14.79 35.41-14.79 14.8-35.7 14.8ZM480.49-230q-20.91 0-35.7-15Q430-260 430-280.01q0-20.01 14.79-35Q459.58-330 480.49-330q20.91 0 35.21 14.79t14.3 35.7Q530-260 515.7-245q-14.3 15-35.21 15Zm-160.28 0q-20.61 0-35.41-15-14.8-15-14.8-35.01 0-20.01 14.59-35Q299.18-330 319.79-330q20.61 0 35.41 14.79 14.8 14.79 14.8 35.7Q370-260 355.41-245q-14.59 15-35.2 15Zm319.3 0Q620-230 605-245q-15-15-15-35.01 0-20.01 15-35Q620-330 640.01-330q20.01 0 35 14.79Q690-300.42 690-279.51 690-260 675.21-245q-14.79 15-35.7 15Z"/>
                                </svg>
                            </span>
                        </a>
                        <a id="grades" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="w-8 font-black pointer-events-none material-symbols-rounded">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="0 -1000 1000 1000">
                                    <path class="${hlp.gettheme("theme-fill")}" d="M212-76q-57.4 0-96.7-39.3Q76-154.6 76-212v-536q0-57.4 39.3-96.7Q154.6-884 212-884h536q57.4 0 96.7 39.3Q884-805.4 884-748v536q0 57.4-39.3 96.7Q805.4-76 748-76H212Zm108.42-489q-18.42 0-31.92 13.2T275-520v201q0 18.6 13.28 31.8t32 13.2Q339-274 352-287.2t13-31.8v-201q0-18.6-13.08-31.8t-31.5-13.2Zm160-121q-18.42 0-31.92 13.2T435-641v322q0 18.6 13.28 31.8t32 13.2Q499-274 512-287.2t13-31.8v-322q0-18.6-13.08-31.8t-31.5-13.2Zm159.3 241Q621-445 608-431.5T595-400v81q0 18.6 13.08 31.8t31.5 13.2q18.42 0 31.92-13.2T685-319v-81q0-18-13.28-31.5t-32-13.5Z"/>
                                </svg>
                            </span>
                        </a>
                        <a id="settings" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="w-8 font-black pointer-events-none material-symbols-rounded">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="0 -1000 1000 1000">
                                    <path class="${hlp.gettheme("theme-fill")}" d="M405-34q-32 0-55-20t-27-51l-10-70q-3-2-6.5-4t-6.5-4l-65 27q-29 12-59 2.5T131-191L56-325q-16-27-10-57.5T77-431l54-42q0-2 .5-4t.5-4q0-2-.5-3.5t-.5-3.5l-53-40q-26-19-32-49.5T56-636l75-132q16-27 45-37t58 2l66 26q4-1 7.5-3t6.5-4l9-70q3-32 26.5-52.5T405-927h150q32 0 55.5 20.5T637-854l9 70 8 4 8 4 62-27q30-12 59.5-2t45.5 37l75 132q16 28 10 58.5T882-528l-55 40v8q0 2-.5 4t-.5 4l55 40q26 18 32 48.5T903-325l-76 134q-15 27-44.5 37t-59.5-2l-65-27q-3 1-6 3.5t-5 3.5l-10 71q-4 31-27 51t-55 20H405Zm73-296q63 0 107-44t44-107q0-62-44-106.5T478-632q-63 0-107 44.5T327-481q0 63 44 107t107 44Z"/>
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        `).click(async function (e) {
            switch ($(e.target).attr("id")) {
                /**
                 * Overview items.
                 */
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
                case "contact": {
                    await site.runtime("contact");
                    break;
                }

                /**
                 * Bottom navigation items.
                 */
                case "grades": {
                    await site.runtime("grades");
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

                /**
                 * About site overlay.
                 */
                case "what-is-this": {
                    $("body").addClass("overflow-hidden");
                    $("#overlays").append(`
                        <div id="overlay" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                            <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                <div class="${hlp.gettheme("theme-card")} ${hlp.gettheme("theme-text")} rounded-xl max-w-lg px-5 py-5 pointer-events-auto">
                                    <div class="flex justify-center items-center mb-4">
                                        <h2 class="text-2xl font-bold text-center">About Proview</h2>
                                    </div>
                                    <div>
                                        <p>This website was created to show that <b>Echo Viewer</b> by <b>Agilix, Inc</b> could have been better. This websites design is based off <b>GradeWay</b> by <b>Srujan Mupparapu</b>, this website is not meant to infringe or plagarize his work, If it does (specifically to Srujan) please send an issue <a class="${hlp.gettheme("text", "700")} hover:${hlp.gettheme("text", "600")} cursor-pointer transition" goto="https://github.com/wo-r-professional/proview/issues">here</a> and I will abide to whatever you ask.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).on("click", function (e) {
                        switch ($(e.target).attr("id")) {
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
        });
        
        // TODO: Add the rest from github.
    });
}