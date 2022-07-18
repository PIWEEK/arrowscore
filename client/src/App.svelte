<script>
  import { Router, Link, Route } from "svelte-navigator";
  import MySessions from "./routes/MySessions.svelte";
  import RegisterOrLogin from './routes/RegisterOrLogin.svelte';

  import svelteLogo from './assets/svelte.svg'
  import Counter from './components/Counter.svelte'
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <Router>
    <div>
      <Link to="my-sessions">My Sessions</Link>
      <Link to="auth">Register or Login</Link>
    </div>

	<Route path="my-sessions" component={MySessions} />
	<Route path="auth" component={RegisterOrLogin} />
  </Router>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
