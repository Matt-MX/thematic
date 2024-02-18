<script lang="ts">
  import Main from "$lib/client/component/Main.svelte";
  import Navbar from "$lib/client/component/Navbar.svelte";

  let type: "login" | "create" = "login";

  const createAccount = () => {
    if (type == 'login') {
      type = 'create';
      return;
    }

    // todo: create account `/account/create`
  } 

  const login = () => {
    if (type == 'create') {
      type = 'login';
      return;
    }

    // todo: login `/account/login`
  }

</script>

<Navbar />
<Main>
  <h1>Login</h1>

  <form>
    <div class="form-column">
      <div class="form-elem-fill">
        <label for="username" aria-required="true">Username</label>
        <input
          type="text"
          class="box-style form-elem-fill"
          id="username"
          placeholder="Username"
          required
        />
      </div>

      <div class="form-elem-fill">
        <label for="password" aria-required="true">Password</label>
        <input
          type="password"
          class="box-style form-elem-fill"
          id="password"
          placeholder="Password"
          required
        />
      </div>

      {#if type == "create"}
        <div class="form-elem-fill">
          <label for="confirm-password" aria-required="true"
            >Confirm Password</label
          >
          <input
            type="password"
            class="box-style form-elem-fill"
            id="confirm-password"
            placeholder="Confirm Password"
            required
          />
        </div>
      {/if}
    </div>

    <div class="form-row" style="align-items: center;">
      <button class={type == 'login' ? 'special' : ""} on:click={login}>Login</button>
      <p>Or</p>
      <button class={type == 'create' ? 'special' : ""} on:click={createAccount}>Create Account</button>
    </div>
  </form>
</Main>

<style>
  .form-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media only screen and (max-width: 600px) {
  .form-row {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
