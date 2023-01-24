<script lang="ts">
  /**
   * Implement configuration interface for an individual collection
   */

  import {
    collectionsStore,
    configStore,
    representationsStore,
  } from "../../stores";
  import { updatePageController } from "../../lib/updatePageController";
//  import { moduleLabelApplicator}  from "../../lib/moduleLabelApplicator";
  import { getCollectionCanvasModules } from "../Representations/representationSupport";
  import { getPageName } from "../../lib/CanvasSetup";
  import { toastAlert, ccConfirm } from "../../lib/ui";

  export let collectionName: string;
  export let order: Number;
  export let numCollections: Number;

  import { debug } from "../../lib/debug";

  debug(
    `__________________ CollectionConfiguration.svelte __collection ${collectionName} order ${order} numCollections ${numCollections}_______________`
  );

  // Assume inclduePage and outputPage exist
  let includePageExists = {},
    outputPageExists = {};
  let includePageName = {},
    outputPageName = {};
  // loop through each collection
  Object.keys($collectionsStore["COLLECTIONS"]).forEach((collectionName) => {
    includePageExists[collectionName] = true;
    outputPageExists[collectionName] = true;

    ["includePage", "outputPage"].forEach((pageType) => {
      if (
        !$collectionsStore["COLLECTIONS"][collectionName].hasOwnProperty(
          pageType
        )
      ) {
        $collectionsStore["COLLECTIONS"][collectionName][pageType] = "";
      }
    });

    includePageName[collectionName] =
      $collectionsStore["COLLECTIONS"][collectionName].includePage;
    outputPageName[collectionName] =
      $collectionsStore["COLLECTIONS"][collectionName].outputPage;
  });

  getPageName(
    $collectionsStore["COLLECTIONS"][collectionName].includePage,
    $configStore["courseId"],
    doesIncludePageExist
  );
  getPageName(
    $collectionsStore["COLLECTIONS"][collectionName].outputPage,
    $configStore["courseId"],
    doesOutputPageExist
  );

  const modules = getCollectionCanvasModules(collectionName);
  let moduleCount = modules.length;
  let moduleName = moduleCount === 1 ? "module" : "modules";

  debug($representationsStore);

  let availableRepresentations = Object.getOwnPropertyNames(
    $representationsStore
  );

  debug($collectionsStore["COLLECTIONS"]);

  //  let defaultCollection = false
  //  $: defaultCollection = $collectionsStore["DEFAULT_COLLECTION"] === collectionName

  function changeDefaultCollection(event) {
    // TODO
    // - but only if not already the default collection - maybe stopPropagation
    // - also check to see if it's already hidden
    // - also check existing status?

    if (!event.srcElement.checked) {
      event.preventDefault();
      toastAlert(
        `<p>There must always be a default collection. 
        Change the default collection by selecting another collection as the new default.</p>`,
        "warning"
      );
      return false;
    }
    $configStore["needToSaveCollections"] = true;
    $collectionsStore["DEFAULT_ACTIVE_COLLECTION"] = collectionName;
  }

  /**
   * @function moveCollectionUp
   * @description Move the collection earlier in the order by re-arranging
   * the collections order array
   */
  function moveCollectionUp() {
    // get the index of collectionName in $collectionsStore['COLLECTIONS_ORDER']
    let index = $collectionsStore["COLLECTIONS_ORDER"].indexOf(collectionName);
    // remove collectionName
    $collectionsStore["COLLECTIONS_ORDER"].splice(index, 1);
    // insert collectionName at index - 1
    $collectionsStore["COLLECTIONS_ORDER"].splice(index - 1, 0, collectionName);
    $collectionsStore["COLLECTIONS_ORDER"] =
      $collectionsStore["COLLECTIONS_ORDER"];
    $collectionsStore["DEFAULT_ACTIVE_COLLECTION"] = collectionName;
  }

  /**
   * @function moveCollectionDown
   * @description Move the collection later in the order by re-arranging
   * the collections order array
   */
  function moveCollectionDown() {
    // get the index of collectionName in $collectionsStore['COLLECTIONS_ORDER']
    let index = $collectionsStore["COLLECTIONS_ORDER"].indexOf(collectionName);
    // remove collectionName
    $collectionsStore["COLLECTIONS_ORDER"].splice(index, 1);
    // insert collectionName at index + 1
    $collectionsStore["COLLECTIONS_ORDER"].splice(index + 1, 0, collectionName);
    $collectionsStore["COLLECTIONS_ORDER"] =
      $collectionsStore["COLLECTIONS_ORDER"];
    $collectionsStore["DEFAULT_ACTIVE_COLLECTION"] = collectionName;
  }

  /**
   * @function deleteCollection
   * @description Delete the collection by
   * 1. Generating an alert to check user really wants to remove it
   * 2. Remove the collection from $collectionsStore["COLLECTIONS"]
   * 3. Remove the collection from $collectionsStore["COLLECTIONS_ORDER"]
   * 4. If currently the DEFAULT_ACTIVE_COLLECTION Change the DEFAULT_ACTIVE_COLLECTION to the first collection left
   * 5. Set the collection attribute for all modules in the collection to "none"
   */

  function deleteCollection() {
    // confirm that they actually want to delete the collection
    ccConfirm(
      `<p>Are you sure you want to delete the collection <em>${collectionName}</em>?</p>`
    ).then((ok) => {
      if (ok) {
        // remove the collection from $collectionsStore["COLLECTIONS_ORDER"]
        let index =
          $collectionsStore["COLLECTIONS_ORDER"].indexOf(collectionName);
        $collectionsStore["COLLECTIONS_ORDER"].splice(index, 1);
        $collectionsStore["COLLECTIONS_ORDER"] =
          $collectionsStore["COLLECTIONS_ORDER"];

        // if currently the DEFAULT_ACTIVE_COLLECTION Change the DEFAULT_ACTIVE_COLLECTION to the first collection left
        if ($collectionsStore["DEFAULT_ACTIVE_COLLECTION"] === collectionName) {
          $collectionsStore["DEFAULT_ACTIVE_COLLECTION"] =
            $collectionsStore["COLLECTIONS_ORDER"][0];
        }

        // change the currentCollection
        if ($configStore["currentCollection"] === collectionName) {
          $configStore["currentCollection"] =
            $collectionsStore["DEFAULT_ACTIVE_COLLECTION"];
        }
        // set the collection attribute for all modules in the collection to "none"
        for (const moduleId in $collectionsStore["MODULES"]) {
          if (
            $collectionsStore["MODULES"][moduleId].collection === collectionName
          ) {
            $collectionsStore["MODULES"][moduleId].collection = null;
          }
        }
        // remove the collection from $collectionsStore["COLLECTIONS"]
        delete $collectionsStore["COLLECTIONS"][collectionName];
        //$collectionsStore = $collectionsStore;
        // TODO is this really needed?
        //$collectionsStore["DEFAULT_ACTIVE_COLLECTION"] = collectionName;
      }
    });
  }

  /**
   * @function changeCollectionName
   * @description Called when a collection name has been changed, need to
   * 1. Generating an alert to check user really wants to change the name
   * 2. Remove the collection from $collectionsStore["COLLECTIONS"]
   * 3. Remove the collection from $collectionsStore["COLLECTIONS_ORDER"]
   * 4. If currently the DEFAULT_ACTIVE_COLLECTION Change the DEFAULT_ACTIVE_COLLECTION to the first collection left
   * 5. Set the collection attribute for all modules in the collection to "none"
   *
   */

  function changeCollectionName(event) {
    const newCollectionName = event.target.value;
    // confirm that they actually want to delete the collection
    ccConfirm(
      `<p>Are you sure you want to change the collection's name from 
          <em>${collectionName}</em> to <em>${newCollectionName}</em></p>`
    ).then((ok) => {
      if (!ok) {
        event.target.value = collectionName;
      } else {
        // modify collectionName in array $collectionsStore["COLLECTIONS_ORDER"] to newCollectionName
        let index =
          $collectionsStore["COLLECTIONS_ORDER"].indexOf(collectionName);
        $collectionsStore["COLLECTIONS_ORDER"][index] = newCollectionName;

        // if currently the DEFAULT_ACTIVE_COLLECTION Change the DEFAULT_ACTIVE_COLLECTION to the first collection left
        if ($collectionsStore["DEFAULT_ACTIVE_COLLECTION"] === collectionName) {
          $collectionsStore["DEFAULT_ACTIVE_COLLECTION"] = newCollectionName;
        }

        // change the currentCollection
        if ($configStore["currentCollection"] === collectionName) {
          $configStore["currentCollection"] =
            $collectionsStore["DEFAULT_ACTIVE_COLLECTION"];
        }
        // set the collection attribute for all modules in the collection to newCollectionName
        for (const moduleId in $collectionsStore["MODULES"]) {
          if (
            $collectionsStore["MODULES"][moduleId].collection === collectionName
          ) {
            $collectionsStore["MODULES"][moduleId].collection =
              newCollectionName;
          }
        }
        // rename the collectionName key in $collectionsStore["COLLECTIONS"] to newCollectionName
        $collectionsStore["COLLECTIONS"][newCollectionName] =
          $collectionsStore["COLLECTIONS"][collectionName];
        delete $collectionsStore["COLLECTIONS"][collectionName];
        $configStore["needToSaveCollections"] = true;
      }
    });
  }

  /**
   * @function doesIncludePageExists
   * @param pageName - name of the page to tried to retrive
   * @param msg - message back from canvas API { status: res: body }
   * @description Call back after trying to get the page object for an include
   * page
   * If not turn give an alert
   */
  function doesIncludePageExist(pageName, msg) {
    const pageObject = msg.body;

    includePageName[collectionName] = pageName;

    if (!pageObject) {
      toastAlert(
        `<p>Unable to retrieve the include page</p>
<p style="margin-left: 1em">${pageName}</p>
<p>for the collection</p>
<p style="margin-left: 1em">${collectionName}</p>`,
        "danger",
        3000
      );
      includePageExists[collectionName] = false;
    } else {
      includePageExists[collectionName] = true;
    }
  }

  /**
   * @function doesOutputPageExists
   * @param pageName
   * @param msg
   * @description Called after Canvas API call returns a page Object. Set
   * outputPageExists and other variables appropriately
   * No alerts for this (unlike include page) because if the output page
   * doesn't exist it will be created
   */
  function doesOutputPageExist(pageName, msg) {
    const pageObject = msg.body;
    outputPageName[collectionName] = pageName;
    if (!pageObject) {
      outputPageExists[collectionName] = false;
    } else {
      outputPageExists[collectionName] = true;
    }
  }

  /**
   * @function updateOutputPage
   * @param outputPageName
   * @param collectionName
   * @description Should update the specified Canvas page with the representation
   * of a specific collection
   */
  function updateOutputPage(collectionName) {
    const updateController = new updatePageController(
      collectionName
    );

    updateController.execute();
  }

  /**
   * @function applyModuleLabels
   * @param collectionName
   * @description Call the moduleLabelApplicator to update the names for
   * all Canvas modules in the collection based on their labels
   * 
   * TODO on hold for version 1 for revision about if/how it might be more
   * useful
   */
