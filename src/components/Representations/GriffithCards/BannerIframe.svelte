<script lang="ts">
  import { collectionsStore } from "../../../stores";
  export let moduleId: Number;

  // check that the format of the iframe is correct
  const match = $collectionsStore["MODULES"][moduleId].iframe.match(
    /^<iframe.*src="(.*)".*><\/iframe>$/
  );
  console.log('--------------------------------------------')
  console.log(`iframe: ${$collectionsStore["MODULES"][moduleId].iframe}`)
  console.log($collectionsStore)
</script>

{#if match}
   {@html $collectionsStore["MODULES"][moduleId].iframe}
{:else}
  <div
    class="cc-banner-colour"
    style="background-color:#ffffff;width:100%;height:10rem;"
  >
    (<em>No iframe specified</em>)
  </div>
{/if}

<style>
  .cc-banner-colour {
    width: 100%;
    height: 10rem;
  }
</style>
