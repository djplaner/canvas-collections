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

import { get } from "svelte/store";
import { configStore, collectionsStore } from "../stores.ts";

export class updatePageController {
  // easy read access to stores
  private collectionsStore: object;
  private configStore: object;

  private navOption: number;
  private singleCollectionName: string;

  private tasks: any[];
  private completedTasks: any[];
  private errors: any[];
  private completedCallback: Function;

  private courseId: number;

  /**
   * @method constructor
   * @param {string} singleCollectionName - used for update output page, which collection
   * @param {Function} completedCallback - function to call on completion
   * @param {number} navOption - used for Full Claytons, which nav option
   */
  constructor(
    singleCollectionName = undefined,
    completedCallback: Function = undefined,
    navOption: number = undefined
  ) {
    this.navOption = navOption;
    this.singleCollectionName = singleCollectionName;
    this.completedCallback = completedCallback;

    this.configStore = get(configStore);
    this.collectionsStore = get(collectionsStore);

    this.tasks = [];
    this.completedTasks = [];
    this.errors = [];

    this.createTaskLists();
    this.checkTaskList();
  }

  execute() {
    if (this.errors.length !== 0) {
      //alert(`Full Claytons not possible. execute: can't got errors ${this.errors.toString()}`);
      this.complete();
    } else {
      this.startUpdate();
    }
  }

  /**
   * @method complete
   * @description Check if there's a call back and call if there is
   */
  private complete() {
    if (this.completedCallback) {
      this.completedCallback(this);
    }
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
        this.collectionsStore["COLLECTIONS"][this.singleCollectionName];
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

  /**
   * @method startUpdate
   * @description The start and end of the task processing pipline
   * - if there are no more tasks, then finish up
   * - otherwise, get the include page if necessary
   * - else get the output page
   */

  private startUpdate() {
    if (this.tasks.length === 0) {
      this.complete();
      return;
    }

    let includePageName =
      this.collectionsStore["COLLECTIONS"][this.tasks[0].collection][
        "includePage"
      ];
    if (includePageName) {
      // get the include page content
      // a chain that eventually starts getOutputPage
      includePageName = includePageName.toLowerCase().replace(/ /g, "-");
      console.log(`startUpdate: includePageName ${includePageName}`);
      this.getIncludePageContent(includePageName);
    } else {
      this.getOutputPage();
    }
  }

  /**
   * @function errorFirstTask
   * @desc Accept an error string that needs to be applied to the first task
   * Which is then removed from the tasks array and added to to completed
   * Start the next task
   * @param {*} error
   */
  private errorFirstTask(error: string) {
    let errorTask = this.tasks.shift();
    errorTask.error = true;
    errorTask.errors.push(error);
    this.completedTasks.push(errorTask);
    // Originall was this
    // this.getOutputPage();
    // But I think this should go back to start update to handle the include page
    this.startUpdate();
  }

  /**
   * @method getIncludePageContent
   * @param {string} pageName - the name of the include page
   * @description Use the Canvas API to get the full details of the page (pageObject)
   * And add the contents of the include page into the task for later use
   */

  private async getIncludePageContent(pageName: string) {
    let callUrl = `/api/v1/courses/${this.configStore["courseId"]}/pages/${pageName}`;

    console.log(
      `updatePageController: getIncludePageContent: callUrl = ${callUrl}`
    );

    const response = await fetch(callUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": this.configStore["csrfToken"],
      },
    });

    if (!response.ok) {
      console.log(
        `updatePagController: getIncludePageContent: response not ok`
      );
      // TODO if in edit mode, display some error
      return;
    }

    const newPageObject = await response.json();
    // save the include page content for this task for latter use in the pipeline
    this.tasks[0].includePageContent = `
		<div id="cc-${this.tasks[0].collection}-includePage" class="cc-includePage">
		  ${newPageObject.body}
		</div>`;