/*  function applyModuleLabels(collectionName : string) {
    const labelApplicator = new moduleLabelApplicator(collectionName);
    labelApplicator.execute();
  } */

  const HELP = {
    configName: {
      tooltip: `A collection's name will be used to navigate between collections`,
      url: "https://djplaner.github.io/canvas-collections/getting-started/configure/collections/#collection-properties",
    },
    configRepresentation: {
      tooltip: `Specify how the collection will be displayed by choosing one of the available representations. Representations can be changed at any time.`,
      url: "https://djplaner.github.io/canvas-collections/reference/representations/overview/",
    },
    configDefault: {
      tooltip: `The default collection will be the first people see when the visit for the first time.`,
      url: "https://djplaner.github.io/canvas-collections/getting-started/configure/collections/#collection-properties",
    },
    configHide: {
      tooltip: `<p>Make collection invisible to students. 
		(Note: can't hide the default collection)</p>
		<p><i class="icon-warning"></i> Also unpublish all the collection's modules to be ensure they are hidden.`,
      url: "https://djplaner.github.io/canvas-collections/getting-started/configure/collections/#collection-properties",
    },
    configUnallocated: {
      tooltip: `<p>When students view this collection, include modules not allocated to any collection.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#hide-a-collection",
    },
    configIncludePage: {
      tooltip: `Specify the name of an existing Canvas page and the content of that page
		will be displayed before the current collection's representation 
		(it is <strong>included</strong>)`,
      url: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#include-page",
    },
    configIncludePageAfter: {
      tooltip: `<p>By default, include page contents placed <em>before</em> the collection. When selected
		will place the include page contents <em>after</em> the collection.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#include-page",
    },
    configOutputPage: {
      tooltip: `Update the <em>output page</em> with the collection's current representation.
		<p><strong>Note:</strong> This is how you can use Collections with students without it being
		installed by your institution.</p>
		`,
      url: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#output-page",
    },
    configApplyLabels: {
      tooltip: `<p>🚧🧪☠️ <strong>Warning:</strong> This feature is experimental, under construction, and
		potentially destructive. Only use as suggested and if you're certain.</p>
		<p>Modify the names of Canvas modules by apply the Collection's label/number</p>
		`,
      url: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#apply-module-labels",
    },
  };
