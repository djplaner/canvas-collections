<!--
 Copyright (C) 2023 Griffith University
 
 This file is part of Canvas Collections.
 
 Canvas Collections is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 Canvas Collections is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with Canvas Collections.  If not, see <http://www.gnu.org/licenses/>.
-->
<script lang="ts">
  /**
   * Implement the tabbed interface that allows for the configuration of
   * the to and from dates for a specific module (prop: moduleId)
   *
   * Currently only using straight calendar dates
   *
   * TODO
   * - Add support for institution's providing university study periods and using
   *   generic dates (e.g. Friday, Week 3)
   */

  import { collectionsStore, configStore } from "../../stores";

  import DateWidget from "../Representations/GriffithCards/DateWidget.svelte";

  export let moduleId: Number;

  let originalDate = $collectionsStore["MODULES"][moduleId].date;

  /**
   * @function updateDate
   * @description Called whenever any change has been made to the date
   * - update the calculateDate
   * - set needToSave to true
   */

  /*  function updateDate() {
    // also need to recalculate the date and month
    modifyDate();
    //calculatedDate = calculateDate($collectionsStore["MODULES"][moduleId].date);
    $configStore["needToSaveCollections"] = true;
  } */

  /**
   * @function modifyDate
   * @description Something has changed about the module's date. Need to recalculate the
   * and update the calendar date for one of the from or to dates
   * - call getDate on from
   * - call getDate on to - if it exists
   * - compare the resulting JSON and make any chances necessary
   */

  /*  function modifyDate() {
    // calculate new date for from
    let newFrom = {};

    if ($collectionsStore["MODULES"][moduleId]["date"].day === "") {
      // no day
      newFrom = calendar.getDate(
        $collectionsStore["MODULES"][moduleId]["date"].week
      );
    } else {
      newFrom = calendar.getDate(
        $collectionsStore["MODULES"][moduleId]["date"].week,
        false,
        $collectionsStore["MODULES"][moduleId]["date"].day
      );
    }
    // calculate new date for to
    let newTo = {};
    if ($collectionsStore["MODULES"][moduleId]["date"].hasOwnProperty("to")) {
      if ($collectionsStore["MODULES"][moduleId]["date"].to.day === "") {
        newTo = calendar.getDate(
          $collectionsStore["MODULES"][moduleId]["date"].to.week
        );
      } else {
        newTo = calendar.getDate(
          $collectionsStore["MODULES"][moduleId]["date"].to.week,
          false,
          $collectionsStore["MODULES"][moduleId]["date"].to.day
        );
      }
    }

    // date and month specific the calendar date, this is what we need to check and update
    const fieldsToCheck = ["date", "month"];
    fieldsToCheck.forEach((field) => {
      if (newFrom[field] !== originalDate[field]) {
        $collectionsStore["MODULES"][moduleId]["date"][field] = newFrom[field];
      }
      if (newTo[field] !== originalDate["to"][field]) {
        $collectionsStore["MODULES"][moduleId]["date"]["to"][field] =
          newTo[field];
      }
    });
  } */

  /**
   * @function updateModuleDate
   * @param {boolean} to - true if the date is the to date for moduleId
   * @description The date (for either from/to dates) has been updated with
   * shoelace date input.  Aim here is to update the relevant date information
   *
   * Two tasks
   * 1. Set calendarDate for from/to to YYYY-MM-DD
   * 2. Split that date into the following components and update appropriate values
   * - year
   * - date - date of the month
   * - month - three letter month name
   * - day - of the week
   */

  function updateModuleDate(event, to = false) {
    // get the value updated
    let id = `cc-module-config-${moduleId}-calendar-date`;
    let date = {};
    if (to === true) {
      id = id + "-to";
    }

    console.log(`update element ${id}`);

    const dateInput = document.getElementById(id) as HTMLInputElement;

    if (dateInput === null) {
      console.log("Couldn't get element");
      return;
    }

    console.log(`dateInput value is ${dateInput.value}`);
    // Get the date value and split into components
    const value = dateInput.value;
    date["calendarDate"] = value;

    const dateObj = new Date(value);
    date["year"] = dateObj.getFullYear().toString();
    date["month"] = dateObj.toLocaleString("default", { month: "short" });
    date["day"] = dateObj.toLocaleString("default", { weekday: "short" });
    date["date"] = dateObj.getDate().toString();

    // loop fields of date and update appropriate collectionsStore
    Object.keys(date).forEach((field) => {
      if (to === true) {
        $collectionsStore["MODULES"][moduleId]["date"]["to"][field] =
          date[field];
      } else {
        $collectionsStore["MODULES"][moduleId]["date"][field] = date[field];
      }
    });

    /*    let date = $collectionsStore["MODULES"][moduleId]["date"]["date"];
    let month = $collectionsStore["MODULES"][moduleId]["date"]["month"];

    if (to) {
      date = $collectionsStore["MODULES"][moduleId]["date"]["to"]["date"];
      month = $collectionsStore["MODULES"][moduleId]["date"]["to"]["month"];
    } 

    // convert month (e.g. Mar) to month number (e.g. 03) self-contained
    const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    let monthNumber;

    if (month in months) {
      monthNumber = months[month];
    } else {
      // can't return proper date without month
      return "";
    }

    //console.log(`updateModuleDate ${to} ${date} ${month} 2023`);
    console.log(`updateModuleDate 2023-${monthNumber}-${date}`);

    //    return `2023-04-10`;

    return `2023-${monthNumber}-${date}`; */
  }

  /**
   * @function updateModuleDateTo
   * @description Kludge workaround because I can't figure out the correct format to pass
   * a parameter from sl-input:on-change
   */

  function updateModuleDateTo() {
    updateModuleDate({}, true);
  }

  /**
   * Define the tooltip and help site links for this module
   */
  const HELP = {
    studyPeriod: {
      tooltip: `The term is automatically identified from the course site. The academic
		calendar for this term will be used to translate the generic date <em>Monday Week 1</em> into a calendar date.`,
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/dates/#study-period",
    },
    dateStart: {
      tooltip: `Specify a single date, or becomes the start date in a date range when used 
		with "stop" date.`,
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/dates/#start-date",
    },
    stopDate: {
      tooltip: `Specify the 'stop' date for a date range. Date is relative to the specific study period.`,
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/dates/#stop-date",
    },
    calculatedDate: {
      tooltip: `Representation of the date as configured by <em>Start Date</em> and possible <em>Stop Date</em>.`,
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/dates/#calculated-date",
    },
    hideDate: {
      tooltip: `Select to hide this portion of the date in the representation.`,
    },
    outputDate: {
      tooltip: `A live representation of the configured date.`
    },
    calendarDate: {
      tooltip: `<p>Calculated automatically based on the academic calendar and the current term.<p>
        <p>Use the above to change.</p>`,
    },
  };
