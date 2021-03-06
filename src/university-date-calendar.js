/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/* jshint esversion: 6 */

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
const DEFAULT_PERIOD = '3225';

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct", "Nov", "Dec", 
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
  '3221': {
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
  '3221QCM': {
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
  '3225': {
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
  '3225QCM': {
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
  2211: {
    0: { start: '2021-02-22', stop: '2021-02-28' },
    1: { start: '2021-03-01', stop: '2021-03-07' },
    2: { start: '2021-03-08', stop: '2021-03-14' },
    3: { start: '2021-03-15', stop: '2021-03-21' },
    4: { start: '2021-03-22', stop: '2021-03-28' },
    5: { start: '2021-03-29', stop: '2021-04-04' },
    6: { start: '2021-04-05', stop: '2021-04-11' },
    7: { start: '2021-04-12', stop: '2021-04-18' },
    8: { start: '2021-04-19', stop: '2021-04-25' },
    9: { start: '2021-04-26', stop: '2021-05-02' },
    10: { start: '2021-05-03', stop: '2021-05-09' },
    11: { start: '2021-05-10', stop: '2021-05-16' },
    12: { start: '2021-05-17', stop: '2021-05-23' },
    13: { start: '2021-05-24', stop: '2021-05-30' },
    14: { start: '2021-05-31', stop: '2021-06-06' },
    exam: { start: '2021-05-31', stop: '2021-06-06' },
  },
  2213: {
    1: { start: '2021-05-31', stop: '2021-06-06' },
    2: { start: '2021-06-07', stop: '2021-06-13' },
    3: { start: '2021-06-14', stop: '2021-06-20' },
    4: { start: '2021-06-21', stop: '2021-06-27' },
    5: { start: '2021-06-28', stop: '2021-07-04' },
    6: { start: '2021-07-05', stop: '2021-07-11' },
    7: { start: '2021-07-12', stop: '2021-07-18' },
    8: { start: '2021-07-19', stop: '2021-07-25' },
    9: { start: '2021-07-26', stop: '2021-08-01' },
    10: { start: '2021-08-02', stop: '2021-08-08' },
    11: { start: '2021-08-09', stop: '2021-08-15' },
    12: { start: '2021-08-16', stop: '2021-08-22' },
    13: { start: '2021-08-23', stop: '2021-08-29' },
    exam: { start: '2021-08-30', stop: '2021-09-05' },
  },
  2215: {
    0: { start: '2021-08-23', stop: '2021-08-29' },
    1: { start: '2021-08-30', stop: '2021-09-05' },
    2: { start: '2021-09-06', stop: '2021-09-12' },
    3: { start: '2021-09-13', stop: '2021-09-19' },
    4: { start: '2021-09-20', stop: '2021-09-26' },
    5: { start: '2021-09-27', stop: '2021-10-03' },
    6: { start: '2021-10-04', stop: '2021-10-10' },
    7: { start: '2021-10-11', stop: '2021-10-17' },
    8: { start: '2021-10-18', stop: '2021-10-24' },
    9: { start: '2021-10-25', stop: '2021-10-31' },
    10: { start: '2021-11-01', stop: '2021-11-07' },
    11: { start: '2021-11-08', stop: '2021-11-14' },
    12: { start: '2021-11-15', stop: '2021-11-21' },
    13: { start: '2021-11-22', stop: '2021-11-28' },
    exam: { start: '2021-11-29', stop: '2021-12-05' },
  },
  2217: {
    0: { start: '2021-11-22', stop: '2021-11-28' },
    1: { start: '2021-11-29', stop: '2021-12-05' },
    2: { start: '2021-12-06', stop: '2021-12-12' },
    3: { start: '2021-12-13', stop: '2021-12-19' },
    4: { start: '2021-12-20', stop: '2021-12-26' },
    5: { start: '2021-12-27', stop: '2022-01-02' },
    6: { start: '2022-01-03', stop: '2022-01-09' },
    7: { start: '2022-01-10', stop: '2022-01-16' },
    8: { start: '2022-01-17', stop: '2022-01-23' },
    9: { start: '2022-01-24', stop: '2022-01-30' },
    10: { start: '2022-01-31', stop: '2022-02-06' },
    11: { start: '2022-02-07', stop: '2022-02-13' },
    12: { start: '2022-02-14', stop: '2022-02-20' },
    13: { start: '2022-02-21', stop: '2022-02-27' },
    exam: { start: '2022-02-28', stop: '2022-03-04' },
  },
  3218: {
    0: { start: '2021-11-01', stop: '2021-11-07' },
    1: { start: '2021-11-08', stop: '2021-11-14' },
    2: { start: '2021-11-15', stop: '2021-11-21' },
    3: { start: '2021-11-22', stop: '2021-11-28' },
    4: { start: '2021-11-29', stop: '2021-12-05' },
    5: { start: '2021-12-06', stop: '2021-12-12' },
    6: { start: '2021-12-13', stop: '2021-12-19' },
    7: { start: '2021-12-20', stop: '2021-12-26' },
    8: { start: '2022-01-10', stop: '2022-01-16' },
    9: { start: '2022-01-17', stop: '2022-01-23' },
    10: { start: '2022-01-24', stop: '2022-01-30' },
    11: { start: '2022-01-31', stop: '2022-02-06' },
    12: { start: '2022-02-07', stop: '2022-02-13' },
    13: { start: '2022-02-14', stop: '2022-02-20' },
    14: { start: '2022-02-21', stop: '2022-02-27' },
    15: { start: '2022-02-28', stop: '2022-03-06' },
    exam: { start: '2022-02-17', stop: '2022-02-26' },
  },
  3215: {
    0: { start: '2021-07-12', stop: '2021-07-18' },
    1: { start: '2021-07-19', stop: '2021-07-25' },
    2: { start: '2021-07-26', stop: '2021-08-01' },
    3: { start: '2021-08-02', stop: '2021-08-08' },
    4: { start: '2021-08-16', stop: '2021-08-22' },
    5: { start: '2021-08-23', stop: '2021-08-29' },
    6: { start: '2021-08-30', stop: '2021-09-05' },
    7: { start: '2021-09-06', stop: '2021-09-12' },
    8: { start: '2021-09-13', stop: '2021-09-19' },
    9: { start: '2021-09-20', stop: '2021-09-26' },
    10: { start: '2021-09-27', stop: '2021-10-03' },
    11: { start: '2021-10-04', stop: '2021-10-10' },
    12: { start: '2021-10-11', stop: '2021-10-17' },
    13: { start: '2021-10-18', stop: '2021-10-24' },
    14: { start: '2021-10-25', stop: '2021-10-31' },
    15: { start: '2021-11-01', stop: '2021-11-07' },
    exam: { start: '2021-10-21', stop: '2021-10-31' },
  },
  3211: {
    0: { start: '2021-03-01', stop: '2021-03-07' },
    1: { start: '2021-03-08', stop: '2021-03-14' },
    2: { start: '2021-03-15', stop: '2021-03-21' },
    3: { start: '2021-03-22', stop: '2021-03-28' },
    4: { start: '2021-03-29', stop: '2021-04-04' },
    5: { start: '2021-04-12', stop: '2021-04-18' },
    6: { start: '2021-04-19', stop: '2021-04-25' },
    7: { start: '2021-04-26', stop: '2021-05-02' },
    8: { start: '2021-05-03', stop: '2021-05-09' },
    9: { start: '2021-05-10', stop: '2021-05-16' },
    10: { start: '2021-05-17', stop: '2021-05-23' },
    11: { start: '2021-05-24', stop: '2021-05-30' },
    12: { start: '2021-05-31', stop: '2021-06-06' },
    13: { start: '2021-06-07', stop: '2021-06-13' },
    14: { start: '2021-06-14', stop: '2021-06-20' },
    15: { start: '2021-06-21', stop: '2021-06-27' },
    exam: { start: '2021-06-10', stop: '2021-06-19' },
  },
  '3215QCM': {
    0: { start: '2021-07-12', stop: '2021-07-18' },
    1: { start: '2021-07-19', stop: '2021-07-25' },
    2: { start: '2021-07-26', stop: '2021-08-01' },
    3: { start: '2021-08-02', stop: '2021-08-08' },
    4: { start: '2021-08-09', stop: '2021-08-15' },
    5: { start: '2021-08-16', stop: '2021-08-22' },
    6: { start: '2021-08-30', stop: '2021-09-05' },
    7: { start: '2021-09-06', stop: '2021-09-12' },
    8: { start: '2021-09-13', stop: '2021-09-19' },
    9: { start: '2021-09-20', stop: '2021-09-26' },
    10: { start: '2021-10-04', stop: '2021-10-10' },
    11: { start: '2021-10-11', stop: '2021-10-17' },
    12: { start: '2021-10-18', stop: '2021-10-24' },
    13: { start: '2021-10-25', stop: '2021-10-31' },
    14: { start: '2021-11-01', stop: '2021-11-07' },
    15: { start: '2021-11-08', stop: '2021-11-14' },
    exam: { start: '2021-10-30', stop: '2021-11-13' },
  },
  '3211QCM': {
    0: { start: '2021-02-22', stop: '2021-02-28' },
    1: { start: '2021-03-01', stop: '2021-03-07' },
    2: { start: '2021-03-08', stop: '2021-03-14' },
    3: { start: '2021-03-15', stop: '2021-03-21' },
    4: { start: '2021-03-22', stop: '2021-03-29' },
    5: { start: '2021-03-29', stop: '2021-04-04' },
    6: { start: '2021-04-12', stop: '2021-04-18' },
    7: { start: '2021-04-19', stop: '2021-04-25' },
    8: { start: '2021-04-26', stop: '2021-05-02' },
    9: { start: '2021-05-10', stop: '2021-05-16' },
    10: { start: '2021-05-17', stop: '2021-05-23' },
    11: { start: '2021-05-24', stop: '2021-05-30' },
    12: { start: '2021-05-31', stop: '2021-06-06' },
    13: { start: '2021-06-07', stop: '2021-03-13' },
    14: { start: '2021-06-14', stop: '2021-03-20' },
    15: { start: '2021-06-21', stop: '2021-03-26' },
    exam: { start: '2021-06-12', stop: '2021-06-26' },
  },

  2201: {
    0: { start: '2020-02-24', stop: '2020-03-01' },
    1: { start: '2020-03-02', stop: '2020-03-08' },
    2: { start: '2020-03-09', stop: '2020-03-15' },
    3: { start: '2020-03-16', stCop: '2020-03-22' },
    4: { start: '2020-03-23', stop: '2020-03-29' },
    5: { start: '2020-03-30', stop: '2020-04-05' },
    6: { start: '2020-04-06', stop: '2020-04-12' },
    7: { start: '2020-04-13', stop: '2020-04-19' },
    8: { start: '2020-04-20', stop: '2020-04-26' },
    9: { start: '2020-04-27', stop: '2020-05-03' },
    10: { start: '2020-05-04', stop: '2020-05-10' },
    11: { start: '2020-05-11', stop: '2020-05-17' },
    12: { start: '2020-05-18', stop: '2020-05-24' },
    13: { start: '2020-05-25', stop: '2020-05-31' },
    14: { start: '2020-06-01', stop: '2020-06-05' },
    exam: { start: '2020-06-01', stop: '2020-06-05' },
  },
  2203: {
    0: { start: '2020-05-25', stop: '2020-05-31' },
    1: { start: '2020-06-01', stop: '2020-06-07' },
    2: { start: '2020-06-08', stop: '2020-06-14' },
    3: { start: '2020-06-15', stop: '2020-06-21' },
    4: { start: '2020-06-22', stop: '2020-06-28' },
    5: { start: '2020-06-29', stop: '2020-07-05' },
    6: { start: '2020-07-06', stop: '2020-07-12' },
    7: { start: '2020-07-13', stop: '2020-07-19' },
    8: { start: '2020-07-20', stop: '2020-07-26' },
    9: { start: '2020-07-27', stop: '2020-08-02' },
    10: { start: '2020-08-03', stop: '2020-08-09' },
    11: { start: '2020-08-10', stop: '2020-05-17' },
    12: { start: '2020-08-17', stop: '2020-05-24' },
    13: { start: '2020-08-24', stop: '2020-05-31' },
    14: { start: '2020-08-31', stop: '2020-09-06' },
    exam: { start: '2020-08-31', stop: '2020-09-04' },
  },
  2205: {
    0: { start: '2020-08-24', stop: '2020-09-30' },
    1: { start: '2020-08-31', stop: '2020-09-06' },
    2: { start: '2020-09-07', stop: '2020-09-13' },
    3: { start: '2020-09-14', stop: '2020-09-20' },
    4: { start: '2020-09-21', stop: '2020-09-27' },
    5: { start: '2020-09-28', stop: '2020-10-04' },
    6: { start: '2020-10-05', stop: '2020-10-11' },
    7: { start: '2020-10-12', stop: '2020-10-19' },
    8: { start: '2020-10-19', stop: '2020-10-25' },
    9: { start: '2020-10-26', stop: '2020-11-01' },
    10: { start: '2020-11-02', stop: '2020-11-08' },
    11: { start: '2020-11-09', stop: '2020-11-15' },
    12: { start: '2020-11-16', stop: '2020-11-22' },
    13: { start: '2020-11-23', stop: '2020-11-29' },
    14: { start: '2020-11-30', stop: '2020-12-06' },
    15: { start: '2020-12-07', stop: '2020-12-13' },
    exam: { start: '2020-12-07', stop: '2020-12-13' },
  },
  2207: {
    0: { start: '2020-11-23', stop: '2020-11-29' },
    1: { start: '2020-11-30', stop: '2020-12-06' },
    2: { start: '2020-12-07', stop: '2020-12-13' },
    3: { start: '2020-12-14', stop: '2020-12-20' },
    4: { start: '2020-12-21', stop: '2020-12-27' },
    5: { start: '2020-12-28', stop: '2021-01-03' },
    6: { start: '2021-01-04', stop: '2021-01-10' },
    7: { start: '2021-01-11', stop: '2021-01-17' },
    8: { start: '2021-01-18', stop: '2021-01-24' },
    9: { start: '2021-01-25', stop: '2021-01-31' },
    10: { start: '2021-02-01', stop: '2021-02-07' },
    11: { start: '2021-02-08', stop: '2021-02-14' },
    12: { start: '2021-02-15', stop: '2021-02-21' },
    13: { start: '2021-02-22', stop: '2021-02-28' },
    14: { start: '2021-03-01', stop: '2021-03-07' },
    15: { start: '2021-03-08', stop: '2021-03-14' },
    exam: { start: '2021-03-01', stop: '2021-03-07' },
  },
  3208: {
    0: { start: '2020-10-26', stop: '2020-11-01' },
    1: { start: '2020-11-02', stop: '2020-11-08' },
    2: { start: '2020-11-09', stop: '2020-11-15' },
    3: { start: '2020-11-16', stop: '2020-11-22' },
    4: { start: '2020-11-23', stop: '2020-11-29' },
    5: { start: '2020-11-30', stop: '2020-12-06' },
    6: { start: '2020-12-07', stop: '2020-12-13' },
    7: { start: '2020-12-14', stop: '2020-12-20' },
    8: { start: '2021-01-04', stop: '2021-01-10' },
    9: { start: '2021-01-11', stop: '2021-01-17' },
    10: { start: '2021-01-18', stop: '2021-01-24' },
    11: { start: '2021-01-25', stop: '2021-01-31' },
    12: { start: '2021-02-01', stop: '2021-02-07' },
    13: { start: '2021-02-08', stop: '2021-02-14' },
    exam: { start: '2021-02-08', stop: '2021-02-20' },
  },
  3205: {
    0: { start: '2020-07-06', stop: '2020-07-12' },
    1: { start: '2020-07-13', stop: '2020-07-19' },
    2: { start: '2020-07-20', stop: '2020-08-26' },
    3: { start: '2020-07-27', stop: '2020-08-02' },
    4: { start: '2020-08-03', stop: '2020-08-16' },
    5: { start: '2020-08-17', stop: '2020-08-23' },
    6: { start: '2020-08-24', stop: '2020-08-30' },
    7: { start: '2020-08-31', stop: '2020-09-06' },
    8: { start: '2020-09-07', stop: '2020-09-13' },
    9: { start: '2020-09-14', stop: '2020-09-20' },
    10: { start: '2020-09-21', stop: '2020-09-27' },
    11: { start: '2020-09-28', stop: '2020-10-04' },
    12: { start: '2020-10-05', stop: '2020-10-11' },
    13: { start: '2020-10-12', stop: '2020-10-18' },
    14: { start: '2020-10-19', stop: '2020-10-25' },
    15: { start: '2020-10-27', stop: '2020-11-01' },
    exam: { start: '2020-10-12', stop: '2020-10-18' },
  },
  3201: {
    0: { start: '2020-02-17', stop: '2020-02-23' },
    1: { start: '2020-02-24', stop: '2020-03-01' },
    2: { start: '2020-03-02', stop: '2020-03-08' },
    3: { start: '2020-03-09', stop: '2020-03-15' },
    4: { start: '2020-03-16', stop: '2020-03-22' },
    5: { start: '2020-03-23', stop: '2020-03-29' },
    6: { start: '2020-03-30', stop: '2020-04-05' },
    7: { start: '2020-04-13', stop: '2020-04-19' },
    8: { start: '2020-04-20', stop: '2020-04-26' },
    9: { start: '2020-04-27', stop: '2020-05-03' },
    10: { start: '2020-05-04', stop: '2020-05-10' },
    11: { start: '2020-05-11', stop: '2020-05-17' },
    12: { start: '2020-05-18', stop: '2020-05-24' },
    13: { start: '2020-05-25', stop: '2020-05-31' },
    exam: { start: '2020-06-01', stop: '2020-06-07' },
  },
  3198: {
    0: { start: '2019-10-21', stop: '2019-10-27' },
    1: { start: '2019-10-28', stop: '2019-11-03' },
    2: { start: '2019-11-04', stop: '2019-11-10' },
    3: { start: '2019-11-11', stop: '2019-11-17' },
    4: { start: '2019-11-18', stop: '2019-11-24' },
    5: { start: '2019-11-25', stop: '2019-12-1' },
    6: { start: '2019-12-02', stop: '2019-12-08' },
    7: { start: '2019-12-09', stop: '2019-12-15' },
    8: { start: '2019-12-16', stop: '2019-12-22' },
    9: { start: '2020-01-06', stop: '2020-01-12' },
    10: { start: '2020-01-13', stop: '2020-01-19' },
    11: { start: '2020-01-20', stop: '2020-01-26' },
    12: { start: '2020-01-27', stop: '2020-02-02' },
    13: { start: '2020-02-03', stop: '2020-02-09' },
    exam: { start: '2020-02-06', stop: '2020-02-15' },
  },
  2197: {
    0: { start: '2019-11-18', stop: '2019-11-24' },
    1: { start: '2019-11-25', stop: '2019-12-01' },
    2: { start: '2019-12-02', stop: '2019-12-08' },
    3: { start: '2019-12-09', stop: '2019-12-15' },
    4: { start: '2019-12-16', stop: '2019-12-22' },
    5: { start: '2019-12-23', stop: '2019-09-29' },
    6: { start: '2019-12-30', stop: '2020-01-05' },
    7: { start: '2020-01-06', stop: '2020-01-12' },
    8: { start: '2020-01-13', stop: '2020-01-19' },
    9: { start: '2020-01-20', stop: '2020-01-26' },
    10: { start: '2020-01-27', stop: '2020-02-02' },
    11: { start: '2020-02-03', stop: '2020-02-09' },
    12: { start: '2020-02-10', stop: '2020-02-16' },
    13: { start: '2019-02-17', stop: '2020-02-23' },
    14: { start: '2020-02-24', stop: '2020-03-01' },
    15: { start: '2020-03-02', stop: '2020-03-08' },
  },
  2195: {
    0: { start: '2019-08-19', stop: '2019-09-25' },
    1: { start: '2019-08-26', stop: '2019-09-01' },
    2: { start: '2019-09-02', stop: '2019-09-18' },
    3: { start: '2019-09-09', stop: '2019-09-15' },
    4: { start: '2019-09-16', stop: '2019-09-22' },
    5: { start: '2019-09-23', stop: '2019-09-29' },
    6: { start: '2019-09-30', stop: '2019-10-06' },
    7: { start: '2019-10-07', stop: '2019-10-13' },
    8: { start: '2019-10-14', stop: '2019-08-20' },
    9: { start: '2019-10-21', stop: '2019-10-27' },
    10: { start: '2019-10-28', stop: '2019-11-03' },
    11: { start: '2019-11-04', stop: '2019-11-10' },
    12: { start: '2019-11-11', stop: '2019-11-17' },
    13: { start: '2019-11-18', stop: '2019-11-24' },
    14: { start: '2019-11-25', stop: '2019-12-01' },
    15: { start: '2019-10-07', stop: '2019-10-13' },
  },
  3195: {
    0: { start: '2019-07-01', stop: '2019-07-07' },
    1: { start: '2019-07-08', stop: '2019-07-14' },
    2: { start: '2019-07-15', stop: '2019-07-21' },
    3: { start: '2019-07-22', stop: '2019-07-28' },
    4: { start: '2019-07-29', stop: '2019-08-04' },
    5: { start: '2019-08-05', stop: '2019-08-11' },
    6: { start: '2019-08-19', stop: '2019-08-25' },
    7: { start: '2019-08-26', stop: '2019-09-01' },
    8: { start: '2019-09-02', stop: '2019-09-08' },
    9: { start: '2019-09-09', stop: '2019-09-15' },
    10: { start: '2019-09-16', stop: '2019-09-22' },
    11: { start: '2019-09-23', stop: '2019-09-29' },
    12: { start: '2019-09-30', stop: '2019-10-06' },
    13: { start: '2019-10-07', stop: '2019-10-13' },
    14: { start: '2019-10-14', stop: '2019-10-20' },
    15: { start: '2019-10-21', stop: '2019-10-27' },
    exam: { start: '2019-10-10', stop: '2019-10-19' },
  },
  3191: {
    0: { start: '2019-02-18', stop: '2019-02-24' },
    1: { start: '2019-02-25', stop: '2019-03-03' },
    2: { start: '2019-03-04', stop: '2019-03-10' },
    3: { start: '2019-03-11', stop: '2019-03-17' },
    4: { start: '2019-03-18', stop: '2019-03-24' },
    5: { start: '2019-03-25', stop: '2019-03-31' },
    6: { start: '2019-04-01', stop: '2019-04-07' },
    7: { start: '2019-04-08', stop: '2019-04-14' },
    8: { start: '2019-04-22', stop: '2019-04-28' },
    9: { start: '2019-04-29', stop: '2019-05-05' },
    10: { start: '2019-05-06', stop: '2019-05-12' },
    11: { start: '2019-05-13', stop: '2019-05-19' },
    12: { start: '2019-05-20', stop: '2019-05-26' },
    13: { start: '2019-05-27', stop: '2019-06-02' },
    14: { start: '2019-06-03', stop: '2019-06-09' },
    15: { start: '2019-06-10', stop: '2019-06-17' },
    exam: { start: '2019-05-30', stop: '2019-06-08' },
  },
};


export default class UniversityDateCalendar {
  constructor(strm=DEFAULT_PERIOD) {
    if (UniversityDateCalendar._instance) {
      return UniversityDateCalendar._instance;
    }
    UniversityDateCalendar._instance = this;
    this.defaultPeriod = strm;
  }

  /**
   * @function getWeekDetails
   * @param {String} period
   * @param {String} week
   * @returns {Object} the correct start/stop dates for the givern period/week
   * null if doesn't exist
   */
  getWeekDetails(week, period=this.defaultPeriod) {
    // if week is a string starting with "Week" remove
    // the Week and convert number of integer
    if (typeof week === 'string' && week.startsWith('Week')) {
      week = parseInt(week.substring(4));
    }
    // only proceed if the period and week are in the CALENDAR
    if (!(period in CALENDAR)) {
      return null;
    } else if (!(week in CALENDAR[period])) {
      return null;
    }

    return CALENDAR[period][week];
  }

  /**
   * Adaptation of the Card Interface getTermDate
   * @param {Integer} week - week of university term
   * @param {Boolean} startWeek - if true, returns the start date of the week
   * @param {String} dayOfWeek - specify the day to return
   * @returns {Object} specifying the day, month, year of the week
   */
  getDate( week, startWeek=true, dayOfWeek="Monday" ) {
    let date = {
      date: "", month: "", week: week, year: 0
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
      tuesday: 1, tue: 1, wednesday: 2, wed: 2, thursday: 3, thu: 3,
      friday: 4, fri: 4, saturday: 5, sat: 5, sunday: 6, sun: 6,
    };

    if (dayOfWeek!=="monday") {
      date.day = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.substring(1, 3);
      if (dayOfWeek in dayToNum) {
        d.setDate(d.getDate() + dayToNum[dayOfWeek.toLowerCase()]);
      }
    }

    date.month = MONTHS[d.getMonth()];
    date.date = d.getDate();
    date.year = d.getFullYear();

  return date;


  }

  /**
   * getCurrentPeriod
   * @returns value matching the current period for a GU blackboard site
   * If unable figure out the title, return default period
   */

  getCurrentPeriod() {
    // GU current period should be in the courseMenu_link element
    const titleElement = document.getElementById('courseMenu_link');
    if (titleElement === null) {
      return this.defaultPeriod;
    }
    // the title attribute contains a string with the period (in the courseId)
    const courseTitle = titleElement.getAttribute('title');

    // get the course id (incl. period) will be in brackets
    let m = courseTitle.match(/^.*\((.+)\)/);
    let id;
    let breakIdRe;

    // we found a course Id (something in brackets), try to get the STRM value
    if (m) {
      id = m[1];
      // break the course Id up into its components
      // courseCode_STRM_mode

      // Look for OUA Courses e.g. COM10_2211_OT
      breakIdRe = new RegExp(
        '^([A-Z]+[0-9]+)_([0-9][0-9][0-9][0-9])_([A-Z][A-Z])$'
      );
      m = id.match(breakIdRe);

      // found an actual course site (rather than org site)
      if (m) {
        return m[2];
      }

      // Look for GU mode-based course e.g. 1511QCM_3211_SB
      breakIdRe = new RegExp(
        '^([0-9]+[A-Z]+)_([0-9][0-9][0-9][0-9])_([A-Z][A-Z])$'
      );
      m = id.match(breakIdRe);

      // found an actual course site (rather than org site)
      if (m) {
        // but is it a QCM course
        if (m[1].includes('QCM')) {
          return m[2] + 'QCM';
        }
        return m[2];
      }

      // Look for joined GU course e.g. 1511QCM_3211
      breakIdRe = new RegExp('^([0-9]+[A-Z]+)_([0-9][0-9][0-9][0-9])$');

      m = id.match(breakIdRe);

      if (m) {
        return m[2];
      }

      // Look for year long QCM courses e.g. 3526QCM_Y1_3211_SB
      breakIdRe = new RegExp(
        '^([0-9]+[A-Z]+)_(Y[0-9])_([0-9][0-9][0-9][0-9])_([A-Z][A-Z])$'
      );

      m = id.match(breakIdRe);
      if (m) {
        return m[3];
      }
    }
    return this.defaultPeriod;
  }
}
