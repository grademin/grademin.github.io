/**
 * Proview version.
 */
export const version = "1.7.4";

/**
 * Adds "https://api.agilixbuzz.com" to the front of the string.
 * 
 * NOTE: The string MUST START with "/".
 * @param {string} path
 * @returns {string}
 */
export const api = (path) => {
    return `https://api.agilixbuzz.com${path}`;
}

/**
 * Smarter version of `localStorage.getItem` that automatically determines
 * if the localStorage item is an Array|Object or a String, or if it doesn't exist.
 * 
 * @param {string} key
 * @returns {Array|{}|string}
 */
export function get(key) {
    if (localStorage.getItem(key) == undefined) {
        return undefined;
    }

    try {
        if (Array.isArray(JSON.parse(localStorage.getItem(key))) || typeof JSON.parse(localStorage.getItem(key)) === "object") {
            return JSON.parse(localStorage.getItem(key));
        } 
    } catch (e) {
        return localStorage.getItem(key);
    }
}

/**
 * Smarter version of `localStorage.setItem` that automatically determines
 * if the data is an Array|Object or a String.
 * 
 * @param {string} key
 * @param {Array|{}|string} data
 */
export function set(key, data) {
    if (Array.isArray(data) || typeof data === 'object') {
        localStorage.setItem(key, JSON.stringify(data));
    } else {
        localStorage.setItem(key, data);
    }
}

/**
 * Shortened version of `localStorage.remove`.
 * 
 * @param {string} key
 */
export function remove(key) {
    localStorage.removeItem(key);
}

/**
 * Shortened version of `JSON.parse`.
 * 
 * @param {Array|{}} key
 */
export function parse(key) {
    return JSON.parse(key);
}

/**
 * Shortened version of `JSON.stringify`.
 * 
 * @param {Array|{}} key 
 */
export function stringify(key) {
    return JSON.stringify(key);
}

/**
 * This shortens the need for `hlp.get("session")`.
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
}

/**
 * This shortens the need for `hlp.get("theme")`.
 */
export const theme = {
    get exists() {return get("theme") ? true : false},
    get sync() {return get("theme") ? get("theme").sync : undefined},
    get theme() {return get("theme") ? get("theme").theme : undefined},
    get color() {return get("theme") ? get("theme").color : undefined}
}

/**
 * This shortens the need for `hlp.get("settings")`.
 */
export const settings = {
    get exists() {return get("settings") ? true : false},
    get include_self() {
        if (get("settings")) {
            try {
                return get('settings').find(option => option.option == "include-self").$value;
            } catch (e) {return undefined;}
        } else {
            return undefined;
        }
    },
    get chip_indicators() {
        if (get("settings")) {
            try {
                return get('settings').find(option => option.option == "chip-indicators").$value;
            } catch (e) {return undefined;}
        } else {
            return undefined;
        }
    },
    get hide_excused() {
        if (get("settings")) {
            try {
                return get('settings').find(option => option.option == "hide-excused").$value;
            } catch (e) {return undefined;}
        } else {
            return undefined;
        }
    },
    get self_activities() {
        if (get("settings")) {
            try {
                return get('settings').find(option => option.option == "self-activities").$value;
            } catch (e) {return undefined;}
        } else {
            return undefined;
        }
    }
}

/**
 * This shortens the need for `hlp.get("hidden")`.
 * 
 * @param {int} courseid
 */
export const hidden = (courseid) => {
    try {
        if (get("hidden").find(option => option.courseid == courseid).$value)
            return true;
        else
            return false;
    } catch (e) {
        return false;
    }
}

/**
 * This shortens the need for `hlp.get("page")`.
 * 
 * NOTE: When using `getparams`, if the params array is empty it will return NULL instead of undefined!
 */
export const page = {
    get exists() {return get("page") ? true : false},
    get getpage() {return get("page") ? get("page").page : undefined},
    get getparams() {
        try {
            if (get("page").params.length != 0)
                return get("page").params;
            else
                return null;
        } catch (e) {
            return undefined;
        }
    }
}

/**
 * This shortens the need for `hlp.get("pfp")`.
 */
export const pfp = {
    get exists() {return get("pfp") ? true : false},
    get getpfp() {
        if (get("pfp") != undefined) {
            if (get("pfp") != "")
                return get("pfp");
            else
                return "";
        } else {
            return undefined;
        }
    }
}

