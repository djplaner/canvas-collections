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

  let noStopDateSet = false;
  let noStopDateSetClass = "";

  checkDate();

  // Grey out/disable the stop date options if no stop date set
  $: { 
    noStopDateSet = ( 
      (! $collectionsStore["MODULES"][moduleId]["date"]["to"].hasOwnProperty("calendarDate") ) || 
      ( $collectionsStore["MODULES"][moduleId]["date"]["to"]["calendarDate"] === "" ));
    noStopDateSetClass = noStopDateSet ? "cc-no-stop-date-set" : "";
  }

  /**
   * @function checkDate
   * @description When component is initialised, check the date and
   * perform some tidy ups, including
   * - setting the calendar date
   *   Mainly a transition from before calendar date was set. Check if
   *   there is a day, month, year and set calendar date appropriately
   */

  function checkDate() {
    checkCalendarDate($collectionsStore["MODULES"][moduleId]["date"]);
    checkCalendarDate($collectionsStore["MODULES"][moduleId]["date"]["to"]);
  }

  /**
   * @function checkCalendarDate
   * @param {Object} date
   * @description
   * - if no "calendarDate" data member
   *   - check if there are month, date and year members
   *     - if so, set calendar date based on those members
   */

  function checkCalendarDate(date: Object) {
    // check if there is a calendar date member
    if (!Object.hasOwnProperty.call(date, "calendarDate")) {
      // no calendar date member
      // set the calendarDate member if there are month, date and year members
      if (
        Object.hasOwnProperty.call(date, "month") &&
        Object.hasOwnProperty.call(date, "date") &&
        Object.hasOwnProperty.call(date, "year")
      ) {
        setCalendarDate(date);
      }
    }
  }

  /**
   * @function setCalendarDate
   * @param date
   * @description Check that the date, month and year members
   * are in the form we expect, then convert the short month to a number
   * and set calendarDate to YYYY-MM-DD
   */

  function setCalendarDate(date: Object) {
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

    if (date["month"] in months) {
      monthNumber = months[date["month"]];
    } else {
      return;
    }

    const calendarDate = `${date["year"]}-${monthNumber}-${date["date"]}`;
    // create dateObj from calendarDate, if valid date set date["calendarDate"]
    const dateObj = new Date(calendarDate);
    if (dateObj instanceof Date && !isNaN(dateObj.valueOf())) {
      date["calendarDate"] = calendarDate;
    }
  }

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

    const dateInput = document.getElementById(id) as HTMLInputElement;

    if (dateInput === null) {
      return;
    }

    // Get the date value and split into components
    const value = dateInput.value;
    date["calendarDate"] = value;

    // check for clearing of calendarDate which means clearing all
    // other date components
    if (value === "") {
      date["year"] = "";
      date["month"] = "";
      date["day"] = "";
      date["date"] = "";
    } else {
      const dateObj = new Date(value);
      date["year"] = dateObj.getFullYear().toString();
      date["month"] = dateObj.toLocaleString("default", { month: "short" });
      date["day"] = dateObj.toLocaleString("default", { weekday: "short" });
      date["date"] = dateObj.getDate().toString();
    }

    // loop fields of date and update appropriate collectionsStore
    Object.keys(date).forEach((field) => {
      if (to === true) {
        $collectionsStore["MODULES"][moduleId]["date"]["to"][field] =
          date[field];
      } else {
        $collectionsStore["MODULES"][moduleId]["date"][field] = date[field];
      }
    });
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
    dateLabel: {
      tooltip: `A short textual label to add before the date details (no HTML).`,
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/dates/#date-label",
    },
    dateStart: {
      tooltip: `Specify a single date, or becomes the start date in a date range when used 
		with "stop" date.`,
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/dates/#start-and-stop-date",
    },
    stopDate: {
      tooltip: `Specify the 'stop' date for a date range. Date is relative to the specific study period.`,
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/dates/#start-and-stop-date",
    },
    calculatedDate: {
      tooltip: `Representation of the date as configured by <em>Start Date</em> and possible <em>Stop Date</em>.`,
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/dates/#calculated-date",
    },
    showDate: {
      tooltip: `Select to show this portion of the date in the representation.`,
    },
    outputDate: {
      tooltip: `A live representation of the configured date.`,
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/dates/#date-output",
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
      <sl-tooltip id="cc-about-module-show-label">
        <div slot="content">{@html HELP.showDate.tooltip}</div>
      <sl-tooltip id="cc-about-module-date-label">
        <div slot="content">{@html HELP.dateLabel.tooltip}</div>
        <a target="_blank" rel="noreferrer" href={HELP.dateLabel.href}
          ><i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
        <input
          type="checkbox"
          on:keydown|stopPropagation
          bind:checked={$collectionsStore["MODULES"][moduleId]["dateShow"][
            "label"
          ]}
          on:click={() => {
            $configStore["needToSaveCollections"] = true;
          }}
        />
      </sl-tooltip>
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
        <sl-tooltip id="cc-about-module-show-start-time">
          <div slot="content">{@html HELP.showDate.tooltip}</div>
          <input
            type="checkbox"
            on:keydown|stopPropagation
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateShow"][
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
        <sl-tooltip id="cc-about-module-day-stop">
          <div slot="content">{@html HELP.showDate.tooltip}</div>
          <input
            on:keydown|stopPropagation
            type="checkbox"
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateShow"][
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
          <div slot="content">{@html HELP.showDate.tooltip}</div>
          <input
            on:keydown|stopPropagation
            type="checkbox"
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateShow"][
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
        <sl-tooltip id="cc-about-module-month-stop">
          <div slot="content">{@html HELP.showDate.tooltip}</div>
          <input
            on:keydown|stopPropagation
            type="checkbox"
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateShow"][
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

    <div class="cc-module-form {noStopDateSetClass}">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-time-to">Select time</label>
        <sl-tooltip id="cc-about-module-show-stop-time">
          <div slot="content">{@html HELP.showDate.tooltip}</div>
          <input
            type="checkbox"
            on:keydown|stopPropagation
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateShow"][
              "toTime"
            ]}
            on:click={() => {
              $configStore["needToSaveCollections"] = true;
            }}
            disabled={noStopDateSet}
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
    <div class="cc-module-date-display {noStopDateSetClass}">
      <span class="cc-module-label-display">
        <label for="cc-module-config-{moduleId}-day">Day</label>

        <sl-tooltip id="cc-about-module-date-stop">
          <div slot="content">{@html HELP.showDate.tooltip}</div>
          <input
            on:keydown|stopPropagation
            type="checkbox"
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateShow"][
              "toDay"
            ]}
            on:click={() => {
              $configStore["needToSaveCollections"] = true;
            }}
            disabled={noStopDateSet}
          />
        </sl-tooltip>
      </span>

      <span class="cc-module-label-display">
        <label for="cc-module-config-{moduleId}-date">Date</label>

        <sl-tooltip id="cc-about-module-date-stop">
          <div slot="content">{@html HELP.showDate.tooltip}</div>
          <input
            on:keydown|stopPropagation
            type="checkbox"
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateShow"][
              "toDate"
            ]}
            on:click={() => {
              $configStore["needToSaveCollections"] = true;
            }}
            disabled={noStopDateSet}
          />
        </sl-tooltip>
      </span>
      <!--    </div> -->

      <!--    <div class="cc-module-form"> -->
      <span class="cc-module-label-display">
        <label for="cc-module-config-{moduleId}-month">Month</label>

        <sl-tooltip id="cc-about-module-date-stop">
          <div slot="content">{@html HELP.showDate.tooltip}</div>
          <input
            on:keydown|stopPropagation
            type="checkbox"
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateShow"][
              "toMonth"
            ]}
            on:click={() => {
              $configStore["needToSaveCollections"] = true;
            }}
            disabled={noStopDateSet}
          />
        </sl-tooltip>
      </span>
      <span class="cc-module-input-display">
        {$collectionsStore["MODULES"][moduleId]["date"]["to"]["day"]}
      </span>
      <span class="cc-module-input-display">
        {$collectionsStore["MODULES"][moduleId]["date"]["to"]["date"]}
      </span>
      <span class="cc-module-input-display">
        {$collectionsStore["MODULES"][moduleId]["date"]["to"]["month"]}
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

    <div style="padding-left: 2em;">
      <DateWidget
        date={$collectionsStore["MODULES"][moduleId]["date"]}
        dateShow={$collectionsStore["MODULES"][moduleId]["dateShow"]}
        flow="normal"
      />
    </div>
  </div>
</div>

<style>
  .cc-date-row {
    max-width: 200em;
    margin: 0 auto;
    display: grid;
    gap: 1rem;
  }

  @media (min-width: 70em) {
    .cc-date-row {
      grid-template-columns: repeat(2, 1fr) 0.5fr;
      grid-template-rows: 1fr;
      grid-column-gap: 0px;
      grid-row-gap: 0px;
    }
  }
  .cc-module-form {
    display: grid;
    grid-template-columns: 6em 10em;
    grid-column-gap: 0.5em;
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
    font-size: 0.8em;
  }

  .cc-module-input input {
    width: 90%;
  }

  .cc-module-date-display {
    max-width: 100em;
    display: grid;
    margin: 0 auto;
    gap: 0em;
  }

  @media (min-width: 200px) {
    .cc-module-date-display {
      grid-template-columns: repeat(3, 4em);
      padding-left: 3em;
    }
  }

  .cc-module-label-display {
    text-align: center;
  }

  .cc-module-label-display label {
    font-weight: bold;
    color: #333;
    font-size: 0.8em;
    margin-bottom: 0px;
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

  .cc-no-stop-date-set {
    opacity: 0.5;
  }
</style>
