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

  import { afterUpdate } from "svelte";

  import UniversityDateCalendar from "../lib/university-date-calendar";

  let calendar = new UniversityDateCalendar();

  import { modifyCanvasModulesList } from "./Representations/representationSupport";

  import { debug } from "../lib/debug";
  import { toastAlert } from "../lib/ui";

  export let collectionName: string;
  export let claytons: boolean;

  let complete: boolean = false;

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
      const module = document.getElementById(hash);
      if (module) {
        // check to see if the module is visible (e.g. collection is visible)
        if (module.style.display !== "none") {
          module.scrollIntoView();
        }
      }
    }
    complete = true
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

<svelte:component
  this={representationComponent}
  collection={$configStore["currentCollection"]}
  {calendar}
  {claytons}
/>

<style>
</style>
