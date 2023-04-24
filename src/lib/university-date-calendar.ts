// Copyright (C) 2023 David Jones
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

/* jshint esversion: 6 */

export default class UniversityDateCalendar {
  //private static instance: UniversityDateCalendar;
  private studyPeriod: string;

  public constructor(strm = DEFAULT_PERIOD) {
    //public static getInstance(strm = DEFAULT_PERIOD): UniversityDateCalendar {
    /*if (strm && CALENDAR[strm]) {
      this.studyPeriod = strm;
    } */
    this.setStudyPeriod(strm);
  }

  /**
   * @method setStudyPeriod
   * @param studyPeriod
   * @description Check that the default study period actually exists in the calendar
   * If so, set the default study period to the given study period and return true
   */
  public setStudyPeriod(studyPeriod: string): boolean {
    if (studyPeriod !== "" && CALENDAR.hasOwnProperty(studyPeriod)) {
      this.studyPeriod = studyPeriod;
      return true;
    }
    // set studyPeriod to DEFAULT_PERIOD, if not already set
    if (this.studyPeriod === undefined) {
      this.studyPeriod = DEFAULT_PERIOD;
    }
    return false;
  }

  public getStudyPeriod(): string {
    return this.studyPeriod;
  }

  /**
   * @function getHumanReadableStudyPeriod
   * @returns {String} the human readable version of the current study period
   * @description Current implemented for Griffith course id's version of term code
   * https://intranet.secure.griffith.edu.au/computing/using-learning-at-griffith/staff/administration/course-ID
   * Four digits
   * - first digit is the type of course
   * - middle two digits are the year (20 + XX)
   * - final digit is the term
   */
  public getHumanReadableStudyPeriod() {
    const typeOfCourse = {
      3: "GU",
      2: "OUA",
      6: "Accelerated Online",
      1: "GELI",
    };
    const termMap = {
      // OUA courses
      2: {
        1: "Study Period 1",
        2: "Session 1",
        3: "Study Period 2",
        4: "Session 2",
        5: "Study Period 3",
        6: "Session 3",
        7: "Study Period 4",
      },
      3: {
        1: "Trimester 1",
        5: "Trimester 2",
        8: "Trimester 3",
      },
      6: {
        1: "Teaching Period 1",
        2: "Teaching Period 2",
        3: "Teaching Period 3",
        4: "Teaching Period 4",
        5: "Teaching Period 5",
        6: "Teaching Period 6",
      },
    };

    // extract the first, middle two and last digital from studyPeriod
    const courseType = this.studyPeriod[0];
    const year = this.studyPeriod.slice(1, 3);
    const term = this.studyPeriod[3];

    return `${termMap[courseType][term]} 20${year}`;
  }

  /**
   * @function getWeekDetails
   * @param {String} period
   * @param {String} week
   * @returns {Object} the correct start/stop dates for the givern period/week
   * null if doesn't exist
   * if no week specified, returns the object for the STRM that specifies the
   * weeks
   */
  public getWeekDetails(week = "all", period = this.studyPeriod) {
    // by default return the object for the current period
    if (week === "all") {
      return CALENDAR[period];
    }

    // if week is a string starting with "Week" remove
    // the Week and convert number of integer
    if (typeof week === "string" && week.startsWith("Week")) {
      //week = parseInt(week.substring(4));
      week = week.substring(4);
    }
    // only proceed if the period and week are in the CALENDAR
    if (!(period in CALENDAR)) {
      return null;
    } else if (!(week in CALENDAR[period])) {
      return null;
    }

    return CALENDAR[period][week];
  }

  public getDaysOfWeek() {
    return DAYS_OF_WEEK;
  }

  /**
   * Generate a object that specifies the full date for a given study period date.
   * e.g. converts Tuesday Week 1 to
   * { date: "", month: "", week: 1: year: 2019 }
   * Based on the specified study period and the calendar above
   * @param {Integer} week - week of university term
   * @param {Boolean} startWeek - if true, returns the start date of the week
   * @param {String} dayOfWeek - specify the day to return
   * @returns {Object} specifying the day, month, year of the week
   */
  public getDate(week, startWeek = true, dayOfWeek = "Monday") {
    let date = {
      day: "",
      date: "",
      month: "",
      week: week,
      year: 0,
    };

    // lowercase dayOfWeek
    dayOfWeek = dayOfWeek.toLowerCase();

    // get the details for the given week
    let weekDetails = this.getWeekDetails(week);

    // if no details for the week, return empty date
    if (weekDetails === null) {
      return date;
    }
    // weekDetails/date format
    // 0: { start: "2022-03-07", stop: "2022-03-13" },

    let d = new Date(weekDetails.start);

    const dayToNum = {
      tuesday: 1,
      tue: 1,
      wednesday: 2,
      wed: 2,
      thursday: 3,
      thu: 3,
      friday: 4,
      fri: 4,
      saturday: 5,
      sat: 5,
      sunday: 6,
      sun: 6,
    };

    if (dayOfWeek !== "monday") {
      date.day = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.substring(1, 3);
      if (dayOfWeek in dayToNum) {
        d.setDate(d.getDate() + dayToNum[dayOfWeek.toLowerCase()]);
      }
    }

    date.month = MONTHS[d.getMonth()];
    date.date = d.getDate().toString();
    date.year = d.getFullYear();

    return date;
  }

  /**
   * @function getFirstDayOfWeek
   * @param {Integer} week - week of university term
   * @param {String} period - study period
   * @returns {String} the first day of the week according to the calendar
   * @description University specific way of identifying the first day of the week
   */
  getFirstDayOfWeek(week = 1, period = this.studyPeriod) {
    return "Monday";
  }

  /**
   * getCurrentPeriod
   * @descr Examine Canvas course object's course_code attribute in an attempt
   * to extract the STRM and subsequently calculate the year, period and
   * other data -- assumes a Griffith University course code format which is
   * currently
   *
   * Production sites:
   *    Organisational Communication (COM31_2226)
   *    - study period 2226
   *
   * Production sites - joined courses
   *    Introduction to Sculpture (1252QCA_3228/7252QCA_3228)
   *
   * DEV sites:
   *    DEV_2515LHS_3228
   *    - study period 3228
   *
   * ORG sites:
   *     AEL_SHOW1
   *     - no study period
   *
   * TODO rejig based on scapeLib/parseCourseInstanceId (ael-automation)
   * In particular to handle the "YP" course ids
   */

