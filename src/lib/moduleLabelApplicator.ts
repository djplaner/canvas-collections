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

import { getCollectionCanvasModules } from "../components/Representations/representationSupport";

export class moduleLabelApplicator {
  private collectionName: string;
  private newNames: any[];

  private configStore: object;
  private collectionsStore: object;

  /**
   * @param {String} collection  - name of Collection to update
   */

  constructor(collectionName) {
    this.collectionName = collectionName;

    this.configStore = get(configStore);
    this.collectionsStore = get(collectionsStore);
  }

  execute() {
    // might be a question here whether or not to refresh Canvas details

    // calculate the new module names
    this.calculateNewModuleNames();

    //    this.updateNewModuleNames();
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

    const collectionsCanvasModules = getCollectionCanvasModules(
      this.collectionName
    );
    let allCollectionsModules = this.collectionsStore["MODULES"];

    for (let canvasModule of collectionsCanvasModules) {
      if (!allCollectionsModules[canvasModule["id"]]) {
        alert("calculateNewModuleNames - should not be required - missing module id");
        continue;
      }

      // get the collection module matching this canvas module
      const collectionModule = allCollectionsModules[canvasModule["id"]];
      // ensure it belongs to the collection
      if (collectionModule["collection"] !== this.collectionName) {
        alert("calculateNewModuleNames - should not be required");
        continue;
      }

      // Cases to consider
      // - someone has changed the module name
      //   TODO should always be update to date because we'll refresh before starting
      // - prepend has changed - can't cover all possibilities ATM
      //   - changes in canvas modules etc mean the numbering is off
      //   - someone has changed the labels
      //   - there is no prepend
      // Aim is to ensure that the canvas module name matches what the
      // prepend from collections should be
      // - calculate what the prepend should be
      // - separate both canvas and collection module names into 
      //   pre-pend and name
      // - 


      // the assumption here is that 
      const oldName = canvasModule["name"];
      let prepend = "";
      if (collectionModule["label"]) {
        prepend = collectionModule["label"];
      }
      if (collectionModule["actualNum"]) {
        prepend += ` ${collectionModule["actualNum"]}`;
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
        this.newNames.push({ id: canvasModule["id"], newName: newName });
      }
    }
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
