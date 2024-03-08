<script lang="ts">
  import Main from "$lib/client/component/Main.svelte";
  import Navbar from "$lib/client/component/Navbar.svelte";
  import SearchBar from "$lib/client/component/SearchBar.svelte";

  let results = [];

  const search = (query: string) => {
    fetch(`/api/tournament/search?q=${query}`)
      .then((data) => data.json())
      .then((json) => {
        results = json;
      });
  };
</script>

<Navbar />
<Main>
  <h1>Search</h1>
  <SearchBar {search} />

  {#if results.length == 0}
    <div class="box-style empty-result"><h2>No results</h2></div>
  {:else}
    {#each results as result}
      <div class="box-style"></div>
    {/each}
  {/if}
</Main>

<style>
  .empty-result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
</style>
