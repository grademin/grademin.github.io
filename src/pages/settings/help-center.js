export async function run() {
    "use strict";
    
    const hlp = await import("../../helpers.js");
    const site = await import("../../site.js");

    // TODO: add stuff about settings

    await hlp.load(async function () {
        $("#root").empty();
        await $("#overlays").html(`
            <div id="help-center" class="fixed h-full inset-0 z-20 bg-white text-black overflow-scroll">
                <div id="top" class="text-black">
                    <div class="fixed left-0 right-0 top-0 z-20 flex flex-row">
                        <div class="flex justify-center items-center container mx-auto py-2 px-4 bg-white">
                            <div id="go-back" class="-ml-2 cursor-pointer py-3 px-6 rounded-full active:bg-zinc-200 active:bg-opacity-50 active:shadow-lg">
                                <span class="w-0 -ml-[1px] font-black pointer-events-none text-1xl material-symbols-rounded flex justify-center items-center">
                                    arrow_back_ios_new
                                </span>
                            </div>
                            <span class="flex-grow font-bold text-center text-[22px]">Help Center</span>
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
                        <h1 class="text-3xl font-black">Can people see that I've changed my name and profile picture?</h1>
                        <p>
                            From Echos website, no. However people have <b>eyes</b>. And could see your name from a glance off your screen. Please be careful about what you decide to make your name and profile picture.
                        </p>
                        <br>
                        <h1 class="text-3xl font-black">Other questions or concerns?</h1>
                        <p>
                            Please respond via <a goto="https://github.com/wo-r-professional/proview/issues" class="text-blue-700 hover:text-blue-600 cursor-pointer transition">github issues</a>, as its the quickest way for me to respond.
                        </p>
                    </div>
                </div>
            </div>
        `).off().on("click", async function (e) {
            switch ($(e.target).attr("id")) {
                case "go-back": {
                    $("#overlays").empty();
                    history.pushState({}, "", `?page=settings`);
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

        $("[goto]").on("click", function (event) {
            window.open($(this).attr("goto"), "_blank")
        })
    })
}