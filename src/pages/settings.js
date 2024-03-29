export async function run() {
    const hlp = await import("../helpers.js"),
          site = await import("../site.js");

    hlp.load(async function () {
        await $("#root").html(`
            <div id="topnav" class="fixed top-0 left-0 right-0 hidden z-50">
                <div class="flex flex-row py-2 px-4 bg-blue-700">
                    <div class="flex justify-center items-center container mx-auto px-4">
                        <span class="font-black text-[20px]">Overview</span>
                    </div>
                </div>
            </div>
            <div id="toptitle" class="bg-blue-700">
                <div class="flex flex-row gap-10 justify-between container mx-auto py-10 px-4">
                    <div class="flex flex-col gap-1 justify-center">
                        <h1 class="text-5xl font-bold tracking-tight mb-0">Overview</h1>
                        <div class="text-[20px] font-bold">${new Date().toLocaleString("default", { month: "long" })} ${new Date().getDate()}, ${new Date().getFullYear()}</div>    
                    </div>
                    <div class="flex justify-between items-end cursor-pointer">
                        <div id="profile" class="rounded-full transition bg-blue-600 ${hlp.get("pfp", false).includes("gravatar") ? "" : `bg-[url('${hlp.get("pfp", false)}')] bg-cover`} border-[6px] hover:border-blue-400 active:border-blue-600 border-blue-500 h-[4.5rem] w-[4.5rem] flex items-center justify-center text-2xl font-bold uppercase">
                            ${hlp.get("pfp", false).includes("gravatar") ? hlp.session.firstname.charAt(0).toUpperCase() : ""}
                        </div>                    
                    </div>
                </div>
            </div>
            <!---->
            <!---->
            <div class="flex flex-col gap-5 pt-10 mb-10 container mx-auto py-10 px-4">
                <button id="logout" class="w-full px-4 py-2 bg-red-600 text-white transition font-semibold rounded-xl hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50">Logout</button>
            </div>    
            <!---->
            <!---->
            <div id="bottomnav" class="fixed bottom-0 left-0 right-0">
                <div class="bg-zinc-800">
                    <div class="flex flex-row justify-between items-center">
                        <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="font-black text-blue-700 pointer-events-none material-symbols-rounded">
                                home
                            </span>
                        </a>
                        <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="material-symbols-rounded">
                                calendar_month
                            </span>
                        </a>
                        <a class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="font-black pointer-events-none material-symbols-rounded">
                                description
                            </span>
                        </a>
                        <a id="profile" class="cursor-pointer flex justify-center items-center py-3 w-full">
                            <span class="font-black pointer-events-none material-symbols-rounded">
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
                }
            }
        })

        hlp.animate_nav();
    })
}