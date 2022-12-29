<script>
  import { navigate } from "svelte-navigator"
  import { localStorage } from "../services/storages"
  import { apiClient, logout } from "../services/api"
  import { syncData } from "../services/sync"

  import Button from "../components/Button.svelte"

  import SessionIcon from "../assets/svgs/icon-session.svg"
  import ScoreSystemsIcon from "../assets/svgs/icon-scoresystem.svg"
  import TournamentsIcon from "../assets/svgs/icon-tournament.svg"
  import TournamentSessionsIcon from "../assets/svgs/icon-tournamentsession.svg"

  import SettingsIcon from "../assets/svgs/icon-profile.svg"
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faSync } from '@fortawesome/free-solid-svg-icons/index.js'


  const navigateToChangePassword = () => {
    // TODO
    // navigate("/score-systems/new")
  }

  let syncInProgress = false

  async function syncServerData() {
    syncInProgress = true
    await syncData()
    syncInProgress = false
  }

</script>


<div class="settings">
  <h1>My data</h1>
  <div class="menu">
    <div class="menu-item" on:click={() => navigate("/my/sessions")}>
      <SessionIcon class="icon" height="20" width="20" />
      My Sessions
    </div>
    <div class="menu-item" on:click={() => navigate("/my/tournamentSessions")}>
      <TournamentSessionsIcon class="icon" height="20" width="20" />
      My Tournament Sessions
    </div>

    <div class="menu-item" on:click={() => navigate("/my/score-systems")}>
      <ScoreSystemsIcon class="icon" height="20" width="20" />
      My Score Systems
    </div>
    <div class="menu-item" on:click={() => navigate("/my/tournaments")}>
      <TournamentsIcon class="icon" height="20" width="20" />
      My Tournaments
    </div>
    <div class="menu-item disabled">
      <SettingsIcon class="icon" height="20" width="20" />
      My Contacts
    </div>
  </div>

  <div class="actions">
    <Button
      theme="secondary"
      on:click|once={navigateToChangePassword}
      disabled={true}>
      Change password
    </Button>
    <div class="btn-row">
      {#if syncInProgress}
      <Button
        on:click|once={syncServerData}>
        <Fa icon={faSync} spin/>
      </Button>
      {:else}
      <Button
        on:click|once={syncServerData}>
        Sync
      </Button>
      {/if}
      <Button
        theme="secondary"
        on:click|once={logout}>
        Logout
      </Button>
    </div>
  </div>
</div>


<style lang="postcss">
.settings{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
  padding: 5vh 0;

  & h1 {
    font-size: 2rem;
  }

  & .menu {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--color-gray-light);
    width: 100%;

    & .menu-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 20px 0;
      gap: 15px;
      border-bottom: 1px solid var(--color-gray-light);

      &.disabled {
        color: var(--color-gray);

        & :global(svg) {
          fill: var(--color-gray);
          stroke: var(--color-gray);
        }
      }
    }
  }

  & .actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: auto;

    & .btn-row {
      border-top: 1px solid var(--color-gray-light);
      display: flex;
      width: 100%;
      gap: 1rem;
      padding-top: 1rem;
    }
  }
}
</style>
