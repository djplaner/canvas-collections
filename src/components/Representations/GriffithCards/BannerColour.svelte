<script lang="ts">
  import { collectionsStore } from "../../../stores";
  export let moduleId: Number;
</script>

<div
  class="cc-banner-colour"
  style="background-color:{$collectionsStore['MODULES'][moduleId]
    .bannerColour}"
>
  &nbsp;
</div>

<style>
	.cc-banner-colour {
		width: 100%;
		height: 10rem;
	}
</style>
