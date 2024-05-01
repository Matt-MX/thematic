import { redirect } from "@sveltejs/kit";
import type { PageLoad, PageLoadEvent } from "./$types";
import { getCachedAccountId } from "$lib/client/services/account";

export async function load(event: PageLoadEvent) {
    const json = await event.fetch(`/api/account/${event.params.id}`)
        .then((data) => {
            if (data.status == 404) {
                if (event.params.id == getCachedAccountId()) {
                    localStorage?.removeItem("account_id")
                    localStorage?.removeItem("token")
                    redirect(301, "")
                }
            } else {
                return data.json()
            }
        });

    return json;
}