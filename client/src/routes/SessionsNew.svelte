<script>
  import { navigate } from "svelte-navigator";

  import SectionHeader from "../components/SectionHeader.svelte"
  import Button from "../components/Button.svelte"
  import { localStorage } from "../services/storages"
  import { range } from "../utils"
  import ProfileIcon from "../assets/svgs/icon-profile.svg"
  import ScoreSystemsIcon from "../assets/svgs/icon-scoresystem.svg"
  import CheckIcon from "../assets/svgs/icon-check.svg"
  import { null_to_empty } from "svelte/internal";

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
    place: "",
    apiid: 0
  }

  let newArcher = ""

  const _openNextStep = () => {
    let nextStep = Object.entries(steps).find((s) => !s[1])
    openStep = nextStep ? nextStep[0] : 0
  }

  const selectSolo = () => {
    data.archers = [user]
    steps[1] = true
    _openNextStep()
  }

  const selectGroup = () => {
    data.archers = [user]
    steps[1] = true
  }

  const addArcher = () => {
    data.archers = [...data.archers, {username: newArcher}]
    newArcher = ""
  }

  const removeArcher = (index) => {
    data.archers.splice(index, 1)
    data.archers = data.archers
  }


  const selectScoreSystem = (event) => {
    data.scoreSystem = parseInt(event.currentTarget.value)
    //console.log("scoresystem chosen"+data.scoreSystem)
    data.selectedScoreSystem = scoreSystems[data.scoreSystem]

    steps[2] = true
    _openNextStep()
  }

  const navigateToScoreSystems = () => {
    navigate("/home/score-systems")
  }

  const selectName = () => {
    steps[3] = true
    _openNextStep()
  }

  const selectPlace = () => {
    steps[4] = true
    _openNextStep()
  }

  const onSubmit = () => {
    const newSession = { 
      apiid: "0xL"+Date.now(),
      name: data.name,
      place: data.place,
      when: new Date().toISOString(),
      lastTargetPos: 0,
      finished: false,
      firstsync: false,
      synced: false,
      archers: data.archers,
      tournament: {data: null},
      score_system: {data: data.selectedScoreSystem},
      scores: data.archers
        .map(arc => data.selectedScoreSystem.attributes.targets  // archers
          .map(tr => tr                               // targets
            .map(arr => null)))                       // arrows
    
    }
    const localSessions = localStorage.get("sessions") || []
    localSessions.push(newSession)
    localStorage.set("sessions", localSessions)
    
    navigate(`/sessions/annotations/${newSession.apiid}`)
  }
</script>


<div class="sessions-new">
  <SectionHeader>
    <h1 slot="title">Create Session</h1>
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
            <div class="values">
              {data.archers.length === 0? "" : data.archers.length == 1? "Solo" : `Group (${data.archers.length})` }</div>
          </div>
          {#if openStep == 1}
          <div class="fields">
            {#if data.archers.length == 0}
            <div class="archer-options">
              <Button theme="secondary"}
                on:click={selectSolo}>
                Solo
              </Button>
              <Button theme="secondary"
                on:click={selectGroup}>
                Group
              </Button>
            </div>
            {:else}
            <ul class="archers-list">
              {#each data.archers as archer, i}
              <li class="archer">
                <ProfileIcon class="icon" height="16" width="16" />
                <span>{archer.name || archer.username}</span>
                {#if i == 0}
                <span>(You)</span>
                {:else}
                <a class="remove"
                  on:click|preventDefault={() => removeArcher(i)}>
                  Remove
                </a>
                {/if}
              </li>
              {/each}
            </ul>
            <input
              autocomplete="off"
              type="text"
              name="archer"
              placeholder="Email, username or name"
              bind:value={newArcher} />
            <Button theme="secondary" disabled={newArcher == ""}
              on:click={addArcher}>
              Add archer
              </Button>
            <Button on:click={_openNextStep}>
              Ok, continue
            </Button>
            {/if}
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
            <div class="values">{data.selectedScoreSystem ? data.selectedScoreSystem.attributes.name : ""}</div>
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
              autocomplete="off"
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
              autocomplete="off"
              type="text"
              name="place"
              placeholder="Enter a place"
              bind:value={data.place} />
            <Button theme="secondary" disabled={data.place == ""}
              on:click={selectPlace}>
              Ok, continue
            </Button>
          </div>
          {/if}
        </div>
      </div>
      <div class="actions">
        <Button type="submit" disabled={!isComplete}>
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

  /* Specific fileds */
  & .archer-options {
    display: flex;
    flex-direction: row;
    gap: .5rem;
  }

  & .archers-list {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;
    gap: .8rem;

    & .archer {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      width: 100%;
      gap: .5rem;

      & span {
        font-weight: 600;
      }

      & .remove {
        margin-left: auto;
        color: red;
      }
    }
  }

  & .score-systems-selector {
    display: flex;
    flex-direction: column;
    gap: 1.0rem;

    & input[type=radio] {
      display: none;
    }
    & .score-systems-option {
      font-family: 'Manrope', serif;
      display: flex;
      flex-direction: row;
      align-items: center;
      align-content: center;
      gap: 0.5rem;
      font-size: large;
    }
  }
}


</style>
