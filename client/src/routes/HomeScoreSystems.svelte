<script>
  import { navigate } from "svelte-navigator";
  import { apiClient } from "../services/api"
  import { localStorage } from "../services/storages"
  import Button from '../components/Button.svelte'
  import img from '../assets/imgs/img-score.png'


  const navigateToNewScoreSystem = () => {
    navigate("/score-systems/new")
  }


  let code = null

  const downloadServerScoreSystem = async () => {
    const {data} = await apiClient(
      "GET",
      "score-systems?populate=*&filters[code][$eq]="+code,
    )
    const localScoreSystems = localStorage.get("scoreSystems") || []
    console.log("downloaded SS"+data[0].attributes.name)

    let existingLocalScoreSystems = []
    
    for (const i of localScoreSystems){
      existingLocalScoreSystems.push(i.attributes["code"])
    }
    
    if (! existingLocalScoreSystems.includes(data[0].attributes.code)){
        localScoreSystems.push(data[0])
        console.log("YEAH!")
      }
    else {
        console.log("Dup!")
    }
    localStorage.set("scoreSystems", localScoreSystems)

    

  }

</script>


<div class="score-systems">
  <h1>Score System</h1>
  <img src="{img}" alt="target board">
 <div class="btn-row">
  <form on:submit|preventDefault={downloadServerScoreSystem}>
    <input
    type="text"
    name="code"
    placeholder="Enter code" 
    bind:value={code} />
    <Button
      theme="secondary"
      on:click|once={downloadServerScoreSystem}
      disabled={false}>
      download
    </Button>
  </form>
  </div>
  <!-- <Button
    theme="secondary"
    on:click|once={navigateToNewAdvanceScoreSystem}
    disabled={true}>
    create advanced
  </Button>-->
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

  & form {
    display: flex;
    flex-direction: row;
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

  & h1 {
    font-size: 2rem;
  }

  & .btn-row {
    border-top: 0px solid var(--color-gray-light);
    display: flex;
    width: 100%;
    gap: 1rem;
    padding-top: 1rem;
  }
}

img {
  flex-grow: 1;
  height: 210px;
  padding-bottom: 2.5rem;
}
</style>