/**
 * This shortens the need for `hlp.get("activities")`.
 */
export const activities = {
    get exists() {return get("activities") ? true : false},
    get viewedall() {
        if (get("activities") != undefined) {
            if (get("activities").data.$unviewed == 0)
                return true;
            else
                return false;
        } else {
            return undefined;
        }
    },
    get views() {
        if (get("activities") != undefined) {
            return get("activities").data.$unviewed;
        } else {
            return undefined;
        }   
    }
}

/**
 * This shortens the need for `hlp.get("gpa")`.
 */
export const gpa = {
    get exists() {return get("gpa") ? true : false},
    get regular() {
        if (get("gpa") != undefined) {
            return get("gpa").regular;
        } else {
            return undefined;
        }
    },
    get weighted() {
        if (get("gpa") != undefined) {
            return get("gpa").weighted;
        } else {
            return undefined;
        }
    },
    get courses() {
        if (get("gpa") != undefined) {
            return get("gpa").courses;
        } else {
            return undefined;
        }
    }
}

/**
 * Wraps an overlay over an async section of code, this allows the website to load things
 * behind that overlay making it a clean seamless transition to each page.
 * 
 * NOTE: `main` is enclosed in a try ... catch function, this means any code in the root of `main`
 * will be catched and shown as an error popup.
 * @param {function} main
 */
export async function load(main) {
    if (get("overlays") != undefined && $("#overlays").is(":empty"))
        remove("overlays");

    if (get("overlays") == undefined) {
        await $("#overlays").append(`
            <div id="loader" class="fixed inset-0 flex items-center justify-center    z-50">
                <div class="loader"></div>
            </div>
        `)
        set("overlays", "");
    }

    try {
        await main();
    } catch (e) {
        console.log(e);
        $("#overlays").append(`
            <div id="overlay" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-end items-end animation-fadein">
                <div class="container mx-auto px-4 flex justify-center mb-5 items-center pointer-events-none animation-popin">
                    <div class="${theme("theme-card")} border border-red-500 rounded-xl max-w-lg px-5 py-4 pointer-events-auto">
                        <div class="flex flex-row gap-5 items-center">
                            <span class="text-1xl flex-2 material-symbols-rounded ${theme("theme-text")} flex justify-center">
                                info
                            </span>
                            <span class="flex-1 ${theme("theme-text")} font-bold">${e}</span>
                        </div>
                    </div>
                </div>
            </div>
        `)

        setTimeout(function () {
            $("#overlay").fadeOut(400, function () {
                $("#overlays").empty();
            });
            $("body").removeClass("overflow-hidden");
        }, 5000)
    }

    await $("#overlays #loader").fadeOut(400, function () {
        $(this).remove();
        remove("overlays");
    })
}

/**
 * Manages what theme the user is currently using.
 * 
 * @param {string} type
 * @param {int} value
 */
