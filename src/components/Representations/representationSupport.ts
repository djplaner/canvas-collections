// Copyright (C) 2023 Griffith University
// 
// This file is part of Canvas Collections.
// 
// Canvas Collections is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// Canvas Collections is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with Canvas Collections.  If not, see <http://www.gnu.org/licenses/>.

import ModuleConfiguration from "../ModuleConfiguration.svelte";
import { get } from "svelte/store";

import { collectionsStore, configStore, modulesStore } from "../../stores";

/**
 * @function getCollectionCanvasModules
 * @param collection - Collection name
 * @param claytons - boolean, true if we're in claytons mode
 * @returns {module[]} - Array of modules
 * @description - Returns an array of module belonging to a given collection
 */
export function getCollectionCanvasModules(
  collection: string,
  claytons: boolean = false,
  unallocated: boolean = false
) {
  let modules = [];

  // - get local copies of the relevant Svelte stores
  const cStore = get(collectionsStore);
  const figStore = get(configStore);

  // is this a staff viewing modules?
  const editMode = figStore["editMode"];
  // hash of objects (keyed on moduleId) with current Collections information about modules
  const collectionsModules = cStore["MODULES"];

  // array of objects containing current Canvas module information
  const canvasModules = get(modulesStore);
  // construct a dictionary canvasModuleIds: key is module id from canvasModules
  // elements and values are the module details from canvasModules
  const canvasModuleIds = {};
  canvasModules.forEach((module) => {
    canvasModuleIds[module.id] = module;
  });

  // At this stage, the collectionsModules array has the "correct" moduleOrder
  // create a dict keyed on moduleOrder of collections with ids in collectionModuleIds

  let orderedModuleIds = {};
  // iterate over the collectionsModules dictionary (keyed on module id)
  // TODO
  // - Claytons - does it include unpublished modules?
  //   - Yes it should

  // Loop through all the modules for this current collection
  for (const moduleId in collectionsModules) {
    if (
      collectionsModules[moduleId].collection === collection ||
      (unallocated &&
        (collectionsModules[moduleId].collection === null ||
          collectionsModules[moduleId].collection === ""))
    ) {
      // We have a module that is in this collection, but should we add it? yes, iff
      // - staff view 
      //   - Claytons - generating for the students
      //     - claytons && fyi - Claytons mode and FYI card - always added
      //     - claytons && published 
      //   - normal - everything
      // - student view
      //   - published || fyi

      if (editMode) {
        // staff view
        if (claytons) {
          if (collectionsModules[moduleId].fyi || collectionsModules[moduleId].published) {
            orderedModuleIds[collectionsModules[moduleId].moduleOrder] = moduleId;
          }
        } else {
          orderedModuleIds[collectionsModules[moduleId].moduleOrder] = moduleId;
        }
      } else {
        // student view
        if (collectionsModules[moduleId].published ) {
          orderedModuleIds[collectionsModules[moduleId].moduleOrder] = moduleId;
        } else if (collectionsModules[moduleId].fyi){
          orderedModuleIds[collectionsModules[moduleId].moduleOrder] = moduleId;
        }
      }
    }
  }

  // At this stage we have the right the right number, including unpublished

  // Now populate the modules array with the details of the modules
  // preferably the Canvas module details, but students won't have this
  // information for unpublished Canvas modules. Which is only a problem
  // for FYI objects.  For those, add the Collection module information

  for (const moduleOrder in orderedModuleIds) {
    const moduleId = orderedModuleIds[moduleOrder];
    // if moduleId is in the canvasModuleIds
    if (canvasModuleIds.hasOwnProperty(moduleId)) {
      modules.push(canvasModuleIds[moduleId]);
    } else if (collectionsModules[moduleId].fyi) {
      // if it's not in the canvasModules and its an fyi, add it.
      modules.push(collectionsModules[moduleId]);
    }
  }

  return modules;
}

/**
 * @function updateSequentialModuleOrder
 * @param collectionModules - array of Collections data about modules belonging to a collection
 * @param canvasModules - array of Canvas module data
 * @description The collectionModules data doesn't have moduleOrder information that is
 * sequential. Causing problems with display of the representations. Need to fix this by
 * using the order in which they appear in the canvas module data.  This will be largely
 * in order. However, for students, unpublished modules will not appear.  Just add these
 * to the end
 */
function updateSequentialModuleOrder(collectionModules, canvasModules) {
  let collectionModulesIds = collectionModules.map((module) => module.id);
  let count = 0; // track the sequence we're up to
  let moduleIdToOrder = {}; // map a module id to a particular sequential order

  // loop through the canvas modules, and populate moduleIdToOrder with sequential order
  canvasModules.forEach((module) => {
    // check if module.id is in collectionModulesIds
    if (collectionModulesIds.includes(module.id)) {
      count++;
      moduleIdToOrder[module.id] = count;
    }
  });

  let moduleIdsNotSet = {}; // track the collections modules without set moduleOrder
  // loop through the collection modules
  collectionModules.forEach((module) => {
    // does moduleIdToOrder contain module.id
    if (moduleIdToOrder.hasOwnProperty(module.id)) {
      // set the moduleOrder to the value in moduleIdToOrder
      module.moduleOrder = moduleIdToOrder[module.id];
    } else {
      // add it to the moduleIdsNotSet
      moduleIdsNotSet[module.id] = module;
    }
  });

  // loop through the moduleIdsNotSet
  for (const moduleId in moduleIdsNotSet) {
    // increment the count
    count++;
    // set the moduleOrder to the count
    moduleIdsNotSet[moduleId].moduleOrder = count;
  }
}

