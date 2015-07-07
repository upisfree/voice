var characters,time;window.w=window.innerWidth,window.h=window.innerHeight,time=0,characters=[],Matter.RenderPixi.create=function(e){var t,n,r;return t={controller:Matter.RenderPixi,element:null,canvas:null,options:{width:800,height:600,background:"#fafafa",wireframeBackground:"#222",hasBounds:!1,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showBroadphase:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showShadows:!1}},n=Matter.Common.extend(t,e),r=!n.options.wireframes&&"transparent"===n.options.background,n.context=new PIXI.WebGLRenderer(n.options.width,n.options.height,{view:n.canvas,transparent:r,antialias:!0,backgroundColor:e.background}),n.canvas=n.context.view,n.container=new PIXI.Container,n.bounds=n.bounds||{min:{x:0,y:0},max:{x:n.options.width,y:n.options.height}},n.textures={},n.sprites={},n.primitives={},n.spriteContainer=new PIXI.Container,n.textContainer=new PIXI.Container,n.container.addChild(n.spriteContainer),n.container.addChild(n.textContainer),Matter.Common.isElement(n.element)?n.element.appendChild(n.canvas):Matter.Common.log('No "render.element" passed, "render.canvas" was not inserted into document.',"warn"),n.canvas.oncontextmenu=function(){return!1},n.canvas.onselectstart=function(){return!1},n},Matter.RenderPixi.clear=function(e){var t,n,r,o,i,a,s,d,c,l;for(n=e.container,l=e.spriteContainer,d=n.children,o=0,a=d.length;a>o;o++)r=d[o],n.removeChild(r);for(c=l.children,i=0,s=c.length;s>i;i++)r=c[i],l.removeChild(r);return t=e.sprites["bg-0"],e.textures={},e.sprites={},e.primitives={},e.sprites["bg-0"]=t,t&&n.addChildAt(t,0),e.container.addChild(e.spriteContainer),e.container.addChild(e.textContainer),e.currentBackground=null,n.scale.set(1,1),n.position.set(0,0)},Matter.RenderPixi.world=function(e){var t,n,r,o,i,a,s,d,c,l,u,p,h,g,y,w,f,x,m,v,b,M,C,P,V,N,A,I,B,E;if(I=e.render,E=e.world,h=I.context,p=I.container,P=I.options,n=Matter.Composite.allBodies(E),t=Matter.Composite.allConstraints(E),u=[],P.wireframes?Matter.RenderPixi.setBackground(I,P.wireframeBackground):Matter.RenderPixi.setBackground(I,P.background),c=I.bounds.max.x-I.bounds.min.x,a=I.bounds.max.y-I.bounds.min.y,s=c/I.options.width,d=a/I.options.height,P.hasBounds){for(g=0,f=n.length;f>g;g++)r=n[g],r.render.sprite.visible=Matter.Bounds.overlaps(r.bounds,I.bounds);for(y=0,x=t.length;x>y;y++)l=t[y],o=l.bodyA,i=l.bodyB,V=l.pointA,N=l.pointB,o&&(V=Matter.Vector.add(o.position,l.pointA)),i&&(N=Matter.Vector.add(i.position,l.pointB)),V&&N&&(Matter.Bounds.contains(I.bounds,V)||Matter.Bounds.contains(I.bounds,N))&&u.push(l);p.scale.set(1/s,1/d),p.position.set(-I.bounds.min.x*(1/s),-I.bounds.min.y*(1/d))}else u=t;for(w=0,m=n.length;m>w;w++)r=n[w],Matter.RenderPixi.body(e,r);for(M=0,v=u.length;v>M;M++)l=u[M],Matter.RenderPixi.constraint(e,l);for(A=I.textContainer.children,C=0,b=A.length;b>C;C++)B=A[C],I.textContainer.addChildAt(B,0);return h.render(p)};var Engine;Engine=Matter.Engine.create(document.body,{world:{gravity:{x:0,y:0}},enableSleeping:!0,render:{controller:Matter.RenderPixi,options:{width:window.w,height:window.h,wireframes:!1,background:"#ccc"}}});var Net;Net={start:function(){var e;return Net.io=io(""+Net.protocol+Net.address+":"+Net.port),Net.id=Net.io.io.engine.id,Net.io.on("connect",function(){return Net.id=Net.io.io.engine.id}),e=0,Net.io.on("ping",function(){var t;return t=Date.now()-e-5e3,Net.ping=0>t?0:t,e=Date.now(),Net.io.emit("pong")}),Net.io.on("first-connection-get-characters",function(e){return e.id!==Net.id?new Character(e.id,e.a,e.x,e.y):void 0}),Net.io.on("character-connected",function(e){return e.id!==Net.id?new Character(e.id):void 0}),Net.io.on("character-disconnected",function(e){return removeFromWorld(characters[e.id].body),delete characters[e.id]}),Net.io.on("characters-sync",function(e){return e.id!==Net.id?(characters[e.id].body.angle=e.a,characters[e.id].body.position.x=e.x,characters[e.id].body.position.y=e.y):(player.body.angle=e.a,player.body.position.x=e.x,player.body.position.y=e.y)})},io:null,id:null,protocol:"http://",address:"localhost",port:10101,ping:0};var Vector,addToWorld,removeFromWorld;Math.randomInt=function(e,t){return Math.floor(Math.random()*(t-e+1)+e)},Math.radiansToDegrees=function(e){return e*(180/Math.PI)},Math.degreesToRadians=function(e){return e*(Math.PI/180)},Vector=Matter.Vector,Vector.fromAngle=function(e){return e-=Math.PI/2,{x:Math.cos(e),y:Math.sin(e)}},Vector.toAngle=function(e,t){return Math.atan2(window.h/2-t,window.w/2-e)-Math.PI/2},Array.prototype.first=function(){return this[0]},Array.prototype.last=function(){return this[this.length-1]},Array.prototype.min=function(){return Math.min.apply(null,this)},Array.prototype.max=function(){return Math.max.apply(null,this)},Array.prototype.remove=function(e){var t,n,r;n=[];for(t in this)r=this[t],n.push(r.i===e.i?this.splice(t,1):void 0);return n},addToWorld=function(e){return Matter.Composite.add(Engine.world,e)},removeFromWorld=function(e){return Matter.Composite.remove(Engine.world,e)};var Voice;Voice={start:function(){return Voice._setPrefixes(),Voice._supportGetUserMedia()?navigator.getUserMedia({audio:{mandatory:{googEchoCancellation:!0,googNoiseSuppression:!0,googHighpassFilter:!0,googAutoGainControl:!0}}},Voice.analyze,Voice.error):console.log("Can't find navigator.getUserMedia()!")},analyze:function(e){var t,n;return window.AudioContext=window.AudioContext||window.webkitAudioContext,t=new AudioContext,n=t.createMediaStreamSource(e),Voice.analyser=t.createAnalyser(),Voice.analyser.fftSize=2048,n.connect(Voice.analyser)},update:function(){var e,t,n,r,o,i,a;for(e=new Uint8Array(Voice.analyser.frequencyBinCount),Voice.analyser.getByteFrequencyData(e),Voice.average=0,n=0,o=e.length;o>n;n++)t=e[n],Voice.average+=parseFloat(t);for(Voice.average=Voice.average/e.length,Engine.render.gl.clear(),Engine.render.gl.lineStyle(1,0,1),a=[],t=r=0,i=Voice.average;i>=0?i>=r:r>=i;t=i>=0?++r:--r)a.push(Engine.render.gl.drawCircle(player.body.position.x,player.body.position.y,10*t));return a},error:function(e){return console.log(e)},_setPrefixes:function(){return navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia},_supportGetUserMedia:function(){return!!navigator.getUserMedia},analyser:null,average:0};var Character;Character=function(){function e(e,t,n,r){this.id=e,null==t&&(t=0),null==n&&(n=0),null==r&&(r=0),this.body=Matter.Bodies.rectangle(n,r,100,100,{angle:t,mass:100,frictionAir:.25}),this.mult=1.5,addToWorld(this.body),characters[this.id]=this}return e.prototype.rotate=function(e){return this.body.angle=e},e.prototype.move=function(e){switch(e){case"up":return Matter.Body.applyForce(this.body,{x:0,y:0},Vector.mult(Vector.fromAngle(this.body.angle),this.mult));case"down":return Matter.Body.applyForce(this.body,{x:0,y:0},Vector.neg(Vector.mult(Vector.fromAngle(this.body.angle),this.mult)))}},e}();var Debug;Debug={start:function(){var e;return Debug._text=new Text("sand 0.0.1",22,0,0,0,!0),e=new PIXI.filters.PixelateFilter,e.size.x=e.size.y=2,Debug._text.filters=[e]},update:function(){return Debug._text.text="sand 0.0.1\nx: "+player.body.position.x.toFixed()+"\ny: "+player.body.position.y.toFixed()+"\nping: "+Net.ping+"\nvoice: "+Voice.average.toFixed(),Debug._text.position.x=player.body.position.x-window.w/2+12,Debug._text.position.y=player.body.position.y-window.h/2+12},_text:null};var Filters;Filters={enable:function(){return Filters.pixelate=new PIXI.filters.PixelateFilter,Filters.color=new PIXI.filters.ColorMatrixFilter,Filters.color.matrix=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],Engine.render.container.filters=[Filters.pixelate]},disable:function(){return Engine.render.container.filters=[]},update:function(e){return Engine.render.container.filters?(Filters.color.matrix[2]=Math.sin(2*e),Filters.color.matrix[6]=Math.cos(2*e)):void 0}};var Player,extend=function(e,t){function n(){this.constructor=e}for(var r in t)hasProp.call(t,r)&&(e[r]=t[r]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e},hasProp={}.hasOwnProperty;Player=function(e){function t(){t.__super__.constructor.call(this),window.onmousemove=function(e){return function(t){var n;return n=Vector.toAngle(t.x,t.y),e.rotate(n),Net.io.emit("character-turned",{a:n})}}(this),window.onkeydown=function(e){return function(t){var n;switch(n="",t.keyCode){case 87:case 38:n="up";break;case 83:case 40:n="down"}return e.move(n),Net.io.emit("character-moved",{d:n})}}(this)}return extend(t,e),t}(Character);var Text;Text=function(){function e(e,t,n,r,o,i,a,s){var d,c;return null==i&&(i=!1),null==a&&(a=!1),null==s&&(s="Arial"),d="",i&&(d+="bold "),a&&(d+="italic "),d+=t+"px ",d+=s,c=new PIXI.Text(e,{font:d,fill:n}),c.position.x=r,c.position.y=o,Engine.render.textContainer.addChild(c),c}return e}();var player;Matter.Engine.run(Engine),player=new Player(window.w/2,window.h/2),Debug.start(),Net.start(),Voice.start(),Engine.render.gl=new PIXI.Graphics,setTimeout(function(){return Engine.render.container.addChild(Engine.render.gl)},5e3),Engine.render.options.hasBounds=!0,Matter.Events.on(Engine,"tick",function(e){return time+=.01,Voice.update(),Matter.Bounds.shift(Engine.render.bounds,{x:player.body.position.x-window.w/2,y:player.body.position.y-window.h/2}),Filters.update(time),Debug.update()});