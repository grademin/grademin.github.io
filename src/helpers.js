/**
 * Proview Version
 */
export const version = "1.5.0";

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
            <div id="loader" class="fixed inset-0 flex items-center justify-center ${theme("bg", "700")} z-50">
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
 * Handles themeing within the website
 * @param {int} type 
 */
export function theme(type, value) {
    let theme = get("theme_settings").theme;
    let theme_color = get("theme_settings").theme_color;

    switch (type) {
        case "theme-shadow": {
            if (theme == "light") {
                return `shadow-lg`;
            } else {
                return ``;
            }
        }
        case "theme-input": {
            if (theme == "light") {
                return `bg-zinc-200`;
            } else {
                return `bg-zinc-700`;
            }
        }
        case "theme-card": {
            if (theme == "light") {
                return `bg-zinc-100 shadow-xl`;
            } else {
                return `bg-zinc-800`;
            }
        }
        case "theme-toggle": {
            if (theme == "light") {
                return `bg-black`;
            } else {
                return `bg-zinc-600`;
            }
        }
        case "theme-text": {
            if (theme == "light") {
                return `text-black`;
            } else {
                return `text-white`;
            }
        }
        case "theme-bg": {
            if (theme == "light") {
                return `bg-white`;
            } else {
                return `bg-black`;
            }
        }
        case "theme-stroke": {
            if (theme == "light") {
                return `stroke-zinc-200`;
            } else {
                return `stroke-zinc-700`;
            }
        }
        case "bg": {
            switch (theme_color) {
                case "green": {
                    if (value == 600)
                        return `bg-${theme_color}-400`
                    else if (value == 300)
                        return `bg-${theme_color}-700`
                    else if (value == 200)
                        return `bg-${theme_color}-900`
                    else
                        return `bg-${theme_color}-500`;
                }
                case "orange": {
                    if (value == 600)
                        return `bg-${theme_color}-300`;
                    else if (value == 300)
                        return `bg-${theme_color}-700`
                    else if (value == 200)
                        return `bg-${theme_color}-900`
                    else
                        return `bg-${theme_color}-400`;
                }
                case "brown": {
                    if (value == 600)
                        return `bg-orange-700`;
                    else if (value == 300)
                        return `bg-orange-700`
                    else if (value == 200)
                        return `bg-orange-200`
                    else
                        return `bg-orange-900`;
                }
                case "violet": {
                    if (value == 600)
                        return `bg-${theme_color}-500`;
                    else if (value == 300)
                        return `bg-${theme_color}-900`
                    else if (value == 200)
                        return `bg-${theme_color}-900`
                    else
                        return `bg-${theme_color}-600`;
                }
                case "rose": {
                    if (value == 600)
                        return `bg-${theme_color}-600`;
                    else if (value == 300)
                        return `bg-${theme_color}-900`
                    else if (value == 200)
                        return `bg-${theme_color}-900`
                    else
                        return `bg-${theme_color}-700`;
                }
                /*case "indigo": {
                    //return `bg-${theme_color}-700`;
                }*/
                case "fuchsia": {
                    if (value == 600)
                        return `bg-${theme_color}-500`;
                    else if (value == 300)
                        return `bg-${theme_color}-900`
                    else if (value == 200)
                        return `bg-${theme_color}-900`
                    else
                        return `bg-${theme_color}-600`;
                }
                case "teal": {
                    if (value == 600)
                        return `bg-${theme_color}-300`;
                    else if (value == 300)
                        return `bg-${theme_color}-700`
                    else if (value == 200)
                        return `bg-${theme_color}-900`
                    else
                        return `bg-${theme_color}-400`;
                }
                default:
                    return `bg-${theme_color}-${value}`;
            }
        }
        case "border": {
            // TODO: Active states
            switch (theme_color) {
                case "green": {
                    if (value == 700)
                        return `border-${theme_color}-400`; // BOX BORDER
                    else if (value == 400)
                        return `border-${theme_color}-700`; // HOVER BORDER
                    else if (value == 500)
                        return `border-${theme_color}-600`; // BORDER
                    else
                        return `border-${theme_color}-${value}`;
                }
                case "orange": {
                    if (value == 700)
                        return `border-${theme_color}-400`;
                    else if (value == 400)
                        return `border-${theme_color}-600`;
                    else if (value == 500)
                        return `border-${theme_color}-500`;
                    else
                        return `border-${theme_color}-${value}`;
                }
                case "brown": {
                    if (value == 700)
                        return `border-orange-900`;
                    else if (value == 400)
                        return `border-orange-600`;
                    else if (value == 500)
                        return `border-orange-800`;
                    else
                        return `border-orange-${value}`;
                }
                case "violet": {
                    if (value == 700)
                        return `border-${theme_color}-600`;
                    else if (value == 400)
                        return `border-${theme_color}-400`;
                    else if (value == 500)
                        return `border-${theme_color}-700`;
                    else
                        return `border-${theme_color}-${value}`;
                }
                case "rose": {
                    if (value == 700)
                        return `border-${theme_color}-700`;
                    else if (value == 400)
                        return `border-${theme_color}-400`;
                    else if (value == 500)
                        return `border-${theme_color}-500`;
                    else
                        return `border-${theme_color}-${value}`;
                }
                case "fuchsia": {
                    if (value == 700)
                        return `border-${theme_color}-600`;
                    else if (value == 400)
                        return `border-${theme_color}-700`;
                    else if (value == 500)
                        return `border-${theme_color}-400`;
                    else
                        return `border-${theme_color}-${value}`;
                }
                case "teal": {
                    if (value == 700)
                        return `border-${theme_color}-400`;
                    else if (value == 400)
                        return `border-${theme_color}-600`;
                    else if (value == 500)
                        return `border-${theme_color}-500`;
                    else
                        return `border-${theme_color}-${value}`;
                }
                default:
                    return `border-${theme_color}-${value}`;
            }
        }
        case "text": {
            switch (theme_color) {
                case "green": {
                    if (value == 600)
                        return `text-${theme_color}-600`;
                    else
                        return `text-${theme_color}-500`;
                }
                case "orange": {
                    if (value == 600)
                        return `text-${theme_color}-500`;
                    else
                        return `text-${theme_color}-400`;
                }
                case "brown": {
                    if (value == 600)
                        return `text-orange-800`;
                    else
                        return `text-orange-900`;
                }
                case "violet": {
                    if (value == 600)
                        return `text-${theme_color}-700`;
                    else
                        return `text-${theme_color}-600`;
                }
                case "rose": {
                    if (value == 600)
                        return `text-${theme_color}-800`;
                    else
                        return `text-${theme_color}-700`;
                }
                case "fuchsia": {
                    if (value == 600)
                        return `text-${theme_color}-700`;
                    else
                        return `text-${theme_color}-600`;
                }
                case "teal": {
                    if (value == 600)
                        return `text-${theme_color}-500`;
                    else
                        return `text-${theme_color}-400`;
                }
                default:
                    return `text-${theme_color}-${value}`;       
            }
        }
        case "caret": {
            switch (theme_color) {
                case "green": {
                    return `caret-${theme_color}-500`;
                }
                case "orange": {                    
                    return `caret-${theme_color}-400`;
                }
                case "brown": {
                    return `caret-orange-900`;
                }
                case "violet": {
                    return `caret-${theme_color}-600`;
                }
                case "rose": {
                    return `caret-${theme_color}-700`;
                }
                case "fuchsia": {
                    return `caret-${theme_color}-600`;
                }
                case "teal": {
                    return `caret-${theme_color}-400`;
                }
                default:
                    return `caret-${theme_color}-${value}`;       
            }
        }
        case "ring": {
            switch (theme_color) {
                case "brown": {
                    return `ring-orange-900`;
                }
                default:
                    return `ring-${theme_color}-${value}`;
            }
        }
        case "stroke": {
            switch (theme_color) {
                case "brown": {
                    return `stroke-orange-900`;
                }
                default:
                    return `stroke-${theme_color}-${value}`;
            }
        }
    }
}

