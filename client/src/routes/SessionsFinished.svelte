<script>
  import { navigate } from "svelte-navigator"
  import ScreenWakeLock from "../components/ScreenWakeLock.svelte";
  import SectionHeader from "../components/SectionHeader.svelte"
  import Button from "../components/Button.svelte"
  import { localStorage } from "../services/storages"
  import GoBackIcon from "../assets/svgs/go-back.svg"

 	export let sessionId = 0

  const you = localStorage.get("user")
  const sessions = localStorage.get("sessions") || []

  const session = sessions.find(obj => {
    return obj.apiid == sessionId
  })

  let currentTarget = 0
  $: currentTargetDisplay = currentTarget + 1
  $: totalTargets = session.scores[0].length

  $: arrows = session.score_system.data.attributes.targets[currentTarget]
  let currentArrow = 0
  $: arrowScores = arrows[currentArrow]
  let currentScores = []

  let selectedArcher = null
  $: archer = session.archers[selectedArcher]
  $: totalArchers = session.archers.length

//  let openPartialScores = false

  const calculateTotalScoreForTarget = (targetScores) => targetScores
    .reduce((total, score) => total + (score ? score : 0), 0)

  const calculatePartialScoreForUser = (scores) => scores
    .reduce((total, targetScores) => total + calculateTotalScoreForTarget(targetScores), 0)

  const calculateAverageScoreForUser = (scores) => scores
    .reduce((total, targetScores) => total + calculateTotalScoreForTarget(targetScores), 0)

  const calculateSessionPartialScores = () => {
    const data = []
    for (const [index, user] of session.archers.entries()) {
      data.push({
        username: user.username,
        score: calculatePartialScoreForUser(session.scores[index]),
        average: (calculateAverageScoreForUser(session.scores[index])/totalTargets).toFixed(1),
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

    // Persist data
    // sessions[sessionPos] = session
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
    // sessions[sessionPos] = session
    localStorage.set("sessions", sessions)
    navigate(`/sessions/annotations/${session.apiid}/summary`)
  }

</script>

<ScreenWakeLock />
<div class="sessions-annotations">
  <SectionHeader>
    <h1 slot="title">(F) {session.name}</h1>
    <Button slot="action">
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
        (Score system: {session.score_system.data.attributes.name})
      </div>
    </div>
    
    <div class="archers-list">

      <div class="score-sheet partial-scores">
        {#each calculateSessionPartialScores() as archer, u}
        <div class="archer">
          <span class="name">
            {u+1}. {archer.username}
          </span>
          <span class="score">{archer.score}</span>
        </div>

        {/each}
        </div>
      
    </div>
<!--
    <div class="actions">
      {#if currentTargetDisplay < totalTargets }
      <Button on:click={() => navigate(`/sessions/annotations/${session.apiid}`)}>
        Edit
      </Button>
      {:else}
        <Button on:click={finishSession}>
        Finish
      </Button>
      {/if}
    </div>
    -->
  </main>
</div>



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
      margin-top: .0rem;
    }
    & .action {
      grid-area: action;
      font-family: 'Manrope', serif;
      text-align: right;
      font-size: 14px;
      line-height: 17px;
      text-decoration: underline;
      margin-top: .0rem;
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
        background: var(--color-white);
        color: var(--color-black);
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
.score-sheet{
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
    & .number {}
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
        font-weight: 400;
        font-size: 18px;

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
      font-weight: 500;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid var(--color-gray-light);
      gap: .4rem;
      padding: 20px;

      & .number {
        font-weight: 300;
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
        line-height: 2rem;
        min-width: 4.1rem;
        padding: 0 3px;
        font-size: x-large;

      }
      & .average {
        align-self: end;
        border: 1px solid var(--color-black);
        display: block;
        text-align: center;
        line-height: 2rem;
        min-width: 4.4rem;
        padding: 0 3px;
        font-size: tiny;
      }

    }
  }


}
</style>
