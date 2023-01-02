<script lang="ts">
  /**
   * Implement original GriffithCards component
   *
   */

  import { collectionsStore, modulesStore, configStore } from "../../stores";
  import BannerIframe from "./GriffithCards/BannerIframe.svelte";
  import BannerColour from "./GriffithCards/BannerColour.svelte";
  import BannerImage from "./GriffithCards/BannerImage.svelte";

  import {
    getCollectionModuleIds,
    modifyCanvasModulesList,
    generateModuleDate,
    checkModuleMetaData,
  } from "./representationSupport";
  import { debug } from "../../lib/debug";

  export let collection: string;

  const BANNER_TRANSLATION = {
    image: BannerImage,
    colour: BannerColour,
    iframe: BannerIframe,
  };

  debug(
    "_______________ Cards.svelte __collection " + collection + " _____________"
  );
  debug($modulesStore);

  // calculate the moduleIds belonging to collection
  let moduleIds;
  $: {
    moduleIds = getCollectionModuleIds(
      collection,
      $collectionsStore["MODULES"]
    );
    //modifyCanvasModulesList(moduleIds, $collectionsStore["MODULES"],$configStore['editMode'])
  }

  /**
   * @function cardClick
   * @param event
   * @description Handle click within a div.cc-clickable-card by
   * - find the parent div.cc-clickable-card
   *   If there isn't one, do nothing
   * - finding the a.cc-card-link within the div
   * - clicking it
   */
  function cardClick(event) {
    // can we find the parent div.cc-clickable-card
    let card = event.target.closest("div.cc-clickable-card");
    if (card) {
      // find the a.cc-card-link within card and click it
      let link = card.querySelector("a.cc-card-link");
      if (link) {
        link.click();
      }
    }
  }

  /**
   * @function deLabelModuleName
   * @param moduleId
   * @return string Module name without label and number
   * @description Remove the label and number from the name
   */
  function deLabelModuleName(moduleId) {
    const module = $collectionsStore["MODULES"][moduleId];
    const existingName = module.name;

    let prepend = "";
    if (module.label) {
      prepend = module.label;
    }

    let regex = new RegExp(`^${prepend}\\s*[:-]\\s*`);

    if (module.actualNum) {
      regex = new RegExp(`^${prepend}\\s*${module.actualNum}\\s*[:-]\\s*`);
      prepend += ` ${module.actualNum}`;
      // remove first char from CARD_LABEL if it is a space
      if (prepend.charAt(0) === " ") {
        prepend = prepend.substring(1);
      }
    }
    prepend = `${prepend}: `;
    let newName = existingName;
    if (prepend !== ": ") {
      // if we've not empty label and number
      // modify existingName to remove prepend and any subsequent whitespace
      //	newName = existingName.replace(prepend, '').trim();
      newName = existingName.replace(regex, "").trim();
    }

    return newName;
  }
</script>

<h3>This is the cards representation - collection {collection}</h3>

