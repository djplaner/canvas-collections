<!--
 Copyright (C) 2023 Griffith University
 
 This file is part of Canvas Collections.
 
 Canvas Collections is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 Canvas Collections is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with Canvas Collections.  If not, see <http://www.gnu.org/licenses/>.
-->

<script lang="ts">
  /**
   * @file CanvasCollections.svelte
   * Main component for the Canvas Collections app.
   * - onMount
   *   - get Canvas and Collections information
   *   - call backs will update stores/interface
   */
  import ProcessImportedCollections from "./components/ProcessImportedCollections.svelte";
  import { collectionsStore, modulesStore, configStore } from "./stores";
  import CanvasCollectionsRepresentation from "./components/CanvasCollectionsRepresentation.svelte";
  import CollectionsConfiguration from "./components/CollectionsConfiguration.svelte";
  import { onMount, onDestroy } from "svelte";
  import { modifyCanvasModulesList } from "./components/Representations/representationSupport";
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

  import {
    editingOnController,
    EDITING_ON_STATUS,
    EDITING_ON_PAGE_NAME_SLUG,
  } from "./lib/editingOnController";

  import { ccConfirm, toastAlert } from "./lib/ui";

  import "@shoelace-style/shoelace/dist/themes/light.css";

  import "@shoelace-style/shoelace/dist/components/alert/alert.js";
  import "@shoelace-style/shoelace/dist/components/badge/badge.js";
  import "@shoelace-style/shoelace/dist/components/button/button.js";
  import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";
  import "@shoelace-style/shoelace/dist/components/color-picker/color-picker.js";
  import "@shoelace-style/shoelace/dist/components/icon/icon.js";
  import "@shoelace-style/shoelace/dist/components/tab-group/tab-group.js";
  import "@shoelace-style/shoelace/dist/components/tab/tab.js";
  import "@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js";
  import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";
  import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
  import "@shoelace-style/shoelace/dist/components/switch/switch.js";
  import "@shoelace-style/shoelace/dist/components/input/input.js";
  import "@shoelace-style/shoelace/dist/components/progress-ring/progress-ring.js";

  import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
  setBasePath("../node_modules/@shoelace-style/shoelace/dist/");

  // Define misc constants for interval timing
  // - how often to check if config needs saving (in milliseconds)
  const TIME_BETWEEN_SAVES: number = 10000;  // 10000 === 10 seconds
  // - how often to check for changes to Canvas modules data
  const TIME_BETWEEN_CANVAS_REFRESH: number = 60000; // 60 seconds
  // - how often to check for inactivity (no changes)
  // - used to turn edit off
  const TIME_BETWEEN_NO_SAVE_CHECKS: number = TIME_BETWEEN_SAVES * 60;
  // - Define time for a stale edit lock 
  //   (arises when a computer is suspended with edit on)
  const STALE_EDIT_LOCK_TIMEOUT: number = 2 * TIME_BETWEEN_NO_SAVE_CHECKS;

  // Define if to turn intervals on in the first place
  // - the save checks only run if editMode is true (teaching staff, designers)
  //   as they are the only ones who can make changes
  // - modules check run for everyone
  // - check for a need to save
  const AUTO_SAVE_BASE: boolean = true; 
  // - check for need to save before exit
  const EXIT_SAVE_BASE: boolean = true; 
  // - check for changes to Canvas modules data
  let AUTO_REFRESH: boolean = true; // regularly update Canvas course modules information
  // refresh has no base, as it should run when students using
  // change these based on being in student view
  let AUTO_SAVE: boolean = AUTO_SAVE_BASE;
  let EXIT_SAVE: boolean = EXIT_SAVE_BASE;

  // Properties set by main.ts
  export let courseId: number;
  export let editMode: boolean; // true iff user can see "student view" button
  export let csrfToken: string;
  export let modulesPage: boolean; // are we on the modules page
  export let baseApiUrl: string;

  onMount(async () => {
    // Start the process of getting info via Canvas API
    // - CanvasDetails - Canvas module info
    // - CollectionsDetails - content of the Collections configuration page
    // - Will end up respectively using callBacks gotCanvasDetails & gotCollectionDetails
    //   at the tail end of information retrieval
    // - Both will call checkAllDataLoaded, when it detects both finished, if will
    //   start everything else up
    // Will not proceed until both sets of data are successful
    if (modulesPage) {
      canvasDetails = new CanvasDetails(gotCanvasDetails, {
        courseId: courseId,
        csrfToken: csrfToken,
      });

      collectionsDetails = new CollectionsDetails(
        gotCollectionsDetails,
        {
          courseId: courseId,
          csrfToken: csrfToken,
        },
        editMode
      );
    }
  });

  // some additional set up/initialisation

  // this may need to come back?
  //  export let currentCollection: number;
  export let showConfig: boolean;

  let checked: boolean = false;

  // store when user obtained an edit lock - to check for stale locks
  let timeLockObtained: Date = undefined;

  // set up editOn controller, need current Canvas user id
  const CURRENT_USER_ID: number = parseInt(ENV["current_user_id"]);
  let editingOnHandler = new editingOnController(
    courseId,
    CURRENT_USER_ID,
    csrfToken,
    STALE_EDIT_LOCK_TIMEOUT
  );

  // Initialise some global configuration settings
  const configUpdates = {
    courseId: courseId,
    editMode: editMode, // is this staff view true or student view false
    editingOn: null,
    csrfToken: csrfToken,
    modulesPage: modulesPage, // boolean, is this the modules page? (bad name right?)
    currentCollection: "", // name of the current collection
    currentCollectionChanged: false, // has the current collection changed?
    needToSaveCollections: false,
    ccOn: false,
    studyPeriod: null, // calculated by CanvasDetails
    baseApiUrl: baseApiUrl,
  };
  // use configUpdates to update appropriate keys in configStore
  Object.keys(configUpdates).forEach((key) => {
    $configStore[key] = configUpdates[key];
  });

  $: {
    // modify save settings as we enter/leave student view
    if (!$configStore["editMode"]) {
      AUTO_SAVE = false;
      EXIT_SAVE = false;
    } else {
      AUTO_SAVE = AUTO_SAVE_BASE;
      EXIT_SAVE = EXIT_SAVE_BASE;
    }
  }

  let collectionsConfigUrl = `/courses/${$configStore["courseId"]}/pages/canvas-collections-configuration`;

  let noCollections = true;

  // track whether the intervals have been set
  // Making sure we don't get multiple intervals running
  // - save is only turned on once with editing, so set to true as if the interval has been set
  let saveIntervalOn: boolean = true;
  // - refresh is one for everyone, so start with false so it is started
  let refreshIntervalOn: boolean = false;
  // store the intervals
  let saveInterval = null;
  let refreshCanvasDetails = null;
  // track numSaves used to track when to turn Collections editing off
  let numSavesInterval = null;
  let numSaves: number = 0;
  // whether or data canvas and collections data loaded
  let canvasDataLoaded: boolean = false;
  let collectionsDataLoaded: boolean = false;
  let allDataLoaded: boolean = false;
  let importedCollections: boolean = false;
  // the actual data objects for canvas and collections data
  let canvasDetails = null;
  let collectionsDetails = null;

  let lastCanvasRefresh = Date.now();

  let ccPublished = true;

  $: {
    if ($configStore.hasOwnProperty("migrationOutcome")) {
      completeMigration();
    }
    // reactively update the tooltip for the switch title depending on whether
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
      // TODO VISIBILITY may not be there???
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
    canvasDataLoaded = true;
    // canvasDetails.courseModules is an array of Canvas module objects
    // set $modulesStore to a dict of Canvas module objects keyed on the module id
    $modulesStore = canvasDetails.courseModules;

    $configStore["studyPeriod"] = canvasDetails.studyPeriod;
    checkAllDataLoaded();
  }

  /**
   * @function gotCollectionsDetails
   * @param {string} status - undefined if working, otherwise a label for an error
   * @description Called by CollectionsDetails when the collections data
   * has been retrieved or if there were problems.  Does various checks
   * on the retrieved data and - if all is good - starts up the rest of the pipeline
   * to do any necessary updates of Collections
   */
  function gotCollectionsDetails(status: string = "") {
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
        // encourage an update of the current collection's representation
        $configStore["currentCollectionChanged"] = true;
        collectionsDataLoaded = true;
        checkAllDataLoaded();
      }
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
        // if we're a teacher
        if ($configStore["editMode"]) {
          addProcessImportedCollections();
        }
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
          addCollectionsDisplay();
          // set up auto save for collections config
          //setSaveInterval();
          if (!refreshIntervalOn && AUTO_REFRESH) {
            refreshIntervalOn = true;
            // set up auto refresh of canvasDetails
            refreshCanvasDetails = setInterval(() => {
              const millis = Date.now() - lastCanvasRefresh;
              lastCanvasRefresh = Date.now();
              canvasDetails.refreshCanvasDetails(gotCanvasDetails);
              // make sure the current collection's representation is refreshed
              $configStore["currentCollectionChanged"] = true;
            }, TIME_BETWEEN_CANVAS_REFRESH);
          }
        }
      }
      // all data is essentially loaded, however, there may be noCollections
      allDataLoaded = true;
    }
  }

  /**
   * @function setSaveInterval
   * @description Sets up an interval to check if collections needs to be saved
   * iff canvas is in editMode, AUTO_SAVE is turned on, and there isn't already
   * an interval running
   */
  function setSaveInterval() {
    if ($configStore["editMode"] && AUTO_SAVE && !saveIntervalOn) {
      // indicate we've set an interval
      saveIntervalOn = true;
      // only if we're in editMode and auto save is on
      saveInterval = setInterval(() => {
        if ($configStore["needToSaveCollections"] && $configStore["editMode"]) {
          startSaveCollections();
          /*            collectionsDetails.saveCollections(
              $collectionsStore,
              $configStore["editingOn"],
              $configStore["editMode"],
              $configStore["needToSaveCollections"],
              completeSaveCollections
            ); */
        }
      }, TIME_BETWEEN_SAVES);
    }
  }

  /**
   * @function isStaleEditLock
   * @returns {boolean} - true if the edit lock is stale
   * @description check for editLock that has exceeded time out
   * - if yes, start process of turning edit off and return true
   * - otherwise return false
   */

  function isStaleEditLock() {
    if (timeLockObtained !== undefined && $configStore["editingOn"] !== null) {
      // have an edit lock, check for a stale lock
      // A stale lock
      const now = new Date();
      const diff = now.getTime() - timeLockObtained.getTime();
      if (diff > STALE_EDIT_LOCK_TIMEOUT) {
        // immediately prevent any further editing here
        //$configStore["editingOn"] = null;

        //editingOnHandler.turnEditOff(setUpEditingOff);
        // assumption here is we don't need to actually turn edit off
        // A stale lock will be removed by other people when they start editing
        turnOffEditingInterface() 

        // yes, so release it
        toastAlert(
          `<p>Canvas Collections has released your apparently <strong>stale</strong> edit lock.</p>
              <p>It has been more than ${
                STALE_EDIT_LOCK_TIMEOUT / 1000
              } seconds since you last saved.</p>`,
          "warning"
        );
        return true;
      }
    }
    return false;
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
    // do this later
    //$configStore["lastMigrationOutcome"] = outcome;
    //delete $configStore["migrationOutcome"];

    if (outcome === "cancel") {
      return;
    }

    if (outcome === "refresh" || outcome === "proceed") {
      // need to get editing status to continue
      // setUpImport is the call back function once the handler is done
      editingOnHandler.turnEditOn(setUpImport);
    }
  }

  /**
   * @function setUpImport
   * @param editStatus
   * @param editDetails
   * @description Handler for trying to turn edit on for an import
   * Check the user's chosen outcome for import and carry that out
   */
  function setUpImport(editStatus: EDITING_ON_STATUS, editDetails: object) {
    // can only work if the user is editing
    if (editStatus !== EDITING_ON_STATUS.YOU_EDITING) {
      // didn't work let the user know
      showEditStatusWarnings(editStatus);
      return;
    }

    $configStore["editingOn"] = editStatus;

    // get the outcome
    const outcome = $configStore["migrationOutcome"];
    $configStore["lastMigrationOutcome"] = outcome;
    delete $configStore["migrationOutcome"];

    if (outcome === "refresh") {
      // TODO probably with the dialog not closing
      importedCollections = false;
      collectionsDetails.resetImport();
      initialiseCollections();
      // TODO need to do something to refresh the page - show collections
    } else if (outcome === "proceed") {
      collectionsDetails.migrateCollectionsConfiguration();
      collectionsDetails.resetImport();
      importedCollections = false;
      gotCollectionsDetails("");

      collectionsDetails.saveCollections(
        $collectionsStore,
        $configStore["editingOn"],
        true,
        true,
        completeImportCollections
      );
    }
  }

  function completeImportCollections(status) {
    if (status) {
      toastAlert(
        `<p>The import of Collection's 
        <a href="/courses/${courseId}/pages/canvas-collections-configuration" target="_blank" rel="noreferrer">
          configuration</a> has been successful.</p>`,
        "success"
      );
    }
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
    numSaves++;
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
      //$configStore["editingOn"],
      EDITING_ON_STATUS.YOU_EDITING,
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
  function completeInitialiseConfigPage(status: boolean) {
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

  function checkBeforeUnload(event: BeforeUnloadEvent) {
    const editOn: boolean =
      editingOnHandler.getEditingOnStatus() === EDITING_ON_STATUS.YOU_EDITING;
    const needToSave: boolean = $configStore["needToSaveCollections"];

    if (editOn || ($configStore["editMode"] && needToSave)) {
      if (EXIT_SAVE && needToSave && $configStore["editMode"]) {
        startSaveCollections();
        /*        collectionsDetails.saveCollections(
          $collectionsStore,
          $configStore["editingOn"],
          $configStore["editMode"],
          $configStore["needToSaveCollections"],
          completeSaveCollections
        ); */
      }

      // release editingOn lock, if necessary
      if (editOn) {
        //editingOnHandler.turnEditOff(() => { });
        editingOnHandler.turnEditOff(setUpEditingOff);
      }

      let message =
        "<p>Additional tidy up required before leaving, because</p><ol>";
      if (editOn) {
        message += "<li>You have edit on.</li>";
      }
      if (needToSave) {
        message += "<li>You have unsaved changes.</li>";
      }
      message +=
        "</ol><p>An attempt has been made to tidy up (save changes, turn edit off), but...</p>";

      toastAlert(message, "warning");

      // generate a popup warning message
      event.preventDefault();
      event.returnValue = "";
      return "";
    }
    // all good, we can continue onto Destroy
    return undefined;
  }

  /**
   * @function onDestroy
   * @description Tidy up before leaving
   * - save if necessary
   * - clear the save and refresh intervals
   * - ?? any other intervals
   * - release editingOn lock
   */
  onDestroy(() => {
    // Advise user they should save/turn edit off

    // clear some intervals
    if (saveInterval) {
      clearInterval(saveInterval);
    }
    if (refreshCanvasDetails) {
      clearInterval(refreshCanvasDetails);
    }
    if (numSavesInterval) {
      clearInterval(numSavesInterval);
    }
  });

  /**
   * @function beforeUnload
   * @param event
   * @description If when leaving the page there are unsaved changes, then
   * save them
   */
  /*  function beforeUnload(event) {
    if (
      EXIT_SAVE &&
      $configStore["needToSaveCollections"] &&
      $configStore["editMode"]
    ) {
      collectionsDetails.saveCollections(
        $collectionsStore,
        $configStore["editMode"],
        $configStore["needToSaveCollections"],
        completeSaveCollections
      );
      event.preventDefault();
    }
    // necessary for correct behaviour?
    return "...";
  } */

  /**
   * @function toggleEditingOn
   * @description Called when the user clicks the 'edit on|off' buttons
   * Click edit on
   * - use controller to see if we can edit on for this course' collections
   * - the call back setUpEditingOn will be called
   * Clicked edit off
   * - user controller to turn off edit on for collections
   * - the call back setUpEditingOff will be called
   */

  function toggleEditingOn() {
    if ($configStore["editingOn"] === null) {
      // no current setting for editingOn so try to turn editing on
      editingOnHandler.turnEditOn(setUpEditingOn);
    } else {
      // found an existing setting for it
      // try to turn editing off
      // do one final save, if still required
      if ($configStore["needToSaveCollections"]) {
        collectionsDetails.saveCollections(
          $collectionsStore,
          $configStore["editingOn"].getEditingOnStatus(),
          $configStore["editMode"],
          $configStore["needToSaveCollections"],
          completeSaveCollections
        );
        $configStore["needToSaveCollections"] = false;
      }
      editingOnHandler.turnEditOff(setUpEditingOff);
    }
  }

  /**
   * @function showEditStatusWarnings
   * @param editStatus
   * @description generate some toast explaining the results of trying to get edit mode.
   * Called by at least two different callbacks for turning editing on
   */
  function showEditStatusWarnings(editStatus: EDITING_ON_STATUS) {
    if (editStatus === EDITING_ON_STATUS.YOU_EDITING_ELSEWHERE) {
      toastAlert(
        `<div>Failed to turn editing on
          <sl-tooltip> <div slot="content">${HELP.FAILED_EDIT_ON.tooltip}</div>
            <a target="_blank" rel="noreferrer" href="${HELP.FAILED_EDIT_ON.url}">
              ❓
            </a>
        </sl-tooltip>
          </div>
  <p>You are already editing Collections for this course in another browser (or browser tab).</p>
          `,
        "danger"
      );
    } else if (editStatus === EDITING_ON_STATUS.SOMEONE_ELSE_EDITING) {
      toastAlert(
        `<div>Failed to turn editing on
          <sl-tooltip> <div slot="content">${HELP.FAILED_EDIT_ON.tooltip}</div>
            <a target="_blank" rel="noreferrer" href="${HELP.FAILED_EDIT_ON.url}">
              ❓
            </a>
        </sl-tooltip>
        <p>Someone else is editing Collections</p>`,
        "danger"
      );
    } else if (editStatus === EDITING_ON_STATUS.NO_ONE_EDITING) {
      toastAlert(
        `<div>Failed to turn editing on
          <sl-tooltip> <div slot="content">${HELP.FAILED_EDIT_ON.tooltip}</div>
            <a target="_blank" rel="noreferrer" href="${HELP.FAILED_EDIT_ON.url}">
              ❓
            </a>
        </sl-tooltip>
        <p>Unknown reason - but apparently no-one else is editing.</p>`,
        "danger"
      );
    }
  }

  /**
   * @function setUpEditingOn
   * @param editStatus
   * @param editDetails
   * @description Call back from attempt to turn editing
   * - if the editStatus is YOU_EDITING then we can turn editing on
   * - otherwise display some message to the user
   */
  function setUpEditingOn(editStatus: EDITING_ON_STATUS, editDetails: object) {
    if (editStatus !== EDITING_ON_STATUS.YOU_EDITING) {
      // didn't work let the user know
      showEditStatusWarnings(editStatus);
      return;
    }

    timeLockObtained = new Date();
    // first step in turning edit on is to refresh the CollectionsDetails
    // on completion will call turnEditingOn
    collectionsDataLoaded = false;
    collectionsDetails = new CollectionsDetails(
      turnEditingOn,
      {
        courseId: $configStore["courseId"],
        csrfToken: $configStore["csrfToken"],
      },
      true
    );
  }

  /**
   * @function turnEditingOn
   * @param status - empty if successful
   *
   */

  function turnEditingOn(status: string = "") {
    if (status !== "") {
      const reasons = {
        noCollectionsConfig: "Collections configuration page not found.",
        noBodyInConfig: "No body found in Collections configuration page",
        unauthorised: "Not authorised to open configuration page",
      };
      // oops that didn't work
      toastAlert(
        `<p>Failed to update Collections configuration</p>
        <p>Reason: <em>${reasons[status]}</em> </p>`,
        "danger"
      );
      return;
    }

    // ?? to refresh??
    gotCollectionsDetails(status);

    collectionsDataLoaded = true;

    // should be right to turn editing on
    numSaves = 0;
    //$configStore["editingOn"] = editingOnHandler.getEditingDetails();
    $configStore["editingOn"] = editingOnHandler.getEditingOnStatus();

    // only do this if # collections > 0 && currentCollection defined

    if (
      $collectionsStore.hasOwnProperty("COLLECTIONS_ORDER") &&
      $collectionsStore["COLLECTIONS_ORDER"].length > 0 &&
      $configStore["currentCollection"] !== ""
    ) {
      modifyCanvasModulesList(
        $configStore["currentCollection"],
        $collectionsStore["COLLECTIONS"][$configStore["currentCollection"]][
          "unallocated"
        ]
      );
    }

    setNumSavesInterval();
    // turn on save interval
    saveIntervalOn = false;
    setSaveInterval();
  }

  /**
   * @function setUpEditingOff
   * @param editStatus
   * @param editDetails
   * @description Call back from attempt to turn editing off
   * - Successful "editingOff" should have editStatus be anything other than YOU_EDITING
   * - If not successful,
   *   - and still YOU_EDITING, then message user suggesting deleting the the editing page
   *   - and someone else editing then just turn it off
   */

  function setUpEditingOff(editStatus: EDITING_ON_STATUS, editDetails: object) {
    if (editStatus === EDITING_ON_STATUS.YOU_EDITING) {
      toastAlert(
        `<p>Failed to turn editing off</p>
        <p>To allow others to edit, please try:</p>
        <ol>
            <li> to turn editing off again; or, </li>
            <li> to manually delete 
              <a href="/courses/${$configStore["courseId"]}/pages/${EDITING_ON_PAGE_NAME_SLUG}">
              the Collections edit status page</a>.<li>
        </ol>`,
        "danger"
      );
      return;
    } else {
      // any other option means that this session turned editing off
      turnOffEditingInterface();
    }
  }

  /**
   * @function turnOffEditingInterface
   * @description time to update the Collections interface and intervals to
   * indicate the editing is now off
   */

  function turnOffEditingInterface() {
    timeLockObtained = undefined;
    $configStore["editingOn"] = null;
    showConfig = false;
    removeModuleConfiguration($collectionsStore["MODULES"]);
    clearInterval(numSavesInterval);
    // turn off save interval
    saveIntervalOn = true;
    clearInterval(saveInterval);
  }

  /**
   * @function setNumSavesInterval
   * @description Set the interval to check if there have been any saves
   * - reset numSaves
   * - If there haven't been any saves since the last check turn off editing
   */
  function setNumSavesInterval() {
    numSavesInterval = setInterval(() => {
      if (numSaves === 0 && $configStore["editingOn"] !== null) {
        $configStore["editingOn"] = null;

        // ask if we should  turn off editing due to lack of activity
        toastAlert(
          "<p>Turning editing off due to lack of activity.</p>",
          "warning"
        );
        editingOnHandler.turnEditOff(setUpEditingOff);
      }
      numSaves = 0;
    }, TIME_BETWEEN_NO_SAVE_CHECKS);
  }

  /**
   * @function startSaveCollections
   * @description When visitor clicks on save button
   * - check if we've a stale edit lock - handle that if necessary
   * - otherwise start the save process
   */

  function startSaveCollections() {
    if (!isStaleEditLock()) {
      collectionsDetails.saveCollections(
        $collectionsStore,
        $configStore["editingOn"],
        $configStore["editMode"],
        $configStore["needToSaveCollections"],
        completeSaveCollections
      );
    } 
  }

  let HELP = {
    ABOUT: {
      tooltip: `<p>Use Canvas Collections to add more structure, visuals, and context to the modules page. Click to find out more.`,
    },
    editOn: {
      tooltip: `<p>Editing Collections is <strong>off</strong>.</p>
      <p>Click this button to turn editing on. Only if no-one else (including you in another
        browser window) is already editing this course's Collections configuration.</p>
      `,
    },
    FAILED_EDIT_ON : {
      tooltip: `<p>Learn more about why and what can be done.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/problems/failed-to-turn-editing-on/",
    },
    editOff: {
      tooltip: `<p>Editing Collections is <strong>on</strong>.</p>
      <p>Click this button to turn editing off and allow other people to edit.</p>`,
    },
    studentVisible: {
      tooltip: `<p>Students can see Collections.</p>
      <p>To change, turn <em>edit on</em>; click the <i class="icon-mini-arrow-right"></i> 
        icon to the right: and, use the <em>visibility</em> dropdown.</p>`,
    },
    studentInvisible: {
      tooltip: `<p>Students <strong>cannot</strong> see Collections.</p>
      <p>To change:</p>
      <ol>
        <li> turn <em>Edit On</em> </li>
        <li> click the <i class="icon-mini-arrow-right"></i> icon to the right </li>
        <li> use the <em>visibility</em> dropdown to select <em>students</em> or <em>all</em>.</li></ol>`,
    },
    nooneVisible: {
      tooltip: `<p>Collections is turned <strong>off</strong>.</p><p> No-one is able to see Collections.</p>
      <p>To change, turn <em>Edit on</em>; click the <i class="icon-mini-arrow-right"></i> 
        icon to the right and use the <em>visibility</em> dropdown.</p>`,
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
      url: "https://djplaner.github.io/canvas-collections/reference/lifecycle/visibility/live/",
    },
  };
  HELP.ABOUT["notEditingTooltip"] = `${HELP.ABOUT.tooltip}
      <p>Editing mode is <strong>off</strong>. You can see Collections, but not change it.</p>
      <p>Hit the <em>Edit</em> button to turn editing mode on.</p>
      `;
</script>

<svelte:window on:beforeunload={checkBeforeUnload} />

{#if editMode && modulesPage && canvasDataLoaded && !importedCollections}
  <div class="cc-switch-container">
    <div class="cc-switch-title">
      <sl-tooltip>
        {#if $configStore["editingOn"] === null && !noCollections}
          <div slot="content">{@html HELP.ABOUT.notEditingTooltip}</div>
        {:else}
          <div slot="content">{@html HELP.ABOUT.tooltip}</div>
        {/if}
        <!--        <div slot="content">{@html HELP.switchTitle.tooltip}</div> -->
        <a target="_blank" rel="noreferrer" href={HELP.switchTitle.url}
          ><i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
      {#if allDataLoaded && !noCollections && $configStore["editingOn"] !== null}
        <i
          id="configShowSwitch"
          class="{showConfig
            ? 'icon-mini-arrow-down'
            : 'icon-mini-arrow-right'} cc-module-icon"
          on:click={toggleConfigShow}
          on:keydown={toggleConfigShow}
        />
      {/if}
      <!-- only show publish/unpublish indicator if collections is on -->
      {#if !noCollections}
        {#if isCollectionsOn(false, $collectionsStore["VISIBILITY"])}
          <sl-tooltip>
            <div slot="content">{@html HELP.studentVisible.tooltip}</div>
            <i class="icon-Solid icon-publish" />
          </sl-tooltip>
        {:else}
          <sl-tooltip>
            {#if $collectionsStore["VISIBILITY"] === "no-one"}
              <div slot="content">{@html HELP.nooneVisible.tooltip}</div>
              <i class="icon-unpublish cc-no-one" />
            {:else}
              <div slot="content">{@html HELP.studentInvisible.tooltip}</div>
              <i class="icon-unpublish" />
            {/if}
          </sl-tooltip>
        {/if}
      {/if}
      <small>Collections</small>
    </div>

    {#if noCollections}
      <label class="cc-switch" for="cc-switch">
        <sl-switch id="cc-switch" on:sl-change={initialiseCollections} />
      </label>
    {/if}
    {#if $configStore["editingOn"] === null && !noCollections}
      <div class="cc-save">
        <sl-tooltip class="cc-button-hover">
          <div slot="content">{@html HELP.editOn.tooltip}</div>
          <button
            id="cc-editing-on-button"
            on:click|stopPropagation={toggleEditingOn}>Edit On</button
          >
        </sl-tooltip>
      </div>
    {/if}
    {#if allDataLoaded && $configStore["editMode"] && $configStore["editingOn"] !== null}
      <div class="cc-save">
        <sl-tooltip class="cc-button-hover">
          <div slot="content">{@html HELP.editOff.tooltip}</div>
          <button id="cc-editing-on-button" on:click={toggleEditingOn}
            >Edit Off</button
          >
        </sl-tooltip>
        <button
          class={$configStore["needToSaveCollections"]
            ? "cc-active-save-button"
            : "cc-save-button"}
          id="cc-save-button"
          disabled={!$configStore["needToSaveCollections"]}
          on:click={startSaveCollections}>Save</button
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

  .cc-save-button,
  #cc-editing-on-button {
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

  i.icon-publish {
    color: #0b874b;
  }

  .cc-no-one {
    color: #ff0000;
  }

  .cc-button-hover {
    --show-delay: 3000;
  }
</style>
