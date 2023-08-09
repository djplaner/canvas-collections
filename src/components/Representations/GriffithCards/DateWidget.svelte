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
   * Implement component for cards date component by
   * - display either a single or dual date
   * 
   * Date is passed as a date object in the following format can specify a
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
   * Also passed a dateShow object that specifies which of the 
   * date components to show
   * {
   *   calendarDate: false, 
   *   day: false, 
   *   time: false,
   *   week: false,
   *   toCalendarDate: false,  # deprecated???
   *   toDay: false,
   *   toTime: false,
   *   toWeek: false,
   *   label: false
   * }
   * 
   * TODO
   * - Implement university calendar support
   */

  import { isNotEmptyDate } from "../representationSupport";

  export let date: Object;
  export let dateShow: Object;
  export let flow = "";
  export let claytons: boolean = false;

  let cardStyle = "cc-card-date";
  if ( flow!=="") {
    cardStyle = "cc-card-date-normal";
  }

</script>

{#if date}
  {#if ! claytons}
  {#if date["to"] && isNotEmptyDate(date["to"]) }
    <div class={cardStyle}>
      {#if isNotEmptyDate(date) && date["label"] && dateShow["label"]}
        <div class="cc-card-date-label">
          {date["label"]}
        </div>
      {/if}
      {#if (dateShow["time"] && date["time"]) || (dateShow["toTime"] && date["to"]["time"]) } 
        <div class="cc-card-date-dual-time">
          <div class="cc-card-date-time-from">
            {#if date["time"] && dateShow["time"]}
              {date["time"]}
            {/if}
          </div>
          <div class="cc-card-date-time-to">
            {#if date["to"]["time"] && dateShow["toTime"]}
              {date["to"]["time"]}
            {/if}
          </div>
        </div>
      {/if}
      {#if (dateShow["day"] && (date["day"]) || (dateShow["toDay"] && date["to"]["day"]))}
        <div class="cc-card-date-dual-day">
          <div class="cc-card-date-day-from">
            {#if date["day"] && dateShow["day"]}
              {date["day"].substring(0, 3)}
            {/if}
          </div>
          <div class="cc-card-date-day-to">
            {#if date["to"]["day"] && dateShow["toDay"]}
              {date["to"]["day"].substring(0, 3)}
            {/if}
          </div>
        </div>
      {/if}
      {#if (dateShow["month"] && date["month"]) || (dateShow["toMonth"] && date["to"]["month"])}
        <div class="cc-card-date-dual-month">
          <div class="cc-card-date-month-from">
            {#if date["month"] && dateShow["month"]}
              {date["month"]}
            {/if}
          </div>
          <div class="cc-card-date-month-to">
            {#if date["to"]["month"] && dateShow["toMonth"]}
              {date["to"]["month"]}
            {/if}
          </div>
        </div>
      {/if}
      {#if (dateShow["date"] && date["date"]) || (dateShow["toDate"] && date["to"]["date"])}
        <div class="cc-card-date-dual-date">
          <div class="cc-card-date-date-from">
            {#if date["date"] && dateShow["date"]}
              {date["date"]}
            {/if}
          </div>
          <div class="cc-card-date-date-to">
            {#if date["to"]["date"] && dateShow["toDate"]}
              {date["to"]["date"]}
            {/if}
          </div>
        </div>
      {/if}
    </div>
  {:else}
    <div class={cardStyle}>
      {#if isNotEmptyDate(date) && date["label"] && dateShow["label"]}
        <div class="cc-card-date-label">
          {date["label"]}
        </div>
      {/if}
      {#if dateShow["time"] && date["time"]}
        <div class="cc-card-date-time">
          {date["time"]}
        </div>
      {/if}
      {#if dateShow["day"] && date["day"]}
        <div class="cc-card-date-day">
          {date["day"]}
        </div>
      {/if}
      {#if dateShow["month"] && date["month"]}
        <div class="cc-card-date-month">
          {date["month"]}
        </div>
      {/if}
      {#if dateShow["date"] && date["date"]}
        <div class="cc-card-date-date">
          {date["date"]}
        </div>
      {/if}
    </div>
  {/if}
  {:else}
  <!-- ********************* START CLAYTONS -->

  {#if date["to"] && isNotEmptyDate(date["to"]) }
  <div class={cardStyle} style="background: #f5f5f5;border-radius:0.25rem">
    {#if isNotEmptyDate(date) && date["label"] && dateShow["label"]}
      <div class="cc-card-date-label" style="border-top-right-radius: 0.25rem; padding: 0.25rem; color: white; font-size: 0.75rem; padding-top: 0.25rem; padding-bottom: 0.25rem; background-color: black; border-color: black; border-left-width: 1px; border-right-width: 1px; border-top-width: 1px; text-align:center;">
        {date["label"]}
      </div>
    {/if}
    {#if (dateShow["time"] && date["time"]) || (dateShow["toTime"] && date["to"]["time"]) } 
      <div class="cc-card-date-dual-time" style="display:flex; font-size: 0.7rem;">
        <div class="cc-card-date-time-from" style="width: 50%; text-align:center; padding: 0.15rem;">
          {#if date["time"] && dateShow["time"]}
            {date["time"]}
          {/if}
        </div>
        <div class="cc-card-date-time-to" style="width: 50%; text-align:center; padding: 0.15rem;">
          {#if date["to"]["time"] && dateShow["toTime"]}
            {date["to"]["time"]}
          {/if}
        </div>
      </div>
    {/if}
    {#if (dateShow["day"] && (date["day"]) || (dateShow["toDay"] && date["to"]["day"]))}
      <div class="cc-card-date-dual-day" style="display: flex; font-size: 0.7rem;">
        <div class="cc-card-date-day-from" style="width: 50%; text-align:center; padding:0.15rem;">
          {#if date["day"] && dateShow["day"]}
            {date["day"].substring(0, 3)}
          {/if}
        </div>
        <div class="cc-card-date-day-to" style="width: 50%; text-align:center; padding:0.15rem;">
          {#if date["to"]["day"] && dateShow["toDay"]}
            {date["to"]["day"].substring(0, 3)}
          {/if}
        </div>
      </div>
    {/if}
    {#if (dateShow["month"] && date["month"]) || (dateShow["toMonth"] && date["to"]["month"])}
      <div class="cc-card-date-dual-month" style="text-align: center; align-items: stretch; display: flex; color: white; background-color: red; padding-top: 0.25rem; padding-bottom: 0.25rem; border-color: black; border-top-width: 1px;">
        <div class="cc-card-date-month-from" style="width:50%; padding:0.15rem;">
          {#if date["month"] && dateShow["month"]}
            {date["month"]}
          {/if}
        </div>
        <div class="cc-card-date-month-to" style="width:50%; padding:0.15rem;">
          {#if date["to"]["month"] && dateShow["toMonth"]}
            {date["to"]["month"]}
          {/if}
        </div>
      </div>
    {/if}
    {#if (dateShow["date"] && date["date"]) || (dateShow["toDate"] && date["to"]["date"])}
      <div class="cc-card-date-dual-date" style="text-align: center; padding-top: 0.25rem; align-items: stretch; display: flex; border-left-width: 1px; border-right-width: 1px; border-bottom-right-radius: 0.25rem; border-bottom-left-radius: 0.25rem; border-color: black;">
        <div class="cc-card-date-date-from" style="width:50%;">
          {#if date["date"] && dateShow["date"]}
            {date["date"]}
          {/if}
        </div>
        <div class="cc-card-date-date-to" style="width:50%;">
          {#if date["to"]["date"] && dateShow["toDate"]}
            {date["to"]["date"]}
          {/if}
        </div>
      </div>
    {/if}
  </div>
{:else}
  <div class={cardStyle} style="background: #f5f5f5; border-radius: 0.25rem;">
    {#if isNotEmptyDate(date) && date["label"] && dateShow["label"]}
      <div class="cc-card-date-label" style="border-top-left-radius: 0.25rem; border-top-right-radius: 0.25rem; padding: 0.25rem; color: white; font-size: 0.75rem; padding-top: 0.25rem; padding-bottom: 0.25rem; background-color: black; border-color: black; border-left-width: 1px; border-right-width: 1px; border-top-width: 1px; text-align:center;">
        {date["label"]}
      </div>
    {/if}
    {#if dateShow["time"] && date["time"]}
      <div class="cc-card-date-time" style="text-align:center">
        {date["time"]}
      </div>
    {/if}
    {#if dateShow["day"] && date["day"]}
      <div class="cc-card-date-day" style="font-size: 0.7rem;text-align:center;">
        {date["day"]}
      </div>
    {/if}
    {#if dateShow["month"] && date["month"]}
      <div class="cc-card-date-month"  style="color: white; background-color: red; padding-top: 0.25rem; padding-bottom: 0.25rem; border-color: black; border-top-width: 1px; font-size: 0.9rem; line-height: 1rem; text-align:center;">
        {date["month"]}
      </div>
    {/if}
    {#if dateShow["date"] && date["date"]}
      <div class="cc-card-date-date"  style="padding-top: 0.25rem; padding-bottom: 0.25rem; border-left-width: 1px; border-bottom-right-radius: 0.25rem; border-bottom-left-radius: 0.25rem; border-color: black; font-size: 0.9rem; font-weight: bold; line-height: 1rem; text-align: center;">
        {date["date"]}
      </div>
    {/if}
  </div>
  {/if}
  {/if}
{/if}

<style>
  .cc-card-date-normal {
    text-align: center;
    background-color: #f5f5f5;
    border-radius: 0.25rem;
    overflow: hidden;
    width: 5rem;
    display: block;
  }

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
