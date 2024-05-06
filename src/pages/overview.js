export async function run() {
    const hlp = await import("../helpers.js");
    const site = await import("../site.js");

    await hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="${hlp.gettheme("bg", "700")} text-white">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row ${hlp.gettheme("bg", "700")}">
                    <div id="scrolled-title" class="flex justify-center items-center container mx-auto py-2 px-4 h-[60px]">
                        <div></div>
                        <span class="flex-grow font-bold text-center text-[22px] hidden">Overview</span>
                        <div></div>
                    </div>
                </div>
                <div class="flex flex-row gap-10 justify-between container mx-auto pt-16 pb-5 px-4">
                    <div class="flex flex-col justify-center">
                        <h1 class="text-5xl sm:text-7xl font-bold pb-0 -m-[2px] mb-0">Overview</h1>
                        <div class="text-[18px] sm:text-[22px] font-bold">${new Date().toLocaleString("default", { month: "long" })} ${new Date().getDate()}, ${new Date().getFullYear()}</div>    
                    </div>
                    <div class="flex justify-between items-end cursor-pointer">
                        <div id="settings" class="rounded-full transition ${hlp.gettheme("bg", "600")} ${!hlp.get("pfp").includes("data:") ? "" : `bg-[url('${hlp.get("pfp")}')] bg-cover bg-no-repeat bg-center`} border-[6px] hover:${hlp.gettheme("border", "400")} ${hlp.gettheme("border", "500")} h-[4.5rem] w-[4.5rem] sm:h-[6rem] sm:w-[6rem] flex items-center justify-center text-2xl font-bold uppercase">
                            <span class="text-[20px] pointer-events-none sm:text-[30px]">${!hlp.get("pfp").includes("data:") ? hlp.session.fullname.charAt(0).toUpperCase() : ""}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!---->
            <!---->
            <div class="flex flex-col gap-5 pt-[1.1rem] mb-[1.8rem] container mx-auto py-10 px-4">
                <div id="what-is-this" class="flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl gap-5 cursor-pointer py-5 px-3 border-4 ${hlp.gettheme("border", "700")}">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex w-[61px] justify-center items-center ${hlp.gettheme("bg", "700")} px-[15px] py-[15px] rounded-2xl">
                            <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                <path class="fill-white" d="M474.86-232q26.62 0 45.88-18.86T540-296.34q0-26.62-19.12-45.14T475.14-360q-26.62 0-45.88 18.38t-19.26 45Q410-270 429.12-251q19.12 19 45.74 19ZM480-34q-92.64 0-174.47-34.6-81.82-34.61-142.07-94.86T68.6-305.53Q34-387.36 34-480q0-92.9 34.66-174.45 34.67-81.55 95.18-141.94 60.51-60.39 142.07-95Q387.48-926 480-926q92.89 0 174.48 34.59 81.59 34.6 141.96 94.97 60.37 60.37 94.97 141.99Q926-572.83 926-479.92q0 92.92-34.61 174.25-34.61 81.32-95 141.83Q736-103.33 654.45-68.66 572.9-34 480-34Zm1.1-599q16.84 0 28.87 10.93Q522-611.14 522-594.52q0 17.52-10 31.02T489-539q-24 21-43.5 46.27Q426-467.46 426-436q0 19.09 14.73 32.05Q455.46-391 475.1-391q20.98 0 35.94-13.5Q526-418 533-438q7-17 17.64-31.03Q561.27-483.06 574-495q23-22 38-50.15t15-58.49q0-56.36-42-91.86T486.62-731q-43.64 0-81.13 19-37.49 19-61.33 54.07Q334-642 337.97-623.51q3.97 18.48 19.67 29.31Q377-583 398.5-588q21.5-5 36.5-22 9-10 20.7-16.5 11.71-6.5 25.4-6.5Z"/>
                            </svg>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">What is Gradpass?</h1>
                            <span class="font-bold text-[15px] text-zinc-400">About this app and it's purpose</span>
                        </div>
                    </div>
                    <div class="flex w-6 justify-center items-center pointer-events-none">
                        <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                            <path class="${hlp.gettheme("theme-fill")}" d="M542-480 265-758q-23-22-23-54t22-55q23-22 55.5-22t54.5 22l292 291q20 20 29.5 44.5T705-480q0 26-9.5 50.5T666-384L374-93q-22 22-54 21.5T265-94q-22-22-22-54.5t22-54.5l277-277Z"/>
                        </svg>
                    </div>
                </div>
                <div id="courses" class="relative relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl gap-5 cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex w-[61px] justify-center items-center ${hlp.gettheme("bg", "700")} px-[15px] py-[15px] rounded-2xl">
                            <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                <path class="fill-white" d="M210-76q-57.37 0-96.69-40.01Q74-156.02 74-212v-540q0-55.97 39.31-95.99Q152.63-888 210-888h125q24-38 62-59.5t83-21.5q45 0 83 21.5t62 59.5h125q57.38 0 96.69 40.01Q886-807.97 886-752v540q0 55.98-39.31 95.99T750-76H210Zm121-209h186q18.6 0 31.8-13.28t13.2-32Q562-349 548.8-362T517-375H331q-18.6 0-31.8 13.08t-13.2 31.5q0 18.42 13.2 31.92T331-285Zm0-152h298q18.6 0 31.8-13.2T674-482q0-18.6-13.2-31.8T629-527H331q-18.6 0-31.8 13.2T286-482q0 18.6 13.2 31.8T331-437Zm0-151h298q18.6 0 31.8-13.28t13.2-32Q674-652 660.8-665T629-678H331q-18.6 0-31.8 13.08t-13.2 31.5q0 18.42 13.2 31.92T331-588Zm149-200q16.47 0 27.23-10.77Q518-809.53 518-826t-10.77-27.23Q496.47-864 480-864t-27.23 10.77Q442-842.47 442-826t10.77 27.23Q463.53-788 480-788Z"/>
                            </svg>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Courses</h1>
                            <span class="font-bold text-[15px] text-zinc-400">View your current courses</span>
                        </div>
                    </div>
                    <div class="flex w-6 justify-center items-center pointer-events-none">
                        <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                            <path class="${hlp.gettheme("theme-fill")}" d="M542-480 265-758q-23-22-23-54t22-55q23-22 55.5-22t54.5 22l292 291q20 20 29.5 44.5T705-480q0 26-9.5 50.5T666-384L374-93q-22 22-54 21.5T265-94q-22-22-22-54.5t22-54.5l277-277Z"/>
                        </svg>
                    </div>
                </div>
                <div id="todo-list" class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl gap-5 cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex w-[61px] justify-center items-center ${hlp.gettheme("bg", "700")} px-[15px] py-[15px] rounded-2xl">
                            <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                <path class="fill-white" d="M250-34q-55.73 0-95.86-39.64Q114-113.28 114-170v-620q0-56.72 40.14-96.36Q194.27-926 250-926h263q27.43 0 52.35 10.09Q590.27-905.83 609-886l196 195q19.83 19.73 30.41 44.65Q846-621.43 846-594v424q0 56.72-40.14 96.36T710-34H250Zm249-614q0 29 19.5 48.5T567-580h143L499-790v142Zm-61 273-48-49q-8-8-18-11.5t-19.84-3.5q-9.85 0-19.69 3.95-9.84 3.94-17.72 11.84-15.75 14.79-15.75 37T315-348l75 74q8.93 10.18 22.18 15.59T438-253q12.57 0 25.82-5.41T486-274l160-160q16-16 16-37.5T646-508q-15-16-36.5-16T572-508L438-375Z"/>
                            </svg>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Todo List</h1>
                            <span class="font-bold text-[15px] text-zinc-400">View due or past due work</span>
                        </div>
                    </div>
                    <div class="flex w-6 justify-center items-center pointer-events-none">
                        <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                            <path class="${hlp.gettheme("theme-fill")}" d="M542-480 265-758q-23-22-23-54t22-55q23-22 55.5-22t54.5 22l292 291q20 20 29.5 44.5T705-480q0 26-9.5 50.5T666-384L374-93q-22 22-54 21.5T265-94q-22-22-22-54.5t22-54.5l277-277Z"/>
                        </svg>
                    </div>
                </div>
                <div id="activity-stream" class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl gap-5 cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex w-[61px] justify-center items-center ${hlp.gettheme("bg", "700")} px-[15px] py-[15px] rounded-2xl">
                            <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                <path class="fill-white" d="M-14-245q0-46 23.5-84.5T72-387q67-34 137.5-51T352-455q74 0 144.5 17T632-388q40 19 63 57t23 86v23q0 58-39.5 97T582-86H122q-57 0-96.5-39T-14-222v-23ZM751-86q23-29 35-63.5t12-72.5v-20q0-51-24.5-110.5T685-453q51 6 103.5 24.5T884-388q43 21 66.5 58.5T974-249v27q0 58-39.5 97T838-86h-87ZM352-500q-79 0-133.5-54.5T164-687q0-79 54.5-133.5T352-875q78 0 133 54.5T540-687q0 78-55 132.5T352-500Zm481-187q0 77-55 132t-132 55q-14 0-33-3t-36-9q30-37 45-82t15-93q0-48-15-93.5T577-863q17-7 34-9.5t35-2.5q77 0 132 55t55 133Z"/>
                            </svg>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Activity Stream</h1>
                            <span class="font-bold text-[15px] text-zinc-400">View all recent activities</span>
                        </div>
                    </div>
                    <div class="flex w-6 justify-center items-center pointer-events-none">
                        <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                            <path class="${hlp.gettheme("theme-fill")}" d="M542-480 265-758q-23-22-23-54t22-55q23-22 55.5-22t54.5 22l292 291q20 20 29.5 44.5T705-480q0 26-9.5 50.5T666-384L374-93q-22 22-54 21.5T265-94q-22-22-22-54.5t22-54.5l277-277Z"/>
                        </svg>
                    </div>
                </div>
                <div id="announcements" class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl gap-5 cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex w-[61px] justify-center items-center ${hlp.gettheme("bg", "700")} px-[15px] py-[15px] rounded-2xl">
                            <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                <path class="fill-white" d="m204-200-54 54q-32 32-74 15.03T34-194v-601q0-57.13 39.44-96.56Q112.88-931 170-931h620q57.13 0 96.56 39.44Q926-852.13 926-795v459q0 57.12-39.44 96.56Q847.13-200 790-200H204Zm276.21-159q25.17 0 41.98-17.32Q539-393.65 539-418.82q0-25.18-16.82-41.68T480.49-477q-24.86 0-42.18 16.14Q421-444.73 421-419.18q0 25.18 17.02 42.68 17.03 17.5 42.19 17.5ZM480-524q22 0 37.5-14.8T533-576v-143q0-22-15.5-37.5T480-772q-22 0-37.5 14.8T427-719v143q0 21.58 15.5 36.79T480-524Z"/>
                            </svg>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Announcements</h1>
                            <span class="font-bold text-[15px] text-zinc-400">View current announcements</span>
                        </div>
                    </div>
                    <div class="flex w-6 justify-center items-center pointer-events-none">
                        <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                            <path class="${hlp.gettheme("theme-fill")}" d="M542-480 265-758q-23-22-23-54t22-55q23-22 55.5-22t54.5 22l292 291q20 20 29.5 44.5T705-480q0 26-9.5 50.5T666-384L374-93q-22 22-54 21.5T265-94q-22-22-22-54.5t22-54.5l277-277Z"/>
                        </svg>
                    </div>
                </div>
                <div id="contact" class="relative flex flex-row justify-between container mx-auto ${hlp.gettheme("theme-card")} rounded-xl gap-5 cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex w-[61px] justify-center items-center ${hlp.gettheme("bg", "700")} px-[15px] py-[15px] rounded-2xl">
                            <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                <path class="fill-white" d="M479-34q-91.16 0-172.74-35.02-81.58-35.02-141.9-95.34-60.32-60.32-95.34-141.74Q34-387.53 34-480.08q0-92.56 35.02-173.9t95.34-141.66q60.32-60.32 141.74-95.34Q387.53-926 480.08-926q92.56 0 173.9 35.02t141.66 95.34q60.32 60.32 95.34 141.9Q926-572.16 926-481v64q0 67.65-49.84 115.32Q826.32-254 756-254q-39.25 0-73.12-15.5Q649-285 626-315q-27 32-65.26 46.5Q522.48-254 480-254q-93.62 0-159.81-66.19T254-480q0-93.62 66.19-159.81T480-706q93.62 0 159.81 66.19T706-480v55q0 21.48 15 36.24Q736-374 756.98-374q19.97 0 34-14.76Q805-403.52 805-425v-56q0-135-95-229.5T480-805q-135 0-230 95t-95 230q0 135 94.5 230T479-155h143q25.38 0 42.69 17.31T682-95q0 26-17.31 43.5T622-34H479Zm1.29-340Q524-374 555-405.29q31-31.3 31-75Q586-524 554.71-555q-31.3-31-75-31Q436-586 405-554.71q-31 31.3-31 75Q374-436 405.29-405q31.3 31 75 31Z"/>
                            </svg>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] font-bold">Contact Teachers</h1>
                            <span class="font-bold text-[15px] text-zinc-400">Email your teachers</span>
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
            <!---->
            <div id="bottom" class="fixed bottom-0 left-0 right-0">
                <div class="${hlp.gettheme("theme-card")}">
                    <div class="flex flex-row justify-between items-center">
                        <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="w-8 font-black pointer-events-none">
                                <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                    <path class="${hlp.gettheme("fill", "700")}" d="M117-212v-341q0-33 14-61.5t40-47.5l227-171q37-27 82-27t82 27l227 171q26 19 40 47.5t14 61.5v341q0 57-39.5 96.5T707-76h-67q-29 0-48.5-20T572-144v-196q0-28-20-48t-48-20h-48q-28 0-48 20t-20 48v196q0 28-19.5 48T320-76h-67q-57 0-96.5-39.5T117-212Z"/>
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
                                        <h2 class="text-2xl font-bold text-center">About Gradpass</h2>
                                    </div>
                                    <div>
                                        <p>This app was created to show that <b>Echo Viewer</b> could have been designed better. Since it's not gonna stick around for long where I go to school, I've decided to make it's design based off <b>GradeWay</b> by <b>Srujan Mupparapu</b>. This app is not attempting to copy GradeWay in it's entirety, only design. If something is conflicting with this, please email me <a class="${hlp.gettheme("text", "700")} hover:${hlp.gettheme("text", "600")} cursor-pointer transition" goto="mailto:Gradpass.official@gmail.com">here</a> and I will happily reply back.</p>
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
        
        /**
         * Show notification chips that indicate something new has happened.
         */
        if (hlp.settings.exists && hlp.settings.chip_indicators) {
            // Show a chip with a number representing the latest unviewed announcements.
            await hlp.prevent_errors(async function () {
                let communications = await $.ajax({
                    url: hlp.api(`/cmd/getuserannouncementlist?_token=${hlp.session.token}&userid=${hlp.session.id}&daysactivepastend=14`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                })

                let unviewed = 0;
                await $.each(communications.response.announcements.announcement, function (i, communication) {
                    if (!communication.viewed) {
                        unviewed++;
                    }
                })
                
                // Append the total unviewed to the item.
                if (unviewed != 0) {
                    await $("#announcements").append(`
                        <div class="absolute ${hlp.gettheme("theme-shadow")} text-white inline-flex right-0 top-0 h-8 w-8 -m-2 rounded-full ${hlp.gettheme("bg", "700")} justify-center items-center">
                            <span>${unviewed}</span>
                        </div> 
                    `);
                }
            }, false)

            // Show a chip with a number representing the latest unviewed todos.
            await hlp.prevent_errors(async function () {
                let due = await $.ajax({
                    url: hlp.api(`/cmd/getduesoonlist?_token=${hlp.session.token}&days=3&userId=${hlp.session.id}&utcoffset=300`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                })

                // If a course is hidden, obviosuly don't show that in the chip.
                let hid = 0;
                $.each(due.response.items.item, function (i, due) {
                    hlp.prevent_errors(async function () {
                        let courses = hlp.get("courses");
                        if (courses.find(option => option.entityid.includes(due.entity.id)).$value)
                            hid++
                    }, false);
                })

                // Append the total unviewed to the item.
                if (due.response.items.item.length != 0 && (due.response.items.item.length - hid) != 0) {
                    await $("#todo-list").append(`
                        <div class="absolute ${hlp.gettheme("theme-shadow")} text-white inline-flex right-0 top-0 h-8 w-8 -m-2 rounded-full ${hlp.gettheme("bg", "700")} justify-center items-center">
                            <span>${due.response.items.item.length - hid}</span>
                        </div> 
                    `)
                }
            }, false)

            // Show a chip with a number representing the latest unviewed activities.
            await hlp.prevent_errors(async function () {
                let codes = "200|201|301|400|401|500|501|601|803";
                if (hlp.settings.exists && hlp.settings.include_self) {
                    codes = "100|200|201|300|301|400|401|500|501|600|601|803";
                }

                let activities = await $.ajax({
                    url: hlp.api(`/cmd/getuseractivitystream?_token=${hlp.session.token}&userid=${hlp.session.id}&types=${codes}`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                })
                        
                let config = await $.ajax({
                    url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&entityid=${hlp.session.id}&path=Assets/BuzzTheme.json`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                })

                if (hlp.get("activities") == "") {
                    hlp.set("activities", {
                        data: {
                            items: [],
                            $unviewed: 0
                        }
                    })
                }

                let items = hlp.get("activities");
                let unviewed = 0;
                await $.each(activities.response.activities.activity, (i, activity) => {
                    if (new Date(activity.date) >= new Date(config.ActivityStreamLastRead)) {
                        if (!items.data.items.find(name => name.item.includes(activity.data.item.title))) {
                            unviewed++;
                            items.data.$unviewed = unviewed;
                            items.data.items.push({
                                item: activity.data.item.title,
                            });
                            
                            hlp.set("activities", items);
                        }
                    }
                })

                if (hlp.get("activities").data.$unviewed != 0) {
                    await $("#activity-stream").append(`
                        <div class="absolute ${hlp.gettheme("theme-shadow")} text-white inline-flex right-0 top-0 h-8 w-8 -m-2 rounded-full ${hlp.gettheme("bg", "700")} justify-center items-center">
                            <span>${hlp.get("activities").data.$unviewed}</span>
                        </div> 
                    `)
                }
            }, false)
        }
    });
}