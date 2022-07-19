<script>
  import Button from '../components/Button.svelte'
  import img from '../assets/imgs/img-tournament.png'
</script>

<div class="tournaments">
  <h1>Tournament</h1>
  <img src="{img}" alt="arrows">
  <Button type="secondary">join tournament</Button>
  <Button>create tournament</Button>
</div>


<style lang="postcss">

.tournaments{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
  padding: 45px 0;
}

img {
  flex-grow: 1;
  height: 170px;
}
</style>
