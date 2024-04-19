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
                        <span class="flex-grow font-bold text-center text-[22px]">Enroll</span>
                        <div class="invisible -mr-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
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
                <div class="flex flex-col gap-5 container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-col">
                            <h1 class="text-[24px] font-bold">Enroll In A Course</h1>
                            <span>Enter a registration code to enroll in a course.</span>
                        </div>
                        <input placeholder="Registration Code" id="enroll-input" class="${hlp.theme("caret", "700")} font-bold ${hlp.theme("theme-input")} mt-1 block w-full px-5 py-4 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                    </div>
                    <button id="enroll" class="w-full px-4 py-3 ${hlp.theme("bg", "700")} text-white transition font-semibold rounded-xl hover:${hlp.theme("bg", "500")} focus:outline-none focus:ring-2 focus:${hlp.theme("ring", "700")} focus:ring-opacity-50">Verify Code</button>
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
                case "go-back": {
                    history.pushState({}, "", `?page=settings`);
                    await site.runtime("settings");
                    break;
                }

                case "enroll": {
                    if ($("#enroll-input").val() == "") {
                        $("#enroll-input").addClass("shake border border-red-300").one("animationend webkitAnimationEnd", function() {
                            $(this).removeClass("shake border border-red-300");
                        });
                    } else {
                        let check_enroll = [];
                        let courses = [];

                        try {
                            check_enroll = await $.ajax({
                                url: hlp.api(`/cmd/getcommandtokeninfo?_token=${hlp.session.token}&code=${$("#enroll-input").val()}`),
                                method: "GET",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8"
                            })
                        } catch (e) {}

                        try {
                            courses = await $.ajax({
                                url: hlp.api(`/cmd/listuserenrollments?_token=${hlp.session.token}&privileges=1&entityid=${hlp.parse(check_enroll.response.commandtokens.commandtoken[0].description).id}&userid=${hlp.session.id}`),
                                method: "GET",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8"
                            })
                        } catch (e) {}

                        if (check_enroll.length == 0 || courses.length == 0)
                            break;

                        try {
                            if (check_enroll.response.commandtokens.response[0].code == "BadRequest") {
                                $("#enroll-input").addClass("shake border border-red-300").one("animationend webkitAnimationEnd", function() {
                                    $(this).removeClass("shake border border-red-300");
                                });
                                break;
                            }

                        } catch (e) {}
                        try {
                            if (hlp.string(check_enroll.response.commandtokens) == "{}") {
                                $("#enroll-input").addClass("shake border border-red-300").one("animationend webkitAnimationEnd", function() {
                                    $(this).removeClass("shake border border-red-300");
                                });
                                break;
                            }
                        } catch (e) {}

                        $("body").addClass("overflow-hidden");
                        await $("#overlays").append(`
                            <div id="overlay" class="fixed inset-0 bg-gray-900 z-50 bg-opacity-50 flex justify-center items-center animation-fadein">
                                <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                    <div class="${hlp.theme("theme-card")} ${hlp.theme("theme-text")} rounded-xl max-w-lg px-5 py-5 pointer-events-auto w-[25rem]">
                                        <div class="flex justify-center items-center mb-4">
                                            <h2 class="text-2xl font-bold text-center">${hlp.parse(check_enroll.response.commandtokens.commandtoken[0].description).title}</h2>
                                        </div>
                                        <div>
                                            ${(() => {
                                                if (courses.response.enrollments.enrollment[0].status != 1) 
                                                    return `
                                                        <span class="flex justify-center items-center mb-4">Do you want to register to this course?</span>
                                                        <div class="flex flex-row gap-5">
                                                            <button id="register" class="w-full mt-2 flex-1 px-4 py-2 ${hlp.theme("bg", "600")} text-white transition font-semibold rounded-xl hover:${hlp.theme("bg", "500")} focus:outline-none focus:ring-2 focus:${hlp.theme("ring", "700")} focus:ring-opacity-50">Yes</button>
                                                            <button id="cancel" class="w-full mt-2 flex-1 px-4 py-2 bg-red-600 text-white transition font-semibold rounded-xl hover:bg-red-500 focus:outline-none focus:ring-2 focus:${hlp.theme("ring", "700")} focus:ring-opacity-50">No</button>
                                                        </div>
                                                    `
                                                else
                                                    return `
                                                        <span class="flex justify-center items-center mb-4">You are already enrolled in this course</span>
                                                        <div class="flex flex-row gap-5">
                                                            <button id="cancel" class="w-full mt-2 flex-1 px-4 py-2 bg-red-600 text-white transition font-semibold rounded-xl hover:bg-red-500 focus:outline-none focus:ring-2 focus:${hlp.theme("ring", "700")} focus:ring-opacity-50">Close</button>
                                                        </div>
                                                    `
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).off().on("click", async function (e) {
                            switch ($(e.target).attr("id")) {
                                case "overlay": {
                                    $("#overlay").fadeOut(400, function () {
                                        $("#overlays").empty();
                                    });
                                    $("body").removeClass("overflow-hidden");
                                    break;
                                }
                                case "register": {
                                    $("#overlays").empty();
                                    $("body").removeClass("overflow-hidden");

                                    // TODO:
                                    /*
                                    await $.ajax({
                                        url: hlp.api(`/cmd/redeemcommandtoken?_token=${hlp.session.token}&code=${$("#enroll-input").val()}`),
                                        method: "GET",
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                        success: function () {
                                            console.log(this)
                                        }
                                    })*/

                                    break;
                                }
                                case "cancel": {
                                    $("#overlays").empty();
                                    $("body").removeClass("overflow-hidden");
                                }
                            }
                        })
                    }
                    break;
                }
                

                
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

        hlp.animate_nav();
    });
}