/** @type {import('./$types').PageLoad} */
export async function load(event: PageLoad) {
    console.log(event.id)
    const json = await event.fetch(`/api/account/${event.id}`)
        .then((data) => data.json());

    return json;
}