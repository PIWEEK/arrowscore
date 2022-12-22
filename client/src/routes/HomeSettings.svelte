<script>
  import { navigate } from "svelte-navigator"
  import { localStorage } from "../services/storages"
  import { apiClient } from "../services/api"
  import Button from "../components/Button.svelte"

  import SessionIcon from "../assets/svgs/icon-session.svg"
  import ScoreSystemsIcon from "../assets/svgs/icon-scoresystem.svg"
  import TournamentsIcon from "../assets/svgs/icon-tournament.svg"
  import SettingsIcon from "../assets/svgs/icon-profile.svg"


  const navigateToChangePassword = () => {
    // TODO
    // navigate("/score-systems/new")
  }

  const syncData = async () => {
    // Sync score Systems
    const localScoreSystems = localStorage.get("scoreSystems") || []
    const localSessions = localStorage.get("sessions") || []
    const localTournaments = localStorage.get("tournaments") || []

    const unsyncScoreSystems = localScoreSystems.filter(sc => ! sc.attributes.firstsync)
    const newScoreSystems = localScoreSystems.filter(sc => sc.attributes.firstsync)

    const unsyncSessions = localSessions.filter(s => ! s.synced)
    const newSessions = localSessions.filter(s => s.synced)

    console.log("unsyncSessions"+unsyncSessions)
    console.log("newSessions"+newSessions)


    // seed for the future download with code
    const {data} = await apiClient(
      "GET",
      "score-systems?populate=*&filters[author][username][$eq]=arrowscore",
    )
    console.log("official score systems "+data)


    let existingLocalScoreSystems = []
    for (const i of localScoreSystems){
      existingLocalScoreSystems.push(i.attributes["apiid"])
    }

    for (const d of data){
      if (! existingLocalScoreSystems.includes(d.attributes["apiid"])){
        newScoreSystems.push(d)
        console.log("YEAH!")
      }
      else {
        console.log("Dup!")
      }
    }

    for (const scoreSystem of unsyncScoreSystems) {
      const {data} = await apiClient(
        "POST", "score-systems?populate=*",
        { data: scoreSystem.attributes }
      )
      console.log("return from POST SS"+data)
      data.attributes.firstsync = true
      newScoreSystems.push(data)
    }
    console.log(newScoreSystems)
    localStorage.set("scoreSystems", newScoreSystems)

    
    for (const session of unsyncSessions) {

      if (! session.firstsync){
      const ssName = session.score_system.data.attributes.name

      let selectedss = null
      for (const nss of newScoreSystems) {
        if (nss.attributes.name == ssName){
        selectedss = nss
        }
      }
      console.log("selectedss "+selectedss.attributes.name)

      session.score_system = selectedss.id
      session.synced = true
      session.firstsync = true
      console.log("stringify "+JSON.stringify(session))
      const {data} = await apiClient(
        "POST", "sessions?populate=*",
        { data: session }
      )
      data.attributes.id = data.id
      newSessions.push(data.attributes)
    }
    else {
      console.log("tenemos un firstsync!")
      const {data} = await apiClient(
        "PUT", "sessions/"+session.id+"?populate=*",
        { data: {scores: session.scores} }
      )
      data.attributes.id = data.id
      newSessions.push(data.attributes)
    }
  }
    localStorage.set("sessions", newSessions)

  }


  const logout = () => {
    //localStorage.clear()
    localStorage.remove("token")
    localStorage.remove("user")
    localStorage.remove("scoreSystems")
    localStorage.remove("sessions")
    localStorage.remove("tournaments")

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
      <Button
        on:click|once={syncData}>
        Initiate sync
      </Button>
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