    this.getOutputPage();
  }

  /**
   * @method getOutputPage
   * @description Use Canvas API to get the pageObject for the output page
   * for the current task
   */

  private async getOutputPage() {
    // check if there's an object in this.tasks
    const courseId = this.configStore["courseId"];
    const outputPageURL = this.tasks[0].outputPageURL;

    let callUrl = `/api/v1/courses/${courseId}/pages/${outputPageURL}`;

    let response = await fetch(callUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": this.configStore["csrfToken"],
      },
    });

    if (!response.ok) {
      this.errorFirstTask(`Unable to get page ${outputPageURL} from Canvas`);
      return;
    }

    const data = await response.json();

    if (data.length === 0) {
      this.errorFirstTask(`No data provided for page ${outputPageURL}`);
      return;
    }
    this.tasks[0].pageObject = data;

    if (this.tasks[0].hasOwnProperty("collection")) {
      this.updateOutputContent();
    } else {
      // just adding the tab interface
      //this.updateTabContent();
    }
  }

  /**
   * @function updateOutputContent
   * @descr Have the old content from the page, need to update that content
   * with the output we're generating.  Focus is on updating whatever the
   * current ask is telling us - it will be a single collection
   */

  private updateOutputContent() {
    if (!this.tasks[0].hasOwnProperty("pageObject")) {
      this.errorFirstTask(`No pageObject for ${this.tasks[0].outputPageURL}`);
      return;
    }
    const pageObject = this.tasks[0].pageObject;

    console.log(
      `updatePageController: updateOutputPage: pageObject = ${JSON.stringify(
        this.pageObject
      )}`
    );

    let collectionName = this.tasks[0].collection;
    const escCollectionName = collectionName.replace(/ /g, "-");

    //----------------------------------------------
    // generate the Claytons HTML

    const insertContentHtml = this.generateClaytons(collectionName);
    //"<h1>Simple test of update</h1>";
    /* this.collectionsView.generateHTML(
      collectionName,
      "claytons",
      this.navOption
    ); */

    //----------------------------------------------
    // update the original content
    const originalContent = pageObject.body;

    // check content for an existing div#cc-output-<collection-name>
    const divId = `cc-output-${escCollectionName}`;

    // convert content into a DOM object
    const parser = new DOMParser();
    const doc = parser.parseFromString(originalContent, "text/html");
    const div = doc.getElementById(divId);
    if (div) {
      // replace the content
      div.innerHTML = insertContentHtml;
    } else {
      // add a new div
      const newDiv = doc.createElement("div");
      newDiv.id = divId;
      newDiv.innerHTML = insertContentHtml;
      doc.body.appendChild(newDiv);
    }

    // at this stage, doc will contain the new div for the collection
    // if there's an include page, insert it into that div
    if (
      this.tasks[0].hasOwnProperty("includePageContent") &&
      this.tasks[0].includePageContent
    ) {
      // there's content from an includePage - add it
      const newDiv = doc.getElementById(divId);
      // remove any existing cc-includePage divs in newDiv
      const includePageDivs = newDiv.getElementsByClassName("cc-includePage");
      for (let i = 0; i < includePageDivs.length; i++) {
        includePageDivs[i].remove();
      }
      // insert the new includePageContent at the beginning of the div
      //const includeAfter = this.getCollectionIncludeAfter(collectionName);
      let includeAfter = false;
      if (
        this.collectionsStore["COLLECTIONS"][collectionName].hasOwnProperty(
          "includeAfter"
        )
      ) {
        includeAfter =
          this.collectionsStore["COLLECTIONS"][collectionName]["includeAfter"];
      }
      if (!includeAfter) {
        newDiv.insertAdjacentHTML(
          "afterbegin",
          this.tasks[0].includePageContent
        );
      } else {
        newDiv.insertAdjacentHTML(
          "beforeend",
          this.tasks[0].includePageContent
        );
      }
    }

    // remove any .cc-includePage
    // don't need this as the includePage stuff should be within the collection div
    /*const includePages = doc.getElementsByClassName('cc-includePage');
		for (let i=0; i<includePages.length; i++) {
			includePages[i].remove();
		} */

    // remove the nav bar stuff if we're none navOption
    if (this.navOption === 1) {
      // remove any ul.cc-nav
      const navUl = doc.querySelector("ul.cc-nav");
      if (navUl) {
        navUl.remove();
      }

      // unwrap any div#cc-nav
      const navDiv = doc.getElementById("cc-nav");
      if (navDiv) {
        navDiv.outerHTML = navDiv.innerHTML;
      }
    }

    let newContent = doc.body.innerHTML;
    this.tasks[0].newContent = newContent;
    this.writeOutputPage();
  }

  /**
   * @method generateClaytons
   * @param {string} collectionName
   * @description Generate HTML string for Claytons representation of the collection
   * named "collectionName"
   * - create a div element
   * - create a new CollectionRepresentation object with claytons true add to div
   * - return the innerHTML
   */

  private generateClaytons(collectionName: string): string {
    const div = document.createElement("div");

    // set up the props to pass to component

    // use ColelctionRepresentation and add to div
    const app = new CollectionRepresentation({
      target: div,
      props: {
        collection: collectionName,
        claytons: true,
      },
    });
	// TODO error checking?

    return div.innerHTML;
  }

  /**
   * @method writeOutputPage
   * @description Write the new content for the first task in the list to the
   * appropriate Canvas page via the Canvas API
   */

  async writeOutputPage() {
    if (!this.tasks[0].hasOwnProperty("newContent")) {
      this.errorFirstTask(`No newContent for ${this.tasks[0].outputPageURL}`);
      return;
    }

    let newContent = this.tasks[0].newContent;

    const courseId = this.configStore["courseId"];
    const outputPageURL = this.tasks[0].outputPageURL;

    let callUrl = `/api/v1/courses/${courseId}/pages/${outputPageURL}`;

    // add in the CIDI labs custom CSS requirement
    // just in case we have it-- TODO remove reliance on this
    const CIDI_LABS_CUSTOM_CSS = `
		<div id="kl_custom_css">&nbsp;</div>
		`;
    // check if newContent already contains CIDI_LABS_CUSTOM_CSS
    if (newContent.indexOf(CIDI_LABS_CUSTOM_CSS) === -1) {
      newContent = newContent + CIDI_LABS_CUSTOM_CSS;
    }

    console.log(`updatePageController: writeOutputPage: callUrl = ${callUrl}`);

    let _body = {
      wiki_page: {
        body: newContent,
      },
    };

    const bodyString = JSON.stringify(_body);

    let method = "put";

    let response = await fetch(callUrl, {
      method: method,
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
        "X-CSRF-Token": this.configStore["csrfToken"],
      },
      body: bodyString,
    });

    if (!response.ok) {
      this.errorFirstTask(`Unable to update page ${outputPageURL} in Canvas`);
      return;
    }

    let data = await response.json();

    if (data.length === 0) {
      this.errorFirstTask(`No data provided for page ${outputPageURL}`);
      return;
    } else {
      if (this.tasks[0].hasOwnProperty("collection")) {
        // we're updating a single page for a collection
        alert(
          `Updated output page ${outputPageURL} for collection ${this.tasks[0].collection}`
        );
      } else if (
        this.navOption === 3 &&
        this.tasks[0].hasOwnProperty("collections")
      ) {
        // we've been adding a tab interface
        alert(`Add tab navigation to ${outputPageURL}`);
      }
      // finish up a successful task by moving it to completed
      let finishedTask = this.tasks.shift();
      finishedTask.completed = true;
      this.completedTasks.push(finishedTask);
      // start the next task
      this.startUpdate();
    }
  }
}
