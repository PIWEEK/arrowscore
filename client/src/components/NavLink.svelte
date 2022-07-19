<script>
  /*
  * NOTE: You can define style from parent component with:
  *
  *    & :global(.nav-link) {
  *      padding: 6px;
  *    }
  *
  *    & :global(.active) {
  *      border-bottom: 4px solid black;
  *    }
  */
  import { Link } from "svelte-navigator";

  export let to = "";

  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

    // The object returned here is spread on the anchor element's attributes
    return isActive
      ? { class: "nav-link active" }
      : { class: "nav-link" };
  }
</script>

<Link to="{to}" getProps="{getProps}">
  <slot />
</Link>
