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

 	export let tournamentId = 0

  const you = localStorage.get("user")
  const tournaments = localStorage.get("tournaments") || []

  const tournament = tournaments.find(obj => {
    return obj.apiid == tournamentId
  })


</script>

<ScreenWakeLock />
<div class="tournaments-annotations">
  <SectionHeader>
    <h1 slot="title">{tournament.name}</h1>
    <Button slot="action" on:click={() => openPartialScores = true}>
      <StatsIcon class="icon" height="20" width="20" />
    </Button>

  </SectionHeader>
  <main>
    <div class="target-manager">
    </div>
    <div class="actions">
    </div>
  </main>
</div>


<style lang="postcss">
.tournaments-annotations {
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
        min-width: 2.8rem;
        padding: 0 3px;
      }
    }
  }
}
</style>
