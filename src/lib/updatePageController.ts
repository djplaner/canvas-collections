/**
 * @file updatePageController.ts
 * @description updatePageController manages the process of updating one or more pages
 * for the claytons version of Collections
 *
 * Will construct a task list based on the parameters, two types of tasks
 * - Collection representation - update page with the rep of a collection
 * - (maybe) add tab interface for each page with multiple collections
 *
 * Each task goes through a cycle of functions, including async APIs, basically
 * - check if task list is empty, if so finish, maybe do a callback
 * - if collection && includePage get the include page
 * - get the canvas object for the output page
 * - perform the necessary update
 * - write the changes back to canvas
 * - modify the task list to represent outcome
 * - go to the top of the list
 */

import CollectionRepresentation from "../components/CollectionRepresentation.svelte";

export class updatePageController {
  private collectionsConfig: object;
  private navOption: number;
  private singleCollectionName: string;

  private tasks: any[];
  private completedTasks: any[];
  private errors: any[];

  constructor(
    collectionsConfig: object,
    navOption: number = undefined,
    singleCollectionName = undefined
  ) {
    this.collectionsConfig = collectionsConfig;
    this.navOption = navOption;
    this.singleCollectionName = singleCollectionName;

    this.tasks = [];
    this.completedTasks = [];

    this.createTaskLists();
    this.checkTaskList();
  }

  execute() {
    console.log(
      `updatePageController.execute() called with pageName: ${this.pageName} and collectionName: ${this.collectionName}`
    );

    /*    console.log(this.collections[this.collectionName]);

    // task now is to create a Svelte component and generate the HTML from it
    // Want the component for the collection's representation

    const div = document.createElement("div");
    div.className = "claytons-collections";

    const props = {
      collection: this.collectionName,
      claytons: true,
    };

    const app = new CollectionRepresentation({
      target: div,
      props: props,
    });

    const html = div.innerHTML;
    console.log(html); */
  }

  /**
   * @method createTaskLists
   * @description Populates the tasks array with an initial set of tasks
   * for the controller's pipeline
   *
   * TODO - implement the full claytons population
   */
  private createTaskLists() {
    /* singleCollection is defined */
    // Create a single task for singleCollection, and its outputPage
    if (this.singleCollectionName) {
      const theCollection =
        this.collectionsConfig["COLLECTIONS"][this.singleCollectionName];
      const outputPageName = theCollection.outputPage;
      const representationName = theCollection.representation;
      const outputPageURL = outputPageName.toLowerCase().replace(/ /g, "-");

      // set the nav option to the "None" choice
      this.navOption = 1;

      this.tasks.push({
        collection: this.singleCollectionName,
        outputPage: outputPageName,
        outputPageURL: outputPageURL,
        representation: representationName,
        completed: false,
        error: false,
        errors: [],
      });
    }
  }

  /**
   * @method checkTaskList
   * @description if navOption is 2 (full claytons) modify the task list
   * so there are no collections with the same output page
   */
  private checkTaskList() {
    // if navOption=2 there should be no collections with the same output page
    if (this.navOption === 2 && this.tasks.length > 1) {
      // check for duplicates
      const outputPages = this.tasks.map((task) => task.outputPage);
      const uniqueOutputPages = [...new Set(outputPages)];
      if (outputPages.length !== uniqueOutputPages.length) {
        this.errors.push(
          `"Pages" nav option doesn't work with pages used by multiple collections\nPage(s) used multiple times include: ${uniqueOutputPages.toString()}`
        );
        // this is a fatal error - no point in continuing
        this.completedTasks = this.tasks;
        this.tasks = [];
      }
    }
  }
}
