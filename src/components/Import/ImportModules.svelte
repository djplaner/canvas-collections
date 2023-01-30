<script>
  /**
   * @file ImportModules.svelte
   * @description Generate information about links in the Collections Configuration that
   * need to be processesd as part of the import process. Provide an interface to
   * do that processing
   * - current modules will be in modulesStore
   * - imported collections modules will be in collectionsStore
   *
   * Process is
   * - get objects containing attributes for each of the modules
   *   - importedModuleIds
   *   - currentModuleIds - maybe just this one
   * - for currentModuleIds construct an object for each module
   *    {
   *      matched: boolean
   *      importedModuleId: the id of the imported module that matches if one
   *    }
   */

  import { modulesStore } from "../../stores";

  export let modulesCompleteStatus = false;
  export let currentCourseId = null;
  export let importCourseId = null;
  export let collectionsDetails = null;

  // create hash currentModules keyed on moduleIds with value from modulesStore
  let currentModules = {};
  $modulesStore.forEach((module) => {
    currentModules[module.id] = module;
  });
  // get lists of both moduleIds
  //  let importedModuleIds = Object.keys(collectionsDetails.collections.MODULES);
  //  let currentModuleIds = Object.keys(currentModules);
  //  let currentModuleDetails = {};
  //  let importModuleDetails = {};
  //  [currentModuleDetails, importModuleDetails] = initialiseModules();
  //collectionsDetails.initialiseModules($modulesStore)

  //matchModuleNames();
  collectionsDetails.initialiseModules($modulesStore);
  collectionsDetails.matchModuleNames($modulesStore);

  //let numCurrentModules = Object.keys(currentModuleDetails).length;
  let numCurrentModules = collectionsDetails.getNumCurrentModules();
  //let numImportModules = Object.keys(importModuleDetails).length;
  let numImportModules = collectionsDetails.getNumImportedModules();

  // calculate numImportsMatched as number of importModuleDetails where matched is true
  /*  let numImportsMatched = Object.keys(importModuleDetails).reduce(
    (acc, key) => {
      if (importModuleDetails[key].matched) {
        return acc + 1;
      } else {
        return acc;
      }
    },
    0
  );
  // calculate numCurrentMatched as number of currentModuleDetails where matched is true
  let numCurrentMatched = Object.keys(currentModuleDetails).reduce(
    (acc, key) => {
      if (currentModuleDetails[key].matched) {
        return acc + 1;
      } else {
        return acc;
      }
    },
    0
  ); */

  let numImportsMatched = collectionsDetails.getNumImportsMatched();
  let numCurrentMatched = collectionsDetails.getNumCurrentMatched();
  const importedModuleIds = collectionsDetails.getImportedModuleIds();
  const importModuleDetails = collectionsDetails.getImportModuleDetails();
  const currentModuleDetails = collectionsDetails.getCurrentModuleDetails();

  let disabledImportsMatched =
    numImportsMatched === collectionsDetails.getNumImportedModules()
      ? "disabled"
      : "";
  //    numImportsMatched === numImportModules ? "disabled" : "";
  let disabledImportNotMatched =
    collectionsDetails.getNumImportedModules() - numImportsMatched === 0
      ? "disabled"
      : "";
  //    numImportModules - numImportsMatched === 0 ? "disabled" : "";
  let disabledCurrentNotMatched =
    numCurrentMatched - collectionsDetails.getNumCurrentMatched() === 0
      ? "disabled"
      : "";
  //    numCurrentMatched === numCurrentModules ? "disabled" : "";

  /**
   * Figure out the moduleCompleteStatus
   * - ok - if all imports matched and there no imports not matched and no current not matched
   * - importProblem - if there are some imports not matched`
   */
  if (
    !disabledImportsMatched &&
    disabledImportNotMatched &&
    disableCurrentNotMatched
  ) {
    modulesCompleteStatus = true;
  }
  modulesCompleteStatus = true;

