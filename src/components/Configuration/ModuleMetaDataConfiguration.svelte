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

  import { toastAlert, ccConfirm } from "../../lib/ui";

  export let moduleId: Number;

  let readyToAdd = true;

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

    // Not required as the form action prevents either case
/*    if (name.value === "" || value.value === "") {
      if (name.value==="") {
        toastAlert("<p>A new meta data item must have a <em>name</em> to be added.</p>",
        "danger")
      }
      if (value.value) {
        toastAlert("<p>The <em>value</em> for the new meta data item is empty</p>",
        "warning" )
      }
      return; 
    } */

    // do some sanitisation of the HTML https://github.com/apostrophecms/sanitize-html
    // - value will be allowed HTML, including iframes
    // - name is not allowed HTML
    const sanitisedName = sanitize(name.value, false);
    const sanitisedValue = sanitize(value.value);

    // if the sanitised name is different to the original, warn the user
    // also warn if the sanitised name is empty
    if (sanitisedName !== name.value || sanitisedName === "") {
      ccConfirm(
        `<p>The new metadata name <xmp>${name.value}</xmp> has been sanitised 
          (removing/replacing forbidden characters) to <xmp>${sanitisedName}</xmp> 
(If the sanitised name is empty, the metadata item will not be added.)</p>
 <p>Are you happy to use the sanitised name?</p>`
      ).then((ok) => {
        if (!ok) {
          return;
        }
        if (sanitisedName === "") {
          return;
        }
        handleAddMetaData(name, value, sanitisedName, sanitisedValue);
      });
    } else {
      handleAddMetaData(name, value, sanitisedName, sanitisedValue);
    }
  }

  function handleAddMetaData(
    name: HTMLInputElement,
    value: HTMLInputElement,
    sanitisedName: string,
    sanitisedValue: string
  ) {
    // check for duplicate of existing name
    if (
      $collectionsStore["MODULES"][moduleId].metadata.hasOwnProperty([
        name.value,
      ])
    ) {
      toastAlert(
        `<p>There already exists a metadata entry with the name</p>
        <p style="margin-left: 1em">${name.value}</p>`,
        "danger"
      );
      name.value = "";
      return;
    }

    $collectionsStore["MODULES"][moduleId].metadata[sanitisedName] =
      sanitisedValue;
    $configStore["needToSaveCollections"] = true;

    name.value = "";
    value.value = "";

    // set focus back to the name field
    name.focus();
  }

  /**
   * @function sanitize
   * @param {string} value - the value to be sanitised
   * @param {boolean} allowHtml - whether to allow HTML or not
   * @returns {string} - the sanitised value
   * @description Allow HTML, including iframes but do other sanity checks
   */
  function sanitize(value: string, allowHtml: boolean = true) {
    let allowedTags = sanitizeHtml.defaults.allowedTags;
    let allowedAttributes = {};
    allowedTags = allowedTags.concat("iframe");
    allowedAttributes = {
      iframe: ["src", "width", "height", "frameborder", "allowfullscreen"],
    };

    if (!allowHtml) {
      allowedTags = [];
      allowedAttributes = {};
    }

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
    ccConfirm(
      `<p>About to delete the metadata entry<br /> 
        <span style="margin:1em">${key}</span><br /> for the module <br />
    <span style="margin:1em">${moduleName}<span></p>
      <p>Proceed?</p>`
    ).then((ok) => {
      if (ok) {
        // create a complete new object to remove the key
        // Necessary to ensure the reactive display of the list of metadata
        // removes the correct entry (it doesn't if you just delete from the existing object)
        let metadata = $collectionsStore["MODULES"][moduleId].metadata;
        delete metadata[key];

        // force the reactive update of the entire list of metadata
        $collectionsStore["MODULES"][moduleId].metadata = metadata;
        $configStore["needToSaveCollections"] = true;
      }
    });
  }

  /**
   * @function changeMetaDataName
   * @param {String} originalName - the original name of the metadata entry
   * @description User has released a key to change the name field of a metadata entry
   * - make a copy of the metadata object
   * - add the new entry as a copy from the original entry
   * - delete the original entry
   * - reassign the original metadata object to the copy
   */
  function changeMetaDataName(originalName: string) {
    const name = document.getElementById(
      `cc-module-config-${moduleId}-metadata-${originalName}-name`
    ) as HTMLInputElement;

    // if no change in name, nothing to do
    if (originalName === name.value) {
      return;
    }

    // check for duplicate of existing name
    if (
      $collectionsStore["MODULES"][moduleId].metadata.hasOwnProperty([
        name.value,
      ])
    ) {
      toastAlert(
        `<p>There already exists a metadata entry with the name</p>
    <div style="margin-left: 1em">${name.value}</div>
    <p>Please choose a different name.</p>`, "danger"
      );
      name.value = originalName;
      return;
    }

    let metadata = $collectionsStore["MODULES"][moduleId].metadata;
    metadata[name.value] = metadata[originalName];
    delete metadata[originalName];
    $collectionsStore["MODULES"][moduleId].metadata = metadata;
    $configStore["needToSaveCollections"] = true;
  }

  /**
   * @function changeMetaDataValue
   * @param {String} name - the name of the metadata entry
   * @description User has modified the value for a metadata entry
   * - sanitise the value
   * - report any sanitisation change to the user
   * - modify the value
   * - set the needToSaveCollections flag
   */

  function changeMetaDataValue(name: string) {
    const value = document.getElementById(
      `cc-module-config-${moduleId}-metadata-${name}-value`
    ) as HTMLInputElement;

    const sanitisedValue = sanitize(value.value);

    // if the sanitised value is different to the original, warn the user
    if (sanitisedValue !== value.value) {
      ccConfirm(
        `<p>The new metadata item value</p> 
    <div style="margin-left:1em"><xmp>${value.value}</xmp></div>
<p>has been sanitised to</p>
    <div style="margin-left:1em"><xmp>${sanitisedValue}</xmp></div>
    <p>Do you want to use the sanitised value?</p>`
      ).then((ok) => {
        if (ok) {
          $collectionsStore["MODULES"][moduleId].metadata[name] =
            sanitisedValue;
          $configStore["needToSaveCollections"] = true;
        }
      });
    } else {
      $collectionsStore["MODULES"][moduleId].metadata[name] = sanitisedValue;
      $configStore["needToSaveCollections"] = true;
    }
  }

  //------------- HELP tooltips and urls
  const HELP = {
    name: {
      tooltip: `<p>Each metadata value is given a name. Only certain characters can be used. No HTML tags allowed.<p>
			<p>Changes will only take effect when you move focus away from the name field.</p>`,
      href: `https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/metadata/#name`
    },
    value: {
      tooltip: `<p>The value for the metadata element. HTML tags are allowed.</p>`,
      href: `https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/metadata/#value`
    },
  };
