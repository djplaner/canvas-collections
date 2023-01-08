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
      url: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#start-date",
    },
    calculatedDate: {
      tooltip: `Representation of the date as configured by <em>Start Date</em> and possible <em>Stop Date</em>.`,
      url: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#start-date",
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

<sl-split-panel>
  <div slot="start" id="cc-module-config-{moduleId}-date-start">
    Start date
    <sl-tooltip id="cc-about-module-date-start">
      <div slot="content">{@html HELP.dateStart.tooltip}</div>
      <a target="_blank" rel="noreferrer" href={HELP.dateStart.href}
        ><i class="icon-question cc-module-icon" /></a
      >
    </sl-tooltip>
    <div class="cc-module-config-collection-representation">
      <label for="cc-module-config-{moduleId}-date-label">Date label</label>
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
      <br />
      <label for="cc-module-config-{moduleId}-day">Day of week</label>
      <select id="cc-module-config-{moduleId}-day">
        <option value="">Not chosen</option>
        {#each daysOfWeek as day}
          {#if $collectionsStore["MODULES"][moduleId].hasOwnProperty("date") && $collectionsStore["MODULES"][moduleId].date.hasOwnProperty("day")}
            <option
              value={day}
              selected={day === $collectionsStore["MODULES"][moduleId].date.day}
              >{day}</option
            >
          {:else}
            <option value={day}>{day}</option>
          {/if}
        {/each}
      </select> <br />
      <label for="cc-module-config-{moduleId}-week">Week</label>
      <select id="cc-module-config-{moduleId}-week">
        <option value="">Not chosen</option>
        {#each weeksOfTerm as week}
          {#if $collectionsStore["MODULES"][moduleId].hasOwnProperty("date") && $collectionsStore["MODULES"][moduleId].date.hasOwnProperty("week")}
            <option
              value={week}
              selected={week ===
                $collectionsStore["MODULES"][moduleId].date.week}>{week}</option
            >
          {:else}
            <option value={week}>{week}</option>
          {/if}
          >
        {/each}
      </select> <br />
      <label for="cc-module-config-{moduleId}-time">Time</label>
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
    </div>
  </div>
  <div slot="end" id="cc-module-config-{moduleId}-date-stop">
    <sl-tooltip id="cc-about-module-date-stop">
      <div slot="content" />
      <a target="_blank" rel="noreferrer" href=""
        ><i class="icon-question cc-module-icon" /></a
      >
    </sl-tooltip>
    About stop date
	<div style="padding-left: 0.5em">
      <div class="cc-module-config-collection-representation">
        <label for="cc-module-config-{moduleId}-day-to">Day of week</label>
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
        </select> <br />
        <label for="cc-module-config-{moduleId}-week-to">Week</label>
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
        </select> <br />
        <label for="cc-module-config-{moduleId}-time-to">Time</label>
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
      </div>
      <br clear="all" />
    </div>
  </div>
</sl-split-panel>

<style>
  .cc-module-config-description {
    padding: 0.5rem;
  }

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
</style>
