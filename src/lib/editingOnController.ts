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

/**
 * @file editingOnController.ts
 * @description Ensure only one browser window can be editing Collections at a time
 * - Manage the creation of a "Canvas Collections - editing" Canvas page that contains the
 *   canvas user id and a unique browser session id identifying the person editing
 * Public methods:
 * - turnEditOn - turn editing on
 * - turnEditOff - turn editing off
 * - getEditingOnStatus - get the status of editing on  TODO maybe make this private
 */

import { getPageName, wf_deleteData, wf_postData } from "./CanvasSetup";

import { v4 as uuidv4 } from "uuid";

const EDITING_ON_PAGE_NAME = "Canvas Collections - editing";
export const EDITING_ON_PAGE_NAME_SLUG = "canvas-collections-editing";

// the possible status for editing on
export enum EDITING_ON_STATUS {
  NO_ONE_EDITING = 0,
  SOMEONE_ELSE_EDITING = 1,
  YOU_EDITING_ELSEWHERE = 2,
  YOU_EDITING = 3,
}

export class editingOnController {
  // two possible values
  // - null no data yet on who is editing
  // - if data has been gotten, an object with the following properties:
  //   - canvasUserId: the canvas user id of the person editing
  //   - browserSessionId: a unique browser session id identifying the person editing
  // These values will be null if no one is editing
  private editingDetails: { canvasUserId: number; browserSessionId: string } =
    null;
  private editingOnStatus: EDITING_ON_STATUS = null;

  // Canvas course id
  private courseId: number = null;
  private canvasUserId: number = null;
  private browserSessionId: string = null;

  // used at end of turnEditOn
  private finishCallback: Function = null;
  private csrfToken: string = null;

  // specif time period before a stale lock is assumed (ms)
  private timeForStaleLock: number = 10;

  /**
   * @constructor
   * @param courseId - Canvas course id
   * @param userId - Canvas user id
   * @param csrf - Canvas csrf token
   * @param timeForStaleLock - time in milli-seconds before a lock is considered stale
   * @description Read the EDITING_ON_PAGE_NAME page and if it exists, set the editingDetails property
   */
  public constructor(courseId: number, userId: number, csrf: string, timeForStaleLock: number = 10) {
    this.courseId = courseId;
    this.canvasUserId = userId;
    this.csrfToken = csrf;
    this.timeForStaleLock = timeForStaleLock;

    this.browserSessionId = uuidv4();

    getPageName(
      EDITING_ON_PAGE_NAME,
      `${courseId}`,
      this.updateEditingDetails.bind(this)
    );
  }

  public getEditingOnStatus() {
    return this.editingOnStatus;
  }

  public getEditingDetails() {
    return this.editingDetails;
  }

  public getSessionId() {
    return this.browserSessionId;
  }

  /**
   * @method updateEditingDetails
   * @param pageName - name of page that was read
   * @param msg - outcome of reading the page the body of the Canvas API
   * - if page doesn't exists will contain "message": "Page not found"
   * - if page does exist, the full Canvas object
   *    https://canvas.instructure.com/doc/api/pages.html#Page
   */

  private updateEditingDetails(pageName, msg) {
    if (msg.hasOwnProperty("body") && msg.body.length > 0) {
      // page exists   
      /* stale lock check should be done in the calling function -
        as they have differing requirements
      if (this.staleEditLock(msg)) {
        /// we've tried to turn edit on, but the lock is stale
        // If it's someone else editing
        // - need to delete the page and then try again to turn edit on
        // hence the finalCallBack will actually be to turn edit on again
        alert("stale edit lock");
        // TODO delete the page and then start the turnEditOn process again
        // MAYBE we just need to set no editing so the return will create a new page
        this.editingOnStatus = EDITING_ON_STATUS.NO_ONE_EDITING;

      } else { */
        // - parse the body content and set editingDetails
        this.editingDetails = JSON.parse(msg.body);
        this.setEditingOnStatus();
      //}
    } else {
      // page doesn't exist - set editingDetails to null
      this.editingOnStatus = EDITING_ON_STATUS.NO_ONE_EDITING;
      this.editingDetails = {
        canvasUserId: null,
        browserSessionId: null,
      };
    }
  }

  /**
   * @function staleEditLock()
   * @param msg - outcome of reading the page the body of the Canvas API
   * @returns {boolean} - true if the edit lock is stale
   * @description parse the msg.updated_at and compare to the current time
   * - if the difference is greater than 10 seconds, return true
   */

  private staleEditLock(msg) {
    // does this need to do any other checks on what's in the msg
    let now = new Date();
    let updated_at = new Date(msg.updated_at);
    let diff = (now.getTime() - updated_at.getTime()) / 1000;
    return diff > this.timeForStaleLock;
  }

