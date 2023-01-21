<script lang="ts">
  import { collectionsStore, configStore } from "../../../stores";
  export let moduleId: Number;
    export let claytons: boolean;
  if (!claytons) {
    claytons = false;
  }


  /**
   * @function isValidIframe
   * @param html
   * @returns boolean
   * @description Reactively checks if the iframe value is just
   * an iframe and an iframe alone 
   */
  function isValidIframe(html): boolean {
    const match = $collectionsStore["MODULES"][moduleId].iframe.match(
      /^<iframe.*src="(.*)".*>.*<\/iframe>$/
    );

    return match;
  }
</script>

{#if isValidIframe($collectionsStore["MODULES"][moduleId].iframe)}
  {@html $collectionsStore["MODULES"][moduleId].iframe}
{:else}
  <div
    class="cc-banner-colour"
    style="background-color:#ffffff;width:100%;height:10rem;"
  >
    {#if $configStore["editMode"]}
      <p>(<em>No iframe specified</em>)</p>
    {/if}
  </div>
{/if}

<style>
  .cc-banner-colour {
    width: 100%;
    height: 10rem;
  }
</style>
