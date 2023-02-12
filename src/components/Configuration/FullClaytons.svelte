<script lang="ts">
  /**
   * @file FullClaytons.svelte 
   * @description  Implement full claytons component for collections configuratio
   * - display basic help and then each of the buttons for navigation option
   * - pressing a button will call the updateController to do the work
   * - on completion a call back will send a message to the CollectionsConfiguration component
   *   in case any new pages were created
  */
  import { updatePageController } from "../../lib/updatePageController";
  import { toastAlert } from "../../lib/ui";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  /**
   * @function updateOutputPage
   * @param {string} navOption
   * @description  Implement full claytons using the provided nav option
   */
  function startFullClaytons(navOption: string) {
    const convertNavOption = ["none", "pages", "tabs"/*, "table"*/].indexOf(navOption) + 1;
    const updateController = new updatePageController(
      undefined,
      fullClaytonsCompleted,
      convertNavOption
    );

    updateController.execute();
  }

  /**
   * @function fullClaytonsCompleted
   * @param pageController
   * @description called to perform any necessary steps after claytons completion
   * - display outcome alerts to the user
   * - dispatch messages with details of the pages that were created
   */
  function fullClaytonsCompleted(pageController) {
    let outcomes = pageController.generateOutcomesString(
      "Full Claytons update"
    );

    // send message to collections configuration component
    const pageNames = pageController.getPageNamesUpdated();

    pageNames.forEach((pageName) => {
      dispatch("message", {
        msgType: "updatePage",
        pageType: "outputPage",
        pageName: pageName,
      });
    });

    // provide details
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
      url: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/collections/full-claytons/",
    },
    navBarOptions: {
      tooltip: `<p>There are three navigation bar options:</p>
		<ol>
		  <li> None - no navigation between pages/collections. </li>
		  <li> Pages - collections on separate pages with navigation between. </li>
		  <li> Tabs - multiple collections on a page with tab navigation. </li>
		</ol>`, 
      /*<li> 🚧 Table - multiple collections joined into a single table. </li> */
      url: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/collections/full-claytons/#navigation-bar-options",
    },
  };
</script>

<div style="margin-top:0.5em">
  <div>
    <strong>Full "Claytons"</strong>
    <sl-tooltip>
      <div slot="content">{@html HELP.fullClaytons.tooltip}</div>
      <a target="_blank" rel="noreferrer" href={HELP.fullClaytons.url}
        ><i class="icon-question cc-module-icon" /></a
      >
    </sl-tooltip>

  </div>
  <div class="border border-trbl" style="padding:0.5em">
    <label for="cc-config-full-claytons-navigation-option"
      >Navigation Bar Options</label
    >
    <sl-tooltip>
      <div slot="content">{@html HELP.navBarOptions.tooltip}</div>
      <a target="_blank" rel="noreferrer" href={HELP.navBarOptions.url}
        ><i class="icon-question cc-module-icon" /></a
      >
    </sl-tooltip>
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
<!--      <button class="btn" on:click={() => startFullClaytons("table")}
        >Table</button
      > -->
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
