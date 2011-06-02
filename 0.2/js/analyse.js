 
 var Out = {
    initialiseConsole: function (){
     // Create console
       /* // Create a YUI instance and request the console module and its dependencies
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
        */
    },
    append: function (message, filter){
        YUI({ filter: 'raw' }).use("node", function (Y) {
                Y.log(message, filter);
        });
    
    },
     iterate: function (variable, message, full){
         message == message?message: 'Variable = ';
             
         if(variable.length){
             for( x=0;x<variable.length;x++ ){
            	this.append( message + " ( " + x + " ) = " + variable[ x ] )
    		}
         }
         
         var method;
         for( method in variable ){
    		if( full ){
				this.append( method + " = " + this.getObjectMethod( variable, method ));
			}
			else{
				this.append( method);
			}
		}
     },
     object: function (variable, message, full){
         message == message?message: 'Variable = ';
         this.append(message);
         this.append(variable);
     },
     getObjectMethod: function ( variable, method ){ return variable[ method ]; }
    
}