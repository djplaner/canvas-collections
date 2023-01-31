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

  import { afterUpdate } from "svelte";


  let complete : boolean = false

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

  /**
   * @function checkModuleScrollTo()
   * @description When the representation has finished update
   * If the url hash === module_<moduleId>
   * - if the module is in another collection, change to that collection
   *   This will generate another update which will eventually end up back here
   * - attempt to scrollTo the module
   * - set complete=true so we don't come back again
   */
  function checkModuleScrollTo() {
    // check to see if url.hash === module_<moduleId>
    const hash = window.location.hash;
    const regex = /^#module_(\d+)$/;
    const match = hash.match(regex);
    if (match) {
      const moduleId = match[1];
      // does the currentCollection match the module's collection
      const moduleCollectionName =
        $collectionsStore["MODULES"][moduleId].collection;
      if (moduleCollectionName !== $configStore["currentCollection"]) {
        $configStore["currentCollection"] = moduleCollectionName;
        return;
      }
      const module = document.getElementById(moduleId);
      if (module) {
        // check to see if the module is visible (e.g. collection is visible)
        if (module.style.display !== "none") {
          module.scrollIntoView();
        }
      }
    }
    complete = true;
  }

  /**
   * @function afterUpdate()
   * @description Called after the component is updated
   * For the first time, check if the URL hash contains module_<moduleId>
   * If it does, try to scroll to that module with collections display
   */
  afterUpdate(() => {
    if (!complete) {
      checkModuleScrollTo();
    }
  });
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
