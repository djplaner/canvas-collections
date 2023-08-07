# Collections: Institutional installation

An institutional installation of Canvas Collections involves two steps:

1. Identify the URLs for Collections' code and CSS files.
2. Use the Canvas theme editor to add those URLs to an appropriate  Canvas theme.

## 1. Identify the URLs for Collections' code and CSS files

These files implement Canvas Collections. An institutional installation of Collections will require you to identify the URLs for the version of Collections code and CSS files to be used.

The two files required are:

1. [canvas-collections.js](https://github.com/djplaner/canvas-collections/blob/main/dist/canvas-collections.js) - the code implementing Collections, and
2. [canvas-collections.css](https://github.com/djplaner/canvas-collections/blob/main/dist/canvas-collections.css) - the CSS declarations specifying the look and feel of Collections.

=== 

### Standard Institutional practice

Most institutions will have specific policies and practices governing which, how and where such files will be hosted. 

### Public Content Delivery Network (CDN) Alternatives

Various free Content Delivery Network (CDN) services also provide URLs you can use.

For example, copy and pasting the [Raw GitHack](https://raw.githack.com)





The [Canvas theme editor](https://community.canvaslms.com/t5/Video-Guide/Theme-Editor-Admins/ta-p/383021) allows authorised people to include additional Javascript and CSS into a Canvas theme. This theme is then applied to course sites and Collections is available for use.

## The required files

The [`dist`](https://github.com/djplaner/canvas-collections/tree/main/dist) folder in the Canvas Collections GitHub repo contains the necessary files:


These are produced when building Canvas Collections.

## One approach - upload these two files

As shown in the following figure, the Canvas Theme editor provides methods to upload a CSS and JavaScript file to a theme. Install Collections by uploading the Collections files via these means

<figure markdown>
<figcaption>CSS and JavaScript file uploads in the Canvas Theme editor</figcaption>
[![CSS and JavaScript file uploads in the Canvas Theme editor](pics/themeEditor.png)](pics/themeEditor.png))  
</figure>
