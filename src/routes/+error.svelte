<script>
  import Navbar from "$lib/client/component/Navbar.svelte";
  import Main from "$lib/client/component/Main.svelte";
</script>

<Navbar></Navbar>

<Main>
  <a href="/">
    <h1>404</h1>
    <p>Page not found</p>
  </a>
</Main>

<style scoped>
  :global(.main-container) {
    align-items: center;
  }

  :global(.main) {
    /* justify-content: center; */
    /* align-items: center; */
    /* text-align: center; */
  }

  a {
    text-decoration: none;
  }

  h1 {
    font-size: 10rem;
  }
</style>
