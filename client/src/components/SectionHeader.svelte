<script>
  import { navigate } from "svelte-navigator"
  import IconArrow from "../assets/svgs/icon-arrow.svg"
</script>


<header class="section-header">
  <button
    class="go-back"
    title="Go back"
    on:click={() => navigate(-1)}>
    <IconArrow width="20" height="18" />
  </button>

  <div class="title">
    <slot name="title"></slot>
  </div>
  {#if $$slots.action}
  <div class="action">
    <slot name="action"></slot>
  </div>
  {/if}
</header>


<style lang="postcss">
.section-header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: .25rem 1.25rem;
  gap: 1.25rem;
  height: 60px;

  color: var(--color-white);
  background-color: var(--color-black);

  & .title {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  & .action {
    align-self: flex-end;
    width: 35px;
  }

  & .go-back {
    border: none;
    background: none;
  }

  & :global(svg) {
    fill: var(--color-white);
  }
}
</style>
