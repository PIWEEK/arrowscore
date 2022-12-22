
<script>
  import ScoreSystemDownloadOrCreate from "../components/ScoreSystemDownloadOrCreate.svelte"
  import img from '../assets/imgs/img-tournamentsession.png'

</script>

<div class="score-systems">
  <h1>Score System</h1>
  <img src="{img}" alt="target board">
<ScoreSystemDownloadOrCreate/>
</div>

<style lang="postcss">
  .score-systems{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 100%;
    padding: 5vh 0;
  
    & form {
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
  
    & h1 {
      font-size: 2rem;
    }
  
    & .btn-row {
      border-top: 0px solid var(--color-gray-light);
      display: flex;
      width: 100%;
      gap: 1rem;
      padding-top: 1rem;
    }
  }
  
  img {
    flex-grow: 1;
    height: 210px;
    padding-bottom: 2.5rem;
  }
  </style>
  