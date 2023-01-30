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

  const HELP = {
    existing: {
      url: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#existing-collections",
      tooltip: "<p>The collections already defined for this course.</p>",
    }
  }
</script>

<!-- div id="cc-config-existing-collections"> -->
  <strong>Existing Collections</strong>
       <sl-tooltip>
        <div slot="content">
          {@html HELP.existing.tooltip}
        </div>
        <a
          href={HELP.existing.url}
          rel="noreferrer"
          target="_blank"
        >
          <i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>

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
