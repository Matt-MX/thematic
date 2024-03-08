<script lang="ts">
  import { onMount } from 'svelte';
  import SearchIcon from '~icons/mdi/search'

  export let search = (query: string) => {}
  let inputRef: HTMLElement;
  let query: string;

  onMount(() => {
    inputRef.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        search(query);
      }
    })
  })

</script>

<div class="search-container box-style">
  <input bind:this={inputRef} bind:value={query} type="text" class="no-style" placeholder="Search" />
  <SearchIcon />
</div>

<style>
  .search-container {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .search-container input[type="text"] {
    flex: 1;
    font-size: 1.1rem;
  }

  .search-container :global(svg) {
    font-size: 1.1rem;
  }
</style>