/*  importedModuleIds.forEach((importedModuleId) => {
    if (importModuleDetails[importedModuleId].matched) {
    }
  }); */

  /**
   * @function initialiseModules
   * @description Create the two module objects
   * - currentModuleDetails - keyed on moduleIds in the current Canvas course
   *     { matched: boolean,  importedModuleId: number ... }
   * - importModuleDetails - keyed on moduleIds in the imported Canvas course
   *         ???
   */

  /*  function initialiseModules() {
    let importDetails = {};
    let currentDetails = {};

    // create importDetails keyed on importedModuleIds
    importedModuleIds.forEach((importedModuleId) => {
      importDetails[importedModuleId] = {
        matched: false,
        importedModuleId: importedModuleId,
        currentModuleId: null,
      };
    });

    // create currentDetails keyed on moduleIds
    currentModuleIds.forEach((moduleId) => {
      currentDetails[moduleId] = {
        matched: false,
        importedModuleId: null,
        currentModuleId: moduleId,
      };
    });

    return [currentDetails, importDetails];
  } */

  /**
   * @function matchModuleNames
   * @description loop thru each of the imported modules and try to match the name
   * to a module in the current course
   */
  /*
  function matchModuleNames() {
    importedModuleIds.forEach((importedModuleId) => {
      let importedModuleName =
        collectionsDetails.collections.MODULES[importedModuleId].name;
      currentModuleIds.forEach((currentModuleId) => {
        let currentModuleName = currentModules[currentModuleId].name;
        if (importedModuleName === currentModuleName) {
          importModuleDetails[importedModuleId].matched = true;
          importModuleDetails[importedModuleId].currentModuleId =
            currentModuleId;
          currentModuleDetails[currentModuleId].matched = true;
          currentModuleDetails[currentModuleId].importedModuleId =
            importedModuleId;
        }
      });
    });
  } */
</script>

{#if numCurrentModules !== numImportModules}
  <p>Warning: the number of modules does not match:</p>
  <ol>
    <li># current modules: {numCurrentModules}</li>
    <li># import modules: {numImportModules}</li>
  </ol>
{/if}

<sl-tab-group>
  {#if numImportsMatched === 0}
    <sl-tab slot="nav" panel="importedMatched" disabled
      >Imported modules matched (n=0})</sl-tab
    >
  {:else}
    <sl-tab slot="nav" panel="importedMatched"
      >Imported modules matched (n={numImportsMatched})</sl-tab
    >
  {/if}

  {#if numImportModules - numImportsMatched === 0}
    <sl-tab slot="nav" panel="importedNotMatched" disabled
      >Imported modules not matched (n=0)
    </sl-tab>
  {:else}
    <sl-tab slot="nav" panel="importedNotMatched"
      >Imported modules not matched (n={importedModuleIds.length -
        numImportsMatched})</sl-tab
    >
  {/if}

  {#if numCurrentMatched !== 0}
    <sl-tab slot="nav" panel="currentNotMatched" disabled>
      Current modules not matched (n=0)
    </sl-tab>
  {:else}
    <sl-tab slot="nav" panel="currentNotMatched"
      >Current modules not matched (n={currentModuleIds.length -
        numCurrentMatched})</sl-tab
    >
  {/if}

  <sl-tab-panel name="importedMatched">
    {#if numImportsMatched > 0}
      <table class="cc-import-table">
        <tr>
          <th>Imported module</th>
          <th>Current Module</th></tr
        >
        {#each importedModuleIds as importedModuleId}
          {#if importModuleDetails[importedModuleId].matched}
            <tr>
              <td>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="/courses/{importCourseId}/modules/#module_{importedModuleId}"
                  >{collectionsDetails.collections.MODULES[importedModuleId]
                    .name}</a
                >
              </td>
              <a
                target="_blank"
                rel="noreferrer"
                href="/courses/{currentCourseId}/modules/#module_{importModuleDetails[
                  importedModuleId
                ].currentModuleId}"
                >
                {currentModules[importModuleDetails[importedModuleId].currentModuleId].name}</a
              >
            </tr>
          {/if}
        {/each}
      </table>
    {/if}
  </sl-tab-panel>
  <sl-tab-panel name="importedNotMatched">
    {#each Object.values(importModuleDetails) as module}
      {#if !module.matched}
        <p>{module.importedModuleId}</p>
      {/if}
    {/each}
  </sl-tab-panel>
  <sl-tab-panel name="currentNotMatched">
    {#each Object.values(currentModuleDetails) as module}
      {#if !module.matched}
        <p>{module.currentModuleId}</p>
      {/if}
    {/each}
  </sl-tab-panel>
</sl-tab-group>

<style>
  .cc-import-table {
    font-size: 0.9em;
  }

  .cc-import-table > tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .cc-import-table > tr > td {
    padding: 0.25em;
  }
</style>
