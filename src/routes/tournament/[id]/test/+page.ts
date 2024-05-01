import type { PageLoadEvent } from "./$types";

export async function load(event: PageLoadEvent) {

    const tournamentId = event.params.id

    return await event.fetch(`/api/bracket/${tournamentId}`)
        .then((data) => {
            return data.json()
        })
}