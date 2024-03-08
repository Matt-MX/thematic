<script lang="ts">
  import Main from "$lib/client/component/Main.svelte";
  import Navbar from "$lib/client/component/Navbar.svelte";
  import Select from "svelte-select";
  import { goto } from "$app/navigation"

  const items = [
    { value: "single_elim", label: "Single Elimination" },
    { value: "double_elim", label: "Double Elimination" },
  ];

  let justValue = "";
  let body = {
    t_name: "",
    t_game: "",
    t_desc: "",
    t_date: "",
    t_time: "",
  }

  const submit = () => {
    fetch(`/api/tournament/create`, {
      method: "POST",
      body: JSON.stringify({
        ...body,
        t_type: justValue
      })
    }).then((data) => data.json())
      .then((json) => {
        if (!json.error) {
          console.error(json.error)
          return;
        }
        console.log(json)
        goto(`/tournament/${json}`)
      })
  }
</script>

<Navbar />

<Main>
  <h1>Create a tournament</h1>

  <form>
    <div class="form-row">
      <div class="form-elem-fill">
        <label for="t_name" aria-required="true">Tournament Name</label>
        <input
          bind:value={body.t_name}
          type="text"
          class="box-style form-elem-fill"
          id="t_name"
          placeholder="Name"
          required
        />
      </div>
      <div class="form-elem-fill">
        <label for="t_game">Game</label>
        <input
          bind:value={body.t_game}
          type="text"
          class="box-style form-elem-fill"
          id="t_game"
          placeholder="Game"
        />
      </div>
    </div>

    <div class="form-elem-fill">
      <label for="t_desc">Tournament Description</label>
      <textarea
        bind:value={body.t_desc}
        class="box-style form-elem-fill desc"
        id="t_desc"
        placeholder="Description"
      />
    </div>

    <div class="form-row">
      <div class="form-elem-fill">
        <label for="t_date" aria-required="true">Date</label>
        <input
          bind:value={body.t_date}
          type="date"
          class="box-style form-elem-fill"
          id="t_date"
          placeholder="Date"
          required
        />
      </div>
      <div>
        <label for="t_time">Time</label>
        <input
          bind:value={body.t_time}
          type="time"
          class="box-style form-elem-fill"
          id="t_time"
          placeholder="Time"
        />
      </div>
    </div>

    <span class="dot"></span>

    <div class="form-row">
      <div class="form-elem-fill">
        <label for="t_date" aria-required="true">Type</label>
        <Select
          bind:justValue
          {items}
          --item-color="var(--color)"
          --list-background="var(--background)"
          --item-active-background="var(--title)"
          --item-hover-bg="var(--title)"
          --list-border="1px solid var(--text)"
          --border-focused="1px solid var(--title)"
          --item-is-active-bg="var(--title)"
        />
      </div>
    </div>

    <span class="dot"></span>

    <div class="form-row buttons">
      <button class="danger form-elem-fill" type="reset">Reset</button>
      <button class="special form-elem-fill" type="submit" on:click={submit}>Create</button>
    </div>
  </form>
</Main>

<style>
  .desc {
    height: 6rem;
  }

  input[type="date"],
  input[type="time"] {
    color-scheme: dark;
  }

  @media only screen and (max-width: 600px) {
    .buttons {
      flex-direction: column-reverse;
    }
  }
</style>
