<script>
  import { navigate } from "svelte-navigator";
  import Button from '../components/Button.svelte'
  import img from '../assets/imgs/img-score.png'


  const navigateToNewScoreSystem = () => {
    navigate("/score-systems/new")
  }

  const navigateToNewAdvanceScoreSystem = () => {
    console.log("TODO")
  }
</script>


<div class="score-systems">
  <h1>Score System</h1>
  <img src="{img}" alt="target board">
  <Button
    type="secondary"
    on:click|once={navigateToNewAdvanceScoreSystem}
    disabled={true}>
    create advanced score system
  </Button>
  <Button
    on:click|once={navigateToNewScoreSystem}>
    create score system
  </Button>
</div>


<style lang="postcss">
.score-systems{
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
