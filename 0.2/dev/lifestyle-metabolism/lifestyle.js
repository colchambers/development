
var Field = function(name, value){
        this.name = name;
        this.value = value;
    };

var Activity = function(name, hourlyEnergyDifference, hours) { 
    this.name = name;
    this.hourlyEnergyDifference = hourlyEnergyDifference;
    this.hours = hours;
    this.energyDifference = 0;
};

var Binding = function(a, a) {
    this.a = a;
    this.b = b;
}

var Lifestyle = {
    
    ACTIVITY_WORK: 0,
    ACTIVITY_REST: 1,
    ACTIVITY_PLAY: 2,
    
    ACTIVITY_HOURS_MIN: 0,
    ACTIVITY_HOURS_MAX: 24,
    
    fields: [],
    energyDifferences: [0.5, 0.5, -2],
    activityDefaultHours: [14, 8, 2],
    inputstoDifferences: [],
    activityNames: ['work', 'rest', 'play'],
    activities: [
            new Activity('work', 0.5, 14),
            new Activity('rest', 0.5, 8),
            new Activity('play', -2, 2)
        ],

    init: function() {
        for(x=0;x<Lifestyle.activities.length;x++){
            this.inputstoDifferences['inputs-'+x] = 'differences-'+x;
        }
        
        for(index in activities) {
            calculateActivityEnergyDifferenceById(index);
            console.log(activity);
        }
    
    },
    
    getFieldValue: function(id){
        if(!this.fields[id]){
            //throw 'Error getting field ['+id+': field not found';
            return false;
        }
        
        return this.fields[id].value;
    },
    
    calculateActivityEnergyDifferenceById: function(id){
        activity = this.getActivityById(id);
        activity.energyDifference = activity.hourlyEnergyDifference * activity.hours;
    },
    
    initialiseActivityDisplay: function() {
        var x=0;
        var input;
        var difference;
        var activity;
        for(x=0;x<this.activities.length;x++){
            activity = this.activities[x];
            input = $( "#inputs-"+x );
            input.slider({
            	orientation: "vertical",
    			range: "min",
    			min: this.ACTIVITY_HOURS_MIN,
    			max: this.ACTIVITY_HOURS_MAX,
    			value: activity.hours,
    			slide: updateEnergyDifference
    		});

            
    		$( "#differences-"+x ).val( input.slider( "value" ) );
        }
    },
    
    /*
     * @param int id activity id
     * @param int hours number of hours
     * @return void
     */
    updateActivityHours: function(id, hours) {
        activity = this.getActivityById(id);
        activity.hours = hours;
    },
    
    /*
     * @param int id activity id
     * @return activity
     */
    getActivityById: function(id) {
        return activities[id];
    }
};
