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