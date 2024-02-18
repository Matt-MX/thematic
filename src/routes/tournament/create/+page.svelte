<script>
  import Main from "$lib/client/component/Main.svelte";
  import Navbar from "$lib/client/component/Navbar.svelte";
  import Select from "svelte-select";

  const items = [
    { value: "single_elim", label: "Single Elimination" },
    { value: "double_elim", label: "Double Elimination" },
  ];

  let justValue = "";
</script>

<Navbar />

<Main>
  <h1>Create a tournament</h1>

  <form>
    <div class="form-row">
      <div class="form-elem-fill">
        <label for="t_name" aria-required="true">Tournament Name</label>
        <input
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
        class="box-style form-elem-fill desc"
        id="t_desc"
        placeholder="Description"
      />
    </div>

    <div class="form-row">
      <div class="form-elem-fill">
        <label for="t_date" aria-required="true">Date</label>
        <input
          type="date"
          class="box-style form-elem-fill"
          id="t_date"
          placeholder="Date"
          required
        />
      </div>
      <div>
        <label for="t_date">Time</label>
        <input
          type="time"
          class="box-style form-elem-fill"
          id="t_date"
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

    <div class="form-row">
      <button class="danger form-elem-fill" type="reset">Reset</button>
      <button class="special form-elem-fill" type="submit">Create</button>
    </div>
  </form>
</Main>

<style>
  .desc {
    height: 6rem;
  }
</style>
