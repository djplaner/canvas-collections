<script lang="ts">
  /**
   * Define the component for configuring and individual module
   * @property {Number} module - the module being configured
   * @property {Boolean} allocated - whether the module has been allocated to a collection
  */
  import { collectionsStore } from "../stores";
  import { onMount } from "svelte";

  import Editor from "cl-editor/src/Editor.svelte";

  import { debug } from "../lib/debug";

  export let module: Number;
  export let allocated: boolean

  debug(`______________ ModuleConfiguration.svelte - module ${module} allocated ${allocated} _______________`)

  let editor;
  let html = $collectionsStore["MODULES"][module].description;

  debug("-------- collectionsStore");
  debug($collectionsStore);

  onMount(() => {
    const editorId=`cc-module-config-${module}-description`
    let editorElem = document.getElementById(editorId);
    if (editorElem) {
      editorElem.onkeydown = (e) => e.stopPropagation();
    } else {
    }
  });

  /* 
    <textarea
      id="cc-module-config-{module}-XXdescription"
      name="cc-module-config-{module}-description"
      bind:value={$collectionsStore["MODULES"][module].description}
    />  */
</script>

<svelte:head>
  <link href="//cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet" />
</svelte:head>




<div class="cc-module-config border border-trbl" id="cc-module-config-{module}">
  {#if ! allocated}
  <div
    class="cc-module-no-collection"
    id="cc-module-config-no-collection-{module}"
  >
    No collection allocated
  </div>
  {/if}
  <span>
    <i id="cc-module-config-{module}-switch" class="icon-mini-arrow-right" />
    Configure Collections for
    <em>{$collectionsStore["MODULES"][module].name}</em>
    <a
      href="https://djplaner.github.io/canvas-collections/walk-throughs/new/configure-modules/"
      target="_blank"
      rel="noreferrer"
    >
      <i class="icon-question cc-module-icon" />
    </a>
  </span>

  <div class="cc-module-config-detail">
    <div class="cc-collection-description">
      <a
        id="cc-about-basic-module-collection"
        href="https://djplaner.github.io/canvas-collections/walk-throughs/new/configure-modules/#allocate-the-modules"
        target="_blank"
        rel="noreferrer"
      >
        <i class="icon-question cc-module-icon" />
      </a>
      <label for="cc-module-config-{module}-collection">Collection</label>
      <input
        type="text"
        id="cc-module-config-{module}-collection"
        name="cc-module-config-{module}-collection"
        value={$collectionsStore["MODULES"][module].collection}
      />
    </div>
  </div>
  <div class="cc-collection-description">
    <a
      id="cc-about-module-description"
      href="https://djplaner.github.io/canvas-collections/reference/objects/overview/#description"
      target="_blank"
      rel="noreferrer"
    >
      <i class="icon-question cc-module-icon" />
    </a>
    <label for="cc-module-config-{module}-XXdescription">Description</label>

    <Editor
      {html}
      contentId="cc-module-config-{module}-description"
      on:change={(evt) =>
        ($collectionsStore["MODULES"][module].description = evt.detail)}
    />
  </div>
</div>

<style>
  .cc-module-config {
    padding: 1em;
    font-size: smaller;
    margin: 0;
  }

  .cc-module-no-collection {
    float: right;
    background: red;
    color: white;
    border-radius: 0.25rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .cc-module-config-collection-representation label {
    width: 5rem;
    font-size: 0.8rem;
    /*font-weight: bold; */
  }
  .cc-module-config-collection-representation input {
    font-size: 0.8rem;
  }
  .cc-module-config-detail {
    padding: 0.5rem;
  }
  .cc-preview-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .cc-module-icon {
    position: relative;
    top: -0.2rem;
  }

  .cc-preview-container .cc-card {
    min-width: 50%;
  }

  .cc-calculated-date {
    font-size: 0.8rem;
    background-color: #eee;
    padding: 0.5rem;
    margin-left: 3rem;
    margin-top: 0.5rem;
  }

  .cc-current-studyPeriod {
    font-size: 0.7rem;
    display: inline;
    margin-left: 2rem;
  }

  sl-tab {
    font-size: var(--sl-font-size-small);
  }
</style>
