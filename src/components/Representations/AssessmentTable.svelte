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
    getModuleUrl,
    getRepresentationModules,
    generateModuleDate,
    addCalendarDate,
    checkModuleMetaData,
  } from "./representationSupport";

  export let collection: string;
  export let claytons: boolean;

  if (!claytons) {
    claytons = false;
  }

  let numWeighting = 0;
  let numLearningOutcomes = 0;

  let modules = getModulesData(collection, claytons);

  $: {
    if (collection === $configStore["currentCollection"]) {
      const changed = $configStore["currentCollectionChanged"];
      if (changed) {
        $configStore["currentCollectionChanged"] = false;
      }
      modules = getModulesData(collection, claytons);
    }
  }

  /*  function generateDate(module) {
    if (module.date) {
      if (
        module.date["week"] ||
        (module.date["month"] && module.date["date"])
      ) {
        module.date = addCalendarDate(module.date, calendar);
        return generateModuleDate(module);
      }
    }
  }*/

  function getModulesData(collection, claytons) {
    let moduleData = getRepresentationModules(
      collection,
      claytons,
      $collectionsStore["COLLECTIONS"][collection]["unallocated"]
    );

    // count the number of modules that have weighting and learning outcomes
    moduleData.forEach((module) => {
      if (
        $collectionsStore["MODULES"][module.id].hasOwnProperty("metadata") &&
        $collectionsStore["MODULES"][module.id]["metadata"].hasOwnProperty(
          "weighting"
        ) &&
        $collectionsStore["MODULES"][module.id]["metadata"]["weighting"] !== ""
      ) {
        numWeighting++;
      }
      if (
        $collectionsStore["MODULES"][module.id].hasOwnProperty("metadata") &&
        $collectionsStore["MODULES"][module.id]["metadata"].hasOwnProperty(
          "learning outcomes"
        ) &&
        $collectionsStore["MODULES"][module.id]["metadata"][
          "learning outcomes"
        ] !== ""
      ) {
        numLearningOutcomes++;
      }
    });
    return moduleData;
  }

  /** Define the tooltip text and URLS*/
  const HELP = {
    TITLE: {
      tooltip: `<p>Will automatically use the names of modules allocated to this collection.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/representations/assessment-table/#title",
    },
    DESCRIPTION: {
      tooltip: `<p>The Canvas Collections' description you added for the relevant module.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/representations/assessment-table/#description",
    },
    WEIGHTING: {
      tooltip: `<p>Specified by the module's metadata variable <strong>weighting</strong>.</p>
      <p>If no module has a weighting, this column will not be displayed.</p>
      `,
      url: "https://djplaner.github.io/canvas-collections/reference/representations/assessment-table/#weighting-and-learning-outcomes",
    },
    DUE_DATE: {
      tooltip: `<p>Specified using the module's Canvas Collection date (range).</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/representations/assessment-table/#due-date",
    },
    LEARNING_OUTCOMES: {
      tooltip: `<p>Specified by the module's metadata variable <strong>learning outcomes</strong>.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/representations/assessment-table/#weighting-and-learning-outcomes",
    },
  };
</script>

