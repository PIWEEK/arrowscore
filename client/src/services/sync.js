import { localStorage } from "../services/storages"
import { apiClient } from "../services/api"


export const syncData = async () => {
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
    const unfinishedTournaments = localTournaments.filter(t => (! t.attributes.finished) &&  (t.attributes.firstsync))

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
      scoreSystem.attributes.firstsync = true
      scoreSystem.attributes.synced = true
      const {data} = await apiClient(
        "POST", "score-systems?populate=*",
        { data: scoreSystem.attributes }
      )
      console.log("return from POST SS"+data)
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
      tournament.attributes.synced = true
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
        if  (session.tournament.data != null) {
          const tName = session.tournament.data.attributes.name 

          for (const nt of unfinishedTournaments) { //TODO, check when tournament is finished to abort session update
            if (nt.attributes.name == tName){
            selectedt = nt
            console.log("selectedt"+selectedt)
            session.tournament = selectedt.id
            }
          }

          //WAAAA y qué pasa si no se cumple el if

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
