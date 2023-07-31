# Using Canvas Collections

Canvas Collections modifies how you can visualise and navigate the Canvas Modules page. As summarised int he following table, there are two ways you can use Canvas Collections.

| Attributes | [Live](#live-collections) | [Claytons](#claytons-collections) |
| --- | --- | --- |
| **Description** | The Collections Javascript code is live and actively modifying what you see when viewing the Canvas Modules page. | You use a static Canvas page to navigate to specific modules. The page was created using live Canvas Collections |
| **Requirements** | You are able to run the Collections Javascript code because it [has been installed](../install/how-to-install.md) in your Canvas instance or as a userscript. | The modified Canvas page has been published. (Collections Javascript is not required to view). |
| **What can it do?** | The full functionality of Collections, including (for people with appropriate permissions) the ability to configure Collections, and some dynamic features. | Any one needing to navigate the Canvas modules page using a static interface. | 

## Live Collections

The following example demonstrates the live use of Collections to navigate a modules page that has been divided into three collections: _Why?_, _What?_, and _How?_. It shows navigating between the collections. How each collection's page only contains the modules associated with that collection. It also shows how each collection is represented using the _Cards_ representation and how clicking on a card will show the associated module.

![](./pics/live.gif)

## Claytons Collections

The following example demonstrates the Claytons use of Collections using the exact same course site as the previous example. The major difference is that the Collections Javascript code is no included. Only the vanilla Canvas modules page is available. Instead, the home page is used to navigate between collections and to specific modules.

![](./pics/claytons.gif)

