import ModuleConfiguration from "../ModuleConfiguration.svelte";
import { get } from "svelte/store";

import { collectionsStore, configStore, modulesStore } from "../../stores";

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
  const figStore = get(configStore);
  const editMode = figStore["editMode"];
  const collectionsModules = cStore["MODULES"];
  const canvasModules = get(modulesStore);

  // track the module ids we add to the list
  let addedModuleIds = [];
  canvasModules.forEach((module) => {
    // for each canvas module
    const moduleId = module.id;
    if (collectionsModules[moduleId].collection === collection) {
      // if the module belongs to the selected collection
      // push the canvas module onto the array
      modules.push(module);
      addedModuleIds.push(moduleId);
    }
  });

  // Add in any FYI modules

  if (!editMode) {
    for (const moduleId in collectionsModules) {
      // find the fyi module's not already added above, in this collection
      if (
        collectionsModules[moduleId].collection === collection &&
        !addedModuleIds.includes(moduleId) &&
        collectionsModules[moduleId].fyi
      ) {
        // if the module belongs to the selected collection
        // push the canvas module onto the array
        modules.push(collectionsModules[moduleId]);
      }
    }
  }
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

  // is the problem that we're starting with the Canvas modules
  modules = getCollectionCanvasModules(collectionName);
  // add unallocated modules if,
  if (editMode) {
    // student only if unallocated for this collection is true
    if (unallocated && !claytons) {
      modules = modules.concat(addUnallocatedModules(editMode));
    }
    //} else if ((claytons && unallocated) || !claytons) {
  } else {
    // for students, they should be able to see
    // - modules not allocated to this collection, if unallocated is true
    // - fyi modules, i.e. fyi is set
    if (unallocated) {
      modules = modules.concat(addUnallocatedModules(editMode));
    }
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

  /*  if (!module.hasOwnProperty("date") || !isNotEmptyDate(module.date)) {
    return "";
  } */
  let dateStr = `${module.date.label}: `;

  if (isNotEmptyDate(module.date)) {
    dateStr += generateDateString(module.date, module.dateHide)
  } 
  if (isNotEmptyDate(module.date.to)) {
    dateStr += ` to ${generateDateString(module.date.to, module.dateHide)}`
  }

  return dateStr;
}

function generateDateString(date: object, dateHide: object): string {
  let dateStr = "";

  if (!dateHide["day"]) {
    dateStr += ` ${date.day}`;
  }
  if (!dateHide["week"]) {
    dateStr += ` Week ${date.week}`;
  }
  if (!dateHide["calendarDate"]) {
    if (!dateHide["week"]) {
    dateStr += ` (${date.date} ${date.month})`;
    } else {
      dateStr += ` ${date.date} ${date.month}`;
    }
  }
  if (!dateHide["time"] && date.time !== "") {
    dateStr += ` ${date.time}`;
  }

  return dateStr;
}

export function isNotEmptyDate(date: object): boolean {
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

/**
 * @function addCalendarDate
 * @param {Object} date - JSON date rep from collections
 * @returns {Object} date - date + Calendar matching course site
 * @description Original date from collections can include use of
 * University generic dates (e.g. Monday, Week 5). Translate those
 * generic dates into a specific date based on semester/period appropriate
 * for the current course site and the university calendar
 */
export function addCalendarDate(date: Object, calendar: any): Object {
  date = modifyDate(date, calendar);
  if (date.hasOwnProperty("to") && isNotEmptyDate(date["to"])) {
    date["to"] = modifyDate(date["to"], calendar);
  }
  return date;
}

/**
 * @function modifyDate
 * @param date
 * @returns {Object} date - date + Calendar matching course site
 * @description Do the actual work for addCalendarDate
 */
function modifyDate(date: Object, calendar: any): Object {
  // can only add calendar date if a university week is specified
  if (date.hasOwnProperty("week") && date["week"] !== "") {
    // if no day, add the first day of the wek
    if (!date.hasOwnProperty("day") || date["day"] === "") {
      date["day"] = calendar.getFirstDayOfWeek();
    }
    // we've got a week, so we can add the calendar date
    const actualDate = calendar.getDate(date["week"], false, date["day"]);
    const fields = ["date", "month", "year"];
    for (let i = 0; i < fields.length; i++) {
      if (actualDate.hasOwnProperty(fields[i])) {
        date[fields[i]] = actualDate[fields[i]];
      }
    }
  }
  return date;
}
