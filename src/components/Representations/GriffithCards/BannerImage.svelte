<script lang="ts">
  import { collectionsStore } from "../../../stores";
  export let moduleId: Number;

  /**
   * Figure out the correct CSS class based on image size
   * attribute for module
   */
  function calculateImageSize() {
		let imageSize = "";
		const allowedObjectFit = ['contain', 'cover', 'scale-down', 'fill'];
		//if ("imageSize" in module && module.imageSize !== "") {
		if ($collectionsStore["MODULES"][moduleId].hasOwnProperty("imageSize") &&
			$collectionsStore["MODULES"][moduleId].imageSize !== "") {
			if ($collectionsStore["MODULES"][moduleId].imageSize === "bg-contain") {
				// some sort of dodgy kludge to handle legacy methods
				//imageSize = "background-size: contain !important; background-repeat: no-repeat; background-position: center;";
				imageSize = "cc-object-fit-old-kludge";
			} else if (allowedObjectFit.includes($collectionsStore["MODULES"][moduleId].imageSize)) {
				imageSize = `cc-object-fit-${$collectionsStore["MODULES"][moduleId].imageSize}`;
				//				imageSize = `object-fit: ${module.imageSize} !important;`;
			}
		}
		return imageSize;
  }
</script>

{#if $collectionsStore["MODULES"][moduleId].image}
  <img
    class="cc-card-image {calculateImageSize()}"
    src="{$collectionsStore['MODULES'][moduleId].image}"
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
