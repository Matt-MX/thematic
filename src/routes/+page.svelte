<script lang="ts">
  import { goto } from '$app/navigation'
  import BackgroundImageOverlay from '$lib/client/component/BackgroundImageOverlay.svelte';
  import Navbar from "$lib/client/component/Navbar.svelte";
  import {isLoggedIn} from "$lib/client/services/account";
  import games from "$lib/games.json"

  function goToCreateTournament() {
    if (isLoggedIn()) {
      goto("/tournament/create")
    } else {
      goto("/login")
    }
  }

</script>

<Navbar></Navbar>

<BackgroundImageOverlay src={games["ice_hockey"].bg} />

<div class="landing">
  <div class="section">
    <div>
      <div>
        
        <h1 class="title">Project 01</h1>
        <p>The leading tournament organization system.</p>

        <br />

        <p>
          With an easy-to-use graphical user interface to help manage 
          and scale your tournaments, we provide a plethora of tools to help
          run your events smoothly.
        </p>

      </div>
      <button class="special" on:click={goToCreateTournament}>Get started</button>

    </div>
  </div>
</div>

<style>

  .section {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  button.special {
    width: fit-content;
  }

  .section > div {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 2rem;
    max-width: 40rem;
  }

  .section > div > div {
    flex: 0;
  }

  div.img-container {
    width: 100%;
  }

  div.img-container img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  h1.title {
    font-size: 5rem;
  }
</style>
