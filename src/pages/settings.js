export async function run() {
    const hlp = await import("../helpers.js");
    const site = await import("../site.js");

    await hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="${hlp.gettheme("bg", "700")} text-white">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row ${hlp.gettheme("bg", "700")}">
                    <div id="scrolled-title" class="flex justify-center items-center container mx-auto py-2 px-4 h-[60px]">
                        <div></div>
                        <span class="flex-grow font-bold text-center text-[22px] hidden">Settings</span>
                        <div></div>
                    </div>
                </div>
                <div class="flex flex-row gap-10 justify-between container mx-auto pt-16 pb-5 px-4">
                    <div class="flex flex-col flex-grow justify-center">
                        <h1 class="text-5xl sm:text-7xl font-bold pb-0 -m-[2px] mb-0">Settings</h1>
                    </div>
                </div>
            </div>
            <!---->
            <!---->
            <div class="flex flex-col gap-5 pt-[1.1rem] mb-[1.8rem] container mx-auto py-10 px-4">
                <div id="profile" class="flex flex-col justify-center items-center container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                    <div class="flex justify-between items-center">
                        <div class="relative text-white rounded-full border-[6px] ${hlp.gettheme("border", "500")} ${hlp.gettheme("bg", "600")} ${!hlp.get("pfp").includes("data:") ? "" : `bg-[url('${hlp.get("pfp", false)}')] bg-cover bg-no-repeat bg-center`} h-20 w-20 flex items-center justify-center text-2xl sm:text-2xl font-bold uppercase">
                            <span class="z-1">${!hlp.get("pfp").includes("data:") ? hlp.session.fullname.charAt(0).toUpperCase() : ""}</span>
                        </div>
                    </div>
                    <h1 class="text-[28px] font-bold">${hlp.session.fullname}</h1>
                    <div class="flex flex-row w-full mt-5 gap-5">
                        <div class="flex-1">
                            <button id="change-name" class="w-full px-4 py-3 ${hlp.gettheme("bg", "700")} hover:${hlp.gettheme("bg", "500")} text-white transition font-semibold rounded-xl">Change Name</button>
                        </div>
                        <div class="flex-1">
                            <button id="change-pfp" class="w-full px-4 py-3 ${hlp.gettheme("bg", "700")} hover:${hlp.gettheme("bg", "500")} text-white transition font-semibold rounded-xl">Change Picture</button>
                            <input id="pfp-data" type="file" accept=".png, .jpg, .jpeg" class="hidden">
                        </div>
                    </div>
                </div>
                <!---->
                <div class="flex flex-col container mx-auto ${hlp.gettheme("theme-card")} rounded-xl px-3">
                    <div id="theme-color" class="flex flex-row justify-between container mx-auto cursor-pointer py-3 border-b-[2px] border-zinc-700">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                            <div class="flex w-[45px] justify-center items-center ${hlp.gettheme("bg", "700")} px-[8px] py-[8px] rounded-2xl">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="fill-white" d="M269-115 75-308q-21-21-31-47t-10-54q0-27 10-52.5T75-508l195-193-76-77q-20-20-20-49t20-49q21-22 50-21.5t50 20.5l367 369q21 21 31.5 46.5T703-409q0 28-10.5 54T661-308L468-115q-20 20-46 30.5T369-74q-27 0-53-10t-47-31Zm98-486L186-420v-.5.5h363q0-1 0 0L367-601ZM822-74q-44 0-74-32t-30-77q0-27 9.5-52t27.5-46l27-30q16-17 38.5-17t37.5 18l27 29q18 21 29.5 46t11.5 52q0 45-30.5 77T822-74Z"/>
                                </svg>
                            </div>
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Theme Color</h1>
                            </div>
                        </div>
                        <div class="flex w-6 justify-center items-center pointer-events-none">
                            <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                <path class="${hlp.gettheme("theme-fill")}" d="M542-480 265-758q-23-22-23-54t22-55q23-22 55.5-22t54.5 22l292 291q20 20 29.5 44.5T705-480q0 26-9.5 50.5T666-384L374-93q-22 22-54 21.5T265-94q-22-22-22-54.5t22-54.5l277-277Z"/>
                            </svg>
                        </div>
                    </div>
                    <!---->
                    <div id="hide-courses" class="flex flex-row justify-between container mx-auto cursor-pointer py-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                            <div class="flex w-[45px] justify-center items-center ${hlp.gettheme("bg", "700")} px-[8px] py-[8px] rounded-2xl">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="fill-white" d="M747-64 628-181q-35 13-72.5 18.5T480-157q-144 0-264.5-76T28-437q-8-15-11.5-30.5T13-500q0-17 3.5-32.5T27-563q18-35 40.5-67t50.5-61l-70-71q-15-15-15.5-36T48-835q15-15 36.5-15t36.5 15l699 699q15 15 15 36t-15 36q-16 15-37 15t-36-15ZM480-311q5 0 9.5-.5T500-313L291-520v20q0 79 55 134t134 55Zm0-532q144 0 265 77t188 205q8 15 11.5 30t3.5 31q0 16-3.5 31.5T934-438q-13 27-30 53t-36 49q-21 24-53 23.5T759-336l-76-77q-12-11-15.5-27t-.5-32q1-7 1.5-14t.5-14q0-79-55-134t-134-55q-7 0-14 .5t-14 1.5q-16 3-31.5-.5T393-703l-12-12q-32-32-20.5-74t53.5-50q17-2 33.5-3t32.5-1Zm61 274 3.5 3.5q1.5 1.5 2.5 4.5t-2.5 5q-3.5 2-6.5-1l-8-8q-3-3-1-6.5t6-2.5q2 1 3.5 2t2.5 3Z"/>
                                </svg>
                            </div>
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Hide Courses</h1>
                            </div>
                        </div>
                        <div class="flex w-6 justify-center items-center pointer-events-none">
                            <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                <path class="${hlp.gettheme("theme-fill")}" d="M542-480 265-758q-23-22-23-54t22-55q23-22 55.5-22t54.5 22l292 291q20 20 29.5 44.5T705-480q0 26-9.5 50.5T666-384L374-93q-22 22-54 21.5T265-94q-22-22-22-54.5t22-54.5l277-277Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="flex flex-col container mx-auto ${hlp.gettheme("theme-card")} rounded-xl px-3">
                    <div id="gpa-settings" class="flex flex-row justify-between container mx-auto cursor-pointer py-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                            <div class="flex w-[45px] justify-center items-center ${hlp.gettheme("bg", "700")} px-[8px] py-[8px] rounded-2xl">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="fill-white" d="M322-322v48q0 14.3 9.38 23.65 9.39 9.35 23.74 9.35 14.35 0 23.61-9.35Q388-259.7 388-274v-48h48q14.3 0 23.65-9.38 9.35-9.39 9.35-23.74 0-14.35-9.35-23.61Q450.3-388 436-388h-48v-48q0-14.3-9.38-23.65-9.39-9.35-23.74-9.35-14.35 0-23.61 9.35Q322-450.3 322-436v48h-48q-14.3 0-23.65 9.38-9.35 9.39-9.35 23.74 0 14.35 9.35 23.61Q259.7-322 274-322h48Zm223 51h141q14.3 0 23.65-9.38 9.35-9.39 9.35-23.74 0-14.35-9.35-24.11Q700.3-338 686-338H545q-14.3 0-23.65 9.58-9.35 9.58-9.35 24.23 0 14.66 9.35 23.92Q530.7-271 545-271Zm0-101h141q14.3 0 23.65-9.38 9.35-9.39 9.35-23.74 0-14.35-9.35-23.61Q700.3-438 686-438H545q-14.3 0-23.65 9.38-9.35 9.39-9.35 23.74 0 14.35 9.35 23.61Q530.7-372 545-372Zm70-196 34 33q9 10 22.5 10t23.5-10q9-9 9.5-22.6.5-13.61-8.5-23.4l-35-36 34-33q10-10 10-23.5T695-697q-10-10-23.5-10T648-697l-33 34-33-34q-10.09-10-23.55-10-13.45 0-22.95 10t-9.5 23.5q0 13.5 9 23.5l34 33-35 36q-9 10-8.5 23t10.64 23q10.15 10 23.18 10 13.04 0 22.68-10l33-33Zm-331-22h141q14.3 0 23.65-9.38 9.35-9.39 9.35-23.74 0-14.35-9.35-23.61Q439.3-656 425-656H284q-14.3 0-23.65 9.38-9.35 9.39-9.35 23.74 0 14.35 9.35 23.61Q269.7-590 284-590ZM212-76q-57.12 0-96.56-39.44Q76-154.88 76-212v-536q0-57.13 39.44-96.56Q154.88-884 212-884h536q57.13 0 96.56 39.44Q884-805.13 884-748v536q0 57.12-39.44 96.56Q805.13-76 748-76H212Z"/>
                                </svg>
                            </div>
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">GPA Settings</h1>
                            </div>
                        </div>
                        <div class="flex w-6 justify-center items-center pointer-events-none">
                            <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                <path class="${hlp.gettheme("theme-fill")}" d="M542-480 265-758q-23-22-23-54t22-55q23-22 55.5-22t54.5 22l292 291q20 20 29.5 44.5T705-480q0 26-9.5 50.5T666-384L374-93q-22 22-54 21.5T265-94q-22-22-22-54.5t22-54.5l277-277Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="flex flex-col container mx-auto ${hlp.gettheme("theme-card")} rounded-xl px-3">
                    <div id="chip-indicators" class="flex flex-row justify-between container mx-auto cursor-pointer py-3 border-b-[2px] border-zinc-700">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex w-[45px] justify-center items-center ${hlp.gettheme("bg", "700")} px-[8px] py-[8px] rounded-2xl">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="fill-white" d="M182-154q-29 0-48.5-19.5t-19.5-48q0-28.5 19.5-48.5t48.5-20v-246q0-99 57-179t153-106v-17q0-37.08 25.44-62.54t62.5-25.46q37.06 0 62.56 25.46T568-838v17q96 25 153.5 104.54T779-536v246q27.6 0 47.8 20.2Q847-249.6 847-222q0 29-20.2 48.5T779-154H182ZM480.96-18Q440-18 412-45.97 384-73.94 384-114h193q0 40-27.98 68t-68.06 28Z"/>
                                </svg>
                            </div>
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Visual Chip Indicators</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input option="chip-indicators" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] ${hlp.gettheme("theme-toggle")} rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <!---->
                    <div id="include-self" class="flex flex-row justify-between container mx-auto cursor-pointer py-3 border-b-[2px] border-zinc-700">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex w-[45px] justify-center items-center ${hlp.gettheme("bg", "700")} px-[8px] py-[8px] rounded-2xl">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="fill-white" d="M503-505q42-42 61-93.5t19-106.34q0-53.84-22-107.5T501-903q84 14 128 71.8T673-704q0 72-46 130t-124 69ZM699-86q23-29 35-63.5t12-72.5v-26.74Q746-301 729.5-341 713-381 680-414q75 14 123.5 56.5T852-249v27q0 58.4-39.5 97.2Q773-86 716-86h-17Zm150-460h-39q-18.6 0-31.8-13.2T765-591q0-18.6 13.2-31.8T810-636h39v-39q0-18 13.08-31.5t31.5-13.5q18.42 0 31.92 13.5T939-675v39h38q18.6 0 31.8 13.2T1022-591q0 18.6-13.2 31.8T977-546h-38v39q0 18-13.28 31.5t-32 13.5Q875-462 862-475.5T849-507v-39Zm-547 44q-84 0-143-59t-59-143.5q0-84.5 59-142.5t143.5-58q84.5 0 142.5 57.89T503-704q0 84-57.89 143-57.88 59-143.11 59ZM-63-222v-23.12q0-46.22 22.5-84.55T22-387q67-34 137.5-51t142-17q74.5 0 144.5 17t135 50q40.19 19.44 63.09 56.99Q667-293.47 667-245v23q0 58.4-39.5 97.2Q588-86 531-86H72q-57 0-96-38.8T-63-222Z"/>
                                </svg>
                            </div>
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Include Self Activities</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input option="include-self" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] ${hlp.gettheme("theme-toggle")} rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <!---->
                    <div id="hide-excused" class="flex flex-row justify-between container mx-auto cursor-pointer py-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex w-[45px] justify-center items-center ${hlp.gettheme("bg", "700")} px-[8px] py-[8px] rounded-2xl">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="fill-white" d="M886-750v378q0 23-12 39.5T844-309q-18 7-38 4t-36-19L324-770q-16-16-19-36t4-38q7-18 23.5-30t39.5-12h378q57 0 96.5 39.5T886-750ZM210-74q-57 0-96.5-39.5T74-210v-528l-35-34q-15-16-15.5-37.5T39-847q16-16 37-16t37 16l734 734q15 15 15.5 35.5T847-40q-16 16-37.5 16T772-40l-34-34H210Zm341-188-85-83-16 19-83-79q-11-12-26.5-10.5T315-401l-61 85q-12 17-2.5 35.5T282-262h269Z"/>
                                </svg>
                            </div>
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Hide Excused Activities</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input option="hide-excused" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] ${hlp.gettheme("theme-toggle")} rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="flex flex-col container mx-auto ${hlp.gettheme("theme-card")} rounded-xl px-3">
                    <div id="manage-account" class="flex flex-row justify-between container mx-auto cursor-pointer py-3 border-b-[2px] border-zinc-700">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                            <div class="flex w-[45px] justify-center items-center ${hlp.gettheme("bg", "700")} px-[8px] py-[8px] rounded-2xl">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="fill-white" d="M480.16-502Q395-502 336.5-561T278-704.5q0-84.5 58.34-142.5t143.5-58q85.16 0 143.66 57.89T682-704q0 84-58.34 143t-143.5 59ZM114-222v-23q0-46.47 23.41-84.51Q160.81-367.56 201-387q66-34 136.31-51t142.5-17Q554-455 624-438t135 50q40.19 19.44 63.59 56.99Q846-293.47 846-245v23q0 58.4-39.5 97.2Q767-86 710-86H250q-57 0-96.5-38.8T114-222Z"/>
                                </svg>
                            </div>
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Manage Account</h1>
                            </div>
                        </div>
                        <div class="flex w-6 justify-center items-center pointer-events-none">
                            <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                <path class="${hlp.gettheme("theme-fill")}" d="M542-480 265-758q-23-22-23-54t22-55q23-22 55.5-22t54.5 22l292 291q20 20 29.5 44.5T705-480q0 26-9.5 50.5T666-384L374-93q-22 22-54 21.5T265-94q-22-22-22-54.5t22-54.5l277-277Z"/>
                            </svg>
                        </div>
                    </div>
                    <!---->
                    <div id="help-center" class="flex flex-row justify-between container mx-auto cursor-pointer py-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                            <div class="flex w-[45px] justify-center items-center ${hlp.gettheme("bg", "700")} px-[8px] py-[8px] rounded-2xl">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="fill-white" d="m428-167-9-1q-150.51-17-250.75-128.5Q68-408 68-559q0-163 114.61-276.5T460.36-949q81.07 0 152.09 30.86 71.01 30.87 124.28 84Q790-781 821-709.83q31 71.16 31 152.51Q852-399 758-276.5T526-67q-16 9-33 8t-31.5-9Q447-76 438-90.5t-9-33.5l-1-43Zm32.45-157Q484-324 500-340.45q16-16.45 16-39.5t-16.07-39.55Q483.86-436 460.05-436q-23.05 0-39.55 16.45-16.5 16.45-16.5 39.5t16.45 39.55q16.45 16.5 40 16.5ZM366.5-637q16.46 6 32.12-.47 15.66-6.48 27.51-20.53 8.16-8.52 16.88-12.76 8.72-4.24 19.35-4.24 16.39 0 27.52 9.44Q501-656.13 501-642q0 13-7.5 26.58Q486-601.84 471-589q-25 23-39.5 45.5T417-504.24q0 16.85 12 29.05Q441-463 458.9-463q14.9 0 26.5-10t19.6-23q8-15 17-27.5t17-21.5q28-32 39.5-53.5T590-646q0-50.8-33.5-81.9Q523-759 468.58-759q-37.25 0-68.91 15.5Q368-728 351.74-701.71 340-684 344-664t22.5 27Z"/>
                                </svg>
                            </div>
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Help Center</h1>
                            </div>
                        </div>
                        <div class="flex w-6 justify-center items-center pointer-events-none">
                            <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                <path class="${hlp.gettheme("theme-fill")}" d="M542-480 265-758q-23-22-23-54t22-55q23-22 55.5-22t54.5 22l292 291q20 20 29.5 44.5T705-480q0 26-9.5 50.5T666-384L374-93q-22 22-54 21.5T265-94q-22-22-22-54.5t22-54.5l277-277Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <!---->
                <button id="logout" class="w-full px-4 ${hlp.gettheme("theme-shadow")} hover:bg-red-500 py-3 bg-red-600 text-white transition font-semibold rounded-xl">Logout</button>
                <!---->
                <div class="flex flex-col justify-center items-center align-center">
                    <span class="text-sm font-bold">Gradpass v${hlp.version}</span>
                    <span class="text-sm font-bold">&copy; ${new Date().getFullYear()} Wo-r, Design from <a class="${hlp.gettheme("text", "700")} hover:${hlp.gettheme("text", "600")} cursor-pointer transition" goto="https://gradeway.github.io/">Srujan Mupparapu</a></span>
                    <span class="text-xs font-bold text-zinc-400">Created for the betterment of Echo</span>
                </div>  
            </div>
            <!---->
            <!---->
            <div id="bottom" class="fixed bottom-0 left-0 right-0">
                <div class="${hlp.gettheme("theme-card")}">
                    <div class="flex flex-row justify-between items-center">
                        <a id="overview" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="w-8 font-black pointer-events-none">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="${hlp.gettheme("theme-fill")}" d="M117-212v-341q0-33 14-61.5t40-47.5l227-171q37-27 82-27t82 27l227 171q26 19 40 47.5t14 61.5v341q0 57-39.5 96.5T707-76h-67q-29 0-48.5-20T572-144v-196q0-28-20-48t-48-20h-48q-28 0-48 20t-20 48v196q0 28-19.5 48T320-76h-67q-57 0-96.5-39.5T117-212Z"/>
                                </svg>
                            </span>
                        </a>
                        <a id="calendar" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="w-8 font-black pointer-events-none material-symbols-rounded">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="${hlp.gettheme("theme-fill")}" d="M210-34q-57.12 0-96.56-40.14Q74-114.28 74-170v-541q0-57.13 39.44-96.56Q152.88-847 210-847h15v-23q0-22.6 17.2-39.3Q259.4-926 282-926q24 0 40 16.7t16 39.3v23h284v-23q0-22.6 16.5-39.3 16.5-16.7 40-16.7t40 16.7Q735-892.6 735-870v23h15q57.13 0 96.56 39.44Q886-768.13 886-711v541q0 55.72-39.44 95.86Q807.13-34 750-34H210Zm0-136h540v-398H210v398Zm270.49-220q-20.91 0-35.7-14.59Q430-419.18 430-439.79q0-20.61 14.79-35.41 14.79-14.8 35.7-14.8 20.91 0 35.21 14.59t14.3 35.2q0 20.61-14.3 35.41-14.3 14.8-35.21 14.8Zm-160.28 0q-20.61 0-35.41-14.59-14.8-14.59-14.8-35.2 0-20.61 14.59-35.41 14.59-14.8 35.2-14.8 20.61 0 35.41 14.59 14.8 14.59 14.8 35.2 0 20.61-14.59 35.41-14.59 14.8-35.2 14.8Zm319.3 0Q620-390 605-404.59q-15-14.59-15-35.2 0-20.61 15-35.41 15-14.8 35.01-14.8 20.01 0 35 14.59Q690-460.82 690-440.21q0 20.61-14.79 35.41-14.79 14.8-35.7 14.8ZM480.49-230q-20.91 0-35.7-15Q430-260 430-280.01q0-20.01 14.79-35Q459.58-330 480.49-330q20.91 0 35.21 14.79t14.3 35.7Q530-260 515.7-245q-14.3 15-35.21 15Zm-160.28 0q-20.61 0-35.41-15-14.8-15-14.8-35.01 0-20.01 14.59-35Q299.18-330 319.79-330q20.61 0 35.41 14.79 14.8 14.79 14.8 35.7Q370-260 355.41-245q-14.59 15-35.2 15Zm319.3 0Q620-230 605-245q-15-15-15-35.01 0-20.01 15-35Q620-330 640.01-330q20.01 0 35 14.79Q690-300.42 690-279.51 690-260 675.21-245q-14.79 15-35.7 15Z"/>
                                </svg>
                            </span>
                        </a>
                        <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="w-8 font-black pointer-events-none material-symbols-rounded">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="${hlp.gettheme("theme-fill")}" d="M212-76q-57.4 0-96.7-39.3Q76-154.6 76-212v-536q0-57.4 39.3-96.7Q154.6-884 212-884h536q57.4 0 96.7 39.3Q884-805.4 884-748v536q0 57.4-39.3 96.7Q805.4-76 748-76H212Zm108.42-489q-18.42 0-31.92 13.2T275-520v201q0 18.6 13.28 31.8t32 13.2Q339-274 352-287.2t13-31.8v-201q0-18.6-13.08-31.8t-31.5-13.2Zm160-121q-18.42 0-31.92 13.2T435-641v322q0 18.6 13.28 31.8t32 13.2Q499-274 512-287.2t13-31.8v-322q0-18.6-13.08-31.8t-31.5-13.2Zm159.3 241Q621-445 608-431.5T595-400v81q0 18.6 13.08 31.8t31.5 13.2q18.42 0 31.92-13.2T685-319v-81q0-18-13.28-31.5t-32-13.5Z"/>
                                </svg>
                            </span>
                        </a>
                        <a id="settings" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="w-8 font-black pointer-events-none material-symbols-rounded">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="${hlp.gettheme("fill", "700")}" d="M405-34q-32 0-55-20t-27-51l-10-70q-3-2-6.5-4t-6.5-4l-65 27q-29 12-59 2.5T131-191L56-325q-16-27-10-57.5T77-431l54-42q0-2 .5-4t.5-4q0-2-.5-3.5t-.5-3.5l-53-40q-26-19-32-49.5T56-636l75-132q16-27 45-37t58 2l66 26q4-1 7.5-3t6.5-4l9-70q3-32 26.5-52.5T405-927h150q32 0 55.5 20.5T637-854l9 70 8 4 8 4 62-27q30-12 59.5-2t45.5 37l75 132q16 28 10 58.5T882-528l-55 40v8q0 2-.5 4t-.5 4l55 40q26 18 32 48.5T903-325l-76 134q-15 27-44.5 37t-59.5-2l-65-27q-3 1-6 3.5t-5 3.5l-10 71q-4 31-27 51t-55 20H405Zm73-296q63 0 107-44t44-107q0-62-44-106.5T478-632q-63 0-107 44.5T327-481q0 63 44 107t107 44Z"/>
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        `).click(async function (e) {
            switch ($(e.target).attr("id")) {
                /**
                 * Change name.
                 */
                case "change-name": {
                    $("body").addClass("overflow-hidden");
                    await $("#overlays").append(`
                        <div id="overlay" class="fixed z-50 overflow-hidden inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                            <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                <div class="${hlp.gettheme("theme-card")} ${hlp.gettheme("theme-text")} rounded-xl max-w-lg px-5 py-5 pointer-events-auto w-[25rem]">
                                    <div class="flex justify-center items-center mb-4">
                                        <h2 class="text-2xl font-bold text-center">Change Name</h2>
                                    </div>
                                    <form action="">
                                        <div class="flex flex-row space-x-2">
                                            <input placeholder="New Name" id="name" value="${hlp.session.fullname}" class="${hlp.gettheme("caret", "700")} flex-1 font-bold ${hlp.gettheme("theme-input")} mt-1 block w-full px-5 py-4 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                                        </div>
                                        <button type="submit" id="submit-name" class="w-full mt-2 px-4 py-2 ${hlp.gettheme("bg", "600")} text-white transition font-semibold rounded-xl hover:${hlp.gettheme("bg", "500")} focus:outline-none focus:ring-2 focus:${hlp.gettheme("ring", "700")} focus:ring-opacity-50">Done</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    `).off().on("click submit", function (e) {
                        switch ($(e.target).attr("id")) {
                            case "overlay": {
                                $("#overlay").fadeOut(400, function () {
                                    $("#overlays").empty();
                                });
                                $("body").removeClass("overflow-hidden");
                                break;
                            }
                            case "submit-name": {
                                if ($("#name").val().length != 0) {
                                    if ($("#name").val() != hlp.session.fullname) {
                                        let saved = hlp.get("saved");
                                        let session = hlp.get("session");
                                        saved.fullname = $("#name").val();
                                        session.user.fullname = $("#name").val();
                                        hlp.set("saved", saved)
                                        hlp.set("session", session)

                                        $("#overlays").empty();
                                        $("body").removeClass("overflow-hidden");

                                        site.runtime("settings");
                                    } else {
                                        $("#overlays").empty();
                                        $("body").removeClass("overflow-hidden");
                                    }
                                } else {
                                    $("#name").addClass("shake border border-red-300").one("animationend webkitAnimationEnd", function() {
                                        $(this).removeClass("shake border border-red-300");
                                    });
                                }
                                break;
                            }
                        }
                    })
                    break;
                }

                /**
                 * Change pfp.
                 */
                case "change-pfp": {    
                    $("#pfp-data").trigger("click").change(function () {
                        const file = this.files[0];
                        const reader = new FileReader();
                    
                        reader.onload = function(e) {
                            hlp.set("pfp", e.target.result, false);
                            site.runtime("settings")
                        };
                    
                        reader.readAsDataURL(file);
                    })
                    break;
                }

                /**
                 * Settings items.
                 */
                case "theme-color": {
                    site.runtime("theme-color");
                    break;
                }
                case "hide-courses": {
                    site.runtime("hide-courses");
                    break;
                }
                case "gpa-settings": {
                    site.runtime("gpa-settings");
                    break;
                }
                case "manage-account": {
                    site.runtime("manage-account");
                    break;
                }
                case "help-center": {
                    site.runtime("help-center");
                    break;
                }

                /**
                 * Logout action.
                 */
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
                            success: async function () {
                                hlp.remove("session");
                                await site.runtime("login");
                            }
                        })
                    })
                    break;
                }

                /**
                 * Nagivation
                 */
                case "calendar": {
                    site.runtime("calendar");
                    break;
                }
                case "grades": {
                    await site.runtime("grades");
                    break;
                }
                case "overview": {
                    site.runtime("overview");
                    break;
                }
            }
        })


        // Set options to there current set values.
        let settings = hlp.get("settings");
        await $.each(settings, (i, option) => {
            if (option.$value) {
                $(`input[option="${option.option}"]`).prop("checked", option.$value);
                $(`input[option="${option.option}"]`).parent().find("label div div").removeClass("translate-x-0").addClass("translate-x-full").parent().removeClass(`${hlp.gettheme("theme-toggle")}`).addClass(`${hlp.gettheme("bg", "700")}`);
            }
        })

        // Manage when a user clicks on an option.
        await $("#root div[id]:has(input[option])").click(async function () {
            // Determine if the actual value of the input is checked or not.
            if ($(this).find("input").prop("checked")) {
                $(this).find("input").prop("checked", "");
            } else {
                $(this).find("input").prop("checked", "true");
            }

            // Visually show if it is checked or not.
            if ($(this).find("input").prop("checked")) {
                $(this).find("label div div").removeClass("translate-x-0").addClass("translate-x-full duration-300 ease-in-out").parent().removeClass(`${hlp.gettheme("theme-toggle")}`).addClass(`${hlp.gettheme("bg", "700")}`);
            } else {
                $(this).find("label div div").removeClass("translate-x-full").addClass("translate-x-0 duration-300 ease-in-out").parent().removeClass(`${hlp.gettheme("bg", "700")}`).addClass(`${hlp.gettheme("theme-toggle")}`);
            }

            // Set the current option of the value, allowing seemless setting changes.
            if (!hlp.stringify(settings).includes($(this).find("input").attr("option"))) {
                // If for some reason a new feature is added.
                settings.push({
                    option: $(this).find("input").attr("option"),
                    $value:  $(this).find("input").prop("checked")
                });
                hlp.set("settings", settings);
            } else {
                // Option already exists.
                settings.find(name => name.option.includes($(this).find("input").attr("option"))).$value = $(this).find("input").prop("checked");
                hlp.set("settings", settings);
            }
        })
    })
}