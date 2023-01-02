<script lang="ts">

	import { debug } from "../../lib/debug";

	function fullClaytons(navigationOption) {
			debug(`fullClaytons ${navigationOption}`);
	}
</script>

<div style="margin-top:0.5em">
  <div>
    <a
      id="cc-about-full-claytons"
      target="_blank"
      href="https://djplaner.github.io/canvas-collections/reference/representations/claytons/overview"
      rel="noreferrer"
    >
      <i class="icon-question cc-module-icon" /></a
    >
    <strong>Full "Claytons"</strong>
  </div>
  <div class="border border-trbl" style="padding:0.5em">
    <a
      id="cc-about-full-claytons-navigation-option"
      rel="noreferrer"
      target="_blank"
      href="https://djplaner.github.io/canvas-collections/reference/representations/claytons/overview/#navigation-bar-options"
      ><i class="icon-question cc-module-icon" /></a
    >
    <label for="cc-config-full-claytons-navigation-option"
      >Navigation Bar Options</label
    >
    <div id="cc-config-full-claytons-navigation-option">
      <button class="btn" on:click={() => fullClaytons("none")}>None</button>
      <button class="btn" on:click={() => fullClaytons("pages")}>Pages</button>
      <button class="btn" on:click={() => fullClaytons("tabs")}>Tabs</button>
    </div>
  </div>
</div>

<style>
</style>
