<script lang="ts">
  import Main from "$lib/client/component/Main.svelte";
  import Navbar from "$lib/client/component/Navbar.svelte";
  import { goto } from "$app/navigation";

  let type: "login" | "create" = "login";

  let formObject = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const createAccount = () => {
    if (type == "login") {
      type = "create";
      return;
    }

    // todo refactor to use service files
    
    // todo: create account `/account/create`
    fetch(`/api/account/create`, {
      method: "POST",
      body: JSON.stringify(formObject),
    })
      .then((data) => data.json())
      .then((json) => {
        localStorage.setItem("account_id", json);

        // todo now login
        fetch(`/api/account/login`, {
          method: "POST",
          body: JSON.stringify(formObject),
        })
          .then((data) => data.json())
          .then((json) => {
            if (json.error) {
              // todo
              return;
            }

            if (json.token && json.account_id) {
              localStorage.setItem("token", json.token);
              localStorage.setItem("account_id", json.account_id);

              goto("/");
            }
          });
      });
  };

  const login = () => {
    if (type == "create") {
      type = "login";
      return;
    }

    // todo: login `/account/login`
    fetch(`/api/account/login`, {
      method: "POST",
      body: JSON.stringify(formObject),
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.error) {
          // todo
          return;
        }

        if (json.token && json.account_id) {
          localStorage.setItem("token", json.token);
          localStorage.setItem("account_id", json.account_id);

          goto("/");
        }
      });
  };
</script>

<Navbar />
<Main>
  <h1>Login</h1>

  <form>
    <div class="form-column">
      <div class="form-elem-fill">
        <label for="username" aria-required="true">Username</label>
        <input
          bind:value={formObject.username}
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
          bind:value={formObject.password}
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
            bind:value={formObject.confirmPassword}
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
      <button class={type == "login" ? "special" : ""} on:click={login}
        >Login</button
      >
      <p>Or</p>
      <button class={type == "create" ? "special" : ""} on:click={createAccount}
        >Create Account</button
      >
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
