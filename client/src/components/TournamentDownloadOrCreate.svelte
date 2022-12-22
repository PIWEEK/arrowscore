<script>
    import { navigate } from "svelte-navigator";
    import { apiClient } from "../services/api"
    import { localStorage } from "../services/storages"
    import Button from './Button.svelte'
  
  
    const navigateToNewTournament = () => {
      navigate("/tournaments/new")
    }
  
    const reload = () => {
      navigate("/my/tournaments")
    }
  
    let code = null
  
    const downloadServerTournament = async () => {
      const {data} = await apiClient(
        "GET",
        "tournaments?populate=*&filters[code][$eq]="+code,
      )
      const localTournaments = localStorage.get("tournaments") || []
      console.log("downloaded T"+data[0].attributes.name)
  
      let existingLocalTournaments = []
      
      for (const i of localTournaments){
        existingLocalTournaments.push(i.attributes["code"])
      }
      
      if (! existingLocalTournaments.includes(data[0].attributes.code)){
          localTournaments.push(data[0])
          console.log("YEAH!")
        }
      else {
          console.log("Dup!")
      }
      localStorage.set("tournaments", localTournaments)
      reload()
    }
  
  </script>
  
  
   <div class="btn-row">
    <form on:submit|preventDefault={downloadServerTournament}>
      <input
      type="text"
      name="code"
      placeholder="Enter code" 
      bind:value={code} />
      <Button
        theme="secondary"
        on:click|once={downloadServerTournament}
        disabled={false}>
        download
      </Button>
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
        