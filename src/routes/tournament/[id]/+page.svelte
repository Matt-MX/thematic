<script lang="ts">
  import Main from "$lib/client/component/Main.svelte";
  import Navbar from "$lib/client/component/Navbar.svelte";
  import Avatar from "$lib/client/component/Avatar.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import games from "$lib/games.json";
    import type GameType from "$lib/schema/GameType";

  export let data: PageData;

  const gameType: GameType = games[data.game]

  onMount(() => console.log(data));
</script>

<Navbar />

<Main>
  <h1>Tournament Info</h1>
  <div class="left flex-column">
    <div>
      <h1>{data.title}</h1>
      <a
        class="organizer"
        href="/account/{data.owner_id}"
        title="Tournament organizer"
      >
        <Avatar
          url="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
        />
        <h3>{data.owner?.username}</h3>
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
  <div class="right flex-column">e</div>
</Main>

<style>
  .left {
    background-color: var(--background);
    border: 1px solid var(--text);
    border-radius: 0.2rem;
    padding: 1rem;
    box-sizing: border-box;

    gap: 1rem;
  }

  .right {
    background-color: red;
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
