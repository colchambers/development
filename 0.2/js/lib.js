/*
 * lib.js contains library methods
 */

function calculateKilometresFromMiles(miles){

	var conversionFactor = 1.609344;
	return miles*conversionFactor;
}



function getSpeedFromIntensity(intensity){
	// just fudging it for now. 1 = 3mph
	return intensity*3;
}

function getElementValue(name){
	element = document.getElementById(name);
	if(!element){
		return null;
			}

			return element.value;
}

function setElementValue(name, value){
	element = document.getElementById(name);
	if(!element){
		return false;
	}

	element.value = value;
	return true;
}

/*
 * Provides the ability to round a number to a given number of decimal places.
 */
//http://www.geneffects.com/briarskin/programming/newJSMathFuncs.html
function customRound(x,places) {
	// Created 1997 by Brian Risk.  http://brianrisk.com
	return (Math.round(x*Math.pow(10,places)))/Math.pow(10,places)
}

function converter(value, type){

	switch(type){
		case 1: //kilos to stone
			return value/6.35;
			break;
			
			
	}
}

/*
 * Define a variable and translate references for querystring and internal variables 
 */
function DefinedVariable(name, defaultVariableName, queryStringName){
	
	this.name = name;
	this.defaultVariableName = defaultVariableName;
	this.queryStringName = queryStringName;
	this.value = null;
}