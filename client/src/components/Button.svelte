<script>
  import { createEventDispatcher } from 'svelte'

  /* type: 'button' (default) | 'submit' | 'reset' */
  export let type = "button"
  /* disabled: bool */
  export let disabled = false
  /* theme: 'primary' (default) | 'secondary' | 'link' */
  export let theme = "primary"

	const dispatch = createEventDispatcher()

  const handleOnClick = (event) => {
    dispatch("click", event)
  }
</script>

<button class={theme} type={type} disabled={disabled} on:click={handleOnClick}>
  <slot></slot>
</button>

<style lang="postcss">
  button {
    border: 2px solid var(--color-black);
    padding: 9px 11px;
    height: 50px;
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

    &.primary {
      background:  var(--color-black);
      color:  var(--color-white);

      &:disabled,
      &[disabled]{
        background: var(--color-gray);
      }
    }

    &.secondary {
      background: var(--color-white);
      color: var(--color-black);

      &:disabled,
      &[disabled]{
        color: var(--color-gray);
      }
    }

    &.link {
      border: none;
      background: none;
      height: auto;
      width: auto;
      padding: 0;
      text-decoration: underline;
      color: var(--color-black);

      &:disabled,
      &[disabled]{
        color: var(--color-gray);
      }
    }
  }
</style>
