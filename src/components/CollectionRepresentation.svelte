<script lang="ts">
  /**
   * Implement a "factory" component for the representation of collections.
   * 1. Accept a collection as a prop
   * 2. Use the collection to determine which representation to use
   *    Each available representation will have a matching component in the
   *    Representations folder that is imported here
   * 3. Use <svelte:component> to instantiate the representation
   *    https://svelte.dev/tutorial/svelte-component
   *
   * TODO
   * - Should these components provide the method for modifying how canvas display modules?
   */
  import { collectionsStore, configStore } from "../stores";
  import Cards from "./Representations/Cards.svelte";
  import AssessmentTable from "./Representations/AssessmentTable.svelte";
  import CollectionOnly from "./Representations/CollectionOnly.svelte";

  const translation = {
    CollectionOnly: CollectionOnly, Cards: Cards, AssessmentTable: AssessmentTable
  };

  export let collection: string;

  if (!collection) {
    // TODO better error handling
    throw new Error(
      "CollectionRepresentation component requires a collection prop"
    );
  }

  let collectionProps = { collection: collection };

  // set default collectionRepresentation
  let collectionRepresentation = translation["Cards"];

  // modify the representation to the one specified in the collection
  let collections = null;
  if ($collectionsStore.hasOwnProperty("COLLECTIONS")) {
    collections = $collectionsStore["COLLECTIONS"];
  }
  // TODO need to handle the errors here?
  // see more https://kit.svelte.dev/docs/errors
  if (
    collections &&
    collections.hasOwnProperty(collection) &&
    collections[collection].hasOwnProperty("representation")
  ) {
    if (translation.hasOwnProperty(collections[collection]["representation"])) {
      collectionRepresentation =
        translation[collections[collection]["representation"]];
    }
  } else {
    throw new Error(
      `CollectionRepresentation: collections missing collection/representation for ${collection}`
    );
  }
</script>

<h1>The representation for collection {collection}</h1>

<svelte:component this={collectionRepresentation} {...collectionProps}/>

<style>
</style>
