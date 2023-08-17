<!--
 Copyright (C) 2023 Griffith University
 
 This file is part of Canvas Collections.
 
 Canvas Collections is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 Canvas Collections is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with Canvas Collections.  If not, see <http://www.gnu.org/licenses/>.
-->

<script lang="ts">
  /**
   * Generate a navigation interface for the current settings of collections
   * TODO
   */
  import { collectionsStore, configStore } from "../stores";
  import CollectionRepresentation from "./CollectionRepresentation.svelte";

  export let activeCollectionName: string;

  let collectionNames = [];
  let activeCollection = {};

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

  /**
   * @function toggleMenu
   * @description toggle the cc-nav-menu (on small screens)
   */
  function toggleMenu() {
    let navList = document.getElementById("cc-nav-list-element");

    if ( navList.style.display === "block" ) {
      navList.style.display = "none";
    } else {
      navList.style.display = "block";
    }
  }

</script>

<div class="cc-nav">
  <ul id="cc-nav-list-element" class="cc-nav-list">
    <li class="cc-nav-menu">
      <a href="javscript:void(0);" on:click={toggleMenu}> ☰ </a>
    </li>
    {#each collectionNames as collectionName, i}
      {#if !($collectionsStore["COLLECTIONS"][collectionName].hide && !$configStore["editMode"])}
        <li class="cc-nav-collection {activeCollection[collectionName]}">
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

<style>
  @media (max-width: 1000px) {
    .cc-nav-list {
      text-align: justify;
      justify-items: stretch;
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #eee;
      width: 100%;
      /*    display: table;
    table-layout: fixed; */
    }

    .cc-nav-collection {
      display: none !important;
    }
    .cc-nav-menu {
      display: block !important;
    }

    .cc-nav {
      width: 20%;
    }
  }

  @media (min-width: 1000px) {
    .cc-nav-list {
      display: grid;
      text-align: justify;
      justify-items: stretch;
      grid-gap: 0.1rem;
      grid-template-columns: repeat(auto-fit, minmax(min(10rem, 100%), 1fr));
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #eee;
      width: 100%;
      /*    display: table;
    table-layout: fixed; */
    }

    .cc-nav-collection {
      display: block;
    }
    .cc-nav-menu {
      display: none !important;
    }
    .cc-nav {
      width: 100%;
    }
  }

  .cc-content {
    clear: both;
  }

  .cc-nav {
    font-size: small;
    display: block;
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
    display: block;
    width: 100%;
  }

  .cc-nav ul li {
    display: block;
    width: 100%;
    /*   border-right: 1px solid #000; */
    /* float: none; */
  }

  li.cc-nav-menu a {
    display: block;
    font-size: 2rem;
    text-align: right !important;
    text-decoration: none;
    color: #2d3b45;
    padding: 1em 0.8em !important;
    border-top: 4px solid #eee;
    box-sizing: border-box;
    font-size: 1.2em;
    transition: background 0.3s linear 0s !important;
  }

  li.cc-nav-collection a {
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
