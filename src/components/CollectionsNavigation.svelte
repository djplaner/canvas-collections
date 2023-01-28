<script lang="ts">
  /**
   * Generate a navigation interface for the current settings of collections
   * TODO
   */
  import { collectionsStore, configStore } from "../stores";
  import { debug } from "../lib/debug";

  export let collection;

  debug(
    `______________ CollectionsNavigation.svelte _currentCollection ${collection}______________`
  );

  let collectionNames = [];
  let activeCollection = {};

  $: {
    collectionNames = $collectionsStore["COLLECTIONS_ORDER"];
    collectionNames.forEach((collectionName) => {
      activeCollection[collectionName] =
        collectionName === collection ? "cc-active" : "";
    });
    activeCollection = activeCollection
  }

  // create activeCollection dict keyed on collection name
  // with value "cc-active" if the collection is the current collection,
  // "" otherwise

  /**
   * @function navigateCollections
   * @param collectionName
   * @description navigate to a new collection
   */
  function navigateCollections(clickedCollectionName: string) {
    activeCollection[$configStore["currentCollection"]] = "";
    $configStore["currentCollection"] = clickedCollectionName;
    activeCollection[clickedCollectionName] = "cc-active";
    collection = clickedCollectionName;
  }
</script>

<div class="cc-nav">
  <ul>
    {#each collectionNames as collectionName, i}
      {#if !($collectionsStore["COLLECTIONS"][collectionName].hide && !$configStore["editMode"])}
        <!-- <li class="cc-nav {isCurrentCollection(collectionName)}"> -->
        <!-- class="cc-nav {$configStore['currentCollection'] === collectionName -->
        <!-- <li
          class="cc-nav {collection === collectionName
            ? 'cc-active'
            : ''}"
        > -->
        <li class="cc-nav {activeCollection[collectionName]}">
          <a
            href="#cc-collection-{i}"
            on:click|stopPropagation={navigateCollections(collectionName)}
            >{collectionName}</a
          >
          {#if $collectionsStore["COLLECTIONS"][collectionName].hide}
            <div class="cc-collection-hidden">Hidden</div>
          {/if}
        </li>
      {/if}
    {/each}
  </ul>
</div>

<style>
  .cc-content {
    clear: both;
  }

  .cc-nav {
    font-size: small;
  }

  .cc-nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #eee;
    display: table;
    table-layout: fixed;
    width: 100%;
  }

  li.cc-active {
    background-color: var(--ic-brand-button--primary-bgd) !important;
    font-weight: bold;
  }

  li.cc-active a {
    color: var(--ic-brand-button--primary-text) !important;
    border-top: 4px solid var(--ic-brand-button--primary-bgd) !important;
  }

  li.cc-close {
    float: right !important;
    border-right: none !important;
  }

  .cc-nav ul li {
    display: table-cell;
    width: 100%;
    /*   border-right: 1px solid #000; */
    float: none;
  }

  li.cc-nav a {
    display: block;
    text-align: center !important;
    text-decoration: none;
    color: #2d3b45;
    padding: 1em 0.8em !important;
    border-top: 4px solid #eee;
    box-sizing: border-box;
    font-size: 1.2em;
    transition: background 0.3s linear 0s !important;
  }

  .cc-nav li a:hover {
    /*   background-color: #111; */
    background-color: var(--ic-brand-button--primary-bgd);
    border-top: 4px solid var(--ic-brand-button--primary-bgd);
    color: rgb(255, 255, 255) !important;
    background: rgba(51, 51, 51, 0.9) !important;
    text-decoration: none !important;
    color: rgb(255, 255, 255) !important;
    /*  border-top: 4px solid #c12525; */
  }

  .cc-nav li:nth-child(4) {
    border-right: none;
  }

  .cc-collection-hidden {
    background: #cacaca;
    text-align: center;
  }
</style>
