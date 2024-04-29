import { redirect } from "@sveltejs/kit";
import type { PageLoad, PageLoadEvent } from "./$types";

export async function load(event: PageLoadEvent) {
    const json = await event.fetch(`/tournament/${event.params.id}`)
        .then((data) => {
            if (data.status == 404) {
                
            } else {
                return data.json()
            }
        });

    return json;
}