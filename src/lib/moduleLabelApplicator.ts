/**
 * @class moduleLabelApplicator
 * @classDesc Update names of all modules that belong to a collection by pre-pending
 * appropriate module label/nums to the name.
 *
 * Constructor takes the name of the collection and the parentController object
 * and does the following
 * - Update the data on the course modules and update all appropriate value
 *   To ensure we have the latest names
 * - calculateNewModuleNames
 *   - extract the names of the existing modules
 *   - go thru each and develop what the new name will be
 *     TODO may show those names for approval
 * - updateAllModules
 *   - iterate through each module and use updateModule
 *     do it all in one
 *
 */

import { get } from "svelte/store";
import { configStore, collectionsStore } from "../stores";

export default class moduleLabelApplicator {
  private collectionName: string;

  /**
   * @param {String} collection  - name of Collection to update
   */

  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  execute() {
    // update the module details using the controller, but get it pass
    // along to the calculateNewModuleNames method
    this.parentController.requestModuleInformation(
      this.checkModulesUpdated.bind(this)
    );
  }

  /**
   * @method checkModulesUpdated
   * @description Called once Canvas module details update is been attempted.
   * Figure out if it worked and act accordingly
   * @param {Boolean} ok - was the module update successful?
   */

  checkModulesUpdated(ok) {
    if (!ok) {
      alert(`moduleLabelApplicator: module update failed`);
      return;
    }

    // merge the module details to ensure all up to date
    // - this is also where the num is auto calculated
    this.parentController.mergeModuleDetails();

    // calculate the new module names
    this.calculateNewModuleNames();
  }

  /**
   * @method calculateNewModuleNames
   * @description Go through the modules for this collection. Calculate the new names
   * and store them in this.newNames hash keyed on module Id and containing the new name
   * - but only put them in if there is a difference
   *
   */
  calculateNewModuleNames() {
    // reinitialise
    this.newNames = [];

    const modulesCollections = this.getModulesCollections();
    for (let module of modulesCollections) {
      if (module.collection !== this.collectionName) {
        continue;
      }

      const oldName = module.name;
      let prepend = "";
      if (module.label) {
        prepend = module.label;
      }
      if (module.actualNum) {
        prepend += ` ${module.actualNum}`;
        // remove first char from CARD_LABEL if it is a space
        if (prepend.charAt(0) === " ") {
          prepend = prepend.substring(1);
        }
      }
      // if oldName already starts with prepend, then continue
      // also picks up if prepend is empty
      if (oldName.startsWith(prepend)) {
        continue;
      }
      const newName = `${prepend}: ${oldName}`;

      // TODO - need to identify old prepends

      if (newName !== oldName) {
        this.newNames.push({ id: module.id, newName: newName });
        console.log(
          `------------- moduleLabelApplicator: ${oldName} -> ${prepend}: ${oldName}`
        );
        console.log(module);
        console.log(`-------------`);
      }
    }

    this.updateNewModuleNames();
  }

  /**
   * Update all the new module names - one by one
   * 1. Are there any new names to update?
   * 2. Yes, then update the first one - async
   * 3. Once complete, was it successful?
   *    - update the numUpdatedNames
   */

  async updateNewModuleNames() {
    if (this.newNames.length === 0) {
      alert(`moduleLabelApplicator: no new names to update`);
      return;
    }

    const updateModule = this.newNames[0];

    let callUrl = `/api/v1/courses/${this.parentController.courseId}/modules/${updateModule.id}`;

    DEBUG &&
      console.log(
        `moduleLabelApplicator: updateNewModuleNames: callUrl = ${callUrl}`
      );

    let _body = {
      module: {
        name: updateModule.newName,
      },
    };

    let method = "put";

    const bodyString = JSON.stringify(_body);

    const response = await fetch(callUrl, {
      method: method,
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
        "X-CSRF-Token": this.parentController.csrf,
      },
      body: bodyString,
    });

    if (!response.ok) {
      alert(`Problem creating config ${response.status} - `);
      return;
    }

    alert(`moduleLabelApplicator: updated ${updateModule.newName}`);
    // remove the one we've just successfully added and do the next
    this.newNames.shift();
    this.updateNewModuleNames();
  }

  /**
   * Kludge duplication of a method in CollectionsModel that will provide a list of
   * modules ordered by position
   * @param {*} collectionName
   * @returns
   */
  getModulesCollections(collectionName = null) {
    // mergedDetails is a hash of all modules keyed on id
    const mergedDetails = this.parentController.mergedModuleDetails;

    if (collectionName === null) {
      let values = Object.values(mergedDetails);
      // sort the objects in the values array by their "position" numeric attribute
      values.sort((a, b) => a.position - b.position);
      // if no collectionName, convert hash of dicts mergedDetails into an array of dicts
      return values;
    }
    // filter modulesCollections array to those that have an attribute collection==collectionName
    //const collectionModules = this.modulesCollections.filter(module => module.collection === collectionName); */

    // create array of dicts from mergedDetails where the collection is collectionName
    const collectionModules = Object.keys(mergedDetails).filter(
      (key) => mergedDetails[key].collection === collectionName
    );

    return collectionModules;
  }
}
