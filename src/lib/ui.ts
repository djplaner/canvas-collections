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

export function toastAlert(message, status = "primary", duration = null) {
  const iconMapping = {
    primary: "info-circle",
    success: "check2-circle",
    neutral: "gear",
    warning: "exclamation-triangle",
    danger: "exclamation-octagon",
  };
  // create a shoelace style sl-alert element
  const alert = document.createElement("sl-alert");
  // set variant duration closable attributes
  alert.setAttribute("variant", status);
  //alert.setAttribute("duration", "5000");
  alert.setAttribute("closable", "true");
  if (duration) {
    alert.setAttribute("duration", duration);
  }
  alert.innerHTML = `
    <sl-icon slot="icon" name="${iconMapping[status]}"></sl-icon>
    ${message}
    `;

  alert.toast();
}

/**
 * @function ccConfirm
 * @param message 
 * @description Controller to implement a confirm dialog using shoelace style 
 * copied from https://jsfiddle.net/claviska/s3vdafmw/7/
 */
export const ccConfirm = (message) => {
  return new Promise((resolve, reject) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <sl-dialog label="Confirm">
        ${message}
        <sl-button slot="footer">Cancel</sl-button>
        <sl-button slot="footer" type="primary">OK</sl-button>
      </sl-dialog>    
    `;

    const dialog = div.querySelector("sl-dialog");
    const cancel = div.querySelector("sl-button");
    const ok = cancel.nextElementSibling;

    document.body.appendChild(dialog);

    customElements.whenDefined("sl-dialog").then(() => {
      dialog.show();

      ok.addEventListener("click", () => {
        resolve(true);
        dialog.hide();
      });

      cancel.addEventListener("click", () => {
        resolve(false);
        dialog.hide();
      });

      dialog.addEventListener("sl-hide", () => {
        resolve(false);
      });
    });
  });
};

