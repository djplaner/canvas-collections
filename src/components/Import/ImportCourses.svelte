<script>
  /**
   * @file ImportCourses.svelte
   * @description Display useful information about the two courses we've been provided
   *
   * - use GET /api/v1/courses/:id  to get the information on the two courses
   * - courseObject information that may be useful https://canvas.instructure.com/doc/api/courses.html#Course
   *   - name
   *   - course_code
   *   - original_name
   *   - total student
   *   - enrollments - list of enrolments linking the user to the course
   */

  import { wf_fetchData } from "../../lib/CanvasSetup";

  import { configStore } from "../../stores";

  export let currentCourseId
  export let importCourseId
  export let baseApiUrl

  let currentCourseDetails = {};
  let importCourseDetails = {}

  
  console.log($configStore)

  wf_fetchData(`${baseApiUrl}/courses/${currentCourseId}`).then((msg) => {
    if (msg.status === 200) {
      currentCourseDetails = msg.body;
    }
  });
  wf_fetchData(`${baseApiUrl}/courses/${importCourseId}`).then((msg) => {
    if (msg.status === 200) {
      importCourseDetails = msg.body;
    }
  });


</script>

<h3>🏗️ ImportCourses.svelte - from {importCourseId} to {currentCourseId}</h3>

<h3>Importing course</h3>

<p>
	<a href="/courses/{importCourseId}/">Link to course</a>
  {importCourseDetails.course_code} - {importCourseDetails.name}	
</p>

<h3>Current course</h3>

<p>
	<a href="/courses/{currentCourseId}/">Link to course</a>
  {currentCourseDetails.course_code} - {currentCourseDetails.name}	
</p>
<style>
</style>
