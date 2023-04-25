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
   * Implement the tabbed interface that allows for the configuration of
   * the to and from dates for a specific module (prop: moduleId)
   *
   * TODO
   * - current study period (from UniversityDateCalendar)
   * - display the full string representation of the current dates
   * - show the current settings from from and to
   */

  import { modulesStore, collectionsStore, configStore } from "../../stores";
  import { calculateActualNum } from "../../lib/CollectionsDetails";

  import { onMount } from "svelte";
  import Editor from "cl-editor/src/Editor.svelte";

  export let moduleId: Number;

  let html = $collectionsStore["MODULES"][moduleId].description;

  onMount(() => {
    const editorId = `cc-module-config-${moduleId}-description-editor`;
    let editorElem = document.getElementById(editorId);
    if (editorElem) {
      editorElem.onkeydown = (e) => {
        e.stopPropagation();
      };
      // stop propagation on the HTML view editor (the text areas)
      // TODO this attempt to pass along doesn't work
      // Canvas sentry.io causes problem
      // TODO fix this more #180
      let textareaElem = editorElem.nextElementSibling;
      if (textareaElem) {
        textareaElem.onkeydown = (e) => {
          e.stopPropagation();
        };
      }
    }
  });

  /**
   * @function switchAutoNum
   * @description called when the autonum is toggled on/off needs to
   * In theory, the value has already been changed
   * - call calculateActualNum
   * - set needToSaveCollections to true
   */

  function switchAutoNum() {
    $collectionsStore["MODULES"][moduleId].autonum =
      !$collectionsStore["MODULES"][moduleId].autonum;
    calculateActualNum($modulesStore, $collectionsStore["MODULES"]);

    $configStore["needToSaveCollections"] = true;
  }

  /**
   * @function changeCollectionAllocation
   * @param {Event} e
   * @description called when the collection allocation is changed
   * - modify the modules collection based on the value of the select
   * - call calculateActualNum
   * - set needToSaveCollections to true
   */

  function changeCollectionAllocation(e: Event) {
    $collectionsStore["MODULES"][moduleId].collection = e.target.value
    calculateActualNum($modulesStore, $collectionsStore["MODULES"])
    $configStore["currentCollectionChanged"] = true

    $configStore["needToSaveCollections"] = true;
  }

  /**
   * @function trimLabel
   * @param e
   * @description Whenvever label has been changed be sure to trim whitespace
   * from the end of the string
   * - and probably need to rerun auto allocation 
   */
  function trimLabel(e: Event) {
    // trim whitespace from the end of $collectionsStore["MODULES"][moduleId].label
    $collectionsStore["MODULES"][moduleId].label = e.target.value.trimEnd();
    calculateActualNum($modulesStore, $collectionsStore["MODULES"]);

    $configStore["needToSaveCollections"] = true;

  }

  const HELP = {
    configCollection: {
      tooltip: `To which of the available collections does this module belong?`,
      url: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/general/#collection",
    },
    configFYI: {
      tooltip: `<p>Represent the module as a "for your information" (fyi) object. Only display collection related information.
		Display no information about the corresponding module. Always display the object, even when the module is unpublished.</p>
		<p>Optionally, provide some text to add to the representation.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/general/#fyi-objects",
    },
    configDescription: {
      tooltip: `Describe why, what or how the module relates to the students' learning`,
      url: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/general/#description",
    },
    configEngage: {
      tooltip: `For cards representations, specify <ol> <li> if there will be an "engage" button; and, </li> <li> what the button text will be. </li> </ol>`,
      url: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/general/#engage-button",
    },
    configLabel: {
      tooltip: `Describe the type of object the module represents (e.g. lecture, theme etc.)`,
      url: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/general/#label",
    },
    configAutoNum: {
      tooltip: `If and how a label specific number will be calculated for the module 
		(e.g. <em>Lecture 1</em> or <em>Workshop 5</em>)<p>Auto number or specify a value.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/general/#labels-and-numbers",
    },
  };
</script>

<div class="cc-module-row">
  <div class="cc-module-col">
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-collection">Collection</label>
        <sl-tooltip>
          <div slot="content">{@html HELP.configCollection.tooltip}</div>
          <a
            id="cc-about-basic-module-collection"
            href={HELP.configCollection.url}
            target="_blank"
            rel="noreferrer"
            class="cc-module-link"
          >
            <i class="icon-question cc-module-icon" />
          </a>
        </sl-tooltip>
      </span>
      <span class="cc-module-input">
        <select
          id="cc-module-config-{moduleId}-collection"
          value={$collectionsStore["MODULES"][moduleId].collection}
          on:change={(e) => changeCollectionAllocation(e)}
        >
          <option value="">Unallocated</option>
          {#each $collectionsStore["COLLECTIONS_ORDER"] as collectionName}
            <option value={collectionName}>{collectionName}</option>
          {/each}
        </select>
      </span>
    </div>
  </div>
  <div class="cc-module-col">
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-fyi">FYI</label>
        <sl-tooltip>
          <div slot="content">{@html HELP.configFYI.tooltip}</div>
          <a
            target="_blank"
            rel="noreferrer"
            href={HELP.configFYI.url}
            class="cc-module-link"
          >
            <i class="icon-question cc-module-icon" /></a
          >
        </sl-tooltip>
        <span class="cc-config-autonum">
          <input
            type="checkbox"
            on:keydown|stopPropagation
            id="cc-module-config-{moduleId}-fyi"
            bind:checked={$collectionsStore["MODULES"][moduleId].fyi}
            on:change={() => ($configStore["needToSaveCollections"] = true)}
            style="position:relative; top:-0.25rem; "
          />
        </span>
      </span>
      <span class="cc-module-input">
        {#if $collectionsStore["MODULES"][moduleId].fyi}
          <input
            type="text"
            id="cc-module-config-{moduleId}-fyiText"
            bind:value={$collectionsStore["MODULES"][moduleId].fyiText}
            style="width:10rem;"
            on:change={() => ($configStore["needToSaveCollections"] = true)}
            on:keydown|stopPropagation
          />
        {:else}
          <input
            type="text"
            id="cc-module-config-{moduleId}-fyiText"
            value={$collectionsStore["MODULES"][moduleId].fyiText}
            style="width:10rem; "
            disabled
          />
        {/if}
      </span>
    </div>
  </div>
</div>

<div class="cc-module-row">
  <div class="cc-module-col">
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-label">Label </label>
        <sl-tooltip id="cc-about-module-label">
          <div slot="content">{@html HELP.configLabel.tooltip}</div>
          <a target="_blank" href={HELP.configLabel.url} rel="noreferrer">
            <i class="icon-question cc-module-icon" /></a
          >
        </sl-tooltip>
      </span>
      <span class="cc-module-form-input">
        <input
          type="text"
          id="cc-module-config-{moduleId}-label"
          style="width:10rem"
          bind:value={$collectionsStore["MODULES"][moduleId].label}
          on:change={trimLabel}
          on:keydown|stopPropagation
        />
      </span>
    </div>
  </div>
  <!-- col -->
  <div class="cc-module-col">
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-num">Number</label>
        <sl-tooltip>
          <div slot="content">{@html HELP.configAutoNum.tooltip}</div>
          <a target="_blank" href={HELP.configAutoNum.url} rel="noreferrer">
            <i class="icon-question cc-module-icon" /></a
          >
        </sl-tooltip>
        <span class="cc-config-autonum"
          >auto:
          <input
            type="checkbox"
            on:change|stopPropagation={switchAutoNum}
            checked={$collectionsStore["MODULES"][moduleId].autonum}
            on:keydown|stopPropagation
            id="cc-module-config-{moduleId}-autonum"
            style="position:relative; top:-0.25rem; "
          />
        </span>
      </span>
      <span class="cc-module-form-input">
        {#if $collectionsStore["MODULES"][moduleId].autonum}
          <input
            type="text"
            id="cc-module-config-{moduleId}-num"
            value={$collectionsStore["MODULES"][moduleId].actualNum}
            style="width:3rem;"
            disabled
          />
        {:else}
          <input
            type="text"
            id="cc-module-config-{moduleId}-num"
            bind:value={$collectionsStore["MODULES"][moduleId].actualNum}
            on:change={() =>
              ($configStore["needToSaveCollections"] = true)}
            on:keydown|stopPropagation
            style="width:3rem;"
          />
        {/if}
      </span>
    </div>
  </div>
</div>

<div class="cc-module-row">
  <div class="cc-module-col">
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-engage">Engage</label>
        <sl-tooltip>
          <div slot="content">{@html HELP.configEngage.tooltip}</div>

          <a
            target="_blank"
            rel="noreferrer"
            href={HELP.configEngage.url}
            class="cc-module-link"
          >
            <i class="icon-question cc-module-icon" /></a
          >
        </sl-tooltip>
        <span class="cc-config-autonum">
          <input
            type="checkbox"
            id="cc-module-config-{moduleId}-engage"
            on:keydown|stopPropagation
            bind:checked={$collectionsStore["MODULES"][moduleId].engage}
            style="position:relative; top:-0.25rem; "
            on:click={() => ($configStore["needToSaveCollections"] = true)}
            on:keydown={() => ($configStore["needToSaveCollections"] = true)}
          />
        </span>
      </span>
      <span class="cc-module-input">
        {#if !$collectionsStore["MODULES"][moduleId].engage}
          <input
            type="text"
            id="cc-module-config-{moduleId}-engageText"
            bind:value={$collectionsStore["MODULES"][moduleId].engageText}
            style="width:10rem;"
            disabled
          />
        {:else}
          <input
            type="text"
            class="cc-module-config-engageText"
            id="cc-module-config-{moduleId}-engageText"
            bind:value={$collectionsStore["MODULES"][moduleId].engageText}
            style="width:10rem;"
            on:keydown|stopPropagation
            on:change={() =>
              ($configStore["needToSaveCollections"] = true)}
          />
        {/if}
      </span>
    </div>
  </div>
  <div class="cc-module-col" />
</div>

<div class="cc-module-config-description">
  <label for="cc-module-config-{moduleId}-description">Description</label>
  <sl-tooltip>
    <div slot="content">{@html HELP.configDescription.tooltip}</div>
    <a
      id="cc-about-module-description"
      href={HELP.configDescription.url}
      target="_blank"
      rel="noreferrer"
      class="cc-module-link"
    >
      <i class="icon-question cc-module-icon" />
    </a>
  </sl-tooltip>
</div>

<Editor
  {html}
  contentId="cc-module-config-{moduleId}-description-editor"
  on:change={(evt) => {
    $collectionsStore["MODULES"][moduleId].description = evt.detail;
    $configStore["needToSaveCollections"] = true;
  }}
/>

<style>
  .cc-module-config-description {
    padding: 0.5rem;
  }

  .cc-module-config-detail {
    padding: 0.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 1em;
    grid-auto-flow: row;
    grid-template-areas: ". .";
    height: 100%;
  }

  .cc-module-form {
    display: grid;
    grid-template-columns: 8em 1fr;
    grid-gap: 1em;
  }

  .cc-module-label {
    grid-column: 1/ 2;
    text-align: right;
    margin-top: 0.4em;
  }

  .cc-module-input {
    grid-column: 2/ 3;
  }

  .cc-module-input select,
  .cc-module-input input {
    width: 90%;
  }

  .cc-module-row {
  }
  .cc-module-row:after {
    content: "";
    display: table;
    clear: both;
  }

  .cc-module-col {
    float: left;
    width: 50%;
  }

  .cc-config-autonum {
    font-size: 0.7em;
  }

  sl-tooltip {
    text-align: left;
    white-space: normal;
  }
</style>
