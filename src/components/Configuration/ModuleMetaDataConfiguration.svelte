<script lang="ts">
  /**
   * Implement the module configuration interface for meta data. A method
   * to add, delete and modify a list of name/value pairs
   *
   * TODO
   * - Add some ability to vary the type of meta data (e.g. html etc)
   */
  import sanitizeHtml from "sanitize-html";

  import { collectionsStore, configStore } from "../../stores";
  import { debug } from "../../lib/debug";

  export let moduleId: Number;

  let readyToAdd = true;

  debug(
    "!!!!!!!!!!!!!!!!!!! ModuleMetaDataConfiguration.svelte !!!!!!!!!!!!!!!!!!!!!!!"
  );
  debug(`Module ID: ${moduleId}`);
  debug($collectionsStore["MODULES"][moduleId]);
  debug($collectionsStore["MODULES"][moduleId].metadata);

  /**
   * @function addMetaData
   * @description Add a new name/value pair to the metadata for the module, including
   * - ignore empty name and value
   * - check for duplicate name, don't add
   * TODO
   * - sanitize the name and value
   *
   */
  function addMetaData(event: Event) {
    const name = document.getElementById(
      `cc-module-config-${moduleId}-metadata-add-name`
    ) as HTMLInputElement;
    const value = document.getElementById(
      `cc-module-config-${moduleId}-metadata-add-value`
    ) as HTMLInputElement;

    if (name.value === "" || value.value === "") {
      alert("Name and value must have values before adding");
      return;
    }

    // check for duplicate of existing name
    if (
      $collectionsStore["MODULES"][moduleId].metadata.hasOwnProperty([
        name.value,
      ])
    ) {
      alert(
        `There already exists a metadata entry with the name ${name.value}`
      );
      return;
    }

    // do some sanitisation of the HTML https://github.com/apostrophecms/sanitize-html
    const sanitisedValue = sanitizeValue(value.value);

    $collectionsStore["MODULES"][moduleId].metadata[name.value] =
      sanitisedValue;
    $configStore["needToSaveCollections"] = true;

    name.value = "";
    value.value = "";

    // set focus back to the name field
    name.focus();
  }

  /**
   * @function sanitizeValue
   * @param {string} value - the value to be sanitised
   * @returns {string} - the sanitised value
   * @description Allow HTML, including iframes but do other sanity checks
   */
  function sanitizeValue(value: string) {
    let allowedTags = sanitizeHtml.defaults.allowedTags;
    let allowedAttributes = {};
    allowedTags = allowedTags.concat("iframe");
    allowedAttributes = {
      iframe: ["src", "width", "height", "frameborder", "allowfullscreen"],
    };
    return sanitizeHtml(value, {
      allowedTags: allowedTags,
      allowedAttributes: allowedAttributes,
    });
  }

  /**
   * @function readyToAdd
   * @description Check if the name and value fields have values and
   * are ready to add a new metadata entry
   */
  function isReadyToAdd() {
    const name = document.getElementById(
      `cc-module-config-${moduleId}-metadata-add-name`
    ) as HTMLInputElement;
    const value = document.getElementById(
      `cc-module-config-${moduleId}-metadata-add-value`
    ) as HTMLInputElement;

    if (name.value === "" || value.value === "") {
      return true;
    }

    return false;
  }

  /**
   * @function deleteMetaData
   * @param {string} key - the name of the metadata entry to delete
   * @description Delete a metadata entry
   */

  function deleteMetaData(key: string) {
    // check if they really want to delete
    const moduleName = $collectionsStore["MODULES"][moduleId].name;
    if (
      !confirm(
        `Are you sure you want to delete the metadata entry 
    ${key} 
for the module 
    ${moduleName}`
      )
    ) {
      return;
    }
    let metadata = $collectionsStore["MODULES"][moduleId].metadata;
    delete metadata[key];
    debug(metadata);

    $collectionsStore["MODULES"][moduleId].metadata = metadata;
    debug(`global metadata`);
    debug($collectionsStore["MODULES"][moduleId].metadata);
    $configStore["needToSaveCollections"] = true;
  }
</script>

<div class="cc-module-config-additional-metadata border border-trbl">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Value</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td
          ><input
            type="text"
            id="cc-module-config-{moduleId}-metadata-add-name"
            pattern={String.raw`[^"]`}
            on:keydown|stopPropagation
            on:keyup={() => (readyToAdd = isReadyToAdd())}
          /></td
        >
        <td
          ><input
            type="text"
            id="cc-module-config-{moduleId}-metadata-add-value"
            on:keydown|stopPropagation
            on:keyup={() => (readyToAdd = isReadyToAdd())}
          /></td
        >
        <td
          ><button
            disabled={readyToAdd}
            on:click={addMetaData}
            id="cc-module-config-{moduleId}-metadata-add"
            class="cc-module-config-metadata-add">Add</button
          ></td
        >
      </tr>

      {#each Object.entries($collectionsStore["MODULES"][moduleId].metadata) as [key, value]}
        <tr>
          <td>
            <input
              type="text"
              id="cc-module-config-{moduleId}-metadata-{key}-name"
              on:keydown|stopPropagation
              value={key}
              pattern={String.raw`[^"]`}
            />
          </td>
          <td>
            <input
              type="text"
              id="cc-module-config-{moduleId}-metadata-{key}-value"
              bind:value={$collectionsStore["MODULES"][moduleId].metadata[key]}
              on:click={() => ($configStore["needToSaveCollections"] = true)}
              on:keydown|stopPropagation
              on:keyup={() => ($configStore["needToSaveCollections"] = true)}
            />
          </td>
          <td>
            <i
              on:click={deleteMetaData(key)}
              on:keydown={deleteMetaData(key)}
              class="icon-trash cc-delete-metadata"
              id="cc-module-config-{moduleId}-metadata-{key}-delete"
            />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .cc-delete-metadata {
    cursor: pointer;
  }

  .cc-module-config-additional-metadata {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  th {
    padding: 0.5rem;
    font-size: 0.8rem;
  }

  td {
    padding: 0.5rem;
    margin: 0.5rem;
  }
</style>
