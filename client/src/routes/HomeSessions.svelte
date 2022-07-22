<script>
  import { navigate } from "svelte-navigator";
  import Button from '../components/Button.svelte'
  import img from '../assets/imgs/img-session.png'

  const navigateToNewSession = () => {
    navigate("/sessions/new")
  }

</script>

<div class="sessions">
  <h1>Session</h1>
  <img src="{img}" alt="bows">
  <Button type="secondary" disabled={true}>
    join session
  </Button>
  <Button
    on:click|once={navigateToNewSession}>
    create session
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
