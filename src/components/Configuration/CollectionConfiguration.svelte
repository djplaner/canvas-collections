<script lang="ts">
  /**
   * Implement configuration interface for an individual collection
   */

  import { collectionsStore } from "../../stores";
  import { getCollectionModuleIds } from "../Representations/representationSupport";

  export let collectionName: string;
  export let order: Number;
  export let numCollections: Number;

  console.log(
    `------------------------- CollectionConfiguration: ${collectionName}`
  );
  console.log(` order = ${order} numCollections = ${numCollections}`);

  const modules = getCollectionModuleIds(
    collectionName,
    $collectionsStore["MODULES"]
  );
  let moduleCount = modules.length;
  let moduleName = moduleCount === 1 ? "module" : "modules";

  console.log($collectionsStore["COLLECTIONS"]);

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
    $collectionsStore["COLLECTIONS_ORDER"] = $collectionsStore["COLLECTIONS_ORDER"];
  }

  /**
   * @function deleteCollection
   * @description Delete the collection by
   * 1. Generating an alert to check user really wants to remove it
   * 2. Remove the collection from $collectionsStore["COLLECTIONS"]
   * 3. Remove the collection from $collectionsStore["COLLECTIONS_ORDER"]
   * 4. If currently the DEFAULT_ACTIVE_COLLECTION Change the DEFAULT_ACTIVE_COLLECTION to the first collection left
   * 4. Set the collection attribute for all modules in the collection to "none"
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

	console.log("Deleting collection: " + collectionName)
	console.log("before")
	console.log($collectionsStore)

	// remove the collection from $collectionsStore["COLLECTIONS"]
	delete $collectionsStore["COLLECTIONS"][collectionName];

	// remove the collection from $collectionsStore["COLLECTIONS_ORDER"]
	let index = $collectionsStore["COLLECTIONS_ORDER"].indexOf(collectionName);
	$collectionsStore["COLLECTIONS_ORDER"].splice(index, 1);

	// if currently the DEFAULT_ACTIVE_COLLECTION Change the DEFAULT_ACTIVE_COLLECTION to the first collection left
	if ($collectionsStore["DEFAULT_ACTIVE_COLLECTION"] === collectionName) {
		$collectionsStore["DEFAULT_ACTIVE_COLLECTION"] = $collectionsStore["COLLECTIONS_ORDER"][0];
	}
	// set the collection attribute for all modules in the collection to "none"
	 for ( const moduleId in $collectionsStore["MODULES"]) {
		console.log(`--------- ${moduleId}`)
		if ($collectionsStore['MODULES'][moduleId].collection === collectionName) {
			$collectionsStore['MODULES'][moduleId].collection = null;
		}
	}
	console.log("after")
	console.log($collectionsStore)
  }
</script>

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
    />
  </div>

  <!-- Modify the collection's representation
	TODO - implement a select box and be reactive -->
  <div class="cc-collection-representation">
    <label for="cc-collection-{collectionName}-representation"
      >Representation</label
    >
    <span id="cc-collection-{collectionName}-representation">
      {$collectionsStore["COLLECTIONS"][collectionName]["representation"]}
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
          <input
            type="checkbox"
            id="cc-config-collection-${collectionName}-hide"
            class="cc-config-collection-hide"
            bind:checked={$collectionsStore["COLLECTIONS"][collectionName][
              "hide"
            ]}
            disabled={$collectionsStore["DEFAULT_ACTIVE_COLLECTION"] ===
              collectionName}
          />
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
    <div style="padding-left:0.5em">
      <input
        id="cc-collection-${collectionName}-include-page"
        value={$collectionsStore["COLLECTIONS"][collectionName].includePage}
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
        value={$collectionsStore["COLLECTIONS"][collectionName].outputPage}
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
</style>
