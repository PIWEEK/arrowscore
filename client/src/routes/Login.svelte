<script>
  import { navigate } from "svelte-navigator";
  import Button from "../components/Button.svelte"
  import { localStorage } from "../services/storages"
  import { apiClient } from "../services/api"
  import { syncData } from "../services/sync"
  import ACLogo from "../assets/svgs/ac-icon-white.svg"
  import backgroundImage from "../assets/imgs/bg-targets.png"

  const data = {
    identifier: "",
    password: ""
  }

  let showError = false;

  const onSubmit = async () => {
    const res = await apiClient("POST", "auth/local", data)

    if (res.user) {
      localStorage.set("token", res.jwt)
      localStorage.set("user", res.user)

      const localScoreSystems = localStorage.get("scoreSystems") || []
      const localSessions = localStorage.get("sessions") || []
      const localTournaments = localStorage.get("tournaments") || []

      if (localScoreSystems.length == 0){
        localStorage.set("scoreSystems", [])
      }
      if (localSessions.length == 0){
        localStorage.set("sessions", [])
      }
      if (localTournaments.length == 0){
        localStorage.set("tournaments", [])
      }
      syncData()

      navigate("/home/sessions")
    }
    else {
      showError = true
    }
  }
</script>


<div class="login" style:background-image={`url(${backgroundImage})`}>
  <header>
    <ACLogo height="100" width="100" />
    <h1>Login</h1>
  </header>
  {#if showError }
  <div class="error">
    Invalid email or password.
  </div>
  {/if}
  <main>
    <form on:submit|preventDefault={onSubmit}>
      <div class="field">
        <label for="email">Email</label>
        <input
          autocomplete="off"
          type="text"
          id="email"
          name="email"
          placeholder="user@example.com"
          bind:value={data.identifier} />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input
          autocomplete="off"
          type="password"
          id="password"
          name="password"
          placeholder="********"
          bind:value={data.password} />
      </div>

      <Button type="submit" disabled={data.identifier === "" || data.password === ""}>
        Let's go
      </Button>
    </form>
  </main>
</div>


<style lang="postcss">
.login{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  height: 100vh;
  width: 100vw;
  padding: 70px 22px 20px 22px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  & header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & h1 {
      font-size: 2rem;
      margin-top: 2rem;
    }
  }
  & main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  & .error {
    border: 2px solid var(--color-red);
    color: var(--color-red);
    padding: .5rem;
  }

  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.4rem;
    width: 100%;

    & .field {
      display: flex;
      flex-direction: column;
      gap: .4rem;
      width: 100%;

      & label {
        font-family: 'Manrope', serif;
        font-weight: 600;
        font-size: 1.1rem;
        padding-left: .5rem;
      }
    }
  }
}
</style>

