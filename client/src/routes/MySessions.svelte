<script>
  import { navigate } from "svelte-navigator"
  import SectionHeader from "../components/SectionHeader.svelte"
  import SessionsIcon from "../assets/svgs/icon-session.svg"
  import { localStorage } from "../services/storages"

  const finishedSessions = localStorage.get("sessions").filter(f).reverse() || []
  const unfinishedSessions = localStorage.get("sessions").filter(uf) || []


  function f(item){
    return item.finished
  }
  function uf(item){
    return ! item.finished
  }


</script>

<div class="my-sessions">
  <SectionHeader theme="light">
    <h1 slot="title">My Sessions</h1>
  </SectionHeader>
  <main class="menu">    {#each unfinishedSessions as session, i}
    {#if ! session.finished}
    <div class="menu-item" on:click={() => navigate(`/sessions/annotations/${i}`)}>
      <SessionsIcon class="icon" height="20" width="20" />
      {session.name} ({session.scoreSystem[0].name})
    </div>
    {:else}
    <div class="menu-item" on:click={() => navigate(`/sessions/finished/${i}`)}>
      <SessionsIcon class="icon" height="20" width="20" />
      F {session.name} ({session.scoreSystem[0].name})
    </div>

    {/if}
    {/each}

    {#each finishedSessions as session, i}
    {#if ! session.finished}
    <div class="menu-item" on:click={() => navigate(`/sessions/annotations/${i}`)}>
      <SessionsIcon class="icon" height="20" width="20" />
      {session.name} ({session.scoreSystem[0].name})
    </div>
    {:else}
    <div class="menu-item" on:click={() => navigate(`/sessions/finished/${i}`)}>
      <SessionsIcon class="icon" height="20" width="20" />
      F {session.name} ({session.scoreSystem[0].name})
    </div>

    {/if}
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
  }
}
</style>
