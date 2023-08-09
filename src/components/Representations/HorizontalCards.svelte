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
   * The simplest component, will not display any representation.
   * Intended for use when you just want to see
   * - the navigation bar between collections
   * - the list of Canvas module elements belonging to the collection
   */

  import {
    getRepresentationModules,
    getModuleUrl,
    deLabelModuleName,
  } from "./representationSupport";
  import { collectionsStore, configStore } from "../../stores";
  import BannerIframe from "./GriffithCards/BannerIframe.svelte";
  import BannerColour from "./GriffithCards/BannerColour.svelte";
  import BannerImage from "./GriffithCards/BannerImage.svelte";
  import DateWidget from "./GriffithCards/DateWidget.svelte";

  export let collection: string;
  //  export let calendar: any;
  export let claytons: boolean;

  const BANNER_TRANSLATION = {
    image: BannerImage,
    colour: BannerColour,
    iframe: BannerIframe,
  };

  const modules = getRepresentationModules(
    collection,
    claytons,
    $collectionsStore["COLLECTIONS"][collection]["unallocated"]
  );

  console.log(modules[0]);
  console.log($collectionsStore);
</script>

{#if $configStore["editMode"] && modules.length === 0}
  <div class="cc-no-modules">
    <p>No modules have been added to this collection.</p>
  </div>
{/if}

<h2>HorizontalCards hello</h2>

{#each modules as theModule}
  <div
    class="horizontal-card-row"
    style="width:90%;border:1px solid #ccc; box-shadow: rgba(0, 0, 0, 0.35) 0px 0.4rem 1rem;border-radius:1rem;padding:1rem;margin:1rem;overflow:hidden;"
  >
    <div class="horizontal-card-date" style="float:left; padding-right:1rem;">
      <DateWidget
      date={$collectionsStore["MODULES"][theModule.id]["date"]}
      dateShow={$collectionsStore["MODULES"][theModule.id]["dateShow"]}
      flow="normal"
    />
<!--      <div
        class="cc-card-date-normal svelte-1n5uhlh"
        style="border-radius: 0.25rem;overflow:hidden;width:5rem;display:block;background-color:#f5f5f5;"
      >
        <div
          class="cc-card-date-dual-day svelte-1n5uhlh"
          style="color:white;background-color:black;font-size:0.75rem;padding-top:0.25rem;padding-bottom:0.25rem;border-color:black;border-left-width:1px;border-right-width:1px;border-top-width:1px"
        >
          <div class="cc-card-date-day-from svelte-1n5uhlh">Mon</div>
          <div class="cc-card-date-day-to svelte-1n5uhlh">Fri</div>
        </div>
        <div class="cc-card-date-dual-month svelte-1n5uhlh">
          <div class="cc-card-date-month-from svelte-1n5uhlh">Jul</div>
          <div class="cc-card-date-month-to svelte-1n5uhlh">Jul</div>
        </div>
        <div class="cc-card-date-dual-date svelte-1n5uhlh">
          <div class="cc-card-date-date-from svelte-1n5uhlh">10</div>
          <div class="cc-card-date-date-to svelte-1n5uhlh">28</div>
        </div>
      </div> -->
    </div>
    <div
      class="horizontal-card-image"
      style="float:right; padding-left:1rem; text-align: right; width:30%;"
    >
      <svelte:component
        this={BANNER_TRANSLATION[
          $collectionsStore["MODULES"][theModule.id].banner
        ]}
        moduleId={theModule.id}
        {claytons}
      />

      <!--      <img
        role="presentation"
        src="https://www.memecreator.org/static/images/memes/4983581.jpg"
        data-moduleid="$1"
        alt="'🤔 Reason 1: Improve Canvas\' organisation of course content'"
        style="width:100%"
      /> -->
    </div>
    <div class="content">
      <div class="cc-card-label svelte-1bswwix width:100%">
        <span class="cc-card-label svelte-1bswwix"
          >{$collectionsStore["MODULES"][theModule.id].label}
          {$collectionsStore["MODULES"][theModule.id].actualNum}</span
        >
        <h3 class="cc-card-title svelte-1bswwix" data-moduleid="1">
          <a href="http://canvas.docker/courses/1/modules#module_1"
            >{deLabelModuleName($collectionsStore["MODULES"][theModule.id])}</a
          >
        </h3>
      </div>

      <div class="horizontal-card-description">
        {@html $collectionsStore["MODULES"][theModule.id].description}

        <!-- style="margin-top:2rem; margin-right: 2rem; 
              float: right; color: rgb(30, 58, 138); border-radius: 0.25rem; 
              padding: 0.5rem 1rem; border: 1px solid rgb(30, 58, 138);" -->

        {#if $collectionsStore["MODULES"][theModule.id].engage && !$collectionsStore["MODULES"][theModule.id].fyi}
          <div class="claytons-card-engage" style="padding-right: 1rem;">
            <div
              class="claytons-card-engage-button"
              style="float:right; position:relative; color:rgba(30,58,138,1); border-radius:0.25rem; padding: 0.5rem 1rem 0.5rem 1rem; border:1px solid rgba(30,58,138,1);"
            >
              <a
                href={getModuleUrl(theModule.id)}
                class="claytons-gu-engage"
                style="text-decoration:none;"
              >
                {$collectionsStore["MODULES"][theModule.id].engageText}
              </a>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/each}

<style>
</style>
