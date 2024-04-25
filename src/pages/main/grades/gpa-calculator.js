export async function run() {
    const hlp = await import("../../../helpers.js"),
          site = await import("../../../site.js");

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
                        <span class="flex-grow font-bold text-center text-[22px]">GPA Calculator</span>
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
                <div id="gpa" class="flex flex-col gap-5"></div>
                <button id="results" class="w-full px-4 py-3 ${hlp.theme("bg", "700")} transition text-white font-semibold rounded-xl hover:${hlp.theme("bg", "500")} focus:outline-none focus:ring-2 focus:${hlp.theme("ring", "500")} focus:ring-opacity-50">Get GPA Results</button>
                <button id="clear" class="w-full px-4 ${hlp.theme("theme-shadow")} py-3 bg-red-600 text-white transition font-semibold rounded-xl hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50">Reset GPA Data</button>
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
                        <a id="grades" class="cursor-pointer ${hlp.theme("text", "700")} flex justify-center items-center py-3 w-full">
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
                    await site.runtime("grades");
                    break;
                }

                case "reload": {
                    hlp.load(async function () {
                        await call();
                    })
                    break;
                }

                case "results": {
                    let gpas = [];
                    let credits = [];
                    let aps = [];
                    $("div .credits").each((i, credit) => {
                        credits.push({
                            courseid: $(credit).attr("courseid"),
                            eid: $(credit).attr("eid"),
                            grade: Number($(credit).attr("grade")),
                            type: $(credit).attr("semester"),
                        })
                    })

                    $("div .is_ap").each((i, ap) => {
                        aps.push({
                            courseid: $(ap).attr("courseid"),
                            eid: $(ap).attr("eid"),
                            grade: Number($(ap).attr("grade")),
                            is_ap: $(ap).attr("type") == "regular" ? false : true
                        })
                    })

                    let is_not_ap = 0
                    let is_an_ap = 0
                    $.each(credits, (i, credit) => {
                        if (!aps.find(name => name.courseid == credit.courseid).is_ap)
                            is_not_ap++
                        else
                            is_an_ap++

                        gpas.push({
                            courseid: credit.courseid,
                            enrollmentid: credit.eid,
                            credit: credit.type == "full" ? 1.0000 : 0.5000,
                            is_ap: aps.find(name => name.courseid == credit.courseid).is_ap,
                            grade: credit.grade
                        })
                    })

                    function convert_to_gpa(grade) {
                        if (grade >= 90) return 4.0;
                        if (grade >= 80) return 3.0;
                        if (grade >= 70) return 2.0;
                        if (grade >= 60) return 1.0;
                        return 0.0;
                    }
                
                    function calculate_regular_gpa(courses) {
                        var totalCredits = 0;
                        var totalQualityPoints = 0;
                
                        $.each(courses, function(index, course) {
                            var gpa = convert_to_gpa(course.grade);
                            totalCredits += course.credit;
                            totalQualityPoints += course.credit * gpa;
                        });
                
                        return totalQualityPoints / totalCredits;
                    }
                
                    
                    function calculate_weighted_gpa(courses) {
                        var totalCredits = 0;
                        var totalWeightedQualityPoints = 0;
                
                        $.each(courses, function(index, course) {
                            var gpa = convert_to_gpa(course.grade);
                            if (course.is_ap && (gpa === 4.0 || gpa === 3.0)) {
                                gpa += 0.5;
                            }

                            totalCredits += course.credit;
                            totalWeightedQualityPoints += course.credit * gpa;
                        });
                
                        return totalWeightedQualityPoints / totalCredits;
                    }
                
                    var regular = calculate_regular_gpa(gpas);
                    var weighted = calculate_weighted_gpa(gpas);
                    
                    
                    hlp.set("gpa", {
                        regular: is_an_ap != gpas.length ? regular.toFixed(4) : null,
                        weighted: is_not_ap != gpas.length ? weighted.toFixed(4) : null,
                        courses: gpas
                    })

                    site.runtime("grades");

                    break;
                }

                case "clear": {
                    hlp.remove("gpa");
                    site.runtime("gpa-calculator");
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
            $("#gpa").empty();

            let courses_order = [];
            let courses = [];

            try {
                courses_order = await $.ajax({
                    url: hlp.api(`/cmd/getresource?_token=${hlp.session.token}&entityid=${hlp.session.id}&path=Assets/BuzzCourseCardSettings.json`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                })
            } catch (e) {}


            try {
                courses = await $.ajax({
                    url: hlp.api(`/cmd/listuserenrollments?_token=${hlp.session.token}&userid=${hlp.session.id}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                    method: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                });
            } catch (e) {}

            let all_courses = [];
            if (courses_order.length == 0) {
                try {
                    $.each(courses.response.enrollments.enrollment, function (i, course) {
                        all_courses.push({
                            id: course.id,
                            enrollmentid: course.enrollmentmetrics.enrollmentid,
                            courseid: course.courseid,
                            title: course.course.title.trim(),
                            start: new Date(course.course.startdate).toLocaleDateString(undefined, {month: "long", year: "numeric", day: "numeric" }),
                            end: new Date(course.course.enddate).toLocaleDateString(undefined, {month: "long", year: "numeric", day: "numeric"}),
                            score: hlp.decode_score(course.enrollmentmetrics, course.enrollmentmetrics)
                        })
                    })
                } catch (e) {}
            } else {
                try {
                    $.each(courses.response.enrollments.enrollment, function (i, course) {
                        try {
                            all_courses.push({
                                order: courses_order[course.id].order,
                                id: course.id,
                                enrollmentid: course.enrollmentmetrics.enrollmentid,
                                courseid: course.courseid,
                                title: course.course.title.trim(),
                                start: new Date(course.course.startdate).toLocaleDateString(undefined, {month: "long", year: "numeric", day: "numeric" }),
                                end: new Date(course.course.enddate).toLocaleDateString(undefined, {month: "long", year: "numeric", day: "numeric"}),
                                score: hlp.decode_score(course.enrollmentmetrics, course.enrollmentmetrics)
                            })
                        } catch (e) {}
                    })
                    all_courses = all_courses.sort((first, last) => first.order - last.order);
                } catch (e) {}
            }

            if (all_courses.length != 0) {
                $.each(all_courses, (i, course) => {
                    try {
                        let hidden = hlp.get("hidden");
                        if (hidden.find(option => option.course.includes(course.courseid)).$hidden)
                            return;
                    } catch (e) {}

                    let html = ``;
                    if (hlp.get("gpa") == "" || hlp.get("gpa").courses.length == 0) {
                        html = `
                            <div class="flex flex-col">
                                <div class="flex flex-row container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">
                                    <div class="flex flex-row justify-between container mx-auto py-3">
                                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                                            <div class="flex flex-col items-center">
                                                <h1 class="text-[20px] w-[5ch] xl-sm:w-[17ch] x-sm:w-[28ch] sm:w-[30ch] md:w-[40ch] lg:w-full truncate font-bold">${course.title}</h1>
                                            </div>
                                        </div>
                                        <div class="flex justify-center items-center">
                                            <div class="rounded-lg px-3 py-1 text-white font-bold bg-${hlp.score_to_color(course.score)}-500">
                                                ${isNaN(course.score) ? `<span class="${hlp.theme("theme-text")} w-max">N/A</span>` : `${course.score}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-row gap-2 my-3">
                                    <div class="relative inline-block text-left">
                                        <button id="dropdown-button" type="button" class="flex flex-row gap-5 justify-center items-center w-full rounded-xl border border-zinc-700 shadow-sm px-3 py-1 font-bold ${hlp.theme("theme-text")}">
                                            <span id="value" class="pointer-events-none">Full</span>
                                            <span class="text-1xl pointer-events-none material-symbols-rounded flex justify-center">
                                                keyboard_arrow_down
                                            </span>
                                        </button>
                                        <div id="dropdown-menu" class="hidden z-[110]">
                                            <div id="dropdown-overlay" class="fixed z-[100] left-0 right-0 top-0 bottom-0"></div>
                                            <div class="z-[100] overflow-hidden origin-top-right absolute right-0 mt-2 w-40 rounded-xl shadow-xl ${hlp.theme("theme-card")} ring-1 ring-black ring-opacity-5 focus:outline-none" role="none">
                                                <a id="half" class="${hlp.theme("theme-text")} block px-4 py-2 text-sm hover:${hlp.theme("theme-input")} cursor-pointer" role="menuitem">Half Semester</a>
                                                <a id="full" class="${hlp.theme("theme-text")} block px-4 py-2 text-sm hover:${hlp.theme("theme-input")} cursor-pointer" role="menuitem">Full Semester</a>
                                            </div>
                                        </div>
                                        <input id="credits" courseid="${course.id}" eid="${course.enrollmentid}" grade="${isNaN(course.score) ? `0` : `${course.score}`}" semester="full" class="hidden credits">
                                    </div>
                                    <div class="relative inline-block text-left">
                                        <button id="dropdown-button" type="button" class="flex flex-row gap-5 justify-center items-center w-full rounded-xl border border-zinc-700 shadow-sm px-3 py-1 font-bold ${hlp.theme("theme-text")}">
                                            <span id="value" class="pointer-events-none">Regular</span>
                                            <span class="text-1xl pointer-events-none material-symbols-rounded flex justify-center">
                                                keyboard_arrow_down
                                            </span>
                                        </button>
                                        <div id="dropdown-menu" class="hidden z-[110]">
                                            <div id="dropdown-overlay" class="fixed z-[100] left-0 right-0 top-0 bottom-0"></div>
                                            <div class="z-[100] overflow-hidden origin-top-right absolute right-0 mt-2 w-40 rounded-xl shadow-xl ${hlp.theme("theme-card")} ring-1 ring-black ring-opacity-5 focus:outline-none" role="none">
                                                <a id="regular" class="${hlp.theme("theme-text")} block px-4 py-2 text-sm hover:${hlp.theme("theme-input")} cursor-pointer" role="menuitem">Regular</a>
                                                <a id="ap" class="${hlp.theme("theme-text")} block px-4 py-2 text-sm hover:${hlp.theme("theme-input")} cursor-pointer" role="menuitem">AP</a>
                                            </div>
                                        </div>
                                        <input id="is_ap" courseid="${course.id}" eid="${course.enrollmentid}" type="regular" grade="${isNaN(course.score) ? `0` : `${course.score}`}" class="hidden is_ap">
                                    </div>
                                </div>
                            </div>
                        `;
                    } else {
                        html = `
                            <div class="flex flex-col">
                                <div class="flex flex-row container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">
                                    <div class="flex flex-row justify-between container mx-auto py-3">
                                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                                            <div class="flex flex-col items-center">
                                                <h1 class="text-[20px] w-[5ch] xl-sm:w-[17ch] x-sm:w-[28ch] sm:w-[30ch] md:w-[40ch] lg:w-full truncate font-bold">${course.title}</h1>
                                            </div>
                                        </div>
                                        <div class="flex justify-center items-center">
                                            <div class="rounded-lg px-3 py-1 text-white font-bold bg-${hlp.score_to_color(course.score)}-500">
                                                ${isNaN(course.score) ? `<span class="${hlp.theme("theme-text")} w-max">N/A</span>` : `${course.score}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-row gap-2 my-3">
                                    <div class="relative inline-block text-left">
                                        <button id="dropdown-button" type="button" class="flex flex-row gap-5 justify-center items-center w-full rounded-xl border border-zinc-700 shadow-sm px-3 py-1 font-bold ${hlp.theme("theme-text")}">
                                            <span id="value" class="pointer-events-none">${hlp.get("gpa").courses.find(item => item.courseid == course.enrollmentid).credit == 1 ? "Full" : "Half"}</span>
                                            <span class="text-1xl pointer-events-none material-symbols-rounded flex justify-center">
                                                keyboard_arrow_down
                                            </span>
                                        </button>
                                        <div id="dropdown-menu" class="hidden z-[110]">
                                            <div id="dropdown-overlay" class="fixed z-[100] left-0 right-0 top-0 bottom-0"></div>
                                            <div class="z-[100] overflow-hidden origin-top-right absolute right-0 mt-2 w-40 rounded-xl shadow-xl ${hlp.theme("theme-card")} ring-1 ring-black ring-opacity-5 focus:outline-none" role="none">
                                                <a id="half" class="${hlp.theme("theme-text")} block px-4 py-2 text-sm hover:${hlp.theme("theme-input")} cursor-pointer" role="menuitem">Half Semester</a>
                                                <a id="full" class="${hlp.theme("theme-text")} block px-4 py-2 text-sm hover:${hlp.theme("theme-input")} cursor-pointer" role="menuitem">Full Semester</a>
                                            </div>
                                        </div>
                                        <input id="credits" courseid="${course.id}" eid="${course.enrollmentid}" grade="${isNaN(course.score) ? `0` : `${course.score}`}" semester="${hlp.get("gpa").courses.find(item => item.courseid == course.enrollmentid).credit == 1 ? "full" : "half"}" class="hidden credits">
                                    </div>
                                    <div class="relative inline-block text-left">
                                        <button id="dropdown-button" type="button" class="flex flex-row gap-5 justify-center items-center w-full rounded-xl border border-zinc-700 shadow-sm px-3 py-1 font-bold ${hlp.theme("theme-text")}">
                                            <span id="value" class="pointer-events-none">${hlp.get("gpa").courses.find(item => item.courseid == course.enrollmentid).is_ap == true ? "AP" : "Regular"}</span>
                                            <span class="text-1xl pointer-events-none material-symbols-rounded flex justify-center">
                                                keyboard_arrow_down
                                            </span>
                                        </button>
                                        <div id="dropdown-menu" class="hidden z-[110]">
                                            <div id="dropdown-overlay" class="fixed z-[100] left-0 right-0 top-0 bottom-0"></div>
                                            <div class="z-[100] overflow-hidden origin-top-right absolute right-0 mt-2 w-40 rounded-xl shadow-xl ${hlp.theme("theme-card")} ring-1 ring-black ring-opacity-5 focus:outline-none" role="none">
                                                <a id="regular" class="${hlp.theme("theme-text")} block px-4 py-2 text-sm hover:${hlp.theme("theme-input")} cursor-pointer" role="menuitem">Regular</a>
                                                <a id="ap" class="${hlp.theme("theme-text")} block px-4 py-2 text-sm hover:${hlp.theme("theme-input")} cursor-pointer" role="menuitem">AP</a>
                                            </div>
                                        </div>
                                        <input id="is_ap" courseid="${course.id}" eid="${course.enrollmentid}" type="${hlp.get("gpa").courses.find(item => item.courseid == course.enrollmentid).is_ap == true ? "ap" : "regular"}" grade="${isNaN(course.score) ? `0` : `${course.score}`}" class="hidden is_ap">
                                    </div>
                                </div>
                            </div>
                        `;
                    }

                    $("#gpa").append(html).off().on("click", function (e) {
                        switch ($(e.target).attr("id")) {
                            case "dropdown-overlay": {
                                $(e.target).parent().parent().find('#dropdown-menu').toggleClass('hidden');
                                break;
                            }
                            case "dropdown-button": {
                                $(e.target).parent().find('#dropdown-menu').toggleClass('hidden');
                                break;
                            }
                            case "half": {
                                $(e.target).parent().parent().parent().find("#dropdown-button").find("#value").text("Half")
                                $(e.target).parent().parent().parent().find("#credits").attr("semester", "half")
                                $(e.target).parent().parent().parent().find('#dropdown-menu').toggleClass('hidden');
                                break;
                            }
                            case "full": {
                                $(e.target).parent().parent().parent().find("#dropdown-button").find("#value").text("Full")
                                $(e.target).parent().parent().parent().find("#credits").attr("semester", "full")
                                $(e.target).parent().parent().parent().find('#dropdown-menu').toggleClass('hidden');
                                break;
                            }
                            case "regular": {
                                $(e.target).parent().parent().parent().find("#dropdown-button").find("#value").text("Regular")
                                $(e.target).parent().parent().parent().find("#is_ap").attr("type", "regular")
                                $(e.target).parent().parent().parent().find('#dropdown-menu').toggleClass('hidden');
                                break;
                            }
                            case "ap": {
                                $(e.target).parent().parent().parent().find("#dropdown-button").find("#value").text("AP")
                                $(e.target).parent().parent().parent().find("#is_ap").attr("type", "ap")
                                $(e.target).parent().parent().parent().find('#dropdown-menu').toggleClass('hidden');
                                break;
                            }
                        }
                    })
                })

                if ($("#gpa div").length == 0) {
                    $("#gpa").append(`
                        <div class="flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl cursor-pointer py-3 px-3">
                            <span class="text-center w-full">You have no courses available</span>
                        </div>
                    `)
                }
            }

            
        }

        hlp.animate_nav();
        await call();
    });
};