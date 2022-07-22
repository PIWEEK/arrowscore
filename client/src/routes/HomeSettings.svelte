<script>
  import { navigate } from "svelte-navigator"
  import { localStorage } from "../services/storages"
  import { apiClient } from "../services/api"
  import Button from "../components/Button.svelte"
  import img from "../assets/imgs/img-score.png"

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
      const data = await apiClient(
        "POST", "score-systems?populate=*",
        { data: scoreSystem }
      )
      newScoreSystems.push(data.attributes)
    }

    localStorage.set("scoreSystems", newScoreSystems)
  }

  const logout = () => {
    //localStorage.clear()
    localStorage.remove("token")
    localStorage.remove("user")
    navigate("/auth")
  }
</script>


<div class="settings">
  <h1>Settings</h1>
  <Button
    type="secondary"
    on:click|once={navigateToChangePassword}
    disabled={true}>
    Change password
  </Button>
  <Button
    on:click|once={syncData}>
    Sync on demand
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
}
</style>