export function theming(type, value) {
    switch (type) {
        case "theme-shadow": {
            if (theme.theme == "light") {
                return "shadow-xl";
            } else {
                return "";
            }
        }
        case "theme-input": {
            if (theme.theme == "light") {
                return "bg-zinc-200";
            } else {
                return "bg-zinc-700";
            }
        }
        case "theme-card": {
            if (theme.theme == "light") {
                return "text-white shadow-xl";
            } else {
                return "bg-zinc-800";
            }
        }
        case "theme-toggle": {
            if (theme.theme == "light") {
                return "bg-black";
            } else {
                return "bg-zinc-600";
            }
        }
        case "theme-text": {
            if (theme.theme == "light") {
                return "text-black";
            } else {
                return "text-white";
            }
        }
        case "theme-bg": {
            if (theme.theme == "light") {
                return "bg-zinc-100";
            } else {
                return "bg-black";
            }
        }
        case "theme-stroke": {
            if (theme.theme == "light") {
                return "stroke-zinc-200";
            } else {
                return "stroke-zinc-700";
            }
        }
        case "bg": {
            switch (theme.color) {
                case "green": {
                    if (value == 600)
                        return `bg-${theme.color}-400`
                    else if (value == 300)
                        return `bg-${theme.color}-700`
                    else if (value == 200)
                        return `bg-${theme.color}-900`
                    else
                        return `bg-${theme.color}-500`;
                }
                case "orange": {
                    if (value == 600)
                        return `bg-${theme.color}-300`;
                    else if (value == 300)
                        return `bg-${theme.color}-700`
                    else if (value == 200)
                        return `bg-${theme.color}-900`
                    else
                        return `bg-${theme.color}-400`;
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
                        return `bg-${theme.color}-500`;
                    else if (value == 300)
                        return `bg-${theme.color}-900`
                    else if (value == 200)
                        return `bg-${theme.color}-900`
                    else
                        return `bg-${theme.color}-600`;
                }
                case "rose": {
                    if (value == 600)
                        return `bg-${theme.color}-600`;
                    else if (value == 300)
                        return `bg-${theme.color}-900`
                    else if (value == 200)
                        return `bg-${theme.color}-900`
                    else
                        return `bg-${theme.color}-700`;
                }
                case "fuchsia": {
                    if (value == 600)
                        return `bg-${theme.color}-500`;
                    else if (value == 300)
                        return `bg-${theme.color}-900`
                    else if (value == 200)
                        return `bg-${theme.color}-900`
                    else
                        return `bg-${theme.color}-600`;
                }
                case "pink": {
                    if (value == 600)
                        return `bg-${theme.color}-500`;
                    else if (value == 300)
                        return `bg-${theme.color}-900`
                    else if (value == 200)
                        return `bg-${theme.color}-900`
                    else
                        return `bg-${theme.color}-600`;
                }
                case "teal": {
                    if (value == 600)
                        return `bg-${theme.color}-300`;
                    else if (value == 300)
                        return `bg-${theme.color}-700`
                    else if (value == 200)
                        return `bg-${theme.color}-900`
                    else
                        return `bg-${theme.color}-400`;
                }
                default:
                    return `bg-${theme.color}-${value}`;
            }
        }
        case "border": {
            // TODO: Active states
            switch (theme.color) {
                case "green": {
                    if (value == 700)
                        return `border-${theme.color}-400`; // BOX BORDER
                    else if (value == 400)
                        return `border-${theme.color}-700`; // HOVER BORDER
                    else if (value == 500)
                        return `border-${theme.color}-600`; // BORDER
                    else
                        return `border-${theme.color}-${value}`;
                }
                case "orange": {
                    if (value == 700)
                        return `border-${theme.color}-400`;
                    else if (value == 400)
                        return `border-${theme.color}-600`;
                    else if (value == 500)
                        return `border-${theme.color}-500`;
                    else
                        return `border-${theme.color}-${value}`;
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
                        return `border-${theme.color}-600`;
                    else if (value == 400)
                        return `border-${theme.color}-400`;
                    else if (value == 500)
                        return `border-${theme.color}-700`;
                    else
                        return `border-${theme.color}-${value}`;
                }
                case "rose": {
                    if (value == 700)
                        return `border-${theme.color}-700`;
                    else if (value == 400)
                        return `border-${theme.color}-400`;
                    else if (value == 500)
                        return `border-${theme.color}-500`;
                    else
                        return `border-${theme.color}-${value}`;
                }
                case "fuchsia": {
                    if (value == 700)
                        return `border-${theme.color}-600`;
                    else if (value == 400)
                        return `border-${theme.color}-700`;
                    else if (value == 500)
                        return `border-${theme.color}-400`;
                    else
                        return `border-${theme.color}-${value}`;
                }
                case "pink": {
                    if (value == 700)
                        return `border-${theme.color}-600`;
                    else if (value == 400)
                        return `border-${theme.color}-300`;
                    else if (value == 500)
                        return `border-${theme.color}-400`;
                    else
                        return `border-${theme.color}-${value}`;
                }
                case "teal": {
                    if (value == 700)
                        return `border-${theme.color}-400`;
                    else if (value == 400)
                        return `border-${theme.color}-600`;
                    else if (value == 500)
                        return `border-${theme.color}-500`;
                    else
                        return `border-${theme.color}-${value}`;
                }
                default:
                    return `border-${theme.color}-${value}`;
            }
        }
        case "text": {
            switch (theme.color) {
                case "green": {
                    if (value == 600)
                        return `text-${theme.color}-600`;
                    else
                        return `text-${theme.color}-500`;
                }
                case "orange": {
                    if (value == 600)
                        return `text-${theme.color}-500`;
                    else
                        return `text-${theme.color}-400`;
                }
                case "brown": {
                    if (value == 600)
                        return `text-orange-800`;
                    else
                        return `text-orange-900`;
                }
                case "violet": {
                    if (value == 600)
                        return `text-${theme.color}-700`;
                    else
                        return `text-${theme.color}-600`;
                }
                case "rose": {
                    if (value == 600)
                        return `text-${theme.color}-800`;
                    else
                        return `text-${theme.color}-700`;
                }
                case "fuchsia": {
                    if (value == 600)
                        return `text-${theme.color}-700`;
                    else
                        return `text-${theme.color}-600`;
                }
                case "pink": {
                    if (value == 600)
                        return `text-${theme.color}-700`;
                    else
                        return `text-${theme.color}-600`;
                }
                case "teal": {
                    if (value == 600)
                        return `text-${theme.color}-500`;
                    else
                        return `text-${theme.color}-400`;
                }
                default:
                    return `text-${theme.color}-${value}`;       
            }
        }
        case "caret": {
            switch (theme.color) {
                case "green": {
                    return `caret-${theme.color}-500`;
                }
                case "orange": {                    
                    return `caret-${theme.color}-400`;
                }
                case "brown": {
                    return `caret-orange-900`;
                }
                case "violet": {
                    return `caret-${theme.color}-600`;
                }
                case "rose": {
                    return `caret-${theme.color}-700`;
                }
                case "fuchsia": {
                    return `caret-${theme.color}-600`;
                }
                case "pink": {
                    return `caret-${theme.color}-600`;
                }
                case "teal": {
                    return `caret-${theme.color}-400`;
                }
                default:
                    return `caret-${theme.color}-${value}`;       
            }
        }
        case "ring": {
            switch (theme.color) {
                case "brown": {
                    return `ring-orange-900`;
                }
                default:
                    return `ring-${theme.color}-${value}`;
            }
        }
        case "stroke": {
            switch (theme.color) {
                case "brown": {
                    return `stroke-orange-900`;
                }
                default:
                    return `stroke-${theme.color}-${value}`;
            }
        }
    }
}

