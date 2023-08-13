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
 * @class CanvasDetails
 * @description Given a course Id retrieve the info Collections requires
 * about the course and its modules via Canvas API calls
 * 
 * Currently it's done via sequential calls to the following Canvas API calls
 * - requestCourseObject
 * - requestModuleContents
 * 
 * refreshCanvasDetails also available to refresh everything every once and a while
 * 
 * TODO
 * - Probably more efficient to do these in parallel
 * - Add requestModuleCompletion (iff only current user is a student) to add completion
 *   But a challenge here will be how keep this up to date with student progress
 */

import { configStore } from "../stores";
import { get } from "svelte/store";

import { wf_fetchData } from "./CanvasSetup";

export class CanvasDetails {
  public courseObject: object;
  public courseModules: object;
  public studyPeriod: string;
  public courseCode: string;

  private courseModuleItems: object;

  private config: object;
  //  private csrfToken: string;
  private configStore = get(configStore);
  private currentHostName: string;
  private baseApiUrl = this.configStore["baseApiUrl"];
  private isStudent = !this.configStore["editMode"];
  //  private courseId: number;
  private finishedCallBack: Function;
  //  private calendar: UniversityDateCalendar;

  private strm: string;
  private year: string;
  private period: string;

  /**
   * Set up the object and request from Canvas details on the user and their current enrollments
   * @callBack finishedCallBack - function to change the state of the parent component
   * @param {Object} config - configuration object
   */

  constructor(finishedCallBack, config) {
    this.finishedCallBack = finishedCallBack;
    this.config = config;
    //    this.csrfToken = this.CONFIG.csrfToken;
    //    this.courseId = this.CONFIG.courseId;

    this.currentHostName = document.location.hostname;
    //    this.baseApiUrl = this.configStore["baseApiUrl"] //`https://${this.currentHostName}/api/v1`;
    // convert courseId to integer
    this["config"]["courseId"] = parseInt(this["config"]["courseId"]);

    this.requestCourseObject();
  }

  /**
   * @method refreshCanvasDetails
   * @param {Function} callBack
   */
  refreshCanvasDetails(callBack: Function) {
    this.finishedCallBack = callBack;
    this.requestCourseObject();
  }

  /**
   * @function requestCourseObject
   *
   */

  requestCourseObject() {
    wf_fetchData(`${this.baseApiUrl}/courses/${this.config.courseId}`).then(
      (msg) => {
        if (msg.status === 200) {
          this.courseObject = msg.body;
          //this.generateSTRM()
          this.requestModulesItems();
        }
      }
    );
  }

  /**
   * @function requestModuleInformation
   * @descr Request all the module information for the course
   * TODO 
   * - To handle requirements will need check for student will need to 
   *    add &student_id=<studentCanvasId>
   */

  requestModulesItems() {
    wf_fetchData(
      `${this.baseApiUrl}/courses/${this.config.courseId}/modules?include=items&per_page=500`
      //`${this.baseApiUrl}/courses/${this.config.courseId}/modules?include=items&per_page=500&student_id=23854443`
    ).then((msg) => {
      if (msg.status === 200) {
        this.courseModules = msg.body;
        this.requestModulesCompletion();
      }
    });
  }

  /**
   * @function requestModuleCompletionInformation
   * @descr If the user is a student then request the module completion information
   */

  requestModulesCompletion() {
    const studentId = '23854443';
    //if (this.isStudent) {
    if (true) {
      wf_fetchData(
        `${this.baseApiUrl}/courses/${this.config.courseId}/modules?include=items&per_page=500&student_id=${studentId}`
      ).then((msg) => {
        if (msg.status === 200) {
          this.courseModuleItems = msg.body;
          this.summariseCompletion();
          this.finishedCallBack();
        }
      });
    } else {
      this.finishedCallBack();
    }
  }

  /**
   * @function summariseCompletion
   * @descr For each module item in this.courseModules add a propery complection_summary
   *    {
   *      "completion_count": <number of items with completion requirements>,
   *      "completed_count": <number of items with completion requirements completed>,
   *    }
   * Based on data from this.courseModuleItems
   * 
   * Complication during testing as staff member with hard coded student
   * - staff member can see all unpublished modules
   * - student can't so courseModulesItems array isn't the same as courseModules
   *   (will be for a student)
   * - hence need to create a hash for both arrays keyed on the id property
   */

  summariseCompletion() {
    // create necessary work around hashes
    const courseModulesHash = {};
    this.courseModules.forEach((module) => {
      courseModulesHash[module["id"]] = module;
    });
    const courseModuleItemsHash = {};
    this.courseModuleItems.forEach((module) => {
      courseModuleItemsHash[module["id"]] = module;
    });

    // loop through the courseModulesHash
    for (const key in courseModulesHash) {
      // initialise the completion_summary object
      courseModulesHash[key]["completion_summary"] = {
        completion_count: 0,
        completed_count: 0,
      };

      // skip to next if the module doesn't have any items
      if (!courseModuleItemsHash.hasOwnProperty(key)) {
        continue;
      }

      // loop through each item in the module
      courseModuleItemsHash[key]["items"].forEach((item) => {
        // if the item has a completion requirement property
        if (item.hasOwnProperty("completion_requirement")) {
          courseModulesHash[key]["completion_summary"]["completion_count"]++;
          // if the item is completed
          if (item["completion_requirement"]["completed"]) {
            // increment the completed_count
            courseModulesHash[key]["completion_summary"]["completed_count"]++;
          }
        }
      });
    }


  }

}


