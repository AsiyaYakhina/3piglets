/* Copyright (C) 2007-2013 Multi Touch Oy, Finland, http://www.multitaction.com
 *
 This is an awesome game that tells a story about the hard life of three little piglets that have to make certain life
 choices not to be eaten by the wolf

 The game is played by 3 players. Each one of them has a color-coded marker: red (25), green (26), and blue (27)
 *
 */



 var root = $.app.mainLayer();
 $.app.addStyleFilename("style.css");

 var backgroundImage = createBackground("resources/green.png");
 root.addChild(backgroundImage);


/*
Creating intsructions
*/


/*
Creating the background
*/
function createBackground (image) {
	var w = new MultiWidgets.JavaScriptWidget(); 
	w.setWidth(root.width());
	w.setHeight(root.height());
	w.setFixed();
	w.setAutoRaiseToTop(false);
	w.image = new MultiWidgets.ImageWidget(); 
	if (w.image.load(image)) { 
		w.image.setWidth(w.width()); 
		w.image.setHeight(w.height());
		w.image.setFixed();
		w.image.setAutoRaiseToTop(false);
		w.addChild(w.image);
	}

	return w;}



	var resourceDim = 150;
	var imageDim = 80;
	var imageLoc = 32;


	function createWidgetImage (x, y, image, cssId) {


		var w = new MultiWidgets.JavaScriptWidget();
		w.setCSSId(cssId);
		w.setLocation(x,y);
		w.setWidth(resourceDim);
		w.setHeight(resourceDim);
		w.addOperator(new MultiWidgets.StayInsideParentOperator());
		w.image = new MultiWidgets.ImageWidget();


		if (w.image.load(image)) {
			w.image.setWidth(imageDim); 
			w.image.setHeight(imageDim);


			w.image.setLocation(imageLoc, imageLoc);
			w.image.setFixed();
			w.addChild(w.image);
			w.image.raiseToTop();

		}

		root.addChild(w);
		w.raiseToTop();
		return w;

	}



/*
Setting up instruction widgets
*/

function makeTextWidget (text) {
	var useTool = new MultiWidgets.TextWidget();
	useTool.setWidth(root.width());
	//useTool.setHeight(root.height() / 10);
	useTool.setLocation(0, 0);
	useTool.setBackgroundColor(0, 0, 0, 0);
	useTool.setFontSize(20);
	useTool.setText(text);
	useTool.setStrokeWidth(1);
	useTool.setFixed();
	useTool.setAllowRotation(false);
	useTool.setFontFamily(["Trebuchet MS", "Verdana"]);
	useTool.setColor(1, 1, 1, 1);
	root.addChild(useTool);
	useTool.raiseToTop();

	return useTool;
}

/*
Setting up house foundations
*/

var houseDim = 170;
var redHouseLocX=650;
var redHouseLocY=700;

var blueHouseLocX=10;
var blueHouseLocY=400;

var greenHouseLocX=1250;
var greenHouseLocY=400;


var greenInstr = makeTextWidget("Use one of the resources to build a house");
var redInstr = makeTextWidget("Use one of the resources to build a house");
var blueInstr = makeTextWidget("Use one of the resources to build a house");
greenInstr.setLocation(greenHouseLocX, greenHouseLocY);
greenInstr.setCSSId("greenInstr");


function makeImage (x, y, image) {

	var im = new MultiWidgets.ImageWidget(); 
	if (im.load(image)) { 
		im.setWidth(houseDim); 
		im.setHeight(houseDim);
		im.setLocation(x, y);
		im.addOperator(new MultiWidgets.StayInsideParentOperator());
		im.setAllowRotation(false);
		im.setFixed();
	}

	root.addChild(im);
	im.raiseToTop();
	return im;

}


var redHouse = makeImage(redHouseLocX, redHouseLocY, "resources/squareRed.png")
var greenHouse = makeImage(greenHouseLocX, greenHouseLocY, "resources/squareGreen.png")
var blueHouse = makeImage(blueHouseLocX, blueHouseLocY, "resources/squareBlue.png")

var strawHouseLeft = makeImage(blueHouseLocX, blueHouseLocY, "resources/strawHouseLeft.png")
var strawHouseMiddle = makeImage(redHouseLocX, redHouseLocY, "resources/strawHouseMiddle.png")
var strawHouseRight = makeImage(greenHouseLocX, greenHouseLocY, "resources/strawHouseRight.png")

var brickHouseLeft = makeImage(blueHouseLocX, blueHouseLocY, "resources/brickHouseLeft.png")
var brickHouseMiddle = makeImage(redHouseLocX, redHouseLocY, "resources/brickHouseMiddle.png")
var brickHouseRight = makeImage(greenHouseLocX, greenHouseLocY, "resources/brickHouseRight.png")

