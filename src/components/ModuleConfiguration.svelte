<script lang="ts">
  import { collectionsStore } from "../stores";
  import { quill } from "svelte-quill";
   import { onMount } from "svelte";

  const options = {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["link", "code-block"],
      ],
    },
    placeholder: "Type something...",
    theme: "snow",
  };

  export let module: Number;
  let quillInstance;

  console.log("-------- collectionsStore");
  console.log($collectionsStore);
    /* 
    <textarea
      id="cc-module-config-{module}-XXdescription"
      name="cc-module-config-{module}-description"
      bind:value={$collectionsStore["MODULES"][module].description}
    />  */

    onMount( () => {
      const editorDiv = document.getElementById(`cc-module-config-${module}-description`)
      console.log(editorDiv)
      quillInstance = quill(editorDiv, options)
      console.log(quillInstance)
      quillInstance.setText($collectionsStore["MODULES"][module].description)
    })
</script>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</svelte:head>

<div class="cc-module-config border border-trbl" id="cc-module-config-{module}">
  <div
    class="cc-module-no-collection"
    id="cc-module-config-no-collection-{module}"
  >
    No collection allocated
  </div>
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

    <div id="cc-module-config-{module}-description" />
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
    display: none;
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
