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

  let code = ""

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
      <TournamentsIcon class="icon" height="20" width="20" />
      My Score Systems
    </div>
    <div class="menu-item" on:click={() => navigate("/my/tournaments")}>
      <ScoreSystemsIcon class="icon" height="20" width="20" />
      My Tournaments
    </div>
    <div class="menu-item" on:click={() => navigate("/my/contacts")}>
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
    }
  }
}
</style>