</script>

<div class="cc-module-config-additional-metadata border border-trbl">
  <table>
    <thead>
      <tr>
        <th
          >Name
          <sl-tooltip>
            <div slot="content">{@html HELP.name.tooltip}</div>
            <a href="{HELP.name.href}" target="_blank" rel="noreferrer">
            <i class="icon-question cc-module-icon" />
            </a>
          </sl-tooltip>
        </th>
        <th
          >Value
          <sl-tooltip>
            <div slot="content">{@html HELP.value.tooltip}</div>
            <a href="{HELP.value.href}" target="_blank" rel="noreferrer">
            <i class="icon-question cc-module-icon" />
            </a>
          </sl-tooltip>
        </th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td
          ><input
            type="text"
            id="cc-module-config-{moduleId}-metadata-add-name"
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
              on:focusout={() => changeMetaDataName(key)}
              value={key}
              pattern={String.raw`[^<>"]`}
            />
          </td>
          <td>
            <input
              type="text"
              id="cc-module-config-{moduleId}-metadata-{key}-value"
              value={$collectionsStore["MODULES"][moduleId].metadata[key]}
              on:focusout={() => changeMetaDataValue(key)}
              on:keydown|stopPropagation
            />
          </td>
          <td>
            <i
              on:click={() => deleteMetaData(key)}
              on:keydown={() => deleteMetaData(key)}
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

  sl-tooltip {
    text-align: left;
    white-space: normal;
  }
</style>
