alert("start!");

require("./app.scss");

var helpers = {

	calcDiscreteCoords: function (x, y){
		var dX = Math.floor( x / squareDimmension );
		var dY = Math.floor( y / squareDimmension );
		return [dX, dY];
	},
	squareDimmensionUPD: function(){
		squareDimmension = Math.floor((window.innerWidth / CUSTOMGRID) * 100 ) / 100;
	},

	init: function(){
		helpers.squareDimmensionUPD();
	}


};

var DOMs = {
	infoEl: document.querySelector("#info"),
	myCanvasEl: document.querySelector("#myCanvas"),

	deleteChildren: function (elem){
		while (elem.firstChild) {
			elem.removeChild(elem.firstChild);
		}
	},

	updateInfoElement: function (){
		DOMs.infoEl.innerHTML = "";
		Array.prototype.forEach.call(arguments, function(arg){
			DOMs.infoEl.innerHTML += arg + "<br/>";
		});
	},

	activeEl: null

};

function Brick(color){

	this.updatePosition = function(){
		if (arguments.length) {
			this.position[0] = arguments[0];
			this.position[1] = arguments[1];
		}

		this.divElement.style.marginLeft = squareDimmension * this.position[0] + "px";		//setting coordinates
		this.divElement.style.marginTop = squareDimmension * this.position[1] + "px";

	};

	this.updateDimmensions = function(){
		this.divElement.style.width = squareDimmension + "px";		//mesueres of square
		this.divElement.style.paddingBottom = squareDimmension + "px";
	};

	this.resize = function(){
		this.updatePosition();
		this.updateDimmensions();
	};

	helpers.squareDimmensionUPD();

	this.position = [];
	this.divElement = document.createElement("div");
	this.divElement.classList.add("newBrick");
	this.divElement.style.backgroundColor = color;
	this.divElement.link = this;
	this.focus = !this.focus;
	this.updateDimmensions();


	DOMs.myCanvasEl.appendChild(this.divElement);

	this.divElement.addEventListener("click", function(){
		if (DOMs.activeEl) { DOMs.activeEl.divElement.style.outline = ""; }
		DOMs.activeEl = this.link;
		DOMs.activeEl.divElement.style.outline = "2px solid red";
	});

}

helpers.init();
var CUSTOMGRID = 13;
var bricks = [];

function spawnBricks(num){
	var colors = ["red", "orange", "yellow", "green", "aqua", "blue", "fiolet"];

	function randNumBetween(a,b){
		return a + Math.round( Math.random() * b);

	}

	for (var i = 0; i < num; i++){
		var color = colors[randNumBetween(0, colors.length - 1)];
		console.log(color);
		var coordX = randNumBetween(0, 12);
		var coordY = randNumBetween(0, 12);
		bricks.push( new Brick(color) );
		bricks[i].updatePosition(coordX, coordY);
	}

}

spawnBricks(25);

bricks.push( new Brick("yellow") );
bricks.push( new Brick("green") );
bricks[1].updatePosition(4,0);



window.addEventListener("resize", function(){
	helpers.squareDimmensionUPD();

	DOMs.updateInfoElement(
		"screenWidth: " + window.innerWidth + " px",
		"screenHeight: " + window.innerHeight + " px"
	);

	bricks.forEach(function(el){
		el.resize();
	});

});

myCanvas.addEventListener("click", function(e){
	DOMs.updateInfoElement();

	var coords = helpers.calcDiscreteCoords(e.clientX, e.clientY);

	DOMs.updateInfoElement( "x:" + e.clientX + ", y:" + e.clientY,
							   "dX: " + coords[0] + ", dY: " + coords[1]);
	if (DOMs.activeEl) {
		DOMs.activeEl.updatePosition( coords[0], coords[1] );
	}
});
