import { dev, lists } from '../config'

export async function CreateItem(param) {
    const {
        list,
        schema,
        data
    } = param;

    const body = data;

    const listInfo = lists[list || schema];

    if (listInfo) {
        const { fields } = listInfo;

        for (let entry in fields) {
            const { field } = fields[entry];

            if (field in body === false) {
                body[field] = null
            }
        }
    }

    body.AuthorId = body.AuthorId || dev.user.SiteId;
    body.Author = body.Author || { Title: dev.user.Title, LoginName: dev.user.LoginName };
    body.EditorId = body.EditorId || dev.user.SiteId;
    body.Editor = body.Editor || { Title: dev.user.Title, LoginName: dev.user.LoginName };

    const date = new Date().toUTCString();
    body.Created = date;
    body.Modified = date;

    const options = {
        method: `POST`,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json;odata=verbose",
            "Accept": "application/json;odata=verbose",
        }
    }

    // TODO: Make port dynamic
    const response = await fetch(`http://localhost:2035/${list}`, options);
    const newItem = await response.json();

    return newItem;
}