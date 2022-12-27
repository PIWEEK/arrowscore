<script>
	import { onMount } from 'svelte';
  import { Router, Route, navigate } from "svelte-navigator"
  import { localStorage } from "./services/storages"
  import RegisterOrLogin from "./routes/RegisterOrLogin.svelte"
  import Login from "./routes/Login.svelte"
  import Register from "./routes/Register.svelte"
  import Home from "./routes/Home.svelte"
  import SessionsNew from "./routes/SessionsNew.svelte"
  import TournamentSessionsNew from "./routes/TournamentSessionsNew.svelte"
  import TournamentsNew from "./routes/TournamentsNew.svelte"
  import SessionsAnnotations from "./routes/SessionsAnnotations.svelte"
  import SessionsFinished from "./routes/SessionsFinished.svelte"
  import SessionsSummary from "./routes/SessionsSummary.svelte"
  import ScoreSystemsNew from "./routes/ScoreSystemsNew.svelte"
  import MySessions from "./routes/MySessions.svelte"
  import MyTournamentSessions from "./routes/MyTournamentSessions.svelte"
  import TournamentsEdit from "./routes/TournamentsEdit.svelte"
  import MyTournaments from "./routes/MyTournaments.svelte"
  import TournamentsOngoing from "./routes/TournamentsOngoing.svelte"

  import MyScoreSystems from "./routes/MyScoreSystems.svelte"

  onMount(async () => {
    const authToken = localStorage.get("token")
    if (! authToken) {
      navigate("/auth")
    }
	})

</script>

<Router>
	<Route path="/home/*" component={Home} />
  <Route path="/score-systems/new">
     <ScoreSystemsNew />
  </Route>
  <Route path="/sessions/new">
    <SessionsNew />
  </Route>
  <Route path="/tournamentsessions/new">
    <TournamentSessionsNew />
  </Route>
  <Route path="/tournaments/new">
    <TournamentsNew />
  </Route>

  <Route path="/sessions/annotations/:sessionId" let:params>
    <SessionsAnnotations sessionId="{params.sessionId}"/>
  </Route>
  <Route path="/sessions/finished/:sessionId" let:params>
    <SessionsFinished sessionId="{params.sessionId}"/>
  </Route>
  <Route path="/sessions/annotations/:sessionId/summary" let:params>
    <SessionsSummary sessionId="{params.sessionId}"/>
  </Route>
  <Route path="/my/sessions">
    <MySessions />
  </Route>
  <Route path="/my/tournamentSessions">
    <MyTournamentSessions />
  </Route>

  <Route path="/tournaments/edit/:tournamentId" let:params>
    <TournamentsEdit tournamentId="{params.tournamentId}"/>
  </Route>
  <Route path="/tournaments/ongoing/:tournamentId" let:params>
    <TournamentsOngoing tournamentId="{params.tournamentId}"/>
  </Route>
  <Route path="/my/tournaments">
    <MyTournaments />
  </Route>
  <Route path="/my/score-systems">
    <MyScoreSystems />
  </Route>
  <Route path="/auth">
    <RegisterOrLogin />
  </Route>
  <Route path="/auth/login">
    <Login />
  </Route>
  <Route path="/auth/register">
    <Register />
  </Route>

</Router>
