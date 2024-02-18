<script lang="ts">
  import { goto } from '$app/navigation'
  import Navbar from "$lib/client/component/Navbar.svelte";
  import {isLoggedIn} from "$lib/client/services/account";

  function goToCreateTournament() {
    if (isLoggedIn()) {
      goto("/tournament/create")
    } else {
      goto("/login")
    }
  }

</script>

<Navbar></Navbar>

<div class="landing">
  <div class="section">
    <div>
      <div>
        <h1 class="title">TBC</h1>
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
    <div class="img-container">
      <img src="https://trello.com/1/cards/65c96ad183efaca9ea043d27/attachments/65cf488feadfceb8d8f72934/previews/65cf4890eadfceb8d8f7295a/download/image.png" />
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