/** 
 * Animates the top bars.
 * @returns {void}
 */
export async function animate_nav() {
    try {
        $(window).off("scroll")
        if ($("#top #scrolled-title").length && $("#top #scrolled-title").attr("showreload") == undefined) {
            $("#top>div").removeClass("shadow shadow-black")
            if ($(window).scrollTop() > $("#top").offset().top + $("#top").outerHeight() - 40 || $(document).scrollTop() < $("#top").offset().top - $(window).height()) {
                if (window.scrollY == 0) {
                    $("#top #scrolled-title").parent().removeClass("shadow shadow-black");
                    $("#top #scrolled-title span").fadeOut(0);
                } else {
                    $("#top #scrolled-title").parent().addClass("shadow shadow-black");
                    $("#top #scrolled-title span").fadeIn(0);
                }
            } else {
                $("#top #scrolled-title").parent().removeClass("shadow shadow-black");
                $("#top #scrolled-title span").fadeOut(0);
            }
            
            // Manages when we scroll
            let in_load = false;
            $(window).off()
            window.addEventListener('scroll', function() {
                if (window.scrollY == 0) {
                    $("#top #scrolled-title").parent().removeClass("shadow shadow-black");
                    $("#top #scrolled-title span").fadeOut(100);
                }
        
                if (!in_load) {
                    try {
                        if (window.scrollY > $("#top").offset().top + $("#top").outerHeight() - 62 || window.scrollY < $("#top").offset().top - window.innerHeight) {
                            in_load = true;
                            $("#top #scrolled-title").parent().addClass("shadow shadow-black");
                            $("#top #scrolled-title span").fadeIn(100, () => {
                                in_load = false;
                            });
                        } else {
                            in_load = true;
                            $("#top #scrolled-title").parent().removeClass("shadow shadow-black");
                            $("#top #scrolled-title span").fadeOut(100, () => {
                                in_load = false;
                            });
                        }
                    } catch (e) {}
                }
            });
        } else if ($("#top #scrolled-title").attr("showreload") != undefined) {
            $(window).off("scroll")
            $("#top>div").removeClass("shadow shadow-black")
            if ($(window).scrollTop() > $("#top").offset().top + $("#top").outerHeight() - 40 || $(document).scrollTop() < $("#top").offset().top - $(window).height()) {
                if (window.scrollY == 0) {
                    $("#top #scrolled-title").parent().removeClass("shadow shadow-black");
                    $("#top #scrolled-title span .inner").fadeOut(0);
                } else {
                    $("#top #scrolled-title").parent().addClass("shadow shadow-black");
                    $("#top #scrolled-title span .inner").fadeIn(0);
                }
            } else {
                $("#top #scrolled-title").parent().removeClass("shadow shadow-black");
                $("#top #scrolled-title span .inner").fadeOut(0);
            }
            
            // Manages when we scroll
            let in_load = false;
            $(window).off()
            window.addEventListener('scroll', function() {
                if (window.scrollY == 0) {
                    $("#top #scrolled-title").parent().removeClass("shadow shadow-black");
                    $("#top #scrolled-title span .inner").fadeOut(100);
                }
        
                if (!in_load) {
                    try {
                        if (window.scrollY > $("#top").offset().top + $("#top").outerHeight() - 62 || window.scrollY < $("#top").offset().top - window.innerHeight) {
                            in_load = true;
                            $("#top #scrolled-title").parent().addClass("shadow shadow-black");
                            $("#top #scrolled-title span .inner").fadeIn(100, () => {
                                in_load = false;
                            });
                        } else {
                            in_load = true;
                            $("#top #scrolled-title").parent().removeClass("shadow shadow-black");
                            $("#top #scrolled-title span .inner").fadeOut(100, () => {
                                in_load = false;
                            });
                        }
                    } catch (e) {}
                }
            });
        } else {
            if ($(window).scrollTop() > 10) {
                $("#top>div").addClass("shadow shadow-black")
            } else {
                $("#top>div").removeClass("shadow shadow-black")
            }
    
            $(window).off().scroll(function() {
                if ($(this).scrollTop() > 10) {
                    $("#top>div").addClass("shadow shadow-black")
                } else {
                    $("#top>div").removeClass("shadow shadow-black")
                }
            })
        }
    } catch (e) {}
}

