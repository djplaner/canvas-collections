
import { cc_Controller } from './cc_controller';
//import { cc_CanvasModules } from './model/cc_CanvasModules';

const COURSE_ID=ENV.COURSE_ID;
//const CSS_URL='<link rel="stylesheet" href="https://s3.amazonaws.com/filebucketdave/banner.js/cards.css" />';
const TAILWIND_CSS='<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">';
const CANVAS_COLLECTIONS_CSS='<link href="https://djon.es/gu/canvas/canvas-collections.css" rel="stylesheet">';




//function canvasCollections() {
document.head.insertAdjacentHTML( 'beforeend', TAILWIND_CSS );

// Wait for everything to load
window.addEventListener('load', function(){
    // getting very kludgy here, haven't got a good solution...yet #14
    this.setTimeout(
        () => {
            let controller = new cc_Controller();
        }, 2000
    );
}, false);

