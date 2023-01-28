<script lang="ts">
  /**
   * Implement a "factory" component for the representation of collections.
   * 1. Accept a collection as a prop
   * 2. Use the collection to determine which representation to use
   *    Each available representation will have a matching component in the
   *    Representations folder that is imported here
   * 3. Use <svelte:component> to instantiate the representation
   *    https://svelte.dev/tutorial/svelte-component
   * 4. bind the collection prop so that when navigation changes the collection its reactive
   *
   * TODO
   * - Should these components provide the method for modifying how canvas display modules?
   */
  import {
    collectionsStore,
    configStore,
    modulesStore,
    representationsStore,
  } from "../stores";

  import UniversityDateCalendar from "../lib/university-date-calendar";

  let calendar = new UniversityDateCalendar();

  import { modifyCanvasModulesList } from "./Representations/representationSupport";

  import { debug } from "../lib/debug";

  export let collectionName: string;
  export let claytons: boolean;

  if (!claytons) {
    claytons = false;
  }

  debug(
    `_______________ CollectionRepresentation.svelte __collection ${collectionName} __ Claytons ${claytons}___________`
  );
  console.log("----------- configStore");
  debug($configStore);
  console.log("----------- modulesStore");
  debug($modulesStore);

  let representationComponent: any;
  $: {
    const localRep =
      $collectionsStore["COLLECTIONS"][collectionName]["representation"];
    if (!$representationsStore.hasOwnProperty(localRep)) {
      alert(
        `CollectionRepresentation component requires a valid representation prop. ${localRep} is not valid`
      );
    }
    representationComponent = $representationsStore[localRep];

    // don't modify canvas modules if
    // - collections is one
    // - the current collection's representation is CollectionsTable
    if (
      $configStore["ccOn"] &&
      $collectionsStore["COLLECTIONS"][$configStore["currentCollection"]][
        "representation"
      ] !== "CollectionsTable"
    ) {
      modifyCanvasModulesList(
        $configStore["currentCollection"],
        $collectionsStore["COLLECTIONS"][$configStore["currentCollection"]][
          "unallocated"
        ]
      );
    }
  }

  if (!collectionName) {
    // TODO better error handling
    throw new Error(
      "CollectionRepresentation component requires a collection prop"
    );
  }
</script>

<svelte:component
  this={representationComponent}
  bind:collection={$configStore["currentCollection"]}
  {calendar}
  {claytons}
/>

<style>
</style>
