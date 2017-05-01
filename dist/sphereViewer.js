!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("THREE"),require("$")):"function"==typeof define&&define.amd?define(["THREE","$"],e):"object"==typeof exports?exports.SphereViewer=e(require("THREE"),require("$")):t.SphereViewer=e(t.THREE,t.$)}(this,function(t,e){return function(t){function e(o){if(i[o])return i[o].exports;var n=i[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,o){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=5)}([function(e,i){e.exports=t},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.BallSpinnerLoader=void 0;var o=i(0),n=function(t){t=t||{},this.groupRadius=t.groupRadius||10,this.circleCount=t.circleCount||8,this.circleRadius=t.circleRadius||1,this.groupAngle=0,this.animationAmplitude=t.animationAmplitude||10,this.circles=[],this.mesh=this.initGroup()};n.prototype={makeCircle:function(t){t=t||{};var e=t.radius||5,i=t.segments||16,n=new o.CircleGeometry(e,i),s=new o.MeshBasicMaterial({color:16777215,transparent:!0,opacity:t.opacity,side:o.DoubleSide});return{mesh:new o.Mesh(n,s),opacityStep:t.opacityStep||.01}},addToScene:function(t){t.add(this.mesh)},initGroup:function(){for(var t=new o.Object3D,e=0,i=1/(this.circleCount/2+1),n=.02,s=0,a=2*Math.PI/this.circleCount,r=0;r<this.circleCount;r++){e+=i,e>1&&(e=1-i,i=-i,n=-n);var h=this.makeCircle({opacity:e,opacityStep:n,radius:this.circleRadius}),c=this.polar2cartesian({distance:this.groupRadius,radians:s});h.mesh.position.set(c.x,c.y,e*this.animationAmplitude),s+=a,t.add(h.mesh),this.circles.push(h)}return t},polar2cartesian:function(t){return{x:Math.round(t.distance*Math.cos(t.radians)*1e3)/1e3,y:Math.round(t.distance*Math.sin(t.radians)*1e3)/1e3}},animate:function(){this.mesh.rotation.z+=.02;for(var t=this.circles,e=(this.circleCount,0);e<t.length;e++){var i=t[e],o=i.mesh.material.opacity+i.opacityStep;i.mesh.geometry.radius;o>1?(o=1-i.opacityStep,i.opacityStep=-i.opacityStep):o<0&&(o=i.opacityStep,i.opacityStep=-i.opacityStep),i.mesh.material.opacity=o,i.mesh.position.z=o*this.animationAmplitude}}},e.BallSpinnerLoader=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ProgressiveImgLoader=void 0;var o=i(0),n=function(){},s=n.prototype=Object.create(o.EventDispatcher.prototype);s.load=function(t){var e=this,i=new o.Texture,n=e.imageObj=new Image,s=0;return n.crossOrigin="anonymous",n.onload=function(){e.imageObj&&(i.needsUpdate=!0,s<t.length?(e.dispatchEvent({type:"progress",imageIndex:s}),window.setTimeout(function(){n.src=t[s++]},1e3)):(e.dispatchEvent({type:"done"}),e.imageObj=null))},n.src=t[s++],i.image=n,i},s.dispose=function(){this.imageObj&&(this.imageObj.src=""),this.imageObj=null},e.ProgressiveImgLoader=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SphereControls=void 0;var o=i(0),n=function(t,e,i){function n(t){u.dispatchEvent({type:"tap",original:t}),t.preventDefault(),m=!0,d(),g.position.lon=o.Math.radToDeg(g.position.theta),g.position.lat=90-o.Math.radToDeg(g.position.phi),f.x=t.clientX,f.y=t.clientY,f.lon=g.position.lon,f.lat=g.position.lat}function s(t){!0===m&&(g.position.lon=.1*(f.x-t.clientX)+f.lon,g.position.lat=.1*(t.clientY-f.y)+f.lat),u.dispatchEvent({type:"mouseMove",original:t})}function a(t){m=!1,t.preventDefault(),l()}function r(e){t.fov+=.05*e.deltaY,t.updateProjectionMatrix()}function h(t){1==t.touches.length&&(m=!0,d(),u.dispatchEvent({type:"tap",original:t}),t.preventDefault(),t.stopPropagation(),f.x=t.touches[0].pageX,f.y=t.touches[0].pageY,g.position.lon=o.Math.radToDeg(g.position.theta),g.position.lat=90-o.Math.radToDeg(g.position.phi),f.lon=g.position.lon,f.lat=g.position.lat)}function c(t){1==t.touches.length&&(t.preventDefault(),t.stopPropagation(),g.position.lon=.1*(f.x-t.touches[0].pageX)+f.lon,g.position.lat=.1*(t.touches[0].pageY-f.y)+f.lat)}function p(t){m=!1,l()}function d(){M.suspended=!0,M.timeout&&window.clearTimeout(M.timeout)}function l(){M.enabled&&(M.timeout=window.setTimeout(function(){M.timeout=null,M.suspended=!1},M.delay))}var u=this;i=i||{},e=void 0!==e?e:document,e.addEventListener("mousedown",n,!1),e.addEventListener("mousemove",s,!1),e.addEventListener("mouseup",a,!1),e.addEventListener("wheel",r,!1),e.addEventListener("touchstart",h,!1),e.addEventListener("touchend",p,!1),e.addEventListener("touchmove",c,!1);var m=!1,f={x:null,y:null,lat:null,lon:null},g={position:{lon:90,lat:0,phi:Math.PI/2,theta:0},time:5},v={position:{phi:g.position.phi,theta:g.position.theta},time2:1},w=new o.Vector3,y={phi:0,theta:0},M={enabled:!!i.autoRotate,suspended:!i.autoRotate,speed:Math.max(0,Math.min(10,i.autoRotateSpeed||1))/1e3*(-1===i.autoRotateDirection?-1:1),delay:Math.max(i.autoRotateDelay||5e3,1e3),timeout:null};this.update=function(){if(m)g.position.lat=Math.max(-85,Math.min(85,g.position.lat)),g.position.phi=o.Math.degToRad(90-g.position.lat),g.position.theta=o.Math.degToRad(g.position.lon),y={phi:g.position.phi-v.position.phi,theta:g.position.theta-v.position.theta},g.time=5,v.time2=1;else{var e=g.time*g.time/60;g.time++,y.phi=y.phi*v.time2/e,y.theta=y.theta*v.time2/e,v.time2=e,M.suspended||(y.theta=M.speed<0?Math.min(y.theta,M.speed):Math.max(y.theta,M.speed)),g.position.phi+=y.phi,g.position.theta+=y.theta,g.position.phi>Math.PI?(g.position.phi=Math.PI,y.phi=-1*y.phi):g.position.phi<0&&(g.position.phi=0,y.phi=-1*y.phi)}v.position.phi=g.position.phi,v.position.theta=g.position.theta,w.x=500*Math.sin(g.position.phi)*Math.cos(g.position.theta),w.y=500*Math.cos(g.position.phi),w.z=500*Math.sin(g.position.phi)*Math.sin(g.position.theta),t.lookAt(w)}};n.prototype=Object.create(o.EventDispatcher.prototype),e.SphereControls=n},function(t,i){t.exports=e},function(t,e,i){"use strict";function o(t){this.isDisposed=!1,this.config=t=t||{},this.initViewport(),this.initScene(),this.config.sphere&&!this.config.forceCube?this.initSphere():this.initCube(),this.config.logo&&this.initLogo(this.config.logo,void 0===this.config.logoDistance?-15:this.config.logoDistance),this.config.hint&&this.showHint(this.config.hint),this.initControls(),this.onResize=this.onResize.bind(this),window.addEventListener("resize",this.onResize,!1),window.setTimeout(this.onResize,1),this.render()}Object.defineProperty(e,"__esModule",{value:!0}),e.Viewer=void 0;var n=i(0),s=i(4),a=function(t){return t&&t.__esModule?t:{default:t}}(s),r=i(3),h=i(2),c=i(1),p=o.prototype=Object.create(n.EventDispatcher.prototype);p.initViewport=function(){var t=(window.devicePixelRatio,window.screen.availWidth,1/window.devicePixelRatio),e=(0,a.default)('head meta[name="viewport"]');this.originalViewPortMeta=e.attr("content"),e.attr("content","initial-scale="+t+", maximum-scale="+t+", user-scalable=0");var i=1!==window.devicePixelRatio;this.container=document.createElement("div"),this.container.className="sphere-container "+(i?"isMobile":"isDesktop"),this.config.closeButtonHtml&&(this.closeButton=document.createElement("i"),this.closeButton.innerHTML=this.config.closeButtonHtml,this.container.appendChild(this.closeButton),this.closeButton_onClick=this.closeButton_onClick.bind(this),this.closeButton.addEventListener("click",this.closeButton_onClick)),document.getElementsByTagName("body")[0].appendChild(this.container)},p.closeButton_onClick=function(){this.dispose(),this.dispatchEvent({type:"closed"})},p.controls_onTap=function(t){this.hideHint()},p.initScene=function(){var t=document.getElementsByTagName("body")[0];this.renderer=new n.WebGLRenderer,this.renderer.setSize(t.scrollWidth,t.scrollHeight),this.container.appendChild(this.renderer.domElement),this.scene=new n.Scene;this.camera=new n.PerspectiveCamera(90,1,1,1e3),this.scene.add(this.camera)},p.initCube=function(t){var e;this.config.sphere?e=this.loadEqui():this.config.tiles?e=this.loadTiles():this.config.atlas&&(e=this.loadAtlas()),this.mesh=new n.Mesh(new n.BoxGeometry(100,100,100),e),this.mesh.scale.x=-1,this.scene.add(this.mesh),this.showLoader()},p.loadTiles=function(){var t=this,e=0,i=this.config.tiles,o=document.createElement("canvas");return["right","left","top","bottom","back","front"].map(function(s){var a=new Image,r=new n.Texture(o);return a.onload=function(){console.log(i[s]),r.image=a,r.needsUpdate=!0,6==++e&&t.hideLoader()},a.src=i[s],new n.MeshBasicMaterial({map:r})})},p.loadAtlas=function(t,e,i){var o=this,s=new Image,i=[0,1,2,3,4,5].map(function(t){return document.createElement("canvas")}),e=i.map(function(t){return new n.MeshBasicMaterial({map:new n.Texture(t)})}),a={right:0,left:1,top:2,bottom:3,front:4,back:5},r=this.config.tileOrder||["right","left","top","bottom","front","back"];return s.crossOrigin="anonymous",s.onload=function(){var t=s.height;r.forEach(function(o){var n=a[o],r=i[n];r.height=t,r.width=t,r.getContext("2d").drawImage(s,t*n,0,t,t,0,0,t,t),e[n].map.needsUpdate=!0}),o.hideLoader()},s.src=this.config.atlas,e},p.loadEqui=function(){var t=this,e=new Image,i=[0,1,2,3,4,5].map(function(t){return document.createElement("canvas")}),o=i.map(function(t){return new n.MeshBasicMaterial({map:new n.Texture(t)})});return e.crossOrigin="anonymous",e.onload=function(){var n=e.width,s=e.height,a=document.createElement("canvas");a.width=n,a.height=s;var r=a.getContext("2d");r.drawImage(e,0,0);var h=r.getImageData(0,0,n,s);t.equi2recti(h,o,i)},e.src=this.config.sphere,o},p.equi2recti=function(t,e,i){var o=this,n=t.width/4,s=new ImageData(n,n),a={0:5,1:1,2:4,3:0,4:2,5:3},r=0,h=function(t){var s=t.data.faceIx,h=a[s],c=i[h];c.width=n,c.height=n,c.getContext("2d").putImageData(t.data.imgData,0,0),e[h].map.needsUpdate=!0,6==++r&&o.hideLoader()};if(o.config.multiWorker)for(var c=0;c<6;c++){var p=new Worker("../src/equi2recti-worker.js");p.onmessage=h,p.postMessage({srcImg:t,imgOut:s,faceIx:c})}else{var p=new Worker("../src/equi2recti-worker.js");p.onmessage=h,p.postMessage({srcImg:t,imgOut:s})}},p.initSphere=function(){this.imgLoader=new h.ProgressiveImgLoader,this.loader_onDone=this.loader_onDone.bind(this),this.imgLoader.addEventListener("done",this.loader_onDone);var t=new n.SphereGeometry(100,64,64);this.config.uvMapper&&this.config.uvMapper(t),this.mesh=new n.Mesh(t,new n.MeshBasicMaterial({map:this.imgLoader.load(this.config.sphere),side:n.FrontSide})),this.mesh.scale.x=-1,this.scene.add(this.mesh),this.showLoader()},p.initLogo=function(t,e){var i=new n.TextureLoader,o=this;i.crossOrigin="",i.load(t,function(t){o.logo=new n.Mesh(new n.PlaneGeometry(10,10),new n.MeshBasicMaterial({map:t,side:n.FrontSide,transparent:!0,opacity:1})),o.logo.position.set(0,e,0),o.logo.rotation.x=-Math.PI/2,o.scene.add(o.logo)})},p.showHint=function(t){var e=new n.TextureLoader,i=this;e.crossOrigin="",e.load(t,function(t){i.hint=new n.Mesh(new n.PlaneGeometry(10,10),new n.MeshBasicMaterial({map:t,side:n.FrontSide,transparent:!0,opacity:1})),i.hint.position.set(0,0,-30),i.camera.add(i.hint)})},p.hideHint=function(){this.hint&&(this.camera.remove(this.hint),this.hint=null)},p.initControls=function(){this.controls=new r.SphereControls(this.camera,this.renderer.domElement,this.config.control),this.controls_onTap=this.controls_onTap.bind(this),this.controls.addEventListener("tap",this.controls_onTap)},p.onResize=function(t){var e=this.container.offsetWidth,i=this.container.offsetHeight;this.camera&&(this.camera.aspect=e/i,this.camera.updateProjectionMatrix()),this.renderer.setSize(e,i)},p.render=function(){this.isDisposed||(requestAnimationFrame(this.render.bind(this)),this.dispatchEvent({type:"preRender",original:event}),this.controls&&this.controls.update(),this.spinLoader&&this.spinLoader.animate(),this.renderer.render(this.scene,this.camera))},p.showLoader=function(){this.spinLoader=new c.BallSpinnerLoader(this.config.spinner),this.camera.add(this.spinLoader.mesh),this.spinLoader.mesh.position.set(0,0,-50)},p.hideLoader=function(){this.spinLoader&&(this.camera.remove(this.spinLoader.mesh),this.spinLoader=null)},p.loader_onDone=function(){this.loader_onDone=null,this.hideLoader()},p.dispose=function(){window.removeEventListener("resize",this.onResize),this.closeButton&&this.closeButton.removeEventListener("click",this.closeButton_onClick),this.controls.removeEventListener("tap",this.controls_onTap),this.imgLoader.dispose(),this.isDisposed=!0,this.container.remove(),(0,a.default)('head meta[name="viewport"]').attr("content",this.originalViewPortMeta),this.loaderEl=this.imgLoader=this.closeButton=this.container=this.renderer=this.container=this.camera=this.scene=this.sphere=this.controls=null},e.Viewer=o}])});