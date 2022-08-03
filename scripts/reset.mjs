import { writeFile } from 'fs'
import { readdir } from 'fs/promises'

let db = {
    "Actions": [],
    "Searches": [],
    "Comments": [],
    "Errors": [],
    "Feedback": [],
    "Log": [],
    "Users": [],
    "Questions": [],
    "ReleaseNotes": [],
        "Roles": [
        {
            "Id": 1,
            "Title": "Administrator"
        },
        {
            "Id": 2,
            "Title": "Developer"
        },
        {
            "Id": 3,
            "Title": "User"
        }
    ],
    "Settings": [
        {
            "Id": 1,
            "Key": "QuestionTypes",
            "Value": JSON.stringify([
                {
                    "title": "General",
                    "path": "General"
                }
            ])
        },
        {
            "Id": 2,
            "Key": "Build",
            "Value": "1.0.0"
        },
        {
            "Id": 3,
            "Key": "Version",
            "Value": "1.0.0"
        }
    ]
}

const lists = await readdir('./src/lists');

lists.forEach(list => {
    db[list] = [];
});

writeFile('./json-server/db.json', JSON.stringify(db), err => {
    if (err) {
        console.error(err)
        return
    }
})

console.log('reset db.json');