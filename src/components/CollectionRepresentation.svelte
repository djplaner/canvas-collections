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
    representationsStore,
  } from "../stores";
  /*  import GriffithCards from "./Representations/GriffithCards.svelte";
  import AssessmentTable from "./Representations/AssessmentTable.svelte";
  import CollectionOnly from "./Representations/CollectionOnly.svelte";
  */
  import UniversityDateCalendar from "../lib/university-date-calendar";

  let calendar = new UniversityDateCalendar();

  import { modifyCanvasModulesList } from "./Representations/representationSupport";

  import { debug } from "../lib/debug";

  export let collection: string;

  debug(
    `_______________ CollectionRepresentation.svelte __collection ${collection} _____________`
  );
  debug($configStore);

  let representationComponent: any;
  $: {
    const localRep =
      $collectionsStore["COLLECTIONS"][$configStore["currentCollection"]][
        "representation"
      ];
    if (!$representationsStore.hasOwnProperty(localRep)) {
      alert(
        `CollectionRepresentation component requires a valid representation prop. ${localRep} is not valid`
      );
    }
    representationComponent = $representationsStore[localRep];

    if ($configStore["ccOn"]) {
      debug(
        `calling modifyCanvasModulesList with ${$configStore["currentCollection"]}`
      );
      modifyCanvasModulesList(
        $configStore["currentCollection"],
        $collectionsStore["MODULES"],
        $configStore["editMode"],
        $collectionsStore["COLLECTIONS"][$configStore["currentCollection"]]["unallocated"]
      );
      debug(
        `after calling modifyCanvasModulesList with ${$configStore["currentCollection"]}`
      );
    }
  }

  if (!collection) {
    // TODO better error handling
    throw new Error(
      "CollectionRepresentation component requires a collection prop"
    );
  }
</script>

<svelte:component this={representationComponent} bind:collection={collection} calendar={calendar} />

<style>
</style>
