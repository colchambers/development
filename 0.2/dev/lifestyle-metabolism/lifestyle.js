
var Field = function(name, value){
        this.name = name;
        this.value = value;
    };

var Activity = function(id, name, hourlyEnergyDifference, hours) { 
    this.id = id;
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
    inputsToDifferences: [],
    inputsToActivities: [],
    hoursToActivities: [],
    differencesToActivities: [],
    activityNames: ['work', 'rest', 'play'],
    activities: [],
    totalEnergy: 0,
    totalHours: 0,

    init: function() {
        
        this.initialiseActivities();
        
        for(x=0;x<this.activities.length-1;x++){
            activityId = x+1;
            inputId = 'inputs-'+x;
            differencesId = 'differences-'+x;
            hoursId = 'hours-'+x;
            this.inputsToDifferences[inputId] = differencesId;
            this.inputsToActivities[inputId] = activityId;
            this.inputsToActivities[activityId] = inputId;
            this.differencesToActivities[differencesId] = activityId;
            this.differencesToActivities[activityId] = differencesId;
            this.hoursToActivities[hoursId] = activityId;
            this.hoursToActivities[activityId] = hoursId;
            this.calculateActivityEnergyDifferenceById(activityId);
        }
        
    },
    
    initialiseActivities: function() {
        this.activities[1] = new Activity(1, 'work', 0.5, 14);
        this.activities[2] = new Activity(2, 'rest', 0.5, 8);
        this.activities[3] = new Activity(3, 'play', -2, 2);
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
        var id;
        for(x=1;x<this.activities.length;x++){
            id = x;
            activity = this.getActivityById(id);
            input = $( "#"+this.inputsToActivities[id]);
            input.slider({
                orientation: "vertical",
    			range: "min",
    			min: this.ACTIVITY_HOURS_MIN,
    			max: this.ACTIVITY_HOURS_MAX,
    			value: activity.hours,
    			slide: updateActivityEnergyDifference
    		});

            this.calculateActivityEnergyDifferenceById(id);
            
        }
        
        this.updateTotals();
        this.updateDisplay();
    },
    
    updateActivityEnergyDifferenceById: function(id, hours){
        if(!id){
            return;
        }
        
        this.updateActivityHoursById(id, hours);
        this.calculateActivityEnergyDifferenceById(id);
        this.updateTotals();
        this.updateDisplay();
    },
    
    displayActivityHoursById: function(id){
        if(!id) {
            return;
        }
        
        activity = this.getActivityById(id);
        $( "#"+this.hoursToActivities[id] ).val( activity.hours );
    },
    
    displayActivityEnergyDifferenceById: function(id){
        if(!id) {
            return;
        }
        
        activity = this.getActivityById(id);
        $( "#"+this.differencesToActivities[id] ).val( activity.energyDifference );
    },
    
    /*
     * @param int id activity id
     * @param int hours number of hours
     * @return void
     */
    updateActivityHoursById: function(id, hours) {
        activity = this.getActivityById(id);
        activity.hours = hours;
    },
    
    /*
     * @param int id activity id
     * @return activity
     */
    getActivityById: function(id) {
        return this.activities[id];
    },
    
    /*
     * @return vaoid
     */
    updateTotals: function() {
        totalEnergy = 0;
        totalHours = 0;
        var activity;
        for(x=1;x<Lifestyle.activities.length;x++){
            activity = this.getActivityById(x);
            totalEnergy += activity.energyDifference;
            totalHours += activity.hours;
            
        }
        
        this.totalHours = totalHours;
        this.totalEnergy = totalEnergy;
    },
    
    /*
     * @return vaoid
     */
    displayTotals: function() {
       $( '#total-energy-difference' ).text( this.totalEnergy );
       $( '#total-hours' ).text( this.totalHours );
    },
    
    /*
     * Update the slider values and positions
     * @return vaoid
     */
    updateSliders: function() {
        var activity;
        for(x=1;x<Lifestyle.activities.length;x++){
            id = x;
            activity = this.getActivityById(id);
            input = $( "#"+this.inputsToActivities[id]);
            input.slider({ value: activity.hours});
            
        }
    },
    
    /*
     * @param int id activity id
     * @return vaoid
     */
    updateDisplay: function() {
        for(x=1;x<this.activities.length;x++) {
            id = x;
            this.displayActivityHoursById(id);
            this.displayActivityEnergyDifferenceById(id);
        }
        this.displayTotals();
        this.updateSliders();
    },
    
    /*
     * Reset objects and display
     * @return vaoid
     */
    reset: function() {
        this.initialiseActivities();
        for(x=1;x<this.activities.length;x++) {
            this.calculateActivityEnergyDifferenceById(x);
        }
        this.updateTotals();
        this.updateDisplay();
    }

};
