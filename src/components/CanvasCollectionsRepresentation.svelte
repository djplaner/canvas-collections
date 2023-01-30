<script lang="ts">
  /**
   * Add in Collections representation of the collections/modules in two parts
   * 1. CollectionsNavigation - provides the way to navigate between available
   *    collections
   * 2. CollectionRepresentation - used to modify the modules page as per the
   *    configuration of the currently visible collection
   * Both are passed the current collection as a prop.
   */

  import { configStore, collectionsStore } from "../stores";
  import CollectionsNavigation from "./CollectionsNavigation.svelte";
  import CollectionRepresentation from "./CollectionRepresentation.svelte";
  import IncludePage from "./IncludePage.svelte";

  import { debug } from "../lib/debug";

  debug(
    `______________ CanvasCollectionsRepresentation.svelte _currentCollection ${$configStore["currentCollections"]}______________`
  );
  debug("---- collectionsStore");
  debug($collectionsStore);

  //let localCollectionName : string = "";

  $: {
    if (!$configStore["currentCollection"]) {
      // if no current collection, set it to the first element in COLLECTIONS_ORDER
      // if it exists
      if ($collectionsStore["COLLECTIONS_ORDER"].length > 0) {
        $configStore["currentCollection"] =
          $collectionsStore["COLLECTIONS_ORDER"][0];
      }
    }
  }
</script>

{#if $collectionsStore["COLLECTIONS_ORDER"].length > 0}
  <CollectionsNavigation
    activeCollectionName={$configStore["currentCollection"]}
  />
  {#if !$collectionsStore["COLLECTIONS"][$configStore["currentCollection"]].includeAfter}
    <IncludePage collectionName={$configStore["currentCollection"]} />
  {/if}
  <CollectionRepresentation
    bind:collectionName={$configStore["currentCollection"]}
    claytons={false}
  />
  {#if $collectionsStore["COLLECTIONS"][$configStore["currentCollection"]].includeAfter}
    <IncludePage collectionName={$configStore["currentCollection"]} />
  {/if}
{/if}

<style>
</style>
