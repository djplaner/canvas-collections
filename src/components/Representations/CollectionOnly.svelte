<script lang="ts">
  /**
   * The simplest component, will not display any representation.
   * Intended for use when you just want to see
   * - the navigation bar between collections
   * - the list of Canvas module elements belonging to the collection
   */

    import { getRepresentationModules } from "./representationSupport";
	 import { collectionsStore, configStore } from "../../stores";

  export let collection: string;
  //  export let calendar: any;
  export let claytons: boolean;


  const modules = getRepresentationModules(
      collection,
      claytons,
      $collectionsStore["COLLECTIONS"][collection]["unallocated"]
    );
</script>

{#if $configStore['editMode']}

  {#if modules.length===0} 
  <div class="cc-no-modules">
	<p>No modules have been added to this collection.</p>
  </div>
  {/if}

{/if}

<style>
</style>
