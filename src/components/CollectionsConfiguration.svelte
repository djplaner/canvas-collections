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
   * Interface to change the configuration of the collections for the current course
   * - add a new collection
   * - change the order of collections
   * - change details of collections
   * - use Claytons facility
   */

  import { collectionsStore, configStore } from "../stores";
  import { getPageName } from "../lib/CanvasSetup";

  import ExistingCollections from "./Configuration/ExistingCollections.svelte";
  import NewCollection from "./Configuration/NewCollection.svelte";
  import FullClaytons from "./Configuration/FullClaytons.svelte";

  const visibilityOptions = ["no-one", "students", "teachers", "all"];

  /**
   * Declare and populate variables to track whether includePage and outputPage
   * for each collection actually exist
   * - These are hashes keyed on collection name
   */
  let includePageExists = {},
    outputPageExists = {};
  $collectionsStore["COLLECTIONS_ORDER"].forEach((collectionName) => {
    includePageExists[collectionName] = true;
    outputPageExists[collectionName] = true;
  });

  let pageNamesCollections = updatePageNamesCollections();

  // see if the existing pages exist
  Object.keys(pageNamesCollections).forEach((pageName) => {
    getPageName(pageName, $configStore["courseId"], doesPageExist);
  });

  /**
   * @function updatePageNamesCollections
   * @description create a new pageNamesCollections
   * hash of arrays, keyed on pageName with a list of collections
   * that use that pageName, values are a hash
   * { pageType: includePage|outputPage, collectionName: collectionName}
   * used to ensure only one check for exists is done
   */
  function updatePageNamesCollections() {
    let newPageNamesCollections = {};

    // Assume they are true to start with and allow getPageName result to override
    $collectionsStore["COLLECTIONS_ORDER"].forEach((collectionName) => {
      //includePageExists[collectionName] = true;
      //outputPageExists[collectionName] = true;

      ["includePage", "outputPage"].forEach((pageType) => {
        let init = false;
        const pageName =
          $collectionsStore["COLLECTIONS"][collectionName][pageType];
        const value = { pageType: pageType, collectionName: collectionName };

        if (pageName && pageName !== "") {
          if (!newPageNamesCollections.hasOwnProperty(pageName)) {
            newPageNamesCollections[pageName] = [];
            init = true;
          }
          newPageNamesCollections[pageName].push(value);
        }
      });
    });
    return newPageNamesCollections;
  }

  // Reactive check the getPageName
  // Perhaps should be a message

  function handleMessage(event) {
    const msgType = event.detail.msgType;

    if (msgType === "changeName") {
      // change the value in collectionsStore if names have changed
      $collectionsStore["COLLECTIONS"][event.detail.collectionName][
        event.detail.pageType
      ] = event.detail.pageName;
      $configStore["needToSaveCollections"] = true;
      // modify page names collections
      pageNamesCollections = updatePageNamesCollections();
    }

    // need to check if the page exists & thus modify the warning
    getPageName(event.detail.pageName, $configStore["courseId"], doesPageExist);
  }

  /**
   * @function doesPageExists
   * @param pageName - name of the page to tried to retrive
   * @param msg - message back from canvas API { status: res: body }
   * @description Call back after trying to get the page object for a page
   * will modify the "exists" for all collections using the page
   */
  function doesPageExist(pageName, msg) {
    const pageObject = msg.body;
    let pageExists = false;
    if (pageObject) {
      pageExists = true;
    }

    // modify "exists" setting for all the collections that have this page
    // to whatever was found
    pageNamesCollections[pageName].forEach((value) => {
      const pageType = value.pageType;
      const collectionName = value.collectionName;
      if (pageType === "includePage") {
        includePageExists[collectionName] = pageExists;
      } else {
        outputPageExists[collectionName] = pageExists;
      }
    });
  }


  const HELP = {
    visibility: {
      tooltip:
        `<p>For whom are Collections changes visible?</p>
        <ul>
          <li> no-one - no changes made for anyone</li>
          <li> students - only student, not teachers</li>
          <li> teachers - only teachers/designers</li>
          <li> all - all users</li>
          </ul>`,
      url: "https://djplaner.github.io/canvas-collections/reference/lifecycle/visibility/live/",
    },
  };
</script>

<div class="cc-header-grid">
  <div class="cc-header cc-collections-label">
    <p>Configure Canvas Collections
    </p>
  </div>
  <div class="cc-collections-input">
    <small>Visibility</small>
    <sl-tooltip>
      <div slot="content">{@html HELP.visibility.tooltip}</div>
      <a target="_blank" rel="noreferrer" href={HELP.visibility.url}
        ><i class="icon-question cc-module-icon" /></a
      >
    </sl-tooltip>
    <select
      id="cc-collection-visibility"
      class="cc-collection-representation"
      bind:value={$collectionsStore["VISIBILITY"]}
      on:change={() => ($configStore["needToSaveCollections"] = true)}
    >
      {#each visibilityOptions as visibilityOption}
        <option value={visibilityOption}>{visibilityOption}</option>
      {/each}
    </select>
  </div>
</div>
<div class="cc-box-body">
  <div id="cc-config-body">
    <div id="cc-config-existing-collections">
      <ExistingCollections
        on:message={handleMessage}
        bind:includePageExists
        bind:outputPageExists
      />
        <!-- bind:pageNamesCollections -->
    </div>
    <div id="cc-config-new-collection">
      <NewCollection />
      <FullClaytons on:message={handleMessage} />
    </div>
  </div>
</div>

<style>
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

  .cc-header p {
    font-size: 1.1em;
    font-weight: bold;
    margin-left: 0.5em;
  }
  .cc-header-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    padding-bottom: 0.25em;
    align-items: center;
  }

  select {
    margin-bottom: 0;
    font-size: 0.8rem;
    width: 5rem;
    height: 2em;
    line-height: 2rem;
    padding: 0;
  }

  .cc-version {
    font-size: 50%
  }
</style>
