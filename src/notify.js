const hlp = await import("/proview/src/helpers.js");
const sw = await import("/proview/src/service.js");


export async function todos() {
    setInterval(async function () {
        let notifications = hlp.get("notifications");
        if (notifications.find(name => name.option.includes("posted")).$value) {
            await hlp.prevent_errors(async function () {
                if (hlp.session.exists) {
                    let due = await $.ajax({
                        url: hlp.api(`/cmd/getduesoonlist?_token=${hlp.session.token}&days=3&userId=${hlp.session.id}&utcoffset=300`),
                        method: "GET",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                    })
        
                    due.response.items.item.sort((a, b) => new Date(b.duedate) - new Date(a.duedate));
        
                    if (hlp.get("todos") == "") {
                        hlp.set("todos", {
                            start: new Date().toLocaleDateString('en-US'),
                            data: {
                                items: [],
                                $unviewed: 0
                            }
                        })
                    }
                    
                    let items = hlp.get("todos");
                    let unviewed = 0;
                    await $.each(due.response.items.item, (i, item) => {
                        if (new Date(item.duedate) >= new Date(hlp.get("todos").start)) {
                            if (!items.data.items.find(name => name.item.includes(item.title))) {
                                unviewed++
                                items.data.$unviewed = unviewed
                                items.data.items.push({
                                    item: item.title,
                                    course: item.entity.title
                                });
        
                                hlp.set("todos", items);
                            }
                        }
                    })
        
                    if (hlp.get("todos").data.$unviewed != 0) {
                        if (items.data.items.length > 1) {
                            sw.notify("Multiple new assignments were posted", {
                                "body": `Please head over to your todo list to see all your current todos.`,
                                "icon": "src/logo/logo.png",
                                "vibrate": [200, 100, 200, 100, 200, 100, 200],
                            })
                        } else {
                            await $.each(items.data.items, (i, todo) => {
                                sw.notify("A new assignment was posted", {
                                    "body": `${todo.item} was assigned by ${todo.course}`,
                                    "icon": "src/logo/logo.png",
                                    "vibrate": [200, 100, 200, 100, 200, 100, 200],
                                })
                            })
                        }
                    }
        
                    let todos_viewed = hlp.get("todos");
                    todos_viewed.data.$unviewed = 0;
                    todos_viewed.start = new Date().toLocaleDateString('en-US');
                    hlp.set("todos", todos_viewed); 
                }
            }, false);
        }
    }, 60000)
}