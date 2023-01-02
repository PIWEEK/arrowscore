<script>
  import { navigate } from "svelte-navigator"
  import { onMount } from "svelte";

  import TournamentDownloadOrCreate from "../components/TournamentDownloadOrCreate.svelte"

  import SectionHeader from "../components/SectionHeader.svelte"
  import TournamentsIcon from "../assets/svgs/icon-tournament.svg"
  import { localStorage } from "../services/storages"

  const finishedTournaments = localStorage.get("tournaments").filter(f).reverse() || []
  let unfinishedTournaments = localStorage.get("tournaments").filter(uf) || []
  const Tournaments = localStorage.get("tournaments") || []


  function f(item){
    return item.finished
  }
  function uf(item){
    return ! item.finished
  }


</script>

<div class="my-tournaments">
  <SectionHeader theme="light">
    <h1 slot="title">My Tournaments</h1>
  </SectionHeader>
  <main class="menu">    
    {#each unfinishedTournaments as tournament, i}
    <div class="menu-item" on:click={() => navigate(`/tournaments/ongoing/${tournament.attributes.apiid}`)}>
      <TournamentsIcon class="icon" height="20" width="20" />
      {tournament.attributes.name} ({tournament.attributes.score_system.data.attributes.name})
      {#if tournament.attributes.code}
      <span class="code">CODE: {tournament.attributes.code}</span>
      {/if}
    </div>
    {/each}
    <div class="menu-separator"/>

    {#each finishedTournaments as tournament, i}
    <div class="menu-item" on:click={() => navigate(`/tournaments/finished/${tournament.attributes.apiid}`)}>
      <TournamentsIcon class="icon" height="20" width="20" />
      {tournament.attributes.name} ({tournament.attributes.score_system.data.attributes.name})
      {#if tournament.attributes.code}
      <span class="code">CODE: {tournament.attributes.code}</span>
      {/if}
    </div>
    {/each}

  </main>
  <div class="tournaments">
    <TournamentDownloadOrCreate/>
  </div>

</div>
<style lang="postcss">
.my-tournaments {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  height: 100%;

  & h1 {
    line-height: 1rem;
    width: 100%;
    text-align: center;
    margin-left: -20px;
  }

  & .menu {
    border-top: 1px solid var(--color-gray-light);
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
    padding: 60px 1.25rem 375px 1.25rem;
    width: 100%;

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
    }
    & .menu-separator {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 1px 0;
      gap: 15px;
      border-bottom: 1px solid var(--color-gray-light);
      font-family: 'Manrope', serif;
      font-size: 1rem;
      line-height: 1.2rem;
    }
      & .code {
        color: var(--color-gray);
        font-size: .9rem;
        margin-left: auto;
      }

    
  }
}
.tournaments{
    background-color: white;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    gap: 20px;
    height: auto;
    padding: 1.26rem;
  
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
</style>
