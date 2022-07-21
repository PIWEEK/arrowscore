<script>
	import { onMount } from 'svelte';
  import { Router, Route, navigate } from "svelte-navigator"
  import { localStorage } from "./services/storages"
  import MySessions from "./routes/MySessions.svelte"
  import RegisterOrLogin from "./routes/RegisterOrLogin.svelte"
  import Login from "./routes/Login.svelte"
  import Register from "./routes/Register.svelte"
  import Home from "./routes/Home.svelte"
  import ScoreSystemsNew from "./routes/ScoreSystemsNew.svelte"
  import SessionsAnnotations from "./routes/SessionsAnnotations.svelte"
  import SessionsNew from "./routes/SessionsNew.svelte"

  onMount(async () => {
    const authToken = localStorage.get("token")
    if (authToken) {
      navigate("/home/sessions")
    }
    else {
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
  <Route path="/sessions/annotations/:sessionPos" let:params>
    <SessionsAnnotations sessionPos="{params.sessionPos}"/>
  </Route>
  <Route path="/my-sessions">
    <MySessions />
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