strawHouseLeft.setCSSId("replaceImageInv");
strawHouseMiddle.setCSSId("replaceImageInv");
strawHouseRight.setCSSId("replaceImageInv");
brickHouseLeft.setCSSId("replaceImageInv");
brickHouseMiddle.setCSSId("replaceImageInv");
brickHouseRight.setCSSId("replaceImageInv");





var redStrawWidget = createWidgetImage(0,0, "resources/strawRed.png", "redInv");
var greenStrawWidget = createWidgetImage(0,0, "resources/strawRed.png", "greenInv");
var blueStrawWidget = createWidgetImage(0,0, "resources/strawRed.png", "blueInv"); 


function replaceWidgets (dragged, replaced, newObj, x, y, cssId, instruction, string) {

	dragged.onUpdate(function(frameInfo) {
		dragged.setScale(1);
		dragged.image.setScale(1);

		if (dragged.intersects(replaced)) {
			console.log("INTERSECTION");
			root.removeChild(replaced);
			root.removeChild(dragged);
			newObj.setCSSId(cssId);
			instruction = string;
		}

	});
}


greenStrawWidget.onUpdate(function(frameInfo) {
	greenStrawWidget.setScale(1);
	greenStrawWidget.image.setScale(1);

	if (greenStrawWidget.intersects(greenHouse)) {
		console.log("INTERSECTION");
		greenHouse.setCSSId("replaceImageInv")
		greenStrawWidget.setCSSId("greenInv");
		strawHouseRight.setCSSId("replaceImageVis");
	}

});

blueStrawWidget.onUpdate(function(frameInfo) {
	blueStrawWidget.setScale(1);
	blueStrawWidget.image.setScale(1);

	if (blueStrawWidget.intersects(blueHouse)) {
		console.log("INTERSECTION");
		blueHouse.setCSSId("replaceImageInv")
		blueStrawWidget.setCSSId("blueInv");
		strawHouseLeft.setCSSId("replaceImageVis");
	}

});



var redTreeWidget = createWidgetImage(0,0, "resources/treeWhite.png", "redVis");
var greenTreeWidget = createWidgetImage(0,0, "resources/treeWhite.png", "greenVis");
var blueTreeWidget = createWidgetImage(0,0, "resources/treeWhite.png", "blueVis");
var redAxWidget = createWidgetImage(200,0, "resources/ax.png", "redInv");
var greenAxWidget = createWidgetImage (0,0, "resources/ax.png", "greenInv");
var blueAxWidget = createWidgetImage (0,0, "resources/ax.png", "blueInv");
var redWoodWidget = createWidgetImage(0,0, "resources/branches-01.png", "redInv");
var greenWoodWidget = createWidgetImage (0,0, "resources/branches-01.png", "greenInv");
var blueWoodWidget = createWidgetImage (0,0, "resources/branches-01.png", "blueInv");






greenTreeWidget.onUpdate(function(frameInfo) {
	greenTreeWidget.setScale(1);
	greenTreeWidget.image.setScale(1);

	if (greenTreeWidget.intersects(greenHouse)) {
		console.log("INTERSECTION");
		cutWood.setLocation(greenHouseLocX-40, greenHouseLocY-20);
		cutWood.rotate(90);
		cutWood.setCSSId("replaceImageVis");
		greenTreeWidget.setLocation(greenHouseLocX-80, greenHouseLocY);
		greenAxWidget.setLocation(treeMarkerLocX, treeMarkerLocY);
		root.removeChild(treeMarker);
		redAxWidget.setCSSId("redVis");
		
	}

});

redAxWidget.onUpdate(function(frameInfo) {
	redAxWidget.setScale(1);
	redAxWidget.image.setScale(1);

	if (redAxWidget.intersects(redTreeWidget)) {
		console.log("INTERSECTION");
		root.removeChild(cutWood);
		root.removeChild(redTreeWidget);
		redWoodWidget.setCSSId("redVis");
		root.removeChild(redAxWidget);
		redWoodWidget.setLocation(redHouseLocX, redHouseLocY-200);
		redWoodWidget.setCSSId("redVis");
		
		
	}

});

redWoodWidget.onUpdate(function(frameInfo) {
	redWoodWidget.setScale(1);
	redWoodWidget.image.setScale(1);

	if (redWoodWidget.intersects(redHouse)) {
		console.log("INTERSECTION");
		root.removeChild(redHouse);
		root.removeChild(redWoodWidget);
		brickHouseMiddle.setCSSId("replaceImageVis");
		
		
		
	}

});


greenTreeWidget.onUpdate(function(frameInfo) {
	greenStrawWidget.setScale(1);
	greenStrawWidget.image.setScale(1);

	if (greenStrawWidget.intersects(greenHouse)) {
		console.log("INTERSECTION");
		greenHouse.setCSSId("replaceImageInv")
		greenStrawWidget.setCSSId("greenInv");
		strawHouseRight.setCSSId("replaceImageVis");
	}

});

