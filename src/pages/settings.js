import { session } from "../helpers.js";

export async function run() {
    const hlp = await import("../helpers.js"),
          site = await import("../site.js");

    hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="bg-blue-700">
                <div class="fixed left-0 right-0 top-0 z-20 h-[46px] flex flex-row py-2 px-4 bg-blue-700">
                    <div id="scrolled-title" class="flex justify-center items-center container mx-auto px-4">
                        <div></div>
                        <span class="flex-grow font-bold text-center text-[20px]">Settings</span>
                        <div></div>
                    </div>
                </div>
                <div class="flex flex-row gap-10 justify-between container mx-auto pt-16 pb-5 px-4">
                    <div class="flex flex-col flex-grow justify-center">
                        <h1 class="text-5xl sm:text-7xl font-bold pb-0 -m-[2px] mb-0">Settings</h1>
                    </div>
                </div>
            </div>
            <!---->
            <!---->
            <div class="flex flex-col gap-5 pt-[1.2rem] mb-[2rem] container mx-auto py-10 px-4">
                <div class="flex flex-col justify-center items-center container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                    <div class="flex justify-between items-center">
                        <div class="relative rounded-full border-[6px] border-blue-500 bg-blue-600 ${hlp.get("pfp", false).includes("gravatar") ? "" : `bg-[url('${hlp.get("pfp", false)}')] bg-cover`} h-20 w-20 flex items-center justify-center text-2xl sm:text-2xl font-bold uppercase">
                            <span class="z-1">${hlp.get("pfp", false).includes("gravatar") ? hlp.session.firstname.charAt(0).toUpperCase() : ""}</span>
                        </div>
                    </div>
                    <h1 class="text-[28px] font-bold">${JSON.parse(localStorage.getItem("session")).user.fullname}</h1>
                    <div class="flex flex-row w-full mt-5 gap-5">
                        <div class="flex-1">
                            <button id="change-name" class="w-full px-4 py-3 bg-blue-700 text-white transition font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Change Name</button>
                        </div>
                        <div class="flex-1">
                            <button id="change-pfp" class="w-full px-4 py-3 bg-blue-700 text-white transition font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Change Picture</button>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="flex flex-col container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                    <div id="notifications" class="flex flex-row justify-between container mx-auto cursor-pointer border-b-[2px] border-zinc-700 pb-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                <span class="text-3xl material-symbols-rounded">
                                    notifications
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[20px] font-bold">Notification Preferences</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <span class="material-symbols-rounded">
                                arrow_forward_ios
                            </span>
                        </div>
                    </div>
                    <div id="hide-courses" class="flex flex-row justify-between container mx-auto cursor-pointer pt-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                <span class="text-3xl material-symbols-rounded">
                                    hide_source
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[20px] font-bold">Hide Courses</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <span class="material-symbols-rounded">
                                arrow_forward_ios
                            </span>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="flex flex-col container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                    <div id="color-coding" class="flex flex-row justify-between container mx-auto cursor-pointer border-b-[2px] border-zinc-700 pb-3">
                        <div  class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                <span class="text-3xl material-symbols-rounded">
                                    palette
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[20px] font-bold">Color Coding</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input setting_name="color-coding" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] bg-zinc-600 rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div id="include-self" class="flex flex-row justify-between container mx-auto cursor-pointer border-b-[2px] border-zinc-700 py-4">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                <span class="text-3xl material-symbols-rounded">
                                    group_add
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[20px] font-bold">Include Self Activities</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input setting_name="include-self" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] bg-zinc-600 rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div id="hide-excused" class="flex flex-row justify-between container mx-auto cursor-pointer pt-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                <span class="text-3xl material-symbols-rounded">
                                    visibility
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[20px] font-bold">Hide Excused Activities</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input setting_name="hide-excused" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] bg-zinc-600 rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="flex flex-col container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                    <div id="hide-lti-details" class="flex flex-row justify-between container mx-auto cursor-pointer">
                        <div  class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                <span class="text-3xl material-symbols-rounded">
                                    email
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[20px] font-bold">Hide user details from LTI</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <input setting_name="hide-lti-details" type="checkbox" class="hidden">
                            <label class="flex items-center cursor-pointer">
                                <div class="w-[3.7rem] h-[33px] bg-zinc-600 rounded-full p-1">
                                    <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="flex flex-col container mx-auto bg-zinc-800 rounded-xl py-3 px-3">
                    <div goto="https://github.com/wo-r-professional/proview" class="flex flex-row justify-between container mx-auto cursor-pointer border-b-[2px] border-zinc-700 pb-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                <span class="text-3xl material-symbols-rounded">
                                    verified
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[20px] font-bold">Proview</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <span class="text-3xl material-symbols-rounded -rotate-45">
                                link
                            </span>
                        </div>
                    </div>
                    <div goto="https://github.com/wo-r-professional/echo-plus" class="flex flex-row justify-between container mx-auto cursor-pointer pt-3">
                        <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                            <div class="flex justify-center items-center bg-blue-700 px-2 py-1 rounded-2xl">
                                <span class="text-3xl material-symbols-rounded">
                                    add_task
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <h1 class="text-[20px] font-bold">Echo Plus</h1>
                            </div>
                        </div>
                        <div class="flex justify-center items-center">
                            <span class="text-3xl material-symbols-rounded -rotate-45">
                                link
                            </span>
                        </div>
                    </div>
                </div>
                <!---->
                <button id="logout" class="w-full px-4 py-3 bg-red-600 text-white transition font-semibold rounded-xl hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50">Logout</button>
                <!---->
                <div class="flex flex-col justify-center items-center align-center">
                    <span class="text-sm font-bold">Proview v0.1.5</span>
                    <span class="text-sm font-bold">&copy; ${new Date().getFullYear()} Wo-r, Design from <a class="text-blue-700 hover:text-blue-600 cursor-pointer transition" goto="https://gradeway.github.io/">Srujan Mupparapu</a></span>
                    <span class="text-xs font-bold text-zinc-400">Created for the betterment of Echo</span>
                </div>     
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
                            <span class="text-[30px] font-black text-blue-700 pointer-events-none material-symbols-rounded">
                                settings
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        `).on("click", async function (event) {
            switch ($(event.target).attr("id")) {
                case "logout": {
                    hlp.load(async function () {
                        await $.ajax({
                            url: hlp.api("/cmd"),
                            method: "POST",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify({"request": {
                                cmd: "logout",
                            }}),
                            success: function () {
                                hlp.remove("session");
                                site.runtime("login");
                            }
                        })
                    })
                    break;
                }
                case "overview": {
                    hlp.load(async function () {
                        site.runtime("overview");
                    })
                    break;
                }


                ////////////////////////////////////////////////////////////


                case "change-pfp": {
                    $("#overlays").append(`
                        <div id="overlay" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                            <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                <div class="bg-zinc-800 rounded-xl max-w-lg px-5 py-5 pointer-events-auto w-[25rem]">
                                    <div class="flex justify-center items-center mb-4">
                                        <h2 class="text-2xl font-bold text-white text-center">Change Profile Picture</h2>
                                    </div>
                                    <div class="text-white">
                                        <input placeholder="New Profile Picture" id="pfp" value="${hlp.get("pfp", false).includes("gravatar") ? "" : hlp.get("pfp", false)}" class="caret-blue-700 font-bold bg-zinc-700 mt-1 block w-full px-5 py-4 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                                        <button id="submit" class="w-full mt-2 px-4 py-2 bg-blue-600 text-white transition font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Done</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).on("click", async function (event) {
                        switch ($(event.target).attr("id")) {
                            case "overlay": {
                                $("#overlay").fadeOut(400, function () {
                                    $("#overlays").empty();
                                });
                                break;
                            }
                            case "submit": {
                                if ($("#pfp").val() == hlp.get("pfp", false)) {
                                    $("#pfp").addClass("shake border border-red-300").one("animationend webkitAnimationEnd", function() {
                                        $(this).removeClass("shake border border-red-300");
                                    });
                                } else {
                                    //TODO:
                                }
                            }
                        }
                    })
                    break;
                }


                ////////////////////////////////////////////////////////////



                case "change-name": {
                    $("#overlays").append(`
                        <div id="overlay" class="fixed z-50 overflow-hidden inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                            <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                <div class="bg-zinc-800 rounded-xl max-w-lg px-5 py-5 pointer-events-auto w-[25rem]">
                                    <div class="flex justify-center items-center mb-4">
                                        <h2 class="text-2xl font-bold text-white text-center">Change Name</h2>
                                    </div>
                                    <div class="text-white">
                                        <div class="flex flex-row space-x-2">
                                            <input placeholder="New Name" id="name" value="${hlp.session.firstname} ${hlp.session.lastname}" class="caret-blue-700 flex-1 font-bold bg-zinc-700 mt-1 block w-full px-5 py-4 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                                        </div>
                                        <button id="submit" class="w-full mt-2 px-4 py-2 bg-blue-600 text-white transition font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Done</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).on("click", function (event) {
                        switch ($(event.target).attr("id")) {
                            case "overlay": {
                                if ($("#overlays #overlay").length < 2) {
                                    $("#overlay").fadeOut(400, function () {
                                        $("#overlays").empty();
                                    });
                                } else {
                                    $("#overlays #overlay").each(function () {
                                       $(this).fadeOut(400, function () {
                                            $("#overlays").empty();
                                        });
                                    });
                                }
                                break;
                            }
                            case "submit": {
                                if (($("#name").val().split(" ")[0] == hlp.session.firstname) == true && ($("#name").val().split(" ")[1] == hlp.session.lastname) == true) {
                                    $("#name").addClass("shake border border-red-300").one("animationend webkitAnimationEnd", function() {
                                        $(this).removeClass("shake border border-red-300");
                                    });
                                } else if ($("#name").val().split(" ").length != 2) { //FIXME: Detects space but won't check if second text is empty
                                    $("#name").addClass("shake border border-red-300").one("animationend webkitAnimationEnd", function() {
                                        $(this).removeClass("shake border border-red-300");
                                    });
                                } else {
                                    $("#overlays").off()
                                    $("#overlays").append(`
                                        <div id="overlay" class="fixed z-50 overflow-hidden inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                                            <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                                <div class="bg-zinc-800 rounded-xl max-w-lg px-5 py-5 pointer-events-auto w-[25rem]">
                                                    <div class="flex justify-center items-center mb-4">
                                                        <h2 class="text-2xl font-bold text-white text-center">Are You Sure?</h2>
                                                    </div>
                                                    <div class="text-white flex flex-col">
                                                        <span class="text-center mb-5">Your new name will be seen by everyone, including teachers and staff. There is also a chance that your school doesn't allow name changes. Please consult an administrator if you have concerns about changing your name.</span>
                                                        <div class="flex flex-row gap-5">
                                                            <button id="yes" class="flex-1 mt-2 px-4 py-2 bg-blue-600 text-white transition font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Yes</button>
                                                            <button id="no" class="flex-1 mt-2 px-4 py-2 bg-red-600 text-white transition font-semibold rounded-xl hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50">No</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `).on("click", function (event) {
                                        switch ($(event.target).attr("id")) {
                                            case "overlay": {
                                                $("#overlays #overlay").each(function () {
                                                    $(this).fadeOut(400, function () {
                                                        $("#overlays").empty();
                                                    });
                                                });
                                                break;
                                            }
                                            case "yes": {
                                                //TODO:
                                                break;
                                            }
                                            case "no": {
                                                $("#overlays #overlay").each(function () {
                                                    $(this).fadeOut(400, function () {
                                                        $("#overlays").empty();
                                                    });
                                                });
                                                break;
                                            }
                                        }
                                    })
                                }
                                break;
                            }
                        }
                    })
                }
            }
        })

        $("[goto]").on("click", function (event) {
            window.open($(this).attr("goto"), "_blank")
        })

        let settings = hlp.get("settings");

        $.each(settings, (i, setting) => {
            if (setting.$value) {
                $(`input[setting_name="${setting.setting}"]`).prop("checked", setting.$value)
                $(`input[setting_name="${setting.setting}"]`).parent().find("label div>div").removeClass("translate-x-0").addClass("translate-x-full").parent().removeClass("bg-zinc-600").addClass("bg-blue-700");
            }
        })

        $("#root div[id]:has(input)").on("click", function() {
            if ($(this).find("input").prop("checked"))
                $(this).find("input").prop("checked", "")
            else
                $(this).find("input").prop("checked", "true")


            if ($(this).find("input").prop("checked")) {
                $(this).find("label div>div").removeClass("translate-x-0").addClass("translate-x-full duration-300 ease-in-out").parent().removeClass("bg-zinc-600").addClass("bg-blue-700");
            } else {
                $(this).find("label div div").removeClass("translate-x-full").addClass("translate-x-0 duration-300 ease-in-out").parent().removeClass("bg-blue-700").addClass("bg-zinc-600");
            }

            if (!hlp.string(settings).includes($(this).find("input").attr("setting_name"))) {
                settings.push({
                    setting: $(this).find("input").attr("setting_name"),
                    $value:  $(this).find("input").prop("checked")
                })

                hlp.set("settings", settings);
            } else {
                settings.find(name => name.setting.includes($(this).find("input").attr("setting_name"))).$value = $(this).find("input").prop("checked")
                hlp.set("settings", settings);
            }
        });

        hlp.animate_nav();
    })
}