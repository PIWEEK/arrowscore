<script>
  import { navigate } from "svelte-navigator"
  import { localStorage } from "../services/storages"
  import { apiClient } from "../services/api"
  import Button from "../components/Button.svelte"

  import SessionIcon from "../assets/svgs/icon-session.svg"
  import ScoreSystemsIcon from "../assets/svgs/icon-scoresystem.svg"
  import TournamentsIcon from "../assets/svgs/icon-tournament.svg"
  import TournamentSessionsIcon from "../assets/svgs/icon-tournamentsession.svg"

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

    const unfirstsyncTournaments = localTournaments.filter(t => ! t.attributes.firstsync)
    //const unsyncTournaments = localTournaments.filter(t => ! t.attributes.synced)
    const unfinishedTournaments = localTournaments.filter(t => ! t.attributes.finished &&  t.attributes.firstsync)

    const newTournaments = localTournaments.filter(t => t.attributes.finished)



    // seed for the future download with code
    const {data} = await apiClient(
      "GET",
      "score-systems?populate=*&filters[author][username][$eq]=arrowscore",
    )


    // ScoreSystems

    let existingLocalScoreSystems = []
    for (const i of localScoreSystems){
      existingLocalScoreSystems.push(i.attributes["apiid"])
    }

    for (const d of data){
      if (! existingLocalScoreSystems.includes(d.attributes["apiid"])){
        newScoreSystems.push(d)
        console.log("New SS!")
      }
      else {
        console.log("Dup SS!")
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
    localStorage.set("scoreSystems", newScoreSystems)

    // Tournaments


    for (const tournament of unfirstsyncTournaments) {

      const ssName = tournament.attributes.score_system.data.attributes.name

      let selectedss = null
      for (const nss of newScoreSystems) {
        if (nss.attributes.name == ssName){
        selectedss = nss
        }
      }
      console.log("selectedT "+selectedss.attributes.name)

      tournament.attributes.score_system = selectedss.id
      tournament.attributes.synced = false
      tournament.attributes.firstsync = true
      console.log("stringify "+JSON.stringify(tournament))
      const {data} = await apiClient(
        "POST", "tournaments?populate=*",
        { data: tournament.attributes }
      )
      data.attributes.id = data.id
      newTournaments.push(data)
    }

    
    // Sessions
    for (const session of unsyncSessions) {

      // if first time we send data
      if (! session.firstsync){
        const ssName = session.score_system.data.attributes.name
      
        let selectedt = null
      // check for a tournament session
        if  (session.tournament.attributes != null) {
          const tName = session.tournament.attributes.name 

          for (const nt of unfinishedTournaments) { //TODO, check when tournament is finished to abort session update
            if (nt.attributes.name == tName){
            selectedt = nt
            }
            session.tournament = selectedt.id
          }
          console.log("selectedt "+selectedt.attributes.name)
        }
        else { // plain session
          console.log("ELSE!!")
          delete session.tournament
        }

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
      console.log("Actualizamos Session")
      const {data} = await apiClient(
        "PUT", "sessions/"+session.id+"?populate=*",
        { data: {scores: session.scores} }
      )
      data.attributes.id = data.id
      newSessions.push(data.attributes)
    }
  }
  for (const tournament of unfinishedTournaments) {

const {data} = await apiClient(
  "GET", "tournaments/"+tournament.id+"?populate=*"
)
data.attributes.id = data.id
newTournaments.push(data)
}

localStorage.set("tournaments", newTournaments)


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
