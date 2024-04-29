<script lang="ts">
  import Main from "$lib/client/component/Main.svelte";
  import Navbar from "$lib/client/component/Navbar.svelte";
  import Avatar from "$lib/client/component/Avatar.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import games from "$lib/games.json";
  import type GameType from "$lib/schema/GameType";
  import { getCachedAccountId } from "$lib/client/services/account"
    import BackgroundImageOverlay from "$lib/client/component/BackgroundImageOverlay.svelte";

  export let data: PageData;

  const gameType: GameType = games[data.game];
  let isOwner: boolean

  onMount(() => {
    isOwner = data.owner_id == getCachedAccountId()
  })
</script>

<Navbar />

<Main>
  {#if gameType.bg}
    <BackgroundImageOverlay src={gameType.bg} />
  {/if}

  <div class="panel">
    {#if isOwner}
      <div class="box admin">

      </div>
    {/if}
    <div class="info flex-column">
      <h1>Tournament Info</h1>
      <div class="box flex-column">
        <div>
          <h1>{data.title}</h1>
          <a
            class="organizer"
            href="/account/{data.owner_id}"
            title="Tournament organizer"
          >
            <p>Organizer / <b>{data.owner?.username}</b></p>
          </a>
        </div>
        <div class="meta flex-row">
          <div>
            <h3>Game</h3>
            <p>{gameType?.name}</p>
          </div>
          {#if data.desc && data.desc.length > 0}
            <div>
              <h3>Description</h3>
              <p>{data.desc}</p>
            </div>
          {/if}
          <div>
            <h3>Location</h3>
            <p>In person</p>
          </div>
          <div>
            <h3>Type</h3>
            <p>Single Elimination</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</Main>

<style>

  .panel {
    display: flex;
    gap: 1rem;
    flex: 0.8;
  }

  .admin {
    flex: 0;
    margin-right: 3rem;
  }
  
  .info {
    flex: 1;
    gap: 1rem;
  }

  .organizer {
    display: flex;
    gap: 0.75rem;
    height: 1.5rem;
    align-items: center;
    text-decoration: none;
  }

  .meta {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .meta h3 {
    color: var(--background-alt);
  }

  .meta p {
    color: var(--dull);
  }

  .organizer :global(.avatar-container) {
    height: 100%;
  }

  :global(.main) {
    position: absolute !important;
    height: 100%;
    /* flex-direction: row !important; */
    flex-wrap: nowrap;
  }
</style>
