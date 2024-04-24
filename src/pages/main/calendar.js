export async function run() {
    const hlp = await import("../../helpers.js");
    const site = await import("../../site.js");

    await hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="${hlp.theme("bg", "700")} text-white">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row ${hlp.theme("bg", "700")}">
                    <div id="scrolled-title-reload" showreload class="flex justify-center items-center container mx-auto py-2 px-4 h-[60px]">
                        <div class="invisible -ml-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
                            <span class="w-0 -ml-[1px] font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                arrow_back_ios_new
                            </span>
                        </div>
                        <span class="flex-grow font-bold text-center text-[22px]">
                            <span class="inner">Calendar</span>
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
                        <h1 class="text-5xl sm:text-7xl font-bold pb-0 -m-[2px] mb-0">Calendar</h1>
                    </div>
                </div>
            </div>
            <!---->
            <!---->
            <div class="flex flex-col gap-5 pt-[1.1rem] mb-[1.8rem] container mx-auto py-10 px-4">
                <div class="container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3 py-3">
                    <div class="flex flex-col gap-5">
                        <div class="flex flex-row w-full gap-5 justify-center items-center mx-auto">
                            <div id="back" class="-ml-3 flex-2 cursor-pointer py-5 px-9 rounded-full">
                                <span class="w-0 font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                    arrow_back_ios_new
                                </span>
                            </div>
                            <span id="date" class="flex-grow flex-1 font-bold text-center text-[22px]">${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                            <div id="forward" class="-mr-3 flex-2 cursor-pointer py-5 px-9 rounded-full">
                                <span class="w-0 font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                    arrow_forward_ios
                                </span>
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <div class="grid grid-cols-7 text-center">
                                <div class="font-bold text-1xl">su</div>
                                <div class="font-bold text-1xl">mo</div>
                                <div class="font-bold text-1xl">tu</div>
                                <div class="font-bold text-1xl">we</div>
                                <div class="font-bold text-1xl">th</div>
                                <div class="font-bold text-1xl">fr</div>
                                <div class="font-bold text-1xl">sa</div>
                            </div>
                            <div id="calendar" class="grid grid-cols-7 text-center">
                            </div>
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
                            <span class="flex flex-1 items-center font-bold">Assignments Completed</span>
                        </div>
                        <div class="flex flex-row gap-5">
                            <div class="rounded-lg flex-2 bg-yellow-500 p-4 float-left"></div>
                            <span class="flex flex-1 items-center font-bold">Assignments Due</span>
                        </div>
                    </div>
                </div>
                <div id="contents" class="container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3 py-3">
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
                        <a id="grades" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="text-[30px] font-black pointer-events-none material-symbols-rounded">
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


                case "grades": {
                    await site.runtime("grades");
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
            $("#calendar").empty();
            $("#contents").empty();

            async function set_calendar(year, month) {
                let first_day = new Date(year, month, 1).getDay();
                let days_current_month = new Date(year, month + 1, 0).getDate();
                let days_previous_month = new Date(year, month, 0).getDate();

                // last month
                for (let i = 0; i < first_day; i++) {
                    let previous_month = days_previous_month - first_day + 1 + i;
                    await $('#calendar').append(`
                        <div class="text-center py-1 flex justify-center items-center font-bold text-zinc-400">
                            <span class="w-10 h-10 flex items-center justify-center">${previous_month}</span>
                        </div>
                    `);
                }

                // current month
                for (let day = 1; day <= days_current_month; day++) {
                    await $('#calendar').append(`
                        <div id="${new Date(year, month, day).toLocaleDateString('sv-SE')}" class="text-center py-1 cursor-pointer flex justify-center items-center font-bold">
                            <span class="w-10 h-10 flex items-center justify-center">${day}</span>
                        </div>
                    `);
                }

                // future month
                for (let i = 1; i <= 42 - first_day - days_current_month; i++) {
                    await $('#calendar').append(`
                        <div class="text-center py-1 flex justify-center items-center font-bold text-zinc-400">
                            <span class="w-10 h-10 flex items-center justify-center">${i}</span>
                        </div>
                    `);
                }
            }
            
            await set_calendar(new Date().getFullYear(), new Date().getMonth())

            let courses = [];
            let calendar = [];


            await hlp.prevent_errors(async function () {
                courses = await $.ajax({
                    url: hlp.api(`/cmd/listuserenrollments?_token=${hlp.session.token}&userid=${hlp.session.id}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            });
            
            let courseids = "";
            if (courses.length != 0) {
                $.each(courses.response.enrollments.enrollment, (i, course) => {
                    if (i < courses.response.enrollments.enrollment.length - 1)
                        courseids += `${course.id},`
                    else 
                        courseids += `${course.id}`;
                });
            }

            await hlp.prevent_errors(async function () {
                calendar = await $.ajax({
                    url: hlp.api(`/cmd/getcalendaritems?_token=${hlp.session.token}&enrollmentid=${courseids}`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            });


            async function content(go_to_today) {
                // create the cell groups
                let cell_group = [];
                $.each(calendar.response.calendar.duedates.item, (i, due) => {
                    if (cell_group[due.duedate] == undefined) {
                        if (!cell_group.find(name => name.duedate.includes(due.duedate))) {
                            cell_group.push({
                                duedate: due.duedate,
                                has_non_completed: false,
                                items: []
                            })
                        }
                    }
                })

                // add the data to the cell groups
                $.each(calendar.response.calendar.duedates.item, (i, due) => {
                    cell_group.find(name => name.duedate.includes(due.duedate)).items.push({
                        due_title: due.title,
                        courseid: due.courseid,
                        title: courses.response.enrollments.enrollment.find(name => name.course.id.includes(due.courseid)).course.title,
                        is_completed: false,
                    })
                    
                    try {
                        if (due.grade != undefined) {
                            cell_group.find(name => name.duedate.includes(due.duedate)).items.find(name => name.due_title.includes(due.title)).is_completed = true;
                        }
                    } catch (e) {}
    
                });

                // determine if the date has an assignment that isn't completed
                $.each(cell_group, (i, cell) => {
                    if (cell.items.find(completed => completed.is_completed == false))
                        cell.has_non_completed = true;
                })

                async function html(cell, e) {
                    let content = "";

                    try {
                        await $.each(cell_group.find(date => date.duedate.includes($(e).attr("id"))).items, (i, data) => {
                            content += `
                                <div class="flex flex-col gap-5">
                                    <div class="flex flex-row gap-5">
                                        <div class="rounded-lg flex-2 h-fit ${data.is_completed ? hlp.theme("bg", "700") : "bg-yellow-500"} p-6 float-left"></div>
                                        <div class="flex flex-col flex-1">
                                            <span class="flex items-center font-bold">${data.due_title}</span>
                                            <span class="flex items-center font-bold text-zinc-400">Assigned by ${courses.response.enrollments.enrollment.find(name => name.course.id.includes(data.courseid)).course.title}</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        })
                    } catch (e) {} 

                    if (content != "") {
                        $("#contents").html(`
                            <div class="flex flex-col justify-between container mx-auto rounded-xl">
                                <span selected-date="${new Date(cell.duedate).toLocaleDateString('sv-SE')}" class="font-bold text-2xl border-b-[2px] border-zinc-700 pb-3">${new Date(cell.duedate).toLocaleDateString('en-US', { month: 'long', day: "numeric" })}</span>
                                <div class="pt-3 flex flex-col gap-5">
                                    ${content}
                                </div>
                            </div>
                        `)
                    } else {
                        $("#contents").html(`
                            <div class="flex flex-col justify-between container mx-auto rounded-xl">
                                <span class="font-bold text-2xl border-b-[2px] border-zinc-700 pb-3">${dates}</span>
                                <div class="pt-3 flex flex-col gap-5">
                                    There is nothing for this day
                                </div>
                            </div>
                        `)
                    }
                    
                }
                
                // finally list each item, select the current day, and show the work from it.
                await $.each(cell_group, (i, cell) => {
                    try {
                        for (let item of cell.items) {
                            let hidden = hlp.get("hidden");
                            if (hidden.find(option => option.course.includes(item.courseid)).$hidden)
                                return;
                        }
                    } catch (e) {}
                    
                    if ($(`#calendar #${new Date(cell.duedate).toLocaleDateString('sv-SE')}`).length) {
                        // determine if a day has non completed work
                        hlp.prevent_errors(async function () {
                            if (!cell.has_non_completed) {
                                await $(`#calendar #${new Date(cell.duedate).toLocaleDateString('sv-SE')} > span`).addClass(`${hlp.theme("bg", "700")} text-white rounded-xl`);
                            } else {
                                await $(`#calendar #${new Date(cell.duedate).toLocaleDateString('sv-SE')} > span`).addClass(`bg-yellow-500 text-white rounded-xl`);
                            }
                        })
                        
                        $(`#calendar #${new Date(cell.duedate).toLocaleDateString('sv-SE')}`).off().on("click", async function () {
                            html(cell, this)
                        })
                    }

                    if (go_to_today) {
                        if ($(`#calendar #${new Date().toLocaleDateString("sv-SE")}`).attr("id") === $(`#calendar #${new Date(cell.duedate).toLocaleDateString('sv-SE')}`).attr("id")) {
                            html(cell, $(`#calendar #${new Date().toLocaleDateString("sv-SE")}`))
                        }
                    }
                });

                // sets the color states of each cell
                if ($(`#calendar #${new Date().toLocaleDateString('sv-SE')} > span`).hasClass(hlp.theme("bg", "700")))
                    $(`#calendar #${new Date().toLocaleDateString('sv-SE')} > span`).removeClass("bg-yellow-500").addClass(`${hlp.theme("bg", "300")} border-[4px] ${hlp.theme("border", "700")} text-white rounded-xl`);
                else if ($(`#calendar #${new Date().toLocaleDateString('sv-SE')} > span`).hasClass("bg-yellow-500"))
                    $(`#calendar #${new Date().toLocaleDateString('sv-SE')} > span`).removeClass("bg-yellow-500").addClass(`${hlp.theme("bg", "300")}  border-[4px] border-yellow-500 text-white rounded-xl`);
                else
                    $(`#calendar #${new Date().toLocaleDateString('sv-SE')} > span`).removeClass("bg-yellow-500").addClass(`${hlp.theme("bg", "300")} text-white rounded-xl`);
                
                // This handles if the current day you click has nothing
                await $.each($("#calendar div[id]"), (i, days) => {                 
                    if (!$(days).find("span").hasClass(hlp.theme("bg", "700")) && !$(days).find("span").hasClass("bg-yellow-500")) {
                        let date = new Date($(days).attr("id"));
                        date.setDate(date.getDate() + 1);
                        
                        if (go_to_today) {
                            if ($(`#calendar #${new Date().toLocaleDateString("sv-SE")}`).attr("id") === $(`#calendar #${new Date(date).toLocaleDateString('sv-SE')}`).attr("id")) {
                                date = date.toLocaleDateString('en-US', { month: 'long', day: "numeric" });
                                $("#contents").html(`
                                    <div class="flex flex-col justify-between container mx-auto rounded-xl">
                                        <span class="font-bold text-2xl border-b-[2px] border-zinc-700 pb-3">${date}</span>
                                        <div class="pt-3 flex flex-col gap-5">
                                            There is nothing for this day
                                        </div>
                                    </div>
                                `)
                            }
                        }

                        $(days).find("span").off().on("click", function () {
                            let date = new Date($(this).parent().attr("id"));
                            date.setDate(date.getDate() + 1);
                            date = date.toLocaleDateString('en-US', { month: 'long', day: "numeric" });

                            $("#contents").html(`
                                <div class="flex flex-col justify-between container mx-auto rounded-xl">
                                    <span class="font-bold text-2xl border-b-[2px] border-zinc-700 pb-3">${date}</span>
                                    <div class="pt-3 flex flex-col gap-5">
                                        There is nothing for this day
                                    </div>
                                </div>
                            `)
                        })
                    }
                });
            }

            await content(true);

            $(`#calendar #${new Date().toLocaleDateString('sv-SE')} > span`).addClass(`${hlp.theme("bg", "300")} text-white rounded-xl`);
            
            let current_date = new Date();
            $("#forward").off().on("click", async function () {
                $("#calendar").empty();
                current_date.setMonth(current_date.getMonth() + 1);
                $("#date").html(current_date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))

                await set_calendar(current_date.getFullYear(), current_date.getMonth());
                await content(false);
            })
    
            $("#back").off().on("click", async function () {
                $("#calendar").empty();
                current_date.setMonth(current_date.getMonth() - 1);
                $("#date").html(current_date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))
                
                await set_calendar(current_date.getFullYear(), current_date.getMonth());
                await content(false);
            })
        }

        hlp.animate_nav();
        await call();
    })
}