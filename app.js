(async function () {
    "use strict";

    
    // inital


    const api = (_t) => { return `https://api.agilixbuzz.com${_t}` };


    // When the user has logged in, or the user somehow removed `ul`, this will make sure they
    // end up on some sort of default page.
    if (localStorage.getItem("ul") == undefined && localStorage.getItem("session") != undefined)
        localStorage.setItem("ul", "courses");

    // If `session` or `ul` are undefined, then set page to login.
    if (localStorage.getItem("ul") == undefined || (localStorage.getItem("ul") != undefined && localStorage.getItem("session") == undefined))
        localStorage.setItem("ul", "login")
    

    await runtime(localStorage.getItem("ul"));


    /**
     * Handles every section of Proview.
     */
    async function runtime(ul) {
        document.title = `${ul.charAt(0).toUpperCase() + ul.slice(1)}`;

        localStorage.setItem("ul", ul);
        $("#root").attr("ul", ul);

        // bases
        $("#overlays").empty();

        // Switch between each page
        switch (ul) {
        case "login": // First page that anyone sees
            await $("#root").html(`
                <div class="h-screen flex justify-center items-center">
                    <div class="bg-white p-8 rounded-lg shadow-md w-96">
                        <h2 class="text-2xl font-bold mb-8 text-gray-800 text-center">Login</h2>
                        <form>
                            <div class="flex mb-4 space-x-2">
                                <div class="flex-1">
                                    <label for="userspace" class="block text-sm font-medium text-gray-700">District</label>
                                    <input placeholder="district / website" type="text" id="district" name="userspace" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black">
                                </div>
                                <div class="flex-1">
                                    <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                                    <input type="text" id="username" name="username" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black">
                                </div>
                            </div>
                            <div class="mb-6">
                                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" id="password" name="password" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black">
                            </div>
                            <button type="submit" class="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Log in</button>
                        </form>
                    </div>
                </div>
            `).submit(async function (event) {
                event.preventDefault();

                if ($("#district").val() != "" && $("#username").val() != "" && $("#password") != "") {
                    $("head").append(`
                        <style>
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                            
                            .loader {
                                border: 4px solid rgba(255, 255, 255, 0.3);
                                border-top: 4px solid #fff;
                                border-radius: 50%;
                                width: 24px;
                                height: 24px;
                                animation: spin 1s linear infinite;
                            }
                        </style>
                        <style>
                            @keyframes shake {
                                0% { transform: translateX(0); }
                                25% { transform: translateX(-8px); }
                                50% { transform: translateX(8px); }
                                75% { transform: translateX(-4px); }
                                100% { transform: translateX(0); }
                            }
                            
                            .shake {
                                animation: shake 0.5s ease-in-out;
                            }
                        </style>
                    `);

                    $("#overlays").append(`
                        <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                            <div class="loader"></div>
                        </div>
                    `)

                    $("#district, #username, #password").removeClass("shake").removeClass("border-red-300");

                    let district = $("#district").val()
                    if (district.includes("//"))
                        district = district.replace(/^https?:\/\//, "").split(".")[0];

                    await $.ajax({
                        url: api("/cmd"),
                        method: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({"request": {
                            cmd: "login3",
                            expireseconds: "-999",
                            username: `${district}/${$("#username").val()}`,
                            password: $("#password").val()
                        }}),
                        success: async (login3) => {
                            console.log(login3)
                            if (login3.response.code != "OK") {
                                $("#overlays").empty();
                                await $("#district, #username, #password").addClass("shake").addClass("border-red-300");
                            } else {
                                delete login3.response.code;
                                login3.response.token = login3.response.user.token;
                                delete login3.response.user.token;

                                localStorage.setItem("session", JSON.stringify(login3.response));
                                runtime("courses")
                            }
                        }
                    });
                }
            })
            break;
        case "courses": // If you login, this is where you end up
            $("head").append(`
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    .loader {
                        border: 4px solid rgba(255, 255, 255, 0.3);
                        border-top: 4px solid #fff;
                        border-radius: 50%;
                        width: 24px;
                        height: 24px;
                        animation: spin 1s linear infinite;
                    }
                </style>
            `)

            $("#overlays").append(`
                <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div class="loader"></div>
                </div>
            `);

            await $("#root").html(`
                <div class="flex flex-col justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-4xl my-20">Courses</div>

                    <div id="courses" class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"></div>
                </div>
            `)


            // Get courses & append


            // Get course order
            await $.ajax({
                url: api(`/cmd/getresource?_token=${JSON.parse(localStorage.getItem("session")).token}&entityid=${JSON.parse(localStorage.getItem("session")).user.userid}&path=Assets%2FBuzzCourseCardSettings.json`),
                method: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: async function (orders) {
                    // Get courses
                    await $.ajax({
                        url: api(`/cmd/listuserenrollments?_token=${JSON.parse(localStorage.getItem("session")).token}&userid=${JSON.parse(localStorage.getItem("session")).user.userid}&privileges=1&select=data,course,course.data,course.teachers,metrics`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: async function (courses) {
                            let userlist = [];
                            await $.each(courses.response.enrollments.enrollment, function (i, course) {
                                userlist.push({
                                    order: orders[course.id].order,
                                    id: course.id,
                                    courseid: course.courseid,
                                    title: course.course.title.trim(),
                                    start: (new Date(course.course.startdate).getMonth() + 1) + '/' + (new Date(course.course.startdate).getDate()) + '/' + (new Date(course.course.startdate).getFullYear() % 100),
                                    end: (new Date(course.course.enddate).getMonth() + 1) + '/' + (new Date(course.course.enddate).getDate()) + '/' + (new Date(course.course.enddate).getFullYear() % 100),
                                    scored: Math.round((course.enrollmentmetrics.achieved / course.enrollmentmetrics.possible) * 100)
                                })
                            })


                            // Sort and append
                            userlist = userlist.sort((first, last) => first.order - last.order);
                            await $.each(userlist, function (i, course) {
                                let score_color;
                            
                                if (isNaN(course.scored))
                                    score_color = "";
                                else if (course.scored >= 80)
                                    score_color = "text-green-500";
                                else if (course.scored < 80 && course.scored > 60) {
                                    $("body").css("--warn-color", "#fdae61");
                                    score_color = "text-yellow-500";
                                }
                                else if (course.scored < 60)
                                    score_color = "text-red-500";

                                $("#courses").append(`
                                    <a class="bg-gray-300 p-4 rounded shadow cursor-pointer text-black flex flex-col justify-between gap-10 select-none" courseid="${course.courseid}" uid="${course.id}">
                                        <div>
                                            <h2 class="text-2xl">${course.title}</h2>
                                            <span>${course.start} - ${course.end}</span>
                                        </div>
                                        <div class="font-black ${score_color}">${isNaN(course.scored) ? "--" : `${course.scored}%`}</div>
                                    </a>
                                `)
                            })

                            // Remove overlay
                            $("#overlays").empty();
                        }
                    })
                }
            })

            break;
        }
    }
})();