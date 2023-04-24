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
  import { collectionsStore } from "../../../stores";
  export let moduleId: Number;
  export let claytons: boolean;
  if (!claytons) {
    claytons = false;
  }

  /**
   * Figure out the correct CSS class based on image size
   * attribute for module
   */
  function calculateImageSize(size: string): string {
    let imageSize = "";
    const allowedObjectFit = ["contain", "cover", "scale-down", "fill"];
    if (size === "bg-contain") {
      imageSize = "cc-object-fit-old-kludge";
    } else if (allowedObjectFit.includes(size)) {
      imageSize = `cc-object-fit-${size}`;
    }
    return imageSize;
  }
</script>

{#if $collectionsStore["MODULES"][moduleId].image && claytons}
  <img
    class="cc-card-image {calculateImageSize(
      $collectionsStore['MODULES'][moduleId].imageSize
    )}"
    src={$collectionsStore["MODULES"][moduleId].image}
    data-moduleid="${moduleId}"
    alt="Image representing '{$collectionsStore['MODULES'][
      moduleId
    ].name.replace(/(["'])/g, '\\$1')}
	'"
  />
{:else if $collectionsStore["MODULES"][moduleId].image && !claytons}
  <img
    class="cc-card-image {calculateImageSize(
      $collectionsStore['MODULES'][moduleId].imageSize
    )}"
    style="height:10rem;width:100%"
    src={$collectionsStore["MODULES"][moduleId].image}
    data-moduleid="${moduleId}"
    alt="Image representing '{$collectionsStore['MODULES'][
      moduleId
    ].name.replace(/(["'])/g, '\\$1')}
	'"
  />
{:else}
  <img
    class="cc-card-image"
    src="https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"
    data-moduleid={moduleId}
    alt="Image representing '{$collectionsStore['MODULES'][
      moduleId
    ].name.replace(/(["'])/g, '\\$1')}'"
  />
{/if}

<style>
  .cc-banner-colour {
    width: 100%;
    height: 10rem;
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
</style>
