<script>
  import { navigate } from "svelte-navigator"
  import { localStorage } from "../services/storages"
  import SectionHeader from "../components/SectionHeader.svelte"
  import Button from "../components/Button.svelte"

 	export let sessionId = 0

  const you = localStorage.get("user")
  const sessions = localStorage.get("sessions") || []
  const session = sessions.find(obj => {
    return obj.apiid == sessionId
  })


  const _calculateTotalScoreForTarget = (targetScores) => targetScores
    .reduce((total, score) => total + (score ? score : 0), 0)

  const _calculateTotalScoreForUser = (scores) => scores
    .reduce((total, targetScores) => total + _calculateTotalScoreForTarget(targetScores), 0)

  const calculateSessionSummary = () => {
    const data = []
    for (const [index, archer] of session.archers.entries()) {
      data.push({
        username: archer.username,
        score: _calculateTotalScoreForUser(session.scores[index]),
      })
    }
    data.sort((a, b) => b.score - a.score)
    return data
  }
</script>

<div class="sessions-summary">
  <SectionHeader>
    <h1 slot="title">{session.name}</h1>
  </SectionHeader>
  <main>
    <h2 class="subtitle">Total Score</h2>
    <div class="archers-list">
      {#each calculateSessionSummary() as user, u}
      <div class="archer">
        <span class="number">{u+1}.</span>
        <span class="name">
          {user.username}{#if user.username === you.username}{" (You)"}{/if}
        </span>
        <span class="score" class:winner={u === 0}>
          {user.score}
        </span>
      </div>
      {/each}
    </div>
    <div class="actions">
      <Button theme="secondary" disabled={true}>
        Share
      </Button>
      <Button on:click={() => { navigate("/my/sessions")}}>
        Close
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
