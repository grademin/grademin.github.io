export async function run() {
    const hlp = await import("../../helpers.js");
    const site = await import("../../site.js");

    await hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="${hlp.gettheme("bg", "700")} text-white">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row ${hlp.gettheme("bg", "700")}">
                    <div class="flex justify-center items-center container mx-auto py-2 px-4">
                        <div id="go-back" class="-ml-4 flex-2 cursor-pointer py-3 pl-4 pr-2 rounded-full">
                            <svg class="w-[25px] pointer-events-none" viewBox="-14 -1000 1000 1000">
                                <path class="fill-white w-0" d="m213-480 278 277q22 23 22.5 55T491-94q-22 22-54.5 22T381-94L90-384q-20-21-30-45.5T50-480q0-27 10-51.5T90-576l291-292q23-22 55.5-22t54.5 22q22 22 22 55t-22 55L213-480Z"/>
                            </svg>
                        </div>
                        <span class="flex-grow font-bold text-center text-[22px]">Theme Color</span>
                        <div class="invisible -mr-2 flex-2 cursor-pointer py-3 pl-4 pr-2 rounded-full">
                            <svg class="w-[25px] pointer-events-none" viewBox="-14 -1000 1000 1000">
                                <path class="fill-white w-0" d="M476.28-113Q324-113 216.5-220 109-327 109-479t107.5-260Q324-847 476-847q78.29 0 148.15 31.5Q694-784 745-726v-68q0-22 14.8-37.5t37.7-15.5q22.9 0 38.2 15.5Q851-816 851-794v229q0 27.6-20.2 47.8Q810.6-497 783-497H552q-21.57 0-36.79-15.58Q500-528.16 500-550.28q0-21.69 15.5-36.71Q531-602 553-602h117q-33-50-83.9-78.5Q535.2-709 476-709q-96 0-163.5 66.92Q245-575.17 245-479q0 96.33 67.5 163.17Q380-249 476-249q56 0 104.61-25.81Q629.22-300.63 662-346q15.62-22.16 41.81-30.58Q730-385 754.74-375q26.26 10 37.76 32.5Q804-320 792-298q-48 84-132.19 134.5T476.28-113Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <!---->
            <!---->
            <div class="flex flex-col gap-5 pt-[2rem] mt-[46px] mb-[1.7rem] container mx-auto py-10 px-4">
                <div class="flex flex-col container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                    <div id="sync-appearance" class="flex flex-row justify-between container mx-auto cursor-pointer">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex flex-col items-center">
                                <h1 class="text-[20px] font-bold">Sync to System Appearance</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input option="sync-appearance" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] ${hlp.gettheme("theme-toggle")} rounded-full p-1">
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
                        <a id="grades" class="cursor-pointer flex justify-center items-center py-3 w-full">
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
                 * Navbar
                 */
                case "go-back": {
                    await site.runtime("settings");
                    break;
                }

                /**
                 * Navigation
                 */
                case "calendar": {
                    await site.runtime("calendar");
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
                case "settings": {
                    await site.runtime("settings");
                    break;
                }
            }
        });

        let theme = hlp.get("theme");
        if (hlp.theme.exists && hlp.theme.sync) {
            $("#sync-appearance input").prop("checked", hlp.theme.sync);
            $("#sync-appearance").find("label div div").removeClass("translate-x-0").addClass("translate-x-full").parent().removeClass(`${hlp.gettheme("theme-toggle")}`).addClass(`${hlp.gettheme("bg", "700")}`);
        }

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
            if ($(this).find("input").prop("checked")) {
                theme.sync = true;
                theme.theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";

                if (theme.theme == "light") {
                    $("body").removeClass("bg-white").removeClass("bg-black");
                    $("body").removeClass("text-white").removeClass("text-black");
                    $("body").addClass("bg-white");
                    $("body").addClass("text-black");
                } else {
                    $("body").removeClass("bg-white").removeClass("bg-black");
                    $("body").removeClass("text-white").removeClass("text-black");
                    $("body").addClass("bg-black");
                    $("body").addClass("text-white");
                }

                site.runtime("theme-color");
            } else {
                $(this).find("label div div").removeClass("translate-x-full").addClass("translate-x-0 duration-300 ease-in-out").parent().removeClass(`${hlp.gettheme("bg", "700")}`).addClass(`${hlp.gettheme("theme-toggle")}`);
                theme.sync = false;
            }
            
            hlp.set("theme", theme);
            content(theme);
        })

        async function content(theme) {
            let html = "";
            if (theme.sync) {
                html = `
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
                                    <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                    <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                    <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative overflow-hidden flex flex-col container mx-auto rounded-xl cursor-pointer">
                        <div id="theme-brown" class="flex flex-col">
                            <div class="bg-orange-900 w-full py-2 px-3 pointer-events-none">
                                <span class="font-bold text-white">Rust</span>
                            </div>
                            <div class="flex flex-row pointer-events-none gap-5 px-3 py-3" style="background-image: -webkit-linear-gradient(-30deg, rgb(228, 228, 231) 50%, rgb(15, 15, 15) 50%);">
                                <div class="flex flex-1 gap-1 flex-col justify-between">
                                    <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                    <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                </div>
                                <div class="flex items-center invisible">
                                    <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                    <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                    <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                    <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                    <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative overflow-hidden flex flex-col container mx-auto rounded-xl cursor-pointer">
                        <div id="theme-pink" class="flex flex-col">
                            <div class="bg-pink-600 w-full py-2 px-3 pointer-events-none">
                                <span class="font-bold text-white">Hot Pink</span>
                            </div>
                            <div class="flex flex-row gap-5 pointer-events-none px-3 py-3" style="background-image: -webkit-linear-gradient(-30deg, rgb(228, 228, 231) 50%, rgb(15, 15, 15) 50%);">
                                <div class="flex flex-1 gap-1 flex-col justify-between">
                                    <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                    <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                </div>
                                <div class="flex items-center invisible">
                                    <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                    <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                html = `
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row gap-5">
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-brown-light" class="flex flex-col flex-1">
                                <div class="bg-orange-900 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Rust Light</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(228, 228, 231);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-brown-dark" class="flex flex-col flex-1">
                                <div class="bg-orange-900 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Rust Dark</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(15, 15, 15);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row gap-5">
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-pink-light" class="flex flex-col flex-1">
                                <div class="bg-pink-600 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Hot Pink Light</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(228, 228, 231);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative overflow-hidden container mx-auto cursor-pointer">
                            <div id="theme-pink-dark" class="flex flex-col flex-1">
                                <div class="bg-pink-600 w-full py-2 px-3 rounded-t-xl pointer-events-none">
                                    <span class="font-bold text-white">Hot Pink Dark</span>
                                </div>
                                <div class="flex flex-row gap-5 px-3 py-3 rounded-b-xl pointer-events-none" style="background: rgb(15, 15, 15);">
                                    <div class="flex flex-1 gap-1 flex-col justify-between">
                                        <div class="bg-zinc-700 p-1 w-[80%] rounded-full"></div>
                                        <div class="bg-zinc-700 p-1 w-[50%] rounded-full"></div>
                                    </div>
                                    <div class="flex items-center invisible">
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
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
                                        <div flex-2 class="rounded-full z-20 relative overflow-hidden">
                                        <div class="bg-white rounded-full absolute inset-2" style="z-index: -1;"></div>
                                        <svg class="w-8 h-full z-20 flex justify-center items-center" viewBox="-14 -1000 1000 1000">    
                                            <path class="${hlp.gettheme("fill", "700")}" d="m421-449-57-57q-18.8-19-45.4-19-26.6 0-45.6 18.5T254.5-461q.5 27 19.5 45l99 99q20.18 21 48.09 21Q449-296 469-317l213-212q19-18.8 19-44.9 0-26.1-18.84-45.1t-45.5-19Q610-638 591-619L421-449Zm59 415q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Z"/>
                                        </svg>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            await $("#themes").off().empty().append(html).click(async function (e) {
                if ($(e.target).attr("id").includes("theme-")) {
                    theme.color = $(e.target).attr("id").split("-")[1];
                    theme.theme = $(e.target).attr("id").split("-")[2];
                    
                    if (theme.theme == "light") {
                        await $("body").removeClass("bg-white").removeClass("bg-black");
                        await $("body").removeClass("text-white").removeClass("text-black");
                        await $("body").addClass("bg-white");
                        await $("body").addClass("text-black");
                    } else {
                        await $("body").removeClass("bg-white").removeClass("bg-black");
                        await $("body").removeClass("text-white").removeClass("text-black");
                        await $("body").addClass("bg-black");
                        await $("body").addClass("text-white");
                    }
                    
                    hlp.set("theme", theme);
                    await site.runtime("theme-color");
                }

                await $(`#theme-${theme.color}-${theme.theme} .flex-row .invisible`).addClass("visible").removeClass("invisible")
               await  $(`#theme-${theme.color} .flex-row .invisible`).addClass("visible").removeClass("invisible")
            })

            await $(`#theme-${theme.color}-${theme.theme} .flex-row .invisible`).addClass("visible").removeClass("invisible")
            await $(`#theme-${theme.color} .flex-row .invisible`).addClass("visible").removeClass("invisible")
        }

        await content(theme);
    })
}