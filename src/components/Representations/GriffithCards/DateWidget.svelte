<!--
 Copyright (C) 2023 David Jones
 
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
   * Implement component for cards date component by
   * - modifying the date to add a specific calendar date
   *   using UniversityDateCalendar
   * - display either a single or dual date
   * 
   * Passed a date object in the following format can specify a
   * single date or a data period (from/to)
   * {
   *    // "from" date (if dual)
   *   "label": "", "day": "Monday", "week": "3", "time": "",
   *   "to": {
   *    	"day": "", "week": "", "time": ""
   *	},
   *	"date": 20,
   *	"month": "Mar",
   *	"year": 2023
   * }
   */

import UniversityDateCalendar from "../../../lib/university-date-calendar";
import { configStore } from "../../../stores";
import { addCalendarDate, isNotEmptyDate } from "../representationSupport";

  export let date: Object;
  export let dateHide: Object;
  //export let calendar: any;

  let calendar = new UniversityDateCalendar($configStore["studyPeriod"]);

  if (date) {
    if (date["week"] || (date["month"] && date["date"])) {
      date = addCalendarDate(date, calendar );
    }
  }

</script>

{#if date}
  {#if date["to"] && isNotEmptyDate(date["to"])}
    <div class="cc-card-date">
      {#if isNotEmptyDate(date) && date["label"]} 
        <div class="cc-card-date-label">
          {date["label"]}
        </div>
      {/if}
      {#if !dateHide["week"] && date["week"] && date["week"]!=="" || date["to"]["week"]}
        <div class="cc-card-date-week">
          {#if date["week"] && date["to"]["week"] && date["week"] !== date["to"]["week"]}
            Weeks
          {:else}
            Week
          {/if}
          {date["week"]}
          {#if date["week"] && date["to"]["week"] && date["week"] !== date["to"]["week"]}
            - {date["to"]["week"]}
          {/if}
        </div>
      {/if}
      {#if !dateHide["time"] && date["time"] || date["to"]["time"]}
        <div class="cc-card-date-dual-time">
          <div class="cc-card-date-time-from">
            {#if date["time"]}
              {date["time"]}
            {/if}
          </div>
          <div class="cc-card-date-time-to">
            {#if date["to"]["time"]}
              {date["to"]["time"]}
            {/if}
          </div>
        </div>
      {/if}
      {#if !dateHide["day"] && (date["day"] || date["to"]["day"])}
        <div class="cc-card-date-dual-day">
          <div class="cc-card-date-day-from">
            {#if date["day"]}
              {date["day"].substring(0, 3)}
            {/if}
          </div>
          <div class="cc-card-date-day-to">
            {#if date["to"]["day"]}
              {date["to"]["day"].substring(0, 3)}
            {/if}
          </div>
        </div>
      {/if}
      {#if date["month"] || date["to"]["month"]}
        <div class="cc-card-date-dual-month">
          <div class="cc-card-date-month-from">
            {#if date["month"]}
              {date["month"]}
            {/if}
          </div>
          <div class="cc-card-date-month-to">
            {#if date["to"]["month"]}
              {date["to"]["month"]}
            {/if}
          </div>
        </div>
      {/if}
      {#if date["date"] || date["to"]["date"]}
        <div class="cc-card-date-dual-date">
          <div class="cc-card-date-date-from">
            {#if date["date"]}
              {date["date"]}
            {/if}
          </div>
          <div class="cc-card-date-date-to">
            {#if date["to"]["date"]}
              {date["to"]["date"]}
            {/if}
          </div>
        </div>
      {/if}
    </div>
  {:else}
    <div class="cc-card-date">
      {#if isNotEmptyDate(date) && date["label"]}
        <div class="cc-card-date-label">
          {date["label"]}
        </div>
      {/if}
      {#if !dateHide["week"] && date["week"] && !dateHide["week"]}
        <div class="cc-card-date-week">
          Week {date["week"]}
        </div>
      {/if}
      {#if !dateHide["time"] && date["time"]}
        <div class="cc-card-date-time">
          {date["time"]}
        </div>
      {/if}
      {#if !dateHide["day"] && date["day"]}
        <div class="cc-card-date-day">
          {date["day"]}
        </div>
      {/if}
      {#if !dateHide["calendarDate"] && date["month"]}
        <div class="cc-card-date-month">
          {date["month"]}
        </div>
      {/if}
      {#if !dateHide["calendarDate"] && date["date"]}
        <div class="cc-card-date-date">
          {date["date"]}
        </div>
      {/if}
    </div>
  {/if}
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
