<script>
  import SectionHeader from "../components/SectionHeader.svelte"
</script>


<div class="score-systems-new">
  <SectionHeader>
    <h1>Create Score System</h1>
  </SectionHeader>
  <main>
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
  }

  & main {
    flex-grow: 1;
  }
}
</style>
