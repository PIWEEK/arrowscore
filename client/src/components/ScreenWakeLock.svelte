<script>
  /**
   * Component based on https://github.com/flaming-codes/svelte-screen-wake-lock/
   *
   * MIT License
   *
   * Copyright (c) 2022 Tom Schönmann
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

  import { onDestroy, onMount, createEventDispatcher } from "svelte";

  /**
   * Disable the automatic request to lock
   * the wake screen on mount of the component.
   */
  export let lockOnMountDisabled = undefined
  /**
   * Disable the automatic release of the lock.
   * Note: using this prop can lead to memory leaks.
   */
  export let unlockOnMountDisabled = undefined

  /**
   * Captured reference to control and
   * lsiten to lock.
   */
  let sentinel = null

  const dispatch = createEventDispatcher()

  export async function requestWakeLock() {
    if (!("wakeLock" in navigator)) {
      dispatch("error", new Error("unsupported"))
      return
    }

    try {
      sentinel = await navigator.wakeLock.request()
      sentinel.addEventListener("release", () =>
        dispatch("change", { released: sentinel.released })
      )
      dispatch("change", { released: sentinel.released })
    } catch (error) {
      dispatch("error", error)
    }
  }

  /**
   * Manually release the lock. Can be access by
   * using `bind:this={ref}` and the calling
   * `ref.release()`.
   */
  export function release() {
    if (sentinel) sentinel.release()
    sentinel = null
  }

  /**
   * React to visibiltiy changes, i.e. if the user
   * selects another tab and later returns to your
   * page that hosts the sentinel.
   */
  async function onVisibilityChange() {
    if (sentinel !== null && document.visibilityState === "visible") {
      await requestWakeLock()
    }
  }

  /**
   * Automatically use lock on mount, if not specifiied
   * otherwise in props.
   */
  onMount(async () => {
    if (!lockOnMountDisabled) await requestWakeLock()
    document.addEventListener("visibilitychange", onVisibilityChange)
  })

  /**
   * Clean up on unmount, if not specified otherwise.
   */
  onDestroy(() => {
    if (!unlockOnMountDisabled) release()
    document.removeEventListener("visibilitychange", onVisibilityChange)
  })
</script>
