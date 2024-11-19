import ReactDOM from 'react-dom'

const menubar_json = [
    {
        "name": "File",
        "opts": [
            {
                "name": "New",
                "callback": () => { console.log("[NEW] I can't actually do this lol") }
            },
            {
                "name": "Open",
                "callback": () => { console.log("[OPEN] I can't actually do this lol" )}
            },
            {
                "name": "Save",
                "callback": () => { console.log("[SAVE] I can't actually do this lol" )}
            },
            {
                "name": "Save All",
                "callback": () => { console.log("[SAVE ALL] I can't actually do this lol") }
            },
            {
                "name": "Close",
                "callback": () => { console.log("[CLOSE] I can't actually do this lol") }
            }
        ]
    },
    {
        "name": "Edit",
        "opts": [
            {
                "name": "Undo",
                "callback": () => { console.log("[UNDO] attempting action...") }
            },
            {
                "name": "Redo",
                "callback": () => { console.log("[REDO] attempting action...") }
            },
            {
                "name": "Rename File",
                "callback": () => { console.log("[RENAME FILE] attempting action...") }
            },
        ]
    }, 
    {
        "name": "View",
        "opts": [
            {
                "name": "Zoom In",
                "callback": () => { console.log("[ZOOM IN] attempting action...") }
            },
            {
                "name": "Zoom Out",
                "callback": () => { console.log("[ZOOM OUT] attempting action...") }
            }
        ]
    },
    {
        "name": "Settings",
        "opts": [
            {
                "name": "No settings yet lol",
                "callback": () => { console.log("[NO SETTINGS YET LOL] rip") }
            }
        ]
    },
    {
        "name": "Help",
        "opts": [
            {
                "name": "About",
                "callback": () => { console.log("[ABOUT] attending action") }
            }
        ]
    },
];

export default menubar_json;