{#if claytons}
  <div id="cc-assessment-table">
    <table
      class="ic-Table--hover-row ic-Table ic-Table--striped -ic-Table-condensed cc-table"
    >
      <thead>
        <tr>
          <th
            role="columnheader"
            scope="col"
            style="background-color: #c02123;"
            class="cc-title-col"
          >
            <span style="color: #ffffff;">Title</span>
          </th>
          <th
            role="columnheader"
            scope="col"
            style="background-color: #c02123; width: 20rem;"
            class="cc-description-col"
          >
            <span style="color: #ffffff;">Description</span></th
          >
          {#if numWeighting > 0}
            <th
              role="columnheader"
              scope="col"
              style="background-color: #c02123;"
              class="cc-weighting-col"
            >
              <span style="color: #ffffff;">Weighting</span></th
            >
          {/if}
          <th
            role="columnheader"
            scope="col"
            style="background-color: #c02123;"
            class="cc-due-date-col"
          >
            <span style="color: #ffffff;">Due Date</span></th
          >
          {#if numLearningOutcomes}
            <th
              role="columnheader"
              scope="col"
              style="background-color: #c02123;"
              class="cc-learning-outcomes-col"
            >
              <span style="color: #ffffff;">Learning Outcomes</span></th
            >
          {/if}
        </tr>
      </thead>
      <tbody>
        {#each modules as module}
          <tr>
            <td
              role="cell"
              style="display: table-cell; text-align:left; vertical-align:top;"
            >
              <div style="margin:0; font-size:0.8rem">
                <p>
                  {#if !$collectionsStore["MODULES"][module.id].fyi}
                    <a href={getModuleUrl(module.id)}>
                      {@html $collectionsStore["MODULES"][module.id].name}
                    </a>
                  {:else}
                    {@html $collectionsStore["MODULES"][module.id].name}
                  {/if}
                </p>
              </div>
            </td>
            <td
              role="cell"
              style="display:table-cell; text-align:left; vertical-align:top;"
            >
              {#if $configStore["editMode"] && !claytons && !$collectionsStore["MODULES"][module.id].published}
                <div class="cc-published">Unpublished</div>
              {/if}
              {#if $configStore["editMode"] && !claytons && $collectionsStore["MODULES"][module.id].collection !== collection}
                <div class="cc-unallocated">No collection allocated</div>
              {/if}
              <div style="margin:0; font-size:0.8rem">
                <p>
                  {@html $collectionsStore["MODULES"][module.id].description}
                </p>
              </div>
            </td>
            {#if numWeighting > 0}
              <td
                role="cell"
                style="display:table-cell; text-align:left; vertical-align:top;"
              >
                <div style="margin:0; font-size:0.8rem">
                  <p>
                    {checkModuleMetaData(
                      $collectionsStore["MODULES"][module.id],
                      "weighting",
                      $configStore["editMode"],
                      claytons
                    )}
                  </p>
                </div>
              </td>
            {/if}
            <td
              role="cell"
              style="display:table-cell; text-align: left; vertical-align:top"
            >
              <div style="margin:0; font-size:0.8rem">
                <p>
                  {@html generateModuleDate(
                    $collectionsStore["MODULES"][module.id]
                  )}
                </p>
              </div>
            </td>
            {#if numLearningOutcomes}
              <td
                role="cell"
                style="display:table-cell; text-align: left; vertical-align:top"
              >
                <div style="margin:0; font-size:0.8rem">
                  <p>
                    {checkModuleMetaData(
                      $collectionsStore["MODULES"][module.id],
                      "learning outcomes",
                      $configStore["editMode"],
                      claytons
                    )}
                  </p>
                </div>
              </td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <div
    id="cc-assessment-table"
    class="cc-assessment-container cc-representation cc-table"
  >
    {#if $configStore["editMode"] && modules.length === 0}
      <div class="cc-no-modules">
        <p>No modules have been added to this collection.</p>
      </div>
    {/if}
    <table class="cc-responsive-table">
      <!-- <caption></caption> -->
      <thead>
        <tr class="cc-title-col">
          <th role="columnheader" scope="col"
            ><span class="cc-table-header-text">Title</span>
            {#if $configStore["editMode"]}
              <sl-tooltip>
                <div slot="content">{@html HELP.TITLE.tooltip}</div>
                <a
                  id="cc-about-basic-module-collection"
                  href={HELP.TITLE.url}
                  target="_blank"
                  rel="noreferrer"
                  class="cc-module-link"
                >
                  <i
                    class="cc-table-header-icon icon-question cc-module-icon"
                  />
                </a>
              </sl-tooltip>
            {/if}
          </th>
          <th role="columnheader" class="cc-description-col" scope="col"
            ><span class="cc-table-header-text">Description</span>
            {#if $configStore["editMode"]}
            <sl-tooltip>
              <div slot="content">{@html HELP.DESCRIPTION.tooltip}</div>
              <a
                id="cc-about-basic-module-collection"
                href={HELP.DESCRIPTION.url}
                target="_blank"
                rel="noreferrer"
                class="cc-module-link"
              >
                <i
                  class="cc-table-header-icon icon-question cc-module-icon"
                />
              </a>
            </sl-tooltip>
          {/if}

            </th>
          {#if numWeighting > 0}
            <!-- && !$configStore["editMode"]} -->
            <th role="columnheader" class="cc-weighting-col" scope="col"
              ><span class="cc-table-header-text">Weighting</span>
              {#if $configStore["editMode"]}
              <sl-tooltip>
                <div slot="content">{@html HELP.WEIGHTING.tooltip}</div>
                <a
                  id="cc-about-basic-module-collection"
                  href={HELP.WEIGHTING.url}
                  target="_blank"
                  rel="noreferrer"
                  class="cc-module-link"
                >
                  <i
                    class="cc-table-header-icon icon-question cc-module-icon"
                  />
                </a>
              </sl-tooltip>
            {/if}

              </th
            >
          {/if}
          <th role="columnheader" scope="col" class="cc-due-date-col"
            ><span class="cc-table-header-text">Due Date</span>
            {#if $configStore["editMode"]}
            <sl-tooltip>
              <div slot="content">{@html HELP.DUE_DATE.tooltip}</div>
              <a
                id="cc-about-basic-module-collection"
                href={HELP.DUE_DATE.url}
                target="_blank"
                rel="noreferrer"
                class="cc-module-link"
              >
                <i
                  class="cc-table-header-icon icon-question cc-module-icon"
                />
              </a>
            </sl-tooltip>
          {/if}

            </th
          >
          {#if numLearningOutcomes > 0}
            <!--&& !$configStore["editMode"]} -->
            <th role="columnheader" scope="col" class="cc-learning-outcomes-col"
              ><span class="cc-table-header-text">Learning Outcomes</span>
              {#if $configStore["editMode"]}
              <sl-tooltip>
                <div slot="content">{@html HELP.LEARNING_OUTCOMES.tooltip}</div>
                <a
                  id="cc-about-basic-module-collection"
                  href={HELP.LEARNING_OUTCOMES.url}
                  target="_blank"
                  rel="noreferrer"
                  class="cc-module-link"
                >
                  <i
                    class="cc-table-header-icon icon-question cc-module-icon"
                  />
                </a>
              </sl-tooltip>
            {/if}

              </th
            >
          {/if}
        </tr>
      </thead>
      <tbody>
        {#each modules as module}
          <tr>
            <td role="cell">
              <span class="cc-responsive-table__heading" aria-hidden="true"
                >Title</span
              >
              <div class="cc-table-cell-text">
                <p>
                  {#if !$collectionsStore["MODULES"][module.id].fyi}
                    <a href={getModuleUrl(module.id)}>
                      {$collectionsStore["MODULES"][module.id].name}
                    </a>
                  {:else}
                    {$collectionsStore["MODULES"][module.id].name}
                  {/if}
                </p>
              </div>
            </td>
            <td role="cell" class="descriptionCell">
              <span class="cc-responsive-table__heading" aria-hidden="true"
                >Description</span
              >
              {#if $configStore["editMode"] && $collectionsStore["MODULES"][module.id].collection !== collection}
                <div class="cc-unallocated">No collection allocated</div>
              {/if}
              <div class="cc-table-cell-text">
                <p>
                  {@html $collectionsStore["MODULES"][module.id].description}
                </p>
              </div>
              {#if $collectionsStore["MODULES"][module.id].fyi}
                {#if $collectionsStore["MODULES"][module.id].fyiText !== "" || $configStore["editMode"]}
                  <div class="cc-card-fyi">
                    <span class="cc-fyi-text">
                      {#if $collectionsStore["MODULES"][module.id].fyiText}
                        {@html $collectionsStore["MODULES"][module.id].fyiText}
                      {:else}
                        (<em>FYI, no FYI text</em>
                      {/if}
                    </span>
                  </div>
                {/if}
              {/if}
              {#if $configStore["editMode"] && !$collectionsStore["MODULES"][module.id].published}
                <div class="cc-published">Unpublished</div>
              {/if}
            </td>
            {#if numWeighting > 0}
              <!-- && !$configStore["editMode"]} -->
              <td role="cell">
                <span class="cc-responsive-table__heading" aria-hidden="true"
                  >Weighting</span
                >
                <div class="cc-table-cell-text">
                  <p>
                    {checkModuleMetaData(
                      $collectionsStore["MODULES"][module.id],
                      "weighting",
                      $configStore["editMode"]
                    )}
                  </p>
                </div>
              </td>
            {/if}
            <td role="cell">
              <span class="cc-responsive-table__heading" aria-hidden="true"
                >Due Date</span
              >
              <div class="cc-table-cell-text">
                <p>
                  {generateModuleDate($collectionsStore["MODULES"][module.id])}
                </p>
              </div>
            </td>
            {#if numLearningOutcomes > 0}
              <!-- && !$configStore["editMode"]} -->
              <td role="cell">
                <span class="cc-responsive-table__heading" aria-hidden="true"
                  >Learning Outcomes</span
                >
                <div class="cc-table-cell-text">
                  <p>
                    {checkModuleMetaData(
                      $collectionsStore["MODULES"][module.id],
                      "learning outcomes",
                      $configStore["editMode"]
                    )}
                  </p>
                </div>
              </td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

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

  /*  .cc-assessment-container caption {
    font-size: 0.5em;
    font-weight: 700;
    text-align: left;
  } */

  td.descriptionCell {
    width: 20rem;
  }

  .cc-assessment-container th {
    border-bottom: 1px solid #bfc1c3;
    font-size: 1em;
    padding: 0.5em 1em 0.5em 0;
    vertical-align: top;
    text-align: left;
    background-color: #c02123;
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

  .cc-table-header-icon {
    color: #fff;
    background-color: #c02123;
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

  /*  .cc-assessment-table-fyi-text {
    width: 100%;
    padding: 0.25rem;
    font-size: x-small;
    text-align: center;
    color: white;
    background: black;
  } */

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

  .cc-table {
    table-layout: fixed;
  }

  .cc-title-col {
    width: 20%;
  }

  .cc-description-col {
    width: 40%;
  }

  .cc-weighting-col {
    width: 10%;
  }

  .cc-due-date-col {
    width: 15%;
  }

  .cc-learning-outcomes-col {
    width: 10%;
  }

  .cc-card-fyi {
    background: rgba(0, 0, 0, 0.75);
    color: white;
    font-size: x-small;
    text-align: center;
  }

  sl-tooltip {
    text-align: left;
    white-space: normal;
  }
</style>

