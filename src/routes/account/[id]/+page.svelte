<script lang="ts">
    import Navbar from "$lib/client/component/Navbar.svelte";
    import Main from "$lib/client/component/Main.svelte";
    import Avatar from "$lib/client/component/Avatar.svelte";
    import TournamentPreview from "$lib/client/component/TournamentPreview.svelte";
    import type { PageData } from "./$types";
    import type TournamentInformation from "$lib/schema/TournamentInformation";

    export let data: PageData;

    const testData = {
        id: 0,
        owner_id: 1,
        title: "1v1 CS2",
        type: "single_elim",
        helpers: [],
        participants: ["MattMX", "chris"],
        date_start: new Date(),
        game: "cs2",
    } as TournamentInformation;

    const testData1 = {
        id: 0,
        owner_id: 1,
        title: "Crystal 2v2",
        thumb: "https://tiermaker.com/images/templates/crystal-pvp-1600838/16008381647718815.png",
        type: "single_elim",
        helpers: [],
        participants: ["MattMX"],
        date_start: new Date(),
        game: "cs2",
    } as TournamentInformation;
</script>

<Navbar />

<Main>
    <div class="account-info">
        <div class="avatar">
            <Avatar
                url="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            />
        </div>
        <div class="info">
            <h1 class="username">{data.username}</h1>
            <p>Created <span>{data.created || "(date)"}</span></p>
            <p>Followers <span>{data.followers || "(number)"}</span></p>
        </div>
    </div>

    <h1>Tournaments</h1>
    <a href="/tournament/create">Create new tournament</a>
    <div class="tournaments-list">
        {#each data.tournaments as tourny}
        <TournamentPreview info={tourny} />
        {/each}

        <!-- Test stuff -->
        <TournamentPreview info={testData} />
        <TournamentPreview info={testData1} />
    </div>
</Main>

<style scoped>
    .avatar {
        width: 10rem;
    }

    .account-info {
        display: flex;
        gap: 5rem;
    }

    .account-info .username {
        font-size: 3rem;
    }

    .account-info span {
        color: var(--dull);
    }

    .tournaments-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: 1rem;
    }

    :global(.tournament-preview) {
        flex: 0;
        flex-basis: 45%;
        flex-grow: 1;
    }
</style>
