/**
 * @file editingOnController.ts
 * @description Ensure only one browser window can be editing Collections at a time
 * - Manage the creation of a "Canvas Collections - editing" Canvas page that contains the
 *   canvas user id and a unique browser session id identifying the person editing
 */

import { getPageName } from "./CanvasSetup";

import { v4 as uuidv4 } from "uuid";

const EDITING_ON_PAGE_NAME = "Canvas Collections - editing";

// the possible status for editing on 
enum EDITING_ON_STATUS {
	  NO_ONE_EDITING = 0,
	  SOMEONE_ELSE_EDITING = 1,
	  YOU_EDITING_ELSEWHERE = 2,
	  YOU_EDITING = 3
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

  /**
   * @constructor
   * @description Read the EDITING_ON_PAGE_NAME page and if it exists, set the editingDetails property
   */
  public constructor(courseId: number, userId: number) {
    this.courseId = courseId;
    this.canvasUserId = userId;
	this.browserSessionId = uuidv4() //`${userId}-${new Date().getTime()}}`

    getPageName(
      EDITING_ON_PAGE_NAME,
      `${courseId}`,
      this.updateEditingDetails.bind(this)
    );
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
    console.log(`----------------updateEditingDetails -- ${pageName}`);
    console.log(msg);
    if (msg.hasOwnProperty("body") && msg.body.length > 0) {
      // page exists - parse the body content and set editingDetails
      this.editingDetails = JSON.parse(msg.body);
	  this.setEditingOnStatus()
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
	return EDITING_ON_STATUS.YOU_EDITING;
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
  public turnEditOn(
    userId: number,
    sessionId: string,
    finishCallback: Function
  ) {
    this.finishCallback = finishCallback;

    // get latest editing Details
    getPageName(
      EDITING_ON_PAGE_NAME,
      `${this.courseId}`,
      this.checkEditingDetails.bind(this)
    );
  }

  /**
   * @method checkEditingDetails
   * @param pageName - name of page that was read
   * @param msg - outcome of reading the page the body of the Canvas API
   * @description First check in the process of turning editing on - get the latest setting
   * - if someone else is editing (msg.body contains details not out own)
   *      - call the finishCallback with their details
   * - if no-end editing (no file or msg.body is empty)
   *      - create the page with our details (writeEditingDetails)
   */
  private checkEditingDetails(pageName, msg) {
    // modify local details with what was found
    // - at end this.editingDetails will contain the latest details
    this.updateEditingDetails(pageName, msg);

      //
      this.finishCallback(this.editingDetails);
  }

  public turnEditOff() {
	return;
  } 
}
