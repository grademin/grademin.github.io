export async function run() {
    const hlp = await import("../helpers.js"),
          site = await import("../site.js");

    let remembered = "", hide = "";
    if (hlp.get("remembered") != "") {
        hide = "hidden";
        remembered = `
        <div class="mb-5 block w-full px-5 py-4 border-4 border-blue-700 rounded-xl shadow-sm focus:outline-none sm:text-sm">
            <div class="flex flex-row gap-5 items-center">
                <div class="flex justify-between items-center">
                    <div class="rounded-full border-[6px] border-blue-500 bg-blue-600 ${hlp.get("pfp", false).includes("gravatar") ? "" : `bg-[url('${hlp.get("pfp", false)}')] bg-cover`} h-16 w-16 flex items-center justify-center text-2xl sm:text-2xl font-bold uppercase">
                        ${hlp.get("pfp", false).includes("gravatar") ? hlp.get("remembered", true).firstname.charAt(0).toUpperCase() : ""}
                    </div>                    
                </div>
                <div class="flex flex-col">
                    <h1 class="font-black leading-wider tracking-tight text-2xl">${hlp.get("remembered").fullname}</h1>
                    <span class="font-bold text-[18px] text-zinc-400">${hlp.get("remembered").username}</span>    
                </div>
            </div>
        </div>
        `;
    };


    ////////////////////////////////////////////////////////////

    
    $("#root").html(`
        <div class="relative h-[75svh] h-[75vh] flex justify-center">
            <div class="pt-20 rounded-lg container mx-auto px-4">
                <div class="flex flex-col mb-10">
                    <h2 class="text-7xl -m-1 tracking-tight leading-wider font-black text-blue-700">Proview</h2>
                    <span class="text-2xl tracking-wide font-bold">Log In</span>
                </div>
                <div class="flex flex-col justify-between h-[65vh] h-[65svh]">
                    <div>
                        ${remembered}
                        <div class="flex mb-4 space-x-2 ${hide}">
                            <div class="flex-1">
                                <input style="background: transparent;" placeholder="District / Website" type="text" id="district" class="caret-blue-700 font-bold mt-1 block w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                            </div>
                            <div class="flex-1">
                                <input style="background: transparent;" placeholder="Username" type="text" id="username" class="caret-blue-700 font-bold mt-1 block w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                            </div>
                        </div>
                        <div class="mb-6">
                            <input style="background: transparent;" placeholder="Password" type="password" id="password" class="caret-blue-700 font-bold mt-1 block w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                        </div>
                    </div>
                    <div class="container mx-auto">
                        <button id="submit" class="w-full px-4 py-3 bg-blue-700 transition text-white font-semibold rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Log in</button>
                    </div>        
                </div>
            </div>
        </div>
    `).on("click", async function (event) {
        event.preventDefault();
        
        if ($(event.target).attr("id") == "submit") {
            if ((($("#district").val() != "" && $("#username").val() != "" && $("#password").val() != "") && hlp.get("remembered") == undefined) || $("#password").val() != "" && hlp.get("remembered") != undefined) {
                hlp.load(async function () {
                    // Clense affected elements
                    $("#district, #username, #password").removeClass("shake border-red-300");

                    let district = hlp.get("remembered") == "" ? $("#district").val() : hlp.get("remembered").userspace;
                    if (district.includes("//"))
                        district = district.replace(/^https?:\/\//, "").split(".")[0];
                    
                    await $.ajax({
                        url: hlp.api("/cmd"),
                        method: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: hlp.string({"request": {
                            cmd: "login3",
                            expireseconds: "-999",
                            username: `${district}/${hlp.get("remembered") == "" ? $("#username").val() : hlp.get("remembered").username}`,
                            password: $("#password").val()
                        }}),
                        success: async (login3) => {
                            if (login3.response.code != "OK") {
                                await $("#district, #username, #password").addClass("shake").addClass("border-red-300");
                            } else {
                                delete login3.response.code;
                                login3.response.token = login3.response.user.token;
                                delete login3.response.user.token;
                                login3.response.user.fullname = `${login3.response.user.firstname.charAt(0).toUpperCase() + login3.response.user.firstname.slice(1)} ${login3.response.user.lastname.charAt(0).toUpperCase() + login3.response.user.lastname.slice(1)}`;

                                // This localStorage item adds details so when you logout you can easily log back in
                                hlp.set("remembered", {
                                    "username": login3.response.user.username,
                                    "userspace": login3.response.user.userspace,
                                    "firstname": login3.response.user.firstname,
                                    "lastname": login3.response.user.lastname,
                                    "fullname": login3.response.user.fullname
                                })

                                hlp.set("session", login3.response);

                                // Get users profile picture (if none is found then we set this as "")
                                await hlp.image_valid(hlp.api(`/cmd/getprofilepicture?_token=${login3.response.token}&entityid=${login3.response.user.userid}`), async function (url, valid) {
                                    if (valid) {
                                        await hlp.url_redirects(url, async function (newUrl, redirected) {
                                            hlp.set("pfp", newUrl, false);
                                            clearInterval(check);
                                        })
                                    } else {
                                        hlp.set("pfp", "gravatar", false)
                                    }
                                });


                                await site.runtime("overview");
                            }
                        }
                    });
                });
            }
        }
    });
};