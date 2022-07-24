<script>
  /*
   * Component based on https://github.com/kroniapp/svelte-swipeable-sheets
   *
   * MIT License
   *
   * Copyright (c) 2020 Kronia
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   */

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  let dialog;
  let backdrop;

  let startX;
  let startY;
  let direction;

  export let fullscreen = false;
  export let open = false;
  export let threshold = 0.3;
  export let backdropOpacity = 0.5;
  export let speed = 0.2;

  const touch = e => e.changedTouches ? e.changedTouches[0] : e;

  const deltaX = e => startX - touch(e).clientX;

  const deltaY = e => startY - touch(e).clientY;

  const touchStart = e => {
    startX = touch(e).clientX;
    startY = touch(e).clientY;
  }

  const touchMove = e => {
    if(!direction) {
      direction = Math.abs(deltaY(e)) > Math.abs(deltaX(e)) ? "vertical" : "horizontal";
    }

    if(deltaY(e) < 0 && direction === "vertical") {
      dialog.style.setProperty('--b', deltaY(e) + 'px');
      backdrop.style.setProperty('--o', (1 + deltaY(e) / dialog.clientHeight) * backdropOpacity);
    }
  }

  const touchEnd = e => {
    if(direction === "vertical") {
      open = -deltaY(e) / dialog.clientHeight < threshold;
      if (!open) {
        dispatch('close')
      }
    }
    startY = null;
    direction = null;
  };

  const close = e => {
    open = false
    dispatch('close')
  }

  $: if(dialog && backdrop) {
    dialog.style.setProperty('--s', speed + 's');
    backdrop.style.setProperty('--s', speed + 's');
  }

  $: if(dialog && backdrop && !direction) {
    dialog.style.setProperty('--b', open ? "0px" : -dialog.clientHeight + "px");
    backdrop.style.setProperty('--o', open ? backdropOpacity : 0);
  }
</script>

<div
  bind:this={backdrop}
  class="backdrop"
  smooth={!startY}
  {open}
  on:click={close} />
<div
  class="root shadow"
  bind:this={dialog}
  {fullscreen}
  smooth={!startY}
  on:touchstart={touchStart}
  on:touchmove={touchMove}
  on:touchend={touchEnd}>
  <slot />
</div>

<style>
  .root {
    position: fixed;
    background-color: var(--color-white);
    width: 100vw;
    overflow-x: auto;
    left: 0px;
    bottom: var(--b, -100%);
    z-index: 7;
  }

  .root[fullscreen=true] {
    height: 100%;
  }

  .root[smooth=true] {
    transition: bottom calc(var(--f, 1) * var(--s, 0s)) ease-in-out;
  }

  .backdrop {
    pointer-events: none;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100%;
    background-color: #212121;
    opacity: var(--o, 0);
    z-index: 6;
  }

  .backdrop[smooth=true] {
    transition: opacity calc(var(--f, 1) * var(--s, 0s)) ease-in-out;
  }

  .backdrop[open=true] {
    pointer-events: all;
  }

  .shadow {
    box-shadow: 0px -2px 8px #21212144, 0px 0px 2px #21212144;
  }
</style>
