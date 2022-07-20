<script>
  import { navigate } from "svelte-navigator";
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
      newScoreSystems.append(data.attributes)
    }

    localStorage.set("scoreSystems", newScoreSystems)
  }
</script>


<div class="settings">
  <h1>Settings</h1>
  <Button
    type="secondary"
    on:click|once={navigateToChangePassword}>
    Change password
  </Button>
  <Button
    on:click|once={syncData}>
    Sync on demand
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
  padding: 45px 0;
}
</style>
