/**
 * @class CanvasDetails
 * @description Given a course Id retrieve the info Collections requires
 * about the course and its modules via Canvas API calls
 */

import { wf_fetchData } from "./CanvasSetup";
import UniversityDateCalendar from "./university-date-calendar";

export class CanvasDetails {
  public courseObject: object;
  public courseModules: object;
  public studyPeriod: string;
  public courseCode: string;


  private config: object;
  //  private csrfToken: string;
  private currentHostName: string;
  private baseApiUrl: string;
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
    this.baseApiUrl = `https://${this.currentHostName}/api/v1`;
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
          this.generateSTRM()
          this.requestModuleInformation();
        }
      }
    );
  }

  /**
   * @descr Examine Canvas course object's course_code attribute in an attempt
   * to extract the STRM and subsequently calculate the year, period and
   * other data
   *
   * Production sites:
   *    Organisational Communication (COM31_2226)
   *
   * DEV sites:
   *    DEV_2515LHS_3228
   *
   * ORG sites:
   *     AEL_SHOW1
   *
   * TODO rejig based on scapeLib/parseCourseInstanceId (ael-automation)
   * In particular to handle the "YP" course ids
   */

  generateSTRM() {
    if (!this.hasOwnProperty("calendar")) {
      this.calendar = new UniversityDateCalendar();
    }

    // TODO this is where we might check if there is an existing default
    // study period already set and thus bypass getCurrentPeriod

    // we pass course_code to calendar because it's the main object that is
    // available to all users. the sis_course_id might be better but students
    // don't see it
    this.studyPeriod = this.calendar.getCurrentPeriod(
      this.courseObject.course_code
    );
    this.calendar.setStudyPeriod(this.studyPeriod);
    // aboutStudyPeriod is an object with human readable information about the
    // study period - typically strings for
    // - year - full year
    // - period - descriptive name for the period
    // - type - string specifying the type of study period
    //		this.aboutStudyPeriod = this.calendar.parseStudyPeriod(this.studyPeriod);

    this.parseStrm();
  }

  /**
   * @descr Parse the STRM and set the type, year, period
   * Based on Griffith STRM definition
   * https://intranet.secure.griffith.edu.au/computing/using-learning-at-griffith/staff/administration/course-ID
   */

  parseStrm() {
    this.type = undefined;
    this.year = undefined;
    this.period = undefined;

    // return if this.strm undefined
    if (this.strm === undefined) {
      return;
    }

    // break up this.strm into individual characters
    const strm = this.strm.split("");

    // if more than four chars then return
    if (strm.length > 4) {
      console.error(`cc_Controller: parseStrm: strm too long: ${this.strm}`);
      return;
    }

    // check all chars are numeric
    for (let i = 0; i < strm.length; i++) {
      if (isNaN(strm[i])) {
        console.error(
          `cc_Controller: parseStrm: strm not numeric: ${this.strm}`
        );
        return;
      }
    }

    this.type = strm[0];
    // this.year is the middle two characters prepended by 20
    this.year = `20${strm[1]}${strm[2]}`;
    // this.period (initially) is that last char
    this.period = strm[3];

    // period value needs translation based on type

    // default is Griffith trimester
    let translate = { 1: 1, 5: 2, 8: 3 };
    if (this.type === 2) {
      translate = { 1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4 };
    }
    this.period = translate[this.period];
  }

  requestModuleInformation() {
    wf_fetchData(
      `${this.baseApiUrl}/courses/${this.config.courseId}/modules?include=content_details&per_page=500`
    ).then((msg) => {
      if (msg.status === 200) {
        this.courseModules = msg.body;
        this.finishedCallBack();
      }
    });
  }
}
