<script lang="ts">
  /**
   * Implement the tabbed interface that allows for the configuration of
   * the to and from dates for a specific module (prop: moduleId)
   *
   * TODO
   * - current study period (from UniversityDateCalendar)
   * - display the full string representation of the current dates
   * - show the current settings from from and to
   */

  import { collectionsStore, configStore } from "../../stores";

  import { debug } from "../../lib/debug";
  import UniversityDateCalendar from "../../lib/university-date-calendar";

  export let moduleId: Number;

  let calendar = new UniversityDateCalendar();
  // tmp kludge
  let currentStudyPeriod = `${calendar.getHumanReadableStudyPeriod()} (${calendar.getStudyPeriod()})`;
  let calculatedDate = calculateDate(
    $collectionsStore["MODULES"][moduleId].date
  );
  let originalDate = $collectionsStore["MODULES"][moduleId].date;

  // TODO move these into UniversityDateCalendar?
  const daysOfWeek = calendar.getDaysOfWeek();
  const weeksOfTerm = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    "exam",
  ];

  /**
   * @function calculateDate
   * @param {Object} dateInfo - module date json
   * @return {String} - human readable date
   * @description Conert json date into a human readable date using the
   * calendar to calculate
   * Return "No set date" if no date is set
   */
  function calculateDate(dateInfo: Object): String {
    // valid date combinations will be
    // 1. week
    // 2. week and day
    // 3. week and day and time
    // - must have a week

    if (dateInfo.week === "") {
      return "No date set";
    }

    let dateString = dateJsonToString(dateInfo);

    if (dateInfo.hasOwnProperty("to") && dateInfo.to.week !== "") {
      // date range
      dateString = `${dateString} to ${dateJsonToString(dateInfo.to)}`;
    }
    return dateString;
  }

  function dateJsonToString(dateInfo: Object): String {
    let calcDate = {};
    if (dateInfo.day === "") {
      // no day
      calcDate = calendar.getDate(dateInfo.week);
    } else {
      calcDate = calendar.getDate(dateInfo.week, false, dateInfo.day);
    }
    let dateString = `${calcDate["date"]} ${calcDate["month"]} ${calcDate["year"]}`;

    if (calcDate.hasOwnProperty("day")) {
      dateString = `${calcDate["day"]} ${dateString}`;
    }
    if (dateInfo.time !== "") {
      // no time
      dateString = `${dateInfo.time} ${dateString}`;
    }
    if (dateInfo.hasOwnProperty("label") && dateInfo.label !== "") {
      dateString = `${dateInfo.label} ${dateString}`;
    }
    return dateString;
  }

  /**
   * @function updateDate
   * @description Called whenever any change has been made to the date
   * - update the calculateDate
   * - set needToSave to true
   */

  function updateDate() {
    // also need to recalculate the date and month
    modifyDate();
    //calculatedDate = calculateDate($collectionsStore["MODULES"][moduleId].date);
    $configStore["needToSaveCollections"] = true;
  }

  /**
   * @function modifyDate
   * @description Something has changed about the module's date. Need to recalculate the
   * and update the calendar date for one of the from or to dates
   * - call getDate on from
   * - call getDate on to - if it exists
   * - compare the resulting JSON and make any chances necessary
   */

  function modifyDate() {
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
  }

  /**
   * Define the tooltip and help site links for this module
   */
  const HELP = {
    studyPeriod: {
      tooltip: `The term is automatically identified from the course site. The academic
		calendar for this term will be used to translate the generic date <em>Monday Week 1</em> into a calendar date.`,
      href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#study-period",
    },
    dateStart: {
      tooltip: `Specify a single date, or becomes the start date in a date range when used 
		with "stop" date.`,
      href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#start-date",
    },
    stopDate: {
      tooltip: `Specify the 'stop' date for a date range. Date is relative to the specific study period.`,
      href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#stop-date",
    },
    calculatedDate: {
      tooltip: `Representation of the date as configured by <em>Start Date</em> and possible <em>Stop Date</em>.`,
      href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#start-date",
    },
    hideDate: {
      tooltip: `Select to hide this portion of the date in the representation.`,
    },
    calendarDate: {
      tooltip: `<p>Calculated automatically based on the academic calendar and the current term.<p>
        <p>Use the above to change.</p>`,
    },
  };
</script>

<div class="cc-current-studyPeriod">
  <p>
    <strong>Current Term:</strong>
    <sl-tooltip class="cc-about-module-studyPeriod">
      <div slot="content">{@html HELP.studyPeriod.tooltip}</div>
      <a target="_blank" rel="noreferrer" href={HELP.studyPeriod.href}
        ><i class="icon-question cc-module-icon" /></a
      >
    </sl-tooltip>
    {currentStudyPeriod}
  </p>
</div>

<div class="cc-calculated-date">
  <p>
    <strong>Current Date:</strong>
    <sl-tooltip>
      <div slot="content">{@html HELP.calculatedDate.tooltip}</div>
      <a href={HELP.calculatedDate.href} target="_blank" rel="noreferrer">
        <i class="icon-question cc-module-icon" />
      </a>
    </sl-tooltip>
    {calculateDate($collectionsStore["MODULES"][moduleId].date)}
  </p>
