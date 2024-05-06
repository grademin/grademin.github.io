export async function run() {
    "use strict";
    
    const hlp = await import("../../helpers.js");
    const site = await import("../../site.js");

    await hlp.load(async function () {
        $("#root").empty();
        await $("#overlays").html(`
            <div id="help-center" class="fixed h-full inset-0 z-20 bg-white text-black overflow-scroll overscroll-none">
                <div id="top" class="text-black">
                    <div class="fixed left-0 right-0 top-0 z-20 flex flex-row">
                        <div class="flex justify-center items-center container mx-auto py-2 px-4 bg-white">
                            <div id="go-back" class="-ml-4 flex-2 cursor-pointer py-3 pl-4 pr-2 rounded-full">
                                <svg class="w-[25px] pointer-events-none" viewBox="-14 -1000 1000 1000">
                                    <path class="fill-black w-0" d="m213-480 278 277q22 23 22.5 55T491-94q-22 22-54.5 22T381-94L90-384q-20-21-30-45.5T50-480q0-27 10-51.5T90-576l291-292q23-22 55.5-22t54.5 22q22 22 22 55t-22 55L213-480Z"/>
                                </svg>
                            </div>
                            <span class="flex-grow font-bold text-center text-[22px]">Help Center</span>
                            <div id="reload" class="invisible -mr-2 flex-2 cursor-pointer py-3 pl-4 pr-2 rounded-full">
                                <svg class="w-[25px] pointer-events-none" viewBox="-14 -1000 1000 1000">
                                    <path class="fill-white w-0" d="M476.28-113Q324-113 216.5-220 109-327 109-479t107.5-260Q324-847 476-847q78.29 0 148.15 31.5Q694-784 745-726v-68q0-22 14.8-37.5t37.7-15.5q22.9 0 38.2 15.5Q851-816 851-794v229q0 27.6-20.2 47.8Q810.6-497 783-497H552q-21.57 0-36.79-15.58Q500-528.16 500-550.28q0-21.69 15.5-36.71Q531-602 553-602h117q-33-50-83.9-78.5Q535.2-709 476-709q-96 0-163.5 66.92Q245-575.17 245-479q0 96.33 67.5 163.17Q380-249 476-249q56 0 104.61-25.81Q629.22-300.63 662-346q15.62-22.16 41.81-30.58Q730-385 754.74-375q26.26 10 37.76 32.5Q804-320 792-298q-48 84-132.19 134.5T476.28-113Z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <!---->
                <!---->
                <div class="flex flex-col pt-[2rem] mt-[46px] mb-[1.7rem] container mx-auto py-10 px-4 h-max">
                    <div class="flex flex-col gap-5">
                        <h1 class="text-3xl font-black">What is Help Center?</h1>
                        <p>
                            This page answers every question someone has asked me, or I added because I knew there would be questions related to it.
                        </p>
                        <br>
                        <h1 class="text-3xl font-black">An error occured / Page is stuck loading / Page is just blank</h1>
                        <p>
                            Yea, since this is a static free website ran as an app, created by <b>one single person</b>. There are bound to be errors and issues that will occur time to time. Of course these are not permanent. While this app is still in its <b>"building"</b> phase, just accept that bugs will continue to happen often.
                        </p>
                        <br>
                        <h1 class="text-3xl font-black">What is <b>"District / Website"</b> on the login page?</h1>
                        <p>
                            This respresents your district. Thankfully there is a very simple way to login without needing to figure out your district. Simply go to your Echo website, copy the URL of the website and paste it into the input. If all goes well it should successfully extract your district from the URL. 
                            <br>
                            <br>
                            <i>P.S the district is the first subdomain of the URL.</i>
                            <br>
                            <i>Example: https://district.echo-ntn.org/</i>
                        </p>
                        <br>
                        <h1 class="text-3xl font-black">This looks awfully familiar to GradeWay...</h1>
                        <p>
                            The design is based off GradeWay by Srujan Mupparapu. I really wanted a better Echo, however I was dead struck in trying to design a website that fit that "phone esthetic" most apps have. So using references from GradeWay I created this. <b>Do note</b>, absolutly nothing from this app does the same thing GradeWay does. So if you go to a <b>HAC School</b> and <b>New Tech Network School</b>, then its absolutely recommended that you use GradeWay for HAC!
                        </p>
                        <br>
                        <h1 class="text-3xl font-black">Is my login details case sensitive?</h1>
                        <p>
                            Yes, except for <b>"District / Website"</b>, that can be all caps or all lowercase.
                        </p>
                        <br>
                        <h1 class="text-3xl font-black">Why can the app rotate?</h1>
                        <p>
                            Since you install this from the web, it keeps <b>"web features"</b>, or basically, it looks like an app but doesn't function at all like one, so it allows for screen rotations and what not. The screen rotations are pretty useful in some cases, so it's really up to you if you want to use it.
                        </p>
                        <br>
                        <h1 class="text-3xl font-black">What is "Visual Chip Indicators"?</h1>
                        <p>
                            These are those little colored circles at the corner of your <b>Courses, Todos, and Activity Stream</b>. If you don't want that then you can easily turn it off with this setting.
                        </p>
                        <br>
                        <h1 class="text-3xl font-black">Do I have to constantly update my GPA?</h1>
                        <p>
                            No, the whole reason for the calculator is to get the credits of your course, and if its an AP class. Once you have gotten the GPA setup, it will always check your grades and update the GPA scores accordingly.
                            <br>
                            <br>
                            <i>Note: Hide Courses cannot affect this! You must get the GPA Results again if a course is hidden after already using it before. This may be fixed in the future, but currently it cannot do this.</i>
                        </p>
                        <br>
                        <h1 class="text-3xl font-black">What do these colors represent?</h1>
                        <p>
                            Assuming you question the following colors <i>(Blue, Orange, Cyan, Purple, Teal, and Green)</i>, these represent your objectives. Objectives are what any school under the <b>New Tech Network</b> follow for grading. To learn a lot more about how that grading works please refer to <a goto="https://newtechnetwork.org/what-we-do/learning-outcomes/" class="text-blue-700 hover:text-blue-600 cursor-pointer transition">this documentation</a> to get the full explanation.
                            <br>
                            <br>
                            <i>Note: Anything surrounded by a colored circle represents your grade as a whole, commonly referred as a <b>grade guage</b>.</i>    
                        </p>
                        <br>
                        <h1 class="text-3xl font-black">How do I reset my username/password?</h1>
                        <p>
                            This app cannot reset your password, you will have to do this through your Echo website. Or refer to one of your administrators of your school.
                        </p>
                        <br>
                        <h1 class="text-3xl font-black">What will "Hide Courses" do?</h1>
                        <p>
                            A hidden course will be completely hidden from everything, this means it will not be included in your average grade, or be included in your average objectives. Basically this hidden course will just not exist anymore if its hidden.
                        </p>
                        <br>
                        <h1 class="text-3xl font-black">Can people see that I've changed my name and profile picture?</h1>
                        <p>
                            From Echos website, no. However people have <b>eyes</b>. And could see your name from a glance off your screen. Please be careful about what you decide to make your name and profile picture.
                        </p>
                        <br>
                        <h1 class="text-3xl font-black">Whats the difference between "Logout" and "Remove From This Device"?</h1>
                        <p>
                            Logout simply logs you out, saving everything except your password for easily logging back in. <b>Remove From This Device</b> removes everything. Custom Name, Profile Picture, Settings, Everything. Hence why its in a completely seperate page.
                        </p>
                        <br>
                        <h1 class="text-3xl font-black">Other questions or concerns?</h1>
                        <p>
                            Please respond via <a goto="mailto:gradpass.official@gmail.com" class="text-blue-700 hover:text-blue-600 cursor-pointer transition">gradpass.official@gmail.com</a>, as its the quickest way for me to respond.
                        </p>
                    </div>
                </div>
            </div>
        `).click(async function (e) {
            switch ($(e.target).attr("id")) {
                case "go-back": {
                    $("#overlays").empty();
                    await site.runtime("settings");
                    break;
                }
            }
        });

        $("#help-center").scroll(function() {
            if ($(this).scrollTop() > 10) {
                $("#help-center #top>div").addClass("shadow-lg")
            } else {
                $("#help-center #top>div").removeClass("shadow-lg")
            }
        })
    })
}