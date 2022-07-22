<script>
  import { navigate } from "svelte-navigator"
  import IconArrow from "../assets/svgs/icon-arrow.svg"

  export let theme = "dark"  // dark / light
</script>


<header
  class="section-header {theme}">
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

  /* light theme */
  &.light {
    border-bottom: 1px solid var(--color-gray-light);
    color: var(--color-black);
    background-color: var(--color-white);

    & :global(svg) {
      fill: var(--color-black);
    }
  }
}
</style>
