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
   * Implement a representation show a vertical list of cards taking up the
   * entire horizontal space. An emphasis on working with Claytons without
   * requiring any external CSS
   *
   * Currently the cards have three broad "columns"
   * - date
   * - label/name/description
   * - banner
   */

  import {
    getRepresentationModules,
    getModuleUrl,
    deLabelModuleName,
    isUnPublishedUnallocated,
  } from "./representationSupport";
  import { collectionsStore, configStore } from "../../stores";
  import BannerIframe from "./GriffithCards/BannerIframe.svelte";
  import BannerColour from "./GriffithCards/BannerColour.svelte";
  import BannerImage from "./GriffithCards/BannerImage.svelte";
  import DateWidget from "./GriffithCards/DateWidget.svelte";

  export let collection: string;
  //  export let calendar: any;
  export let claytons: boolean = false;

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
</script>

{#if $configStore["editMode"] && modules.length === 0}
  <div class="cc-no-modules">
    <p>No modules have been added to this collection.</p>
  </div>
{/if}

{#each modules as theModule}
  {#if !claytons}
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
      </div>
      <div class="content">
        <div class="cc-card-label svelte-1bswwix width:100%">
          <span class="cc-card-label svelte-1bswwix"
            >{$collectionsStore["MODULES"][theModule.id].label}
            {$collectionsStore["MODULES"][theModule.id].actualNum}</span
          >
          <h3 class="cc-card-title svelte-1bswwix" data-moduleid="1">
            {#if !$collectionsStore["MODULES"][theModule.id].fyi}
              <a href={getModuleUrl(theModule.id)}
                >{deLabelModuleName(
                  $collectionsStore["MODULES"][theModule.id]
                )}</a
              >
            {:else}
              {deLabelModuleName($collectionsStore["MODULES"][theModule.id])}
            {/if}
          </h3>
        </div>

        <div class="horizontal-card-description">
          {#if $collectionsStore["MODULES"][theModule.id].fyi}
            {#if $collectionsStore["MODULES"][theModule.id].fyiText !== "" || $configStore["editMode"]}
              <div class="cc-card-fyi">
                <span class="cc-fyi-text">
                  {#if $collectionsStore["MODULES"][theModule.id].fyiText}
                    {@html $collectionsStore["MODULES"][theModule.id].fyiText}
                  {:else}
                    (<em>FYI card, no FYI text</em>
                    <!--     <sl-tooltip hoist>
                    <div slot="content">
                      {@html HELP.noFyiText.tooltip}
                    </div>
                    <a
                      style="text-decoration: none;"
                      href={HELP.noFyiText.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      ❔</a
                    >
                  </sl-tooltip> -->
                    )
                  {/if}
                </span>
              </div>
            {/if}
          {/if}
          {#if isUnPublishedUnallocated(theModule.id, collection)}
            <div class="cc-card-published">
              {#if !$collectionsStore["MODULES"][theModule.id].published}
                Unpublished.
              {/if}
              {#if $configStore["editMode"] && $collectionsStore["MODULES"][theModule.id].collection !== collection}
                No collection allocated.
              {/if}
            </div>
          {/if}

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

    <!-- ******** End of live representation -->
  {:else}
    <!-- ******** Start of claytons representation -->
    <div
      class="horizontal-card-row"
      style="width:90%;border:1px solid #ccc; box-shadow: rgba(0, 0, 0, 0.35) 0px 0.4rem 1rem;border-radius:1rem;padding:1rem;margin:1rem;overflow:hidden;"
    >
      <div class="horizontal-card-date" style="float:left; padding-right:1rem; display:block;">
        <DateWidget
          date={$collectionsStore["MODULES"][theModule.id]["date"]}
          dateShow={$collectionsStore["MODULES"][theModule.id]["dateShow"]}
          flow="normal" claytons={claytons}
        />
      </div>
      <div
        class="horizontal-card-image"
        style="float:right; padding-left:1rem; text-align: right; width:30%; height: 15rem; max-height: 15rem; overflow: scroll;"
      >
        <svelte:component
          this={BANNER_TRANSLATION[
            $collectionsStore["MODULES"][theModule.id].banner
          ]}
          moduleId={theModule.id}
          {claytons}
        />
      </div>
      <div class="content">
        <div class="cc-card-label svelte-1bswwix width:100%">
          <span class="cc-card-label svelte-1bswwix"
            >{$collectionsStore["MODULES"][theModule.id].label}
            {$collectionsStore["MODULES"][theModule.id].actualNum}</span
          >
          <h3 class="cc-card-title svelte-1bswwix" data-moduleid="1">
            {#if !$collectionsStore["MODULES"][theModule.id].fyi}
              <a href={getModuleUrl(theModule.id)}
                >{deLabelModuleName(
                  $collectionsStore["MODULES"][theModule.id]
                )}</a
              >
            {:else}
              {deLabelModuleName($collectionsStore["MODULES"][theModule.id])}
            {/if}
          </h3>
        </div>

        <div class="horizontal-card-description" style="overflow:hidden">
          {#if $collectionsStore["MODULES"][theModule.id].fyi}
            {#if $collectionsStore["MODULES"][theModule.id].fyiText !== "" || $configStore["editMode"]}
              <div
                class="cc-card-fyi svelte-17wa3z1"
                style="background: #ccc; color: black; width: 100%; padding: 0.25rem; font-size: 0.85rem; text-align: center;"
              >
                <span class="cc-fyi-text">
                  {#if $collectionsStore["MODULES"][theModule.id].fyiText}
                    {@html $collectionsStore["MODULES"][theModule.id].fyiText}
                  {:else}
                    (<em>FYI card, no FYI text</em>)
                  {/if}
                </span>
              </div>
            {/if}
          {/if}

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
  {/if}
{/each}

<style>
  .cc-card-fyi {
    background: #ccc;
    color: black;
    width: 100%;
    padding: 0.25rem;
    font-size: 0.85rem;
    text-align: center;
  }

  .cc-card-published {
    background: rgba(255, 0, 0, 0.75);
    color: white;
    font-size: x-small;
    font-weight: bold;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    text-align: center;
    width: 100%;
  }

  .horizontal-card-description {
    overflow: hidden;
  }
</style>
