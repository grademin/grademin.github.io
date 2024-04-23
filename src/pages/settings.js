export async function run() {
    "use strict";
    
    const hlp = await import("../helpers.js");
    const site = await import("../site.js");

    await hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="${hlp.theme("bg", "700")} text-white">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row ${hlp.theme("bg", "700")}">
                    <div id="scrolled-title" class="flex justify-center items-center container mx-auto py-2 px-4 h-[60px]">
                        <div class="invisible -ml-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
                            <span class="w-0 -ml-[1px] font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                arrow_back_ios_new
                            </span>
                        </div>
                        <span class="flex-grow font-bold text-center text-[22px] hidden">Settings</span>
                        <div class="invisible -mr-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
                            <span class="w-0 font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                refresh
                            </span>
                        </div>
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
            <div class="flex flex-col gap-5 pt-[1.1rem] mb-[1.8rem] container mx-auto py-10 px-4">
                <div id="settings" class="flex flex-col gap-5">
                    <div class="flex flex-col justify-center items-center container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                        <div class="flex justify-between items-center">
                            <div class="relative text-white rounded-full border-[6px] ${hlp.theme("border", "500")} ${hlp.theme("bg", "600")} ${hlp.get("pfp", false).length == 0 ? "" : `bg-[url('${hlp.get("pfp", false)}')] bg-cover`} h-20 w-20 flex items-center justify-center text-2xl sm:text-2xl font-bold uppercase">
                                <span class="z-1">${hlp.get("pfp", false).length == 0 ? hlp.session.firstname.charAt(0).toUpperCase() : ""}</span>
                            </div>
                        </div>
                        <h1 class="text-[28px] font-bold">${hlp.session.fullname}</h1>
                        <div class="flex flex-row w-full mt-5 gap-5">
                            <div class="flex-1">
                                <button id="change-name" class="w-full px-4 py-3 ${hlp.theme("bg", "700")} text-white transition font-semibold rounded-xl hover:${hlp.theme("bg", "500")} focus:outline-none focus:ring-2 focus:${hlp.theme("ring", "700")} focus:ring-opacity-50">Change Name</button>
                            </div>
                            <div class="flex-1">
                                <button id="change-pfp" class="w-full px-4 py-3 ${hlp.theme("bg", "700")} text-white transition font-semibold rounded-xl hover:${hlp.theme("bg", "500")} focus:outline-none focus:ring-2 focus:${hlp.theme("ring", "700")} focus:ring-opacity-50">Change Picture</button>
                            </div>
                        </div>
                    </div>
                    <!---->
                    <!---->
                    <div class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">
                        <div id="theme-color" class="flex flex-row justify-between container mx-auto cursor-pointer py-3 border-b-[2px] border-zinc-700">
                            <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                                <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-2 py-1 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded text-white">
                                        colors
                                    </span>
                                </div>
                                <div class="flex flex-col items-center">
                                    <h1 class="text-[20px] font-bold">Theme Color</h1>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <span class="material-symbols-rounded">
                                    arrow_forward_ios
                                </span>
                            </div>
                        </div>
                        <!---->
                        <div id="hide-courses" class="flex flex-row justify-between container mx-auto cursor-pointer py-3">
                            <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                                <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-2 py-1 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded text-white">
                                        visibility_off
                                    </span>
                                </div>
                                <div class="flex flex-col items-center">
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
                    <div class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">
                        <div id="chip-indicators" class="flex flex-row justify-between container mx-auto cursor-pointer py-3 border-b-[2px] border-zinc-700">
                            <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                                <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-2 py-1 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded text-white">
                                        notifications
                                    </span>
                                </div>
                                <div class="flex flex-col items-center">
                                    <h1 class="text-[20px] font-bold">Visual Chip Indicators</h1>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <input option="chip-indicators" type="checkbox" class="hidden">
                                <label class="flex items-center cursor-pointer">
                                    <div class="w-[3.7rem] h-[33px] ${hlp.theme("theme-toggle")} rounded-full p-1">
                                        <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <!---->
                        <div id="include-self" class="flex flex-row justify-between container mx-auto cursor-pointer py-3 border-b-[2px] border-zinc-700">
                                <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                                    <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-2 py-1 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded text-white">
                                        group_add
                                    </span>
                                </div>
                                <div class="flex flex-col items-center">
                                    <h1 class="text-[20px] font-bold">Include Self Activities</h1>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <input option="include-self" type="checkbox" class="hidden">
                                <label class="flex items-center cursor-pointer">
                                    <div class="w-[3.7rem] h-[33px] ${hlp.theme("theme-toggle")} rounded-full p-1">
                                        <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <!---->
                        <div id="hide-excused" class="flex flex-row justify-between container mx-auto cursor-pointer py-3">
                            <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                                <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-2 py-1 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded text-white">
                                        hide_image
                                    </span>
                                </div>
                                <div class="flex flex-col items-center">
                                    <h1 class="text-[20px] font-bold">Hide Excused Activities</h1>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <input option="hide-excused" type="checkbox" class="hidden">
                                <label class="flex items-center cursor-pointer">
                                    <div class="w-[3.7rem] h-[33px] ${hlp.theme("theme-toggle")} rounded-full p-1">
                                        <div class="bg-white w-[25px] h-[25px] rounded-full shadow-md transform translate-x-0"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <!---->
                    <div class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">
                        <div id="manage-account" class="flex flex-row justify-between container mx-auto cursor-pointer py-3 border-b-[2px] border-zinc-700">
                                <div class="flex flex-row justify-center items-center gap-4 pointer-events-none leading-none">
                                    <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-2 py-1 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded text-white">
                                        person
                                    </span>
                                </div>
                                <div class="flex flex-col items-center">
                                    <h1 class="text-[20px] font-bold">Manage Account</h1>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <span class="material-symbols-rounded">
                                    arrow_forward_ios
                                </span>
                            </div>
                        </div>
                        <!---->
                        <div id="help-center" class="flex flex-row justify-between container mx-auto cursor-pointer py-3">
                            <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                                <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-2 py-1 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded text-white">
                                        support_agent
                                    </span>
                                </div>
                                <div class="flex flex-col items-center">
                                    <h1 class="text-[20px] font-bold">Help Center</h1>
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
                    <div class="flex flex-col container mx-auto ${hlp.theme("theme-card")} rounded-xl px-3">
                        <div goto="https://github.com/wo-r-professional/proview" class="flex flex-row justify-between container mx-auto cursor-pointer py-3 border-b-[2px] border-zinc-700">
                            <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                                <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-2 py-1 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded text-white">
                                        verified
                                    </span>
                                </div>
                                <div class="flex flex-col items-center">
                                    <h1 class="text-[20px] font-bold">Proview</h1>
                                </div>
                            </div>
                            <div class="flex justify-center items-center">
                                <span class="text-3xl material-symbols-rounded -rotate-45">
                                    link
                                </span>
                            </div>
                        </div>
                        <!---->
                        <div goto="https://github.com/wo-r-professional/echo-plus" class="flex flex-row justify-between container mx-auto cursor-pointer py-3">
                            <div class="flex flex-row justify-center items-center gap-4 pointer-events-none">
                                <div class="flex justify-center items-center ${hlp.theme("bg", "700")} px-2 py-1 rounded-2xl">
                                    <span class="text-3xl material-symbols-rounded text-white">
                                        add_task
                                    </span>
                                </div>
                                <div class="flex flex-col items-center">
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
                    <button id="logout" class="w-full px-4 ${hlp.theme("theme-shadow")} py-3 bg-red-600 text-white transition font-semibold rounded-xl hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50">Logout</button>
                    <!---->
                    <div class="flex flex-col justify-center items-center align-center">
                        <span class="text-sm font-bold">Proview v${hlp.version}</span>
                        <span class="text-sm font-bold">&copy; ${new Date().getFullYear()} Wo-r, Design from <a class="${hlp.theme("text", "700")} hover:${hlp.theme("text", "600")} cursor-pointer transition" goto="https://gradeway.github.io/">Srujan Mupparapu</a></span>
                        <span class="text-xs font-bold text-zinc-400">Created for the betterment of Echo</span>
                    </div>    
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
                            <span class="text-[30px] font-black ${hlp.theme("text", "700")} pointer-events-none material-symbols-rounded">
                                settings
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        `).off().on("click", async function (e) {
            switch ($(e.target).attr("id")) {
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
                            success: async function () {
                                hlp.remove("session");
                                await site.runtime("login");
                            }
                        })
                    })
                    break;
                }



                case "theme-color": {
                    site.runtime("theme-color");
                    break;
                }

                case "hide-courses": {
                    site.runtime("hide-courses");
                    break;
                }

                case "manage-account": {
                    site.runtime("manage-account");
                    break;
                }

                case "help-center": {
                    site.runtime("help-center");
                    break;
                }



                case "change-pfp": {
                    $("body").addClass("overflow-hidden");
                    await $("#overlays").append(`
                        <div id="overlay" class="fixed inset-0 bg-gray-900 z-50 bg-opacity-50 flex justify-center items-center animation-fadein">
                            <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                <div class="${hlp.theme("theme-card")} ${hlp.theme("theme-text")} rounded-xl max-w-lg px-5 py-5 pointer-events-auto w-[25rem]">
                                    <div class="flex justify-center items-center mb-4">
                                        <h2 class="text-2xl font-bold   text-center">Change Profile Picture</h2>
                                    </div>
                                    <div>
                                        <input placeholder="New Profile Picture" id="pfp" value="${hlp.get("pfp", false).length == 0 ? "" : hlp.get("pfp", false)}" class="${hlp.theme("caret", "700")} font-bold ${hlp.theme("theme-input")} mt-1 block w-full px-5 py-4 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                                        <button id="submit-pfp" class="w-full mt-2 px-4 py-2 ${hlp.theme("bg", "600")} text-white transition font-semibold rounded-xl hover:${hlp.theme("bg", "500")} focus:outline-none focus:ring-2 focus:${hlp.theme("ring", "700")} focus:ring-opacity-50">Done</button>
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
                            case "submit-pfp": {
                                if ($("#pfp").val() == hlp.get("pfp", false)) {
                                    $("#pfp").addClass("shake border border-red-300").one("animationend webkitAnimationEnd", function() {
                                        $(this).removeClass("shake border border-red-300");
                                    });
                                } else {
                                    hlp.set("pfp", $("#pfp").val(), false);

                                    $("#overlays").empty();
                                    $("body").removeClass("overflow-hidden");

                                    site.runtime("settings");
                                }
                                break;
                            }
                        }
                    })
                    break;
                }

                case "change-name": {
                    $("body").addClass("overflow-hidden");
                    await $("#overlays").append(`
                        <div id="overlay" class="fixed z-50 overflow-hidden inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                            <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                                <div class="${hlp.theme("theme-card")} ${hlp.theme("theme-text")} rounded-xl max-w-lg px-5 py-5 pointer-events-auto w-[25rem]">
                                    <div class="flex justify-center items-center mb-4">
                                        <h2 class="text-2xl font-bold text-center">Change Name</h2>
                                    </div>
                                    <div>
                                        <div class="flex flex-row space-x-2">
                                            <input placeholder="New Name" id="name" value="${hlp.session.firstname} ${hlp.session.lastname}" class="${hlp.theme("caret", "700")} flex-1 font-bold ${hlp.theme("theme-input")} mt-1 block w-full px-5 py-4 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                                        </div>
                                        <button id="submit-name" class="w-full mt-2 px-4 py-2 ${hlp.theme("bg", "600")} text-white transition font-semibold rounded-xl hover:${hlp.theme("bg", "500")} focus:outline-none focus:ring-2 focus:${hlp.theme("ring", "700")} focus:ring-opacity-50">Done</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).off().on("click", function (e) {
                        switch ($(e.target).attr("id")) {
                            case "overlay": {
                                $("#overlay").fadeOut(400, function () {
                                    $("#overlays").empty();
                                });
                                $("body").removeClass("overflow-hidden");
                                break;
                            }
                            case "submit-name": {
                                // TODO: login will reset this, make it so login ignores if this is active
                                if ($("#name").val().split(" ").length == 2 && $("#name").val().length != 0) {
                                    if ($("#name").val() != `${hlp.session.firstname} ${hlp.session.lastname}`) {
                                        let remembered = hlp.get("remembered");
                                        let session = hlp.get("session");
                                        remembered.firstname = $("#name").val().split(" ")[0];
                                        session.user.firstname = $("#name").val().split(" ")[0];
                                        remembered.lastname = $("#name").val().split(" ")[1];
                                        session.user.lastname = $("#name").val().split(" ")[1];
                                        remembered.fullname = `${$("#name").val().split(" ")[0].charAt(0).toUpperCase() + $("#name").val().split(" ")[0].slice(1)} ${$("#name").val().split(" ")[1].charAt(0).toUpperCase() + $("#name").val().split(" ")[1].slice(1)}`
                                        session.user.fullname = `${$("#name").val().split(" ")[0].charAt(0).toUpperCase() + $("#name").val().split(" ")[0].slice(1)} ${$("#name").val().split(" ")[1].charAt(0).toUpperCase() + $("#name").val().split(" ")[1].slice(1)}`
                                        hlp.set("remembered", remembered)
                                        hlp.set("session", session)

                                        $("#overlays").empty();
                                        $("body").removeClass("overflow-hidden");

                                        site.runtime("settings");
                                    } else {
                                        $("#name").addClass("shake border border-red-300").one("animationend webkitAnimationEnd", function() {
                                            $(this).removeClass("shake border border-red-300");
                                        });
                                    }
                                } else {
                                    $("#name").addClass("shake border border-red-300").one("animationend webkitAnimationEnd", function() {
                                        $(this).removeClass("shake border border-red-300");
                                    });
                                }
                                break;
                            }
                        }
                    })
                    break;
                }

                

                case "calendar": {
                    site.runtime("calendar");
                    break;
                }

                case "overview": {
                    site.runtime("overview");
                    break;
                }
            }
        })

        $("[goto]").on("click", function (event) {
            window.open($(this).attr("goto"), "_blank")
        })


        let settings = hlp.get("settings");

        await $.each(settings, (i, setting) => {
            if (setting.$value) {
                $(`input[option="${setting.setting}"]`).prop("checked", setting.$value)
                $(`input[option="${setting.setting}"]`).parent().find("label div div").removeClass("translate-x-0").addClass("translate-x-full").parent().removeClass(`${hlp.theme("theme-toggle")}`).addClass(`${hlp.theme("bg", "700")}`);
            }
        })

        $("#root #settings div[id]:has(input)").on("click", function() {
            if ($(this).find("input").prop("checked"))
                $(this).find("input").prop("checked", "")
            else
                $(this).find("input").prop("checked", "true")


            if ($(this).find("input").prop("checked")) {
                $(this).find("label div div").removeClass("translate-x-0").addClass("translate-x-full duration-300 ease-in-out").parent().removeClass(`${hlp.theme("theme-toggle")}`).addClass(`${hlp.theme("bg", "700")}`);
            } else {
                $(this).find("label div div").removeClass("translate-x-full").addClass("translate-x-0 duration-300 ease-in-out").parent().removeClass(`${hlp.theme("bg", "700")}`).addClass(`${hlp.theme("theme-toggle")}`);
            }

            if (!hlp.string(settings).includes($(this).find("input").attr("option"))) {
                settings.push({
                    setting: $(this).find("input").attr("option"),
                    $value:  $(this).find("input").prop("checked")
                })

                hlp.set("settings", settings);
            } else {
                settings.find(name => name.setting.includes($(this).find("input").attr("option"))).$value = $(this).find("input").prop("checked")
                hlp.set("settings", settings);
            }
        });

        hlp.animate_nav();
    })
}