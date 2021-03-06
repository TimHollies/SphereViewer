# SphereViewer.js

Displays photo spheres created with [Ricoh Theta](https://theta360.com/en/) or [Google Street View App](https://play.google.com/store/apps/details?id=com.google.android.street) on mobile and desktop browsers.

## Features
* customizable via config
	* can hide the triopod by displaying custom logo at the sphere bottom
	* can display user instructions (PNG image)
* works on desktop and mobile browsers
* texture can be provided in three different formats
	* as spherical image as produced by Ricoh Theta/Google Street View ([equirectangular projection](http://wiki.panotools.org/Equirectangular_Projection))
	* as serie of separate tile images ([rectilinear projection](http://wiki.panotools.org/Cubic_Projection))
	* as tile atlas (single image containing all the tiles)
* image preloading for slower connection (only in "sphere" mode)
	* displays spinner while loading images
* advance feature support
	* conversion of spherical textures into a cubical one (equirectangular-2-rectilinear)
	* custom UV mapping
* supports vanilla JavaScript and AMD

## Live Demo
Live demo is available on CodePen.io http://codepen.io/knee-cola/pen/vxQYNL

## Documentation
There is none ... you can figure it out from provided example files in the [**examples** folder @ GitHub](https://github.com/knee-cola/SphereViewer/blob/master/examples/). The code inside the HTML files is well documented.

Four examples are provided:
* [**sphere.html**](https://github.com/knee-cola/SphereViewer/blob/master/examples/sphere.html) - rendering a [spherical](http://wiki.panotools.org/Equirectangular_Projection) image coming from a Ricoh Theta/Google Street View
* [**tiles.html**](https://github.com/knee-cola/SphereViewer/blob/master/examples/tiles.html) - rendering a series of [rectilinear](http://wiki.panotools.org/Cubic_Projection) tiles onto a cube (faster on old devices) 
* [**atlas.html**](https://github.com/knee-cola/SphereViewer/blob/master/examples/atlas.html) - rendering a [rectilinear](http://wiki.panotools.org/Cubic_Projection) tiles onto a cube (faster on old devices) tiles from a single atlas image (faster on old devices)
* [**force-cube.html**](https://github.com/knee-cola/SphereViewer/blob/master/examples/forced-cube.html) - a special case where the spherical ([equirectangular](http://wiki.panotools.org/Equirectangular_Projection)) image is rendered onto a 3D cube instead of a 3D sphere (default)

## Installation
### NPM installation
To install it via NPM run:
```
npm i -D --save-dev sphere-viewer
```
Then just import it in your JavaScript ... for example, like this:
```
import SphereViewer from 'sphere-viewer'
```
### Using CDN (vanilla JavaScript)
If you use the vanilla JavaScript, link the lib from HTML like this (the code bellow also includes dependencies):
```html
  <script src="//code.jquery.com/jquery-3.2.1.slim.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js"></script>
  <script type="text/javascript" src="//cdn.rawgit.com/knee-cola/SphereViewer/042c4c83/dist/sphereViewer.min.js"></script>
```
### Downloading the viewer (minified)
If you want to store files localy on yout server, you can download the minified file from [GitHub repository](https://github.com/knee-cola/SphereViewer/blob/master/dist/sphereViewer.min.js).

## Dependencies
SphereViewer was build with:
* [Three.js](https://threejs.org/) v85
* [jQuery](https://www.npmjs.com/package/jquery-slim)

## Usage example

```javascript
var isMobile = window.devicePixelRatio!==1;

// defining options
var config = {
  // providing multiple images for the pre-loader
  sphere: ['img/sphere/preloader.jpg', 'img/sphere/hd.jpg'],
  
  // (optional) setting up a logo, which will be displayed at the bottom
  // of the sphere, which is usefull for hiding the triopod
  logo:'img/logo.png',
  
  // (optional) defining hint, which will be displayed in the center
  // of the screen and is hidden after the user clicks/taps the screen
  hint: isMobile ? 'img/sphere-icon-mobile.png' : 'img/sphere-icon-desktop.png',
  
  // (optional) overriding the default control config
  control: {
    autoRotate: true
  },
  
  // (optional) overidding the default spinner config
  spinner: {
    groupRadius: 20
  },

  // (optional) defining what the close button should contain
  //
  // The HTML specified here will be placed inside a <div>
  // we can the style it as we wish via CSS.
  // When user clicks/taps the button, the sphere will close
  // and dispatch 'closed' event
  // If this param is ommited from config, the close button will not be displayed
  closeButton: {
    html: '<i class="cmdCloseSphere material-icons">highlight_off</i>'
  },

  // (optional) Here we could override the default THREE.js UV mapping, by providing a mapper function
  // uvMapper: (geometry) => { ... doing some custom UV mapping ...  }
};

// creating a new instance of the viewer
// ... the viewer will automaticall be appended to <body> and displayed
var viewer = new SphereViewer.Viewer(config);

// adding event handlers:
viewer.addEventListener('close', function() { console.log('sphere closed'); });
```
## License
SphereViewer is licensed under the MIT License.
