<script>
  import { navigate } from "svelte-navigator"
  import SectionHeader from "../components/SectionHeader.svelte"
  import SessionsIcon from "../assets/svgs/icon-session.svg"
  import { localStorage } from "../services/storages"


  const sessions = localStorage.get("sessions").filter(nt) || []


  const finishedSessions = sessions.filter(f).reverse() || []
  const unfinishedSessions = sessions.filter(uf) || []
  const Sessions = localStorage.get("sessions") || []


  function f(item){
      return item.finished
    }  
    function nt(item){
      return (item.tournament.data == null)
    }
    function uf(item){
      return ! item.finished
    }
  

</script>

<div class="my-sessions">
  <SectionHeader theme="light">
    <h1 slot="title">My Sessions</h1>
  </SectionHeader>
  <main class="menu">    
    {#each unfinishedSessions as session, i}
    <div class="menu-item" on:click={() => navigate(`/sessions/annotations/${session.apiid}`)}>
      <SessionsIcon class="icon" height="20" width="20" />
      [u] {session.name} ({session.score_system.data.attributes.name})
    </div>
    {/each}
    <div class="menu-separator"/>

    {#each finishedSessions as session, i}
    <div class="menu-item" on:click={() => navigate(`/sessions/finished/${session.apiid}`)}>
      <SessionsIcon class="icon" height="20" width="20" />
      [f] {session.name} ({session.score_system.data.attributes.name})
    </div>
    {/each}
  </main>

</div>
<style lang="postcss">
.my-sessions {
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
  }
}
</style>