blueTreeWidget.onUpdate(function(frameInfo) {
	blueStrawWidget.setScale(1);
	blueStrawWidget.image.setScale(1);

	if (blueStrawWidget.intersects(blueHouse)) {
		console.log("INTERSECTION");
		blueHouse.setCSSId("replaceImageInv")
		blueStrawWidget.setCSSId("blueInv");
		strawHouseLeft.setCSSId("replaceImageVis");
	}

});



/*
Setting up markers that will listen for tapping for straw, tree, and clay
*/
var markerDim = 150;
var strawMarkerLocX=500;
var strawMarkerLocY=200;

var strawMarker = new MultiWidgets.JavaScriptWidget();
strawMarker.setCSSId("strawMarker");
strawMarker.setWidth(markerDim);
strawMarker.setHeight(markerDim);
strawMarker.setLocation(strawMarkerLocX, strawMarkerLocY);
strawMarker.setFixed();
strawMarker.setAutoRaiseToTop(false);

strawMarker.image = new MultiWidgets.ImageWidget();
if(strawMarker.image.load("resources/strawRed.png")) {

	strawMarker.image.setWidth(imageDim);
	strawMarker.image.setHeight(imageDim);
	strawMarker.image.setLocation(imageLoc, imageLoc);
	strawMarker.image.setFixed();
	strawMarker.image.setAutoRaiseToTop(false);
	strawMarker.addChild(strawMarker.image);
	strawMarker.image.raiseToTop(false);
}

root.addChild(strawMarker);
strawMarker.raiseToTop();
strawMarker.image.raiseToTop();


var treeMarkerLocX=850;
var treeMarkerLocY=200;

var treeMarker = new MultiWidgets.JavaScriptWidget();
treeMarker.setCSSId("treeMarker");
treeMarker.setWidth(markerDim);
treeMarker.setHeight(markerDim);
treeMarker.setLocation(treeMarkerLocX, treeMarkerLocY);
treeMarker.setFixed();
treeMarker.setAutoRaiseToTop(false);

treeMarker.image = new MultiWidgets.ImageWidget();
if(treeMarker.image.load("resources/treeWhite.png")) {

	treeMarker.image.setWidth(imageDim);
	treeMarker.image.setHeight(imageDim);
	treeMarker.image.setLocation(imageLoc, imageLoc);
	treeMarker.image.setFixed();
	treeMarker.image.setAutoRaiseToTop(false);
	treeMarker.addChild(treeMarker.image);
	treeMarker.image.raiseToTop(false);
}

root.addChild(treeMarker);
treeMarker.raiseToTop();
treeMarker.image.raiseToTop();


var clayMarkerLocX=690;
var clayMarkerLocY=300;

var clayMarker = new MultiWidgets.JavaScriptWidget();
clayMarker.setCSSId("clayMarker");
clayMarker.setWidth(markerDim);
clayMarker.setHeight(markerDim);
clayMarker.setLocation(clayMarkerLocX, clayMarkerLocY);
clayMarker.setFixed();
clayMarker.setAutoRaiseToTop(false);

clayMarker.image = new MultiWidgets.ImageWidget();
if(clayMarker.image.load("resources/clayWhite.png")) {

	clayMarker.image.setWidth(imageDim);
	clayMarker.image.setHeight(imageDim);
	clayMarker.image.setLocation(imageLoc, imageLoc);
	clayMarker.image.setFixed();
	clayMarker.image.setAutoRaiseToTop(false);
	clayMarker.addChild(clayMarker.image);
	clayMarker.image.raiseToTop(false);
}

root.addChild(clayMarker);
clayMarker.raiseToTop();
clayMarker.image.raiseToTop();




var IDmarkerRed = 42;
var IDmarkerBlue = 43;
var IDmarkerGreen = 44;    


function strawSensor() {

	var strawSensor = new MultiWidgets.JavaScriptWidget();
	strawSensor.setHeight(markerDim);
	strawSensor.setWidth(markerDim);
	strawSensor.setFixed();
	strawSensor.setBackgroundColor(0.1,0.1,0.1,0.1);
	strawSensor.setAutoRaiseToTop(false);

	strawSensor.onMarkerDown(function(id_as_string) {
		console.log("marker down");
		var idAsInt = parseInt(id_as_string);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idAsInt);

		if(marker.code()==IDmarkerRed) {
			console.log("marker down: x: "+ marker.centerLocation().x+" y: "+marker.centerLocation().y);
			redStrawWidget.setLocation(strawMarkerLocX, strawMarkerLocY);
			root.removeChild(strawMarker);
			redStrawWidget.setCSSId("redVis");
		}	


		if(marker.code()==IDmarkerBlue) {
			console.log("marker down: x: "+ marker.centerLocation().x + " y: "+marker.centerLocation().y);
			redStrawWidget.setLocation(strawMarkerLocX, strawMarkerLocY);
			root.removeChild(strawMarker);
			blueStrawWidget.setCSSId("blueVis");
		}	

		if(marker.code()==IDmarkerGreen) {
			console.log("marker down: x: "+ marker.centerLocation().x+" y: "+marker.centerLocation().y);
			greenStrawWidget.setLocation(strawMarkerLocX, strawMarkerLocY);
			root.removeChild(strawMarker);
			greenStrawWidget.setCSSId("greenVis");
		}	

	});


