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
  import { collectionsStore, configStore } from "../../../stores";
  export let moduleId: Number;
  export let claytons: boolean;
  if (!claytons) {
    claytons = false;
  }

  /**
   * @function isValidIframe
   * @param html
   * @returns boolean
   * @description Reactively checks if the iframe value is just
   * an iframe and an iframe alone
   */
  function isValidIframe(html): boolean {
    const match = $collectionsStore["MODULES"][moduleId].iframe.match(
      /^<iframe.*src="(.*)".*>.*<\/iframe>$/
    );

    return match;
  }
</script>

{#if isValidIframe($collectionsStore["MODULES"][moduleId].iframe)}
  {@html $collectionsStore["MODULES"][moduleId].iframe}
{:else if claytons}
  <div
    class="claytons-banner-colour"
    style="width: 100%; height:10rem; background-color:#ffffff;"
  >
    {#if $configStore["editMode"]}
      <p style="margin:2rem;">(<em>No iframe specified</em>)</p>
    {/if}
  </div>
{:else}
  <div class="cc-banner-colour">
    {#if $configStore["editMode"]}
      <p style="margin:2rem">(<em>No iframe specified</em>)</p>
    {/if}
  </div>
{/if}

<style>
  .cc-banner-colour {
    width: 100%;
    height: 10rem;
    background-color: #ffffff;
  }
</style>