  /**
   * @method setEditingOnStatus
   * @description Set the editingOnStatus property based on the editingDetails property
   *	  NO_ONE_EDITING canvasUserId===null
   *     SOMEONE_ELSE_EDITING canvasUserId !== this.canvasUserId
   *  YOU_EDITING_ELSEWHERE canvasUserId matches but not browserSessionId
   *  YOU_EDITING = canvasUserId and browserSessionId match
   */
  private setEditingOnStatus() {
    // NO_ONE_EDITING canvasUserId===null
    if (this.editingDetails.canvasUserId === null) {
      this.editingOnStatus = EDITING_ON_STATUS.NO_ONE_EDITING;
      return;
    }
    // SOMEONE_ELSE_EDITING canvasUserId !== this.canvasUserId
    if (this.editingDetails.canvasUserId !== this.canvasUserId) {
      this.editingOnStatus = EDITING_ON_STATUS.SOMEONE_ELSE_EDITING;
      return;
    }
    // YOU_EDITING_ELSEWHERE canvasUserId matches but not browserSessionId
    if (this.editingDetails.browserSessionId !== this.browserSessionId) {
      this.editingOnStatus = EDITING_ON_STATUS.YOU_EDITING_ELSEWHERE;
      return;
    }
    this.editingOnStatus = EDITING_ON_STATUS.YOU_EDITING;
  }

  /**
   * @method getDetails
   * @returns {Object} - an object with the following properties:
   * - canvasUserId: the canvas user id of the person editing
   * - browserSessionId: a unique browser session id identifying the person editing
   * @description getter for editingDetails
   */
  public getDetails(): Object {
    return this.editingDetails;
  }

  public getBrowserSessionId(): string {
    return this.browserSessionId;
  }

  /**
   * @method getStatus
   * @returns {EDITING_ON_STATUS} - the current editing on status
   * @description getter for editingOnStatus
   */
  public getStatus(): EDITING_ON_STATUS {
    return this.editingOnStatus;
  }

  /**
   * @method turnEditOn
   * @param userId - canvas user id of the person turning editing on
   * @param sessionId - a unique browser session id identifying the person turning editing on
   * @description Attempt to turn Collections editing on for the current user
   * If successful, the EDITING_ON_PAGE_NAME page will be created or updated
   * with the current user's details
   * - get the latest editing details (content of the page)
   * - if nothing, write the page with the current user's details
   * - get the latest editing details again
   * - if they now contain our information, call the callback
   */
  public turnEditOn(finishCallback: Function) {
    this.finishCallback = finishCallback;
    console.log(`------- starting turnEditOn - sessionId ${this.browserSessionId}`)

    // get latest editing Details
    getPageName(
      EDITING_ON_PAGE_NAME,
      `${this.courseId}`,
      this.canWeTurnEditOn.bind(this)
    );
  }

  /**
   * @method canWeTurnEditOn
   * @param pageName - name of page that was read
   * @param msg - outcome of reading the page the body of the Canvas API
   * @description First check in the process of turning editing on - get the latest setting
   * - if someone else is editing (msg.body contains details not out own)
   *      - call the finishCallback with their details
   * - if no-end editing (no file or msg.body is empty)
   *      - create the page with our details (writeEditingDetails)
   */
  private canWeTurnEditOn(pageName, msg) {
    // TODO check for stale edit lock

    // change based on what we got back, all error handling in there
    this.updateEditingDetails(pageName, msg);

    if ( this.staleEditLock(msg) ) {
      console.log(`canWeTurnEditOn - stale lock status ${this.editingOnStatus}`)
      // if not YOU_EDITING then we should remove the stale edit lock
      if (this.editingOnStatus!== EDITING_ON_STATUS.YOU_EDITING) {
        // maybe we just want the user and explain what they can do??
        console.log(" .   ---- figure out how to delete the page and then start turnEditOn again")
        // do we just create the editingOnPage again
        this.createEditingOnPage()
      } else {
        // it's us so we want to update the page, do we just do the createEditingOnPage
        // THIS appears to work
        console.log(" .   ---- need to re-create the page so we're able to go again")
        this.createEditingOnPage()
      }
      // if YOU_EDITING we need to refresh the edit lock
    } else if (this.editingOnStatus === EDITING_ON_STATUS.NO_ONE_EDITING) {
      // no-one is editing, so go ahead and create the page
      this.createEditingOnPage();
    } else {
      // we can't edit because either
      // - I'm editing here
      // - I'm editing elsewhere
      // - someone else is editing
      this.finishCallback(this.editingOnStatus, this.editingDetails);
    }
  }

