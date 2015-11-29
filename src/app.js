alert("start!");

require("./app.scss");

var backEl = document.getElementById('back');
var info = document.getElementById("info");


var code = [  "T11-B11-T21-R11-T31-R11-T21-B11-T11",
			  "B21-T21-R23news-T11-R23contact-T21-B21",
			  "T21-R11-T11-T11-T11-R11-T21",
			  "T31-B11-T11-B11-T31",
			  "R11-R32band-R11-T11-B11-T11-R11-R32media-R11",
			  "T11-T11-B11-T11-B11-T11-T11",
			  "T41-B11-T11-B11-T11-B11-T41"
			];

var code  = code.map(function(line){
	return line.split('-');
});

var parseColors = {
	T: "tarnsparent",
	B: "black",
	R: "red"
};

function writeInfo(squareMeasure){
	info.innerHTML = "width: " + window.innerWidth + "<br/>";
	info.innerHTML += "squareMeasure: " + squareMeasure + "<br/>";
	info.innerHTML += "sM * 13 = " + squareMeasure.slice(0,-2) * 13;
}

function tagAppnedToParentId(tag, parent ){
	var parentEl = document.getElementById(parent);
	var child = document.createElement( tag );
	child.innerHTML = parent.toUpperCase();
	parentEl.appendChild( child );
}







function recalculateSquares(){
	var squareMeasure = (Math.round(window.innerWidth / 1.3) / 10) + "px";
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
			var identity = lineItem.slice(3);
			var tableData = document.createElement("td");

			tableData.className = "square " + color;
			tableData.colSpan = cSpan;
			tableData.rowSpan = rSpan;
			tableData.id = identity;
			if (identity) {tableData.className+= " " + identity;}
			console.log(tableData, !!(identity), identity,  tableData.className);

			tableData.style.width = squareMeasure;
			tableData.style.height = squareMeasure;
			tableRow.appendChild( tableData );
		});
	});
	// var band = document.getElementById("band");
	tagAppnedToParentId(  "span", "band" );
	tagAppnedToParentId(  "span", "news" );
	tagAppnedToParentId(  "span", "contact" );
	tagAppnedToParentId(  "span", "media" );


	// var news = document.getElementById("news");
	// var contact = document.getElementById("contact");
	// var media = document.getElementById("media");

	// var bbb = document.createElement("div");
	// bbb.innerHTML="BAND";
	// band.appendChild(bbb);


	// news.document.createElement("p").innerHTML="NEWS";
	// contact.document.createElement("p").innerHTML="CONTACT";
	// media.document.createElement("p").innerHTML="MEDIA";
}
recalculateSquares();


window.addEventListener("resize", recalculateSquares);
