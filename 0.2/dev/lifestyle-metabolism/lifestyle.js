
var Field = function(name, value){
        this.name = name;
        this.value = value;
    };

var Activity = function(energyDifference, hours) { 
    this.energyDifference = energyDifference;
    this.hours = hours;
};

var Lifestyle = {
    
    fields: [],
    energyDifferences: [0.5, 0.5, -2],
    activityDefaultHours: [14, 8, 2],
    numberOfSliders: 3,
    inputstoDifferences: [],

    init: function() {
        for(x=0;x<numberOfSliders;x++){
            this.inputstoDifferences['inputs-'+x] = 'differences-'+x;
        }
    
    },
    
    getFieldValue: function(id){
        if(!this.fields[id]){
            //throw 'Error getting field ['+id+': field not found';
            return false;
        }
        
        return this.fields[id].value;
    }
    
};
