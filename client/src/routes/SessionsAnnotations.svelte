<script>
  import { navigate } from "svelte-navigator"
  import ScreenWakeLock from "../components/ScreenWakeLock.svelte";
  import SectionHeader from "../components/SectionHeader.svelte"
  import Button from "../components/Button.svelte"
  import { localStorage } from "../services/storages"
  import StatsIcon from "../assets/svgs/icon-stats.svg"
  import GoBackIcon from "../assets/svgs/go-back.svg"
  import GoNextIcon from "../assets/svgs/go-next.svg"
  import BottomSheet from "../components/BottomSheet.svelte"

 	export let sessionId = 0

  const you = localStorage.get("user")
  const sessions = localStorage.get("sessions") || []

  const session = sessions.find(obj => {
    return obj.apiid == sessionId
  })

  let currentTarget = 0
  currentTarget = session.lastTargetPos
  console.log("session->"+session)

  $: currentTargetDisplay = currentTarget + 1
  $: session.lastTargetPos = currentTargetDisplay
  $: totalTargets = session.scores[0].length

  let arrows = []
  $: arrows = session.score_system.data.attributes.targets[currentTarget]

  
  let currentArrow = 0
  $: arrowScores = arrows[currentArrow]
  let currentScores = []

  let selectedArcher = null
  $: archer = session.archers[selectedArcher]
  $: totalArchers = session.archers.length

  let openPartialScores = false

  const checkNext = () => {

    console.log("currentScores"+currentScores)
    if (currentScores.indexOf(null) > -1) {
      return true
    }
    else {
      return false
    }
  }

  const calculateTotalScoreForTarget = (targetScores) => targetScores
    .reduce((total, score) => total + (score ? score : 0), 0)

  const calculatePartialScoreForUser = (scores) => scores
    .reduce((total, targetScores) => total + calculateTotalScoreForTarget(targetScores), 0)

  const calculateSessionPartialScores = () => {
    const data = []
    for (const [index, archer] of session.archers.entries()) {
      data.push({
        username: archer.username,
        score: calculatePartialScoreForUser(session.scores[index]),
      })
    }
    data.sort((a, b) => b.score - a.score)
    return data
  }
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
    session.synced = false// we reset unsync status


    // Persist data
    //sessions[sessionPos] = session
    localStorage.set("sessions", sessions)


    if (selectedArcher + 1 < totalArchers) {  // Go to next archer
      openBottomSheetTargetScores(selectedArcher + 1)
    } else if (currentTarget + 1 < totalTargets) {  // Go to next target
      currentTarget++
      openBottomSheetTargetScores(0)
    } else {  // Finish
      closeBottomSheetTargetScores()
      finishSession()
    }
  }

  const finishSession = () => {
    session.finished = true
    //sessions[sessionPos] = session
    localStorage.set("sessions", sessions)
    navigate(`/sessions/annotations/${session.apiid}/summary`)
  }

</script>

<ScreenWakeLock />
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
        #{currentTargetDisplay} of {totalTargets}
      </div>
      {#if currentTargetDisplay < totalTargets }
      <button class="next" on:click|stopPropagation={() => { currentTarget++ }}>
        {currentTargetDisplay + 1}
        <GoNextIcon width="6" height="14" />
      </button>
      {/if}
    </div>
    <div class="archers-list">
      {#each session.archers as archer, u}
      <div class="archer" on:click|stopPropagation={() => openBottomSheetTargetScores(u)}>
        <h2 class="name">
          {archer.username}
        </h2>
        <div class="action">
          {#if !hasAnnotations(session.scores[u][currentTarget])}
            Score
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
                {calculateTotalScoreForTarget(session.scores[u][currentTarget])}
              </span>
            {/if}
          </div>
        </div>
      </div>
      {/each}
    </div>
    <div class="actions">
      {#if currentTargetDisplay < totalTargets }
      <Button on:click={() => { currentTarget++ }}>
        Next target
      </Button>
      {:else}
        <Button on:click={finishSession}>
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
    <h1 class="name">
      {archer.username}

    </h1>


  </div>
  <form class="main" on:submit|preventDefault={saveScore}>
    <div class="score-values">
      Score
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
    <div class="arrows">
      Arrow
      <div class="values">
        {#each arrows as ar, i}
        <input
          type="radio"
          name="num-arrow"
          id="ar-{i}"
          bind:group={currentArrow}
          value={i}>
        <label for="ar-{i}">
         #{i+1}
        </label>
        {/each}
      </div>
    </div>

    <div class="actions">
      <Button theme="secondary" on:click={closeBottomSheetTargetScores}>
        Cancel
      </Button>
      {#key currentScores}
      <Button type="submit" disabled='{checkNext()}'>
        {#if selectedArcher + 1 < totalArchers} <!-- Go to next archer -->
        Next archer
        {:else if currentTarget + 1 < totalTargets} <!-- Go to next target -->
        Next target
        {:else} <!-- Finish session -->
        Finish
        {/if}
      </Button>
      {/key}
    
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
    <h1 class="name">Scores ({session.score_system.data.attributes.name})</h1>
  </div>
  <div class="main">
    {#each calculateSessionPartialScores() as archer, u}
    <div class="archer">
      <span class="number">{u+1}.</span>
      <span class="name">
        {archer.username}
      </span>
      <span class="score">{archer.score}</span>
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
    font-size: large;
    font-weight: 900;

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
      font-size: 24px;
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
      font-size: large;
      margin-top: .3rem;
    }
    & .action {
      grid-area: action;
      font-family: 'Manrope', serif;
      text-align: right;
      font-size: medium;
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
      font-weight: 200;


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
      font-size: x-larger;
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
        justify-content: flex-start;
        gap: .8rem;
        font-family: 'Manrope', serif;
        font-weight: 900;
        font-size: 22px;

        & .values {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          flex-wrap: wrap;
          gap: .8rem;

          & input[type=radio],
          & input[type=checkbox] {
            display: none;
          }
          & label {
            font-family: 'Manrope', serif;
            font-weight: 900;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 52px;
            height: 50px;
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
      font-weight: 600;
      font-size: larger;

      & .number {

      }

      & .name {
        display: block;
        width: 100%;

      }
      & .score {
        align-self: end;
        border: 1px solid var(--color-black);
        display: block;
        text-align: center;
        line-height: 1.8rem;
        min-width: 2.8rem;
        padding: 0 3px;
      }
    }
  }
}
</style>
