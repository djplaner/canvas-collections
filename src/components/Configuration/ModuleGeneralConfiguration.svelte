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

  import { collectionsStore, configStore } from "../../stores";

  import { onMount } from "svelte";
  import Editor from "cl-editor/src/Editor.svelte";

  export let moduleId: Number;

  let html = $collectionsStore["MODULES"][moduleId].description;

  onMount(() => {
    const editorId = `cc-module-config-${moduleId}-description-editor`;
    let editorElem = document.getElementById(editorId);
    if (editorElem) {
      editorElem.onkeydown = (e) => e.stopPropagation();
    }
  });

  const HELP = {
    configCollection: {
      tooltip: `To which of the available collections does this module belong?`,
      url: "https://djplaner.github.io/canvas-collections/getting-started/configure/modules/#module-properties",
    },
    configFYI: {
      tooltip: `<p>Represent the module as a "for your information" (fyi) object. Only display collection related information.
		Display no information about the corresponding module. Always display the object, even when the module is unpublished.</p>
		<p>Optionally, provide some text to add to the representation.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#fyi-objects",
    },
    configDescription: {
      tooltip: `Describe why, what or how the module relates to the students' learning`,
      url: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#description",
    },
    configEngage: {
      tooltip: `For cards representations, specify <ol> <li> if there will be an "engage" button; and, </li> <li> what the button text will be. </li> </ol>`,
      url: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#enage-button",
    },
    configLabel: {
      tooltip: `Describe the type of object the module represents (e.g. lecture, theme etc.)`,
      url: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#enage-button",
    },
    configAutoNum: {
      tooltip: `If and how a label specific number will be calculated for the module 
		(e.g. <em>Lecture 1</em> or <em>Workshop 5</em>)<p>Auto number or specify a value.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#labels-and-numbers",
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
          bind:value={$collectionsStore["MODULES"][moduleId].collection}
        >
          {#if $collectionsStore["MODULES"][moduleId].collection === ""}
            <option value="" selected>Unallocated</option>
          {:else}
            <option value="">Unallocated</option>
          {/if}
          {#each $collectionsStore["COLLECTIONS_ORDER"] as collectionName}
            {#if $collectionsStore["MODULES"][moduleId].collection === collectionName}
              <option value={collectionName} selected>{collectionName}</option>
            {:else}
              <option value={collectionName}>{collectionName}</option>
            {/if}
          {/each}
        </select>

        <!--  value={$collectionsStore["MODULES"][moduleId].collection} -->
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
            id="cc-module-config-{moduleId}-fyi"
            bind:checked={$collectionsStore["MODULES"][moduleId].fyi}
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
            on:click={() => ($configStore["needToSaveCollections"] = true)}
            on:keydown|stopPropagation={() =>
              ($configStore["needToSaveCollections"] = true)}
          />
        {:else}
          <input
            type="text"
            id="cc-module-config-{moduleId}-fyiText"
            bind:value={$collectionsStore["MODULES"][moduleId].fyiText}
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
          on:click={() => ($configStore["needToSaveCollections"] = true)}
          on:keydown|stopPropagation={() =>
            ($configStore["needToSaveCollections"] = true)}
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
            bind:checked={$collectionsStore["MODULES"][moduleId].autonum}
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
            bind:value={$collectionsStore["MODULES"][moduleId].actualNum}
            on:click={() => ($configStore["needToSaveCollections"] = true)}
            on:keydown|stopPropagation={() =>
              ($configStore["needToSaveCollections"] = true)}
            style="width:3rem;"
            disabled
          />
        {:else}
          <input
            type="text"
            id="cc-module-config-{moduleId}-num"
            bind:value={$collectionsStore["MODULES"][moduleId].actualNum}
            on:click={() => ($configStore["needToSaveCollections"] = true)}
            on:keydown|stopPropagation={() =>
              ($configStore["needToSaveCollections"] = true)}
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
            on:click={() => ($configStore["needToSaveCollections"] = true)}
            on:keydown|stopPropagation={() =>
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
