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
                        <span class="flex-grow font-bold text-center text-[22px]">Hide Courses</span>
                        <div id="reload" class="-mr-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
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
                <div id="hide-courses" class="flex flex-col gap-5">
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
                ////////////////////////////////////////////////////////////
                ///////// MAIN CONTROLS

                case "go-back": {
                    history.pushState({}, "", `?page=settings`);
                    await site.runtime("settings");
                    break;
                }

                case "reload": {
                    hlp.load(async function () {
                        await call();
                    });
                    break;
                }


                ////////////////////////////////////////////////////////////
                ///////// BOTTOM NAVIGATION CONTROLS

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


        async function call() {
            let order = await $.ajax({
                url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&entityid=${hlp.session.id}&path=Assets%2FBuzzCourseCardSettings.json`),
                method: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            });

            let courses = await $.ajax({
                url: hlp.api(`/cmd/listuserenrollments?_token=${hlp.session.token}&userid=${hlp.session.id}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                method: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            });

            let course_list = [];
            if (order.length == 0) {
                $.each(courses.response.enrollments.enrollment, function (i, course) {
                    course_list.push({
                        id: course.id,
                        courseid: course.courseid,
                        title: course.course.title.trim(),
                    })
                })
            } else {
                try {
                    $.each(courses.response.enrollments.enrollment, function (i, course) {
                        course_list.push({
                            order: order[course.id].order,
                            id: course.id,
                            courseid: course.courseid,
                            title: course.course.title.trim(),
                        })
                    })
                    course_list = course_list.sort((first, last) => first.order - last.order);
                } catch (e) {}
            }
            $("#hide-courses").empty();
            $.each(course_list, function (i, course) {
                $("#hide-courses").append(`
                    <div id="hide" class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                        <div class="flex flex-row justify-between container mx-auto cursor-pointer">
                            <div class="flex flex-row justify-center items-center pointer-events-none">
                                <div class="flex flex-col">
                                    <h1 class="text-[22px] w-[13ch] x-sm:w-[20ch] sm:w-[30ch] md:w-[40ch] lg:w-full truncate font-bold">${course.title}</h1>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <input hide="${course.courseid}" type="checkbox" class="hidden">
                                <label class="flex items-center cursor-pointer">
                                    <span class="material-symbols-rounded">
                                        visibility
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                `);
            })

            let hidden = hlp.get("hidden");

            await $.each(hidden, (i, hide) => {
                if (hide.$hidden) {
                    $(`input[hide="${hide.course}"]`).prop("checked", hide.$hidden);
                    $(`input[hide="${hide.course}"]`).parent().find("label span").html("visibility_off");
                }
            })

            $("#root #hide:has(input)").on("click", function() {
                if ($(this).find("input").prop("checked"))
                    $(this).find("input").prop("checked", "")
                else
                    $(this).find("input").prop("checked", "true")


                if ($(this).find("input").prop("checked")) {
                    $(this).find("label span").html("visibility_off");
                } else {
                    $(this).find("label span").html("visibility");
                }
                
                if (!hlp.string(hidden).includes($(this).find("input").attr("hide"))) {
                    hidden.push({
                        course: $(this).find("input").attr("hide"),
                        $hidden:  $(this).find("input").prop("checked")
                    })
    
                    hlp.set("hidden", hidden);
                } else {
                    hidden.find(name => name.course.includes($(this).find("input").attr("hide"))).$hidden = $(this).find("input").prop("checked")
                    hlp.set("hidden", hidden);
                }
            });
        }

        hlp.animate_nav();
        await call();
    });
}