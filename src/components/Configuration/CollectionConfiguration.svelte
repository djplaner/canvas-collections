<script lang="ts">
  /**
   * Implement configuration interface for an individual collection
   */

  import { collectionsStore } from "../../stores";
  import { getCollectionModuleIds } from "../Representations/representationSupport";

  export let collectionName: string;

  const modules = getCollectionModuleIds(collectionName,$collectionsStore["MODULES"]);
  let moduleCount = modules.length;
  let moduleName = moduleCount === 1 ? "module" : "modules";
</script>

<div
  class="cc-existing-collection border border-trbl"
  id="cc-collection-{collectionName}"
>
  <p>
    {collectionName} - ({moduleCount} {moduleName})
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
</div>

<style>
  .cc-existing-collection {
    font-size: 0.8em;
    font-weight: normal;
    padding-left: 0.5em;
  }

  .cc-collection-move {
	float:right;
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
</style>
