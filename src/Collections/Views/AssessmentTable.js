/**
 * AssessmentTableView.js 
 * - implement a table view for a Canvas Collection using a responsive table design
 * https://github.com/Fenwick17/responsive-accessible-table
 * - attempting to support the columns similar to initial course site template
 *   - assessment task (module name)
 *   - Due date
 *   - Weighting/Marked out of
 *   - Learning Outcomes
 *   - Description
 * 
 * TODO
 * - Perhaps auto leaving out those for where there is no value?
 * - Connecting with the known assignment groups and deriving data from there?
 */

// esversion: 11

import { cc_View } from '../../cc_View.js';

const TABLE_STYLES = `
.cc-assessment-container { 
  margin: auto;
  max-width: 960px;
}

/* Standard table styling, change as desired */
.cc-assessment-container table {
  border-collapse: collapse;
  border-spacing: 0;
}
  
.cc-assessment-container caption { 
  font-size: 1em;
  font-weight: 700;
  text-align: left;
}
  
.cc-assessment-container th {
  border-bottom: 1px solid #bfc1c3;
  font-size: 1em;
  padding: 0.5em 1em 0.5em 0;
  text-align: left;
}
  
.cc-assessment-container td {
  border-bottom: 1px solid #bfc1c3;
  font-size: 1em;
  padding: 0.5em 1em 0.5em 0;
}

/* Responsive table styling */
.cc-assessment-container .responsive-table { 
  margin-bottom: 0;
  width: 100%;
}

.cc-assessment-container thead {
  border: 0;
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  height: 1px;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.cc-assessment-container tbody tr {
  display: block;
  margin-bottom: 1.5em;
  padding: 0 0.5em;
}

.cc-assessment-container tbody tr td {
  display: block; /* browsers that don't support flex */
  display: flex;
  justify-content: space-between;
  min-width: 1px;
  text-align: right;
}

@media all and (-ms-high-contrast: none) { /* IE11 flex fix */
  .cc-assessment-container tbody tr td {
    display: block;
  }
}

.cc-assessment-container .responsive-table__heading {
  font-weight: 700;
  padding-right: 1em;
  text-align: left;
  word-break: initial;
}

@media (max-width: 768px) {
  .cc-assessment-container tbody tr td {
    padding-right: 0;
  }
  .cc-assessment-container tbody tr td:last-child {
    border-bottom: 0;
  }
  tbody tr {
    .cc-assessment-container border-bottom: 3px solid grey;
  }
}

@media (min-width: 769px) {
  .cc-assessment-container thead {
    clip: auto;
    -webkit-clip-path: none;
    clip-path: none;
    display: table-header-group;
    height: auto;
    overflow: auto;
    position: relative;
    width: auto;
  }
  
  .cc-assessment-container tbody tr {
    display: table-row;
  }
  
  .cc-assessment-container tbody tr td {
    display: table-cell;
    text-align: left;
  }
  
  .cc-assessment-container .responsive-table__heading {
    display: none;
  }
}
	`;

const TABLE_HTML = `
		<style>
			${TABLE_STYLES}
		</style>
		<h1> Hello from AssessmentTable </h1>

		<div id="cc-assessment-table" class="cc-assessment-container">

      <p>
      {{DESCRIPTION}}
      </p>

			<table class="responsive-table" role="table">
      			<caption>{{CAPTION}}</caption>
      			<thead role="rowgroup">
        			<tr role="row">
          				<th role="columnheader" scope="col">Title</th>
          				<th role="columnheader" scope="col">Type</th>
          				<th role="columnheader" scope="col">Due Date</th>
          				<th role="columnheader" scope="col">Weighting</th>
          				<th role="columnheader" scope="col">Learning Outcomes</th>
					</tr> 
				</thead>
      			<tbody>
			<!-- 	{{TABLE-ROWS}} -->
				  <tr role="row">
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Title</span>
            Workshop preparation and activities
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Type</span>
            Assignment - Written Assignment 
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Due Date</span>
            21 Mar 22  - 3 Jun 22 
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Weighting</span>
            20%
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Learning Outcomes</span>
            1, 2, 3, 4, 5
          </td>
        </tr>
        
        <tr role="row">
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Title</span>
            Offer and Acceptance Assignment
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Type</span>
            Assignment - Problem Solving Assignment
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Due Date</span>
            10 Apr 22 23:59
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Weighting</span>
            10%
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Learning Outcomes</span>
            1, 5
          </td>
        </tr>
        
        <tr role="row">
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Title</span>
            Mid-Trimester Test
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Type</span>
            Test or quiz
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Due Date</span>
            3 May 22 09:00 - 6 May 22 17:00
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Weighting</span>
            20%
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Learning Outcomes</span>
            1, 2, 3, 5
          </td>
        </tr>
        
        <tr role="row">
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Title</span>
            Final Take Home examination
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Type</span>
            Assignment - Problem Solving Assignment
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Due Date</span>
            16 Jun 22  - 25 Jun 22 
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Weighting</span>
            50%
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Learning Outcomes</span>
            1, 2, 3, 4, 5
          </td>
        </tr>
        
				</tbody>
			</table>
		</div>
		`;


export default class AssessmentTableView extends cc_View {


  /**
   * @descr Initialise the view
   * @param {Object} model
   * @param {Object} controller
   */
  constructor(model, controller) {
    super(model, controller);

    this.TABLE_HTML = TABLE_HTML;

    this.TABLE_HTML_FIELD_NAMES = [
      'DESCRIPTION', 'CAPTION', 'TABLE-ROWS'
    ];

    this.currentCollection = this.model.getCurrentCollection();
  }

  /**
   * @descr insert a nav bar based on current collections
   */

  display() {
    DEBUG && console.log('-------------- AssessmentTable.display()');
    let div = document.getElementById('cc-canvas-collections');


    // create a simple message div element
    let message = document.createElement('div');
    message.className = 'cc-message';

    let messageHtml = this.TABLE_HTML;

    // update the messageHTML
    const description = this.model.getCurrentCollectionDescription();

    messageHtml = this.emptyRemainingFields(messageHtml );
    message.innerHTML = messageHtml;
    div.insertAdjacentElement('beforeend', message);

  }

  /**
   * Remove any remaining {{field-name}} from the message HTML
   * @param {String} message 
   * @returns String message with all remaining field names {{field-name}} removed
   */
  emptyRemainingFields(message) {
    this.TABLE_HTML_FIELD_NAMES.forEach(fieldName => {
      // replace any string {{fieldName}} with an empty string
      message = message.replace(`{{${fieldName}}}`, '');
    });
    return message;
  }

}

