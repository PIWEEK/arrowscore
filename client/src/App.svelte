<script>
	import { onMount } from 'svelte';
  import { Router, Route, navigate } from "svelte-navigator"
  import { localStorage } from "./services/storages"
  import MySessions from "./routes/MySessions.svelte"
  import RegisterOrLogin from "./routes/RegisterOrLogin.svelte"
  import Login from "./routes/Login.svelte"
  import Home from "./routes/Home.svelte"
  import ScoreSystemsNew from "./routes/ScoreSystemsNew.svelte"

  onMount(async () => {
    const authToken = localStorage.get("token")
    if (authToken) {
      navigate("/home/sessions")
    }
    else {
      navigate("/login")
    }
	})

</script>

<Router>
	<Route path="/home/*" component={Home} />
	<Route path="/score-systems/new" component={ScoreSystemsNew} />
	<Route path="/my-sessions" component={MySessions} />
	<Route path="/auth" component={RegisterOrLogin} />
	<Route path="/auth/login" component={Login} />
</Router>
