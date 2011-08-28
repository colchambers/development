var Firebug = {
    string: "A string.",
    object: {}, // an object
    array: [], // an array
    
    /*
     * Show what the logging functions can do.
     * @url http://getfirebug.com/logging
     * @return void
     */
    logging: function() {
        
        // Feature examples 
        var examples = [];
        // String
        examples[0] = 'this.string';
        
        // A row of arguments
        examples[1] = '2,4,6,8,this.string,this.object';
        
        // Object hyperlinks
        examples[2] = 'document.body';
        examples[3] = 'this.object';
        
        // string formatting
        examples[4] = '"The string \'%s\' is %d characters.", this.string, this.string.length';
        
        // xml formatting
        examples[4] = '"<p></p>"';
        
        // types of logging
        var types = ["log", "debug", "info", "warn", "error", "trace", "dir", "dirxml", "group"];
        
        // Iterate through standard methods
        for(x=0;x<types.length;x++) {
            for(y=0;y<examples.length;y++) {
                console.log("The command console."+types[x]+"("+examples[y]+") produces:");
                eval("console."+types[x]+"("+examples[y]+");");
            }
        }
        
        // non standard methods
        
        // named timers
        console.time("timer-1");
        this.profileMe();
        
        console.time("timer-2");
        this.profileMe();
        
        console.timeEnd("timer-1");
        console.timeEnd("timer-2");
        
        // named profilers
        console.profile("profiler-1");
        this.profileMe();
        
        console.profile("profiler-2");
        this.profileMe();
        
        console.profileEnd("profiler-1");
        console.profileEnd("profiler-2");
        
        // from firebug tips http://joehewitt.com/software/firebug/docs.php
        if(console.assert) {
            console.assert(true, "Is it true?");
        }
        
        if(console.assertEquals) {
            console.assertEquals(this.object, {}, "this.object = {}");
        }
        
    },
    
    profileMe: function() {
        var temp;
        for(x=0;x<1000;x++){
            temp = x;
            for(y=0;y<1000;y++){
                temp = y;
            }
        }
    },
    
    /*
     * Run the demo methods.
     * @return void
     */
    run: function() {
        this.logging();
    }
    
};

Firebug.run();