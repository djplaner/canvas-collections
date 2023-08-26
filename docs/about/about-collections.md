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

# About Canvas Collections

## Why?

The immediate spark for Canvas Collections arose from [Griffith University's](https://www.griffith.edu.au) decision to migrate from Blackboard Learn to Canvas. We became aware of the long-known limitations of Canvas' modules functionality. Canvas modules represented a significant step down in both the structural and visual capabilities used by Griffith courses. 

The step down was particularly large due to the widespread adoption of [the Card Interface tweak](https://djplaner.github.io/Card-Interface-Tweak/) in Blackboard (e.g. image below). At last count, the Card Interface had been used by 250+ Griffith courses and had been adopted elsewhere. For more, see [these reflections on the Card Interface](https://djon.es/blog/2021/03/12/reflecting-on-the-spread-of-the-card-interface-for-blackboard-learn/)

A solution to Canvas' limitations was required. Canvas Collections is the result.

![Simple Card Interface enabled user interface for a Blackboard course. It shows course cards each with highly visual banner images related to the topics of the connected modules. Each card also includes a relevant description and title. Some include dates associated with modules](https://djplaner.github.io/Card-Interface-Tweak/images/after.png)

## How?

Wandering through [the related work](about-collections.md) from the broader Canvas community it became evident that writing your own Javascript solutions was common and apparently somewhat encouraged and enabled by Canvas and Instructure. Writing your own Javascript solution is exactly what happened with the Card Interface. Time to start with Canvas.

Work on Collections started in [January 2022](https://github.com/djplaner/canvas-collections/tree/07b588dba71de55068b65315ad4d7f4206e63b0e). Early releases were [vanilla Javascript](https://github.com/djplaner/canvas-collections/releases), horrendous experiences to write, and evidence of the significant learning curve. In early 2023, Collections was re-written using [Svelte](https://svelte.dev/).

## Usage?

From the middle of 2022 Collections was being used at Griffith University. Initially, as a userscript using "Claytons" Collections to generate static Canvas pages. In July 2022, a version of Collections was installed in Griffith University's Canvas instance.

