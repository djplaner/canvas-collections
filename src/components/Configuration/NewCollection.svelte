<script lang="ts">
  import {
    representationsStore,
    collectionsStore,
    configStore,
  } from "../../stores";

  import { toastAlert } from "../../lib/ui";

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
    if (collectionName === "" || representation === "") {
      if (collectionName === "") {
        toastAlert(
          `<p>Please enter a name for the new collection</p>`,
          "danger"
        );
      }
      if (representation === "") {
        toastAlert(
          "<p>Please select a representation for the new collection</p>",
          "danger"
        );
      }
      return;
    }

    // make sure collectionName doesn't match one of the existing collections
    if ($collectionsStore["COLLECTIONS"][collectionName]) {
      toastAlert(
        `<p>Collection name <strong>${collectionName}</strong> already exists</p>`,
        "danger"
      );
      return;
    }


    // create new collection in COLLECTIONS
    //let newCollection = createNewCollection()
    let newCollection = { ...DEFAULT_NEW_COLLECTION }
    newCollection.name = collectionName;
    newCollection.representation = representation;
    $collectionsStore["COLLECTIONS"][collectionName] = newCollection;

    // add collectionName to COLLECTIONS_ORDER (at the end)
    if ($collectionsStore["DEFAULT_ACTIVE_COLLECTION"]==="") {
      $collectionsStore["DEFAULT_ACTIVE_COLLECTION"] = collectionName;
    }
    $collectionsStore["COLLECTIONS_ORDER"].push(collectionName);

    // reset the value of the input/select
    collectionName = "";
    representation = "";

    // set needToSaveCollections to true
    $configStore["needToSaveCollections"] = true;
  }

  function createNewCollection() {
    let newCollection = {}

    // loop through all fields in DEFAULT_NEW_COLLECTION and 
  }

  const HELP = {
    newCollection: {
      url: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/collections/add-a-new-collection/",
      tooltip: "<p>Create a new collection</p>",
    },
    representation: {
      url: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/collections/add-a-new-collection/#representation",
      tooltip: "<p>Choose an initial representation. Can be changed later.</p>"
    }
  };
</script>

<strong>Add a new collection</strong>
<sl-tooltip>
  <div slot="content">{@html HELP.newCollection.tooltip}</div>
  <a href={HELP.newCollection.url} target="_blank" rel="noreferrer">
    <i class="icon-question cc-module-icon" />
  </a>
</sl-tooltip>

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
    <label for="cc-config-new-collection-representation">Representation</label>
    <sl-tooltip>
    <div slot="content">{@html HELP.representation.tooltip}</div>
    <a
      href={HELP.representation.url}
      target="_blank"
      rel="noreferrer"
    >
      <i class="icon-question cc-module-icon" />
    </a>
    </sl-tooltip>

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
      on:click|stopPropagation={addCollection}>Add</button
    >
  </fieldset>
</div>

<style>
  .cc-collection-representation {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0.5em;
  }

  .cc-config-collection {
    padding-top: 0.5em;
    padding-left: 0.5em;
    padding-bottom: 0.5em;
  }

  .cc-config-collection label {
    font-size: 0.8em;
    margin: 0em;
  }

  .cc-config-collection input {
    font-size: 0.8em;
    width: 15em;
    margin: 0.5em;
    font-size: 0.8em;
    padding-left: 0.5em;
  }

  .cc-config-collection button {
    font-size: 0.8em;
    padding: 0.5em 1em;
  }
  .cc-config-collection select {
    font-size: 0.8em;
    width: 8rem;
    height: 2rem;
    padding-left: 0.5em;
    margin: 0em;
  }
  #cc-config-new-collection-button {
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.8em;
  }
</style>
