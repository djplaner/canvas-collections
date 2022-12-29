<script lang="ts">
  /**
   * AssessmentTable
   * - Accessible table for assessment information
   * - 5 columns
   *   - Title - module title
   *   - Description - Collections module description
   *   - Weighting - additional meta data "weighting"
   *   - Due Date - Collections module date information
   *   - Learning Outcomes - additional meta data "learning outcomes"
   *
   * 1. Identify the list of modules contained within the collection
   */

  import { collectionsStore, modulesStore, configStore } from "../../stores";
  import {
    getCollectionModuleIds,
    modifyCanvasModulesList,
    generateModuleDate,
    checkModuleMetaData,
  } from "./representationSupport.ts";

  export let collection: string;

  // kludge to test reactive nature
  // set collection to currentCollection
  // TODO - this isn't right, the prop isn't being dynamically updated
  //collection = $configStore['currentCollection'];

  let moduleIds;
  $: {
    moduleIds = getCollectionModuleIds(
      collection,
      $collectionsStore["MODULES"]
    );
    modifyCanvasModulesList(moduleIds, $collectionsStore["MODULES"]);
  }

  /** TODO
   * Finish generate module date
   * 1. calculate the module URL for module-ID
   * 2. If not in edit mode, need to exclude modules that are not published
   */
</script>

<h3>This is the Assessment table representation - collection {collection}</h3>

<div id="cc-assessment-table" class="cc-assessment-container cc-representation">
  <table class="cc-responsive-table" role="table">
    <!-- <caption></caption> -->
    <thead role="rowgroup">
      <tr role="row">
        <th role="columnheader" scope="col"
          ><span class="cc-table-header-text">Title</span></th
        >
        <th role="columnheader" scope="col"
          ><span class="cc-table-header-text">Description</span></th
        >
        <th role="columnheader" scope="col"
          ><span class="cc-table-header-text">Weighting</span></th
        >
        <th role="columnheader" scope="col"
          ><span class="cc-table-header-text">Due Date</span></th
        >
        <th role="columnheader" scope="col"
          ><span class="cc-table-header-text">Learning Outcomes</span></th
        >
      </tr>
    </thead>
    <tbody>
      {#each moduleIds as moduleId}
        {#if !(!$collectionsStore["MODULES"][moduleId].published && !$configStore["editMode"])}
          <tr role="row">
            <td role="cell">
              <span class="cc-responsive-table__heading" aria-hidden="true"
                >Title</span
              >
              <div class="cc-table-cell-text">
                <p>
                  <a href="MODULE-ID">
                    {$modulesStore[moduleId].name}
                  </a>
                </p>
              </div>
            </td>
            <td role="cell" class="descriptionCell">
              <span class="cc-responsive-table__heading" aria-hidden="true"
                >Description</span
              >
              <div class="cc-table-cell-text">
                <p>{$collectionsStore["MODULES"][moduleId].description}</p>
              </div>
            </td>
            <td role="cell">
              <span class="cc-responsive-table__heading" aria-hidden="true"
                >Weighting</span
              >
              <div class="cc-table-cell-text">
                <p>
                  {checkModuleMetaData(
                    $collectionsStore["MODULES"][moduleId],
                    "weighting",
                    $configStore["editMode"]
                  )}
                </p>
              </div>
            </td>
            <td role="cell">
              <span class="cc-responsive-table__heading" aria-hidden="true"
                >Due Date</span
              >
              <div class="cc-table-cell-text">
                <p>
                  {generateModuleDate($collectionsStore["MODULES"][moduleId])}
                </p>
              </div>
            </td>
            <td role="cell">
              <span class="cc-responsive-table__heading" aria-hidden="true"
                >Learning Outcomes</span
              >
              <div class="cc-table-cell-text">
                <p>
                  {checkModuleMetaData(
                    $collectionsStore["MODULES"][moduleId],
                    "learning outcomes",
                    $configStore["editMode"]
                  )}
                </p>
              </div>
            </td>
          </tr>
        {/if}
      {/each}
    </tbody>
  </table>
</div>

<style>
  .cc-assessment-container {
    margin: auto;
    max-width: 90%;
  }

  /* Standard table styling, change as desired */
  .cc-assessment-container table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .cc-assessment-container caption {
    font-size: 0.5em;
    font-weight: 700;
    text-align: left;
  }

  td.descriptionCell {
    width: 20rem;
  }

  .cc-assessment-container th {
    border-bottom: 1px solid #bfc1c3;
    font-size: 1em;
    padding: 0.5em 1em 0.5em 0;
    vertical-align: top;
    text-align: left;
    background-color: #e03e2d;
    color: #fff;
    font-weight: bold;
  }

  .cc-assessment-container td {
    border-bottom: 1px solid #bfc1c3;
    font-size: 1em;
    padding: 0.5em; /*1em 0.5em 0; */
    vertical-align: top;
  }

  /* Responsive table styling */
  .cc-assessment-container .cc-responsive-table {
    margin-bottom: 0;
    width: 100%;
  }

  .cc-assessment-container thead {
    border: 0;
    clip: rect(0 0 0 0);
    -webkit-clip-path: inset(50%);
    clip-path: inset(50%);
    height: 1px;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .cc-assessment-container tbody tr {
    display: block;
    margin-bottom: 1.5em;
    padding: 0 0.5em;
  }

  .cc-assessment-container tr:nth-child(even) {
    background-color: rgb(245, 245, 245);
  }

  /*.cc-assessment-container tr:nth-child(odd) {
  background-color: rgb(128,);
}*/

  .cc-assessment-container tbody tr td {
    display: block; /* browsers that don't support flex */
    display: flex;
    justify-content: space-between;
    min-width: 1px;
    text-align: right;
  }

  @media all and (-ms-high-contrast: none) {
    /* IE11 flex fix */
    .cc-assessment-container tbody tr td {
      display: block;
    }
  }

  .cc-assessment-container .cc-responsive-table__heading {
    font-weight: 700;
    padding-right: 0.5em;
    text-align: left;
    word-break: initial;
  }

  @media (max-width: 768px) {
    .cc-assessment-container tbody tr td {
      padding-right: 0;
    }
    .cc-assessment-container tbody tr td:last-child {
      border-bottom: 0;
    }
    tbody tr {
      /*.cc-assessment-container border-bottom: 3px solid grey; */
      border-bottom: 3px solid grey;
    }
  }

  @media (min-width: 769px) {
    .cc-assessment-container thead {
      clip: auto;
      -webkit-clip-path: none;
      clip-path: none;
      display: table-header-group;
      height: auto;
      overflow: auto;
      position: relative;
      width: auto;
    }

    .cc-assessment-container tbody tr {
      display: table-row;
    }

    .cc-assessment-container tbody tr td {
      display: table-cell;
      text-align: left;
    }

    .cc-assessment-container .cc-responsive-table__heading {
      display: none;
    }
  }

  .cc-table-header-text {
    margin-left: 0.5rem;
  }

  .cc-table-cell-text {
    margin: 0;
    font-size: 0.8rem;
  }

  .cc-table-cell-text > p {
    margin: 0.5rem;
    font-size: 0.8rem;
  }

  #cc-assessment-table {
    margin-top: 0.5rem !important;
  }

  .cc-assessment-table-fyi-text {
    width: 100%;
    padding: 0.25rem;
    font-size: x-small;
    text-align: center;
    color: white;
    background: black;
  }
</style>
