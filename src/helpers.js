/**
 * A simple function to make api links stand out.
 * 
 * NOTE: The string must start with "/".
 * @param path {string}
 * @returns {string}
 */
export const api = (path) => { 
    return `https://api.agilixbuzz.com${path}`
};

/**
 * Shortens getItem from localStorage.
 * @param {string} name
 * @param {boolean} parse
 */
export function get(name, parse = true) {
    if (localStorage.getItem(name) != undefined)
        return parse ? JSON.parse(localStorage.getItem(name)) : localStorage.getItem(name);
    else
        return "";
};

/**
 * Shortens setItem from localStorage.
 * @param {string} name
 * @param {string|array} data
 * @param {boolean} stringify
 */
export function set(name, data, stringify = true) {
    return stringify ? localStorage.setItem(name, JSON.stringify(data)) : localStorage.setItem(name, data);
}

/**
 * Shortens removeItem from localStorage.
 * @param {string} name
 */
export function remove(name) {
    localStorage.removeItem(name);
}

/** 
 * Shortens JSON.parse().
 * @param {array} data
 */
export function parse(data) {
    return JSON.parse(data);
}

/** 
 * Shortens JSON.stringify(). 
 * @param {array} data
 */
export function string(data) {
    return JSON.stringify(data);
}

/**
 * Checks if an image is valid and can appear on a web page.
 * @param {string} url
 * @param {function} callback
 */
export async function image_valid(url, callback) {
    let image = new Image();
    image.onload = async () => {await callback(url, true)};
    image.onerror = async () => {await callback(url, false)};
    image.src = url;
};

/**
 * Checks if a url redirects to another url.
 * 
 * NOTE: CORS will make this not work sometimes. If this happens it will error and provide the original url.
 * @param {string} url
 * @param {function} callback
 */
export async function url_redirects(url, callback) {
    await fetch(url, {
        method: "get",
        redirect: "follow", // This instructs fetch to follow redirects
    })
    .then(response => {
        callback(response.url, response.ok);
    })
    .catch(error => {
        callback(url, false);
    });
};

/**
 * Shortens the need to use localStorage for commonly used objects.
 * @example hlp.session.token;
 */
export const session = {
    get exists() {return get("session") ? true : false},
    get token() {return get("session") ? get("session").token : undefined},
    get id() {return get("session") ? get("session").user.userid : undefined},
    get domainid() {return get("session") ? get("session").user.domainid : undefined},
    get userspace() {return get("session") ? get("session").user.userspace : undefined},
    get username() {return get("session") ? get("session").user.username : undefined},
    get firstname() {return get("session") ? get("session").user.firstname : undefined},
    get lastname() {return get("session") ? get("session").user.lastname : undefined},
    get fullname() {return get("session") ? get('session').user.fullname : undefined}
};

/**
 * Wraps a overlay loader over the code to show that things are happening.
 * @param {function} main
 * @returns {void}
 */
export async function load(main) {
    /*if (new URLSearchParams(window.location.search).get("page") == "login")
        $(`head [name="theme-color"]`).attr("content", "#000000");
    else
        $(`head [name="theme-color"]`).attr("content", "#1b4691");*/
    
    $("#overlays").append(`
        <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div class="loader"><div></div><div></div><div></div><div></div></div>
        </div>
    `);

    await main();

    /*if (new URLSearchParams(window.location.search).get("page") == "login")
        $(`head [name="theme-color"]`).attr("content", "#000000");
    else
        $(`head [name="theme-color"]`).attr("content", "#1d4ed8");*/

    $("#overlays").empty();
}

/** 
 * Animates the top bars.
 * @returns {void}
 */
export async function animate_nav() {
    try {
        if ($(window).scrollTop() > $("#top").offset().top + $("#top").outerHeight() - 40 || $(window).scrollTop() < $("#top").offset().top - $(window).height()) {
            $("#top #scrolled-title").fadeIn(0);
        } else {
            $("#top #scrolled-title").fadeOut(0);
        }
        
        // Manages when we scroll
        let in_load = false;
        $(window).scroll(function() {
            if (!in_load) {
                try {
                    if ($(this).scrollTop() > $("#top").offset().top + $("#top").outerHeight() - 40 || $(this).scrollTop() < $("#top").offset().top - $(window).height()) {
                        in_load = true;
                        $("#top #scrolled-title").fadeIn(50, () => {
                            in_load = false;
                        });
                        $("#top #scrolled-title").parent().addClass("shadow shadow-black")
                    } else {
                        in_load = true;
                        $("#top #scrolled-title").fadeOut(100, () => {
                            in_load = false;
                        });
                        $("#top #scrolled-title").parent().removeClass("shadow shadow-black")
                    }
                } catch (e) {}
            }
        });
    } catch (e) {}
}

/**
 * Sets the url for history back affects.
 * @param {string} title
 * @param {string} url
 */
export async function url(title, url) {
    history.pushState({}, title, url);
}