<script lang="ts">
  /**
   * CollectionsTable
   * - Show all collections in a table - don't include hidden collections ever
   * - before and after have a simple internal navigation ToC
   * - 3 columns
   *   - {label} - calculate the most common label in the collections and use it
   *   - Name - module name
   * - Each collection starts with a "header row" with the name of the collection
   *
   * TODO
   * - put a proper responsive version in place and move the current into Claytons
   *
   */

  import { collectionsStore, configStore } from "../../stores";
  import {
    addUnallocatedModules,
    getModuleUrl,
    getCollectionCanvasModules,
  } from "./representationSupport";

  export let collection: string;
  export let claytons: boolean;

  if (!claytons) {
    claytons = false;
  }

  let labelHeader = "Week";

  // kludge to test reactive nature
  // set collection to currentCollection

  let modulesObj;
  let collectionsOrder = [];

  $: {
    // todo get all the modules, probably change way this function works
    modulesObj = getCollectionsTableModules();
    collectionsOrder = [
      "unallocated",
      ...$collectionsStore["COLLECTIONS_ORDER"],
    ];
  }

  /**
   * @function getCollectionsTableModules
   * @description Return an object that contains all modules organised into
   * the following attributes
   * - unallocated - all modules not allocated to a collection
   * - <collectionName> - one attribute for each collection with all the modules for that collection
   *
   */
  function getCollectionsTableModules(): object {
    let modulesObj = {
      unallocated: addUnallocatedModules(
        $collectionsStore["MODULES"],
        $configStore["editMode"]
      ),
    };

    // loop through all of the COLLECTIONS_ORDER
    // - create an attribute for that collection
    // - add all the modules for that collection
    $collectionsStore["COLLECTIONS_ORDER"].forEach((collectionName) => {
      modulesObj[collectionName] = getCollectionCanvasModules(
        collectionName,
        $collectionsStore["MODULES"]
      );
    });

    return modulesObj;
  }
</script>

<div id="cc-collections-table">
  <div id="cc-collections-table-nav" style="width:100%; text-align:center; padding:1em;">
    [
    {#each collectionsOrder as collectionName}
      {#if collectionName !== "unallocated"}
        &nbsp;<a href="#collection-{collectionName}">{collectionName}</a>&nbsp; 
        {#if !(collectionsOrder.length - 1 === collectionsOrder.indexOf(collectionName))}|{/if}
      {/if}
    {/each}
    ]
  </div>
  <table
    class="ic-Table--hover-row ic-Table ic-Table--striped -ic-Table--condensed"
  >
    <thead>
      <tr>
        <th
          role="columnheader"
          scope="col"
          style="width: 10%; background-color: #c02123;"
        >
          <span style="color: #ffffff;">{labelHeader}</span></th
        >
        <th
          role="columnheader"
          scope="col"
          style="width: 40%; background-color: #c02123;"
        >
          <span style="color: #ffffff;">Title</span></th
        >
        <th
          role="columnheader"
          scope="col"
          style="width: 50%; background-color: #c02123;"
        >
          <span style="color: #ffffff;">Description</span></th
        >
      </tr>
    </thead>
    <tbody>
      {#each collectionsOrder as collectionName}
        {#if collectionName !== "unallocated"}
          <tr style="background:white;">
            <td
              style="vertical-align: top: padding:0.5rem;"
              role="cell"
              colspan="3"
            >
              <h3 id="collection-{collectionName}">{collectionName}</h3>
            </td>
          </tr>
        {/if}

        {#each modulesObj[collectionName] as module}
          <tr>
            <td role="cell" style="vertical-align:top; padding: 0.5rem;">
              <div style="margin:0;">
                <p>{$collectionsStore["MODULES"][module.id].actualNum}</p>
              </div>
            </td>
            <td role="cell" style="vertical-align:top; padding: 0.5rem;">
              <div style="margin:0;">
                <p>
                  <a href={getModuleUrl(module.id)}>
                    {$collectionsStore["MODULES"][module.id].name}
                  </a>
                </p>
              </div>
            </td>
            <td role="cell" style="vertical-align:top; padding: 0.5rem;">
              <div style="margin:0;">
                {#if $configStore["editMode"] && !$collectionsStore["MODULES"][module.id].published}
                  <div class="cc-published">Unpublished</div>
                {/if}
                {#if $configStore["editMode"] && $collectionsStore["MODULES"][module.id].collection !== collectionName}
                  <div class="cc-unallocated">No collection allocated</div>
                {/if}
                <p>
                  {@html $collectionsStore["MODULES"][module.id].description}
                </p>
              </div>
            </td>
          </tr>
        {/each}
      {/each}
    </tbody>
  </table>
</div>

<style>
  .cc-published {
    background: rgb(255, 0, 0, 0.75);
    color: white;
    font-size: x-small;
    font-weight: bold;
    text-align: center;
    width: 100%;
    padding-bottom: 0.25em;
  }

  .cc-unallocated {
    background-color: #c02123;
    color: white;
    font-size: x-small;
    font-weight: bold;
    text-align: center;
    width: 100%;
  }
</style>