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
</script>

{#if claytons}
<div
  class="claytons-banner-colour"
  style="width: 100%; height: 10rem; background-color:{$collectionsStore['MODULES'][moduleId]
    .bannerColour}"
>
  &nbsp;
</div>
{:else}
<div
  class="cc-banner-colour"
  style="background-color:{$collectionsStore['MODULES'][moduleId]
    .bannerColour}"
>
  &nbsp;
</div>
{/if}

<style>
	.cc-banner-colour {
		width: 100%;
		height: 10rem;
	}
</style>
