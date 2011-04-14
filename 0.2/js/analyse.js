 function initialiseConsole(){
 // Create console
    // Create a YUI instance and request the console module and its dependencies
    YUI({ filter: 'raw' }).use("console", "console-filters", "dd-plugin", function (Y) {
     
        console = new Y.Console({
    		strings: {
                logSource: Y.Global,
    			title : 'Draggable Console with filters!',
    			pause : 'Wait',
    			clear : 'Flush',
    			collapse : 'Shrink',
    			expand : 'Grow'
    		}
    	}).plug(Y.Plugin.ConsoleFilters)
    	  .plug(Y.Plugin.Drag, { handles: ['.yui3-console-hd'] })
    	  .render();
    	 
    });
 }
 
 function debug(message, filter){
    YUI({ filter: 'raw' }).use("node", function (Y) {
            Y.log(message, filter);
    });
}