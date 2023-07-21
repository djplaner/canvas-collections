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

# Canvas Collections Life Cycle

A nascent attempt at documenting the life cycle for Canvas Collections.

## 1. main.ts does the set up

- `CanvasSetup::checkContext` extracts some details about what should be the Canvas course into a `context` object
- If on a Canvas course site's module page it attempts to insert the canvas-collections component in the appropriate place passing the `context` object as properties
- Also sets up an event listener to destroy the canvas-collections component if the page is being unloaded

## 2. Canvas Collections component starts up

- a bunch config variables and imports done
- configStore gets initialised with context variables passed from main.ts
- Attempts to load collections (configuation) and Canvas (modules) details via two classes
  - CollectionsDetails
    - Attempts to load the `Collections Configuration` page
    - Will create an empty one if there isn't one
  - CanvasDetails
