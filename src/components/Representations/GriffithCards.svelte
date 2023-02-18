<script lang="ts">
  /**
   * Implement original GriffithCards component
   *
   */

  import { collectionsStore, modulesStore, configStore } from "../../stores";
  import { getModuleUrl, deLabelModuleName } from "./representationSupport";
  import BannerIframe from "./GriffithCards/BannerIframe.svelte";
  import BannerColour from "./GriffithCards/BannerColour.svelte";
  import BannerImage from "./GriffithCards/BannerImage.svelte";
  import DateWidget from "./GriffithCards/DateWidget.svelte";

  //  import "@shoelace-style/shoelace/dist/components/card/card.js";
  import { getRepresentationModules } from "./representationSupport";

  export let collection: string;
  //  export let calendar: any;
  export let claytons: boolean;
  if (!claytons) {
    claytons = false;
  }

  // early test (kludge) for shoelace cards
  // uncomment the shoelace import above
  const shoelace = false;

  const BANNER_TRANSLATION = {
    image: BannerImage,
    colour: BannerColour,
    iframe: BannerIframe,
  };

  // calculate the moduleIds belonging to collection
  let modules = generateModulesData();
  let tmpCollection = collection;

  $: {
    if (collection === $configStore["currentCollection"]) {
      //modules = generateModulesData();
      const changed = $configStore["currentCollectionChanged"];
      if (changed) {
        $configStore["currentCollectionChanged"] = false;
      }
      modules = generateModulesData();
    }
  }

  function generateModulesData() {
    return getRepresentationModules(
      collection,
      claytons,
      $collectionsStore["COLLECTIONS"][collection]["unallocated"]
    );
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
   * @function isUnPublishedUnallocated
   * @param moduleId - of the current module
   * @returns true if the module is unpublished or unallocated & if that information
   * should be shown.  In particular, is used to figure out if to show a small
   * message on a card about unpublished/unallocated
   *
   * Conditions include
   * - only staff (editMode) should see unpublished/unallocated messages
   * - students (!editMode) should not see unpublished/unallocated messages
   */
  function isUnPublishedUnallocated(moduleId) {
    if (!$configStore["editMode"]) {
      return false;
    }

    // is it unpublished
    if (!$collectionsStore["MODULES"][moduleId].published) {
      return true;
    }

    // is it unallocated
    return $collectionsStore["MODULES"][moduleId].collection !== collection;
  }

  // HELP tooltips

  const HELP = {
    noFyiText: {
      tooltip: `<p>Module set as an FYI module, but no explanatory FYI text has been provided.</p>
      <p>This reminder only visible to staff.</p> `,
      href: `https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/general/#fyi`,
    },
  };
</script>

{#if shoelace}
  <div class="cc-card-interface cc-representation">
    {#each modules as theModule}
      <sl-card class="shoelace-card-overview">
        <img
          slot="image"
          src={$collectionsStore["MODULES"][theModule.id].image}
          alt="A kitten sits patiently between a terracotta pot and decorative grasses."
        />

        <strong>{theModule.name}</strong><br />
        This kitten is as cute as he is playful. Bring him home today!<br />
        <small>6 weeks old</small>

        {#if $collectionsStore["MODULES"][theModule.id].engage && !$collectionsStore["MODULES"][theModule.id].fyi}
          <div slot="footer">
            <sl-button href={getModuleUrl(theModule.id)} variant="primary" pill
              >{$collectionsStore["MODULES"][theModule.id]
                .engageText}</sl-button
            >
          </div>
        {/if}
      </sl-card>
    {/each}
    <style>
      .shoelace-card-overview {
        /*        max-width: 300px; */
      }

      .shoelace-card-overview small {
        color: var(--sl-color-neutral-500);
      }

      .shoelace-card-overview [slot="footer"] {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    </style>
  </div>
{:else if claytons}
  <!-- <div class="claytons-card-interface claytons-representation">-->
  <!-- <div style="flex-wrap: wrap; display:flex; margin-top: 0.5em"> -->
  <div
    style="margin-top: 1rem !important; display:grid;grid-gap:1rem;grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%),1fr));"
  >
    {#each modules as theModule}
      <!-- TODO need to handle styles for claytons-unclickable-card -->
      <div id="cc_module_{theModule.id}" style="width:100%">
        <!-- style="padding: 0.75rem; flex-direction: column; display:flex;width:30%" -->
        <div
          id="cc_module_{theModule.id}"
          class="claytons-card"
          style="background-color: #fff; border-radius: 1em;"
        >
          <div
            class="claytons-card-flex"
            style="overflow:hidden;flex-direction:column; flex: 1 1 0%; display:flex;position:relative;border-style:outset;border-radius:1em;"
          >
            <div
              class="claytons-card-banner-container"
              data-moduleid={theModule.id}
              style="position:relative;"
            >
              {#if !$collectionsStore["MODULES"][theModule.id].fyi}
                <a
                  class="claytons-card-link"
                  href={getModuleUrl(theModule.id)}
                  style="position:absolute;:width:100%;height:100%;top:0;left:0;z-index:1;text-decoration:none;"
                  >&nbsp;</a
                >
              {/if}
              <!-- TODO add in CLAYTONS-->
              <svelte:component
                this={BANNER_TRANSLATION[
                  $collectionsStore["MODULES"][theModule.id].banner
                ]}
                moduleId={theModule.id}
                {claytons}
              />
              <DateWidget
                date={$collectionsStore["MODULES"][theModule.id].date}
                dateHide={$collectionsStore["MODULES"][theModule.id].dateHide}
              />
              <!--               $**DATE_WIDGET** -->
              {#if $collectionsStore["MODULES"][theModule.id].fyi && $collectionsStore["MODULES"][theModule.id].fyiText !== ""}
                {#if $collectionsStore["MODULES"][theModule.id].fyiText}
                  <div
                    class="claytons-card-fyi"
                    style="position:absolute;background:rgba(0,0,0,0.75);color:white;width:100%;padding: 0.25rem;font-size:x-small;text-align:center;"
                  >
                    <span class="claytons-fyi-text">
                      {@html $collectionsStore["MODULES"][theModule.id].fyiText}
                    </span>
                  </div>
                {/if}
              {/if}
            </div>
            <div
              class="claytons-card-content-height"
              style="height:12rem;overflow:auto;position:relative;"
            >
              {#if !$collectionsStore["MODULES"][theModule.id].fyi}
                <a
                  class="claytons-card-link"
                  href={getModuleUrl(theModule.id)}
                  style="position:absolute;:width:100%;height:100%;top:0;left:0;z-index:1;text-decoration:none;"
                  >&nbsp;</a
                >
              {/if}
              <!-- this needs to be $cardContentClass -->
              <!-- handling claytons-card-content and claytons-unclickable-card-content  -->
              <div
                class={$collectionsStore["MODULES"][theModule.id].fyi
                  ? "claytons-card-content"
                  : "claytons-unclickable-card-content"}
                style="padding:0.5rem;flex: 1 1 0%; display:flex;flex-direction:column"
              >
                <div class="claytons-card-label" style="font-size: 0.9rem">
                  <span class="claytons-card-label" style="font-size: 0.9rem">
                    {@html $collectionsStore["MODULES"][theModule.id].label}
                    {$collectionsStore["MODULES"][theModule.id].actualNum}
                  </span>
                  <h3
                    class="claytons-card-title"
                    data-moduleid={theModule.id}
                    style="font-size: 1rem; font-weight:strong;"
                  >
                    {#if !$collectionsStore["MODULES"][theModule.id].fyi}
                      <a
                        class="claytons-card-link"
                        href={getModuleUrl(theModule.id)}
                        style="text-decoration:none;"
                      >
                        {@html deLabelModuleName(
                          $collectionsStore["MODULES"][theModule.id]
                        )}
                      </a>
                    {:else}
                      {@html deLabelModuleName(
                        $collectionsStore["MODULES"][theModule.id]
                      )}
                    {/if}
                  </h3>
                </div>
                <div
                  class="claytons-card-description"
                  style="font-size:0.75rem;"
                >
                  {@html $collectionsStore["MODULES"][theModule.id].description}
                </div>
              </div>
            </div>
            <div
              class="claytons-card-footer"
              style="height:4rem;position:relative;"
            >
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
      </div>
    {/each}
  </div>
{:else}
  <div class="cc-card-interface cc-representation">
    {#if $configStore["editMode"]}
      {#if modules.length === 0}
        <div class="cc-no-modules">
          <p>No modules have been added to this collection.</p>
        </div>
      {/if}
    {:else}
      {#each modules as theModule}
        <div
          id="cc_module_{theModule.id}"
          class={$collectionsStore["MODULES"][theModule.id].fyi
            ? "cc-unclickable-card"
            : "cc-clickable-card"}
          on:click|once={cardClick}
          on:keydown|once={cardClick}
        >
          <div id="cc_module_{theModule.id}" class="cc-card">
            <div class="cc-card-flex">
              <div
                class="cc-card-banner-container"
                data-moduleid={theModule.id}
              >
                {#if !$collectionsStore["MODULES"][theModule.id].fyi}
                  <a
                    class="cc-card-link"
                    href={getModuleUrl(theModule.id)}
                    style="">&nbsp;</a
                  >
                {/if}
                <svelte:component
                  this={BANNER_TRANSLATION[
                    $collectionsStore["MODULES"][theModule.id].banner
                  ]}
                  moduleId={theModule.id}
                />
                <DateWidget
                  date={$collectionsStore["MODULES"][theModule.id].date}
                  dateHide={$collectionsStore["MODULES"][theModule.id].dateHide}
                />
                {#if $collectionsStore["MODULES"][theModule.id].fyi}
                  {#if $collectionsStore["MODULES"][theModule.id].fyiText !== "" || $configStore["editMode"]}
                    <div class="cc-card-fyi">
                      <span class="cc-fyi-text">
                        {#if $collectionsStore["MODULES"][theModule.id].fyiText}
                          {@html $collectionsStore["MODULES"][theModule.id]
                            .fyiText}
                        {:else}
                          (<em>FYI card, no FYI text</em>
                          <sl-tooltip hoist>
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
                          </sl-tooltip>
                          )
                        {/if}
                      </span>
                    </div>
                  {/if}
                {/if}
                {#if isUnPublishedUnallocated(theModule.id)}
                  <div class="cc-card-published">
                    {#if !$collectionsStore["MODULES"][theModule.id].published}
                      Unpublished.
                    {/if}
                    {#if $configStore["editMode"] && $collectionsStore["MODULES"][theModule.id].collection !== collection}
                      No collection allocated.
                    {/if}
                  </div>
                {/if}
              </div>
              <div class="cc-card-content-height">
                <!-- this needs to be $cardContentClass -->
                <div
                  class={$collectionsStore["MODULES"][theModule.id].fyi
                    ? "cc-card-content"
                    : "cc-unclickable-card-content"}
                >
                  <div class="cc-card-label">
                    <span class="cc-card-label">
                      {@html $collectionsStore["MODULES"][theModule.id].label}
                      {$collectionsStore["MODULES"][theModule.id].actualNum}
                    </span>
                    <h3 class="cc-card-title" data-moduleid={theModule.id}>
                      {@html deLabelModuleName(
                        $collectionsStore["MODULES"][theModule.id]
                      )}
                    </h3>
                  </div>
                  <div class="cc-card-description">
                    {@html $collectionsStore["MODULES"][theModule.id]
                      .description}
                  </div>
                </div>
              </div>
              <div class="cc-card-footer">
                {#if $collectionsStore["MODULES"][theModule.id].engage && !$collectionsStore["MODULES"][theModule.id].fyi}
                  <div class="cc-card-engage">
                    <div class="cc-card-engage-button">
                      <a href={getModuleUrl(theModule.id)} class="gu-engage"
                        >&nbsp;</a
                      >
                      {$collectionsStore["MODULES"][theModule.id].engageText}
                    </div>
                  </div>
                {/if}
                <div class="cc-progress" />
              </div>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
{/if}

<style>
  #cc-canvas-collections {
    overflow: hidden;
  }

  .cc-card-interface {
    margin-top: 1rem !important;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%), 1fr));
    /*    margin-top: 0.5em !important;
    flex-wrap: wrap;
    display: flex; */
  }

  .cc-clickable-card,
  .cc-unclickable-card {
    width: 100%;
    /*    padding: 0.75rem;
    flex-direction: column;
    display: flex;
    width: 30%; */
  }

  /*@media (max-width: 640px) {
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
  } */

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
    top: 0;
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

  sl-tooltip {
    text-align: left;
    white-space: normal;
  }
</style>
