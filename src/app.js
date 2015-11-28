alert("start!");

require("./app.scss");

var backEl = document.getElementById('back');
var info = document.getElementById("info");



var code = [  "T11-B11-T21-R11-T31-R11-T21-B11-T11",
			  "B21-T21-R23-T11-R23-T21-B21",
			  "T21-R11-T11-T11-T11-R11-T21",
			  "T31-B11-T11-B11-T31",
			  "R11-R32-R11-T11-B11-T11-R11-R32-R11",
			  "T11-T11-B11-T11-B11-T11-T11",
			  "T41-B11-T11-B11-T11-B11-T41"
			];





var code  = code.map(function(line){
	return line.split('-');
});

var parseColors = {
	T: "tarnsparent",
	B: "black",
	R: "red",
};

function writeInfo(squareMeasure){
	info.innerHTML = "width: " + window.innerWidth + "<br/>";
	info.innerHTML += "squareMeasure: " + squareMeasure + "<br/>";
	info.innerHTML += "sM * 13 = " + squareMeasure.slice(0,-2) * 13;
}


function recalculateSquares(){
	var squareMeasure = Math.floor(window.innerWidth / 13) + "px";
	writeInfo(squareMeasure);

	while (backEl.firstChild) {
    	backEl.removeChild(backEl.firstChild);
	}


	code.forEach(function(line){
		var tableRow = document.createElement("tr");
		tableRow.className = "row";
		backEl.appendChild( tableRow );


		line.forEach(function(lineItem){
			var color = parseColors[lineItem.slice(0,1)];
			var cSpan = lineItem.slice(1,2);
			var rSpan = lineItem.slice(2,3);
			console.log( lineItem, color, cSpan, rSpan );

			var tableData = document.createElement("td");


			tableData.className = "square " + color;
			tableData.colSpan = cSpan;
			tableData.rowSpan = rSpan;

			tableData.style.width = squareMeasure;
			tableData.style.height = squareMeasure;
			tableRow.appendChild( tableData );
		});
	});
}

recalculateSquares();

window.addEventListener("resize", recalculateSquares);
