/**
 * @file ui.ts
 * @description UI helper functions
 */


/**
 * @function toastAlert
 * @param {string} message - HTML to be displayed in the toast
 * @param {string} status - primary, success, neutral, warning, danger
 * @description Quick implementation of the shoelace style toast alert notification
 * https://shoelace.style/components/alert
 */

  export function toastAlert( message, status = "primary" ) {
    const iconMapping = {
      primary: "info-circle",
      success: "check2-circle",
      neutral: "gear",
      warning: "exclamation-triangle",
      danger: "exclamation-octagon"
    }
    // create a shoelace style sl-alert element
    const alert = document.createElement("sl-alert");
    // set variant duration closable attributes
    alert.setAttribute("variant", status);
    //alert.setAttribute("duration", "5000");
    alert.setAttribute("closable", "true");
    alert.innerHTML = `
    <sl-icon slot="icon" name="${iconMapping[status]}"></sl-icon>
    ${message}
    `

    alert.toast()
  }