  /**
   * @method createEditingOnPage()
   * @description Create the page with our details
   */
  private createEditingOnPage() {
    let callUrl = `/api/v1/courses/${this.courseId}/pages/${EDITING_ON_PAGE_NAME_SLUG}`;

    // create content as JSON string from editingDetails
    let content = JSON.stringify({
      canvasUserId: this.canvasUserId,
      browserSessionId: this.browserSessionId,
    });

    let _body = {
      wiki_page: {
        title: EDITING_ON_PAGE_NAME,
        body: content,
      },
    };

    //      let method = "put";

    const bodyString = JSON.stringify(_body);

    wf_postData(callUrl, bodyString, this.csrfToken, "PUT").then((data) => {
      this.checkCreation(data);
    });
  }

  /**
   * @method checkCreation
   * @param data - the response from the Canvas API for creating the page
   * @description callback after attempt to createEditingOnPage check the response,
   * - if successful, try to get the editing details again to check, it's still me
   */

  private checkCreation(data) {
    // update editing details - a way to check
    // editing status will be set based on the created page
    this.updateEditingDetails(EDITING_ON_PAGE_NAME, data);

    // if we're editing, do a last double check and get the details in the file
    if (this.editingOnStatus === EDITING_ON_STATUS.YOU_EDITING) {
      getPageName(
        EDITING_ON_PAGE_NAME,
        `${this.courseId}`,
        this.finalCheckForEditOnOff.bind(this)
      );
    } else {
      // otherwise we'll finish the call back here
      // other people are editing and the status/details should show that
      this.finishCallback(this.editingOnStatus, this.editingDetails);
    }
  }

  /**
   * @method finalCheckForEditOnOff
   * @param pageName - name of page that was read
   * @param msg - the response from the Canvas API for reading the page
   * @description Callback as the final stage of turning editing on/off
   * - it appears we've successfully created the 'edit' page with our details
   *    (or assume we deleted it)
   * - we've asked for the file again to update editStatus with current settings
   *   - turnEditOn
   *     - Idea being to avoid danger of race conditions?
   *     - should have our details
   *   - turnEditOff
   *     - should be no details, or maybe someone else
   * - either way set the details and ask the App's callback to figure out
   *   what to do with the information
   */
  private finalCheckForEditOnOff(pageName: string, msg: any) {
    this.updateEditingDetails(pageName, msg);

    this.finishCallback(this.editingOnStatus, this.editingDetails);
  }

  /**
   * @method turnEditOff
   * @param finishCallback - callback to call when editing is turned off
   * @description Attempt to turn Collections editing off for the current user
   * - delete the page, but only if it contains our details
   */
  public turnEditOff(finishCallback: Function) {
    console.log(`------- starting turnEditOff - sessionId ${this.browserSessionId}`)
    this.finishCallback = finishCallback;

    // check it's still our page
    getPageName(EDITING_ON_PAGE_NAME, `${this.courseId}`, this.canWeTurnEditOff.bind(this));

    console.log(" .   1 called getPageName - going home")

    return;
  }

  private canWeTurnEditOff(pageName, msg) {
    let callUrl = `/api/v1/courses/${this.courseId}/pages/${EDITING_ON_PAGE_NAME_SLUG}`;

    console.log(" .   2 canWeTurnEditOff")

    // check the resule
    this.updateEditingDetails(pageName, msg);

    console.log( ` .   3 canWeTurnEditOff - editingOnStatus ${this.editingOnStatus}`)

    if (this.staleEditLock(msg)) {
      console.log(`canWeTurnEditOff - stale lock status ${this.editingOnStatus}`)
      // if it's us editing - we can just keep on going
      // if it's someone else we need to remove it
      // Not sure if this can ever happen
      if ( this.editingOnStatus!== EDITING_ON_STATUS.YOU_EDITING) {
        console.log(" .  Someone else's stale lock - we can delete the page")
        wf_deleteData(callUrl, this.csrfToken).then((data) => {
          console.log(" .   5 canWeTurnEditOff - page deleted")
          this.checkDeletion(data);
        });
      }
    } else if (this.editingOnStatus === EDITING_ON_STATUS.YOU_EDITING) {
      // we are editing, delete the edit page
      console.log(" .   4 canWeTurnEditOff - deleting page")
      wf_deleteData(callUrl, this.csrfToken).then((data) => {
        console.log(" .   5 canWeTurnEditOff - page deleted")
        this.checkDeletion(data);
      });
      console.log(" .   4b canWeTurnEditOff - page delete called")
    } else {
      console.log(" .   4c canWeTurnEditOff - page not deleted")
     this.finishCallback(this.editingOnStatus, this.editingDetails);
    }
  }


  /**
   * @method checkDeletion
   * @param data  - the response from the Canvas API for deleting the page
   * @description Callback after attempt to delete the page. Regardless of what happened
   * get the edit page again and set the edit status appropriately.
   * Hand it back to App to figure out what to do
   */
  private checkDeletion(data) {
    getPageName(
      EDITING_ON_PAGE_NAME,
      `${this.courseId}`,
      this.finalCheckForEditOnOff.bind(this)
    );
  }
}
