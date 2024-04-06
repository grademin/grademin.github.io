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
 * Checks if a url redirects to another url
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
    if (get("overlay_active", false) == "true" && $("#overlays").is(":empty"))
        remove("overlay_active");    

    if (get("overlay_active", false) != "true") {
        await $("#overlays").append(`
            <div id="loader" class="fixed inset-0 flex items-center justify-center bg-blue-700 z-50">
                <div class="loader"></div>
            </div>
        `);
        set("overlay_active", "true", false);
    }

    await main();

    await $("#overlays #loader").fadeOut(400, function () {
        $(this).remove();
        remove("overlay_active");
    })
}

/** 
 * Animates the top bars.
 * @returns {void}
 */
export async function animate_nav() {
    try {
        if ($(window).scrollTop() > $("#top").offset().top + $("#top").outerHeight() - 40 || $(window).scrollTop() < $("#top").offset().top - $(window).height()) {
            $("#top #scrolled-title span").fadeIn(0);
        } else {
            $("#top #scrolled-title span").fadeOut(0);
        }
        
        // Manages when we scroll
        let in_load = false;
        $(window).scroll(function() {
            if ($(this).scrollTop() == 0) {
                $("#top #scrolled-title").parent().removeClass("shadow shadow-black")
                $("#top #scrolled-title span").fadeOut(100);
            }

            if (!in_load) {
                try {
                    if ($(this).scrollTop() > $("#top").offset().top + $("#top").outerHeight() - 62 || $(this).scrollTop() < $("#top").offset().top - $(window).height()) {
                        in_load = true;
                        $("#top #scrolled-title").parent().addClass("shadow shadow-black")
                        $("#top #scrolled-title span").fadeIn(100, () => {
                            in_load = false;
                        });
                    } else {
                        in_load = true;
                        $("#top #scrolled-title").parent().removeClass("shadow shadow-black")
                        $("#top #scrolled-title span").fadeOut(100, () => {
                            in_load = false;
                        });
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

/**
 * Formats text
 * @param {string} string
 */
export function format(string) {
    string = string.replace(/&lt;/g, '<')
    string = string.replace(/&gt;/g, '>')
    string = string.replace(/&amp;/g, '&')
    string = string.replace(/id="isPasted"/g, "");
    string = string.replace(/style\s*=\s*["'][^"']*["']/gi, '')
    string = string.replace(/<img/g, "<img class=\"rounded-xl py-2\"")
    string = string.replace("href", "goto")
    string = string.replace(/<a/g, `<a class="text-blue-700 hover:text-blue-600 cursor-pointer transition"`)
    return string;
}

/** 
 * Returns a color from a score
 * @param {int} int
 */
export function score_to_color(int) {
    let color;
    if (isNaN(int))
        color = "";
    else if (int >= 80)
        color = "green";
    else if (int < 80 && int > 60) {
        color = "yellow";
    }
    else if (int < 60)
        color = "red";

    return color;
}

/**
 * Handles swiping, if its detected the function provided within `main` will be executed
 * @param {function} main
 */
export async function swiped(main) {
    let start = { x: 0, y: 0 };
    let end = { x: 0, y: 0 };
    let target = document;
    
    target.addEventListener('pointerdown', function(e) {
        if (e.clientX >= 0 && e.clientX <= 90) {
            e.target.setPointerCapture(e.pointerId);
    
            start.x = e.clientX;
            start.y = e.clientY;
        } else {
            start.x = null;
            start.y = null;
        }
    });
    
    target.addEventListener('pointerup', async function(e) {
        if (start.x !== null && start.y !== null) {
            end.x = e.clientX;
            end.y = e.clientY;
    
            await swipe();
        }
    });
    
    async function swipe() {
        if (start.x === null || start.y === null)
            return;
    
        const deltaX = end.x - start.x;
        const deltaY = end.y - start.y;
        const thresholdX = 100;
        const thresholdY = 50;
    
        if (Math.abs(deltaX) > thresholdX && Math.abs(deltaY) < thresholdY) {
            if(deltaX > 0) {
                await main();
            }
        }
    }
}

/**
 * Like swipe() this handles swiping downwards, for example, reloading content.
 * @param {function} main
 */
export async function swiped_down(main) {
    let start = { x: 0, y: 0 };
    let end = { x: 0, y: 0 };
    let target = document;
    
    target.addEventListener('pointerdown', function(e) {
        if (e.clientY >= 0 && e.clientY <= 90) {
            e.target.setPointerCapture(e.pointerId);
    
            start.x = e.clientX;
            start.y = e.clientY;
        } else {
            start.x = null;
            start.y = null;
        }
    });
    
    target.addEventListener('pointerup', async function(e) {
        if (start.x !== null && start.y !== null) {
            end.x = e.clientX;
            end.y = e.clientY;
    
            await swipe();
        }
    });
    
    async function swipe() {
        if (start.x === null || start.y === null) {
            return;
        }
    
        const deltaX = end.x - start.x;
        const deltaY = end.y - start.y;
        const thresholdX = 50;
        const thresholdY = 100;
    
        if (Math.abs(deltaY) > thresholdY && Math.abs(deltaX) < thresholdX) {
            if(deltaY > 0) {
                await main();
            }
        }
    }
}