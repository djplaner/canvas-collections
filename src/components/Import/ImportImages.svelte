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

<script>
  /**
   * @file ImportImage.svelte
   * @description Generate information about images in the Collections Configuration that
   * need to be processesdd as part of the import process. Provide an interface to
   * do that processing
   */
  import { configStore } from "../../stores";
  import { wf_fetchData } from "../../lib/CanvasSetup";

  export let imagesCompleteStatus = 0;
  export let currentCourseId;
  export let importCourseId;
  export let collectionsDetails;

  let imageDataGenerated = false;
  let numImagesReceived = 0;
  let numOtherCourseImages = 0;

  const currentHostName = document.location.hostname;
  const baseApiUrl = $configStore["baseApiUrl"]

  let images = collectionsDetails.getImportedImages(); //convertCourseImages(courseImages);

  checkImagesExist();

  $: {
    imageDataGenerated = ( numImagesReceived + numOtherCourseImages ) >= images.length;
    console.log(
      `imageDataGenerated: ${imageDataGenerated} numOtherImages ${numOtherCourseImages}  numImagesReceived: ${numImagesReceived} images.length: ${images.length}`
    );

    if (imageDataGenerated) {
      if (numImagesReceived === images.length) {
        imagesCompleteStatus = 1;
      } else {
        imagesCompleteStatus = -1;
      }
    }
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

        const urlCourseId = matches[1];
        image.fileId = matches[2];

        if (urlCourseId !== currentCourseId) {
          // it's not the current course
          image["courseImage"] = false;
          image["otherCourse"] = parseInt(urlCourseId);
          numOtherCourseImages++;
        } else {
          image["courseImage"] = true;
          // it is the current course, so we can try to retrieve it
          wf_fetchData(
            `${baseApiUrl}/courses/${currentCourseId}/files/${image.fileId}`
          ).then((msg) => {
            if (msg.status === 200) {
              ["size", "content-type", "display_name"].forEach((key) => {
                image[key] = msg.body[key];
              });
              image.details = true;
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
      {#if image.courseImage}
        <tr>
          <td class="cc-success">
            <sl-icon name="check-circle" />
          </td>
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
      {:else}
        <!--        {#if image.otherCourse} -->
        <tr>
          <td class="cc-error">
            <sl-icon name="exclamation-lg" /> Other course image
          </td>
          <td colspan="4"> 
            <a href="{image.src}" target="_blank" rel="noreferrer">Image</a> is from
            <a href="https://{currentHostName}/courses/{image.otherCourse}" target="_blank" rel="noreferrer">
              another course</a>
             </td>

        </tr>
      {/if}
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
