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

  import { collectionsStore } from "../../stores";

  import { debug } from "../../lib/debug";

  export let moduleId: Number;

  // tmp kludge
  let currentStudyPeriod = "3225 kludge";
  let calculatedDate = "something kludge";
  // TODO move these into UniversityDateCalendar?
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
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

  debug("______________ ModuleDateConfiguration.svelte _______________");
  debug($collectionsStore["MODULES"][moduleId]);

  /**
   * Define the tooltip and help site links for this module
   */
  const HELP = {
    studyPeriod: {
      tooltip: `The study period automatically identified from the course site. The academic
		calendar for this study period will be used to translate "Monday Week 1" into a calendar date.`,
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
  };
</script>

<div class="cc-module-config-detail">
  <div class="cc-calculated-date">
    <sl-tooltip>
      <div slot="content">{@html HELP.calculatedDate.tooltip}</div>
      <a href={HELP.calculatedDate.href} target="_blank" rel="noreferrer">
        <i class="icon-question cc-module-icon" />
      </a>
    </sl-tooltip>
    <strong>Current Date:</strong>
    {calculatedDate}
  </div>

  <div class="cc-current-studyPeriod">
    <sl-tooltip class="cc-about-module-studyPeriod">
      <div slot="content">{@html HELP.studyPeriod.tooltip}</div>
      <a target="_blank" rel="noreferrer" href={HELP.studyPeriod.href}
        ><i class="icon-question cc-module-icon" /></a
      >
    </sl-tooltip>
    <strong>Current Study Period:</strong>
    {currentStudyPeriod}
  </div>
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
      </span>
      <span class="cc-module-input">
        <select
          id="cc-module-config-{moduleId}-day"
          bind:value={$collectionsStore["MODULES"][moduleId]["date"]["day"]}
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
      </span>
      <span class="cc-module-input">
        <select id="cc-module-config-{moduleId}-week">
          <option value="">Not chosen</option>
          {#each weeksOfTerm as week}
            {#if $collectionsStore["MODULES"][moduleId].hasOwnProperty("date") && $collectionsStore["MODULES"][moduleId].date.hasOwnProperty("week")}
              <option
                value={week}
                selected={week ===
                  $collectionsStore["MODULES"][moduleId].date.week}
                >{week}</option
              >
            {:else}
              <option value={week}>{week}</option>
            {/if}
            >
          {/each}
        </select>
      </span>
    </div>
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-time">Time</label>
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
            value=""
          />
        </aeon-datepicker>
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
        <select id="cc-module-config-{moduleId}-day-to">
          <option value="">Not chosen</option>
          {#each daysOfWeek as day}
            {#if $collectionsStore["MODULES"][moduleId].hasOwnProperty("date") && $collectionsStore["MODULES"][moduleId].date.hasOwnProperty("to") && $collectionsStore["MODULES"][moduleId].date.hasOwnProperty("day")}
              <option
                value={day}
                selected={day ===
                  $collectionsStore["MODULES"][moduleId].date.to.day}
                >{day}</option
              >
            {:else}
              <option value={day}>{day}</option>
            {/if}
          {/each}
        </select>
      </span>
    </div>
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-module-config-{moduleId}-week-to">Week</label>
      </span>
      <span class="cc-module-input">
        <select id="cc-module-config-{moduleId}-week-to">
          <option value="">Not chosen</option>
          {#each weeksOfTerm as week}
            {#if $collectionsStore["MODULES"][moduleId].hasOwnProperty("date") && $collectionsStore["MODULES"][moduleId].date.hasOwnProperty("to") && $collectionsStore["MODULES"][moduleId].date.hasOwnProperty("week")}
              <option
                value={week}
                selected={week ===
                  $collectionsStore["MODULES"][moduleId].date.week}
                >{week}</option
              >
            {:else}
              <option value={week}>{week}</option>
            {/if}
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
            value=""
          />
        </aeon-datepicker>
      </span>
    </div>
  </div>
</div>

<style>
  .cc-module-config-detail {
    padding: 0.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 1em;
    grid-auto-flow: row;
    grid-template-areas: ". .";
    height: 100%;
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
  }

  sl-tooltip {
    text-align: left;
    white-space: normal;
  }
</style>
