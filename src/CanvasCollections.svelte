<script lang="ts">
	import { onMount } from 'svelte';
//	import { requestCourseObject } from './lib/CanvasSetup';
	import { CanvasDetails } from './lib/CanvasDetails';
	import { CollectionsDetails } from './lib/CollectionsDetails';

	const CC_VERSION = '0.9.10'
	let COLLECTIONS_ON = false
	let COURSE_OBJECT = null

    export let courseId: number
    export let editMode: boolean
	export let csrfToken: string
	
	let dataLoaded = false
	let canvasDetails = null

	function gotCanvasDetails() {
		alert("getCanvasDetails")
		console.log("XXXXXXXXXXXXXXX")
		console.log(canvasDetails)
		dataLoaded = true 
	}

	onMount(async () => {
		// grab all the canvas course module related information
		// canvasDetails
		// - courseObject 
		// - modules
		canvasDetails = new CanvasDetails( 
			gotCanvasDetails,
			{ courseId: courseId, csrfToken: csrfToken })

		collectionsDetails = new CollectionsDetails(
			gotCollectionsDetails,
			{ courseId: courseId, csrfToken: csrfToken }
		)


	})
</script>

{#if editMode} 
	<div class="cc-switch-container">
	  <div class="cc-switch-title">
		<a target="_blank" rel="noreferrer" href="https://djplaner.github.io/canvas-collections/"><i class="icon-question cc-module-icon"></i></a>
		{#if dataLoaded}
		  <i id="configShowSwitch" class="icon-mini-arrow-right"></i> 
		{/if}
		<small>Canvas Collections</small>
		<span style="font-size:50%">{CC_VERSION}</span>
	  </div>

    {#if dataLoaded}
		<label class="cc-switch">
		    <input type="checkbox" class="cc-toggle-checkbox" id="cc-switch" {COLLECTIONS_ON}>
			<span class="cc-slider cc-round"></span>
		</label>
		<div class="cc-save">
		  <button class="cc-save-button" id="cc-save-button">Save</button>
	    </div>
	{/if}
	   </div>
{/if}

<style>
			 /* The switch - the box around the slider */
.cc-switch {
  position: relative;
  display: inline-block;
  width: 2rem; 
  height: 1.2rem;
  margin-top: .75rem;
  margin-right: 0.5rem
}

/* Hide default HTML checkbox */
.cc-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.cc-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.cc-slider:before {
  position: absolute;
  content: "";
  height: 0.9rem;
  width: 0.9rem;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .cc-slider {
  background-color: #328c04;
}

input:focus + .cc-slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .cc-slider:before {
  -webkit-transform: translateX(1rem);
  -ms-transform: translateX(1rem);
  transform: translateX(1rem);
}

/* Rounded sliders */
.cc-slider.cc-round {
  border-radius: 1.1rem;
}

.cc-slider.cc-round:before {
  border-radius: 50%;
}

.cc-switch-container {
	background-color: #f5f5f5;
	border: 1px solid #c7cdd1;
	color: var(--ic-brand-font-color-dark);
	display: flex;
	position:relative;
}

.cc-unpublished {
    display: flex;
    font-size: .75em;
    background-color: #ffe08a;
    align-items: center;
    border-radius: .5em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    height: 2em;
} 

.cc-switch-title {
	margin: 0.5rem
}

/* styles for the module configs */
/*		    .cc-module-config {
				padding: 1em;
				font-size: smaller;
				margin:0;
			/*	font-weight: bold; */
/*			}

		   .cc-module-no-collection {
				float:right;
				background: red;
				color:white;
				border-radius: 0.25rem;
				padding-left: 0.5rem;
				padding-right: 0.5rem;
				display:none;
		   }

		   .cc-module-config-additional-metadata {
			    margin-top: 0.5rem;
				margin-bottom: 0.5rem;
				padding-left: 0.5rem;
				padding-right: 0.5rem;
		   }



			.cc-module-config-detail {  
				display: grid; 
				grid-template-columns: 1fr 1fr; 
				grid-template-rows: 1fr; 
				gap: 0px 1em; 
				grid-auto-flow: row; 
				grid-template-areas: ". .";
				height: 100%;
			} */

			.cc-save {
				margin-top: 0.5rem;
			}

/*			.cc-active-save-button {
				background-color: #c94444;
				color: var(--ic-brand-button--primary-text);
				border: 1px solid;
				border-color: var(--ic-brand-primary--primary-bgd-darkened-15);
				border-radius: 2px;
				display: inline-block;
				position: relative;
				padding-left: 0.25rem;
				padding-right: 0.25rem;
				text-align: center;
				vertical-align: middle;
				cursor: pointer;
				font-size: 65%;
				transition: background-color 0.2s ease-in-out;
			}

			.cc-active-save-button:hover {
				background: var(--ic-brand-primary);
			} */

			.cc-save-button {
				background: #f5f5f5;
				color: #2d3b45;
				border: 1px solid;
				border-color: #c7cdd1;
				border-radius: 2px;
				display: inline-block;
				position: relative;
				padding-left: 0.25rem;
				padding-right: 0.25rem;
				text-align: center;
				vertical-align: middle;
				cursor: pointer;
				font-size: 65%;
				transition: background-color 0.2s ease-in-out;
			}

			.cc-save-button:hover {
				background: #cccccc;
			}


</style>