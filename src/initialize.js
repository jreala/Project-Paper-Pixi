"use strict";
var stage;
var renderer;

//Setup Aliases
var Container = PIXI.Container;
var loader = PIXI.loader;
var TextureCache = PIXI.utils.TextureCache;
var Texture = PIXI.Texture;
var Sprite = PIXI.Sprite;
var Rectangle = PIXI.Rectangle;

document.addEventListener('DOMContentLoaded', function () {
    renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    renderer.view.style.position = "absolute";
    renderer.view.display = "block";
    renderer.autoResize = true;
    document.body.appendChild(renderer.view);

	stage = new Container();
	
    loader
    .add("../images/colossus/RunNew.png")
    .load(setup);
});

var colossus;
var colossusRun;
var position = 0;


var fps = 30;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

//This `setup` function will run when the image has loaded
function setup() {
	
	//Sprite sheet
    /*var colossus = new PIXI.Sprite(
        PIXI.loader.resources["../images/colossus/RunNew.png"].texture
    );*/

	// Each frame is 300 x 300
	colossusRun = TextureCache["../images/colossus/RunNew.png"];
	
	var rectangle = new Rectangle(0, 0, 300, 300);
	colossusRun.frame = rectangle;
	
	colossus = new Sprite(colossusRun);
	
    stage.addChild(colossus);

    //Render the stage
    renderer.render(stage);
	gameLoop();
}

function gameLoop(){
	requestAnimationFrame(gameLoop);

	now = Date.now();
	delta = now - then;
	
	if(delta > interval){
		var rectangle = new Rectangle(position * 300, 0, 300, 300);
		colossusRun.frame = rectangle;
		colossus = new Sprite(colossusRun);
		stage.addChild(colossus);
		renderer.render(stage);
		
		position = position < 8 ? position + 1 : 2;
		then = now - (delta % interval);
	}
}