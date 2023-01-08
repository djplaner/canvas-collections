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
    aboutModuleDates: {
      tooltip: "<strong><em>content here</em></strong> ",
      href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#dates",
    },
    aboutStudyPeriod: {
      tooltip: "<strong><em>content here</em></strong> ",
      href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#study-period",
    },
  };
</script>

<div style="margin-right:1em">
  <sl-tooltip>
    <div slot="content">{HELP.aboutModuleDates.tooltip}</div>
    <a target="_blank" rel="noreferrer" href={HELP.aboutModuleDates.href}
      ><i class="icon-question cc-module-icon" /></a
    >
  </sl-tooltip>
  <strong>Dates</strong>
  <div class="cc-current-studyPeriod">
    <sl-tooltip class="cc-about-module-studyPeriod">
      <div slot="content">{HELP.aboutStudyPeriod.tooltip}</div>
      <a target="_blank" rel="noreferrer" href={HELP.aboutStudyPeriod.href}
        ><i class="icon-question cc-module-icon" /></a
      >
    </sl-tooltip>
    <strong>Study Period</strong>
    {currentStudyPeriod}
  </div>
</div>
<sl-split-panel>
  <div slot="start" id="cc-module-config-{moduleId}-date-start">
    <sl-tooltip id="cc-about-module-date-start">
      <div slot="content" />
      <a target="_blank" rel="noreferrer" href=""
        ><i class="icon-question cc-module-icon" /></a
      >
    </sl-tooltip>
    About start date
    <div>
      <div class="cc-calculated-date">
        <sl-tooltip id="cc-about-module-date-calculated">
          <div slot="content" />
          <i class="icon-question cc-module-icon" />
        </sl-tooltip>
        {calculatedDate}
      </div>
      <div
        class="cc-module-config-collection-representation"
        style="padding-top:1rem; padding-left:3rem"
      >
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
                selected={day ===
                  $collectionsStore["MODULES"][moduleId].date.day}>{day}</option
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
                  $collectionsStore["MODULES"][moduleId].date.week}
                >{week}</option
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
      <br clear="all" />
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
    <div>
      <div class="cc-calculated-date">
        <sl-tooltip id="cc-about-module-date-calculated">
          <div slot="content" />
          <i class="icon-question cc-module-icon" />
        </sl-tooltip>
        {calculatedDate}
      </div>

      <div
        class="cc-module-config-collection-representation"
        style="padding-top:1rem; padding-left:3rem"
      >
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
</style>
