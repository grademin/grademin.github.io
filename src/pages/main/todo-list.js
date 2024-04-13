export async function run() {
    const hlp = await import("../../helpers.js"),
          site = await import("../../site.js");

    // TODO: clean
          
    hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="${hlp.theme("bg", "700")} text-white">
                <div class="fixed left-0 right-0 top-0 z-20 flex flex-row ${hlp.theme("bg", "700")}">
                    <div class="flex justify-center items-center container mx-auto py-2 px-4">
                        <div id="go-back" class="-ml-2 cursor-pointer py-3 px-6 rounded-full active:bg-white active:bg-opacity-20 active:shadow-lg">
                            <span class="w-0 -ml-[1px] font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                arrow_back_ios_new
                            </span>
                        </div>
                        <span class="flex-grow font-bold text-center text-[22px]">Todo List</span>
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
                <div id="todo-list" class="flex flex-col gap-5"></div>
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
                case "go-back": {
                    history.pushState({}, "", `?page=overview`);
                    await site.runtime("overview");
                    break;
                }

                case "reload": {
                    hlp.load(async function () {
                        await call();
                    })
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
            let duesoon = await $.ajax({
                url: hlp.api(`/cmd/getduesoonlist?_token=${hlp.session.token}&days=3&userId=${hlp.session.id}&utcoffset=300`),
                method: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            })

            duesoon.response.items.item.sort((a, b) => new Date(b.duedate) - new Date(a.duedate));

            $("#todo-list").empty();
            $.each(duesoon.response.items.item, (i, due) => {
                $("#todo-list").append(`
                    <div class="relative flex flex-row justify-between container mx-auto ${hlp.theme("theme-card")} rounded-xl py-3 px-3">
                        <div class="flex flex-row justify-center items-center gap-5 pointer-events-none w-full">
                            <div class="flex flex-col w-full">
                                <h1 class="text-[18px] sm:text-[22px] w-[10ch] xl-sm:w-[23ch] x-sm:w-[30ch] sm:w-full truncate font-bold">${due.title}</h1>
                                <span class="font-bold text-[15px] text-zinc-400 border-b-[2px] border-zinc-700 pb-3">Assigned by ${due.entity.title}</span>
                                <span class="font-bold text-[15px] text-zinc-400 pt-3">${(() => {
                                    // I actually never knew you could use functions in ${}, thanks gpt? i guess.
                                    let getdue = new Date(due.duedate);
                                    let today = new Date();
                                    today.setHours(0, 0, 0, 0);

                                    let tomorrow = new Date(today);
                                    tomorrow.setDate(tomorrow.getDate() + 1);

                                    if (getdue < today) {
                                        return `Past Due: ${getdue.toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})}`;
                                    } else if (getdue.toDateString() === today.toDateString()) {
                                        return "Due: Today";
                                    } else if (getdue.toDateString() === tomorrow.toDateString()) {
                                        return `Due: ${tomorrow.toLocaleDateString(undefined, {weekday: "long"})}`;
                                    } else {
                                        return `Due: ${getdue.toLocaleDateString(undefined, {weekday: "long", year: "numeric", month: "long", day: "numeric"})}`;
                                    }
                                })()}</span>
                            </div>
                        </div>
                    </div>
                `);
            })
        }

        await call();
    });
};