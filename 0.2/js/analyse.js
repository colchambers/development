 
 var Out = {
    initialiseConsole: function (){
    },
    append: function (message, filter){
        if(!filter){
            filter = '';
        }
        console.log(message, filter);
    
    },
     iterate: function (variable, message, full){
         message == message?message: 'Variable = ';
             
         if(variable.length){
            for( x=0;x<variable.length;x++ ){
                this.append( message + " ( " + x + " ) = " + variable[ x ] );
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