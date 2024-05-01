export async function run() {
    const hlp = await import("../helpers.js");
    const site = await import("../site.js");

    let saved = ["", false];
    if (hlp.get("saved") != undefined) {
        saved[1] = true;
        saved[0] = `
            <div class="mb-5 block w-full px-5 py-4 border-4 ${hlp.gettheme("border", "700")} rounded-xl shadow-sm focus:outline-none sm:text-sm">
                <div class="flex flex-row gap-5 items-center">
                    <div class="flex justify-between items-center">
                        <div class="rounded-full border-[6px] ${hlp.gettheme("border", "500")} ${hlp.gettheme("bg", "600")} ${!hlp.get("pfp").includes("data:") ? "" : `bg-[url('${hlp.get("pfp")}')] bg-cover bg-no-repeat bg-center`} h-16 w-16 flex items-center justify-center text-2xl sm:text-2xl font-bold uppercase">
                            ${!hlp.get("pfp").includes("data:") ? hlp.get("saved").fullname.charAt(0).toUpperCase() : ""}
                        </div>                    
                    </div>
                    <div class="flex flex-col">
                        <h1 class="font-black leading-wider tracking-tight text-2xl">${hlp.get("saved").fullname}</h1>
                        <span class="font-bold text-[18px] text-zinc-400">${hlp.get("saved").username}</span>    
                    </div>
                </div>
            </div>
        `;
    }

    $("#root").html(`
        <div class="relative h-[75svh] h-[75vh] flex justify-center">
            <div class="pt-20 rounded-lg container mx-auto px-4">
                <div class="flex flex-col mb-10">
                    <h2 class="text-7xl -m-1 tracking-tight leading-wider font-black ${hlp.gettheme("text", "700")}">Gradpass</h2>
                    <span class="text-2xl tracking-wide font-bold">Log In</span>
                </div>
                <form action="" class="flex flex-col justify-between h-full">
                    <div>
                        ${saved[0]}
                        ${!saved[1] ? `
                        <div class="flex mb-4 space-x-2">
                            <div class="flex-1">
                                <input style="background: transparent;" placeholder="District / Website" type="text" id="district" class="${hlp.gettheme("caret", "700")} placeholder:${hlp.gettheme("theme-text")} font-bold mt-1 block w-full px-5 py-4 border border-[2px] border-zinc-700 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                            </div>
                            <div class="flex-1">
                                <input style="background: transparent;" placeholder="Username" type="text" id="username" class="${hlp.gettheme("caret", "700")} placeholder:${hlp.gettheme("theme-text")} font-bold mt-1 block w-full px-5 py-4 border border-[2px] border-zinc-700 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                            </div>
                        </div>
                        ` : ""}
                        <div class="mb-6">
                            <input style="background: transparent;" placeholder="Password" type="password" id="password" class="${hlp.gettheme("caret", "700")} placeholder:${hlp.gettheme("theme-text")} font-bold mt-1 block w-full px-5 py-4 border border-[2px] border-zinc-700 rounded-xl shadow-sm focus:outline-none sm:text-sm">
                        </div>
                    </div>
                    <div class="container mx-auto">
                        <button id="submit" type="submit" class="w-full px-4 py-3 ${hlp.gettheme("bg", "700")} hover:${hlp.gettheme("bg", "500")} transition text-white font-bold rounded-xl">Log in</button>
                    </div>        
                </form>
            </div>
        </div>
    `).find("form").submit(function (e) {
        e.preventDefault();
        
        if ((($("#district").val() != "" && $("#username").val() != "" && $("#password").val() != "") && hlp.get("remembered") == undefined) || $("#password").val() != "" && hlp.get("remembered") != undefined) {
            hlp.load(async function () {

                // Clense affected elements.
                $("#district, #username, #password").removeClass("shake border-red-300");

                // Determine the district.
                let district = hlp.get("saved") == undefined ? $("#district").val() : hlp.get("saved").userspace;
                if (district.includes("//"))
                    district = district.replace(/^https?:\/\//, "").split(".")[0];
                
                let login3 = await $.ajax({
                    url: hlp.api("/cmd"),
                    method: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: hlp.stringify({"request": {
                        cmd: "login3",
                        expireseconds: "-999",
                        username: `${district}/${hlp.get("saved") == undefined ? $("#username").val() : hlp.get("saved").username}`,
                        password: $("#password").val()
                    }}),
                });

                if (login3.response.code != "OK") {
                    await $("#district, #username, #password").addClass("shake").addClass("border-red-300");
                } else {
                    delete login3.response.code;
                    login3.response.token = login3.response.user.token;
                    delete login3.response.user.token;
                    
                    if (hlp.get("saved") == undefined) {
                        login3.response.user.fullname = `${login3.response.user.firstname.charAt(0).toUpperCase() + login3.response.user.firstname.slice(1)} ${login3.response.user.lastname.charAt(0).toUpperCase() + login3.response.user.lastname.slice(1)}`;
                        
                        // This localStorage item adds details so when you logout you can easily log back in.
                        hlp.set("saved", {
                            "username": login3.response.user.username,
                            "userspace": login3.response.user.userspace,
                            "firstname": login3.response.user.firstname,
                            "lastname": login3.response.user.lastname,
                            "fullname": login3.response.user.fullname
                        })
                        hlp.set("session", login3.response);
                    } else {
                        login3.response.user.firstname = hlp.get("saved").firstname;
                        login3.response.user.lastname = hlp.get("saved").lastname;
                        login3.response.user.fullname = hlp.get("saved").fullname;
                    
                        hlp.set("session", login3.response);
                    }

                    await site.runtime("overview");
                }
            });
        }
    })
}