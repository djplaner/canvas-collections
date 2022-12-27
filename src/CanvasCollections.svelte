<script lang="ts">
  import { onMount } from "svelte";
  //	import { requestCourseObject } from './lib/CanvasSetup';
  import { CanvasDetails } from "./lib/CanvasDetails";
  import { CollectionsDetails } from "./lib/CollectionsDetails";

  const CC_VERSION = "0.9.10";
  let COURSE_OBJECT = null;

  export let courseId: number;
  export let editMode: boolean;
  export let csrfToken: string;
  export let modulesPage: boolean;

  // whether or data canvas and collections data loaded
  let canvasDataLoaded = false;
  let collectionsDataLoaded = false;
  // the actual data objects for canvas and collections data
  let canvasDetails = null;
  let collectionsDetails = null;

  let ccOn = false;
  // indicate whether changes made to collections data
  let needToSaveCollections = false;
  let saveButtonClass = "cc-save-button";

  /**
   * Callback function for when canvasDetails is loaded
   */
  function gotCanvasDetails() {
    console.log("XXXXXXXXXXXXXXX getCanvasDetails");
    console.log(canvasDetails);
    canvasDataLoaded = true;
    checkAllDataLoaded();
  }

  /**
   * Callback function for when collectionsDetails is loaded
   */
  function gotCollectionsDetails() {
    console.log("YYYYYYYY gotCollectionsDetails");
    console.log(collectionsDetails);
    ccOn = collectionsDetails.ccOn;
    collectionsDataLoaded = true;
    checkAllDataLoaded();
  }

  function checkAllDataLoaded() {
    if (canvasDataLoaded && collectionsDataLoaded) {
      if (ccOn) {
        addCollectionsDisplay();
      }
    }
  }

  /**
   * Called whenever collectionsDetails is modified indicating
   * a need to eventually do a save
   */

  function collectionsModified() {
    needToSaveCollections = true;
    saveButtonClass = "cc-active-save-button";
  }

  /**
   * Called when the collections on/off switch is clicked
   * Turn collections on or off and indicate a need to save
   */

  function toggleCollectionsSwitch() {
    collectionsDetails.ccOn = !ccOn;
    console.log(
      `toggleCollectionsSwitch from ${ccOn} to ${collectionsDetails.ccOn}`
    );
    ccOn = collectionsDetails.ccOn;
    collectionsModified();
    // modify the display accordingly
    if (ccOn) {
      addCollectionsDisplay();
    } else {
      removeCollectionsDisplay();
    }
  }

  /**
   * Modify the canvas modules page by
   * - Adding <CanvasCollectionsRepresentation> at top of div#context_modules
   * - Add a <CollectionsModuleConfiguration> for each canvas module belonging to
   *   the currently visible collection
   * - hiding modules not part of the current visible collection
   */
  function addCollectionsDisplay() {
    alert("addCollectionsDisplay");

    // check that there isn't already a div#canvas-collections-representation
    // if there is, do nothing
    const representation = document.querySelector(
      "div#canvas-collections-representation"
    );
    if (representation) {
      throw new Error(
        "addCollectionsDisplay: div#canvas-collections-representation already exists"
      );
    }

    // get the div#context-modules
    const contextModules = document.querySelector("div#context_modules");
    if (!contextModules) {
      throw new Error("addCollectionsDisplay: div#context-modules not found");
    }
    // add a div#canvas-collections-representation as first child of div#context-modules
    const canvasCollectionsRepresentation = document.createElement("div");
    canvasCollectionsRepresentation.id = "canvas-collections-representation";
    canvasCollectionsRepresentation.innerHTML = "<h1>Canvas Collections</h1>";
    contextModules.prepend(canvasCollectionsRepresentation);
  }

  /**
   *  Modify the Canvas modules page by reversing what addCollectionsDisplay does
   */
  function removeCollectionsDisplay() {
    alert("removeCollectionsDisplay");
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
</script>

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
        <i id="configShowSwitch" class="icon-mini-arrow-right" />
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
        <button class={saveButtonClass} id="cc-save-button">Save</button>
      </div>
    {/if}
  </div>
{/if}

<style>
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
    display: flex;
    font-size: 0.75em;
    background-color: #ffe08a;
    align-items: center;
    border-radius: 0.5em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    height: 2em;
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
