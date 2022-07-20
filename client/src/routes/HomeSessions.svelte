<script>
  import Button from '../components/Button.svelte'
  import img from '../assets/imgs/img-session.png'
</script>

<div class="sessions">
  <h1>Session</h1>
  <img src="{img}" alt="bows">
  <Button type="secondary">join session</Button>
  <Button>create session</Button>
</div>


<style lang="postcss">

.sessions{
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
  height: 200px;
}
</style>
