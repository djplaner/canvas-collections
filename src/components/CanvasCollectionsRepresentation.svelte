<script lang="ts">
  /**
   * Add in Collections representation of the collections/modules in two parts
   * 1. CollectionsNavigation - provides the way to navigate between available
   *    collections
   * 2. CollectionRepresentation - used to modify the modules page as per the
   *    configuration of the currently visible collection
   * Both are passed the current collection as a prop.
   */

  import { configStore } from "../stores";
  import CollectionsNavigation from "./CollectionsNavigation.svelte";
  import CollectionRepresentation from "./CollectionRepresentation.svelte";
</script>

<CollectionsNavigation bind:collection={$configStore["currentCollection"]} />
<CollectionRepresentation collection={$configStore["currentCollection"]} />

<style>
</style>
