<script lang="ts">
  /**
   * Implement configuration interface for an individual collection
   */

  import {
    collectionsStore,
    configStore,
    representationsStore,
  } from "../../stores";
  import { getCollectionCanvasModules } from "../Representations/representationSupport";
  import { getPageName } from "../../lib/CanvasSetup";

  export let collectionName: string;
  export let order: Number;
  export let numCollections: Number;

  import { debug } from "../../lib/debug";

  debug(
    `__________________ CollectionConfiguration.svelte __collection ${collectionName} order ${order} numCollections ${numCollections}_______________`
  );

  /*  let removed = false;
  // experiment to see if we can detect when this component for this collection
  // is being called, after the collection has already been deleted
  $: {
    if (!$collectionsStore["COLLECTIONS"].hasOwnProperty(collectionName)) {
      alert(
        `Collection ${collectionName} has been deleted but trying to do stuff`
      );
      removed = true;
    }
  } */

  const modules = getCollectionCanvasModules(
    collectionName,
    $collectionsStore["MODULES"]
  );
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
      alert(
        "There must always be a default collection. Change the default collection by selecting another collection"
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
    if (
      !confirm(
        `Are you sure you want to delete the collection ${collectionName}?`
      )
    ) {
      return;
    }

    debug("Deleting collection: " + collectionName);
    debug("before");
    debug($collectionsStore);

    // remove the collection from $collectionsStore["COLLECTIONS_ORDER"]
    let index = $collectionsStore["COLLECTIONS_ORDER"].indexOf(collectionName);
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
    debug("after");
    debug($collectionsStore);
    debug("config");
    debug($configStore);
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
    if (
      !confirm(
        `Are you sure you want to change the collection's name \nfrom "${collectionName}" to "${newCollectionName}"`
      )
    ) {
      return;
    }

    // modify collectionName in array $collectionsStore["COLLECTIONS_ORDER"] to newCollectionName
    let index = $collectionsStore["COLLECTIONS_ORDER"].indexOf(collectionName);
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
        $collectionsStore["MODULES"][moduleId].collection = newCollectionName;
      }
    }
    // rename the collectionName key in $collectionsStore["COLLECTIONS"] to newCollectionName
    $collectionsStore["COLLECTIONS"][newCollectionName] =
      $collectionsStore["COLLECTIONS"][collectionName];
    delete $collectionsStore["COLLECTIONS"][collectionName];
    $configStore["needToSaveCollections"]=true;
  }

  /**
   * @function doesIncludePageExists
   * @param pageObject - canvas page object returned from the API
   * @description Checks if the pageObject is a page that exists in the course
   * If not turn give an alert
   */
  function doesIncludePageExist(pageName, pageObject) {
    debug(`---------- doesIncludePageExist --${pageName}--------`)
    debug(pageObject)

    if (!pageObject) {
      alert(`Unable to find a page matching the include page name
      ${pageName}
      `)
    }
  }

  function doesOutputPageExist(pageName, pageObject) {
    if (!pageObject) {
      alert(`Unable to find a page matching the output page name
      ${pageName}
      `)
    }
  }

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
  <div class="cc-collection-representation">
    <label for="cc-collection-{collectionName}-collectionName">Name</label>
    <input
      type="text"
      id="cc-collection-{collectionName}-collectionName"
      value={collectionName}
      on:change={changeCollectionName}
    />
  </div>

  <!-- Modify the collection's representation
	TODO - implement a select box and be reactive -->
  <div class="cc-collection-representation">
    <a
      href="https://djplaner.github.io/canvas-collections/reference/representations/overview/"
      rel="noreferrer"
      target="_blank"
    >
      <i class="icon-question cc-module-icon" /></a
    >
    <label for="cc-collection-{collectionName}-representation"
      >Representation</label
    >
    <span id="cc-collection-{collectionName}-representation">
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

  <!-- default and hide collection - finished -->
  <div class="cc-collection-representation">
    <fieldset
      class="ic-Fieldset ic-Fieldset--radio-checkbox"
      style="margin-bottom:0.5em"
    >
      <div class="ic-Checkbox-group">
        <div>
          <a
            href="https://djplaner.github.io/canvas-collections/getting-started/configure/collections/#collection-properties"
            target="_blank"
            rel="noreferrer"
          >
            <i
              class="icon-question cc-module-icon"
              id="cc-about-default-collection"
            />
          </a>

          <input
            type="checkbox"
            id="cc-config-collection-${collectionName}-default"
            class="cc-config-collection-default"
            checked={$collectionsStore["DEFAULT_ACTIVE_COLLECTION"] ===
              collectionName}
            on:click={changeDefaultCollection}
          />
          <label for="cc-config-collection-${collectionName}-default">
            Default collection?
          </label>
        </div>
        <!-- <div class="ic-Form-control ic-Form-control--checkbox"> -->
        <div>
          <a
            target="_blank"
            href="https://djplaner.github.io/canvas-collections/getting-started/configure/collections/#collection-operations"
            rel="noreferrer"
          >
            <i class="icon-question cc-module-icon" /></a
          >
          <!--          <input
            type="checkbox"
            id="cc-config-collection-${collectionName}-hide"
            class="cc-config-collection-hide"
            bind:checked={$collectionsStore["COLLECTIONS"][collectionName][
              "hide"
            ]}
            disabled={$collectionsStore["DEFAULT_ACTIVE_COLLECTION"] ===
              collectionName}
          /> -->
          <label for="cc-config-collection-${collectionName}-hide">
            Hide collection?
          </label>
        </div>
      </div>
    </fieldset>
  </div>

  <!-- include page -->

  <div>
    <a
      id="cc-about-include-page"
      rel="noreferrer"
      target="_blank"
      href="https://djplaner.github.io/canvas-collections/reference/collections/overview/#include-page"
      ><i class="icon-question cc-module-icon" /></a
    >
    Include page
        <!-- on:stopTyping={onStopTyping} -->
    <div style="padding-left:0.5em">
      <input
        id="cc-collection-${collectionName}-include-page"
        bind:value={$collectionsStore["COLLECTIONS"][collectionName]
          .includePage}
        on:click={() => ($configStore["needToSaveCollections"] = true)}
        on:keydown={() => ($configStore["needToSaveCollections"] = true)}
        on:focusout={() => (getPageName($collectionsStore["COLLECTIONS"][collectionName]
          .includePage,$configStore["courseId"],doesIncludePageExist))}
        class="cc-existing-collection"
      />
      <a
        id="cc-about-include-after"
        href="https://djplaner.github.io/canvas-collections/getting-started/configure/collections/#collection-properties"
        target="_blank"
        rel="noreferrer"
      >
        <i class="icon-question cc-module-icon" />
      </a>
      <input
        type="checkbox"
        id="cc-config-collection-${collectionName}-include-after"
        class="cc-config-collection-include-after"
        on:click={() => ($configStore["needToSaveCollections"] = true)}
        on:keydown={() => ($configStore["needToSaveCollections"] = true)}
        bind:checked={$collectionsStore["COLLECTIONS"][collectionName]
          .includeAfter}
      />
      <label for="cc-config-collection-${collectionName}-include-after">
        After?
      </label>
    </div>
  </div>
  <!-- output page -->
  <div style="margin-top:0.5em">
    <a
      id="cc-about-update-output-page"
      target="_blank"
      href="https://djplaner.github.io/canvas-collections/reference/collections/overview/#output-page"
      rel="noreferrer"
    >
      <i class="icon-question cc-module-icon" /></a
    >
    Output page
    <div class="cc-collection-representation">
      <!--					<label for="cc-collection-${collectionName}-output-page">Name</label> -->
      <input
        id="cc-collection-${collectionName}-output-page"
        bind:value={$collectionsStore["COLLECTIONS"][collectionName].outputPage}
        on:click={() => ($configStore["needToSaveCollections"] = true)}
        on:keydown={() => ($configStore["needToSaveCollections"] = true)}
        on:focusout={() => (getPageName($collectionsStore["COLLECTIONS"][collectionName]
          .outputPage,$configStore["courseId"],doesOutputPageExist))}
        class="cc-existing-collection"
      />
      <span
        class="cc-collection-representation cc-output-page-update **outputPageExists**"
      >
        <!-- TODO onclick for output page button -->
        <button
          id="cc-collection-${collectionName}-output-page-update"
          class="btn cc-existing-collection">Update</button
        >
      </span>
    </div>
    <div style="display:flex;margin-top:1em;margin-bottom:0.5em">
      <div style="margin-right:0.5em">
        <sl-tooltip class="cc-about-apply-module-labels">
          <div slot="content" />
          <a
            id="cc-about-apply-module-labels"
            target="_blank"
            href="https://djplaner.github.io/canvas-collections/reference/collections/overview/#apply-module-labels"
            rel="noreferrer"
          >
            <i class="icon-question cc-module-icon" /></a
          >
          🧪Apply module labels ☠️
        </sl-tooltip>
      </div>
      <!-- TODO onclick for apply module labels -->
      <button
        id="cc-collection-${collectionName}-apply-module-labels"
        class="btn cc-existing-collection">Apply</button
      >
    </div>
  </div>
</div>

<style>
  .cc-existing-collection {
    font-size: 0.8em;
    font-weight: normal;
    padding-left: 0.5em;
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

  .cc-collection-representation {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .cc-existing-collection input {
    width: 10em;
    margin: 0.1em;
    font-size: 0.8em;
    padding-left: 0.5em;
  }

  button.cc-existing-collection {
    font-size: 0.8em;
    padding: 0.5em 1em;
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
  }
</style>
