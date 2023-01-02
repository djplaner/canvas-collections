<script lang="ts">
  import {
    representationsStore,
    collectionsStore,
    configStore,
  } from "../../stores";

  let collectionName = "";
  let representation = "";
  let availableRepresentations = Object.getOwnPropertyNames(
    $representationsStore
  );

  const DEFAULT_NEW_COLLECTION = {
    name: "",
    representation: "",
    outputPage: "",
    hide: false,
    includePage: "",
    includeAfter: false,
  };

  /**
   * @function addCollection
   * @description Add a new collection to Collections, including
   * - check first that collectionName and representation are not empty
   * - add collectionName to COLLECTIONS_ORDER (at the end)
   * - create new collection in COLLECTIONS
   * - set needToSaveCollections to true
   */
  function addCollection() {
    if (collectionName === "") {
      alert("Please enter a name for the new collection");
      return;
    }
    if (representation === "") {
      alert("Please select a representation for the new collection");
      return;
    }

    // add collectionName to COLLECTIONS_ORDER (at the end)
    $collectionsStore["COLLECTIONS_ORDER"].push(collectionName);

    // create new collection in COLLECTIONS
    let newCollection = DEFAULT_NEW_COLLECTION;
    newCollection.name = collectionName;
    newCollection.representation = representation;
    $collectionsStore["COLLECTIONS"][collectionName] = newCollection;

    // set needToSaveCollections to true
    $configStore["needToSaveCollections"] = true;
  }
</script>

<div id="cc-config-new-collection">
  <a
    href="https://djplaner.github.io/canvas-collections/reference/collections/overview/#add-a-new-collection"
    target="_blank"
    rel="noreferrer"
  >
    <i class="icon-question cc-module-icon" />
  </a>
  <strong>Add a new Collection</strong>

  <div class="cc-config-collection border border-trbl">
    <div class="ic-Form-control" style="margin-bottom: 0px">
      <input
        type="text"
        id="cc-config-new-collection-name"
        placeholder="Name for new collection"
        bind:value={collectionName}
      />
    </div>

    <div class="cc-collection-representation">
      <a
        href="https://djplaner.github.io/canvas-collections/reference/representations/overview/"
        target="_blank"
        rel="noreferrer"
      >
        <i class="icon-question cc-module-icon" />
      </a>

      <label for="cc-config-new-collection-representation">Representation</label>
      <select
        id="cc-config-new-collection-representation"
        class="cc-collection-representation"
        bind:value={representation}
      >
        {#each availableRepresentations as representation}
          <option value={representation}>{representation}</option>
        {/each}
      </select>
    </div>

    <fieldset class="ic-Fieldset ic-Fieldset--radio-checkbox">
      <button
        class="btn btn-primary"
        id="cc-config-new-collection-button"
        on:click={addCollection}>Add</button
      >
    </fieldset>
  </div>
</div>

<style>
  .cc-collection-representation {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .cc-config-collection {
    padding-top: 0.5em;
    padding-left: 0.5em;
  }

  .cc-config-collection label {
    font-size: 0.8em;
  }

  .cc-config-collection input {
    font-size: 0.8em;
  }

  .cc-config-collection button {
    font-size: 0.8em;
    padding: 0.5em 1em;
  }
  .cc-config-collection select {
    font-size: 0.8em;
    width: 7rem;
    height: 2rem;
  }
  #cc-config-new-collection-button {
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.8em;
  }
</style>
