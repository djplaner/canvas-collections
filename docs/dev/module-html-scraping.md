# Module HTML scraping

Details on the HTML for Canvas' modules page and how canvas-collections will scrape it.

## Current structure

Sortable container for all modules
```<div id="context_modules_sortable_container" class="item-group-container">```

Then the list of modules
```<div id="context_modules" ... aria-label="Course Modules">```

Each Individual module
```
    <div id="context_module_{MODULE_ID}">
     header 
    <div id="{MODULE_ID}" class="ig-header header">
        <h2 class="screenreader-only">{MODULE_TITLE}_</h2>
        <span class="ig-header-title" title="{MODULE_TITLE}">
        <span class="name" title="{MODULE_TITLE}_">{MODULE_TITLE}_</span>
        <div class="prerequisites">
        </div>
        <div class="requirements_message">
        </div>
        <div class="ig-header-admin">
        </div>
    </div>
    content body
    <div id="context_module_content_{MODULE_ID}">
        List of content items
        <ul class="ig-list items context_module_items">
            Looks like the class identifies the type of item
            <li id="context_module_item_575" class="context_module_item wiki_page...">
                Various header/display data
                <div class="ig-handle"></div>
                <span class="type_icon"></span>
                Information about the item?
                <div class="ig-info">
                    <div class="module-item-title">
                        <span class="item_name">
                            <a class="ig-title title item_link" title="{ITEM_TITLE}" href="">
                            {ITEM_TITLE}
                            </a>
                            Appears also to perhaps have some different spans/data based on the time
                            e.g. assignment had span.points_possible span.completion_requirement
                        </span>
                    </div>
                    <div class="module_item_icons"></div>
                    <div class="ig-details">
                        <div class="requirement-description ig_details__item">
                        </div>
                    </div>
                    <div class="ig-admin">
                        Misc admin stuff - unspec'd here
                    </div>
                </div>
            </li>
        </ul>
    </div>
    ```

