<script>
  /**
   * @file ImportImage.svelte
   * @description Generate information about images in the Collections Configuration that
   * need to be processesdd as part of the import process. Provide an interface to
   * do that processing
   */
  import { modulesStore } from "../../stores";
  import { wf_fetchData } from "../../lib/CanvasSetup";

  export let imagesCompleteStatus = false
  export let currentCourseId;
  export let importCourseId;
  export let collectionsDetails;

  let imageDataGenerated = false;
  let numImagesReceived = 0;

  const currentHostName = document.location.hostname;
  const baseApiUrl = `https://${currentHostName}/api/v1`;

  let images = collectionsDetails.getImportedImages() //convertCourseImages(courseImages);

  checkImagesExist();

  $: {
    imageDataGenerated = numImagesReceived === images.length;

    if (imageDataGenerated) {
		imagesCompleteStatus = true
      console.log("--------------------");
      console.log(images);
    }
  }

  /**
   * @function convertCourseImages
   * @param courseImages - the HTML element containing the course images
   * @returns {Array} images
   * { moduleId:  the id of the imported module
   *   src:  the img.src that has been updated in the course copy
   *          to match for the current course
   * }
   * To be used later to modify collections configuration etc.
   */
/*  function convertCourseImages(courseImages) {
    console.log(courseImages);
    const imgElements = courseImages.querySelectorAll("img.cc-moduleImage");
    console.log(imgElements);
    let images = [];

    imgElements.forEach((imgElement) => {
      console.log(imgElement);
      console.log(`id is ${imgElement.id}`);
      let moduleId = imgElement.id.replace("cc-moduleImage-", "");
	  let moduleName = "<em>not found</em>"
	  if (collectionsDetails.collections.MODULES[parseInt(moduleId)]) {
		  moduleName = collectionsDetails.collections.MODULES[parseInt(moduleId)].name;
	  }

      images.push({
        moduleId: moduleId,
		moduleName: moduleName,
        src: imgElement.src,
        details: false, // flag if have Canvas API data yet
      });
    });
    return images;
  } */

  /**
   * @function checkImagesExist
   * @description perform various checks on courseImages and update in response
   *     { courseImage : boolean - is it a local course image
   *       found: boolean,
   *        otherCourse: null / int,
   *        content-type: string,
   *        size
   *  }
   * - loop through each image
   * - check that the URL contains a courseId matching the current course
   * - attempt to retrieve the file, test that exists and update the content-type
   *   and maybe file size
   */

  function checkImagesExist() {
    images.forEach((image) => {
      image.otherCourse = null;
      let url = image.src;
      // url should be in the format
      //  https://<hostname>/courses/<courseId>/files/<fileId>/download
      const regex = new RegExp(
        `${currentHostName}\/courses\/([0-9]+)\/files\/([0-9]+)\/`
      );
      let matches = url.match(regex);
      if (matches) {
        // we've got a local Canvas course image

        const urlCourseId = matches[1];
        image.fileId = matches[2];

        image["courseImage"] = true;

        if (urlCourseId !== currentCourseId) {
          // it's not the current course
          image["otherCourse"] = parseInt(urlCourseId);
        } else {
          // it is the current course, so we can try to retrieve it
          wf_fetchData(
            `${baseApiUrl}/courses/${currentCourseId}/files/${image.fileId}`
          ).then((msg) => {
            if (msg.status === 200) {
              ["size", "content-type", "display_name"].forEach((key) => {
                image[key] = msg.body[key];
              });
              image.details = true;
              console.log(image);
            }
            numImagesReceived++;
          });
        }
      } else {
        image["courseImage"] = false;
      }
    });
  }
</script>

<table class="cc-import-table">
  <tr>
    <th>Status</th>
    <th>Module Name</th>
    <th>Image</th>
    <th>Size</th>
    <th>Type</th>
  </tr>
  {#if !imageDataGenerated}
    <tr>
      <td colspan="5">
        <sl-spinner />
      </td>
    </tr>
  {:else}
    {#each images as image}
      <tr>
          {#if image.courseImage}
        <td class="cc-success">
            <sl-icon name="check-circle" />
		</td>
          {/if}
          {#if image.otherCourse}
        <td class="cc-error">
            <sl-icon name="exclamation-triangle" /> Other course
		</td>
          {/if}
		  <td>
			{image.moduleName}
		  </td>
        <td>
          <a href={image.src} target="_blank" rel="noreferrer">
            {image.display_name}
          </a>
        </td>
        <td> {image.size}</td>
        <td> {image["content-type"]}</td>
      </tr>
    {/each}
  {/if}
</table>

<style>
  sl-spinner {
    font-size: 3rem;
  }

  .cc-import-table {
    font-size: 0.9em;
  }

  .cc-import-table > tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .cc-import-table > tr > td {
    padding: 0.25em;
  }

  .cc-success {
	color: green;
  }

  .cc-error {
	color: red;
  }
</style>
