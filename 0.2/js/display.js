/*
 * Display.js contains methods for display in a browser
 */ 

function updateDisplay(update){
	for(var i=0;i<update.length;i++){
		var item = update[i];
		setElementValue(item.name, item.value);
	}
}

function DisplayItem(name, value){
	this.name = name;
	this.value = value;
}

function DisplayNumericItem(name, value){
	this.name = name;
	this.value = customRound(value, 2);
}
DisplayNumericItem.prototype = DisplayItem;
        
/*
 * From embeddable-chart.html
 */ 
 
function createHelpButtonAndElementAsString(id, text){
    html = '    <a id="help-link-'+id+'" name="help-link-'+id+'" class="help-link" >Show help</a>';
    html += '    <div id="help-'+id+'" name="help-'+id+'">'+text;
    html += '    </div>';
    
    return html;
}

function slideElement(id){
      var speed = 500;
      $(id).toggle("slide", { direction: "left"}, speed);
      return;
      
      if($(id).hasClass("hidden")){
        $(id).show("slide", { direction: "right"}, speed);
      }
      else {
        $(id).hide("slide", { direction: "left"}, speed);
      }
}

function appendSlideElement(id){
    $(id).click(function () {
      slideElement(this);
    });
}