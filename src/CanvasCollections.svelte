<script lang="ts">
  import { collectionsStore, modulesStore, configStore } from "./stores";
  import CanvasCollectionsRepresentation from "./components/CanvasCollectionsRepresentation.svelte";
  import CollectionsConfiguration from "./components/CollectionsConfiguration.svelte";
  import { onMount, onDestroy } from "svelte";
  import {
    addCollectionsRepresentation,
    removeCollectionsRepresentation,
    removeModuleConfiguration,
  } from "./lib/CanvasSetup";
  import { CanvasDetails } from "./lib/CanvasDetails";
  import {
    CollectionsDetails,
    calculateActualNum,
  } from "./lib/CollectionsDetails";

  import { debug } from "./lib/debug";
  import { toastAlert } from "./lib/ui";
  debug("______________ CanvasCollections.svelte _______________");

  const CC_VERSION = "1.0.0a";
  const TIME_BETWEEN_SAVES = 10000;
  const TIME_BETWEEN_CANVAS_REFRESH = 1500000;
  const AUTO_SAVE = true;

  export let courseId: number;
  export let editMode: boolean;
  export let csrfToken: string;
  export let modulesPage: boolean;
  // this may need to come back?
  //  export let currentCollection: number;
  export let showConfig: boolean;

  let checked = false;

  $configStore = {
    courseId: courseId,
    editMode: editMode,
    csrfToken: csrfToken,
    modulesPage: modulesPage,
    currentCollection: null,
    needToSaveCollections: false,
    ccOn: false,
  };

  let collectionsConfigUrl = `/courses/${$configStore["courseId"]}/pages/canvas-collections-configuration`;

  // track whether the intervals have been set
  // Making sure we don't get multiple intervals running
  let saveIntervalOn = false;
  let refreshIntervalOn = false;
  // whether or data canvas and collections data loaded
  let canvasDataLoaded = false;
  let collectionsDataLoaded = false;
  // the actual data objects for canvas and collections data
  let canvasDetails = null;
  let collectionsDetails = null;
  let saveInterval = null;
  let refreshCanvasDetails = null;

  let ccPublished = true;

  // Whenever currentCollection is changed, save the last collection viewed
  // into local storage
  $: {
    let lastViewedCollection = $configStore["currentCollection"];
    if (canvasDataLoaded && collectionsDataLoaded) {
      collectionsDetails.saveLastCollectionViewed(lastViewedCollection);
    }
  }

  /**
   * Callback function for when canvasDetails is loaded
   */
  function gotCanvasDetails() {
    console.log("XXXXXXXXXXXXXXX getCanvasDetails");
    console.log(canvasDetails);
    canvasDataLoaded = true;
    // canvasDetails.courseModules is an array of Canvas module objects
    // set $modulesStore to a dict of Canvas module objects keyed on the module id
    $modulesStore = canvasDetails.courseModules; /*.reduce((acc, module) => {
      acc[module.id] = module;
      return acc;
    }, {}); */
    checkAllDataLoaded();
  }

  /**
   * @function gotCollectionsDetails
   * @param {string} status - undefined if working, others a label for an error
   * @description Called by CollectionsDetails when the collections data
   * has been retrieved or if there were problems
   */
  function gotCollectionsDetails(status: string = "") {
    console.log("YYYYYYYY gotCollectionsDetails");
    console.log(collectionsDetails);

    if (status === "") {
      //----- Range of updates to local data based on the now retrieved collections JSON
      //ccOn = collectionsDetails.ccOn;
      $configStore["ccOn"] = collectionsDetails.ccOn;
      ccPublished = collectionsDetails.ccPublished;

      $configStore["currentCollection"] =
        collectionsDetails.getCurrentCollection();

      // if a student is viewing and no collections, then limit what is done
      if (!(!$configStore["ccOn"] && !$configStore["editMode"])) {
        collectionsDataLoaded = true;
        checkAllDataLoaded();
      }
    } else if (status === "no collections config") {
      // if collectionsDetails has errors and editMode are true
      // call CollectionsDetails::initialiseConfigPage
      if (
        $configStore["editMode"]
      ) {
        collectionsDetails.initialiseConfigPage();
      }
    } else {
      toastAlert(`some error get collection details ${status}`, "error")
    }
  }

  /**
   * @function checkAllDataLoaded
   * @description Called by both gotCanvasDetails and gotCollectionsDetails will
   * check if both have finished. If so it will
   * 1. Add the collections display (if collections is turned on)
   * 2. use setInterval to check if collections needs to be saved (if ccOn and editMode)
   */
  function checkAllDataLoaded() {
    if (canvasDataLoaded && collectionsDataLoaded) {
      // add in some Canvas module data to the collections module data
      collectionsDetails.addCanvasModuleData(
        canvasDetails.courseModules,
        $configStore["editMode"]
      );

      $collectionsStore = collectionsDetails.collections;
      calculateActualNum(
        canvasDetails.courseModules,
        $collectionsStore["MODULES"]
      );
      checked = $configStore["ccOn"];
      if ($configStore["ccOn"]) {
        addCollectionsDisplay();
        // set up auto save for collections config
        if ($configStore["editMode"] && AUTO_SAVE && !saveIntervalOn) {
          saveIntervalOn=true;
          // only if we're in editMode and auto save is on
          saveInterval = setInterval(() => {
            collectionsDetails.saveCollections(
              $configStore["editMode"],
              $configStore["needToSaveCollections"],
              completeSaveCollections
            );
          }, TIME_BETWEEN_SAVES);
        }
        if (!refreshIntervalOn) {
          refreshIntervalOn = true;
          // set up auto refresh of canvasDetails
          refreshCanvasDetails = setInterval(() => {
            canvasDetails.refreshCanvasDetails(gotCanvasDetails);
          }, TIME_BETWEEN_CANVAS_REFRESH);
        }
      }
    }
  }

  function completeSaveCollections(status) {
    if (status) {
      $configStore["needToSaveCollections"] = false;
    }
  }

  /**
   * Called when the collections on/off switch is clicked
   * Turn collections on or off and indicate a need to save
   */

  function toggleCollectionsSwitch() {
    $configStore["ccOn"] = !$configStore["ccOn"];
    checked = $configStore["ccOn"];
    $collectionsStore["STATUS"] = $configStore["ccOn"] ? "on" : "off";
    $configStore["needToSaveCollections"] = true;
    // modify the display accordingly
    if ($configStore["ccOn"]) {
      addCollectionsDisplay();
    } else {
      removeCollectionsDisplay();
    }
  }

  /**
   * @function toggleConfigShow
   * @param e - the event object
   * @description Called when the config show/hide button is clicked
   * 1. Show/hide the CanvasCollectionsConfiguration component depending on state
   */
  function toggleConfigShow(e) {
    showConfig = !showConfig;
    console.log(`toggleConfigShow new ${showConfig}`);
    console.log(e);
  }

  /**
   * Modify the canvas modules page by
   * - Adding <CanvasCollectionsRepresentation> at top of div#context_modules
   * - Add a <CollectionsModuleConfiguration> for each canvas module belonging to
   *   the currently visible collection
   * - hiding modules not part of the current visible collection
   */
  function addCollectionsDisplay() {
    // add the representation div
    const div = addCollectionsRepresentation();

    if (div) {
      const representation = new CanvasCollectionsRepresentation({
        target: div,
      });
    }
  }

  /**
   *  Modify the Canvas modules page by reversing what addCollectionsDisplay does
   */
  function removeCollectionsDisplay() {
    removeCollectionsRepresentation();
    removeModuleConfiguration($collectionsStore["MODULES"]);
  }

  onMount(async () => {
    // grab all the canvas course module related information
    // canvasDetails
    // - courseObject
    // - modules
    if (modulesPage) {
      canvasDetails = new CanvasDetails(gotCanvasDetails, {
        courseId: courseId,
        csrfToken: csrfToken,
      });

      collectionsDetails = new CollectionsDetails(gotCollectionsDetails, {
        courseId: courseId,
        csrfToken: csrfToken,
      });
    }
  });

  /**
   * @function onDestroy
   * @description If there is a saveInterval, then clear it
   * TODO not really sure this is needed, as I don't explicitly destroy the
   * component and it may not be a problem when navigating away
   */
  onDestroy(() => {
    if (saveInterval) {
      clearInterval(saveInterval);
    }
    if (refreshCanvasDetails) {
      clearInterval(refreshCanvasDetails);
    }
  });

  /**
   * @function beforeUnload
   * @param event
   * @description If when leaving the page there are unsaved changes, then
   * save them
   */
  function beforeUnload(event) {
    event.preventDefault();
    collectionsDetails.saveCollections(
      $configStore["editMode"],
      $configStore["needToSaveCollections"],
      completeSaveCollections
    );
    console.log("fred");
  }

  const HELP = {
    switchTitle: {
      tooltip: `Collections helps you group modules into collections and customising their representation.`,
      url: "https://djplaner.github.io/canvas-collections/",
    },
    unpublished: {
      tooltip: `<p>The <em>Canvas Collections Configuration</em> page</a> is unpublished.
        (Click the <em>unpublished</em> button to publish the page) </p> 
        <p>Meaning live Collections will <strong>not</strong> be visible in 
          "Student View" or for students.</p> 
          <p>Any Claytons Collections will be visible, if the relevant pages are published.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/on-off-unpublished/",
    },
  };
</script>

<svelte:window on:beforeunload={beforeUnload} />

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/themes/light.css"
  />
  <script
    type="module"
    src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/shoelace.js"
  ></script>
</svelte:head>

{#if editMode && modulesPage}
  <div class="cc-switch-container">
    <div class="cc-switch-title">
      <sl-tooltip>
        <div slot="content">{HELP.switchTitle.tooltip}</div>
        <a target="_blank" rel="noreferrer" href={HELP.switchTitle.url}
          ><i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
      {#if canvasDataLoaded && collectionsDataLoaded}
        <i
          id="configShowSwitch"
          class="{showConfig
            ? 'icon-mini-arrow-down'
            : 'icon-mini-arrow-right'} cc-module-icon"
          on:click={toggleConfigShow}
          on:keydown={toggleConfigShow}
        />
      {/if}
      <small>Canvas Collections</small>
      <span style="font-size:50%">{CC_VERSION}</span>
    </div>

    {#if canvasDataLoaded && collectionsDataLoaded}
      <label class="cc-switch" for="cc-switch">
        <sl-switch
          {checked}
          id="cc-switch"
          on:sl-change={toggleCollectionsSwitch}
        />
      </label>
      <div class="cc-save">
        <button
          class={$configStore["needToSaveCollections"]
            ? "cc-active-save-button"
            : "cc-save-button"}
          id="cc-save-button"
          disabled={!$configStore["needToSaveCollections"]}
          on:click={collectionsDetails.saveCollections(
            $configStore["editMode"],
            $configStore["needToSaveCollections"],
            completeSaveCollections
          )}>Save</button
        >
        <!--  saveButtonClass = "cc-active-save-button"; -->
      </div>
    {/if}
    {#if !ccPublished}
      <div class="cc-unpublished">
        <sl-tooltip trigger="hover focus">
          <div slot="content">{@html HELP.unpublished.tooltip}</div>
          <a
            id="cc-about-unpublished"
            target="_blank"
            rel="noreferrer"
            href={HELP.unpublished.url}
            ><i class="icon-question cc-module-icon" /></a
          >
        </sl-tooltip>
        <a href={collectionsConfigUrl} target="_blank" rel="noreferrer">
          <sl-button pill size="small" variant="warning">unpublished</sl-button>
        </a>
      </div>
    {/if}
    {#if showConfig}
      <div id="cc-config" class="border border-trbl">
        <CollectionsConfiguration />
      </div>
    {/if}
  </div>
{/if}

<style>
  #cc-config {
    position: absolute;
    top: 2.5em;
    left: -15em;
    z-index: 99;
    background-color: #f5f5f5;
    width: auto;
  }
  /* The switch - the box around the slider */
  .cc-switch {
    position: relative;
    display: inline-block;
    width: 2rem;
    height: 1.2rem;
    margin-right: 0.5rem;
  }

  .cc-switch-container {
    background-color: #f5f5f5;
    border: 1px solid #c7cdd1;
    color: var(--ic-brand-font-color-dark);
    display: flex;
    position: relative;
    align-items: center;
  }

  .cc-unpublished {
    margin-right: 0.5em;
  }

  .cc-switch-title {
    margin: 0.5rem;
  }

  .cc-save {
    margin-right: 0.5rem;
  }

  .cc-active-save-button {
    background-color: #c94444;
    color: var(--ic-brand-button--primary-text);
    border: 1px solid;
    border-color: var(--ic-brand-primary--primary-bgd-darkened-15);
    border-radius: 2px;
    display: inline-block;
    position: relative;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    text-align: center;
    vertical-align: middle;
    font-size: 65%;
    transition: background-color 0.2s ease-in-out;
  }

  .cc-save-button {
    background: #f5f5f5;
    color: #2d3b45;
    border: 1px solid;
    border-color: #c7cdd1;
    border-radius: 2px;
    cursor: auto;
    display: inline-block;
    position: relative;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    text-align: center;
    vertical-align: middle;
    font-size: 65%;
    transition: background-color 0.2s ease-in-out;
  }

  .cc-save-button:enabled {
    cursor: pointer;
  }

  .cc-save-button:hover:enabled {
    background: #cccccc;
  }

  #cc-switch::part(control) {
    --sl-color-primary-600: #328c04;
  }

  sl-tooltip {
    text-align: left;
    white-space: normal;
  }
</style>