</div>

<div class="cc-date-row">
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
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-day">Day of week</label>

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
      <span class="cc-module-input">
        <select
          id="cc-module-config-{moduleId}-day"
          bind:value={$collectionsStore["MODULES"][moduleId]["date"]["day"]}
          on:change={updateDate}
        >
          <option value="">Not chosen</option>
          {#each daysOfWeek as day}
            <option value={day}>{day}</option>
          {/each}
        </select>
      </span>
    </div>
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-week">Week</label>
        <sl-tooltip id="cc-about-module-date-stop">
          <div slot="content">{@html HELP.hideDate.tooltip}</div>
          <input
            type="checkbox"
            on:keydown|stopPropagation
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateHide"][
              "week"
            ]}
            on:click={() => {
              $configStore["needToSaveCollections"] = true;
            }}
          />
        </sl-tooltip>
      </span>
      <span class="cc-module-input">
        <select
          id="cc-module-config-{moduleId}-week"
          bind:value={$collectionsStore["MODULES"][moduleId]["date"]["week"]}
          on:change={updateDate}
        >
          <option value="">Not chosen</option>
          {#each weeksOfTerm as week}
            <option value={week.toString()}>{week}</option>
          {/each}
        </select>
      </span>
    </div>
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-time">Time</label>
        <sl-tooltip id="cc-about-module-date-stop">
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
            on:change={updateDate}
          />
        </aeon-datepicker>
      </span>
    </div>
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-calendar-date">Date</label>
        <sl-tooltip id="cc-about-module-date-stop">
          <div slot="content">{@html HELP.hideDate.tooltip}</div>
          <input
            type="checkbox"
            on:keydown|stopPropagation
            bind:checked={$collectionsStore["MODULES"][moduleId]["dateHide"][
              "calendarDate"
            ]}
            on:click={() => {
              $configStore["needToSaveCollections"] = true;
            }}
          />
        </sl-tooltip>
      </span>
      <span class="cc-module-input">
        <sl-tooltip class="cc-about-module-studyPeriod">
          <div slot="content">{@html HELP.calendarDate.tooltip}</div>

          <input
            id="cc-module-config-{moduleId}-calendar-date"
            type="text"
            disabled
            value="{$collectionsStore['MODULES'][moduleId]['date'][
              'date'
            ]} {$collectionsStore['MODULES'][moduleId]['date']['month']}"
          />
        </sl-tooltip>
      </span>
    </div>
  </div>
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
    <div class="cc-module-form" style="height: 2.375rem" />
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-day-to">Day of week</label>
      </span>
      <span class="cc-module-input">
        <select
          id="cc-module-config-{moduleId}-day-to"
          bind:value={$collectionsStore["MODULES"][moduleId]["date"]["to"][
            "day"
          ]}
          on:change={updateDate}
        >
          <option value="">Not chosen</option>
          {#each daysOfWeek as day}
            <option value={day}>{day}</option>
          {/each}
        </select>
      </span>
    </div>
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-week-to">Week</label>
      </span>
      <span class="cc-module-input">
        <select
          id="cc-module-config-{moduleId}-week-to"
          bind:value={$collectionsStore["MODULES"][moduleId]["date"]["to"][
            "week"
          ]}
          on:change={updateDate}
        >
          <option value="">Not chosen</option>
          {#each weeksOfTerm as week}
            <option value={week.toString()}>{week}</option>
          {/each}
        </select>
      </span>
    </div>
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-time-to">Time</label>
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
            on:change={updateDate}
          />
        </aeon-datepicker>
      </span>
    </div>
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-calendar-date-to">Date</label>
      </span>
      <span class="cc-module-input">
        <sl-tooltip class="cc-about-module-studyPeriod">
          <div slot="content">{@html HELP.calendarDate.tooltip}</div>
          <input
            id="cc-module-config-{moduleId}-calendar-date-to"
            type="text"
            disabled
            value="{$collectionsStore['MODULES'][moduleId]['date']['to'][
              'date'
            ]} {$collectionsStore['MODULES'][moduleId]['date']['to']['month']}"
          />
        </sl-tooltip>
      </span>
    </div>
  </div>
</div>

<style>
  .cc-calculated-date,
  .cc-current-studyPeriod {
    font-size: 0.9em;
  }

  .cc-module-form {
    display: grid;
    grid-template-columns: 8em 1fr;
    grid-gap: 1em;
  }

  .cc-module-label {
    grid-column: 1/ 2;
    text-align: right;
    margin-top: 0.4em;
  }

  .cc-module-input {
    grid-column: 2/ 3;
  }

  .cc-module-input select,
  .cc-module-input input {
    width: 90%;
  }

  .cc-date-row {
    border-top: 1px solid #ccc;
  }
  .cc-date-row:after {
    content: "";
    display: table;
    clear: both;
  }

  .cc-date-col {
    float: left;
    width: 50%;
  }

  .cc-date-heading {
    padding: 0.5rem;
    text-align: center;
    font-size: 0.9em;
    font-weight: bold;
  }

  sl-tooltip {
    text-align: left;
    white-space: normal;
  }
</style>