</script>

<!-- {#if !removed} -->
<div
  class="cc-existing-collection border border-trbl"
  id="cc-collection-{collectionName}"
>
  <p>
    {collectionName} - ({moduleCount}
    {moduleName})
    <span class="cc-collection-move">
      {#if order > 0}
        <i
          on:click={moveCollectionUp}
          on:keydown={moveCollectionUp}
          class="icon-arrow-up cc-move-collection"
          id="cc-collection-${collectionName}-up"
        />
      {/if}
      {#if order < numCollections - 1}
        <i
          on:click={moveCollectionDown}
          on:keydown={moveCollectionDown}
          class="icon-arrow-down cc-move-collection"
          id="cc-collection-${collectionName}-down"
        />
      {/if}
      <i
        on:click={deleteCollection}
        on:keydown={deleteCollection}
        class="icon-trash cc-delete-collection"
        id="cc-collection-${collectionName}-delete"
      />
    </span>
  </p>

  <!-- modify the collection's name 
	  TODO - on change function to do the required modifications
-->

  <div class="cc-collection-form">
    <span class="cc-collection-label">
      <label for="cc-collection-{collectionName}-collectionName">Name</label>
      <sl-tooltip>
        <div slot="content">{@html HELP.configName.tooltip}</div>
        <a href={HELP.configName.url} rel="noreferrer" target="_blank">
          <i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
    </span>
    <span class="cc-collection-input">
      <input
        type="text"
        id="cc-collection-{collectionName}-collectionName"
        value={collectionName}
        on:change={changeCollectionName}
      />
    </span>
  </div>

  <div class="cc-collection-form">
    <span class="cc-collection-label">
      <label for="cc-collection-{collectionName}-representation"
        >Representation</label
      >
      <sl-tooltip>
        <div slot="content">
          {@html HELP.configRepresentation.tooltip}
        </div>
        <a
          href={HELP.configRepresentation.url}
          rel="noreferrer"
          target="_blank"
        >
          <i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
    </span>
    <span class="cc-collection-input">
      <select
        id="cc-collection-{collectionName}-representation"
        class="cc-collection-representation"
        bind:value={$collectionsStore["COLLECTIONS"][collectionName][
          "representation"
        ]}
        on:change={() => ($configStore["needToSaveCollections"] = true)}
      >
        >
        {#each availableRepresentations as representation}
          <option value={representation}>{representation}</option>
        {/each}
      </select>
    </span>
  </div>

  <div class="cc-collection-double">
    <div>
      <label for="cc-config-collection-{collectionName}-default">
        Default
      </label>
      <sl-tooltip>
        <div slot="content">
          {@html HELP.configDefault.tooltip}
        </div>
        <a href={HELP.configDefault.url} target="_blank" rel="noreferrer">
          <i class="icon-question cc-module-icon" />
        </a>
      </sl-tooltip>
      <input
        type="checkbox"
        id="cc-config-collection-{collectionName}-default"
        checked={$collectionsStore["DEFAULT_ACTIVE_COLLECTION"] ===
          collectionName}
        on:click={changeDefaultCollection}
      />
    </div>
    <div class="cc-collection-double-center">
      <label for="cc-config-collection-{collectionName}-hide"> Hide </label>
      <sl-tooltip>
        <div slot="content">
          {@html HELP.configHide.tooltip}
        </div>
        <a target="_blank" href={HELP.configHide.url} rel="noreferrer">
          <i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
      <input
        type="checkbox"
        class="cc-config-collection-hide"
        bind:checked={$collectionsStore["COLLECTIONS"][collectionName]["hide"]}
        disabled={$collectionsStore["DEFAULT_ACTIVE_COLLECTION"] ===
          collectionName}
        on:change={() => ($configStore["needToSaveCollections"] = true)}
      />
    </div>
    <div>
      <label for="cc-config-collection-{collectionName}-unallocated">
        Add unallocated
      </label>
      <sl-tooltip>
        <div slot="content">
          {@html HELP.configUnallocated.tooltip}
        </div>
        <a href={HELP.configUnallocated.url} target="_blank" rel="noreferrer">
          <i class="icon-question cc-module-icon" />
        </a>
      </sl-tooltip>
      <input
        type="checkbox"
        id="cc-config-collection-{collectionName}-unallocated"
        bind:checked={$collectionsStore["COLLECTIONS"][collectionName][
          "unallocated"
        ]}
        on:change={() => ($configStore["needToSaveCollections"] = true)}
      />
      <!--
        checked={$collectionsStore["DEFAULT_ACTIVE_COLLECTION"] ===
          collectionName}
        on:click={changeDefaultCollection}
      />
        -->
    </div>
  </div>

  <!-- include page -->

  <div class="cc-collection-two-line">
    <div class="cc-collection-two-line-header">
      <label for="cc-collection-{collectionName}-include-page"
        >Include page</label
      >
      <sl-tooltip>
        <div slot="content">
          {@html HELP.configIncludePage.tooltip}
        </div>
        <a
          id="cc-about-include-page"
          rel="noreferrer"
          target="_blank"
          href={HELP.configIncludePage.url}
          ><i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
    </div>
    <div>&nbsp;</div>
    <div class="cc-collection-two-line-body">
      <input
        id="cc-collection-{collectionName}-include-page"
        bind:value={$collectionsStore["COLLECTIONS"][collectionName]
          .includePage}
        on:click={() => ($configStore["needToSaveCollections"] = true)}
        on:keydown={() => ($configStore["needToSaveCollections"] = true)}
        on:focusout={() => {
          includePageExists[collectionName] = true;
          getPageName(
            $collectionsStore["COLLECTIONS"][collectionName].includePage,
            $configStore["courseId"],
            doesIncludePageExist
          );
        }}
      />

      <span class="cc-collection-label">
        <label for="cc-config-collection-{collectionName}-include-after">
          After?
        </label>
        <sl-tooltip>
          <div slot="content">
            {@html HELP.configIncludePageAfter.tooltip}
          </div>
          <a
            id="cc-about-include-after"
            href={HELP.configIncludePageAfter.url}
            target="_blank"
            rel="noreferrer"
          >
            <i class="icon-question cc-module-icon" />
          </a>
        </sl-tooltip>
        <input
          type="checkbox"
          id="cc-config-collection-{collectionName}-include-after"
          class="cc-config-collection-include-after"
          on:click={() => ($configStore["needToSaveCollections"] = true)}
          on:keydown={() => ($configStore["needToSaveCollections"] = true)}
          bind:checked={$collectionsStore["COLLECTIONS"][collectionName]
            .includeAfter}
        />
      </span>
    </div>
    {#if !includePageExists[collectionName] && includePageName[collectionName]}
      <div class="cc-collection-two-line-error">
        Page <strong>{includePageName[collectionName]}</strong> does not exist
      </div>
    {/if}
  </div>
  <!-- output page -->
  <div class="cc-collection-two-line">
    <div class="cc-collection-two-line-header">
      <label for="cc-collection-{collectionName}-output-page">
        Output page
      </label>
      <sl-tooltip>
        <div slot="content">
          {@html HELP.configOutputPage.tooltip}
        </div>
        <a
          id="cc-about-update-output-page"
          target="_blank"
          href={HELP.configOutputPage.url}
          rel="noreferrer"
        >
          <i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
    </div>
    <div>&nbsp;</div>
    <div class="cc-collection-two-line-body">
      <input
        id="cc-collection-{collectionName}-output-page"
        bind:value={$collectionsStore["COLLECTIONS"][collectionName].outputPage}
        on:click={() => ($configStore["needToSaveCollections"] = true)}
        on:keydown={() => ($configStore["needToSaveCollections"] = true)}
        on:focusout={() => {
          outputPageExists[collectionName] = true;
          getPageName(
            $collectionsStore["COLLECTIONS"][collectionName].outputPage,
            $configStore["courseId"],
            doesOutputPageExist
          );
        }}
      />
      <button
        id="cc-collection-{collectionName}-output-page-update"
        class="btn"
        disabled={outputPageName[collectionName] === ""}
        on:click={() => {
          updateOutputPage(collectionName);
        }}>Update</button
      >
    </div>
    {#if !outputPageExists[collectionName] && outputPageName[collectionName]}
      <div class="cc-collection-two-line-warning">
        Will create a new page named <strong
          >{outputPageName[collectionName]}</strong
        >
      </div>
    {/if}
  </div>

<!--  <div class="cc-collection-form-reverse">
    <span class="cc-collection-input-reverse">
      <label for="cc-collection-{collectionName}-apply-module-labels">
        🧪Apply module labels ☠️
      </label>
      <sl-tooltip class="cc-about-apply-module-labels">
        <div slot="content">
          {@html HELP.configApplyLabels.tooltip}
        </div>
        <a
          id="cc-about-apply-module-labels"
          target="_blank"
          href={HELP.configApplyLabels.url}
          rel="noreferrer"
        >
          <i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
    </span>
    <span class="cc-collection-label-reverse">
      <button
        on:click={() => {
          applyModuleLabels(collectionName);
        }}
        id="cc-collection-{collectionName}-apply-module-labels"
        class="btn cc-existing-collection">Apply</button
      >
    </span>
  </div> -->
</div>

<style>
  .cc-existing-collection {
    font-size: 0.8em;
    font-weight: normal;
    padding-left: 0.5em;
    padding-bottom: 0.5em;
  }

  .cc-collection-move {
    float: right;
    margin-right: 0.5em;
  }

  .cc-existing-collection p {
    margin-top: 0.2em;
    margin-bottom: 0.2em;
  }

  .cc-existing-collection i {
    cursor: pointer;
  }

  .cc-existing-collection label {
    font-size: 0.8em;
  }

  /*  .cc-collection-representation {
    display: flex;
    align-items: center;
    justify-content: space-around;
  } */

  /*.cc-existing-collection input { */
  input {
    width: 15em;
    margin: 0.1em;
    font-size: 0.8em;
    padding-left: 0.5em;
    padding-top: 0em;
    padding-bottom: 0em;
  }

  button {
    font-size: 0.8em;
    padding: 0.2em;
  }
  /*  .cc-config-collection select {
    font-size: 0.8em;
    width: 7rem;
    height: 2rem;
  }*/

  select.cc-collection-representation {
    font-size: 0.8em;
    width: 10rem;
    height: 2rem;
    padding: 0em;
  }

  .cc-collection-form {
    display: grid;
    grid-template-columns: 8em 1fr;
    grid-gap: 1em;
    padding-bottom: 0.25em;
    align-items: center;
  }

  .cc-collection-label {
    grid-column: 1/ 2;
    text-align: right;
  }

  .cc-collection-input {
    grid-column: 2/ 3;
  }

  .cc-collection-form-reverse {
    display: grid;
    grid-template-columns: 1fr 8em;
    grid-gap: 1em;
    padding: 0.25em;
    align-items: center;
  }

  .cc-collection-label-reverse {
    grid-column: 2/3;
    text-align: left;
  }

  .cc-collection-input-reverse {
    grid-column: 1/2;
  }

  .cc-collection-double {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0em;
    text-align: right;
    align-items: center;
  }

  .cc-collection-double-center {
    text-align: center;
  }

  .cc-collection-two-line {
    display: grid;
    grid-template-columns: 8em 1fr;
  }

  .cc-collection-two-line-body {
    grid-column: 1/3;
    grid-row: 2/3;
    text-align: left;
  }

  .cc-collection-two-line-error {
    grid-column: 1/3;
    grid-row: 3/4;
    text-align: center;
    background-color: red;
    font-size: x-small;
    color: white;
  }

  .cc-collection-two-line-warning {
    grid-column: 1/3;
    grid-row: 3/4;
    text-align: center;
    background-color: yellow;
    font-size: x-small;
    color: black;
  }

  .cc-collection-two-line-header {
    grid-column: 1/2;
    text-align: left;
    padding-left: 0.5em;
  }

  .cc-collection-input > select,
  .cc-collection-input > input[type="text"] {
    width: 90%;
    padding-top: 0em;
    padding-bottom: 0em;
  }

  /*  .cc-collection-input > input[type="checkbox"] {
    width: auto;
    margin-left: 1em;
  } */

  sl-tooltip {
    text-align: left;
    white-space: normal;
  }

  label,
  select {
    margin-bottom: 0em;
    padding-top: 0em;
    padding-bottom: 0em;
  }

  input[type="checkbox"] {
    width: auto;
  }
</style>
