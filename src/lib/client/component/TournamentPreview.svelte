<script lang="ts">
    import type TournamentInformation from "$lib/schema/TournamentInformation";
    import games from "$lib/games.json";

    export let info: TournamentInformation;

    const gameType: any = games[info.game] || games["other"]
</script>

<div class="tournament-preview">
    <div class="thumb">
        <img
            src={info.thumb ||
            gameType.icon
                }
        />
    </div>

    <div class="container">
        <h2 class="title">{info.title}</h2>

        <p><span>{info.participants?.length || 0}</span> participants</p>
        {#if info.currentStatus}
            {info.currentStatus}
        {:else}
            <p>
                Starts <span
                    >{new Date(info.date_start).toLocaleDateString()} at {new Date(
                        info.date_start,
                    ).toLocaleTimeString()}</span
                >
            </p>
        {/if}

        <a href="/tournament/{info.id}">Go to tournament</a>
    </div>
</div>

<style scoped>
    .tournament-preview {
        background-color: var(--background);
        border: 1px solid var(--text);
        border-radius: 0.4rem;

        height: auto;
        overflow: hidden;
    }

    .tournament-preview .title {
        color: var(--title);
    }

    .tournament-preview .thumb {
        float: left;
        position: relative;
        overflow: hidden;
        width: 10rem;
        height: 100%;
        aspect-ratio: 1 / 1;
    }

    .tournament-preview .thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    .tournament-preview .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;
        box-sizing: border-box;
    }

    .tournament-preview span {
        color: var(--dull);
    }

    @media only screen and (max-width: 920px) {
        .tournament-preview {
            flex-direction: column;
            height: auto;
            flex: 0;
            flex-basis: 100%;
            flex-grow: 2;
        }

        .tournament-preview .thumb {
            width: 100%;
            height: 10rem;
        }
    }
</style>
