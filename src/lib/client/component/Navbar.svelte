<script>
  import { isLoggedIn } from "../services/account";
</script>

<div class="topbar">
  <h1 class="title">TBC</h1>
  <div class="gap"></div>
  <a href="/">Home</a>
  <span class="dot"></span>
  <a href="/search">Search</a>
  <span class="dot"></span>

  {#if isLoggedIn()}
    <a href="/account">Account</a>
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
    background-color: var(--background);
  }

  .topbar .title {
    color: var(--title);
  }

  .topbar .gap {
    flex: 1;
  }

  .topbar a {
    padding: 0.3rem 1.5rem;
  }

  .topbar a:hover {
    padding: 0.5rem 1.5rem;
    border-bottom: 2px solid var(--text);

    transition: all 0.1s ease-in-out;
  }

  .topbar a.active {
    color: var(--title);
  }
</style>
