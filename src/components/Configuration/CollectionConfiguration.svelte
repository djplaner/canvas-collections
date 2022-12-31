<script lang="ts">
  /**
   * Implement configuration interface for an individual collection
   */

  import { collectionsStore } from "../../stores";
  import { getCollectionModuleIds } from "../Representations/representationSupport";

  export let collectionName: string;

  const modules = getCollectionModuleIds(
    collectionName,
    $collectionsStore["MODULES"]
  );
  let moduleCount = modules.length;
  let moduleName = moduleCount === 1 ? "module" : "modules";
</script>

<div
  class="cc-existing-collection border border-trbl"
  id="cc-collection-{collectionName}"
>
  <p>
    {collectionName} - ({moduleCount}
    {moduleName})
    <span class="cc-collection-move">
      <i
        class="icon-arrow-up cc-move-collection"
        id="cc-collection-${collectionName}-up"
      />
      <i
        class="icon-arrow-down cc-move-collection"
        id="cc-collection-${collectionName}-down"
      />
      <i
        class="icon-trash cc-delete-collection"
        id="cc-collection-${collectionName}-delete"
      />
    </span>
  </p>

  <div class="cc-collection-representation">
    <label for="cc-collection-{collectionName}-collectionName">Name</label>
    <input
      type="text"
      id="cc-collection-{collectionName}-collectionName"
      value={collectionName}
    />
  </div>
  <div class="cc-collection-representation">
    <label for="cc-collection-{collectionName}-representation"
      >Representation</label
    >
    <span id="cc-collection-{collectionName}-representation">
      {$collectionsStore["COLLECTIONS"][collectionName]["representation"]}
    </span>
  </div>

  <div class="cc-collection-representation">
    <!-- put the options -->
    <fieldset
      class="ic-Fieldset ic-Fieldset--radio-checkbox"
      style="margin-bottom:0.5em"
    >
      <div class="ic-Checkbox-group">
        <div>
          <a
            href="https://djplaner.github.io/canvas-collections/getting-started/configure/collections/#collection-properties"
			target="_blank" rel="noreferrer">
            <i class="icon-question cc-module-icon" id="cc-about-default-collection" />
		  </a>

          <input
            type="checkbox"
            id="cc-config-collection-${collectionName}-default"
            class="cc-config-collection-default"
			checked={$collectionsStore["DEFAULT_ACTIVE_COLLECTION"]===collectionName}
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
			bind:checked={$collectionsStore["COLLECTIONS"][collectionName]["hide"]}
			disabled={$collectionsStore["DEFAULT_ACTIVE_COLLECTION"]===collectionName}
          />
          <label for="cc-config-collection-${collectionName}-hide">
            Hide collection?
          </label>
        </div>
      </div>
    </fieldset>
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
</style>