/**
 * @function addUnallocatedModules
 * @param collectionName
 * @param editMode
 * @returns [] - Array of modules
 * @description Return an array of all the modules that do not have a collection
 * i.e. collection===null
 */

export function addUnallocatedModules(
  modules: any[],
  editMode: boolean
): any[] {
  const moduleIds = modules.map((module) => module.id);

  const cStore = get(collectionsStore);
  const collectionsModules = cStore["MODULES"];

  // loop through all the collection's modules
  for (const module in collectionsModules) {
    // if they are not allocated
    if (
      collectionsModules[module]["collection"] === null ||
      collectionsModules[module]["collection"] === ""
    ) {
      // and if we're in edit mode or the module is published
      if (editMode || collectionsModules[module]["published"]) {
        // add them to the list, if they aren't already
        if (!moduleIds.includes(module)) {
          modules.push(collectionsModules[module]);
        }
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
 * Doing an update
 *   Why? / Claytons true / editMode true  / unallocated false
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
  modules = getCollectionCanvasModules(collectionName, claytons, unallocated);
  // add unallocated modules if,
  /*  if (editMode ) {
    // student only if unallocated for this collection is true
    if (unallocated ) { //&& !claytons) {
      modules = addUnallocatedModules(modules, editMode);
    }
    //} else if ((claytons && unallocated) || !claytons) {
  } else {
    // for students, they should be able to see
    // - modules not allocated to this collection, if unallocated is true
    // - fyi modules, i.e. fyi is set
    if (unallocated) {
      modules = addUnallocatedModules(modules, editMode);
    }
  } */

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
  let dateStr = "";
  if (module.date.label !== "") {
    dateStr = `${module.date.label}`;
  }

  if (isNotEmptyDate(module.date)) {
    dateStr += generateDateString(module.date, module.dateShow);
  }
  if (isNotEmptyDate(module.date.to)) {
    dateStr += ` to ${generateDateString(module.date.to, module.dateShow)}`;
  }

  return dateStr;
}

/**
 * @function generateDateString
 * @param date 
 * @param dateShow 
 * @return string - a text representation of the string. What date components
 * are included depends on the dateShow object
 *  12:00am Mon 5 Jan
 * 
 */
function generateDateString(date: object, dateShow: object): string {
  let dateStr = "";

  const order = ["time", "day", "date", "month"];

  // loop through each order and add date component if dateShow
  order.forEach((component) => {
    if (dateShow[component] && date[component] !== "") {
      dateStr += ` ${date[component]}`
    }
  })

  return dateStr;
}

/**
 * @function generateDateToString 
 * @param date 
 * @param dateShow
 * @return string - text representation of the to date
 * Kludge because of bad data structure design and laziness. The dateShow
 * components for the to date don't match date string
 */
function generateDateToString(date: object, dateShow: object): string {
  let dateStr = "";

  const compontents = {
    toTime: "time", toDay: "day", toDate: "date", toMonth: "month"
  };

  for (const component in compontents) {
    if (dateShow[component] && date[compontents[component]] !== "") {
      dateStr += ` ${date[compontents[component]]}`
    }
  }
  return dateStr;
}

/**
 * @function isNotEmptyDate
 * @param date 
 * @returns true iff there are no components for the date defined
 */
export function isNotEmptyDate(date: object): boolean {
  return (
    date.hasOwnProperty("calendarDate") && date["calendarDate"] !== ""
    /*    (date.hasOwnProperty("week") && date["week"] !== "") ||
        (date.hasOwnProperty("month") && date["month"] !== "") ||
        (date.hasOwnProperty("date") && date["date"] !== "") ||
        (date.hasOwnProperty("day") && date["day"] !== "") ||
        (date.hasOwnProperty("time") && date["time"] !== "") */
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
  if (collection === "") {
    return;
  }
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
          if (config["editingOn"] !== null) {
            addModuleConfiguration(parseInt(moduleId, 10));
          }
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

    // add module configuration if Canvas edit mode is on and
    // the user has editingOn permission for Collections
    if (editMode && config["editingOn"] !== null) {
      addModuleConfiguration(moduleId, config);
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
 * @function isUnPublishedUnallocated
 * @param moduleId - of the current module
 * @param collection - name of the current collection
 * @returns true if the module is unpublished or unallocated & if that information
 * should be shown.  In particular, is used to figure out if to show a small
 * message on a card about unpublished/unallocated
 *
 * Conditions include
 * - only staff (editMode) should see unpublished/unallocated messages
 * - students (!editMode) should not see unpublished/unallocated messages
 */
export function isUnPublishedUnallocated(moduleId, collection) {
  const config = get(configStore);
  const collectionStore = get(collectionsStore);

  if (!config["editMode"]) {
    return false;
  }

  // is it unpublished
  if (!collectionStore["MODULES"][moduleId].published) {
    return true;
  }

  // is it unallocated
  return collectionStore["MODULES"][moduleId].collection !== collection;
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
