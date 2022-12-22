<script>
    import { navigate } from "svelte-navigator";
    import Button from '../components/Button.svelte'
    import img from '../assets/imgs/img-tournamentsession.png'
  
    const navigateToNewTournamentSession = () => {
      navigate("/tournamentsessions/new")
    }
  
  </script>
  
  <div class="sessions">
    <h1>Tournament Session</h1>
    <img src="{img}" alt="bows">
    <Button theme="secondary"  on:click={() => { navigate("/my/tournamentSessions")}} disabled={false}>
      rejoin tournament session
    </Button>
    <Button
      on:click|once={navigateToNewTournamentSession}>
      create tournament session
    </Button>
  </div>
  
  
  <style lang="postcss">
  
  .sessions{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 100%;
    padding: 5vh 0;
  
    & h1 {
      font-size: 2rem;
    }
  }
  
  img {
    flex-grow: 1;
    height: 200px;
  }
  </style>
  