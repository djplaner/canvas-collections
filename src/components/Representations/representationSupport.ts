import ModuleConfiguration from "../ModuleConfiguration.svelte";

import { debug } from "../../lib/debug";

/**
 * @function getCollectionCanvasModules
 * @param collection - Collection name
 * @param modules - Array of all the modules
 * @returns {module[]} - Array of modules
 * @description - Returns an array of module belonging to a given collection
 */
export function getCollectionCanvasModules(collection, allModules) {
  let modules = [];

  for (const module in allModules) {
    if (allModules[module].collection === collection) {
      modules.push(allModules[module]);
    }
  }
  return modules;

  /*  const moduleIds = Object.keys(modules).filter((module) => {
    return (
      /*(
				! allModules[module].published &&
				$configStore['editMode']
			) && 
      // the module belongs to the collection
      modules[module].collection === collection
    );
  }); */
  // convert all the moduleIds to numbers
  /*  return moduleIds.map((moduleId) => {
    return parseInt(moduleId, 10);
  }); */
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
 * @param modules - array of Canvas module objects
 * @description Modify Canvas's display of modules in three possible ways
 * 1. Hide all modules with collection defined and not in collection
 * 2. Ensure all modules in collection are showing
 * 3. If editMode add ModuleConfiguration components to the module
 */
export function modifyCanvasModulesList(collection, allModules, editMode) {
  debug(
    `_________________________________ modifyCanvasModulesList moduleIds ${collection} editMode ${editMode} _________________`
  );

  const modules = getCollectionCanvasModules(collection, allModules);
  // create array moduleIds that contains the module.ids from modules
  const moduleIds = modules.map((module) => {
    return parseInt(module.id, 10);
  });
  // get all the moduleIds from modules not in moduleIds
  // - allModules is a list of modules ?? dict??
  // -
  const otherModuleIds = Object.keys(allModules).filter((moduleId) => {
    return !moduleIds.includes(parseInt(moduleId, 10));
  });

  debug(` --- moduleIds ${moduleIds} --- otherModuleIds ${otherModuleIds} ---`);

  // for other modules
  // - if collection is not null hide the module
  // - if null, create an unallocated ModuleConfiguration
  otherModuleIds.forEach((moduleId) => {
    const module = document.getElementById(`context_module_${moduleId}`);
    if (module) {
      if (allModules[moduleId].collection !== null) {
        // hide any Canvas module elements that have a collection defined but
        // are not the current collection
        module.style.display = "none";
      } else {
        if (editMode) {
          // in edit mode ensure that unallocated modules are visible and
          // have a ModuleConfiguration component
          module.style.display = "block";
          addModuleConfiguration(parseInt(moduleId, 10));
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
    // make each current collection moduleId is visible
    const module = document.getElementById(`context_module_${moduleId}`);
    if (module) {
      if (allModules[moduleId].fyi && !editMode) {
        // fyi modules should not have their content shown to students
        module.style.display = "none";
      } else {
        module.style.display = "block";
      }
    }
  });
}

/**
 * @function addModuleConfiguration
 * @param moduleId
 * @description add an appropriate ModuleConfiguration component to the
 * matching Canvas module element
 */
function addModuleConfiguration(moduleId: Number) {
  debug(`XXXXX addModuleConfiguration ${moduleId} `);
  // get type of moduleId
  debug(`type of moduleId ${typeof moduleId}`);
  const module = document.getElementById(`context_module_${moduleId}`);
  if (module) {
    module.style.display = "block";
  }
  // in editMode add div#cc-module-config-<moduleId> after div#<moduleId>
  const insertDiv = document.getElementById(`${moduleId}`);

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
      },
    });
    debug("XXXXX moduleConfigComponent");
    debug(moduleConfigComponent);
  }
}

/**
 * @function getModuleUrl
 * @param {Number} moduleId
 * @returns {String} - the url for a Canvas module's item
 */
export function getModuleUrl(moduleId: Number) {
  let docUrl = new URL(document.URL);
  // remove anchor and params from docUrl
  docUrl.search = "";
  // set the hash to link to the module
  docUrl.hash = `module_${moduleId}`;

  return docUrl.toString();
}
