<script>
  /**
   * @file ImportImage.svelte
   * @description Generate information about images in the Collections Configuration that
   * need to be processesdd as part of the import process. Provide an interface to
   * do that processing
   */
  import { modulesStore } from "../../stores";
  import { wf_fetchData } from "../../lib/CanvasSetup";

  export let currentCourseId;
  export let importCourseId;
  export let collectionsDetails;

  const currentHostName = document.location.hostname;
  const baseApiUrl = `https://${currentHostName}/api/v1`;

  let courseImages = collectionsDetails.getCourseImages();
  let images = convertCourseImages(courseImages);

  checkImagesExist();

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
  function convertCourseImages(courseImages) {
    console.log(courseImages);
    const imgElements = courseImages.querySelectorAll("img.cc-moduleImage");
    console.log(imgElements);
    let images = [];

    imgElements.forEach((imgElement) => {
      console.log(imgElement);
      console.log(`id is ${imgElement.id}`);
      let moduleId = imgElement.id.replace("cc-moduleImage-", "");

      images.push({
        moduleId: moduleId,
        src: imgElement.src,
        details: false, // flag if have Canvas API data yet
      });
    });
    return images;
  }

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

        console.log(`url ${url} matches ${matches} is a local course`);

        const urlCourseId = matches[1];
        image.fileId = matches[2];

        image["courseImage"] = true;

        if (urlCourseId !== currentCourseId) {
          // it's not the current course
          image["otherCourse"] = parseInt(urlCourseId);
        } else {
          // it is the current course, so we can try to retrieve it
          wf_fetchData(`${baseApiUrl}/courses/${currentCourseId}/files/${image.fileId}`).then(
            (msg) => {
              if (msg.status === 200) {
                ["size", "content-type", "display_name"].forEach((key) => {
                  image[key] = msg.body[key];
                });
				image.details = true
				console.log(image)

              }
            }
          );
        }
      } else {
        image["courseImage"] = false;
      }
    });
  }

  function generateDetails(image) {
      return `- image.id ${image.fileId} name ${image.display_name} 
	  (${image.size}) type ${image.content-type} -`
  } 
</script>

<h3>🏗️ ImportImage.svelte</h3>

{#each images as image}
  <p>
    {image.moduleId}
    {#if image.details} 
	  {generateDetails(image)}
    {/if}
    {image.src}
  </p>
{/each}
