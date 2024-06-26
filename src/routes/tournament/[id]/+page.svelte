<script lang="ts">
  import Main from "$lib/client/component/Main.svelte";
  import Navbar from "$lib/client/component/Navbar.svelte";
  import Avatar from "$lib/client/component/Avatar.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import games from "$lib/games.json";
  import types from "$lib/types.json";
  import type GameType from "$lib/schema/GameType";
  import {
    getCachedAccountId,
    getCachedToken,
  } from "$lib/client/services/account";
  import BackgroundImageOverlay from "$lib/client/component/BackgroundImageOverlay.svelte";
  import { page } from "$app/stores";

  export let data: PageData;

  const gameType: GameType = games[data.game] as GameType;
  const tournamentTypeName: string = types[data.type].label;

  let isOwner: boolean;

  type Tab = "overview" | "teams" | "settings";
  let tab: Tab;

  onMount(() => {
    isOwner = data.owner_id == getCachedAccountId();

    const url = $page.url;
    tab = (url.searchParams.get("tab") as Tab) || "overview";
  });

  let teamInputErrorMsg: string | undefined;
  let teamInputRef: HTMLInputElement;
  const addTeamMember = (event: SubmitEvent) => {
    const team = teamInputRef.value;
    if (!team) {
      teamInputErrorMsg = "Enter a valid team.";
      return;
    }

    if (data.teams.includes(team) == true) {
      teamInputErrorMsg = "A team by that name already exists!";
      return;
    }

    fetch(`/api/bracket/${data.id}/teams`, {
      method: "POST",
      headers: {
        team: team,
        "X-Authorization": getCachedToken()!!,
      },
    }).then((res) => {
      if (res.status == 200) {
        data.teams = [...data.teams, team];
      } else {
        teamInputErrorMsg = "An error occurred! " + res.status;
      }
    });
  };

  const removeTeam = (team: string) => {
    fetch(`/api/bracket/${data.id}/teams`, {
      method: "DELETE",
      headers: {
        team: team,
        "X-Authorization": getCachedToken()!!,
      },
    }).then((res) => {
      if (res.status == 200) {
        data.teams = data.teams.filter((t: any) => t !== team);
      } else {
        teamInputErrorMsg = "An error occurred! " + res.status;
      }
    });
  };
</script>

<Navbar />

