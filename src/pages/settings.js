export async function run() {
    const hlp = await import("../helpers.js"),
          site = await import("../site.js");

    hlp.load(async function () {
        await $("#root").html(`
            <div id="top" class="fixed top-0 left-0 right-0 z-50">
                <div class="fixed left-0 right-0 top-0 z-20 h-[46px] flex flex-row py-2 px-4 bg-blue-700">
                    <div class="flex justify-center items-center container mx-auto px-4">
                        <div></div>
                        <span class="flex-grow font-bold text-center text-[20px]">Settings</span>
                        <div></div>
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
    })
}