<script>
  import { navigate } from "svelte-navigator";

  import SectionHeader from "../components/SectionHeader.svelte"
  import Button from "../components/Button.svelte"
  import { localStorage } from "../services/storages"
  import { range } from "../utils"
  import ScoreSystemsIcon from "../assets/svgs/icon-score.svg"
  import CheckIcon from "../assets/svgs/icon-check.svg"

  const user = localStorage.get("user")
  const scoreSystems = localStorage.get("scoreSystems") || []

  let steps = {
    1: false,
    2: false,
    3: false,
    4: false,
  }
  let openStep = 1;

  $: isComplete = steps[1] && steps[2] && steps[3] && steps[4]

  let data = {
    archers: [],
    scoreSystem: null,
    selectedScoreSystem: null,
    name: "",
    place: ""
  }

  const _openNextStep = () => {
    let nextStep = Object.entries(steps).find((s) => !s[1])
    openStep = nextStep ? nextStep[0] : 0
    console.log("! Open step", openStep)
  }

  const selectSolo = (event) => {
    data.archers = [user]
    steps[1] = true
    _openNextStep()
  }

  const selectScoreSystem = (event) => {
    data.scoreSystem = parseInt(event.currentTarget.value)
    data.selectedScoreSystem = scoreSystems[data.scoreSystem]

    steps[2] = true
    _openNextStep()
  }

  const navigateToScoreSystems = (event) => {
    navigate("/home/score-systems")
  }

  const selectName = (event) => {
    steps[3] = true
    _openNextStep()
  }

  const selectPlace = (event) => {
    steps[4] = true
    _openNextStep()
  }

  const onSubmit = () => {
    const newSession = {
      apiid: null,
      name: data.name,
      place: data.place,
      when: new Date().toISOString(),
      finished: false,
      users: data.archers,
      scoreSystem: [data.selectedScoreSystem],
      scores: data.archers
        .map(arc => data.selectedScoreSystem.targets  // archers
          .map(tr => tr                               // targets
            .map(arr => null)))                       // arrows
    }
    const localSessions = localStorage.get("sessions") || []
    localSessions.push(newSession)
    localStorage.set("sessions", localSsessions)
    navigate(`/sessions/play/${localSessions.length - 1}`)
  }
</script>


<div class="sessions-new">
  <SectionHeader>
    <h1>Create Session</h1>
  </SectionHeader>
  <main>
    <form on:submit|preventDefault={onSubmit}>
      <div class="steps">
        <div class="step step-1" class:open={openStep == 1}>
          <div class="summary">
            <div class="number">1.</div>
            <div class="title">Archers</div>
            <div class="edit" class:show={steps[1] && openStep != 1}>
              <a on:click|stopPropagation={() => { openStep=1 }}>Edit</a>
            </div>
            <div class="values">{data.archers? "Solo": ""}</div>
          </div>
          {#if openStep == 1}
          <div class="fields">
            <div class="archer-options">
              <Button type="secondary"}
                on:click={selectSolo}>
                Solo
              </Button>
              <Button type="secondary" disabled={true}>
                Group
              </Button>
            </div>
            <!-- TODO Group
            <ul class="archers">
              <li>
                <ProfileIcon class="icon" height="30" width="30" />
                <span>Yami</span>
                <a>Remove</a>
              </li>
            <ul/>
            <input
              type="text"
              name="archer"
              placeholder="Email, username or name"
              bind:value={newArcher} />
            <Button type="secondary" disabled={newArcher == ""}
              on:click={addArcher}>
              Ok, continue
              </Button>
            -->
          </div>
          {/if}
        </div>

        <div class="step step-2" class:open={openStep == 2}>
          <div class="summary">
            <div class="number">2.</div>
            <div class="title">Score system</div>
            <div class="edit" class:show={steps[2] && openStep != 2}>
              <a on:click|stopPropagation={() => { openStep=2 }}>Edit</a>
            </div>
            <div class="values">{data.selectedScoreSystem ? data.selectedScoreSystem.name : ""}</div>
          </div>
          {#if openStep == 2}
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
                  name="{sc.name}"
                  id="sc-{sc.name}"
                  on:change={selectScoreSystem}
                  value={i}>
                <label for="sc-{sc.name}">
                {sc.name}
                </label>
              </div>
              {:else}
              <div class="empty">
                You need to create one score system first
              </div>
              <Button type="secondary"
                on:click={navigateToScoreSystems}>
                Create a score system
              </Button>
              {/each}
            </div>
          </div>
          {/if}
        </div>

        <div class="step step-3" class:open={openStep == 3}>
          <div class="summary">
            <div class="number">3.</div>
            <div class="title">Session name</div>
            <div class="edit" class:show={steps[3] && openStep != 3}>
              <a on:click|stopPropagation={() => { openStep=3 }}>Edit</a>
            </div>
            <div class="values">{data.name}</div>
          </div>
          {#if openStep == 3}
          <div class="fields">
            <input
              type="text"
              name="name"
              placeholder="Enter a name"
              bind:value={data.name} />
            <Button type="secondary" disabled={data.name == ""}
              on:click={selectName}>
              Ok, continue
            </Button>
          </div>
          {/if}
        </div>

        <div class="step step-4" class:open={openStep == 4}>
          <div class="summary">
            <div class="number">4.</div>
            <div class="title">Session place</div>
            <div class="edit" class:show={steps[4] && openStep !=4}>
              <a on:click|stopPropagation={() => { openStep=4 }}>Edit</a>
            </div>
            <div class="values">{data.place}</div>
          </div>
          {#if openStep == 4}
          <div class="fields">
            <input
              type="text"
              name="place"
              placeholder="Enter a place"
              bind:value={data.place} />
            <Button type="secondary" disabled={data.place == ""}
              on:click={selectPlace}>
              Ok, continue
            </Button>
          </div>
          {/if}
        </div>
      </div>
      <div class="actions">
        <Button disabled={!isComplete}>
          Create session
        </Button>
      </div>
    </form>
  </main>
</div>

<style lang="postcss">
.sessions-new {
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
      font-size: 1.3rem;
    }
    & > .title {
      grid-area: title;
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

  /* Specific fileds */
  & .archer-options {
    display: flex;
    flex-direction: row;
    gap: .5rem;
  }

  & .score-systems-selector {
    display: flex;
    flex-direction: column;
    gap: .5rem;

    & input[type=radio] {
      display: none;
    }
    & .score-systems-option {
      display: flex;
      flex-direction: row;
      align-items: center;
      align-content: center;
      gap: .5rem;
    }
  }
}


</style>
