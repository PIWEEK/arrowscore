<script>
  import { navigate } from "svelte-navigator";

  import SectionHeader from "../components/SectionHeader.svelte"
  import Button from "../components/Button.svelte"
  import { localStorage } from "../services/storages"
  import { range } from "../utils"
  import ProfileIcon from "../assets/svgs/icon-profile.svg"
  import ScoreSystemsIcon from "../assets/svgs/icon-scoresystem.svg"
  import CheckIcon from "../assets/svgs/icon-check.svg"

  const user = localStorage.get("user")
  const scoreSystems = localStorage.get("scoreSystems") || []

  let steps = {
    1: false,
    2: false,
    3: false,
  }
  let openStep = 1;

  $: isComplete = steps[1] && steps[2] && steps[3]

  let data = {
    scoreSystem: null,
    selectedScoreSystem: null,
    name: "",
    description: "",
    apiid: 0
  }

  const _openNextStep = () => {
    let nextStep = Object.entries(steps).find((s) => !s[1])
    openStep = nextStep ? nextStep[0] : 0
  }

  const selectScoreSystem = (event) => {
    data.scoreSystem = parseInt(event.currentTarget.value)
    //console.log("scoresystem chosen"+data.scoreSystem)
    data.selectedScoreSystem = scoreSystems[data.scoreSystem]

    steps[1] = true
    _openNextStep()
  }

  const navigateToScoreSystems = () => {
    navigate("/home/score-systems")
  }

  const selectName = () => {
    steps[2] = true
    _openNextStep()
  }

  const selectDescription = () => {
    steps[3] = true
    _openNextStep()
  }

  const onSubmit = () => {
    const newTournament = { attributes: {
      apiid: "0xL"+Date.now(),
      name: data.name,
      description: data.description,
      when: new Date().toISOString(),
      finished: false,
      firstsync: false,
      synced: false,
      ranking: {},
      score_system: {data: data.selectedScoreSystem},    
    }
  }
    const localTournaments = localStorage.get("tournaments") || []
    localTournaments.push(newTournament)
    localStorage.set("tournaments", localTournaments)
    
    navigate(`/home/tournaments`)
  }

</script>


<div class="tournaments-new">
  <SectionHeader>
    <h1 slot="title">Create Tournament</h1>
  </SectionHeader>
  <main>
    <form on:submit|preventDefault={onSubmit}>
      <div class="steps">


        <div class="step step-1" class:open={openStep == 1}>
          <div class="summary">
            <div class="number">1.</div>
            <div class="title">Score system</div>
            <div class="edit" class:show={steps[1] && openStep != 1}>
              <a on:click|stopPropagation={() => { openStep=1 }}>Edit</a>
            </div>
            <div class="values">{data.selectedScoreSystem ? data.selectedScoreSystem.attributes.name : ""}</div>
          </div>
          {#if openStep == 1}
          <div class="fields">
            <div class="score-systems-selector">
              {#each scoreSystems as sc, i}
              <div class="score-systems-option">
                {#if i === data.scoreSystem}
                <CheckIcon class="icon" height="11" width="16" />
                {:else}
                <ScoreSystemsIcon class="icon" height="16" width="16" />
                {/if}
                <input
                  type="radio"
                  name="{sc.attributes.name}"
                  id="sc-{sc.attributes.name}"
                  on:change={selectScoreSystem}
                  value={i}>
                <label for="sc-{sc.attributes.name}">
                {sc.attributes.name}
                </label>
              </div>
              {:else}
              <div class="empty">
                You need to create one score system first.
              </div>
              <Button theme="secondary"
                on:click={navigateToScoreSystems}>
                Create a score system
              </Button>
              {/each}
            </div>
          </div>
          {/if}
        </div>

        <div class="step step-2" class:open={openStep == 2}>
          <div class="summary">
            <div class="number">2.</div>
            <div class="title">Tournament name</div>
            <div class="edit" class:show={steps[2] && openStep != 2}>
              <a on:click|stopPropagation={() => { openStep=2 }}>Edit</a>
            </div>
            <div class="values">{data.name}</div>
          </div>
          {#if openStep == 2}
          <div class="fields">
            <input
              type="text"
              name="name"
              placeholder="Enter a name"
              bind:value={data.name} />
            <Button theme="secondary" disabled={data.name == ""}
              on:click={selectName}>
              Ok, continue
            </Button>
          </div>
          {/if}
        </div>

        <div class="step step-3" class:open={openStep == 3}>
          <div class="summary">
            <div class="number">4.</div>
            <div class="title">Description</div>
            <div class="edit" class:show={steps[3] && openStep !=3}>
              <a on:click|stopPropagation={() => { openStep=3 }}>Edit</a>
            </div>
            <div class="values">{data.description}</div>
          </div>
          {#if openStep == 3}
          <div class="fields">
            <textarea
              type="text"
              name="description"
              placeholder="Enter a description"
              bind:value={data.description} />
            <Button theme="secondary" disabled={data.description == ""}
              on:click={selectDescription}>
              Ok, continue
            </Button>
          </div>
          {/if}
        </div>
      </div>
      <div class="actions">
        <Button type="submit" disabled={!isComplete}>
          Create tournament
        </Button>
      </div>
    </form>
  </main>
</div>

<style lang="postcss">
.tournaments-new {
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

  & main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
}

form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  gap: 2px;

  & .steps {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
    padding: 3px 0;
    gap: 3px;
  }

  & .actions {
    padding: 1.25rem;
  }
}

.empty {
  font-family: 'Manrope', serif;
  font-weight: 400;
  margin-bottom: 1rem;
}

.step {
  display: flex;
  flex-direction: column;

  & .summary {
    display: grid;
    grid-template-areas: "number title edit"
                         ". values values";
    grid-template-columns: 23px 1fr 40px;
    background-color: var(--color-gray-light);
    padding: 1rem 1.25rem;

    & > .number {
      grid-area: number;
      font-family: 'DM Serif Display', serif;
      font-size: 1.3rem;
    }
    & > .title {
      grid-area: title;
      font-family: 'DM Serif Display', serif;
      text-align: left;
      width: 100%;
      font-size: 1.1rem;
    }
    & > .edit {
      grid-area: edit;
      text-align: right;
      font-family: 'Manrope', serif;
      font-weight: 400;
      font-size: 0.9rem;
      text-decoration: underline;
      display: none;
      margin-left: auto;

      &.show {
        display: flex;
      }
    }
    & > .values {
      grid-area: values;
      font-family: 'Manrope', serif;
      font-weight: 400;
      font-size: 1rem;
      line-height: 2;
    }
  }
  & .fields {
    padding: .75rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: .7rem;

    & .selector {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: .7rem;

      & input[type=radio],
      & input[type=checkbox] {
        display: none;
      }
      & label {
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
  &.open {
    & .summary {
      background-color: var(--color-white);

      & .values {
        display: none;
      }
    }
  }


  & .score-systems-selector {
    display: flex;
    flex-direction: column;
    gap: .5rem;

    & input[type=radio] {
      display: none;
    }
    & .score-systems-option {
      font-family: 'Manrope', serif;
      display: flex;
      flex-direction: row;
      align-items: center;
      align-content: center;
      gap: .5rem;
    }
  }
}
textarea { width: 100%; height: 200px; }

</style>
