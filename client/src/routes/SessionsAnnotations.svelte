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

  $: arrows = session.scoreSystem[0].targets[currentTarget]
  let currentArrow = 0
  $: arrowScores = arrows[currentArrow]
  let currentScores = []

  let selectedArcher = null
  $: archer = session.users[selectedArcher]

  let openPartialScores = false

  const calculateTotalScores = (targetScores) => targetScores
    .reduce((total, score) => total + (score ? score : 0), 0)

  const calculatePartialScoreForUser = (scores) => scores
    .reduce((total, targetScores) => total + calculateTotalScores(targetScores), 0)

  const hasAnnotations = (targetScores) => !targetScores
    .every((score) => score === null)

  const openBottomSheetTargetScores = (archerPos) => {
    selectedArcher = archerPos
    currentArrow = 0
    currentScores = Object.assign([], session.scores[selectedArcher][currentTarget])
  }

  const closeBottomSheetTargetScores = () => {
    selectedArcher = null
    currentArrow = 0
    currentScores = []
  }

  const saveScore = () => {
    // Save score
    session.scores[selectedArcher][currentTarget] = currentScores
    session = session

    // Persist data
    sessions[sessionPos] = session
    localStorage.set("sessions", sessions)

    closeBottomSheetTargetScores()
  }

</script>

<div class="sessions-annotations">
  <SectionHeader>
    <h1 slot="title">{session.name}</h1>
    <Button slot="action" on:click={() => openPartialScores = true}>
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
      <div class="archer" on:click|stopPropagation={() => openBottomSheetTargetScores(u)}>
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
    <div class="actions">
      <Button type="secondary" disabled={true}>
        Target picture
      </Button>
      {#if currentTargetDisplay < totalTargets }
      <Button on:click={() => { currentTarget++ }}>
        Next target
      </Button>
      {:else}
      <Button>
        Finish
      </Button>
      {/if}
    </div>
  </main>
</div>

<BottomSheet open={selectedArcher !== null} on:close={closeBottomSheetTargetScores}>
{#if archer}
<div class="bottom-sheet target-scores">
  <div class="header">
    <button class="close" on:click={closeBottomSheetTargetScores}>+</button>
    <h1 class="name">{archer.Name}</h1>
  </div>
  <form class="main" on:submit|preventDefault={saveScore}>
    <div class="arrows">
      # Arrow
      <div class="values">
        {#each arrows as ar, i}
        <input
          type="radio"
          name="num-arrow"
          id="ar-{i}"
          bind:group={currentArrow}
          value={i}>
        <label for="ar-{i}">
         {i+1}
        </label>
        {/each}
      </div>
    </div>
    <div class="score-values">
      Score value
      <div class="values">
        {#each arrowScores as sc, i}
        <input
          type="radio"
          name="score"
          id="sc-{i}"
          bind:group={currentScores[currentArrow]}
          value={sc}>
        <label for="sc-{i}">
         {sc}
        </label>
        {/each}

      </div>
    </div>
    <div class="actions">
      <Button type="secondary" on:click={closeBottomSheetTargetScores}>
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

<BottomSheet bind:open={openPartialScores}>
{#if openPartialScores}
<div class="bottom-sheet partial-scores">
  <div class="header">
    <button class="close" on:click={() => openPartialScores = false}>+</button>
    <h1 class="name">Partial Scores</h1>
  </div>
  <div class="main">
    {#each session.users as user, u}
    <div class="archer">
      <span class="number">{u+1}.</span>
      <span class="name">{user.Name}</span>
      <span class="score">{calculatePartialScoreForUser(session.scores[u])}</span>
    </div>
    {/each}
  </div>
</div>
{/if}
</BottomSheet>

<style lang="postcss">
.sessions-annotations {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;

  & h1 {
    line-height: 1rem;
    width: 100%;
    text-align: center;
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
      font-family: 'Manrope', serif;
      font-weight: bolder;
      grid-area: current;
      text-align: center;
    }
  }

  & main {
    display: flex;
    flex-direction: column;
    height: 100%;
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
    min-height: 60px;

    & .name {
      grid-area: name;
      margin: 0;
      font-size: 1.3rem;
      margin-top: .3rem;
    }
    & .action {
      grid-area: action;
      font-family: 'Manrope', serif;
      text-align: right;
      font-size: 14px;
      line-height: 17px;
      text-decoration: underline;
      margin-top: .3rem;
    }
    & .scores {
      grid-area: scores;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      gap: .7rem;
      font-family: 'Manrope', serif;


      & .arrow,
      & .total{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;
      }

      & .score {
        border: 1px solid var(--color-black);
        display: block;
        text-align: center;
        line-height: 1.6rem;
        min-width: 2rem;
        padding: 0 3px;
      }

      & .total > .score {
        background: var(--color-black);
        color: var(--color-white);
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
      font-size: 30px;
      line-height: 20px;
      transform: rotate(45deg);
    }

    & .name {
      width: 100%;
      text-align: center;
      margin: 0;
      margin-left: -20px;
    }
  }

  &.target-scores {
    & form {
      & .arrows {
        padding: 20px 20px 10px 20px;
      }

      & .score-values {
        padding: 10px 20px 20px 20px;
      }

      & .arrows,
      & .score-values {
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: .8rem;
        font-family: 'Manrope', serif;
        font-weight: 400;
        font-size: 18px;

        & .values {
          display: flex;
          flex-direction: row;
          justify-content: start;
          flex-wrap: wrap;
          gap: .8rem;

          & input[type=radio],
          & input[type=checkbox] {
            display: none;
          }
          & label {
            font-family: 'Manrope', serif;
            font-weight: 400;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 40px;
            padding: 2px;
            border: 1px solid var(--color-black);
          }
          & input[type=radio]:checked + label,
          & input[type=checkbox]:checked + label {
            background-color: var(--color-black);
            color: var(--color-white);
          }
        }
      }

      & .actions {
        border-top: 1px solid var(--color-gray-light);
        display: flex;
        flex-direction: row;
        gap: 30px;
        padding: 20px;
      }
    }
  }

  &.partial-scores {
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
      }
    }
  }
}
</style>
