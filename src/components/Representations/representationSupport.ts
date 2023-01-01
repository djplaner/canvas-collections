import ModuleConfiguration from "../ModuleConfiguration.svelte";

import { debug } from "../../lib/debug";

/**
 * @function getCollectionModuleIds
 * @param collection - Collection name
 * @param modules - Array of modules
 * @returns {Number[]} - Array of module ids
 * @description - Returns an array of module ids for a given collection
 */
export function getCollectionModuleIds(collection, modules) {
  const moduleIds = Object.keys(modules).filter((module) => {
    return (
      /*(
				! allModules[module].published &&
				$configStore['editMode']
			) && */
      // the module belongs to the collection
      modules[module].collection === collection
    );
  });
  // convert all the moduleIds to numbers
  return moduleIds.map((moduleId) => {
    return parseInt(moduleId, 10);
  });
}

/**
 * @function checkModuleMetaData
 * @param module : string
 * @param metaDataValue : string
 * @returns string - the value to display in the table for the metaDataValue
 * Will return
 * - the value of the metadataValue if it exists
 * - the string {metaDataValue} if it does not exist and we're in editMode
 * - an empty string if it does not exist and we're not in editMode
 */

export function checkModuleMetaData(module, metaDataValue, editMode) {
  if (
    module.hasOwnProperty("metadata") &&
    module["metadata"].hasOwnProperty(metaDataValue)
  ) {
    return module["metadata"][metaDataValue];
  }
  if (editMode) {
    return `{${metaDataValue}}`;
  }
  return "";
}

/**
 * @function generateModuleDate
 * @param module
 * @return string - the date to display in the table
 * Handle the conversion of a module's collection date (if any) into a
 * string to insert into the table
 */
export function generateModuleDate(module) {
  // TODO need generateCalendarDate properly

  if (!module.hasOwnProperty("date")) {
    return "🚧 no date";
  }
  const date = module.date;
  return `🚧 ${date.label} ${date.day} Week ${date.week}`;
}

/**
 * @function modifyCanvasModulesList
 * @param collection  - string for current collection
 * @param modules - list of all modules
 * @description Modify Canvas's display of modules in three possible ways
 * 1. Hide all modules with collection defined and not in collection
 * 2. Ensure all modules in collection are showing
 * 3. If editMode add ModuleConfiguration components to the module
 */
export function modifyCanvasModulesList(collection, modules, editMode) {
  debug(
    `_________________________________ modifyCanvasModulesList moduleIds ${collection} editMode ${editMode} _________________`
  );

  const moduleIds = getCollectionModuleIds(collection, modules);
  // get all the moduleIds from modules not in moduleIds
  const otherModuleIds = Object.keys(modules).filter((moduleId) => {
    return !moduleIds.includes(parseInt(moduleId, 10));
  });

  debug(` --- moduleIds ${moduleIds} --- otherModuleIds ${otherModuleIds} ---`)

  // for other modules
  // - if collection is not null hide the module
  // - if null, create an unallocated ModuleConfiguration
  otherModuleIds.forEach((moduleId) => {
    const module = document.getElementById(`context_module_${moduleId}`);
    if (module ) {
      if (modules[moduleId].collection) {
        module.style.display = "none";
      } else {
        if (editMode) {
          addModuleConfiguration(moduleId, false);
        }
      }
    }
  });

  // ensure all the moduleIds are displayed
  moduleIds.forEach((moduleId) => {
    debug(` ---------- working on module ${moduleId} ------------`);
    // make sure that these are displayed

    if (editMode) {
      addModuleConfiguration(moduleId);
    }
  });
}

/**
 * @function addModuleConfiguration
 * @param moduleId
 * @param editMode
 * @description add an appropriate ModuleConfiguration component to each
 * Canvas module. 
 */
function addModuleConfiguration(moduleId, allocated = true) {
  debug(`XXXXX addModuleConfiguration ${moduleId} allocated ${allocated}`)
  const module = document.getElementById(`context_module_${moduleId}`);
  if (module) {
    module.style.display = "block";
  }
  // in editMode add div#cc-module-config-<moduleId> after div#<moduleId>
  const insertDiv = document.getElementById(moduleId);

  if (insertDiv && !document.getElementById(`cc-module-config-${moduleId}`)) {
    const moduleConfig = document.createElement("div");
    moduleConfig.id = `cc-module-config-${moduleId}`;
    //moduleConfig.className = "cc-module-config";
    // insert the moduleConfig after insertDiv
    insertDiv.parentNode.insertBefore(moduleConfig, insertDiv.nextSibling);

    // create new ModuleConfiguration component within moduleConfig
    const moduleConfigComponent = new ModuleConfiguration({
      target: moduleConfig,
      props: {
        module: moduleId,
        allocated: allocated
      },
    });
    debug('XXXXX moduleConfigComponent')
    debug(moduleConfigComponent)
  }
}
