<script>
  import { Router, Route } from "svelte-navigator"
  import MySessions from "./routes/MySessions.svelte"
  import RegisterOrLogin from "./routes/RegisterOrLogin.svelte"
  import LoginTest from "./routes/logintest.svelte"
  import Home from "./routes/Home.svelte"
  import ScoreSystemsNew from "./routes/ScoreSystemsNew.svelte"
</script>

<Router>
	<Route path="/home/*" component={Home} />
	<Route path="/score-systems/new" component={ScoreSystemsNew} />
	<Route path="/my-sessions" component={MySessions} />
	<Route path="/auth" component={RegisterOrLogin} />
  <Route path="/login" component={LoginTest} />
</Router>
