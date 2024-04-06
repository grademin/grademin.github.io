export async function run() {
    const hlp = await import("../../helpers.js"),
          site = await import("../../site.js");

    hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="bg-blue-700">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row bg-blue-700">
                    <div class="flex justify-center items-center container mx-auto py-2 px-4">
                        <div id="go-back" class="-ml-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
                            <span class="w-0 -ml-[1px] font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                arrow_back_ios_new
                            </span>
                        </div>
                        <span class="flex-grow font-bold text-center text-[22px]">Courses</span>
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
                <div id="courses" class="flex flex-col gap-5"></div>
            </div>
            <!---->
            <!---->
            <div id="bottom" class="fixed bottom-0 left-0 right-0">
                <div class="bg-zinc-800">
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
                ///////// MAIN CONTROLS

                case "semi-back": {
                    break;
                }

                case "go-back": {
                    history.pushState({}, "", `?page=overview`);
                    await site.runtime("overview");
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

        hlp.swiped_down(async function () {
            hlp.load(async function () {
                await call();
            });
        })

        hlp.swiped(async function () {
            history.pushState({}, "", `?page=overview`);
            await site.runtime("overview");
        })


        ////////////////////////////////////////////////////////////


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
            $.each(courses.response.enrollments.enrollment, function (i, course) {
                course_list.push({
                    order: order[course.id].order,
                    id: course.id,
                    courseid: course.courseid,
                    title: course.course.title.trim(),
                    start: new Date(course.course.startdate).toLocaleDateString(undefined, {month: "long", year: "numeric", day: "numeric" }),
                    end: new Date(course.course.enddate).toLocaleDateString(undefined, {month: "long", year: "numeric", day: "numeric"}),
                    score: Math.round((course.enrollmentmetrics.achieved / course.enrollmentmetrics.possible) * 100)
                })
            })

            course_list = course_list.sort((first, last) => first.order - last.order);
            $("#courses").empty();
            $.each(course_list, function (i, course) {
                $("#courses").append(`
                <div uid="${course.id}" courseid="${course.courseid}" class="relative overflow-hidden flex flex-row justify-between container mx-auto bg-zinc-800 rounded-xl cursor-pointer py-3 px-3">
                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none">
                        <div class="flex justify-center items-center bg-${hlp.score_to_color(course.score)}-500 px-4 py-3 rounded-2xl">
                            <span class="text-1xl font-bold py-2 px-2 w-max flex justify-center">
                            ${isNaN(course.score) ? "N/A" : `${course.score}`}
                            </span>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="text-[22px] w-[15ch] x-sm:w-[20ch] sm:w-[30ch] md:w-[40ch] lg:w-full truncate font-bold">${course.title}</h1>
                            <span class="font-bold text-[13px] sm:text-[15px] text-zinc-400">${course.start} - ${course.end}</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center pl-5">
                        <span class="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
                `).children().off().on("click", function (event) {
                    //TODO:
                    //console.log(event.target)
                })
            })
        }

        await call();
    })
}