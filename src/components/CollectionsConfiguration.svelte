<script lang="ts">
  /**
   * Interface to change the configuration of the collections for the current course
   * - add a new collection
   * - change the order of collections
   * - change details of collections
   * - use Claytons facility
   */

  import ExistingCollections from "./Configuration/ExistingCollections.svelte";
  import NewCollection from "./Configuration/NewCollection.svelte";

  import { debug } from "../lib/debug";
  debug("______________ CollectionsConfiguration.svelte _______________")
</script>

<div class="cc-box-header">
  <p>Configure Canvas Collections</p>
</div>
<div class="cc-box-body">
  <div id="cc-config-body">
    <ExistingCollections />
    <NewCollection />
  </div>
</div>

<style>
  .cc-box-header {
    padding-left: 0.5em;
  }

  .cc-box-header p {
    font-size: 1.1em;
    font-weight: bold;
  }

  .cc-box-body {
    width: 35em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    padding-bottom: 1em;
  }

  #cc-config-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 1em;
    grid-auto-flow: row;
    grid-template-areas: ". .";
    height: 100%;
  }

  #cc-config-body p {
    font-size: 0.9em;
    /*font-weight: bold; */
  }
</style>