strawMarker.addChild(strawSensor);
	//root.addChild(strawSensor);
	strawSensor.raiseToTop();
}





function treeSensor() {

	var treeSensor = new MultiWidgets.JavaScriptWidget();
	treeSensor.setHeight(markerDim);
	treeSensor.setWidth(markerDim);
	treeSensor.setFixed();
	treeSensor.setBackgroundColor(0.1,0.1,0.1,0.1);
	treeSensor.setAutoRaiseToTop(false);
	treeSensor.setCSSId("treeSensor");

	treeSensor.onMarkerDown(function(tree_id_as_string) {
		console.log("TREE marker down");
		var tree_idAsInt = parseInt(tree_id_as_string);
		var tree_gm = $.app.grabManager();
		var tree_marker = tree_gm.findMarker(tree_idAsInt);

		if(tree_marker.code()==IDmarkerRed) {
			console.log("TREEmarker down: x: "+ tree_marker.centerLocation().x+" y: "+tree_marker.centerLocation().y);
			redTreeWidget.setLocation(treeMarkerLocX, treeMarkerLocY);
			root.removeChild(treeMarker);
			redTreeWidget.setCSSId("redVis");
		}	

		if(tree_marker.code()==IDmarkerBlue) {
			console.log("TREEmarker down: x: "+ tree_marker.centerLocation().x+" y: "+tree_marker.centerLocation().y);
			blueTreeWidget.setLocation(treeMarkerLocX, treeMarkerLocY);
			root.removeChild(treeMarker);
			blueTreeWidget.setCSSId("blueVis");
		}	

		if(tree_marker.code()==IDmarkerGreen) {
			console.log("TREEmarker down: x: "+ tree_marker.centerLocation().x+" y: "+tree_marker.centerLocation().y);
			greenTreeWidget.setLocation(treeMarkerLocX, treeMarkerLocY);
			root.removeChild(treeMarker);
			greenTreeWidget.setCSSId("greenVis");
		}	

	});


treeMarker.addChild(treeSensor);
	//root.addChild(strawSensor);
	treeSensor.raiseToTop();
}




function claySensor() {

	var claySensor = new MultiWidgets.JavaScriptWidget();
	claySensor.setHeight(markerDim);
	claySensor.setWidth(markerDim);
	claySensor.setFixed();
	claySensor.setBackgroundColor(0.1,0.1,0.1,0.1);
	claySensor.setAutoRaiseToTop(false);
	claySensor.setCSSId("claySensor");

	claySensor.onMarkerDown(function(clay_id_as_string) {
		console.log("CLAY marker down");
		var clay_idAsInt = parseInt(clay_id_as_string);
		var clay_gm = $.app.grabManager();
		var clay_marker = clay_gm.findMarker(clay_idAsInt);

		if(clay_marker.code()==IDmarkerRed) {
			console.log("CLAY marker down: x: "+ clay_marker.centerLocation().x+" y: "+clay_marker.centerLocation().y);
			redClayWidget.setLocation(clayMarkerLocX, clayMarkerLocY);
			root.removeChild(clayMarker);
			redClayWidget.setCSSId("redVis");
		}	

		if(clay_marker.code()==IDmarkerBlue) {
			console.log("TCLAYmarker down: x: "+ tree_marker.centerLocation().x+" y: "+tree_marker.centerLocation().y);
			blueClayWidget.setLocation(clayMarkerLocX, clayMarkerLocY);
			root.removeChild(clayMarker);
			bluelayWidget.setCSSId("blueVis");
		}	

		if(clay_marker.code()==IDmarkerGreen) {
			console.log("CLAYmarker down: x: "+ clay_marker.centerLocation().x+" y: "+clay_marker.centerLocation().y);
			greenClayWidget.setLocation(clayMarkerLocX, clayMarkerLocY);
			root.removeChild(clayMarker);
			greenClayWidget.setCSSId("greenVis");
		}	

	});


clayMarker.addChild(claySensor);
	//root.addChild(strawSensor);
	claySensor.raiseToTop();
}


strawSensor();
treeSensor();
claySensor();






