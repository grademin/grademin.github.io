export async function runtime(page) {
    const hlp = await import("/proview/src/helpers.js");

    document.title = page.charAt(0).toUpperCase() + page.slice(1);
    
    let params = "";
    new URLSearchParams(window.location.search).forEach(function (key, param) {
        if (param != "page")
            params += `&${param}=${key}`
    })

    history.pushState({page: page}, page.charAt(0).toUpperCase() + page.slice(1), `?page=${page}${params}`);
    hlp.set("page", new URLSearchParams(window.location.search).get("page"), false);


    // Clense affected elements
    $("#overlays").empty();
    $(`meta[name="theme-color"]`).remove();
    $("*").off();

    if (page == "login")
        $("head").append(`<meta name="theme-color" content="#18181b">`)
    else
        $("head").append(`<meta name="theme-color" content="#1d4ed8">`)

    // Head styling
    $("head").append(`
        <style is="loader">
            .loader {
                display: inline-block;
                position: relative;
                width: 40px;
                height: 0px;
            }

            .loader div {
                box-sizing: border-box;
                display: block;
                position: absolute;
                width: 40px;
                height: 40px;
                border: 4px solid #fff;
                border-radius: 50%;
                animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                border-color: rgb(29, 78, 216) transparent transparent transparent;
            }
            
            .loader div:nth-child(1) {
                animation-delay: -0.45s;
            }

            .loader div:nth-child(2) {
                animation-delay: -0.3s;
            }

            .loader div:nth-child(3) {
                animation-delay: -0.15s;
            }
            
            @keyframes loader {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        </style>
        <style is="shake">
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
        <style is="app-loader">
            .app-loading {
                position: absolute;
                top: calc(50% - 32px);
                left: calc(50% - 32px);
            }
        </style>
    `)

    
    ////////////////////////////////////////////////////////////


    switch(page) {
        case "login": {
            const login = await import("/proview/src/pages/login.js");
            login.run()
            break;
        }
        case "overview": {
            const overview = await import("/proview/src/pages/overview.js");
            overview.run();
            break;
        }
        case "settings": {
            const settings = await import("/proview/src/pages/settings.js");
            settings.run();
            break;
        }
    }
}