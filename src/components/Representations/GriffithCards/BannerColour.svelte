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
