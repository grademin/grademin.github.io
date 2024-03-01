$("#root[ul='login'] form").submit(function (event) {
    event.preventDefault();



    $("body").append("<div class='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full' id='overlay-01'/>").find("#overlay-01").append(`

        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="mt-3 text-center">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Popup Title</h3>
                <div class="mt-2 px-7 py-3">
                    <p class="text-sm text-gray-500">Login failed! Please try district/username/password again.</p>
                </div>
                <div class="items-center px-4 py-3">
                    <button id="close" class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        OK
                    </button>
                </div>
            </div>
        </div>
    
    `).on("click", function (event) {
        if (event.target, $(event.target).attr("id") == "overlay-01" || $(event.target).attr("id") == "close")
            $(this).remove();
    })
})