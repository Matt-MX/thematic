<script lang="ts">
  import Main from "$lib/client/component/Main.svelte";
  import Navbar from "$lib/client/component/Navbar.svelte";
  import Select from "svelte-select";
  import { goto } from "$app/navigation";
  import Textarea from "$lib/client/component/Textarea.svelte";
  import InputBox from "$lib/client/component/InputBox.svelte";
    import { getCachedToken } from "$lib/client/services/account";

  const items = [
    { value: "single_elim", label: "Single Elimination" },
    { value: "double_elim", label: "Double Elimination" },
  ];

  const games = [
    { value: "cs2", label: "CS2" },
    { value: "rs6", label: "Rainbox Six Seige" },
    { value: "mc", label: "Minecraft" },
  ];

  let justValue = "";
  let body = {
    t_name: "",
    t_game: "",
    t_desc: "",
    t_date: "",
    t_time: "",
  };

  const submit = () => {
    fetch(`/api/tournament/create`, {
      method: "POST",
      body: JSON.stringify({
        ...body,
        t_type: justValue,
      }),
      headers: {
        'X-Authorization': getCachedToken() || "null"
      }
    })
      .then((data) => data.json())
      .then((json) => {
        if (!json.error) {
          console.error(json.error);
          return;
        }
        console.log(json);
        goto(`/tournament/${json}`);
      });
  };
</script>

<Navbar />

<Main>
  <h1>Create a tournament</h1>

  <form>
    <div class="form-column">
      <div class="form-elem-fill">
        <InputBox
          name="Tournament Name"
          placeholder="Name"
          required={true}
          bind:value={body.t_name}
        />
      </div>
      <div class="form-elem-fill">
        <label for="" aria-required="false">Game</label>
        <Select
          bind:justValue={body.t_game}
          items={games}
          --item-color="var(--color)"
          --list-background="var(--background)"
          --item-active-background="var(--title)"
          --item-hover-bg="var(--title)"
          --list-border="1px solid var(--text)"
          --border-focused="1px solid var(--title)"
          --item-is-active-bg="var(--title)"
        />
      </div>

      <div class="form-elem-fill">
        <Textarea
          bind:value={body.t_desc}
          title="Tournament Description"
          placeholder="Description"
          id="t_desc"
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
          <label for="" aria-required="true">Type</label>
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
        <button class="special form-elem-fill" type="submit" on:click={submit}
          >Create</button
        >
      </div>
    </div>
  </form>
</Main>

<style>
  input[type="date"],
  input[type="time"] {
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
