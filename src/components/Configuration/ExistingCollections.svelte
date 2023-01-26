<script lang="ts">
  /**
   * Display a list of the existing collections in the current order
   * Each collection is displayed using the CollectionConfiguration component
   */
  import { collectionsStore } from "../../stores";
  import CollectionConfiguration from "./CollectionConfiguration.svelte";

  import { debug } from "../../lib/debug";

  export let includePageExists = {};
  export let outputPageExists = {};
  export let pageNamesCollections = {};


  debug("______________ ExistingCollections.svelte _______________");

  debug("includePageExists");
  debug(includePageExists);
  debug("outputPageExists");
  debug(outputPageExists);
  debug("pageNamesCollections");
  debug(pageNamesCollections);

  debug("------------------------- ExistingCollections");
  debug($collectionsStore);
  debug("EEEEEEEEEEEE COLLECTIONS_ORDER");
  debug($collectionsStore["COLLECTIONS_ORDER"]);
</script>

<!-- div id="cc-config-existing-collections"> -->
  <a
    href="https://djplaner.github.io/canvas-collections/reference/collections/overview/#existing-collections"
    target="_blank"
    rel="noreferrer"
  >
    <i class="icon-question cc-module-icon" />
  </a>
  <strong>Existing Collections</strong>

  {#if $collectionsStore["COLLECTIONS_ORDER"].length === 0}
    <p>No collections have been defined</p>
  {/if}
  {#each $collectionsStore["COLLECTIONS_ORDER"] as collectionName, i}
    <CollectionConfiguration
      on:message
      {collectionName}
      bind:includePageExists={includePageExists[collectionName]}
      bind:outputPageExists={outputPageExists[collectionName]}
      order={i}
      numCollections={$collectionsStore["COLLECTIONS_ORDER"].length}
    />
  {/each}

<style>
  p {
    font-size: 0.8em;
  }
</style>