/**
 * Formats text
 * @param {string} string
 */
export function format(string) {
    if (string == "" || string == null || string == undefined)
        string = "";

    // Convert all entities to html 
    string = string.replace(/&lt;/g, '<')
    string = string.replace(/&gt;/g, '>')
    string = string.replace(/&amp;/g, '&')

    // Others
    string = string.replace(/style\s*=\s*["'][^"']*["']/gi, "")
    string = string.replace(/<u>/g, "")
    string = string.replace(/<strong>/g, "")
    string = string.replace(/<\strong>/g, "")
    string = string.replace(/id="isPasted"/g, "");
    string = string.replace(/dir="ltr"/g, "");
    string = string.replace(/<span/g, `<span class="w-full" style="word-wrap: break-word; word-break: break-word; white-space: wrap;"`)
    string = string.replace(/<img/g, "<img class=\"rounded-xl py-2\"")
    string = string.replace(/href/g, "goto")
    string = string.replace(/<a/g, `<a class="${theme("text", "700")} hover:${theme("text", "600")} cursor-pointer transition"`)
    return string.trim();
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
 * Returns a single number from `achieved` and `possible` json outputs
 * 
 * NOTE: This MUST have json paths directly to `.achieved` and `.possible` or else it won't work!
 * @param {JSON} json
 */
export function decode_score(json) {
    if (json == undefined)
        return;

    return Math.round((json.achieved / json.possible) * 100)
}

/**
 * Prevents errors from code, if an error occurs (and the bool "showerror" is true) then 
 * it provides an overlay for the error.
 * @param {function} main
 * @param {boolean} showerror
 */
export async function prevent_errors(main, showerror) {
    try {
        await main();
    } catch (e) {
        if (showerror) {
            $("body").addClass("overflow-hidden");
            $("#overlays").append(`
                <div id="error" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center animation-fadein">
                    <div class="container mx-auto px-4 flex justify-center items-center pointer-events-none animation-popin">
                        <div class="${theme("theme-card")} ${theme("theme-text")} rounded-xl max-w-lg px-5 py-5 pointer-events-auto">
                            <div class="flex justify-center items-center mb-4">
                                <h2 class="text-2xl font-bold text-center">Error Occured</h2>
                            </div>
                            <div>
                                <p>${e}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `).on("click", function (event) {
                switch ($(event.target).attr("id")) {
                    case "overlay": {
                        $("#error").fadeOut(400, function () {
                            $("#overlays").empty();
                        });
                        $("body").removeClass("overflow-hidden");
                    }
                }
            })
        }
    }
}