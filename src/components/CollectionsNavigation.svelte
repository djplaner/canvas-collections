<script lang="ts">
  /**
   * Generate a navigation interface for the current settings of collections
   * TODO
   */

   import "luxbar/build/luxbar.min.css";

  import { collectionsStore, configStore } from "../stores";
  import CollectionRepresentation from "./CollectionRepresentation.svelte";

  export let activeCollectionName: string;

  let collectionNames = [];
  let activeCollection = {};

  const LUXBAR = true

  $: {
    collectionNames = $collectionsStore["COLLECTIONS_ORDER"];
    collectionNames.forEach((collectionName) => {
      activeCollection[collectionName] =
        collectionName === activeCollectionName ? "cc-active" : "";
    });
    activeCollectionName = activeCollectionName;
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
    //activeCollection[$configStore["currentCollection"]] = "";
    activeCollection[activeCollectionName] = "";
    $configStore["currentCollection"] = clickedCollectionName;
    activeCollection[clickedCollectionName] = "cc-active";
    activeCollectionName = clickedCollectionName;
  }
</script>

{#if LUXBAR} 
<header id="luxbar" class="luxbar-default">
    <input type="checkbox" class="luxbar-checkbox" id="luxbar-checkbox"/>
    <div class="luxbar-menu luxbar-menu-right luxbar-menu-material-red">
        <ul class="luxbar-navigation">
            <li class="luxbar-header">
                <label class="luxbar-hamburger luxbar-hamburger-doublespin" 
                id="luxbar-hamburger" for="luxbar-checkbox"> <span></span> </label>
            </li>
<!--            <li class="luxbar-item"><a href="#">Item 1</a></li>

            <li class="luxbar-item"><a href="#">Item 2</a></li>

            <li class="luxbar-item"><a href="#">Item 3</a></li>

            <li class="luxbar-item"><a href="#">Item 4</a></li> -->

      {#each collectionNames as collectionName, i}
      {#if !($collectionsStore["COLLECTIONS"][collectionName].hide && !$configStore["editMode"])}
        <li class="luxbar-item {activeCollection[collectionName]}">
          <a
            href="#cc-collection-{i}"
            on:click|stopPropagation={() => navigateCollections(collectionName)}
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
</header>

{:else} 

<div class="cc-nav">
  <ul>
    {#each collectionNames as collectionName, i}
      {#if !($collectionsStore["COLLECTIONS"][collectionName].hide && !$configStore["editMode"])}
        <li class="cc-nav {activeCollection[collectionName]}">
          <a
            href="#cc-collection-{i}"
            on:click|stopPropagation={() => navigateCollections(collectionName)}
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

 {/if} 

<style>
  .cc-content {
    clear: both;
  }

  .cc-nav {
    font-size: small;
    display: block;
    width: 100%;
  }

  .cc-nav ul {
    display: grid;
    text-align: justify;
    justify-items: stretch;
    grid-gap: 0.1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(10rem,100%), 1fr));
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #eee;
    width: 100%;
/*    display: table;
    table-layout: fixed; */
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
    display: block;
    width: 100%;
    /*   border-right: 1px solid #000; */
   /* float: none; */
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