  public getCurrentPeriod(courseCode) {
    // Kludge for DEV courses that don't have brackets
    if (courseCode.match(/^DEV_/)) {
      courseCode = `(${courseCode})`;
    }
    // check that the courseCode includes open/close brackets
    if (!courseCode.match(/\(.*\)/)) {
      return this.studyPeriod;
    }
    // extract out each of the individual courseIds in courseCode
    // e.g. joined courses could have multiple
    const courseIds = courseCode
      .match(/\([^()]+\)(?=[^()]*$)/, "")[0]
      .replace(/[\(\)]/g, "") // Remove parentheses from the remaining string
      .split("/"); // break up the string on delineating /

    // process each courseId separately and try to separate out two components
    // courseCode - e.g. 1252QCA
    // STRM - e.g. 3228
    let courseIdsComponents = [];
    let QCM_Course = false;

    for (let courseId of courseIds) {
      // split up into the components
      let components = courseId.split("_");

      // want to identify the courseCode and the STRM
      let obj = {};
      for (let component of components) {
        let match = component.match(/^[0-9][0-9][0-9][0-9][A-Z][A-Z][A-Z]$/);
        if (match) {
          obj["courseCode"] = match[0];
          if (match[0].endsWith("QCM")) {
            QCM_Course = true;
          }
          continue;
        }
        match = component.match(/^[0-9][0-9][0-9][0-9]$/);
        if (match) {
          obj["STRM"] = match[0];
          continue;
        }
      }
      courseIdsComponents.push(obj);
    }

    // now get a unique list of the STRMs found in the courseCode
    let STRMs = courseIdsComponents.map((obj) => obj.STRM);
    // get unique list
    STRMs = [...new Set(STRMs)];

    if (STRMs.length === 0) {
      // if there aren't any, use the default
      if (QCM_Course) {
        return `${this.studyPeriod}QCM`;
      }
      return this.studyPeriod;
    } else if (STRMs.length > 1) {
      // more than one, report an error and use the first one
      console.error(`Multiple STRMs found in courseCode: ${courseCode}`);
    }
    // return the first STRM because there is at least one STRM
    if (QCM_Course) {
      return `${STRMs[0]}QCM`;
    }
    return STRMs[0];
  }
}

// Calendar for Griffith University
// Period is represented by a four digit number - an STRM
// XYYP
// - X is the type of offering
//   - 2 indicates OUA course
//   - 3 indicates normal Griffith course
// - YY is the year (last two digits)
//   - 19 is 2019
//   - 21 is 2021
// - P is the particular period for the offering
//   - OUA has study periods
//     - 1 = period 1
//     - 3 = period 2
//     - 5 = period 3
//     - 7 = period 4
//   - Griffith has 3 trimesters
//     - 1 = T1
//     - 5 = T2
//     - 8 = T3
// courseCode_STRM_mode
// default period is the current main trimester
const DEFAULT_PERIOD = "3231";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/* Griffith Calendar Term dates
 * 2021
 * - OUA Study Periods 1-4
 *   2211, 2213 2215 2217
 * - GU T1, T2, T3
 *   3211 3215 3218
 * - QCM T1 T2
 *   3211QCM 3215QCM
 * 2020
 * - OUA Study Periods 1-4
 *   2201 2203 2205 2207
 * - GU T1, T2, T3
 *   3201 3205 3208
 * 2019
 * - OUA SP 3, 4
 *   2195 2197
 * - GU T1, T2, T3
 *   3191 3195 319
 */

