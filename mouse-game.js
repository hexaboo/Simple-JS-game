//Create elements

//canvas
var canvas = document.getElementById("playboard");
var context = canvas.getContext("2d");
canvas.width = 550;
canvas.height = 550;


//background
var bgReady = false;
var bgImage = new Image();

bgImage.onload = () => {
	bgReady = true;
};
bgImage.src = "background.png";

//cat
var catReady = false;
var catImage = new Image();

catImage.onload = () => {
	catReady = true;
};
catImage.src = "cat.png";

//mouse
var mouseReady = false;
var mouseImage = new Image();

mouseImage.onload = () => {
	mouseReady = true;
};
mouseImage.src = "mouse.png";

//game objects
var cat = {
	speed: 250, // pixels per second
};
var mouse = {};
var counter = 0;

//functions for checking if key is pressed
var keysDown = {};

addEventListener("keydown", (e) => {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", (e) => {
	delete keysDown[e.keyCode];
}, false);

//Game start, resets after the player catches a mouse
var reset = () => {
	//take cat back to the center
	cat.x = canvas.width/2;
	cat.y = canvas.height/2;
	
	//choose new location for the mouse, 23px x 38px
	mouse.x = Math.random() * (canvas.width - 46) + 23;
	mouse.y = Math.random() * (canvas.height - 76) + 38;
}

//Update game objects
var update = modifier => {
	if (38 in keysDown && cat.y >= 0) {  // when holding 'up'
		cat.y -= cat.speed * modifier;
	}

	if (40 in keysDown && cat.y <= 505) {// when holding 'down'
		cat.y += cat.speed * modifier;
	}
	
	if (37 in keysDown && cat.x >= 0) {  // when holding 'left'
		cat.x -= cat.speed * modifier;
	}
	
	if (39 in keysDown && cat.x <= 505) {// when holding 'right'
		cat.x += cat.speed * modifier;
	}
	
	//check if they are touching
	if ( Math.abs( cat.x - mouse.x ) <= 33 &&
	     Math.abs( cat.y - mouse.y ) <= 41 ){
			++counter;
			reset();
	};
};
	
//Draw game on canvas
var render = () => {
	if (bgReady) {
		context.drawImage(bgImage,0,0);
	}
	
	if (catReady) {
		context.drawImage(catImage, cat.x, cat.y);
	}
	
	if (mouseReady) {
		context.drawImage(mouseImage, mouse.x, mouse.y);
	}
	
	//display the score
	context.fillStyle = "white";
	context.font = "30px Calibri";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillText( "Mice caught: " + counter, 32, 32);	

};


//main game loop
var main = () => {
	var now = Date.now();
	var delta = now - then;
	
	update(delta / 1000); //converted to seconds
	render();
	then = now;
	
	requestAnimationFrame(main);
};

//Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || 
w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	
// Game!
var then = Date.now();
reset();
main();
