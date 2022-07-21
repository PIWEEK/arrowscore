<script>
  import { navigate } from "svelte-navigator"
  import SectionHeader from "../components/SectionHeader.svelte"
  import Button from "../components/Button.svelte"
  import { localStorage } from "../services/storages"
  import StatsIcon from "../assets/svgs/icon-stats.svg"
  import GoBackIcon from "../assets/svgs/go-back.svg"
  import GoNextIcon from "../assets/svgs/go-next.svg"
  import BottomSheet from "../components/BottomSheet.svelte"

 	export let sessionPos = 0

  const sessions = localStorage.get("sessions") || []
  const session = sessions[sessionPos]

  let currentTarget = 0
  $: currentTargetDisplay = currentTarget + 1
  $: totalTargets = session.scores[0].length

  let selectedArcherPos = null
  $: selectedArcher = session.users[selectedArcherPos]

  const calculateTotalScores = (targetScores) => targetScores
    .reduce((total, score) => total + score ? score : 0, 0)

  const hasAnnotations = (targetScores) => !targetScores
    .every((score) => score === null)

  const closeBottomSheet = () => {
    selectedArcherPos = null
  }

</script>

<div class="sessions-annotations">
  <SectionHeader>
    <h1 slot="title">{session.name}</h1>
    <Button slot="action">
      <StatsIcon class="icon" height="20" width="20" />
    </Button>
  </SectionHeader>
  <main>
    <div class="target-manager">
      {#if currentTargetDisplay > 1}
      <button class="back" on:click|stopPropagation={() => { currentTarget-- }}>
        <GoBackIcon width="6" height="14" />
        {currentTargetDisplay - 1}
      </button>
      {/if}
      <div class="current">
        #{currentTargetDisplay} target/round
      </div>
      {#if currentTargetDisplay < totalTargets }
      <button class="next" on:click|stopPropagation={() => { currentTarget++ }}>
        {currentTargetDisplay + 1}
        <GoNextIcon width="6" height="14" />
      </button>
      {/if}
    </div>
    <div class="archers-list">
      {#each session.users as user, u}
      <div class="archer" on:click|stopPropagation={() => selectedArcherPos = u}>
        <h2 class="name">{user.Name}</h2>
        <div class="action">
          {#if !hasAnnotations(session.scores[u][currentTarget])}
            Annotate
          {:else}
            Edit
          {/if}
        </div>
        <div class="scores">
          {#each session.scores[u][currentTarget] as score, i}
            {#if score !== null}
            <div class="arrow">
              #{i+1} <span class="score">{score}</span>
            </div>
            {/if}
          {/each}
          <div class="total">
            {#if hasAnnotations(session.scores[u][currentTarget])}
              T&nbsp;
              <span class="score">
                {calculateTotalScores(session.scores[u][currentTarget])}
              </span>
            {/if}
          </div>
        </div>
      </div>
      {/each}
    </div>
  </main>
</div>

<BottomSheet open={selectedArcherPos !== null} on:close={closeBottomSheet}>
{#if selectedArcher}
<div class="bottom-sheet">
  <div class="header">
    <button class="close" on:click={closeBottomSheet}>X</button>
    <h1 class="name">{selectedArcher.Name}</h1>
  </div>
  <form class="main">
    <div class="arrows">
      # Arrow
    </div>
    <div class="score-values">
      Score value
    </div>
    <div class="actions">
      <Button type="secondary" on:click={closeBottomSheet}>
        Cancel
      </Button>
      <Button>
        Next archer
      </Button>
    </div>
  </form>
</div>
{/if}
</BottomSheet>


<style lang="postcss">
.sessions-annotations {
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

  & .target-manager {
    display: grid;
    grid-template-areas: "back current next";
    grid-template-columns: 50px 1fr 50px;
    grid-template-rows: 60px;
    align-items: center;
    border-bottom: 1px solid var(--color-black);
    padding: 0 20px;

    & .back { grid-area: back; }
    & .next { grid-area: next; }
    & .back,
    & .next {
      background: var(--color-white);
      border: 2px solid var(--color-black);
      padding: 0 4px;
      height: 40px;
    }

    & .current {
      grid-area: current;
      text-align: center;
    }
  }
  & .archer {
    display: grid;
    grid-template-areas: "name action"
                         "scores scores";
    grid-template-columns: 1fr 150px;
    grid-template-rows: auto;
    grid-gap: 8px;
    padding: 12px 20px;
    border-bottom: 1px solid var(--color-gray-light);

    & .name {
      grid-area: name;
      margin: 0;
    }
    & .action {
      grid-area: action;
      font-family: 'Manrope', serif;
      text-align: right;
      font-size: 14px;
      line-height: 17px;
      text-decoration: underline;
    }
    & .scores {
      grid-area: scores;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      gap: .7rem;

      & .arrow,
      & .total{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;
      }

      & .score {
        border: 2px solid var(--color-black);
        display: block;
        text-align: center;
        line-height: 1.3rem;
        min-width: 1.5rem;
        padding: 0 3px;
      }

      & .total > .score {
        background: var(--color-black);
        color: var(--color-white);
      }
    }
  }
}
.bottom-sheet{
  & .header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-bottom: 1px solid var(--color-gray-light);
    padding: 20px;

    & .close {
      border: none;
      background: none;
      font-family: 'Manrope', serif;
      text-align: right;
      font-size: 20px;
      line-height: 20px;
    }

    & .name {
      width: 100%;
      text-align: center;
      margin: 0;
    }
  }
  & form {


    & .arrows,
    & .score-values,
    & .actions {
      padding: 20px;
    }

    & .arrows {}

    & .score-values {}

    & .actions {
      border-top: 1px solid var(--color-gray-light);
      display: flex;
      flex-direction: row;
      gap: 30px;
    }
  }
}
</style>