const CALENDAR = {
  // OUA - Study Period 1 - 2023
  "2231": {
    0: { start: "2023-02-20", stop: "2023-02-26" },
    1: { start: "2023-02-27", stop: "2023-03-05" },
    2: { start: "2023-03-06", stop: "2023-03-12" },
    3: { start: "2023-03-13", stop: "2023-03-19" },
    4: { start: "2023-03-20", stop: "2023-03-26" },
    5: { start: "2023-03-27", stop: "2023-04-02" },
    6: { start: "2023-04-03", stop: "2023-04-09" },
    7: { start: "2023-04-10", stop: "2023-04-16" },
    8: { start: "2023-04-17", stop: "2023-04-23" },
    9: { start: "2023-04-24", stop: "2023-04-30" },
    10: { start: "2023-05-01", stop: "2023-05-07" },
    11: { start: "2023-05-08", stop: "2023-05-14" },
    12: { start: "2023-05-15", stop: "2023-05-21" },
    13: { start: "2023-05-22", stop: "2023-05-28" },
    14: { start: "2023-05-29", stop: "2023-06-04" },
    15: { start: "2023-06-05", stop: "2023-06-11" }
  },
  // 2023 ----------------
  // T3
  "3238": {
    0: { start: "2023-10-30", stop: "2023-11-05" },
    1: { start: "2023-11-06", stop: "2023-11-12" },
    2: { start: "2023-11-13", stop: "2023-11-19" },
    3: { start: "2023-11-20", stop: "2023-11-26" },
    4: { start: "2023-11-27", stop: "2023-12-03" },
    5: { start: "2023-12-04", stop: "2023-12-10" },
    6: { start: "2023-12-11", stop: "2023-12-17" },
    7: { start: "2023-12-18", stop: "2023-12-24" },
    8: { start: "2024-01-08", stop: "2024-01-15" },
    9: { start: "2024-01-15", stop: "2024-01-21" },
    10: { start: "2024-01-22", stop: "2024-01-28" },
    11: { start: "2024-01-29", stop: "2024-02-04" },
    12: { start: "2024-02-05", stop: "2024-02-11" },
    13: { start: "2024-02-12", stop: "2024-02-18" },
    14: { start: "2024-02-19", stop: "2024-02-25" },
    15: { start: "2024-02-26", stop: "2024-03-03" },
    //    exam: { start: "2023-02-17", stop: "2023-02-26" },
  },
  // T3
  "2236": {
    0: { start: "2023-10-30", stop: "2023-11-05" },
    1: { start: "2023-11-06", stop: "2023-11-12" },
    2: { start: "2023-11-13", stop: "2023-11-19" },
    3: { start: "2023-11-20", stop: "2023-11-26" },
    4: { start: "2023-11-27", stop: "2023-12-03" },
    5: { start: "2023-12-04", stop: "2023-12-10" },
    6: { start: "2023-12-11", stop: "2023-12-17" },
    7: { start: "2023-12-18", stop: "2023-12-24" },
    8: { start: "2024-01-08", stop: "2024-01-15" },
    9: { start: "2024-01-15", stop: "2024-01-21" },
    10: { start: "2024-01-22", stop: "2024-01-28" },
    11: { start: "2024-01-29", stop: "2024-02-04" },
    12: { start: "2024-02-05", stop: "2024-02-11" },
    13: { start: "2024-02-12", stop: "2024-02-18" },
    14: { start: "2024-02-19", stop: "2024-02-25" },
    15: { start: "2024-02-26", stop: "2024-03-03" },
    //    exam: { start: "2023-02-17", stop: "2023-02-26" },
  },
  // T2, 2023
  "3235": {
    0: { start: "2023-07-10", stop: "2023-07-16" },
    1: { start: "2023-07-17", stop: "2023-07-23" },
    2: { start: "2023-07-24", stop: "2023-07-30" },
    3: { start: "2023-07-31", stop: "2023-08-06" },
    4: { start: "2023-08-07", stop: "2023-08-13" },
    5: { start: "2023-08-21", stop: "2023-08-27" },
    6: { start: "2023-08-28", stop: "2023-09-03" },
    7: { start: "2023-09-04", stop: "2023-09-10" },
    8: { start: "2023-09-11", stop: "2023-09-17" },
    9: { start: "2023-09-18", stop: "2023-09-24" },
    10: { start: "2023-09-25", stop: "2023-10-01" },
    11: { start: "2023-10-02", stop: "2023-10-09" },
    12: { start: "2023-10-09", stop: "2023-10-15" },
    13: { start: "2023-10-16", stop: "2023-10-22" },
    14: { start: "2023-10-23", stop: "2023-10-29" },
    15: { start: "2023-10-30", stop: "2023-11-05" },
    exam: { start: "2023-10-19", stop: "2023-10-28" },
  },
  // SS, 2023
  "2234": {
    0: { start: "2023-07-10", stop: "2023-07-16" },
    1: { start: "2023-07-17", stop: "2023-07-23" },
    2: { start: "2023-07-24", stop: "2023-07-30" },
    3: { start: "2023-07-31", stop: "2023-08-06" },
    4: { start: "2023-08-07", stop: "2023-08-13" },
    5: { start: "2023-08-21", stop: "2023-08-27" },
    6: { start: "2023-08-28", stop: "2023-09-03" },
    7: { start: "2023-09-04", stop: "2023-09-10" },
    8: { start: "2023-09-11", stop: "2023-09-17" },
    9: { start: "2023-09-18", stop: "2023-09-24" },
    10: { start: "2023-09-25", stop: "2023-10-01" },
    11: { start: "2023-10-02", stop: "2023-10-09" },
    12: { start: "2023-10-09", stop: "2023-10-15" },
    13: { start: "2023-10-16", stop: "2023-10-22" },
    14: { start: "2023-10-23", stop: "2023-10-29" },
    15: { start: "2023-10-30", stop: "2023-11-05" },
    exam: { start: "2023-10-19", stop: "2023-10-28" },
  },
  // T2 2023, QCM/QCGU - the con calendar
  "3235QCM": {
    0: { start: "2023-07-17", stop: "2023-07-23" },
    1: { start: "2023-07-24", stop: "2023-07-23" },
    2: { start: "2023-07-31", stop: "2023-08-06" },
    3: { start: "2023-08-07", stop: "2023-08-13" },
    4: { start: "2023-08-14", stop: "2023-08-21" },
    5: { start: "2023-08-21", stop: "2023-08-27" },
    6: { start: "2023-09-04", stop: "2023-09-10" },
    7: { start: "2023-09-11", stop: "2023-09-17" },
    8: { start: "2023-09-18", stop: "2023-09-24" },
    9: { start: "2023-10-02", stop: "2023-10-08" },
    10: { start: "2023-10-09", stop: "2023-10-15" },
    11: { start: "2023-10-16", stop: "2023-10-22" },
    12: { start: "2023-10-23", stop: "2023-10-29" },
    13: { start: "2023-10-30", stop: "2023-11-05" },
    14: { start: "2023-11-06", stop: "2023-11-12" },
    15: { start: "2023-11-13", stop: "2023-11-19" },
    exam: { start: "2023-11-06", stop: "2023-11-18" },
  },
  // T1 2023
  "3231": {
    0: { start: "2023-02-27", stop: "2023-03-03" },
    1: { start: "2023-03-06", stop: "2023-03-12" },
    2: { start: "2023-03-13", stop: "2023-03-19" },
    3: { start: "2023-03-20", stop: "2023-03-26" },
    4: { start: "2023-03-27", stop: "2023-04-09" },
    5: { start: "2023-04-10", stop: "2023-04-16" },
    6: { start: "2023-04-17", stop: "2023-04-23" },
    7: { start: "2023-04-24", stop: "2023-04-30" },
    8: { start: "2023-05-01", stop: "2023-05-07" },
    9: { start: "2023-05-08", stop: "2023-05-14" },
    10: { start: "2023-05-15", stop: "2023-05-21" },
    11: { start: "2023-05-22", stop: "2023-05-28" },
    12: { start: "2023-05-29", stop: "2023-06-04" },
    13: { start: "2023-06-05", stop: "2023-06-11" },
    14: { start: "2023-06-12", stop: "2023-06-18" },
    15: { start: "2023-06-19", stop: "2023-07-25" },
    exam: { start: "2023-06-08", stop: "2023-06-17" },
  },
  // SS 2023
  "2232": {
    0: { start: "2023-02-27", stop: "2023-03-03" },
    1: { start: "2023-03-06", stop: "2023-03-12" },
    2: { start: "2023-03-13", stop: "2023-03-19" },
    3: { start: "2023-03-20", stop: "2023-03-26" },
    4: { start: "2023-03-27", stop: "2023-04-09" },
    5: { start: "2023-04-10", stop: "2023-04-16" },
    6: { start: "2023-04-17", stop: "2023-04-23" },
    7: { start: "2023-04-24", stop: "2023-04-30" },
    8: { start: "2023-05-01", stop: "2023-05-07" },
    9: { start: "2023-05-08", stop: "2023-05-14" },
    10: { start: "2023-05-15", stop: "2023-05-21" },
    11: { start: "2023-05-22", stop: "2023-05-28" },
    12: { start: "2023-05-29", stop: "2023-06-04" },
    13: { start: "2023-06-05", stop: "2023-06-11" },
    14: { start: "2023-06-12", stop: "2023-06-18" },
    15: { start: "2023-06-19", stop: "2023-07-25" },
    exam: { start: "2023-06-08", stop: "2023-06-17" },
  },
  // T1 2023, QCM/con calendar
  "3231QCM": {
    0: { start: "2023-02-20", stop: "2023-02-26" },
    1: { start: "2023-02-27", stop: "2023-03-05" },
    2: { start: "2023-03-06", stop: "2023-03-12" },
    3: { start: "2023-03-13", stop: "2023-03-19" },
    4: { start: "2023-03-20", stop: "2023-03-26" },
    5: { start: "2023-03-27", stop: "2023-04-02" },
    6: { start: "2023-04-10", stop: "2023-04-16" },
    7: { start: "2023-04-17", stop: "2023-04-23" },
    8: { start: "2023-04-24", stop: "2023-05-30" },
    9: { start: "2023-05-08", stop: "2023-05-14" },
    10: { start: "2023-05-15", stop: "2023-05-21" },
    11: { start: "2023-05-22", stop: "2023-05-28" },
    12: { start: "2023-05-29", stop: "2023-06-04" },
    13: { start: "2023-06-05", stop: "2023-06-11" },
    14: { start: "2023-06-12", stop: "2023-06-18" },
    15: { start: "2023-06-19", stop: "2023-07-25" },
    exam: { start: "2023-06-12", stop: "2023-06-24" },
  },
  // 2022
  "3221": {
    0: { start: "2022-03-07", stop: "2022-03-13" },
    1: { start: "2022-03-14", stop: "2022-03-20" },
    2: { start: "2022-03-21", stop: "2022-03-28" },
    3: { start: "2022-03-28", stop: "2022-04-03" },
    4: { start: "2022-04-04", stop: "2022-04-10" },
    5: { start: "2022-04-18", stop: "2022-04-24" },
    6: { start: "2022-04-25", stop: "2022-05-01" },
    7: { start: "2022-05-02", stop: "2022-05-08" },
    8: { start: "2022-05-09", stop: "2022-05-15" },
    9: { start: "2022-05-16", stop: "2022-05-22" },
    10: { start: "2022-05-23", stop: "2022-05-29" },
    11: { start: "2022-05-30", stop: "2022-06-05" },
    12: { start: "2022-06-06", stop: "2022-06-12" },
    13: { start: "2022-06-13", stop: "2022-06-19" },
    14: { start: "2022-06-20", stop: "2022-06-26" },
    15: { start: "2022-06-27", stop: "2022-07-03" },
    exam: { start: "2022-06-13", stop: "2022-06-25" },
  },
  "2222": {
    0: { start: "2022-03-07", stop: "2022-03-13" },
    1: { start: "2022-03-14", stop: "2022-03-20" },
    2: { start: "2022-03-21", stop: "2022-03-28" },
    3: { start: "2022-03-28", stop: "2022-04-03" },
    4: { start: "2022-04-04", stop: "2022-04-10" },
    5: { start: "2022-04-18", stop: "2022-04-24" },
    6: { start: "2022-04-25", stop: "2022-05-01" },
    7: { start: "2022-05-02", stop: "2022-05-08" },
    8: { start: "2022-05-09", stop: "2022-05-15" },
    9: { start: "2022-05-16", stop: "2022-05-22" },
    10: { start: "2022-05-23", stop: "2022-05-29" },
    11: { start: "2022-05-30", stop: "2022-06-05" },
    12: { start: "2022-06-06", stop: "2022-06-12" },
    13: { start: "2022-06-13", stop: "2022-06-19" },
    14: { start: "2022-06-20", stop: "2022-06-26" },
    15: { start: "2022-06-27", stop: "2022-07-03" },
    exam: { start: "2022-06-13", stop: "2022-06-25" },
  },
  "3221QCM": {
    0: { start: "2022-02-21", stop: "2022-02-27" },
    1: { start: "2022-02-28", stop: "2022-03-06" },
    2: { start: "2022-03-07", stop: "2022-03-13" },
    3: { start: "2022-03-14", stop: "2022-03-20" },
    4: { start: "2022-03-21", stop: "2022-03-27" },
    5: { start: "2022-03-28", stop: "2022-04-03" },
    6: { start: "2022-04-04", stop: "2022-04-10" },
    7: { start: "2022-04-18", stop: "2022-04-24" },
    8: { start: "2022-04-25", stop: "2022-05-01" },
    9: { start: "2022-05-09", stop: "2022-05-15" },
    10: { start: "2022-05-16", stop: "2022-05-22" },
    11: { start: "2022-05-23", stop: "2022-05-29" },
    12: { start: "2022-05-30", stop: "2022-06-05" },
    13: { start: "2022-06-06", stop: "2022-06-12" },
    14: { start: "2022-06-13", stop: "2022-06-19" },
    15: { start: "2022-06-20", stop: "2022-07-26" },
    exam: { start: "2022-06-13", stop: "2022-06-25" },
  },
  "3225": {
    0: { start: "2022-07-11", stop: "2022-07-17" },
    1: { start: "2022-07-18", stop: "2022-07-24" },
    2: { start: "2022-07-25", stop: "2022-07-31" },
    3: { start: "2022-08-01", stop: "2022-08-07" },
    4: { start: "2022-08-08", stop: "2022-08-14" },
    5: { start: "2022-08-22", stop: "2022-08-28" },
    6: { start: "2022-08-29", stop: "2022-09-04" },
    7: { start: "2022-09-05", stop: "2022-09-11" },
    8: { start: "2022-09-12", stop: "2022-09-18" },
    9: { start: "2022-09-19", stop: "2022-09-25" },
    10: { start: "2022-09-26", stop: "2022-10-02" },
    11: { start: "2022-10-03", stop: "2022-10-09" },
    12: { start: "2022-10-10", stop: "2022-10-16" },
    13: { start: "2022-10-17", stop: "2022-10-23" },
    14: { start: "2022-10-24", stop: "2022-10-30" },
    15: { start: "2022-10-31", stop: "2022-11-06" },
    exam: { start: "2022-10-20", stop: "2022-10-29" },
  },
  "2224": {
    0: { start: "2022-07-11", stop: "2022-07-17" },
    1: { start: "2022-07-18", stop: "2022-07-24" },
    2: { start: "2022-07-25", stop: "2022-07-31" },
    3: { start: "2022-08-01", stop: "2022-08-07" },
    4: { start: "2022-08-08", stop: "2022-08-14" },
    5: { start: "2022-08-22", stop: "2022-08-28" },
    6: { start: "2022-08-29", stop: "2022-09-04" },
    7: { start: "2022-09-05", stop: "2022-09-11" },
    8: { start: "2022-09-12", stop: "2022-09-18" },
    9: { start: "2022-09-19", stop: "2022-09-25" },
    10: { start: "2022-09-26", stop: "2022-10-02" },
    11: { start: "2022-10-03", stop: "2022-10-09" },
    12: { start: "2022-10-10", stop: "2022-10-16" },
    13: { start: "2022-10-17", stop: "2022-10-23" },
    14: { start: "2022-10-24", stop: "2022-10-30" },
    15: { start: "2022-10-31", stop: "2022-11-06" },
    exam: { start: "2022-10-20", stop: "2022-10-29" },
  },
  "3225QCM": {
    0: { start: "2022-07-18", stop: "2022-07-24" },
    1: { start: "2022-07-25", stop: "2022-07-31" },
    2: { start: "2022-08-01", stop: "2022-08-07" },
    3: { start: "2022-08-08", stop: "2022-08-14" },
    4: { start: "2022-08-15", stop: "2022-08-21" },
    5: { start: "2022-08-22", stop: "2022-08-28" },
    6: { start: "2022-09-05", stop: "2022-09-11" },
    7: { start: "2022-09-12", stop: "2022-09-18" },
    8: { start: "2022-09-19", stop: "2022-09-25" },
    9: { start: "2022-10-03", stop: "2022-10-09" },
    10: { start: "2022-10-10", stop: "2022-10-16" },
    11: { start: "2022-10-17", stop: "2022-10-23" },
    12: { start: "2022-10-24", stop: "2022-10-30" },
    13: { start: "2022-10-31", stop: "2022-11-06" },
    14: { start: "2022-11-07", stop: "2022-11-13" },
    15: { start: "2022-11-14", stop: "2022-07-20" },
    exam: { start: "2022-11-07", stop: "2022-11-19" },
  },
  3228: {
    0: { start: "2022-10-31", stop: "2022-11-06" },
    1: { start: "2022-11-07", stop: "2022-11-13" },
    2: { start: "2022-11-14", stop: "2022-11-20" },
    3: { start: "2022-11-21", stop: "2022-11-27" },
    4: { start: "2022-11-28", stop: "2022-12-04" },
    5: { start: "2022-12-05", stop: "2022-12-11" },
    6: { start: "2022-12-12", stop: "2022-12-18" },
    7: { start: "2022-12-19", stop: "2022-12-25" },
    8: { start: "2023-01-09", stop: "2023-01-15" },
    9: { start: "2023-01-16", stop: "2023-01-22" },
    10: { start: "2023-01-23", stop: "2023-01-29" },
    11: { start: "2023-01-30", stop: "2023-02-05" },
    12: { start: "2023-02-06", stop: "2023-02-12" },
    13: { start: "2023-02-13", stop: "2023-02-19" },
    14: { start: "2023-02-20", stop: "2023-02-26" },
    15: { start: "2023-02-27", stop: "2023-03-05" },
    //    exam: { start: "2023-02-17", stop: "2023-02-26" },
  },
  2226: {
    0: { start: "2022-10-31", stop: "2022-11-06" },
    1: { start: "2022-11-07", stop: "2022-11-13" },
    2: { start: "2022-11-14", stop: "2022-11-20" },
    3: { start: "2022-11-21", stop: "2022-11-27" },
    4: { start: "2022-11-28", stop: "2022-12-04" },
    5: { start: "2022-12-05", stop: "2022-12-11" },
    6: { start: "2022-12-12", stop: "2022-12-18" },
    7: { start: "2022-12-19", stop: "2022-12-25" },
    8: { start: "2023-01-09", stop: "2023-01-15" },
    9: { start: "2023-01-16", stop: "2023-01-22" },
    10: { start: "2023-01-23", stop: "2023-01-29" },
    11: { start: "2023-01-30", stop: "2023-02-05" },
    12: { start: "2023-02-06", stop: "2023-02-12" },
    13: { start: "2023-02-13", stop: "2023-02-19" },
    14: { start: "2023-02-20", stop: "2023-02-26" },
    15: { start: "2023-02-27", stop: "2023-03-05" },
    //    exam: { start: "2023-02-17", stop: "2023-02-26" },
  },
  2211: {
    0: { start: "2021-02-22", stop: "2021-02-28" },
    1: { start: "2021-03-01", stop: "2021-03-07" },
    2: { start: "2021-03-08", stop: "2021-03-14" },
    3: { start: "2021-03-15", stop: "2021-03-21" },
    4: { start: "2021-03-22", stop: "2021-03-28" },
    5: { start: "2021-03-29", stop: "2021-04-04" },
    6: { start: "2021-04-05", stop: "2021-04-11" },
    7: { start: "2021-04-12", stop: "2021-04-18" },
    8: { start: "2021-04-19", stop: "2021-04-25" },
    9: { start: "2021-04-26", stop: "2021-05-02" },
    10: { start: "2021-05-03", stop: "2021-05-09" },
    11: { start: "2021-05-10", stop: "2021-05-16" },
    12: { start: "2021-05-17", stop: "2021-05-23" },
    13: { start: "2021-05-24", stop: "2021-05-30" },
    14: { start: "2021-05-31", stop: "2021-06-06" },
    exam: { start: "2021-05-31", stop: "2021-06-06" },
  },
  2213: {
    1: { start: "2021-05-31", stop: "2021-06-06" },
    2: { start: "2021-06-07", stop: "2021-06-13" },
    3: { start: "2021-06-14", stop: "2021-06-20" },
    4: { start: "2021-06-21", stop: "2021-06-27" },
    5: { start: "2021-06-28", stop: "2021-07-04" },
    6: { start: "2021-07-05", stop: "2021-07-11" },
    7: { start: "2021-07-12", stop: "2021-07-18" },
    8: { start: "2021-07-19", stop: "2021-07-25" },
    9: { start: "2021-07-26", stop: "2021-08-01" },
    10: { start: "2021-08-02", stop: "2021-08-08" },
    11: { start: "2021-08-09", stop: "2021-08-15" },
    12: { start: "2021-08-16", stop: "2021-08-22" },
    13: { start: "2021-08-23", stop: "2021-08-29" },
    exam: { start: "2021-08-30", stop: "2021-09-05" },
  },
  2215: {
    0: { start: "2021-08-23", stop: "2021-08-29" },
    1: { start: "2021-08-30", stop: "2021-09-05" },
    2: { start: "2021-09-06", stop: "2021-09-12" },
    3: { start: "2021-09-13", stop: "2021-09-19" },
    4: { start: "2021-09-20", stop: "2021-09-26" },
    5: { start: "2021-09-27", stop: "2021-10-03" },
    6: { start: "2021-10-04", stop: "2021-10-10" },
    7: { start: "2021-10-11", stop: "2021-10-17" },
    8: { start: "2021-10-18", stop: "2021-10-24" },
    9: { start: "2021-10-25", stop: "2021-10-31" },
    10: { start: "2021-11-01", stop: "2021-11-07" },
    11: { start: "2021-11-08", stop: "2021-11-14" },
    12: { start: "2021-11-15", stop: "2021-11-21" },
    13: { start: "2021-11-22", stop: "2021-11-28" },
    exam: { start: "2021-11-29", stop: "2021-12-05" },
  },
  2217: {
    0: { start: "2021-11-22", stop: "2021-11-28" },
    1: { start: "2021-11-29", stop: "2021-12-05" },
    2: { start: "2021-12-06", stop: "2021-12-12" },
    3: { start: "2021-12-13", stop: "2021-12-19" },
    4: { start: "2021-12-20", stop: "2021-12-26" },
    5: { start: "2021-12-27", stop: "2022-01-02" },
    6: { start: "2022-01-03", stop: "2022-01-09" },
    7: { start: "2022-01-10", stop: "2022-01-16" },
    8: { start: "2022-01-17", stop: "2022-01-23" },
    9: { start: "2022-01-24", stop: "2022-01-30" },
    10: { start: "2022-01-31", stop: "2022-02-06" },
    11: { start: "2022-02-07", stop: "2022-02-13" },
    12: { start: "2022-02-14", stop: "2022-02-20" },
    13: { start: "2022-02-21", stop: "2022-02-27" },
    exam: { start: "2022-02-28", stop: "2022-03-04" },
  },
  3218: {
    0: { start: "2021-11-01", stop: "2021-11-07" },
    1: { start: "2021-11-08", stop: "2021-11-14" },
    2: { start: "2021-11-15", stop: "2021-11-21" },
    3: { start: "2021-11-22", stop: "2021-11-28" },
    4: { start: "2021-11-29", stop: "2021-12-05" },
    5: { start: "2021-12-06", stop: "2021-12-12" },
    6: { start: "2021-12-13", stop: "2021-12-19" },
    7: { start: "2021-12-20", stop: "2021-12-26" },
    8: { start: "2022-01-10", stop: "2022-01-16" },
    9: { start: "2022-01-17", stop: "2022-01-23" },
    10: { start: "2022-01-24", stop: "2022-01-30" },
    11: { start: "2022-01-31", stop: "2022-02-06" },
    12: { start: "2022-02-07", stop: "2022-02-13" },
    13: { start: "2022-02-14", stop: "2022-02-20" },
    14: { start: "2022-02-21", stop: "2022-02-27" },
    15: { start: "2022-02-28", stop: "2022-03-06" },
    exam: { start: "2022-02-17", stop: "2022-02-26" },
  },
  3215: {
    0: { start: "2021-07-12", stop: "2021-07-18" },
    1: { start: "2021-07-19", stop: "2021-07-25" },
    2: { start: "2021-07-26", stop: "2021-08-01" },
    3: { start: "2021-08-02", stop: "2021-08-08" },
    4: { start: "2021-08-16", stop: "2021-08-22" },
    5: { start: "2021-08-23", stop: "2021-08-29" },
    6: { start: "2021-08-30", stop: "2021-09-05" },
    7: { start: "2021-09-06", stop: "2021-09-12" },
    8: { start: "2021-09-13", stop: "2021-09-19" },
    9: { start: "2021-09-20", stop: "2021-09-26" },
    10: { start: "2021-09-27", stop: "2021-10-03" },
    11: { start: "2021-10-04", stop: "2021-10-10" },
    12: { start: "2021-10-11", stop: "2021-10-17" },
    13: { start: "2021-10-18", stop: "2021-10-24" },
    14: { start: "2021-10-25", stop: "2021-10-31" },
    15: { start: "2021-11-01", stop: "2021-11-07" },
    exam: { start: "2021-10-21", stop: "2021-10-31" },
  },
  3211: {
    0: { start: "2021-03-01", stop: "2021-03-07" },
    1: { start: "2021-03-08", stop: "2021-03-14" },
    2: { start: "2021-03-15", stop: "2021-03-21" },
    3: { start: "2021-03-22", stop: "2021-03-28" },
    4: { start: "2021-03-29", stop: "2021-04-04" },
    5: { start: "2021-04-12", stop: "2021-04-18" },
    6: { start: "2021-04-19", stop: "2021-04-25" },
    7: { start: "2021-04-26", stop: "2021-05-02" },
    8: { start: "2021-05-03", stop: "2021-05-09" },
    9: { start: "2021-05-10", stop: "2021-05-16" },
    10: { start: "2021-05-17", stop: "2021-05-23" },
    11: { start: "2021-05-24", stop: "2021-05-30" },
    12: { start: "2021-05-31", stop: "2021-06-06" },
    13: { start: "2021-06-07", stop: "2021-06-13" },
    14: { start: "2021-06-14", stop: "2021-06-20" },
    15: { start: "2021-06-21", stop: "2021-06-27" },
    exam: { start: "2021-06-10", stop: "2021-06-19" },
  },
  "3215QCM": {
    0: { start: "2021-07-12", stop: "2021-07-18" },
    1: { start: "2021-07-19", stop: "2021-07-25" },
    2: { start: "2021-07-26", stop: "2021-08-01" },
    3: { start: "2021-08-02", stop: "2021-08-08" },
    4: { start: "2021-08-09", stop: "2021-08-15" },
    5: { start: "2021-08-16", stop: "2021-08-22" },
    6: { start: "2021-08-30", stop: "2021-09-05" },
    7: { start: "2021-09-06", stop: "2021-09-12" },
    8: { start: "2021-09-13", stop: "2021-09-19" },
    9: { start: "2021-09-20", stop: "2021-09-26" },
    10: { start: "2021-10-04", stop: "2021-10-10" },
    11: { start: "2021-10-11", stop: "2021-10-17" },
    12: { start: "2021-10-18", stop: "2021-10-24" },
    13: { start: "2021-10-25", stop: "2021-10-31" },
    14: { start: "2021-11-01", stop: "2021-11-07" },
    15: { start: "2021-11-08", stop: "2021-11-14" },
    exam: { start: "2021-10-30", stop: "2021-11-13" },
  },
  "3211QCM": {
    0: { start: "2021-02-22", stop: "2021-02-28" },
    1: { start: "2021-03-01", stop: "2021-03-07" },
    2: { start: "2021-03-08", stop: "2021-03-14" },
    3: { start: "2021-03-15", stop: "2021-03-21" },
    4: { start: "2021-03-22", stop: "2021-03-29" },
    5: { start: "2021-03-29", stop: "2021-04-04" },
    6: { start: "2021-04-12", stop: "2021-04-18" },
    7: { start: "2021-04-19", stop: "2021-04-25" },
    8: { start: "2021-04-26", stop: "2021-05-02" },
    9: { start: "2021-05-10", stop: "2021-05-16" },
    10: { start: "2021-05-17", stop: "2021-05-23" },
    11: { start: "2021-05-24", stop: "2021-05-30" },
    12: { start: "2021-05-31", stop: "2021-06-06" },
    13: { start: "2021-06-07", stop: "2021-03-13" },
    14: { start: "2021-06-14", stop: "2021-03-20" },
    15: { start: "2021-06-21", stop: "2021-03-26" },
    exam: { start: "2021-06-12", stop: "2021-06-26" },
  },

  2201: {
    0: { start: "2020-02-24", stop: "2020-03-01" },
    1: { start: "2020-03-02", stop: "2020-03-08" },
    2: { start: "2020-03-09", stop: "2020-03-15" },
    3: { start: "2020-03-16", stCop: "2020-03-22" },
    4: { start: "2020-03-23", stop: "2020-03-29" },
    5: { start: "2020-03-30", stop: "2020-04-05" },
    6: { start: "2020-04-06", stop: "2020-04-12" },
    7: { start: "2020-04-13", stop: "2020-04-19" },
    8: { start: "2020-04-20", stop: "2020-04-26" },
    9: { start: "2020-04-27", stop: "2020-05-03" },
    10: { start: "2020-05-04", stop: "2020-05-10" },
    11: { start: "2020-05-11", stop: "2020-05-17" },
    12: { start: "2020-05-18", stop: "2020-05-24" },
    13: { start: "2020-05-25", stop: "2020-05-31" },
    14: { start: "2020-06-01", stop: "2020-06-05" },
    exam: { start: "2020-06-01", stop: "2020-06-05" },
  },
  2203: {
    0: { start: "2020-05-25", stop: "2020-05-31" },
    1: { start: "2020-06-01", stop: "2020-06-07" },
    2: { start: "2020-06-08", stop: "2020-06-14" },
    3: { start: "2020-06-15", stop: "2020-06-21" },
    4: { start: "2020-06-22", stop: "2020-06-28" },
    5: { start: "2020-06-29", stop: "2020-07-05" },
    6: { start: "2020-07-06", stop: "2020-07-12" },
    7: { start: "2020-07-13", stop: "2020-07-19" },
    8: { start: "2020-07-20", stop: "2020-07-26" },
    9: { start: "2020-07-27", stop: "2020-08-02" },
    10: { start: "2020-08-03", stop: "2020-08-09" },
    11: { start: "2020-08-10", stop: "2020-05-17" },
    12: { start: "2020-08-17", stop: "2020-05-24" },
    13: { start: "2020-08-24", stop: "2020-05-31" },
    14: { start: "2020-08-31", stop: "2020-09-06" },
    exam: { start: "2020-08-31", stop: "2020-09-04" },
  },
  2205: {
    0: { start: "2020-08-24", stop: "2020-09-30" },
    1: { start: "2020-08-31", stop: "2020-09-06" },
    2: { start: "2020-09-07", stop: "2020-09-13" },
    3: { start: "2020-09-14", stop: "2020-09-20" },
    4: { start: "2020-09-21", stop: "2020-09-27" },
    5: { start: "2020-09-28", stop: "2020-10-04" },
    6: { start: "2020-10-05", stop: "2020-10-11" },
    7: { start: "2020-10-12", stop: "2020-10-19" },
    8: { start: "2020-10-19", stop: "2020-10-25" },
    9: { start: "2020-10-26", stop: "2020-11-01" },
    10: { start: "2020-11-02", stop: "2020-11-08" },
    11: { start: "2020-11-09", stop: "2020-11-15" },
    12: { start: "2020-11-16", stop: "2020-11-22" },
    13: { start: "2020-11-23", stop: "2020-11-29" },
    14: { start: "2020-11-30", stop: "2020-12-06" },
    15: { start: "2020-12-07", stop: "2020-12-13" },
    exam: { start: "2020-12-07", stop: "2020-12-13" },
  },
  2207: {
    0: { start: "2020-11-23", stop: "2020-11-29" },
    1: { start: "2020-11-30", stop: "2020-12-06" },
    2: { start: "2020-12-07", stop: "2020-12-13" },
    3: { start: "2020-12-14", stop: "2020-12-20" },
    4: { start: "2020-12-21", stop: "2020-12-27" },
    5: { start: "2020-12-28", stop: "2021-01-03" },
    6: { start: "2021-01-04", stop: "2021-01-10" },
    7: { start: "2021-01-11", stop: "2021-01-17" },
    8: { start: "2021-01-18", stop: "2021-01-24" },
    9: { start: "2021-01-25", stop: "2021-01-31" },
    10: { start: "2021-02-01", stop: "2021-02-07" },
    11: { start: "2021-02-08", stop: "2021-02-14" },
    12: { start: "2021-02-15", stop: "2021-02-21" },
    13: { start: "2021-02-22", stop: "2021-02-28" },
    14: { start: "2021-03-01", stop: "2021-03-07" },
    15: { start: "2021-03-08", stop: "2021-03-14" },
    exam: { start: "2021-03-01", stop: "2021-03-07" },
  },
  3208: {
    0: { start: "2020-10-26", stop: "2020-11-01" },
    1: { start: "2020-11-02", stop: "2020-11-08" },
    2: { start: "2020-11-09", stop: "2020-11-15" },
    3: { start: "2020-11-16", stop: "2020-11-22" },
    4: { start: "2020-11-23", stop: "2020-11-29" },
    5: { start: "2020-11-30", stop: "2020-12-06" },
    6: { start: "2020-12-07", stop: "2020-12-13" },
    7: { start: "2020-12-14", stop: "2020-12-20" },
    8: { start: "2021-01-04", stop: "2021-01-10" },
    9: { start: "2021-01-11", stop: "2021-01-17" },
    10: { start: "2021-01-18", stop: "2021-01-24" },
    11: { start: "2021-01-25", stop: "2021-01-31" },
    12: { start: "2021-02-01", stop: "2021-02-07" },
    13: { start: "2021-02-08", stop: "2021-02-14" },
    exam: { start: "2021-02-08", stop: "2021-02-20" },
  },
  3205: {
    0: { start: "2020-07-06", stop: "2020-07-12" },
    1: { start: "2020-07-13", stop: "2020-07-19" },
    2: { start: "2020-07-20", stop: "2020-08-26" },
    3: { start: "2020-07-27", stop: "2020-08-02" },
    4: { start: "2020-08-03", stop: "2020-08-16" },
    5: { start: "2020-08-17", stop: "2020-08-23" },
    6: { start: "2020-08-24", stop: "2020-08-30" },
    7: { start: "2020-08-31", stop: "2020-09-06" },
    8: { start: "2020-09-07", stop: "2020-09-13" },
    9: { start: "2020-09-14", stop: "2020-09-20" },
    10: { start: "2020-09-21", stop: "2020-09-27" },
    11: { start: "2020-09-28", stop: "2020-10-04" },
    12: { start: "2020-10-05", stop: "2020-10-11" },
    13: { start: "2020-10-12", stop: "2020-10-18" },
    14: { start: "2020-10-19", stop: "2020-10-25" },
    15: { start: "2020-10-27", stop: "2020-11-01" },
    exam: { start: "2020-10-12", stop: "2020-10-18" },
  },
  3201: {
    0: { start: "2020-02-17", stop: "2020-02-23" },
    1: { start: "2020-02-24", stop: "2020-03-01" },
    2: { start: "2020-03-02", stop: "2020-03-08" },
    3: { start: "2020-03-09", stop: "2020-03-15" },
    4: { start: "2020-03-16", stop: "2020-03-22" },
    5: { start: "2020-03-23", stop: "2020-03-29" },
    6: { start: "2020-03-30", stop: "2020-04-05" },
    7: { start: "2020-04-13", stop: "2020-04-19" },
    8: { start: "2020-04-20", stop: "2020-04-26" },
    9: { start: "2020-04-27", stop: "2020-05-03" },
    10: { start: "2020-05-04", stop: "2020-05-10" },
    11: { start: "2020-05-11", stop: "2020-05-17" },
    12: { start: "2020-05-18", stop: "2020-05-24" },
    13: { start: "2020-05-25", stop: "2020-05-31" },
    exam: { start: "2020-06-01", stop: "2020-06-07" },
  },
  3198: {
    0: { start: "2019-10-21", stop: "2019-10-27" },
    1: { start: "2019-10-28", stop: "2019-11-03" },
    2: { start: "2019-11-04", stop: "2019-11-10" },
    3: { start: "2019-11-11", stop: "2019-11-17" },
    4: { start: "2019-11-18", stop: "2019-11-24" },
    5: { start: "2019-11-25", stop: "2019-12-1" },
    6: { start: "2019-12-02", stop: "2019-12-08" },
    7: { start: "2019-12-09", stop: "2019-12-15" },
    8: { start: "2019-12-16", stop: "2019-12-22" },
    9: { start: "2020-01-06", stop: "2020-01-12" },
    10: { start: "2020-01-13", stop: "2020-01-19" },
    11: { start: "2020-01-20", stop: "2020-01-26" },
    12: { start: "2020-01-27", stop: "2020-02-02" },
    13: { start: "2020-02-03", stop: "2020-02-09" },
    exam: { start: "2020-02-06", stop: "2020-02-15" },
  },
  2197: {
    0: { start: "2019-11-18", stop: "2019-11-24" },
    1: { start: "2019-11-25", stop: "2019-12-01" },
    2: { start: "2019-12-02", stop: "2019-12-08" },
    3: { start: "2019-12-09", stop: "2019-12-15" },
    4: { start: "2019-12-16", stop: "2019-12-22" },
    5: { start: "2019-12-23", stop: "2019-09-29" },
    6: { start: "2019-12-30", stop: "2020-01-05" },
    7: { start: "2020-01-06", stop: "2020-01-12" },
    8: { start: "2020-01-13", stop: "2020-01-19" },
    9: { start: "2020-01-20", stop: "2020-01-26" },
    10: { start: "2020-01-27", stop: "2020-02-02" },
    11: { start: "2020-02-03", stop: "2020-02-09" },
    12: { start: "2020-02-10", stop: "2020-02-16" },
    13: { start: "2019-02-17", stop: "2020-02-23" },
    14: { start: "2020-02-24", stop: "2020-03-01" },
    15: { start: "2020-03-02", stop: "2020-03-08" },
  },
  2195: {
    0: { start: "2019-08-19", stop: "2019-09-25" },
    1: { start: "2019-08-26", stop: "2019-09-01" },
    2: { start: "2019-09-02", stop: "2019-09-18" },
    3: { start: "2019-09-09", stop: "2019-09-15" },
    4: { start: "2019-09-16", stop: "2019-09-22" },
    5: { start: "2019-09-23", stop: "2019-09-29" },
    6: { start: "2019-09-30", stop: "2019-10-06" },
    7: { start: "2019-10-07", stop: "2019-10-13" },
    8: { start: "2019-10-14", stop: "2019-08-20" },
    9: { start: "2019-10-21", stop: "2019-10-27" },
    10: { start: "2019-10-28", stop: "2019-11-03" },
    11: { start: "2019-11-04", stop: "2019-11-10" },
    12: { start: "2019-11-11", stop: "2019-11-17" },
    13: { start: "2019-11-18", stop: "2019-11-24" },
    14: { start: "2019-11-25", stop: "2019-12-01" },
    15: { start: "2019-10-07", stop: "2019-10-13" },
  },
  3195: {
    0: { start: "2019-07-01", stop: "2019-07-07" },
    1: { start: "2019-07-08", stop: "2019-07-14" },
    2: { start: "2019-07-15", stop: "2019-07-21" },
    3: { start: "2019-07-22", stop: "2019-07-28" },
    4: { start: "2019-07-29", stop: "2019-08-04" },
    5: { start: "2019-08-05", stop: "2019-08-11" },
    6: { start: "2019-08-19", stop: "2019-08-25" },
    7: { start: "2019-08-26", stop: "2019-09-01" },
    8: { start: "2019-09-02", stop: "2019-09-08" },
    9: { start: "2019-09-09", stop: "2019-09-15" },
    10: { start: "2019-09-16", stop: "2019-09-22" },
    11: { start: "2019-09-23", stop: "2019-09-29" },
    12: { start: "2019-09-30", stop: "2019-10-06" },
    13: { start: "2019-10-07", stop: "2019-10-13" },
    14: { start: "2019-10-14", stop: "2019-10-20" },
    15: { start: "2019-10-21", stop: "2019-10-27" },
    exam: { start: "2019-10-10", stop: "2019-10-19" },
  },
  3191: {
    0: { start: "2019-02-18", stop: "2019-02-24" },
    1: { start: "2019-02-25", stop: "2019-03-03" },
    2: { start: "2019-03-04", stop: "2019-03-10" },
    3: { start: "2019-03-11", stop: "2019-03-17" },
    4: { start: "2019-03-18", stop: "2019-03-24" },
    5: { start: "2019-03-25", stop: "2019-03-31" },
    6: { start: "2019-04-01", stop: "2019-04-07" },
    7: { start: "2019-04-08", stop: "2019-04-14" },
    8: { start: "2019-04-22", stop: "2019-04-28" },
    9: { start: "2019-04-29", stop: "2019-05-05" },
    10: { start: "2019-05-06", stop: "2019-05-12" },
    11: { start: "2019-05-13", stop: "2019-05-19" },
    12: { start: "2019-05-20", stop: "2019-05-26" },
    13: { start: "2019-05-27", stop: "2019-06-02" },
    14: { start: "2019-06-03", stop: "2019-06-09" },
    15: { start: "2019-06-10", stop: "2019-06-17" },
    exam: { start: "2019-05-30", stop: "2019-06-08" },
  },
};
