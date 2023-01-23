<script lang="ts">
  import { updatePageController } from "../../lib/updatePageController";
  import { toastAlert } from "../../lib/ui";

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
    let outcomes = pageController.generateOutcomesString(
      "Full Claytons update"
    );

    if (!pageController.singleCollection) {
      const numErrors = pageController.getNumErrors();
      if (numErrors > 0) {
        toastAlert(outcomes, "danger");
      } else {
        toastAlert(outcomes, "success");
      }
    }
  }

  const HELP = {
    fullClaytons: {
      tooltip: "<p>Update all the specified output pages with static representations of each collection using the selected navigation options.</p>",
      url: "https://djplaner.github.io/canvas-collections/reference/representations/claytons/overview",
    },
    navBarOptions: {
      tooltip: `<p>There are three navigation bar options:</p>
		<ol>
		  <li> None - no navigation between pages/collections. </li>
		  <li> Pages - collections on separate pages with navigation between. </li>
		  <li> Tabs - multiple collections on a page with tab navigation. </li>
      <li> 🚧 Table - multiple collections joined into a single table. </li>
		</ol>`, 
      url: "https://djplaner.github.io/canvas-collections/reference/representations/claytons/overview/#navigation-bar-options",
    },
  };
</script>

<div style="margin-top:0.5em">
  <div>
    <sl-tooltip>
      <div slot="content">{@html HELP.fullClaytons.tooltip}</div>
      <a target="_blank" rel="noreferrer" href={HELP.fullClaytons.url}
        ><i class="icon-question cc-module-icon" /></a
      >
    </sl-tooltip>

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
      <button class="btn" on:click={() => startFullClaytons("table")}
        >Table</button
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
