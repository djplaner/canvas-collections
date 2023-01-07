<script lang="ts">
  /**
   * Implement component for cards date component
   */

  import UniversityDateCalendar from "../../../lib/university-date-calendar";

  export let date: Object;
  export let calendar: UniversityDateCalendar;

  console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
  console.log(date);
  console.log(calendar);

  let extraDateLabelClass = "";

  if (date) {
    if (date["week"] || (date["month"] && date["date"])) {
      date = addCalendarDate(date);
    }
  }
  console.log("------ after")
  console.log(date);

  function addCalendarDate(date): Object {
    // if no date, then assume the start of the calendar week (Monday)
    if (!date.hasOwnProperty("day") || date["day"] === "") {
      date["day"] = "Monday";
    }
    if (date.hasOwnProperty("week") && date["week"]!=="") {
		// we've got a week, so we can add the calendar date
		const actualDate = calendar.getDate(date["week"], false, date["day"]);
		const fields = ['date', 'month', 'year']
		for (let i=0; i<fields.length; i++) {
			if ( actualDate.hasOwnProperty(fields[i]) ) {
				date[fields[i]] = actualDate[fields[i]];
			}
		}
    }


	// todo update the date for the "to" portion

    return date;
  }

  /** todo
	 *   and dual date is a whole other thing

			let element = new DOMParser().parseFromString(singleDateHtml, 'text/html').body.firstChild;
		if (time === "") {
			// remove the div.cc-card-date-time from element
			element.removeChild(element.querySelector('.cc-card-date-time'));
		}
		if (date.week === "") {
			// remove the div.cc-card-date-week from element
			element.removeChild(element.querySelector('.cc-card-date-week'));
		}
		if (day === "") {
			// remove the div.cc-card-date-day from element
			element.removeChild(element.querySelector('.cc-card-date-day'));
		}
	*/
</script>

{#if date}
  <div class="cc-card-date">
    {#if date["label"]}
      <div class="cc-card-date-label${extraDateLabelClass}">
        {date["label"]}
      </div>
    {/if}
    {#if date["week"]}
      <div class="cc-card-date-week">
        Week {date["week"]}
      </div>
    {/if}
    {#if date["time"]}
      <div class="cc-card-date-time">
        {date["time"]}
      </div>
    {/if}
    {#if date["day"]}
      <div class="cc-card-date-day">
        {date["day"]}
      </div>
    {/if}
    {#if date["month"]}
      <div class="cc-card-date-month">
        {date["month"]}
      </div>
    {/if}
    {#if date["date"]}
      <div class="cc-card-date-date">
        {date["date"]}
      </div>
    {/if}
  </div>
{/if}

<style>
  .cc-card-date {
    text-align: center;
    background-color: #f5f5f5;
    border-radius: 0.25rem;
    overflow: hidden;
    width: 5rem;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
  }

  .cc-card-date-label {
    color: white;
    font-size: 0.75rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    background-color: black;
    border-color: black;
    border-left-width: 1px;
    border-right-width: 1px;
    border-top-width: 1px;
  }

  .cc-card-date-week {
    color: black;
    background-color: #fff9c2;
    font-size: 0.75rem;
    padding-top: 0.15rem;
  }

  .cc-card-date-time {
    font-size: 0.75rem;
    color: black;
    background-color: #fff382;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  .cc-card-date-dual-time {
    display: flex;
    font-size: 0.7rem;
    color: black;
    background-color: #fff382;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  .cc-card-date-month {
    color: white;
    background-color: red;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    border-color: black;
    border-top-width: 1px;
    font-size: 0.9rem;
    line-height: 1rem;
  }

  .cc-card-date-dual-month {
    text-align: center;
    align-items: stretch;
    display: flex;
    color: white;
    background-color: red;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    border-color: black;
    border-top-width: 1px;
  }

  .cc-card-date-month-from {
    width: 50%;
  }
  .cc-card-date-month-to {
    width: 50%;
  }

  .cc-card-date-date {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    border-left-width: 1px;
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    border-color: black;
    font-size: 0.9rem;
    font-weight: bold;
    line-height: 1rem;
  }

  .cc-card-date-dual-date {
    text-align: center;
    padding-top: 0.25rem;
    align-items: stretch;
    display: flex;
    border-left-width: 1px;
    border-right-width: 1px;
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    border-color: black;
  }

  .cc-card-date-date-from {
    width: 50%;
  }

  .cc-card-date-date-to {
    width: 50%;
  }

  .cc-card-date-time-from {
    width: 50%;
  }
  .cc-card-date-time-to {
    width: 50%;
  }

  .cc-card-date-day {
    font-size: 0.7rem;
  }

  .cc-card-date-day-from {
    width: 50%;
  }
  .cc-card-date-day-to {
    width: 50%;
  }

  .cc-card-date-dual-day {
    display: flex;
    font-size: 0.7rem;
  }
</style>
