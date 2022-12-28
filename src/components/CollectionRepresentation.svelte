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
  import { collectionsStore } from "../stores";
  import Cards from "./Representations/Cards.svelte";
  import AssessmentTable from "./Representations/AssessmentTable.svelte";
  import CollectionOnly from "./Representations/CollectionOnly.svelte";

  const translation = {
    CollectionOnly: CollectionOnly,
    Cards: Cards,
    AssessmentTable: AssessmentTable,
    GriffithCards: Cards,
  };

  export let collection: string;

  if (!collection) {
    // TODO better error handling
    throw new Error(
      "CollectionRepresentation component requires a collection prop"
    );
  }
</script>

<svelte:component
  this={translation[
    $collectionsStore["COLLECTIONS"][collection]["representation"]
  ]}
  bind:collection={collection}
/>

<style>
</style>