</script>

<!-- Date label across the top -->
<div class="cc-date-label">
  <div class="cc-module-form">
    <span class="cc-module-label">
      <label for="cc-module-config-{moduleId}-date-label">Date label</label>
    </span>
    <span class="cc-module-input">
      {#if $collectionsStore["MODULES"][moduleId].hasOwnProperty("date") && $collectionsStore["MODULES"][moduleId].date.hasOwnProperty("label")}
        <input
          type="text"
          on:keydown|stopPropagation
          id="cc-module-config-{moduleId}-date-label"
          style="width:10rem"
          bind:value={$collectionsStore["MODULES"][moduleId]["date"]["label"]}
          on:change={() => {
            $configStore["needToSaveCollections"] = true;
          }}
        />
      {:else}
        <input
          type="text"
          id="cc-module-config-{moduleId}-date-label"
          style="width:10rem"
          value=""
        />
      {/if}
    </span>
  </div>
</div>

<!-- Three columns: start date, stop date, date output -->

<div class="cc-date-row">
  <!-- Start date -->

  <div class="cc-date-col" id="cc-module-config-{moduleId}-date-start">
    <div class="cc-date-heading">
      Start date
      <sl-tooltip id="cc-about-module-date-start">
        <div slot="content">{@html HELP.dateStart.tooltip}</div>
        <a target="_blank" rel="noreferrer" href={HELP.dateStart.href}
          ><i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
    </div>

    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-day">Select date</label>
      </span>
      <span class="cc-module-input">
        <sl-input
          id="cc-module-config-{moduleId}-calendar-date"
          size="small"
          type="date"
          value={$collectionsStore["MODULES"][moduleId]["date"][
            "calendarDate"
          ] || ""}
          on:sl-change={updateModuleDate}
        />
      </span>
    </div>

    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-time">Select time</label>
        <sl-tooltip id="cc-about-module-hide-start-time">
          <div slot="content">{@html HELP.hideDate.tooltip}</div>
          <input
            type="checkbox"
            on:keydown|stopPropagation
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateHide"][
              "time"
            ]}
            on:click={() => {
              $configStore["needToSaveCollections"] = true;
            }}
          />
        </sl-tooltip>
      </span>
      <span class="cc-module-input">
        <style>
          input[readonly] {
            display: none;
          }
        </style>
        <aeon-datepicker local="en-au">
          <input
            type="time"
            id="cc-module-config-{moduleId}-time"
            name="time"
            bind:value={$collectionsStore["MODULES"][moduleId]["date"]["time"]}
          />
        </aeon-datepicker>
      </span>
    </div>

    <div class="cc-module-date-display">
      <span class="cc-module-label-display">
        <label for="cc-module-config-{moduleId}-day">Day</label>

        <sl-tooltip id="cc-about-module-date-stop">
          <div slot="content">{@html HELP.hideDate.tooltip}</div>
          <input
            on:keydown|stopPropagation
            type="checkbox"
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateHide"][
              "day"
            ]}
            on:click={() => {
              $configStore["needToSaveCollections"] = true;
            }}
          />
        </sl-tooltip>
      </span>

      <span class="cc-module-label-display">
        <label for="cc-module-config-{moduleId}-date">Date</label>

        <sl-tooltip id="cc-about-module-date-stop">
          <div slot="content">{@html HELP.hideDate.tooltip}</div>
          <input
            on:keydown|stopPropagation
            type="checkbox"
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateHide"][
              "date"
            ]}
            on:click={() => {
              $configStore["needToSaveCollections"] = true;
            }}
          />
        </sl-tooltip>
      </span>
      <!--    </div> -->

      <!--    <div class="cc-module-form"> -->
      <span class="cc-module-label-display">
        <label for="cc-module-config-{moduleId}-month">Month</label>

        <sl-tooltip id="cc-about-module-date-stop">
          <div slot="content">{@html HELP.hideDate.tooltip}</div>
          <input
            on:keydown|stopPropagation
            type="checkbox"
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateHide"][
              "month"
            ]}
            on:click={() => {
              $configStore["needToSaveCollections"] = true;
            }}
          />
        </sl-tooltip>
      </span>
      <span class="cc-module-input-display">
        {$collectionsStore["MODULES"][moduleId]["date"]["day"]}
      </span>
      <span class="cc-module-input-display">
        {$collectionsStore["MODULES"][moduleId]["date"]["date"]}
      </span>
      <span class="cc-module-input-display">
        {$collectionsStore["MODULES"][moduleId]["date"]["month"]}
      </span>
    </div>
  </div>

  <!-- stop date -->
  <div class="cc-date-col" id="cc-module-config-{moduleId}-date-stop">
    <div class="cc-date-heading">
      Stop date
      <sl-tooltip id="cc-about-module-date-stop">
        <div slot="content">{@html HELP.stopDate.tooltip}</div>
        <a target="_blank" rel="noreferrer" href={HELP.stopDate.href}
          ><i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
    </div>
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-calendar-date-to"
          >Select date</label
        >
      </span>
      <span class="cc-module-input">
        <sl-input
          id="cc-module-config-{moduleId}-calendar-date-to"
          type="date"
          size="small"
          on:sl-change={updateModuleDateTo}
          value={$collectionsStore["MODULES"][moduleId]["date"]["to"][
            "calendarDate"
          ] || ""}
        />
      </span>
    </div>

    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-time-to">Select time</label>
        <sl-tooltip id="cc-about-module-hide-stop-time">
          <div slot="content">{@html HELP.hideDate.tooltip}</div>
          <input
            type="checkbox"
            on:keydown|stopPropagation
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateHide"][
              "toTime"
            ]}
            on:click={() => {
              $configStore["needToSaveCollections"] = true;
            }}
          />
        </sl-tooltip>
      </span>
      <span class="cc-module-input">
        <style>
          input[readonly] {
            display: none;
          }
        </style>
        <aeon-datepicker local="en-au">
          <input
            type="time"
            id="cc-module-config-{moduleId}-time-to"
            name="time"
            bind:value={$collectionsStore["MODULES"][moduleId]["date"]["to"][
              "time"
            ]}
          />
        </aeon-datepicker>
      </span>
    </div>
    <div class="cc-module-date-display">
      <span class="cc-module-label-display">
        <label for="cc-module-config-{moduleId}-day">Day</label>

        <sl-tooltip id="cc-about-module-date-stop">
          <div slot="content">{@html HELP.hideDate.tooltip}</div>
          <input
            on:keydown|stopPropagation
            type="checkbox"
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateHide"][
              "day"
            ]}
            on:click={() => {
              $configStore["needToSaveCollections"] = true;
            }}
          />
        </sl-tooltip>
      </span>

      <span class="cc-module-label-display">
        <label for="cc-module-config-{moduleId}-date">Date</label>

        <sl-tooltip id="cc-about-module-date-stop">
          <div slot="content">{@html HELP.hideDate.tooltip}</div>
          <input
            on:keydown|stopPropagation
            type="checkbox"
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateHide"][
              "date"
            ]}
            on:click={() => {
              $configStore["needToSaveCollections"] = true;
            }}
          />
        </sl-tooltip>
      </span>
      <!--    </div> -->

      <!--    <div class="cc-module-form"> -->
      <span class="cc-module-label-display">
        <label for="cc-module-config-{moduleId}-month">Month</label>

        <sl-tooltip id="cc-about-module-date-stop">
          <div slot="content">{@html HELP.hideDate.tooltip}</div>
          <input
            on:keydown|stopPropagation
            type="checkbox"
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateHide"][
              "month"
            ]}
            on:click={() => {
              $configStore["needToSaveCollections"] = true;
            }}
          />
        </sl-tooltip>
      </span>
      <span class="cc-module-input-display">
        {$collectionsStore["MODULES"][moduleId]["date"]["day"]}
      </span>
      <span class="cc-module-input-display">
        {$collectionsStore["MODULES"][moduleId]["date"]["date"]}
      </span>
      <span class="cc-module-input-display">
        {$collectionsStore["MODULES"][moduleId]["date"]["month"]}
      </span>
    </div>

  </div>

  <div class="cc-date-col" id="cc-module-config-{moduleId}-date-output">
    <!-- date output -->
    <div class="cc-date-heading">
      Date output
      <sl-tooltip id="cc-about-module-date-output">
        <div slot="content">{@html HELP.outputDate.tooltip}</div>
          <i class="icon-question cc-module-icon" />
      </sl-tooltip>
    </div>

      <div class="cc-module-form" style="padding-left: 2em;">
        <DateWidget
          date={$collectionsStore["MODULES"][moduleId]["date"]}
          dateHide={$collectionsStore["MODULES"][moduleId]["dateHide"]}
          flow="normal"
        />
      </div>
  </div>
