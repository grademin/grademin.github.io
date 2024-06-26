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
                        <span class="flex-grow font-bold text-center text-[22px]">Hide Courses</span>
                        <div id="reload" class="-mr-2 flex-2 cursor-pointer py-3 pl-4 pr-2 rounded-full">
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
                <div id="hide-courses" class="flex flex-col gap-5"></div>
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
                case "reload": {
                    $("#hide-courses").empty();
                    await hlp.load(async function () {
                        await call();
                    });
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

        async function call() {
            let order = [];
            let courses = [];

            await hlp.prevent_errors(async function () {
                order = await $.ajax({
                    url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&entityid=${hlp.session.id}&path=Assets%2FBuzzCourseCardSettings.json`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });

                if (order.response.code != "OK") {
                    order = [];
                    throw new Error("Order couldn't be found!");
                }
            }, false);

            await hlp.prevent_errors(async function () {
                courses = await $.ajax({
                    url: hlp.api(`/cmd/listuserenrollments?_token=${hlp.session.token}&userid=${hlp.session.id}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });

                if (courses.response.code != "OK") {
                    courses = [];
                    throw new Error("No courses were found!");
                }
            }, false)

            let course_list = [];
            if (courses.length != 0) {
                $.each(courses.response.enrollments.enrollment, function (i, course) {
                    course_list.push({
                        order: order.length == 0 ? undefined : order[course.id].order,
                        id: course.id,
                        courseid: course.courseid,
                        title: course.course.title.trim(),
                    })
                })
            }

            if (course_list.length != 0) {
                course_list = course_list.sort((first, last) => first.order - last.order);
                
                $.each(course_list, function (i, course) {
                    $("#hide-courses").append(`
                        <div id="hide-${course.courseid}" class="flex flex-col container mx-auto ${hlp.gettheme("theme-card")} rounded-xl">
                            <div class="flex flex-row justify-between container mx-auto cursor-pointer py-3 px-3">
                                <div class="flex flex-row justify-center items-center pointer-events-none">
                                    <div class="flex flex-col">
                                        <h1 class="text-[22px] w-[7ch] lg-sm:w-[17ch] xl-sm:w-[23ch] 1xl-sm:w-[27ch] md:w-[40ch] lg:w-full truncate font-bold">${course.title}</h1>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center">
                                    <input option="${course.courseid}" type="checkbox" class="hidden">
                                    <label class="flex items-center cursor-pointer w-6">
                                        <svg class="w-full h-full flex justify-center items-center" viewBox="-14 -1000 1000 1000">
                                            <path class="${hlp.gettheme("theme-fill")}" d="M480.18-311Q559-311 614-366.18q55-55.17 55-134Q669-579 613.82-634q-55.17-55-134-55Q401-689 346-633.82q-55 55.17-55 134Q291-421 346.18-366q55.17 55 134 55Zm-.12-101q-36.64 0-62.35-25.65T392-499.94q0-36.64 25.65-62.35T479.94-588q36.64 0 62.35 25.65T568-500.06q0 36.64-25.65 62.35T480.06-412ZM480-157q-144 0-264.5-76T29-437q-8-15-12-30.96t-4-31.96q0-16.01 4-32.05Q21-548 29-563q66-128 186.5-204T480-843q144 0 264.5 76T931-563q8 15 12 30.96t4 31.96q0 16.01-4 32.05Q939-452 931-437q-66 128-186.5 204T480-157Z"/>
                                        </svg>
                                    </label>
                                </div>
                            </div>
                        </div>
                    `);
                })
            } else {
                $("#hide-courses").append(`
                    <div id="error" class="flex flex-col container mx-auto ${hlp.gettheme("theme-card")} rounded-xl py-3 px-3">
                        <div class="flex flex-row justify-between container mx-auto cursor-pointer">
                            <div class="flex flex-row justify-center items-center pointer-events-none w-full">
                                <div class="flex flex-col justify-center items-center">
                                    <h1 class="text-[18px] font-bold">No courses were found.</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            }

            // Set options to there current set values.
            let hidden_courses = hlp.get("hidden");
            await $.each(hidden_courses, (i, option) => {
                if (option.$value) {
                    $(`input[option="${option.courseid}"]`).prop("checked", option.$value);
                    $(`input[option="${option.courseid}"]`).parent().find("label svg path").attr("d", "M747-64 628-181q-35 13-72.5 18.5T480-157q-144 0-264.5-76T28-437q-8-15-11.5-30.5T13-500q0-17 3.5-32.5T27-563q18-35 40.5-67t50.5-61l-70-71q-15-15-15.5-36T48-835q15-15 36.5-15t36.5 15l699 699q15 15 15 36t-15 36q-16 15-37 15t-36-15ZM480-311q5 0 9.5-.5T500-313L291-520v20q0 79 55 134t134 55Zm0-532q144 0 265 77t188 205q8 15 11.5 30t3.5 31q0 16-3.5 31.5T934-438q-13 27-30 53t-36 49q-21 24-53 23.5T759-336l-76-77q-12-11-15.5-27t-.5-32q1-7 1.5-14t.5-14q0-79-55-134t-134-55q-7 0-14 .5t-14 1.5q-16 3-31.5-.5T393-703l-12-12q-32-32-20.5-74t53.5-50q17-2 33.5-3t32.5-1Zm61 274 3.5 3.5q1.5 1.5 2.5 4.5t-2.5 5q-3.5 2-6.5-1l-8-8q-3-3-1-6.5t6-2.5q2 1 3.5 2t2.5 3Z")
                }
            })

            // Manage when a user clicks on an option.
            await $("#root #hide-courses div[id]:has(input[option])").off().click(async function () {
                // Determine if the actual value of the input is checked or not.
                if ($(this).find("input").prop("checked")) {
                    $(this).find("input").prop("checked", "");
                } else {
                    $(this).find("input").prop("checked", "true");
                }

                // Visually show if it is checked or not.
                if ($(this).find("input").prop("checked")) {
                    $(this).find("label svg path").attr("d", "M747-64 628-181q-35 13-72.5 18.5T480-157q-144 0-264.5-76T28-437q-8-15-11.5-30.5T13-500q0-17 3.5-32.5T27-563q18-35 40.5-67t50.5-61l-70-71q-15-15-15.5-36T48-835q15-15 36.5-15t36.5 15l699 699q15 15 15 36t-15 36q-16 15-37 15t-36-15ZM480-311q5 0 9.5-.5T500-313L291-520v20q0 79 55 134t134 55Zm0-532q144 0 265 77t188 205q8 15 11.5 30t3.5 31q0 16-3.5 31.5T934-438q-13 27-30 53t-36 49q-21 24-53 23.5T759-336l-76-77q-12-11-15.5-27t-.5-32q1-7 1.5-14t.5-14q0-79-55-134t-134-55q-7 0-14 .5t-14 1.5q-16 3-31.5-.5T393-703l-12-12q-32-32-20.5-74t53.5-50q17-2 33.5-3t32.5-1Zm61 274 3.5 3.5q1.5 1.5 2.5 4.5t-2.5 5q-3.5 2-6.5-1l-8-8q-3-3-1-6.5t6-2.5q2 1 3.5 2t2.5 3Z")
                } else {
                    $(this).find("label svg path").attr("d", "M480.18-311Q559-311 614-366.18q55-55.17 55-134Q669-579 613.82-634q-55.17-55-134-55Q401-689 346-633.82q-55 55.17-55 134Q291-421 346.18-366q55.17 55 134 55Zm-.12-101q-36.64 0-62.35-25.65T392-499.94q0-36.64 25.65-62.35T479.94-588q36.64 0 62.35 25.65T568-500.06q0 36.64-25.65 62.35T480.06-412ZM480-157q-144 0-264.5-76T29-437q-8-15-12-30.96t-4-31.96q0-16.01 4-32.05Q21-548 29-563q66-128 186.5-204T480-843q144 0 264.5 76T931-563q8 15 12 30.96t4 31.96q0 16.01-4 32.05Q939-452 931-437q-66 128-186.5 204T480-157Z")
                }

                if (!hlp.stringify(hidden_courses).includes($(this).find("input").attr("option"))) {
                    hidden_courses.push({
                        courseid: $(this).find("input").attr("option"),
                        $value:  $(this).find("input").prop("checked")
                    })

                    hlp.set("hidden", hidden_courses);
                } else {
                    hidden_courses.find(name => name.courseid.includes($(this).find("input").attr("option"))).$value = $(this).find("input").prop("checked")
                    hlp.set("hidden", hidden_courses);
                }
            })
        }

        await call();
    })
}