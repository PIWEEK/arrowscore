<script>
  import { navigate } from "svelte-navigator"
  import SectionHeader from "../components/SectionHeader.svelte"
  import ScoreSystemsIcon from "../assets/svgs/icon-score.svg"
  import { localStorage } from "../services/storages"

  const scoreSystems = localStorage.get("scoreSystems") || []
</script>

<div class="my-score-systems">
  <SectionHeader theme="light">
    <h1 slot="title">My Score Systems</h1>
  </SectionHeader>
  <main class="menu">
    {#each scoreSystems as score, i}
    <!--
    <div class="menu-item" on:click={() => navigate(`/my/score-systems/${i}`)}>
    -->
    <div class="menu-item" >
      <ScoreSystemsIcon class="icon" height="20" width="20" />
      {score.name}
      {#if score.code}
        <span class="code">CODE: {score.code}</span>
      {/if}
    </div>
    {/each}
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
  }
}
</style>
