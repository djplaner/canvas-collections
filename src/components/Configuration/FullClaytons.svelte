<script lang="ts">
  import { updatePageController } from "../../lib/updatePageController";
  import { toastAlert } from "../../lib/ui"

  /**
   * @function updateOutputPage
   * @param {string} navOption
   * @description  Implement full claytons using the provided nav option
   */
  function startFullClaytons(navOption: string) {
    const convertNavOption = ["none", "pages", "tabs"].indexOf(navOption) + 1;
    const updateController = new updatePageController(
      undefined,
      fullClaytonsCompleted,
      convertNavOption
    );

    updateController.execute();
  }

  function fullClaytonsCompleted(pageController) {
    let outcomes = pageController.generateOutcomesString( "Full Claytons update");

    if ( ! pageController.singleCollection ) {
      toastAlert(outcomes, "danger")
    }
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
    <div class="cc-config-full-claytons-navigation-option">
      <button class="btn" on:click={() => startFullClaytons("none")}
        >None</button
      >
      <button class="btn" on:click={() => startFullClaytons("pages")}
        >Pages</button
      >
      <button class="btn" on:click={() => startFullClaytons("tabs")}
        >Tabs</button
      >
    </div>
  </div>
</div>

<style>
  .cc-config-full-claytons-navigation-option {
    text-align: center;
  }
  .cc-config-full-claytons-navigation-option button {
    font-size: 0.8em;
    padding: 0.5em;
  }
</style>
