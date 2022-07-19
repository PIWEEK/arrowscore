<script>
  import { createEventDispatcher } from 'svelte'

  /* types: 'primary' (default) | 'secondary' */
  export let type = "primary"
  /* disabled: bool */
  export let disabled = false

	const dispatch = createEventDispatcher()

  const handleOnClick = (event) => {
    dispatch("click", event)
  }
</script>

<button class={type} disabled={disabled} on:click={handleOnClick}>
  <slot></slot>
</button>

<style lang="postcss">
  button {
    border: 2px solid var(--color-black);
    padding: 9px 11px;
    height: 40px;
    width: 100%;

    font-family: 'Manrope', sans-serif;
    font-weight: 600;
    font-variant: normal;
    font-size: 1rem;
    line-height: 1.2rem;

    &:disabled,
    &[disabled]{
      border-color: var(--color-gray);
    }
  }

  .primary {
    background:  var(--color-black);
    color:  var(--color-white);

    &:disabled,
    &[disabled]{
      background: var(--color-gray);
    }
  }

  .secondary {
    background: var(--color-white);
    color: var(--color-black);

    &:disabled,
    &[disabled]{
      color: var(--color-gray);
    }
  }
</style>
