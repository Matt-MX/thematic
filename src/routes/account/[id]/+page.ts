import { redirect } from "@sveltejs/kit";
import type { PageLoad, PageLoadEvent } from "./$types";

export async function load(event: PageLoadEvent) {
    const json = await event.fetch(`/api/account/${event.params.id}`)
        .then((data) => {
            // console.log(data)
            if (data.status == 404) {
                redirect(301, "/account/-1")
            } else {
                return data.json()
            }
        });

    return json;
}