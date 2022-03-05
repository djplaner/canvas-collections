
import { cc_Controller } from './cc_controller';

const COURSE_ID=ENV.COURSE_ID;
//const CSS_URL='<link rel="stylesheet" href="https://s3.amazonaws.com/filebucketdave/banner.js/cards.css" />';
//const TAILWIND_CSS='<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">';
const CANVAS_COLLECTIONS_CSS='<link href="https://djon.es/gu/canvas/canvas-collections.css" rel="stylesheet">';
const CI_CSS=`
<style type="text/css">

.ael-note:before {
    position: absolute;
    top: 0;
    margin-left: -2.074rem;
    margin-right: 1.728rem;
    width: 24px;
    content: "";
    background: #ffa423;
    padding: 0.579rem;
    padding-top: 1.44rem;
    height: calc(100% - 0.579rem - 1.44rem); 
}

.ael-note {
    position: relative;
  padding: 0.833rem;
  margin: 1rem auto;
  background: #fff6e9;
  max-width: 90ch;
  overflow: initial !important;
}

.ael-note div  {
    padding-left: 2em !important;
}

.ael-note > p {
    margin: 1rem;
}

.ael-note h5 {
    margin: 1rem;
    color: #ffa423;
    font-weight: 700;    
}

.ael-table {
    margin: 2em 0 ;
    font-size: 0.9em ;
    font-family: sans-serif ;
    min-width: 400px ;
    box-shadow: 0 0 1.5em rgba(0, 0, 0, 0.15) ; 
}

.ael-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
} 

.ael-table th, .ael-table td {
    padding: 12px 15px !important;
    vertical-align: top;
}

.ael-table tbody tr {
    border: thin solid #cccccc;
}

.ael-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.ael-table caption {
    display: none;
}

table {
    border: solid 1px #ff0000;
    border-collapse: collapse;
    margin: 20px;
  }
  
  .test table {
    border: none;
    text-align: center;
  }
  
  .ael-reading {
    position: relative;
    padding: 0.25em 2em 0.5em;
    margin: 1rem 2rem;
    max-width: 90ch;
    overflow: initial !important;
    background: #e6eff5;
  }
  
  .ael-reading:before {
    position: absolute; 
    top: 0; 
    margin-top: 10px;
    margin-left: -4rem;
    margin-right: 1rem;
    width: 2rem;
    content: "";
    background: #e6eff5;
    background-image: url("https://app.secure.griffith.edu.au/gois/ultra/icons-regular/reading.svg");
    background-repeat: no-repeat;
    background-position: center;
    padding: 1rem;
/*    height: calc(100% - 0.579rem - 1.44rem); */

/*      margin-left: -2rem;
    min-height: 20px;
    background-size: 40px 40px;
    background-repeat: no-repeat;*/
  }


</style>
`;

//    background-image: url("https://app.secure.griffith.edu.au/gois/ultra/icons-regular/activity.svg");

function canvasCollections() {

    // add css as first child of div.show-content
//    showContent = document.querySelector('.show-content');
 //   showContent.insertAdjacentHTML('afterbegin', CI_CSS);
    document.head.insertAdjacentHTML( 'beforeend', CI_CSS );

    // Wait for everything to load
    window.addEventListener('load', function(){
        // getting very kludgy here, haven't got a good solution...yet #14
        // - module content is dynamically loaded, wait (dumbly) for it to finish
        this.setTimeout(
            () => {
                let controller = new cc_Controller();
                // scroll to top of canvas collections
                /*let collections = document.getElementsByClassName('cc-canvas-collections');
                let collections = document.getElementsByClassName('content');
                if ( collections.length>0 ) {
                    collections[0].scrollIntoView();
                }*/
                // scroll to top of canvas content div#content, but only if current
                // url does not include [0-9]/modules#[0-9]
                if ( !/[0-9]\/modules#[0-9]/.test(window.location.href) ) {
                    let content = document.getElementById('content');
                    if ( content ) {
                        content.scrollIntoView();
                    }
                } else {
                    // scroll the module into view
                    // get id for module all numbers from current url after #
                    let moduleId = window.location.href.match(/[0-9]\/modules#([0-9]+)/)[1];
                    let module = document.getElementById(moduleId);
                    module.scrollIntoView(true);
                }
            }, 2000
        );
    }, false);
}

canvasCollections();
$(document).ready( function() {

    let checkExist = setInterval(function() {
        if ($('.tooltip').length) {
           console.log("TOOLTIP Exists!");
           clearInterval(checkExist);
            $('.tooltip').tooltipster({
                    interactive: true,
                    contentAsHtml: true,
                    theme: 'tooltipster-shadow',
                    position: 'bottom'
                }
            );
        }
     }, 500);
});
