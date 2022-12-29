<script>
    import { navigate } from "svelte-navigator";
    import { apiClient } from "../services/api"
    import { localStorage } from "../services/storages"
    import Button from './Button.svelte'
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faSync } from '@fortawesome/free-solid-svg-icons/index.js'

  
    const navigateToNewTournament = () => {
      navigate("/tournaments/new")
    }
  
  
    let code = ""
    let syncInProgress = false
  
    const downloadServerTournament = async () => {
      syncInProgress = true
      const {data} = await apiClient(
        "GET",
        "tournaments?populate=*&filters[code][$eq]="+code.toUpperCase(),
      )
      const localTournaments = localStorage.get("tournaments") || []
      const localScoreSystems = localStorage.get("scoreSystems") || []

      console.log("downloaded T"+data[0].attributes.name)
  
      let existingLocalTournaments = []
      let existingLocalScoreSystems = []
      
      for (const i of localTournaments){
        existingLocalTournaments.push(i.attributes["code"])
      }
      for (const i of localScoreSystems){
        existingLocalScoreSystems.push(i.attributes["code"])
      }
      
      if (! existingLocalTournaments.includes(data[0].attributes.code)){
          localTournaments.push(data[0])
          console.log("YEAH!")
      }
        else {
          console.log("Dup!")
      }

      if (! existingLocalScoreSystems.includes(data[0].attributes.score_system.data.attributes.code)){
          localScoreSystems.push(data[0].attributes.score_system.data)
      }

      localStorage.set("tournaments", localTournaments)
      localStorage.set("scoreSystems", localScoreSystems)
      
      location.reload()

    }
  
  </script>
  
  
   <div class="btn-row">
    <form on:submit|preventDefault={downloadServerTournament}>
      <input
      autocomplete="off"
      type="text"
      name="code"
      placeholder="Enter code" 
      bind:value={code} />
      {#if syncInProgress}
      <Button
      theme="secondary">
        <Fa icon={faSync} spin/>
      </Button>
      {:else}
      <Button
        theme="secondary"
        disabled={code.length != 4}
        on:click|once={downloadServerTournament}>
        download
      </Button>
      {/if}
    </form>
    </div>
    <!-- <Button
      theme="secondary"
      on:click|once={navigateToNewAdvanceScoreSystem}
      disabled={true}>
      create advanced
    </Button>-->
    <Button
      on:click|once={navigateToNewTournament}>
      create tournament
    </Button>
  
  
  
    <style lang="postcss">
    form {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 1.4rem;
            width: 100%;
        
            & .field {
              display: flex;
              flex-direction: column;
              gap: .4rem;
              width: 100%;
        
              & label {
                font-family: 'Manrope', serif;
                font-weight: 600;
                font-size: 1.1rem;
                padding-left: .5rem;
              }
            }
          }

           .btn-row {
            border-top: 0px solid var(--color-gray-light);
            display: flex;
            width: 100%;
            gap: 1rem;
            padding-top: 1rem;
          }
        

        </style>
        