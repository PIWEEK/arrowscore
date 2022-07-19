<script>
  import Button from '../components/Button.svelte'
  import img from '../assets/imgs/img-score.png'
</script>

<div class="score-systems">
  <h1>Score System</h1>
  <img src="{img}" alt="target board">
  <Button type="secondary">create advanced score system</Button>
  <Button>create score system</Button>
</div>


<style lang="postcss">

.score-systems{
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
