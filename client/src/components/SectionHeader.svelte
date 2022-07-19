<script>
  import IconArrow from "../assets/svgs/icon-arrow.svg"
</script>


<header class="section-header">
  <IconArrow width="20" height="18" />
  <div class="title">
    <slot></slot>
  <div>
</header>


<style lang="postcss">
.section-header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 1.25rem;
  gap: 1.25rem;

  color: var(--color-white);
  background-color: var(--color-black);

  & .title {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  & :global(svg) {
    fill: var(--color-white);
  }
}
</style>
