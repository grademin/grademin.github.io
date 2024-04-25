//TODO: using listuserenrollments, get course and teachers to get teacher emails.
// make it so it gotos mailto: the email.
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
                        <span class="flex-grow font-bold text-center text-[22px]">Contact</span>
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
                <div id="contact" class="flex flex-col gap-5"></div>
            </div>
            <!---->
            <!---->
            <div id="bottom" class="fixed bottom-0 left-0 right-0">
                <div class="${hlp.theme("theme-card")}">
                    <div class="flex flex-row justify-between items-center">
                        <a id="overview" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="text-[30px] ${hlp.theme("text", "700")} font-black pointer-events-none material-symbols-rounded">
                                home
                            </span>
                        </a>
                        <a id="calendar" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="text-[30px] font-black pointer-events-none material-symbols-rounded">
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
        `).on("click", async function (event) {
            switch ($(event.target).attr("id")) {
                case "go-back": {
                    await site.runtime("overview");
                    break;
                }

                case "reload": {
                    hlp.load(async function () {
                        await call();
                    })
                    break;
                }

                

                case "calendar": {
                    await site.runtime("calendar");
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
            let courses = [];
        
            try {
                courses = await $.ajax({
                    url: hlp.api(`/cmd/listuserenrollments?_token=${hlp.session.token}&userid=${hlp.session.id}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            } catch (e) {}

            $("#contact").empty();
            if (courses.length == 0 || courses.response.code != "OK") {
                $("#contact").append(`
                    <div class="flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                        <span class="text-center w-full">There are no teachers available to contact.</span>
                    </div>
                `)
            } else {
                let emails = [];
                $.each(courses.response.enrollments.enrollment, (i, course) => {
                    try {
                        let hidden = hlp.get("hidden");
                        if (hidden.find(option => option.course.includes(course.courseid)).$hidden)
                            return;
                    } catch (e) {}

                    for (let email of course.course.teachers.teacher) {
                        emails.push({
                            course: course.course.title,
                            email: email.email,
                            firstname: email.firstname,
                            lastname: email.lastname,
                            fullname: `${email.firstname.charAt(0).toUpperCase() + email.firstname.slice(1)} ${email.lastname.charAt(0).toUpperCase() + email.lastname.slice(1)}`,
                            userid: email.userid
                        })
                    }
                })

                if (emails.length == 0) {
                    $("#contact").append(`
                        <div class="flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                            <span class="text-center w-full">There are no teachers available to contact.</span>
                        </div>
                    `)
                } else {
                    $.each(emails, (i, email) => {
                        if (!$(`div[email="${email.email}"]`).length) {
                            $("#contact").append(`
                                <div email="${email.email}" goto="mailto:${email.email}" class="relative cursor-pointer flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                                    <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                                        <div class="flex flex-col w-full">
                                            <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${email.fullname}</h1>
                                            <span class="font-bold text-[15px] text-zinc-400 border-b-[2px] border-zinc-700 pb-3">From ${email.course}</span>
                                            <span class="font-bold text-[15px] text-zinc-400 pt-3">${email.email}</span>
                                        </div>
                                    </div>
                                </div>
                            `)
                        }
                    })
                }
            }

            $("[goto]").on("click", function (event) {
                window.open($(this).attr("goto"), "_self")
            })
        }

        hlp.animate_nav();
        await call();
    });
};