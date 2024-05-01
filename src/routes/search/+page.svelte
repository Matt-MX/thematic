<script lang="ts">
  import Main from "$lib/client/component/Main.svelte";
  import Navbar from "$lib/client/component/Navbar.svelte";
  import SearchBar from "$lib/client/component/SearchBar.svelte";
  import TournamentPreview from "$lib/client/component/TournamentPreview.svelte";

  const search = (query: string) => {
    location.href = "/search?q=" + encodeURIComponent(query);
  };

  export let data: any;
</script>

<Navbar />
<Main>
  <h1>Search</h1>
  <SearchBar {search} query={data.query} />

  <p>{!data || !data.results || data.results.length == 0 ? "No" : data.results.length} results</p>

  {#if data && data.results?.length && data.results.length > 0}
    {#each data.results as result}
      <TournamentPreview info={result} />
    {/each}
  {/if}
</Main>
