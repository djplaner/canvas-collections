# Install canvas-collections as a userscript

> :warning: canvas-collections is still under construction :construction:

If you cannot add Javascript to a Canvas instance, you can still use canvas-collections by installing it as a userscript. The two step process - explained below - is:
1. Install a userscript manager - for example, [TamperMonkey](https://www.tampermonkey.net/)
2. Install the canvas-collections userscript

> :question: You install a [userscript manager](https://en.wikipedia.org/wiki/Userscript_manager) into your web browser (not surprisingly) to help manage [userscripts](https://en.wikipedia.org/wiki/Userscript). Small Javascript programs that your browser will run when you view specific web pages. Userscripts customise those web pages to better suit your purposes. e.g. to modify a Canvas modules page to show canvas-collections.

## 1. Install a userscript manager

[TamperMonkey](https://www.tampermonkey.net/) is a widely used userscript manager. It can be used on most modern web browsers. 

### 1.1. Visit the [Tampermonkey home page](https://www.tampermonkey.net/).

You should see instructions for downloading (installing) TamperMonkey for your web browser. e.g. the following image for the Firefox browser

![](pics/tamperMonkeyHome.png)

### 1.2. Click on the left-hand _Download_ button

As shown above, you can choose to download the stable (left-hand download button) version of TamperMonkey or the BETA (right-hand download button) version. The stable version is recommended.

You will be taken to your web brower's [extension or add-on service](https://en.wikipedia.org/wiki/Browser_extension).

### 1.3. Follow the instructions to add Tampermonkey to your web browser

Each web browser’s browser extension installation process will be a little different. In general, it will provide you with details of what permissions the browser extension (Tampemonkey in this case) wishes to have and provides you with the option to install.

## 2. Install canvas-collections userscript

With TamperMonkey installed you can now install [the canvas-collections userscript](https://github.com/djplaner/canvas-collections/raw/main/release/canvas-collections.user.js). Just click on that link.

If all is working you should something like the following image. An image showing TamperMonkey providing you with details of the userscript and asking if you wish to install it.

![](pics/tamperMonkeyInstallCanvasCollections.png)


## 3. Turning canvas-collections off

There are two ways to prevent canvas-collections from modifying your view of Canvas modules pages:
- Disable TamperMonkey (or your userscript manager)
- Disable the canvas-collection userscript
