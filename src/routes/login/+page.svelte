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
              console.error(json.error)
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

    // todo: login `/account/login`
    fetch(`/api/account/login`, {
      method: "POST",
      body: JSON.stringify(formObject),
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.error) {
          // todo
          console.error(json.error)
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
  <div class="form-container">
    <div>
      {#if type == "create"}
        <p>Start for free</p>
        <h1>Create Account</h1>
        <p class="already-member">
          Already a member? <a href="#" on:click={() => (type = "login")}
            >Log in</a
          >
        </p>
      {:else}
        <h1>Login</h1>
        <p class="already-member">
          Don't have an account? <a href="#" on:click={() => (type = "create")}
            >Create one</a
          >
        </p>
      {/if}
    </div>

    <form class="account-form">
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

      {#if type == "create"}
        <button on:click={createAccount}>Create Account</button>
      {:else}
        <button on:click={login}>Log in</button>
      {/if}
    </form>
  </div>
</Main>

<style scoped>
  :global(.main-container) {
    position: absolute;
    top: -2rem;
    flex-direction: column;
    padding: 3rem;
    box-sizing: border-box;
  }

  .form-container {
    width: auto;
  }

  .form-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .account-form {
    max-width: 30rem;
  }

  h1,
  p {
    margin: 0;
    padding: 0;
  }

  .already-member {
    color: var(--dull);
  }

  @media only screen and (max-width: 600px) {
    .form-row {
      flex-direction: row;
      justify-content: space-between;
    }
    :global(.main-container) {
      flex-direction: row;
      padding: 0;
    }
  }
</style>
