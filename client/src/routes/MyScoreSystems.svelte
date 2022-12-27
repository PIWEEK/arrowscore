<script>
  import { navigate } from "svelte-navigator"
  import ScoreSystemDownloadOrCreate from "../components/ScoreSystemDownloadOrCreate.svelte"

  import SectionHeader from "../components/SectionHeader.svelte"
  import ScoreSystemsIcon from "../assets/svgs/icon-scoresystem.svg"
  import { localStorage } from "../services/storages"
  import ScoreSystemsNew from "./ScoreSystemsNew.svelte";

  $: scoreSystems = localStorage.get("scoreSystems") || []

</script>
<div class="my-score-systems">
  <SectionHeader theme="light">
    <h1 slot="title">My Score Systems</h1>
  </SectionHeader>  
  

  <main class="menu">
    {#each scoreSystems as ss, i}
    <!--
    <div class="menu-item" on:click={() => navigate(`/my/score-systems/${i}`)}>
    -->
    <div class="menu-item" >
      <ScoreSystemsIcon class="icon" height="20" width="20" />
      {ss.attributes.name}
      {#if ss.attributes.code}
        <span class="code">CODE: {ss.attributes.code}</span>
      {/if}
    </div>
    {/each}
    <div class="score-systems">
      <ScoreSystemDownloadOrCreate/>
    </div>

  </main>

  </div>


<style lang="postcss">


.my-score-systems {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;

  & h1 {
    line-height: 1rem;
    width: 100%;
    text-align: center;
    margin-left: -20px;
  }

  & .menu {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--color-gray-light);
    width: 100%;
    padding: 0 1.25rem;

    & .menu-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 20px 0;
      gap: 15px;
      border-bottom: 1px solid var(--color-gray-light);
      font-family: 'Manrope', serif;
      font-size: 1rem;
      line-height: 1.2rem;

      & .code {
        color: var(--color-gray);
        font-size: .9rem;
        margin-left: auto;
      }
    }
    & .test {
    height:70%;
    overflow:auto;
    }

  }
}
.score-systems{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 100%;
    padding: 8vh 0;
  
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
