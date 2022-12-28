<script lang="ts">
  /**
   * Generate a navigation interface for the current settings of collections
   * TODO
   */
  import { collectionsStore, configStore } from "../stores";

  export let collection ;


  let collectionNames = [];
  if ($collectionsStore.hasOwnProperty("COLLECTIONS_ORDER")) {
    collectionNames = $collectionsStore.COLLECTIONS_ORDER;
  }
  let collections = {};
  if ($collectionsStore.hasOwnProperty("COLLECTIONS")) {
    collections = $collectionsStore["COLLECTIONS"];
  }
  console.log('-------- collectionName')
  console.log(collectionNames)

  // create activeCollection dict keyed on collection name 
  // with value "cc-active" if the collection is the current collection,
  // "" otherwise
  let activeCollection = {};
  collectionNames.forEach((collectionName) => {
    activeCollection[collectionName] = collectionName === collection ? "cc-active" : "";
  });

  /**
   * @function navigateCollections
   * @param collectionName
   * @description navigate to a new collection
   */
  function navigateCollections(collectionName: string) {
    console.log("navigateCollections");
    console.log(collectionName);
    activeCollection[$configStore["currentCollection"]] = "";
    $configStore["currentCollection"] = collectionName;
    activeCollection[collectionName] = "cc-active";
    collection = collectionName;
  }
</script>

<div class="cc-nav">
  <ul>
    {#each collectionNames as collectionName, i}
      {#if !(collections[collectionName].hide && !$configStore["editMode"])}
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
          {#if collections[collectionName].hide}
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