<div class="cc-card-interface cc-representation">
  {#each moduleIds as moduleId}
    {#if !(!$collectionsStore["MODULES"][moduleId].published && !$configStore["editMode"])}
      <div
        id="cc_module_{moduleId}"
        class={$collectionsStore["MODULES"][moduleId].fyi
          ? "cc-unclickable-card"
          : "cc-clickable-card"}
        on:click|once={cardClick}
        on:keydown|once={cardClick}
      >
        <div id="cc_module_{moduleId}" class="cc-card">
          <div class="cc-card-flex">
            <div class="cc-card-banner-container" data-moduleid={moduleId}>
              <a
                class="cc-card-link"
                href="/courses/{$configStore[
                  'courseId'
                ]}/modules#module_{moduleId}"
                style="">&nbsp;</a
              >
              <svelte:component
                this={BANNER_TRANSLATION[
                  $collectionsStore["MODULES"][moduleId].banner
                ]}
                {moduleId}
              />
              <!--               $**DATE_WIDGET** -->
              {#if $collectionsStore["MODULES"][moduleId].fyi}
                <div class="cc-card-fyi">
                  <span class="cc-fyi-text"
                    >{$collectionsStore["MODULES"][moduleId].fyiText}</span
                  >
                </div>
              {/if}
              {#if !$collectionsStore["MODULES"][moduleId].published}
                <div class="cc-card-published">Unpublished</div>
              {/if}
            </div>
            <div class="cc-card-content-height">
              $**CONTENT_CARD_LINK**
              <div class="$**cardContentClass**">
                <div class="cc-card-label">
                  <span class="cc-card-label">
                    {$collectionsStore["MODULES"][moduleId].label}
                    {$collectionsStore["MODULES"][moduleId].actualNum}
                  </span>
                  <h3 class="cc-card-title" data-moduleid="$**module.id**">
                    {deLabelModuleName(moduleId)}
                  </h3>
                </div>
                <div class="cc-card-description">
                  {@html $collectionsStore["MODULES"][moduleId].description}
                </div>
              </div>
            </div>
            <div class="cc-card-footer">
              $**LINK_ITEM** $**REVIEW_ITEM** $**EDIT_ITEM** $**DATE**
              <div class="cc-progress" />
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/each}
</div>

<style>
  #cc-canvas-collections {
    overflow: hidden;
  }

  .cc-card-interface {
    margin-top: 0.5em !important;
    flex-wrap: wrap;
    display: flex;
  }

  .cc-clickable-card,
  .cc-unclickable-card {
    padding: 0.75rem;
    flex-direction: column;
    display: flex;
    width: 30%;
  }

  @media (max-width: 640px) {
    .cc-clickable-card,
    .cc-coming-soon-card {
      width: 50%;
    }
  }

  @media (max-width: 480px) {
    .cc-coming-soon-card,
    .cc-clickable-card {
      width: 100%;
    }
  }

  .cc-clickable-card:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  .cc-card,
  .cc-card-unclickable {
    box-shadow: 0 10px 15px -3px rgb(0 0 0/ 0.1);
    background-color: #fff;
    border-radius: 1em;
  }

  .cc-card-flex {
    overflow: hidden;
    flex-direction: column;
    flex: 1 1 0%;
    display: flex;
    position: relative;
    border-radius: 1em;
  }

  .cc-card-banner-container {
    position: relative;
  }

  .cc-card:hover {
    background-color: #f5f5f5;
    box-shadow: none;
  }

  .cc-card-image {
    height: 10rem;
    width: 100%;
  }

  .cc-object-fit-old-kludge {
    background-size: contain !important;
    background-repeat: no-repeat;
    background-position: center;
  }

  .cc-object-fit-cover {
    object-fit: cover;
  }

  .cc-object-fit-contain {
    object-fit: contain;
  }

  .cc-object-fit-fill {
    object-fit: fill;
  }

  .cc-object-fit-scale-down {
    object-fit: scale-down;
  }

  .cc-object-fit-none {
    object-fit: none;
  }

  .cc-card-content-height {
    height: 12rem;
    overflow: auto;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    position: relative;
  }

  .cc-card-content,
  .cc-unclickable-card-content {
    padding: 0.5rem;
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
  }

  .cc-card-content:hover {
    cursor: pointer;
  }

  .cc-card-description {
    font-size: 0.75rem;
  }

  .cc-card-description a {
    text-decoration: underline;
    flex: 1 1 0%;
    margin-bottom: 1rem;
  }

  .cc-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0.5em;
  }

  .cc-card-title {
    font-size: 1rem;
    font-weight: bold;
  }

  .cc-card-label {
    font-size: 0.9rem;
    /*margin-bottom: 1rem; */
  }

  .cc-card-footer {
    height: 4rem;
    position: relative;
  }

  .cc-card-engage {
    margin-top: 0.75rem;
    /*padding: 1rem;
			padding-top: 1.5rem; */
    padding-right: 1rem;
  }

  .cc-card-engage-button {
    position: relative;
    float: right;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    color: rgba(30, 58, 138, 1);
    border-style: solid;
    border-width: 1px;
    border-radius: 0.25rem;
    border-color: rgba(30, 58, 138, 1);
  }

  .cc-card-engage-button:hover {
    background-color: rgba(30, 58, 138, 1);
    color: white;
    text-decoration: none !important;
    border: transparent;
    border-radius: 0.25rem;
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

  .cc-card-hide {
    display: none;
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

  .cc-progress {
    float: right;
  }

  .cc-card-fyi {
    position: absolute;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    color: white;
    width: 100%;
    padding: 0.25rem;
    font-size: x-small;
    text-align: center;
  }

  .cc-card-published {
    position: absolute;
    bottom: 0;
    background: rgba(255, 0, 0, 0.75);
    color: white;
    font-size: x-small;
    font-weight: bold;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    text-align: center;
    width: 100%;
  }

  .cc-coming-soon-message {
    font-size: 0.75rem;
    padding: 0.5em;
    background-color: #feee88;
  }

  .gu-engage {
    text-decoration: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .cc-card-link {
    position: absolute;
  }
</style>
