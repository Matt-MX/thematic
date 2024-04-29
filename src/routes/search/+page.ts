import type { PageLoadEvent } from "./$types";

export async function load(event: PageLoadEvent) {
    const query = event.url.searchParams.get("q")

    if (query) {
        return await event.fetch(`/api/tournament/search?q=${query}`)
            .then((data) => data.json())
            .then((json) => {
                return {
                    results: json
                }
            })
    } else return null
}