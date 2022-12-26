/**
 * @class CollectionsDetails
 * @description Given a course Id retrieve and possibly update the content of
 * the Canvas Collections Configuration page
 */

import { wf_fetchData } from "./CanvasSetup";

export class CollectionsDetails {
//  public collections: object;

  private config: object;
  //  private csrfToken: string;
  private currentHostName: string;
  private baseApiUrl: string;
  //  private courseId: number;
  private finishedCallBack: Function;

  constructor(finishedCallBack : Function , config : object) {
    this.finishedCallBack = finishedCallBack;
    this.config = config;
    //    this.csrfToken = this.CONFIG.csrfToken;
    //    this.courseId = this.CONFIG.courseId;

    this.currentHostName = document.location.hostname;
    this.baseApiUrl = `https://${this.currentHostName}/api/v1`;
    // convert courseId to integer
    this.config.courseId = parseInt(this.config.courseId);

    console.log(
      "collectionsDetails: constructor: this.courseId = " + this.config.courseId
    );

  }
}
