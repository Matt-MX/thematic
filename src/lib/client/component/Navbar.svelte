<script>
  import { isLoggedIn, getCachedAccountId } from "../services/account";
</script>

<div class="topbar">
  <a class="title" href="/"><h1>Project01</h1></a>
  <div class="gap"></div>
  <a href="/browse">Browse</a>
  <span class="dot"></span>
  <a href="/search">Search</a>
  <span class="dot"></span>

  {#if isLoggedIn()}
    <!-- <a href="/account/tournaments">Your Tournaments</a> -->
    <a href="/account/{getCachedAccountId()}">Account</a>
  {:else}
    <a href="/login">Login</a>
  {/if}
</div>

<style>
  .topbar {
    position: sticky;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 2rem;
    box-sizing: border-box;
    /* background-color: var(--background); */
  }

  .topbar .gap {
    flex: 1;
  }

  .topbar a:not(.title) {
    padding: 0.3rem 1.5rem;
  }

  .topbar a:not(.title):hover {
    padding: 0.5rem 1.5rem;
    border-bottom: 2px solid var(--text);

    transition: all 0.1s ease-in-out;
  }

  .topbar a:not(.title).active {
    color: var(--title);
  }

  a {
    text-decoration: none;
  }
</style>