<Main>
  {#if gameType.bg}
    <BackgroundImageOverlay src={gameType.bg} />
  {/if}

  <div class="panel">
    <div class="box sidebar">
      <div class="info">
        <h2>{data.title}</h2>

        <div>
          <h5>Organizer</h5>
          <hr />
        </div>
        <div class="organizer">
          <div class="avatar">
            <Avatar
              url="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            />
          </div>
          <h3>{data.owner.username}</h3>
        </div>

        <div>
          <h5>Tags</h5>
          <hr />
        </div>
        <div class="extra">
          <span>{gameType.name}</span>
          <span>In person</span>
          <span>{tournamentTypeName}</span>
        </div>
      </div>

      {#if isOwner}
        <h2>Manage</h2>
      {:else}
        <h2>View</h2>
      {/if}
      <ul>
        <li>
          <a
            href="?tab=overview"
            on:click={() => {
              tab = "overview";
            }}>Overview</a
          >
        </li>
        <li>
          <a
            href="?tab=teams"
            on:click={() => {
              tab = "teams";
            }}>Teams</a
          >
        </li>
        {#if isOwner}
          <li>
            <a
              href="?tab=settings"
              on:click={() => {
                tab = "settings";
              }}>Settings</a
            >
          </li>
        {/if}
      </ul>
    </div>

    {#if tab == "overview"}
      <div class="flex-column" style="gap: 1rem;">
        <div class="info flex-column">
          <h1>Tournament Info</h1>
          <div class="box flex-column">
            <div>
              <h1>{data.title}</h1>
              <a
                class="organizer"
                href="/account/{data.owner_id}"
                title="Tournament organizer"
              >
                <p>Organizer / <b>{data.owner?.username}</b></p>
              </a>
            </div>
            <div class="meta flex-row">
              <div>
                <h3>Game</h3>
                <p>{gameType?.name}</p>
              </div>
              {#if data.desc && data.desc.length > 0}
                <div>
                  <h3>Description</h3>
                  <p>{data.desc}</p>
                </div>
              {/if}
              <div>
                <h3>Location</h3>
                <p>In person</p>
              </div>
              <div>
                <h3>Type</h3>
                <p>Single Elimination</p>
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          {#if data.currentState}
            Bracket here
          {:else}
            <p>The bracket will appear here once the game has begun.</p>
            <a
              href="?tab=teams"
              on:click={() => {
                tab = "teams";
              }}>View the teams</a
            >
          {/if}
        </div>
      </div>
    {:else if tab == "teams"}
      <div>
        <h1>Teams</h1>
        <div class="box flex-column">
          {#if !data.currentState}
            {#if isOwner}
              {#if teamInputErrorMsg}
                <p class="danger">{teamInputErrorMsg}</p>
              {/if}
              <form on:submit={addTeamMember} class="flex-row">
                <input
                  bind:this={teamInputRef}
                  id="team"
                  type="text"
                  class="box"
                  style="padding: 0.5rem 1rem"
                  required
                />
                <button type="submit" class="box confirm">Add Team</button>
              </form>
            {/if}
          {:else}
            <p>The tournament has started, no more teams can be added.</p>
          {/if}

          {#each data.teams as team}
            <div class="team flex-row">
              <p>{team}</p>
              {#if !data.currentState && isOwner}
                <button class="danger" on:click={() => removeTeam(team)}
                  >Remove</button
                >
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {:else if tab == "settings"}
      <div>
        <h1>Settings</h1>
        <div class="box flex-column">
          <p>todo</p>
        </div>
      </div>
    {/if}
  </div>
</Main>

<style lang="scss" scoped>
  // :global(.main) {
  //   width: 100% !important;
  //   height: 100% !important;
  // }

  .team {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    border: 1px solid var(--background-alt);
    padding: 0.3rem 1rem;
    border-radius: 0.2rem;

    button {
      padding: 0.1rem 0.5rem;
    }
  }

  .panel {
    display: flex;
    gap: 1rem;
    height: 100%;
  }

  .sidebar {
    position: relative;
    flex: 0.12;
    min-width: 12rem;
    box-sizing: border-box;
    padding: 0;

    h2 {
      text-align: center;
      padding: 0.5rem 1rem;
    }

    h5 {
      font-weight: 300;
    }

    .info {
      display: flex;
      flex-direction: column;
      padding: 0.5rem 1rem;
      gap: 1rem;
      box-sizing: border-box;
      background-color: var(--background-alt);
      border-bottom: 1px solid var(--text);

      hr {
        width: 100%;
        height: 1px;
        background: radial-gradient(
          circle,
          rgb(255, 255, 255) 0%,
          #ffffff00 100%
        );
      }

      .organizer {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 0.75rem;

        .avatar {
          height: 2rem;
        }
      }

      .extra {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        row-gap: 0.1rem;
        column-gap: 0.1rem;
        font-size: 0;

        span {
          text-align: center;
          font-size: 0.65rem;
          background-color: var(--background);
          color: var(--text);
          font-weight: 500;
          padding: 0.1rem 0.5rem;
          box-sizing: border-box;
          border-radius: 1rem;
        }
      }
    }

    > ul {
      list-style: none;
      li {
        padding: 0.5rem 1rem;
        box-sizing: border-box;
      }
      a {
        text-decoration: none !important;
        padding: 0.5rem 1rem;
      }
      li:hover,
      li.selected {
        background-color: var(--background-alt);
      }
    }
  }

  p.danger {
    color: var(--danger);
  }

  a.organizer {
    text-decoration: none;
    width: auto;
  }

  .meta {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .meta h3 {
    color: var(--background-alt);
  }

  .meta p {
    color: var(--dull);
  }

  .organizer :global(.avatar-container) {
    height: 100%;
  }

  :global(.main) {
    /* position: absolute !important; */
    height: 100%;
    /* flex-direction: row !important; */
    flex-wrap: nowrap;
  }
</style>
