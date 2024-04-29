<script lang="ts">
  import Main from "$lib/client/component/Main.svelte";
  import Navbar from "$lib/client/component/Navbar.svelte";
  import Select from "svelte-select";
  import { goto } from "$app/navigation";
  import Textarea from "$lib/client/component/Textarea.svelte";
  import InputBox from "$lib/client/component/InputBox.svelte";
  import { getCachedToken } from "$lib/client/services/account";
  import types from "$lib/types.json";
  import games from "$lib/games.json";

  const tournamentTypes = Object.entries(types).map((i) => {
    return { value: i[0], label: i[1].label };
  });

  const gameTypes = Object.entries(games).map((i) => {
    return { value: i[0], label: i[1].name }
  })

  let body = {
    name: "",
    game: "",
    desc: "",
    date_start: "",
    date_end: undefined,
    type: "",
  };

  // todo handle errors
  const submit = () => {
    fetch(`/tournament/create`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "X-Authorization": getCachedToken() || "null",
      },
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.error) {
          console.error(json.error);
          return;
        }
        goto(`/tournament/${json}`);
      });
  };
</script>

<Navbar />

<Main>
  <h1>Create a tournament</h1>

  <form on:submit={submit}>
    <div class="form-column">
      <div class="form-elem-fill">
        <InputBox
          name="Tournament Name"
          placeholder="Name"
          required={true}
          bind:value={body.name}
        />
      </div>
      <div class="form-elem-fill">
        <label for="" aria-required="false">Game</label>
        <Select
          bind:justValue={body.game}
          items={gameTypes}
          --item-color="var(--color)"
          --list-background="var(--background)"
          --item-active-background="var(--background-alt)"
          --item-hover-bg="var(--background-alt)"
          --list-border="1px solid var(--text)"
          --border-focused="1px solid var(--title)"
          --item-is-active-bg="var(--title)"
        />
      </div>

      <div class="form-elem-fill">
        <Textarea
          bind:value={body.desc}
          title="Tournament Description"
          placeholder="Description"
          id="t_desc"
        />
      </div>

      <div class="form-row">
        <div class="form-elem-fill">
          <label for="t_date" aria-required="true">Starting</label>
          <input
            bind:value={body.date_start}
            type="datetime-local"
            class="box-style form-elem-fill"
            id="t_date"
            placeholder="Date"
            required
          />
        </div>
        <div class="form-elem-fill">
          <label for="t_date" aria-required="false">Ending</label>
          <input
            bind:value={body.date_end}
            type="datetime-local"
            class="box-style form-elem-fill"
            id="t_date"
            placeholder="Date"
          />
        </div>
      </div>

      <span class="dot"></span>

      <div class="form-row">
        <div class="form-elem-fill">
          <label for="" aria-required="true">Type</label>
          <Select
            bind:justValue={body.type}
            items={tournamentTypes}
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
        <button class="confirm form-elem-fill" type="submit">Create</button>
      </div>
    </div>
  </form>
</Main>

<style>
  input[type="datetime-local"] {
    color-scheme: dark;
  }

  :global(textarea) {
    height: 7.5rem;
  }

  @media only screen and (max-width: 600px) {
    .buttons {
      flex-direction: column-reverse;
    }
  }
</style>
