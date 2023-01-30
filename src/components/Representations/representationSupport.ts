import ModuleConfiguration from "../ModuleConfiguration.svelte";
import { get } from "svelte/store";

import { collectionsStore, configStore, modulesStore } from "../../stores";

import { debug } from "../../lib/debug";

/**
 * @function getCollectionCanvasModules
 * @param collection - Collection name
 * @returns {module[]} - Array of modules
 * @description - Returns an array of module belonging to a given collection
 */
export function getCollectionCanvasModules(collection) {
  let modules = [];

  // collection store is not the Canvas modules (collections modules)
  const cStore = get(collectionsStore);
  const collectionsModules = cStore["MODULES"];
  const canvasModules = get(modulesStore);

  canvasModules.forEach((module) => {
    // for each canvas module
    const moduleId = module.id;
    if (collectionsModules[moduleId].collection === collection) {
      // if the module belongs to the selected collection
      // push the canvas module onto the array
      modules.push(module);
    }
  });

  /*for (const moduleId in collectionsModules) {
    // loop through each of the Canvas Collections modules
    if (collectionsModules[moduleId].collection === collection) {
      // if the module belongs to the selected collection
      // push the canvas module onto the array
      modules.push(canvasModules[moduleId]);
    }
  } */
  return modules;
}

/**
 * @function addUnallocatedModules
 * @param collectionName
 * @param editMode
 * @returns [] - Array of modules
 * @description Return an array of all the modules that do not have a collection
 * i.e. collection===null
 */

export function addUnallocatedModules(editMode: boolean): any[] {
  let modules = [];

  const cStore = get(collectionsStore);
  const collectionsModules = cStore["MODULES"];

  for (const module in collectionsModules) {
    if (
      collectionsModules[module]["collection"] === null ||
      collectionsModules[module]["collection"] === ""
    ) {
      if (editMode || collectionsModules[module]["published"]) {
        modules.push(collectionsModules[module]);
      }
    }
  }
  return modules;
}

/**
 * @function getRepresentationModules
 * @param String collectionName - name of "current" collection
 * @param boolean unallocated
 * @returns [] - Array of modules
 * @description Given a collection, get all the modules that a representation
 * will need to display that collection, may include
 * - all the modules in the collection
 * - all the modules without collections (if that switch is set)
 *
 */
export function getRepresentationModules(
  collectionName: string,
  /* allModules: any[],
  editMode: boolean, */
  claytons: boolean,
  unallocated: boolean
): any[] {
  let modules = [];

  const config = get(configStore);
  const editMode = config["editMode"];

  modules = getCollectionCanvasModules(collectionName);
  // add unallocated modules if,
  if (editMode) {
    // student only if unallocated for this collection is true
    if (unallocated && !claytons) {
      modules = modules.concat(addUnallocatedModules(editMode));
    }
  //} else if ((claytons && unallocated) || !claytons) {
  } else if ( unallocated) {
    // staff add if
    // - claytons mode and unallocated is true
    // - ! claytons
    modules = modules.concat(addUnallocatedModules(editMode));
  }

  return modules;
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

export function checkModuleMetaData(
  module,
  metaDataValue,
  editMode,
  claytons = false
) {
  if (
    module.hasOwnProperty("metadata") &&
    module["metadata"].hasOwnProperty(metaDataValue)
  ) {
    return module["metadata"][metaDataValue];
  }
  if (editMode && !claytons) {
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

  if (!module.hasOwnProperty("date") || !isNotEmptyDate(module.date)) {
    return "";
  }
  let dateStr = module.date.label;

  if (!module.dateHide["day"]) {
    dateStr += ` ${module.date.day}`;
  }
  if (!module.dateHide["week"]) {
    dateStr += ` Week ${module.date.week}`;
  }
  if (!module.dateHide["calendarDate"]) {
    dateStr += ` (${module.date.date} ${module.date.month})`;
  }
  if (!module.dateHide["time"] && module.date.time !== "") {
    dateStr += ` ${module.date.time}`;
  }

  return dateStr;
}

  function isNotEmptyDate(date: object): boolean {
    return (
      (date.hasOwnProperty("week") && date["week"] !== "") ||
      (date.hasOwnProperty("month") && date["month"] !== "") ||
      (date.hasOwnProperty("date") && date["date"] !== "") ||
      (date.hasOwnProperty("day") && date["day"] !== "") ||
      (date.hasOwnProperty("time") && date["time"] !== "")
    );
  }

/**
 * @function modifyCanvasModulesList
 * @param collection  - string for current collection
 * @param editMode - whether we're in editMode or not
 * @param showUnallocated - whether to show unallocated modules or not
 * @description Modify Canvas's display of modules in three possible ways
 * 1. Hide all modules with collection defined and not in collection
 * 2. Ensure all modules in collection are showing
 * 3. If editMode add ModuleConfiguration components to the module
 */
export function modifyCanvasModulesList(collection, showUnallocated) {
  const collections = get(collectionsStore);
  const allModules = collections["MODULES"];
  const config = get(configStore);
  const editMode = config["editMode"];

  const modules = getCollectionCanvasModules(collection);
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
      if (
        allModules[moduleId].collection !== null &&
        allModules[moduleId].collection !== ""
      ) {
        // hide any Canvas module elements that have a collection defined but
        // are not the current collection
        module.style.display = "none";
      } else {
        if (editMode) {
          // in edit mode ensure that unallocated modules are visible and
          // have a ModuleConfiguration component
          module.style.display = "block";
          addModuleConfiguration(parseInt(moduleId, 10));
        } else {
          if (showUnallocated) {
            // make sure that unallocated modules are visible
            module.style.display = "block";
          } else {
            module.style.display = "none";
          }
        }
      }
    }
  });

  // ensure all the moduleIds are displayed
  moduleIds.forEach((moduleId) => {
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
  // get type of moduleId
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

/**
 * @function deLabelModuleName
 * @param module - module object
 * @return string Module name without label and number
 * @description Remove the label and number from the name
 */
export function deLabelModuleName(module) {
  //    const module = $collectionsStore["MODULES"][moduleId];
  const existingName = module.name;

  let prepend = "";
  if (module.label) {
    prepend = module.label;
  }

  let regex = new RegExp(`^${prepend}\\s*[:->]\\s*`);

  if (module.actualNum) {
    regex = new RegExp(`^${prepend}\\s*${module.actualNum}\\s*[:>-]\\s*`);
    prepend += ` ${module.actualNum}`;
    // remove first char from CARD_LABEL if it is a space
    if (prepend.charAt(0) === " ") {
      prepend = prepend.substring(1);
    }
  }
  prepend = `${prepend}: `;
  let newName = existingName;
  if (prepend !== ": ") {
    // if we've not empty label and number
    // modify existingName to remove prepend and any subsequent whitespace
    //	newName = existingName.replace(prepend, '').trim();
    newName = existingName.replace(regex, "").trim();
  }

  return newName;
}
