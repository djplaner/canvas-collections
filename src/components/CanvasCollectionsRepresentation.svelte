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

  import { debug } from "../lib/debug";

  debug(
    `______________ CanvasCollectionsRepresentation.svelte _currentCollection ${$configStore["currentCollections"]}______________`
  );
</script>

{#if $collectionsStore["COLLECTIONS_ORDER"].length > 0}
  <CollectionsNavigation bind:collection={$configStore["currentCollection"]} />
  <CollectionRepresentation collection={$configStore["currentCollection"]} />
{/if}

<style>
</style>