/**
 * Formats and cleans a string.
 * 
 * @param {string} text
 */
export function format(text) {
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
 * Converts a score to a color.
 * 
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
 * Converts a gpa score to a color.
 * 
 * @param {int} int
 */
export function gpa_score_to_color(int) {
    let color;
    if (isNaN(int))
        color = "";
    else if (int >= 3.0)
        color = "green";
    else if (int < 3.0 && int > 2.0) {
        color = "yellow";
    }
    else if (int < 2.0)
        color = "red";

    return color;
}

/**
 * Returns a single number from `achieved` and `possible` json objects.
 * 
 * NOTE: This MUST HAVE json paths directly to `achieved` and `possible` or else it won't work!
 * @param {JSON} json
 */
export async function decode_score(json) {
    if (json == undefined)
        return;

    return Math.round((json.achieved / json.possible) * 100)
}

/**
 * Returns a single number from `courses`
 * 
 * @parm {JSON} courses
 */
export function decode_gpa_score(courses) {
    let credit = 0;
    let total_regular = 0;
    let total_weighted = 0;
    let regular = 0.0;
    let weighted = 0.0;

    $.each(courses, (i, course) => {
        let gpa = 0.0;

        if (course.grade >= 90) {
            gpa = 4.0;
        } else if (course.grade >= 80) {
            gpa = 3.0;
        } else if (course.grade >= 70) {
            gpa = 2.0;
        } else if (course.grade >= 60) {
            gpa = 1.0
        }

        if (course.is_ap) {
            if (gpa === 4.0 || gpa === 3.0) {
                gpa += 0.5;
            }

            credit += course.credit;
            total_weighted += course.credit * gpa;
        } else {
            credit += course.credit;
            total_regular += course.credit * gpa;
        }
    })

    regular = total_regular / credit;
    weighted = total_weighted / credit;

    return [regular, weighted];
}

/**
 * Prevents errors from the occuring, preventing the page from breaking
 * @param {function} main
 * @param {boolean} showerror
 */
export async function prevent_error(main, showerror) {
    
}