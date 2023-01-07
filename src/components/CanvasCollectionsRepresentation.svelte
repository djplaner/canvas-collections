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
  debug("---- collectionsStore")
  debug($collectionsStore)

</script>

{#if $collectionsStore["COLLECTIONS_ORDER"].length > 0}
  <CollectionsNavigation bind:collection={$configStore["currentCollection"]} />
  {#if ( 
    $collectionsStore["COLLECTIONS"][$configStore["currentCollection"]].includePage!=="" &&
    $collectionsStore["COLLECTIONS"][$configStore["currentCollection"]].includeAfter===false
  )}
     <IncludePage pageName={$collectionsStore["COLLECTIONS"][$configStore["currentCollection"]].includePage} />
  {/if}
  <CollectionRepresentation collection={$configStore["currentCollection"]} />
  {#if ( 
    $collectionsStore["COLLECTIONS"][$configStore["currentCollection"]].includePage!=="" &&
    $collectionsStore["COLLECTIONS"][$configStore["currentCollection"]].includeAfter===true
  )}
     <IncludePage pageName={$collectionsStore["COLLECTIONS"][$configStore["currentCollection"]].includePage} />
  {/if}
{/if}

<style>
</style>
