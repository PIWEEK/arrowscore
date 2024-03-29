<script>
  import { navigate } from "svelte-navigator";

  import SectionHeader from "../components/SectionHeader.svelte"
  import Button from "../components/Button.svelte"
  import { localStorage } from "../services/storages"
  import { range } from "../utils"

  const ARROWS_OPTIONS = range(10)
  const SCORES_OPTIONS = range(21, 0)
  const user = localStorage.get("user")

  let steps = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false, //optional
  }
  let openStep = 1;

  $: isComplete = steps[1] && steps[2] && steps[3] && steps[4]

  let data = {
    totalArrows: 0,
    totalRounds: 0,
    validScores: [],
    name: "",
    description: ""
  }

  const _openNextStep = () => {
    let nextStep = Object.entries(steps).find((s) => !s[1])
    openStep = nextStep ? nextStep[0] : 0
  }

  const selectTotalArrows = (event) => {
    data.totalArrows = parseInt(event.currentTarget.value) || 0
    steps[1] = true
    _openNextStep()
  }

  const selectTotalRounds = (event) => {
    steps[2] = true
    _openNextStep()
  }

  const selectValidScores = (event) => {
    steps[3] = true
    _openNextStep()
  }

  const selectName = (event) => {
    steps[4] = true
    _openNextStep()
  }

  const selectDescription = (event) => {
    steps[5] = true
    _openNextStep()
  }


  const onSubmit = () => {
    const newScoreSystem = { attributes:{
      apiid: null,
      name: data.name,
      description: data.description,
      code: null,
      firstsync: false,
      synced: false,
      localcreatedAt: new Date().toISOString(),
      localupdatedAt: new Date().toISOString(),
      author: user.id,
      targets: range(data.totalRounds)
        .map(i => range(data.totalArrows)
            .map(j => Object.assign([], data.validScores)))
    }
  }
    // Update the scoreSystems list in the local storage
    const scoreSystems = localStorage.get("scoreSystems") || []
    localStorage.set("scoreSystems", [...scoreSystems, newScoreSystem])
    navigate(-1)
  }
</script>


<div class="score-systems-new">
  <SectionHeader>
    <h1 slot="title">Create Score System</h1>
  </SectionHeader>
  <main>
    <form on:submit|preventDefault={onSubmit}>
      <div class="steps">
        <div class="step step-1" class:open={openStep == 1}>
          <div class="summary">
            <div class="number">1.</div>
            <div class="title"># of arrows per target/round</div>
            <div class="edit" class:show={steps[1] && openStep != 1}>
              <a on:click|stopPropagation={() => { openStep=1 }}>Edit</a>
            </div>
            <div class="values">{data.totalArrows}</div>
          </div>
          {#if openStep == 1}
          <div class="fields">
            <div class="selector">
              {#each ARROWS_OPTIONS as num }
              <input
                type="radio"
                name="total-arrows"
                id="ar-{num}"
                on:change={selectTotalArrows}
                value={num}>
              <label for="ar-{num}">
              {num}
              </label>
              {/each}
            </div>
          </div>
          {/if}
        </div>

        <div class="step step-2" class:open={openStep == 2}>
          <div class="summary">
            <div class="number">2.</div>
            <div class="title"># of targets/rounds</div>
            <div class="edit" class:show={steps[2] && openStep != 2}>
              <a on:click|stopPropagation={() => { openStep=2 }}>Edit</a>
            </div>
            <div class="values">{data.totalRounds > 0 ? data.totalRounds : ''}</div>
          </div>
          {#if openStep == 2}
          <div class="fields">
            <input
              type="number"
              name="total-rounds"
              min=1
              placeholder="Enter a number"
              bind:value={data.totalRounds} />
            <Button theme="secondary" disabled={data.totalRounds <= 0}
              on:click={selectTotalRounds}>
              Ok, continue
            </Button>
          </div>
          {/if}
        </div>

        <div class="step step-3" class:open={openStep == 3}>
          <div class="summary">
            <div class="number">3.</div>
            <div class="title">Valid score</div>
            <div class="edit" class:show={steps[3] && openStep != 3}>
              <a on:click|stopPropagation={() => { openStep=3 }}>Edit</a>
            </div>
            <div class="values">{data.validScores.join(', ')}</div>
          </div>
          {#if openStep == 3}
          <div class="fields">
            <div class="selector">
              {#each SCORES_OPTIONS as num }
              <input
                type="checkbox"
                name="score-option"
                id="sc-{num}"
                bind:group={data.validScores}
                value={num}>
              <label for="sc-{num}">
              {num}
              </label>
              {/each}
            </div>
            <Button theme="secondary" disabled={data.validScores.length == 0}
              on:click={selectValidScores}>
              Ok, continue
            </Button>
          </div>
          {/if}
        </div>

        <div class="step step-4" class:open={openStep == 4}>
          <div class="summary">
            <div class="number">4.</div>
            <div class="title">Name</div>
            <div class="edit" class:show={steps[4] && openStep !=4}>
              <a on:click|stopPropagation={() => { openStep=4 }}>Edit</a>
            </div>
            <div class="values">{data.name}</div>
          </div>
          {#if openStep == 4}
          <div class="fields">
            <input
              autocomplete="off"
              type="text"
              name="name"
              placeholder="Type a name"
              bind:value={data.name} />
            <Button theme="secondary" disabled={data.name == ""}
              on:click={selectName}>
              Ok, continue
            </Button>
          </div>
          {/if}
        </div>
        <div class="step step-5" class:open={openStep == 5}>
          <div class="summary">
            <div class="number">5.</div>
            <div class="title">Description (optional)</div>
            <div class="edit" class:show={steps[5] && openStep !=5}>
              <a on:click|stopPropagation={() => { openStep=5 }}>Edit</a>
            </div>
            <div class="values">{data.description}</div>
          </div>
          {#if openStep == 5}
          <div class="fields">
            <input
              autocomplete="off"
              type="text"
              name="description"
              placeholder="Type a description"
              bind:value={data.description} />
            <Button theme="secondary"}
              on:click={selectDescription}>
              Ok, continue
            </Button>
          </div>
          {/if}
        </div>

      </div>
      <div class="actions">
        <Button type="submit" disabled={!isComplete}>
          Create score system
        </Button>
      </div>
    </form>
  </main>
</div>

<style lang="postcss">
.score-systems-new {
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
  &.open {
    & .summary {
      background-color: var(--color-white);

      & .values {
        display: none;
      }
    }
  }
}


</style>
