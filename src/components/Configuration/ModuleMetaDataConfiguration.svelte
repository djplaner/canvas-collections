<script lang="ts">
  /**
   * Implement the module configuration interface for meta data. A method
   * to add, delete and modify a list of name/value pairs
   *
   * TODO
   * - Add some ability to vary the type of meta data (e.g. html etc)
   */

  import { collectionsStore, configStore } from "../../stores";
  import { debug } from "../../lib/debug";

  export let moduleId: Number;

  debug(
    "!!!!!!!!!!!!!!!!!!! ModuleMetaDataConfiguration.svelte !!!!!!!!!!!!!!!!!!!!!!!"
  );
  debug(`Module ID: ${moduleId}`);
  debug($collectionsStore["MODULES"][moduleId]);
  debug($collectionsStore["MODULES"][moduleId].metadata);


  /** */
  function addMetaData(event: Event) {
	const name = document.getElementById(
	  `cc-module-config-${moduleId}-metadata-add-name`
	) as HTMLInputElement;
	const value = document.getElementById(
	  `cc-module-config-${moduleId}-metadata-add-value`
	) as HTMLInputElement;

	if (name.value === "" || value.value === "") {
	  debug("name or value is empty");
	  return;
	}

	$collectionsStore["MODULES"][moduleId].metadata[name.value]= value.value;
	$configStore["needToSaveCollections"] = true;

	name.value = "";
	value.value = "";
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
            pattern={String.raw`[^\"]`}
			on:keydown|stopPropagation
          /></td
        >
        <td
          ><input
            type="text"
            id="cc-module-config-{moduleId}-metadata-add-value"
          /></td
        >
        <td
          ><button
		    on:click={ () => addMetaData()}
            id="cc-module-config-${moduleId}-metadata-add"
            class="cc-module-config-metadata-add">Add</button
          ></td
        >
      </tr>

      {#each Object.entries($collectionsStore["MODULES"][moduleId].metadata) as [key, value]}
        <tr>
          <td>
            <input
              type="text"
              id="cc-module-config-{moduleId}-metadata-${key}-name"
              value={key}
              pattern={String.raw`[^\"]`}
            />
          </td>
          <td>
            <input
              type="text"
              id="cc-module-config-${moduleId}-metadata-${key}-value"
              bind:value={$collectionsStore["MODULES"][moduleId].metadata[key]}
              on:click={() => ($configStore["needToSaveCollections"] = true)}
              on:keydown|stopPropagation={() =>
                ($configStore["needToSaveCollections"] = true)}
            />
          </td>
          <td>
            <i class="icon-trash" />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
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
