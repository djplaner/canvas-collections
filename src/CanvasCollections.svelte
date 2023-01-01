<script lang="ts">
  import { collectionsStore, modulesStore, configStore } from "./stores";
  import CanvasCollectionsRepresentation from "./components/CanvasCollectionsRepresentation.svelte";
  import CollectionsConfiguration from "./components/CollectionsConfiguration.svelte";
  import { onMount, onDestroy } from "svelte";
  import {
    addCollectionsRepresentation,
    removeCollectionsRepresentation,
  } from "./lib/CanvasSetup";
  import { CanvasDetails } from "./lib/CanvasDetails";
  import { CollectionsDetails } from "./lib/CollectionsDetails";

  import { debug } from "./lib/debug";
  debug("______________ CanvasCollections.svelte _______________");

  const CC_VERSION = "0.9.10";

  export let courseId: number;
  export let editMode: boolean;
  export let csrfToken: string;
  export let modulesPage: boolean;
  export let currentCollection: number;
  export let showConfig: boolean;

  $configStore = {
    courseId: courseId,
    editMode: editMode,
    csrfToken: csrfToken,
    modulesPage: modulesPage,
    currentCollection: null,
    needToSaveCollections: false,
  };

  // whether or data canvas and collections data loaded
  let canvasDataLoaded = false;
  let collectionsDataLoaded = false;
  // the actual data objects for canvas and collections data
  let canvasDetails = null;
  let collectionsDetails = null;

  let ccOn = false;
  let ccPublished = true;

  /**
   * Callback function for when canvasDetails is loaded
   */
  function gotCanvasDetails() {
    console.log("XXXXXXXXXXXXXXX getCanvasDetails");
    console.log(canvasDetails);
    canvasDataLoaded = true;
    // canvasDetails.courseModules is an array of Canvas module objects
    // set $modulesStore to a dict of Canvas module objects keyed on the module id
    $modulesStore = canvasDetails.courseModules.reduce((acc, module) => {
      acc[module.id] = module;
      return acc;
    }, {});
    checkAllDataLoaded();
  }

  /**
   * Callback function for when collectionsDetails is loaded
   */
  function gotCollectionsDetails() {
    console.log("YYYYYYYY gotCollectionsDetails");
    console.log(collectionsDetails);
    //----- Range of updates to local data based on the now retrieved collections JSON
    ccOn = collectionsDetails.ccOn;
    ccPublished = collectionsDetails.ccPublished;

    // if a student is viewing and no collections, then limit what is done
    if (!(!ccOn && !$configStore["editMode"])) {
      // if currentCollection is a number, then the URL include #cc-collection-<num>
      // Need to set current collection to the name matching that collection
      if (
        typeof currentCollection === "number" &&
        currentCollection <
          collectionsDetails.collections.COLLECTIONS_ORDER.length &&
        currentCollection >= 0
      ) {
        $configStore["currentCollection"] =
          collectionsDetails.collections.COLLECTIONS_ORDER[currentCollection];
      }

      //----- Indicate we've loaded the data and check if ready for next step
      collectionsDataLoaded = true;
      checkAllDataLoaded();
    }
  }

  function checkAllDataLoaded() {
    if (canvasDataLoaded && collectionsDataLoaded) {
      $collectionsStore = collectionsDetails.collections;
      if (ccOn) {
        addCollectionsDisplay();
      }
    }
  }

  /**
   * Called when the collections on/off switch is clicked
   * Turn collections on or off and indicate a need to save
   */

  function toggleCollectionsSwitch() {
    ccOn = !ccOn;
    $collectionsStore["STATUS"] = (ccOn ? "on" : "off");
    $configStore["needToSaveCollections"] = true;
    // modify the display accordingly
    if (ccOn) {
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

    const representation = new CanvasCollectionsRepresentation({ target: div });
  }

  /**
   *  Modify the Canvas modules page by reversing what addCollectionsDisplay does
   */
  function removeCollectionsDisplay() {
    removeCollectionsRepresentation();
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
   * @function beforeUnload
   * @param event
   * @description If when leaving the page there are unsaved changes, then
   * save them and give the user a bit of a warning
   * TODO the warning is somewhat misleading (due to browser limits on what JS
   * can do) Is there a better way to do this?
   * Maybe just do the return false and not the warning?
   */
  function beforeUnload(event) {
    if ($configStore["needToSaveCollections"] && $configStore["editMode"]) {
      event.preventDefault();
      collectionsDetails.saveCollections(
        $configStore["editMode"],
        $configStore["needToSaveCollections"]
      );
      return (event.returnValue = "Are you sure you want to close?");
    }
  }
</script>

<svelte:window on:beforeunload={beforeUnload} /> 
{#if editMode && modulesPage}
  <div class="cc-switch-container">
    <div class="cc-switch-title">
      <a
        target="_blank"
        rel="noreferrer"
        href="https://djplaner.github.io/canvas-collections/"
        ><i class="icon-question cc-module-icon" /></a
      >
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
      <label class="cc-switch">
        <input
          type="checkbox"
          class="cc-toggle-checkbox"
          id="cc-switch"
          bind:checked={ccOn}
          on:click={toggleCollectionsSwitch}
        />
        <span class="cc-slider cc-round" />
      </label>
      <div class="cc-save">
        <button
          class={$configStore["needToSaveCollections"]
            ? "cc-active-save-button"
            : "cc-save-button"}
          id="cc-save-button"
          on:click={collectionsDetails.saveCollections( $configStore["editMode"], $configStore["needToSaveCollections"])}
          >Save</button
        >
        <!--  saveButtonClass = "cc-active-save-button"; -->
      </div>
    {/if}
    {#if !ccPublished}
      <div class="cc-unpublished">
        <span style="padding-top: 0.25em;padding-right:0.25em">
          <a
            id="cc-about-unpublished"
            target="_blank"
            rel="noreferrer"
            href="https://djplaner.github.io/canvas-collections/reference/on-off-unpublished/"
            ><i class="icon-question cc-module-icon" /></a
          >
          unpublished
        </span>
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
    /*padding: 1rem; */
  }
  /* The switch - the box around the slider */
  .cc-switch {
    position: relative;
    display: inline-block;
    width: 2rem;
    height: 1.2rem;
    margin-top: 0.75rem;
    margin-right: 0.5rem;
  }

  /* Hide default HTML checkbox */
  .cc-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .cc-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .cc-slider:before {
    position: absolute;
    content: "";
    height: 0.9rem;
    width: 0.9rem;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .cc-slider {
    background-color: #328c04;
  }

  input:focus + .cc-slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .cc-slider:before {
    -webkit-transform: translateX(1rem);
    -ms-transform: translateX(1rem);
    transform: translateX(1rem);
  }

  /* Rounded sliders */
  .cc-slider.cc-round {
    border-radius: 1.1rem;
  }

  .cc-slider.cc-round:before {
    border-radius: 50%;
  }

  .cc-switch-container {
    background-color: #f5f5f5;
    border: 1px solid #c7cdd1;
    color: var(--ic-brand-font-color-dark);
    display: flex;
    position: relative;
  }

  .cc-unpublished {
    font-size: 0.75em;
    background-color: #ffe08a;
    border-radius: 0.5em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    height: 2em;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-top: 0.7rem;
  }

  .cc-switch-title {
    margin: 0.5rem;
  }

  /* styles for the module configs */
  /*		    .cc-module-config {
				padding: 1em;
				font-size: smaller;
				margin:0;
			/*	font-weight: bold; */
  /*			}

		   .cc-module-no-collection {
				float:right;
				background: red;
				color:white;
				border-radius: 0.25rem;
				padding-left: 0.5rem;
				padding-right: 0.5rem;
				display:none;
		   }

		   .cc-module-config-additional-metadata {
			    margin-top: 0.5rem;
				margin-bottom: 0.5rem;
				padding-left: 0.5rem;
				padding-right: 0.5rem;
		   }



			.cc-module-config-detail {  
				display: grid; 
				grid-template-columns: 1fr 1fr; 
				grid-template-rows: 1fr; 
				gap: 0px 1em; 
				grid-auto-flow: row; 
				grid-template-areas: ". .";
				height: 100%;
			} */

  .cc-save {
    margin-top: 0.5rem;
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
    cursor: pointer;
    font-size: 65%;
    transition: background-color 0.2s ease-in-out;
  }

  /*
			.cc-active-save-button:hover {
				background: var(--ic-brand-primary);
			} */

  .cc-save-button {
    background: #f5f5f5;
    color: #2d3b45;
    border: 1px solid;
    border-color: #c7cdd1;
    border-radius: 2px;
    display: inline-block;
    position: relative;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    font-size: 65%;
    transition: background-color 0.2s ease-in-out;
  }

  .cc-save-button:hover {
    background: #cccccc;
  }
</style>
