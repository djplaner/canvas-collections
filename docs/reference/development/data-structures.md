<!--
 Copyright (C) 2023 David Jones
 
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

# Collections data structures


## Collections Canvas module object

Collections provides the function ```getRepresentationModules``` which when given the name of a collection and some other parameters will return an array of objects. The array contains one object for each module belonging to the nominated collection. Each object contains basic Canvas specific information about a single module. The following is one example.

```javascript
{
    "id": 1,
    "name": "🤔 Reason 1: Improve Canvas' organisation of course content",
    "position": 1,
    "unlock_at": null,
    "require_sequential_progress": false,
    "publish_final_grade": false,
    "prerequisite_module_ids": [],
    "published": true,
    "items_count": 9,
    "items_url": "http://canvas.docker/api/v1/courses/1/modules/1/items"
}
```

## ```$collectionsStore```

Collections maintains a Svelte store called ```$collectionsStore```. An object that contains all of the additional Collections information.  The following is an edited example. The table provides a summary of the major components of the object.

| Component | Description |
| --- | --- |
| DEFAULT_ACTIVE_COLLECTION | The name of the first collection new visitors should see|
| COLLECTIONS | A collection of objects, one for each collection. Keyed on the name of the collections. |
| COLLECTIONS_ORDER | An array specifying the order in which collections are displayed |
| MODULES | A collection of objects, one for each module in the course. Contains all the Collections specific data about a module. Keyed on the Canvas module id |
| NEED_TO_SAVE_COLLECTIONS | Boolean indicating whether there are unsaved changes to the collections store |
| VISIBILITY | String containg details of who is able to see Collections |


```javascript
{
    "DEFAULT_ACTIVE_COLLECTION": "Why?",
    "COLLECTIONS": {
        "What?": {
            "representation": "GriffithCards",
            "outputPage": "New Home Page",
            "name": "What?",
            "hide": false,
            "includePage": "test page",
            "includeAfter": false,
            "unallocated": false
        },
        "How?": {
            "representation": "CollectionOnly",
            "outputPage": "New Home Page",
            "includePage": "test page",
            "unallocated": false,
            "includeAfter": false,
            "hide": false
        },
        "Questions & Suggestions": {
            "name": "Questions &amp; Suggestions",
            "representation": "CollectionOnly",
            "outputPage": "New Home Page",
            "hide": false,
            "includePage": "Questions",
            "includeAfter": false,
            "unallocated": false
        },
        "Why?": {
            "representation": "HorizontalCards",
            "outputPage": "New Home Page",
            "name": "Why?",
            "includePage": "test page",
            "includeAfter": false,
            "unallocated": false,
            "hide": false,
            "undefined": "xxxx"
        }
    },
    "COLLECTIONS_ORDER": [
        "Why?",
        "What?",
        "How?",
        "Questions & Suggestions"
    ],
    "MODULES": {
        "1": {
            /** see the modules object detail in the following section */
        },
        "2": {
        },
        "3": {
        },
        "4": {
        },
        "5": {
        },
        "6": {
        },
        "7": {
        },
        "8": {
        },
        "9": {
        },
        "10": {
        },
        "11": {
        },
        "12": {
        },
        "13": {
        },
        "14": {
        }
    },
    "NEED_TO_SAVE_COLLECTIONS": true,
    "VISIBILITY": "all"
}
```

## Collections module object


```javascript
{
    "name": "🤔 Reason 1: Improve Canvas' organisation of course content",
    "id": 1,
    "collection": "Why?",
    "description": "<p>What are the  limitations of Canvas' module view? How does Collections help? </p>\n",
    "label": "🤔 Reason",
    "image": "https://www.memecreator.org/static/images/memes/4983581.jpg",
    "autonum": true,
    "imageSize": "contain",
    "engage": true,
    "engageText": "Engage",
    "actualNum": 1,
    "configClass": "icon-mini-arrow-down",
    "banner": "image",
    "fyi": false,
    "fyiText": "",
    "bannerColour": "#d04602",
    "iframe": "<iframe src=\"https://www.youtube.com/embed/UlFNy9iWrpE\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>",
    "activeDate": "start",
    "configDisplay": {
        "accordions": {
            "dates": "",
            "banner": "open",
            "metadata": ""
        }
    },
    "date": {
        "label": "During",
        "day": "Mon",
        "week": "2",
        "time": "",
        "to": {
            "day": "Fri",
            "week": "3",
            "time": "",
            "date": "28",
            "month": "Jul",
            "year": "2023",
            "calendarDate": "2023-07-28"
        },
        "date": "10",
        "year": "2023",
        "month": "Jul",
        "calendarDate": "2023-07-10"
    },
    "configVisible": true,
    "metadata": {
        "learning outcomes": "1, 2, 3",
        "weighting": "50%"
    },
    "publish_final_grade": false,
    "imageBackgroundColour": true,
    "moduleOrder": 1,
    "dateShow": {
        "day": true,
        "week": true,
        "time": false,
        "calendarDate": true,
        "label": false,
        "date": true,
        "month": true,
        "toDate": true,
        "toMonth": true,
        "toDay": true
    },
    "published": true
}
```
