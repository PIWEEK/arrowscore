<script>
  import { navigate } from "svelte-navigator";
  import Button from "../components/Button.svelte"
  import img from '../assets/imgs/img-tournament.png'

  const navigateToNewTournament = () => {
    navigate("/tournaments/new")
  }

</script>

<div class="tournaments">
  <h1>Tournament</h1>
  <img src="{img}" alt="arrows">
  <Button theme="secondary"  on:click={() => { navigate("/my/tournaments")}} disabled={false}>
    my tournaments
  </Button>

  <Button
  on:click|once={navigateToNewTournament}>
  create tournament
</Button>
</div>


<style lang="postcss">

.tournaments{
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

img {
  flex-grow: 1;
  height: 210px;
  padding-bottom: 2.5rem;
}
</style>
