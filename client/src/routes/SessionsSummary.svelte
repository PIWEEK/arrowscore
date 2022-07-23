<script>
  import { navigate } from "svelte-navigator"
  import { localStorage } from "../services/storages"
  import SectionHeader from "../components/SectionHeader.svelte"
  import Button from "../components/Button.svelte"

 	export let sessionPos = 0

  const sessions = localStorage.get("sessions") || []
  const session = sessions[sessionPos]

  const calculateTotalScores = (targetScores) => targetScores
    .reduce((total, score) => total + (score ? score : 0), 0)

  const calculatePartialScoreForUser = (scores) => scores
    .reduce((total, targetScores) => total + calculateTotalScores(targetScores), 0)
</script>

<div class="sessions-summary">
  <SectionHeader>
    <h1 slot="title">{session.name}</h1>
  </SectionHeader>
  <main>
    <h2 class="subtitle">Total Score</h2>
    <div class="archers-list">
      {#each session.users as user, u}
      <div class="archer">
        <span class="number">{u+1}.</span>
        <span class="name">{user.username}</span>
        <span class="score winner">
          {calculatePartialScoreForUser(session.scores[u])}
        </span>
      </div>
      {/each}
    </div>
    <div class="actions">
      <Button type="secondary" disabled={true}>
        Share
      </Button>
      <Button on:click={() => { navigate("/home/sessions")}}>
        Finish
      </Button>
    </div>
  </main>
</div>

<style lang="postcss">
.sessions-summary {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;

  & h1 {
    width: 100%;
    margin-left: -20px;
    text-align: center;
  }

  & main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  & .subtitle {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  & .archers-list {
    & .archer {
      font-family: 'Manrope', serif;
      font-weight: 400;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid var(--color-gray-light);
      gap: .4rem;
      padding: 20px;

      & .number {
        font-weight: 600;
      }

      & .name {
        display: block;
        width: 100%
      }
      & .score {
        align-self: end;
        border: 1px solid var(--color-black);
        display: block;
        text-align: center;
        line-height: 1.8rem;
        min-width: 2.4rem;
        padding: 0 3px;

        &.winner {
          color: var(--color-white);
          background: var(--color-black);
        }
      }
    }
  }
  & .actions {
    padding: 20px;
    display: flex;
    gap: 20px;
    width: 100%;
    margin-top: auto;
  }
}
</style>
