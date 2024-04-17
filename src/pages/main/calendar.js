export async function run() {
    const hlp = await import("../../helpers.js"),
          site = await import("../../site.js");


    // TODO: clean
    // TODO: HELLA CLEAN THIS PLZ
    // TODO: add fix for forward event going to end of next month instead of beginning.
          
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
                        <span class="flex-grow font-bold text-center text-[22px]">Calendar</span>
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
            <div id="calendar-data" class="flex flex-col gap-5 pt-[2rem] mt-[46px] mb-[1.7rem] container mx-auto py-10 px-4">
                <div class="container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3 py-3">
                    <div class="flex flex-col gap-5">
                        <div class="flex justify-center items-center container mx-auto">
                            <div id="back" class="-ml-3 flex-2 cursor-pointer py-5 px-9 rounded-full">
                                <span class="w-0 font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                    arrow_back_ios_new
                                </span>
                            </div>
                            <span id="calendar-date" class="flex-grow flex-1 font-bold text-center text-[22px]">${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                            <div id="forward" class="-mr-3 flex-2 cursor-pointer py-5 px-9 rounded-full">
                                <span class="w-0 font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                    arrow_forward_ios
                                </span>
                            </div>
                        </div>
                        <div id="calendar" class="grid grid-cols-7 text-center">
                            <div class="font-bold text-1xl">su</div>
                            <div class="font-bold text-1xl">mo</div>
                            <div class="font-bold text-1xl">tu</div>
                            <div class="font-bold text-1xl">we</div>
                            <div class="font-bold text-1xl">th</div>
                            <div class="font-bold text-1xl">fr</div>
                            <div class="font-bold text-1xl">sa</div>
                        </div>
                    </div>
                </div>
                <div class="container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3 py-3">
                    <h2 class="text-[22px] font-bold ${hlp.theme("theme-text")} mb-5">Color Legend</h2>
                    <div class="flex flex-col gap-5">
                        <div class="flex flex-row gap-5">
                            <div class="rounded-lg flex-2 ${hlp.theme("bg", "300")} p-4 float-left"></div>
                            <span class="flex flex-1 items-center font-bold">Current Day</span>
                        </div>
                        <div class="flex flex-row gap-5">
                            <div class="rounded-lg flex-2 ${hlp.theme("bg", "700")} p-4 float-left"></div>
                            <span class="flex flex-1 items-center font-bold">Assignements Exist</span>
                        </div>
                    </div>
                </div>
                <div id="calendar-contents" class="container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3 py-3">
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
                            <span class="text-[30px] ${hlp.theme("text", "700")} font-black pointer-events-none material-symbols-rounded">
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



                case "overview": {
                    history.pushState({}, "", `?page=overview`);
                    await site.runtime("overview");
                    break;
                }

                case "settings": {
                    history.pushState({}, "", `?page=settings`);
                    await site.runtime("settings");
                    break;
                }
            }
        });

        async function call() {
            async function calendar(year, month) {
                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                const daysInPreviousMonth = new Date(year, month, 0).getDate();

                // Clear previous cells, except for the first 7 children (day headers)
                $('#calendar').find('div:gt(6)').remove();
            
                // Add empty cells at the start if the month does not start on Sunday
                for (let i = 0; i < firstDay; i++) {
                    let prevMonthDay = daysInPreviousMonth - firstDay + 1 + i;
                    await $('#calendar').append(`
                        <div class="text-center py-1 flex justify-center items-center font-bold text-zinc-400">
                            <span class="w-10 h-10 flex items-center justify-center">${prevMonthDay}</span>
                        </div>
                    `);
                }

                // Fill the calendar with the days of the current month
                for (let day = 1; day <= daysInMonth; day++) {
                    let date = new Date(year, month, day).toLocaleDateString('sv-SE');
                    await $('#calendar').append(`
                        <div id="${date}" class="text-center py-1 cursor-pointer flex justify-center items-center font-bold">
                            <span class="w-10 h-10 flex items-center justify-center">${day}</span>
                        </div>
                    `);
                }

                // Fill the remaining cells with days from the next month
                let daysAfter = 42 - firstDay - daysInMonth; // 42 cells - 6 weeks
                for (let i = 1; i <= daysAfter; i++) {
                    let date = new Date(year, month + 1, i).toLocaleDateString('sv-SE');
                    await $('#calendar').append(`
                        <div class="text-center py-1 flex justify-center items-center font-bold text-zinc-400">
                            <span class="w-10 h-10 flex items-center justify-center">${i}</span>
                        </div>
                    `);
                }
            }


            calendar(new Date().getFullYear(), new Date().getMonth());      

            let courses = await $.ajax({
                url: hlp.api(`/cmd/listuserenrollments?_token=${hlp.session.token}&userid=${hlp.session.id}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                method: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            });
            
            let ids = "";
            let hidden = hlp.get("hidden");
            if (courses.length != 0) {
                $.each(courses.response.enrollments.enrollment, (i, course) => {
                    try {
                        if (hidden.find(name => name.course.includes(course.id)).$value)
                            return;
                    } catch (e) {}

                    if (i < courses.response.enrollments.enrollment.length - 1)
                        ids += `${course.id},`
                    else 
                        ids += `${course.id}`;
                });
            }

            let calendar_list = await $.ajax({
                url: hlp.api(`/cmd/getcalendaritems?_token=${hlp.session.token}&enrollmentid=${ids}`),
                method: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            })

            
            async function content() {
                let details = "";
                await $.each(calendar_list.response.calendar.duedates.item, (i, due) => {
                    if ($(`#calendar #${new Date(due.duedate).toLocaleDateString('sv-SE')}`).length) {
                        $(`#calendar #${new Date(due.duedate).toLocaleDateString('sv-SE')} > span`).addClass(`${hlp.theme("bg", "700")} text-white rounded-xl`).off().on("click", function () {
                            $("#calendar-contents").empty();
                            
                            details = "";
                            $.each(calendar_list.response.calendar.duedates.item, (i, this_due) => {
                                if (new Date(this_due.duedate).toLocaleDateString('sv-SE') == new Date(due.duedate).toLocaleDateString('sv-SE')) {
                                    details += `
                                        <div class="flex flex-col gap-5">
                                            <div class="flex flex-row gap-5">
                                                <div class="flex flex-col flex-1">
                                                    <span class="flex items-center font-bold">${this_due.title}</span>
                                                    <span class="flex items-center font-bold text-zinc-400">Assigned by ${courses.response.enrollments.enrollment.find(name => name.course.id.includes(this_due.courseid)).course.title}</span>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }
                            })
                            
                            $("#calendar-contents").append(`
                                <div class="flex flex-col justify-between container mx-auto rounded-xl">
                                    <span class="font-bold text-2xl border-b-[2px] border-zinc-700 pb-3">${new Date(due.duedate).toLocaleDateString('en-US', { month: 'long', day: "numeric" })}</span>
                                    <div class="pt-3 flex flex-col gap-5">
                                        ${details}
                                    </div>
                                </div>
                            `)
                        })

                        if ($(`#calendar #${new Date().toLocaleDateString("sv-SE")}`).attr("id") == $(`#calendar #${new Date(due.duedate).toLocaleDateString('sv-SE')}`).attr("id")) {
                            $("#calendar-contents").empty();

                            details = "";
                            $.each(calendar_list.response.calendar.duedates.item, (i, this_due) => {
                                if (new Date(this_due.duedate).toLocaleDateString('sv-SE') == new Date(due.duedate).toLocaleDateString('sv-SE')) {
                                    details += `
                                        <div class="flex flex-col gap-5">
                                            <div class="flex flex-row gap-5">
                                                <div class="flex flex-col flex-1">
                                                    <span class="flex items-center font-bold">${this_due.title}</span>
                                                    <span class="flex items-center font-bold text-zinc-400">Assigned by ${courses.response.enrollments.enrollment.find(name => name.course.id.includes(this_due.courseid)).course.title}</span>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }
                            })
                            
                            $("#calendar-contents").html(`
                                <div class="flex flex-col justify-between container mx-auto rounded-xl">
                                    <span class="font-bold text-2xl border-b-[2px] border-zinc-700 pb-3">${new Date(due.duedate).toLocaleDateString('en-US', { month: 'long', day: "numeric" })}</span>
                                    <div class="pt-3 flex flex-col gap-5">
                                        ${details}
                                    </div>
                                </div>
                            `)
                        }
                    }
                })

                await $.each($("#calendar div[id]"), (i, days) => {
                    if (!$(days).find("span").hasClass(hlp.theme("bg", "700"))) {
                        let dates = new Date($(days).attr("id"));
                        dates.setDate(dates.getDate() + 1);
                        dates = dates.toLocaleDateString('en-US', { month: 'long', day: "numeric" });
                        if ($(`#calendar #${new Date().toLocaleDateString("sv-SE")}`).attr("id") == $(`#calendar #${new Date(dates).toLocaleDateString('sv-SE')}`).attr("id")) {
                            $("#calendar-contents").html(`
                                <div class="flex flex-col justify-between container mx-auto rounded-xl">
                                    <span class="font-bold text-2xl border-b-[2px] border-zinc-700 pb-3">${dates}</span>
                                    <div class="pt-3 flex flex-col gap-5">
                                        There is nothing for this day
                                    </div>
                                </div>
                            `)
                        }
                            

                        $(days).find("span").off().on("click", function () {
                            let date = new Date($(this).parent().attr("id"));
                            date.setDate(date.getDate() + 1);
                            date = date.toLocaleDateString('en-US', { month: 'long', day: "numeric" });

                            $("#calendar-contents").html(`
                                <div class="flex flex-col justify-between container mx-auto rounded-xl">
                                    <span class="font-bold text-2xl border-b-[2px] border-zinc-700 pb-3">${date}</span>
                                    <div class="pt-3 flex flex-col gap-5">
                                        There is nothing for this day
                                    </div>
                                </div>
                            `)
                        })
                    }
                })

                if ($(`#calendar #${new Date().toLocaleDateString('sv-SE')} > span`).hasClass(hlp.theme("bg", "700")))
                    $(`#calendar #${new Date().toLocaleDateString('sv-SE')} > span`).addClass(`border-[4px] ${hlp.theme("border", "700")} text-white rounded-xl`)

                $(`#calendar #${new Date().toLocaleDateString('sv-SE')} > span`).addClass(`${hlp.theme("bg", "300")} text-white rounded-xl`)
            }

            $("#calendar-contents").empty();
            await content();
            
            let current_date = new Date();
            $("#forward").off().on("click", async function () {
                $("#calendar-contents").empty();
                current_date.setMonth(current_date.getMonth() + 1);
                $("#calendar-date").html(current_date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))
                await calendar(current_date.getFullYear(), current_date.getMonth());
                await content();
            })
    
            $("#back").off().on("click", async function () {
                $("#calendar-contents").empty();
                current_date.setMonth(current_date.getMonth() - 1);
                $("#calendar-date").html(current_date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))
                await calendar(current_date.getFullYear(), current_date.getMonth());
                await content();
            })
        }

        await call();
    })
}