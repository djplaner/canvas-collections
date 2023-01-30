<script lang="ts">
  import ProcessImportedCollections from "./components/ProcessImportedCollections.svelte";
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
  const AUTO_SAVE = false;
  const EXIT_SAVE = false;

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
    currentCollection: "",
    needToSaveCollections: false,
    ccOn: false,
  };

  let collectionsConfigUrl = `/courses/${$configStore["courseId"]}/pages/canvas-collections-configuration`;

  let noCollections = true;

  // track whether the intervals have been set
  // Making sure we don't get multiple intervals running
  let saveIntervalOn: boolean = false;
  let refreshIntervalOn: boolean = false;
  // whether or data canvas and collections data loaded
  let canvasDataLoaded: boolean = false;
  let collectionsDataLoaded: boolean = false;
  let allDataLoaded: boolean = false;
  let importedCollections: boolean = false;
  // the actual data objects for canvas and collections data
  let canvasDetails = null;
  let collectionsDetails = null;
  let saveInterval = null;
  let refreshCanvasDetails = null;

  let ccPublished = true;

  $: {
    if ($configStore.hasOwnProperty("migrationOutcome")) {
      completeMigration()
    }
    // recatively update the tooltip for the switch title depending on whether
    // collections is on or off
    if (noCollections) {
      HELP.switchTitle.tooltip = `${HELP.ABOUT.tooltip} <p>Click on the</p>
      <ul> <li> question mark to learn more.</li>
          <li> switch to turn Collections on.</li></ul>`;
    } else {
      HELP.switchTitle.tooltip = HELP.ABOUT.tooltip;
    }
  }
  // Whenever currentCollection is changed, save the last collection viewed
  // into local storage
  $: {
    let lastViewedCollection = $configStore["currentCollection"];
    if (allDataLoaded && !importedCollections) {
      collectionsDetails.saveLastCollectionViewed(lastViewedCollection);
    }
  }

  // Update ccOn when visibility/editmode change
  $: {
    if (allDataLoaded && !importedCollections) {
      $configStore["ccOn"] = isCollectionsOn(
        $configStore["editMode"],
        $collectionsStore["VISIBILITY"]
      );
      if (
        $configStore["ccOn"] &&
        allDataLoaded &&
        $collectionsStore["COLLECTIONS_ORDER"].length > 0
      ) {
        addCollectionsDisplay();
      } else {
        removeCollectionsDisplay();
      }
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

    /*
    if (status === "no collections config") {
      // if collectionsDetails has errors and editMode are true
      // call CollectionsDetails::initialiseConfigPage
      if ($configStore["editMode"]) {
        collectionsDetails.initialiseConfigPage();
      }
      // reset status to empty string, since we've emulated loading config
      // we can proceed as normal
      status = "";
    } */

    if (status === "") {
      noCollections = false;
      //----- Range of updates to local data based on the now retrieved collections JSON
      //ccOn = collectionsDetails.ccOn;
      //$configStore["ccOn"] = collectionsDetails.ccOn;
      $configStore["ccOn"] = isCollectionsOn(
        $configStore["editMode"],
        collectionsDetails.collections["VISIBILITY"]
      );
      ccPublished = collectionsDetails.ccPublished;

      $configStore["currentCollection"] =
        collectionsDetails.getCurrentCollection();

      if (collectionsDetails.isImportedCollection()) {
        importedCollections = true;
        /*        toastAlert(
          `<p>Collection's 
          <a href="/courses/${courseId}}/pages/canvas-collections-configuration" target="_blank" rel="noreferrer">
            configuration page</a> has been imported from
          another course.</p>
          <p>The next step will be to review and update the information for this course.</p>`,
          "warning"
        ); */
      }

      // if a student is viewing and no collections, then limit what is done
      if (!(!$configStore["ccOn"] && !$configStore["editMode"])) {
        collectionsDataLoaded = true;
        checkAllDataLoaded();
      }
    } else {
      console.log(`gotCollectionsDetails - error ${status}`);
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
      // if we've imported collections, we need to handle that first
      // - depending on what we find, it might be better to move this
      // to after the initial processing
      // - but we do probably want to wait until both canvas and collections data is loaded
      if (collectionsDetails.isImportedCollection()) {
        addProcessImportedCollections();
      } else if (!noCollections) {
        // Only do all this if able to load collections configuration, otherwise
        // leave the interface and set up as basic until user hits the switch

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
          //addCollectionsDisplay();
          // set up auto save for collections config
          if ($configStore["editMode"] && AUTO_SAVE && !saveIntervalOn) {
            saveIntervalOn = true;
            // only if we're in editMode and auto save is on
            saveInterval = setInterval(() => {
              collectionsDetails.saveCollections(
                $collectionsStore,
                $configStore["editMode"],
                $configStore["needToSaveCollections"],
                completeSaveCollections
              );
            }, TIME_BETWEEN_SAVES);
          }
          if (!refreshIntervalOn && EXIT_SAVE) {
            refreshIntervalOn = true;
            // set up auto refresh of canvasDetails
            refreshCanvasDetails = setInterval(() => {
              canvasDetails.refreshCanvasDetails(gotCanvasDetails);
            }, TIME_BETWEEN_CANVAS_REFRESH);
          }
        }
      }
      // all data is essentially loaded, however, there may be noCollections
      allDataLoaded = true;
    }
  }

  /**
   * @function addProcessImportedCollections
   * @description Detected an imported collections configuration, need to
   * - stop allDataLoaded and the normal collections configuration commencing
   * - add the ProcessImportedCollections component to div#context_modules
   * - let it do its thing
   * - figure out someway to get started again
   */
  function addProcessImportedCollections() {
    // find div#context_modules
    const contextModules = document.getElementById("context_modules");
    if (contextModules) {
      // add the ProcessImportedCollections component
      const processImportedCollections = new ProcessImportedCollections({
        target: contextModules,
        props: {
          collectionsDetails: collectionsDetails,
        },
      });
    } else {
      alert("Unable to find div#context_modules");
    }
  }

  /**
   * @function completeMigration
   * @description Called once the ProcessImportedCollection component has
   * been closed by the user with them making one of three choices
   * - proceed - update the collections configuration and set up collections
   * - cancel - do nothing
   * - refresh - empty out the collections configuration and set up collections
  */
  function completeMigration() {
    // save the outcome and remove it from configStore so this is only called once
    const outcome = $configStore["migrationOutcome"];
    $configStore["lastMigrationOutcome"]=outcome;
    delete $configStore["migrationOutcome"]

    if (outcome==="cancel") {
      alert("Ok not doing anthing")
      return
    }

    if (outcome==="refresh") {
      // TODO probably with the dialog not closing
      importedCollections = false;
      alert("Going to refresh to nothing")
      initialiseCollections();
      // TODO need to do something to refresh the page - show collections
    }

    // TODO


  }

  /**
   * @function isCollectionsOn
   * @param {boolean} editMode  - based on canvas environment
   * @param {string} visibility - collections configuration:
   *      no-one, students, teachers, all
   * @returns {boolean} - true if based on the combination of editMode and visibility
   * @description Conditions
   * - if !editMode (i.e. students)
   *   - false/true === visibility not in ["students","all"]
   * - if editMode (i.e. teacher)
   *   - false if visibility in ["no-one","students"]
   *   - true otherwise
   */

  function isCollectionsOn(editMode: boolean, visibility: string): boolean {
    if (visibility === "no-one") {
      return false;
    }

    if (!editMode) {
      // return true if visibility is either 'student' or 'all'
      return visibility === "students" || visibility === "all";
    } else {
      // return true if visibility is either 'teacher' or 'all'
      return visibility === "teachers" || visibility === "all";
    }
    // default to false
    return false;
  }

  function completeSaveCollections(status) {
    if (status) {
      $configStore["needToSaveCollections"] = false;
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
   * @function initialiseCollections
   * @description Called when there was previous noCollections configuration and
   * the user has turned the switch to on
   * - initialise the config page
   * - update the internal data
   * From this stage everything else should proceed as normal
   */

  function initialiseCollections() {
    // set up an empty collections configuration
    collectionsDetails.initialiseCollectionsConfig();
    // we now have collections
    noCollections = false;
    // and we can do the set up again
    gotCollectionsDetails("");

    collectionsDetails.saveCollections(
      $collectionsStore,
      true,
      true,
      completeInitialiseConfigPage
    );
  }

  /**
   * @function completeInitialiseConfigPage
   * @param status - boolean
   * @description Called after an attempt to save the new config page
   * Inform the user of the outcome
   */
  function completeInitialiseConfigPage(status) {
    if (status) {
      toastAlert(
        `<p>Canvas Collections is now on.</p>
        <p>A new <a target="_blank" rel="noreferrer" 
      href="/courses/${courseId}/pages/canvas-collections-configuration">
      Canvas Collections Configuration page</a> created. It will be used to store
      Collections data. </p>
      <p>The page needs to be published before students can see Collections.
      <p>Removing this page will turn collections off.</p>`,
        "success"
      );
    } else {
      toastAlert(
        `<p>Failed to create new Canvas Collections Configuration page</p>`,
        "danger"
      );
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
    if (EXIT_SAVE) {
      collectionsDetails.saveCollections(
        $collectionsStore,
        $configStore["editMode"],
        $configStore["needToSaveCollections"],
        completeSaveCollections
      );
    }
  }

  let HELP = {
    ABOUT: {
      tooltip: `<p>Use Canvas Collections to customise the modules page to better
          fit your design, by:</p>
          <ol>
             <li> Grouping modules into different collections. </li>
             <li> Using different representations for each collection. </li>
             <li> Adding more contextual information about each module. </li>
          </ol>`,
    },

    switchTitle: {
      tooltip: "",
      url: "https://djplaner.github.io/canvas-collections/",
    },
    unpublished: {
      tooltip: `<p>The <em>Canvas Collections Configuration</em> page</a> is unpublished.
        (Click the <em>unpublished</em> button to publish the page) </p> 
        <p>Meaning live Collections will <strong>not</strong> be visible in 
          "Student View" or for students.</p> 
          <p>Any Claytons Collections will be visible, if the relevant pages are published.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/visibility/",
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

{#if editMode && modulesPage && canvasDataLoaded && !importedCollections}
  <div class="cc-switch-container">
    <div class="cc-switch-title">
      <sl-tooltip>
        <div slot="content">{@html HELP.switchTitle.tooltip}</div>
        <a target="_blank" rel="noreferrer" href={HELP.switchTitle.url}
          ><i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
      {#if allDataLoaded && !noCollections}
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

    {#if noCollections}
      <label class="cc-switch" for="cc-switch">
        <sl-switch id="cc-switch" on:sl-change={initialiseCollections} />
      </label>
    {/if}
    {#if allDataLoaded && $configStore["ccOn"]}
      <div class="cc-save">
        <button
          class={$configStore["needToSaveCollections"]
            ? "cc-active-save-button"
            : "cc-save-button"}
          id="cc-save-button"
          disabled={!$configStore["needToSaveCollections"]}
          on:click={collectionsDetails.saveCollections(
            $collectionsStore,
            $configStore["editMode"],
            $configStore["needToSaveCollections"],
            completeSaveCollections
          )}>Save</button
        >
      </div>
    {/if}
    {#if !ccPublished && !noCollections}
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

  .cc-hide {
    display: none;
  }
</style>