</div>

<style>
  .cc-date-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr) 0.5fr;
    grid-template-rows: 1fr;
    grid-column-gap: 2em;
    grid-row-gap: 0px;
  }
  .cc-module-form {
    display: grid;
    grid-template-columns: 8em 12em; 
    grid-column-gap: 1em;
    grid-row-gap: 0px;
    margin-bottom: 0.4em;
  }

  .cc-module-label {
    text-align: right;
  }

  .cc-module-label label {
    margin-top: 0.4em;
    font-weight: bold;
    color: #333;
  }

  .cc-module-input input {
    width: 90%;
  }

  .cc-module-date-display {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 2fr;
    grid-column-gap: 0.5em;
    grid-row-gap: 0px;
  }

  .cc-module-label-display {
    text-align: center;
  }

  .cc-module-label-display label {
    font-weight: bold;
    color: #333;
  }

  .cc-module-input-display {
    font-size: 0.875em;
    text-align: center;
  }

/*  .cc-date-row:after {
    content: "";
    display: table;
    clear: both;
  } */

  .cc-date-heading {
    padding: 0.5rem 0rem 0.5rem 1rem;
    /*text-align: center;*/
    font-size: 0.9em;
    font-weight: bold;
  }

  sl-tooltip {
    text-align: left;
    white-space: normal;
  }

  input { 
    margin: 0px;
  }
</style>
