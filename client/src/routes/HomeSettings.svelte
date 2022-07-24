<script>
  import { navigate } from "svelte-navigator"
  import { localStorage } from "../services/storages"
  import { apiClient } from "../services/api"
  import Button from "../components/Button.svelte"

  import SessionIcon from "../assets/svgs/icon-session.svg"
  import ScoreSystemsIcon from "../assets/svgs/icon-score.svg"
  import TournamentsIcon from "../assets/svgs/icon-tournament.svg"
  import SettingsIcon from "../assets/svgs/icon-profile.svg"


  const navigateToChangePassword = () => {
    // TODO
    // navigate("/score-systems/new")
  }

  const syncData = async () => {
    // Sync score Systems
    const localScoreSystems = localStorage.get("scoreSystems") || []
    const unsyncScoreSystems = localScoreSystems.filter(sc => sc.apiid === null)
    const newScoreSystems = localScoreSystems.filter(sc => sc.apiid !== null)

    // seed for the future download with code
    const {data} = await apiClient(
      "GET",
      "score-systems?filters[author][username][$eq]=arrowscore",
    )
    console.log(data)


    let existingLocalScoreSystems = []
    for (const i of localStorage.get("scoreSystems")){
      existingLocalScoreSystems.push(i["apiid"])
    }
    console.log(existingLocalScoreSystems)

    for (const d of data){
      if (! existingLocalScoreSystems.includes(d.attributes["apiid"])){
        newScoreSystems.push(d.attributes)
        console.log("YEAH!")
      }
    }

    for (const scoreSystem of unsyncScoreSystems) {
      const {data} = await apiClient(
        "POST", "score-systems?populate=*",
        { data: scoreSystem }
      )
      console.log(data)
      newScoreSystems.push(data.attributes)
    }
    console.log(newScoreSystems)
    localStorage.set("scoreSystems", newScoreSystems)
  }

  const getSSWithCODE = async () => {
    // Sync score Systems
    const localScoreSystems = localStorage.get("scoreSystems") || []
    const unsyncScoreSystems = localScoreSystems.filter(sc => sc.apiid === null)
    const newScoreSystems = localScoreSystems.filter(sc => sc.apiid !== null)

    for (const scoreSystem of unsyncScoreSystems) {
      const {data} = await apiClient(
        "POST", "score-systems?populate=*",
        { data: scoreSystem }
      )
      console.log(data)
      newScoreSystems.push(data.attributes)
    }
    console.log(newScoreSystems)
    localStorage.set("scoreSystems", newScoreSystems)
  }

  const logout = () => {
    //localStorage.clear()
    localStorage.remove("token")
    localStorage.remove("user")
    navigate("/auth")
  }
</script>


<div class="settings">
  <h1>Settings</h1>
  <div class="menu">
    <div class="menu-item" on:click={() => navigate("/my/sessions")}>
      <SessionIcon class="icon" height="20" width="20" />
      My Sessions
    </div>
    <div class="menu-item" on:click={() => navigate("/my/score-systems")}>
      <ScoreSystemsIcon class="icon" height="20" width="20" />
      My Score Systems
    </div>
    <div class="menu-item disabled">
      <TournamentsIcon class="icon" height="20" width="20" />
      My Tournaments
    </div>
    <div class="menu-item disabled">
      <SettingsIcon class="icon" height="20" width="20" />
      My Contacts
    </div>
  </div>

  <Button
    type="secondary"
    on:click|once={navigateToChangePassword}
    disabled={true}>
    Change password
  </Button>
  <div class="btn-row">
    <Button
      on:click|once={syncData}>
      Initiate sync
    </Button>
    <Button
      type="secondary"
      on:click|once={logout}>
      Logout
    </Button>
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

  & .btn-row {
    border-top: 1px solid var(--color-gray-light);
    display: flex;
    width: 100%;
    gap: 1rem;
    padding-top: 1rem;
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
}
</style>
