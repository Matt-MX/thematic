<script>
  import Navbar from "$lib/client/component/Navbar.svelte";

</script>
<Navbar></Navbar>

<a href="/">
  <div class="page">
    <h1>404</h1>
    <p>Page not found</p>
  </div>
</a>

<style>
  .page {
    top: 0;
    position: absolute;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    z-index: -1;
  }

  h1 {
    font-size: 10rem;
  }

</style>