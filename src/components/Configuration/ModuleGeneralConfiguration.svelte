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
  import { debug } from "../../lib/debug";

  import { onMount } from "svelte";
  import Editor from "cl-editor/src/Editor.svelte";

  export let moduleId: Number;

  let html = $collectionsStore["MODULES"][moduleId].description;

  debug("__ ModuleGeneralConfiguration.svelte __");

  onMount(() => {
    const editorId = `cc-module-config-${module}-description`;
    let editorElem = document.getElementById(editorId);
    if (editorElem) {
      editorElem.onkeydown = (e) => e.stopPropagation();
    }
  });
</script>

<div class="cc-module-config-detail">
  <div class="cc-collection-description">
    <a
      id="cc-about-basic-module-collection"
      href="https://djplaner.github.io/canvas-collections/walk-throughs/new/configure-modules/#allocate-the-modules"
      target="_blank"
      rel="noreferrer"
      class="cc-module-link"
    >
      <i class="icon-question cc-module-icon" />
    </a>
    <label for="cc-module-config-{moduleId}-collection">Collection</label>
    <input
      type="text"
      id="cc-module-config-{moduleId}-collection"
      name="cc-module-config-{moduleId}-collection"
      value={$collectionsStore["MODULES"][moduleId].collection}
    />
  </div>
</div>
<div class="cc-collection-description" style="margin-top: 0.5em">
  <a
    target="_blank"
    rel="noreferrer"
    href="https://djplaner.github.io/canvas-collections/reference/objects/overview/#fyi-objects"
    class="cc-module-link"
  >
    <i class="icon-question cc-module-icon" /></a
  >
  <label for="cc-module-config-{moduleId}-fyi">FYI</label>
  <span class="cc-config-autonum">
    <input
      type="checkbox"
      id="cc-module-config-{moduleId}-fyi"
      bind:checked={$collectionsStore["MODULES"][moduleId].fyi}
      style="position:relative; top:-0.25rem; "
    />
  </span>
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
</div>

<div class="cc-collection-description">
  <a
    id="cc-about-module-description"
    href="https://djplaner.github.io/canvas-collections/reference/objects/overview/#description"
    target="_blank"
    rel="noreferrer"
    class="cc-module-link"
  >
    <i class="icon-question cc-module-icon" />
  </a>
  <label for="cc-module-config-{moduleId}-description">Description</label>

  <Editor
    {html}
    contentId="cc-module-config-{moduleId}-description"
    on:change={(evt) => {
      $collectionsStore["MODULES"][moduleId].description = evt.detail;
      $configStore["needToSaveCollections"] = true;
    }}
  />
</div>
<div class="cc-collection-description" style="margin-top: 0.5rem">
  <a
    target="_blank"
    rel="noreferrer"
    href="https://djplaner.github.io/canvas-collections/reference/objects/overview/#enage-button"
    class="cc-module-link"
  >
    <i class="icon-question cc-module-icon" /></a
  >
  <label for="cc-module-config-{moduleId}-engage">Engage</label>
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
</div>

<style>
</style>
