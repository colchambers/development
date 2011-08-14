
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
    energyMinimum: -0.5,
    energyMaximum: 0.5,
    requiredHours: 24,
    energyCorrect: false,
    hoursCorrect: false,
    human: null,

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
        
        this.drawHuman();
        
    },
    
    initialiseActivities: function() {
        this.activities[1] = new Activity(1, 'work', 0.5, 14);
        this.activities[2] = new Activity(2, 'rest', 0.5, 8);
        this.activities[3] = new Activity(3, 'play', -2, 2);
    },
    
    /*
     * @url http://raphaeljs.com/icons/
     */
    drawHuman: function () {
        
        var path = "M21.021,16.349c-0.611-1.104-1.359-1.998-2.109-2.623c-0.875,";
            path += "0.641-1.941,1.031-3.103,1.031c-1.164,0-2.231-0.391-3.105-1.031c-0.75,";
            path += "0.625-1.498,1.519-2.111,2.623c-1.422,2.563-1.578,5.192-0.35,5.874c0.55,";
            path += "0.307,1.127,0.078,1.723-0.496c-0.105,0.582-0.166,1.213-0.166,1.873c0,";
            path += "2.932,1.139,5.307,2.543,5.307c0.846,0,1.265-0.865,1.466-2.189c0.201,";
            path += "1.324,0.62,2.189,1.463,2.189c1.406,0,2.545-2.375,";
            path += "2.545-5.307c0-0.66-0.061-1.291-0.168-1.873c0.598,0.574,1.174,0.803,";
            path += "1.725,0.496C22.602,21.541,22.443,18.912,21.021,16.349zM15.808,13.757c2.362,";
            path += "0,4.278-1.916,4.278-4.279s-1.916-4.279-4.278-4.279c-2.363,0-4.28,";
            path += "1.916-4.28,4.279S13.445,13.757,15.808,13.757z";
        var width = 100;
        var height = 180;
        var x = 40;
        var y = 80;
        
        var paperGhost = Raphael('ghost', width, height, {fill: "#000", stroke: "none"});//creates canvas width=height=100px    
        this.ghost = paperGhost.path(path).attr({fill: "#0d0", "fill-opacity": 0.5,stroke: "none"});
        this.ghost.translate(x, y);
        scale = 2;
        this.ghost.scale(scale, scale);
        
        var paper = Raphael('human', width, height, {fill: "#000", stroke: "none"});//creates canvas width=height=100px
        this.human = paper.path(path).attr({fill: "#000", "fill-opacity": 0.9,stroke: "none"});
        this.human.translate(x, y);
        
        this.text = paper.text(115, 180, 'John').attr({'font-size': 20});
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
        var values = [];
        var totalHours = 0;
        for(x=1;x<this.activities.length-1;x++){
            id = x;
            activity = this.getActivityById(id);
            totalHours += activity.hours;
            values.push(totalHours);

            this.calculateActivityEnergyDifferenceById(id);
            
        }
        
        input = $( "#"+this.inputsToActivities[1]);
            input.slider({
    			min: this.ACTIVITY_HOURS_MIN,
    			max: this.ACTIVITY_HOURS_MAX,
    			values: values,
    			slide: updateActivityEnergyDifference
    		});
        
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
    
    /*
     * @param array hours values passed from slider
     */
    updateActivityEnergyDifferences: function(hours){
        var activityHours;
        var totalHours = 0;
        for(x=1;x<this.activities.length;x++){
            id = x;
            if(x<3) {
                activityHours = hours[x-1] - totalHours;
            }
            else {
                activityHours = this.ACTIVITY_HOURS_MAX-totalHours;
            }
            totalHours += activityHours;
            this.updateActivityHoursById(id, activityHours);
            this.calculateActivityEnergyDifferenceById(id);
        }
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
       
       // Update on correct feedback
       correct = this.isEnergyCorrect(this.totalEnergy);
       if(correct!==this.energyCorrect) {
           this.energyCorrect = correct;
           if(this.energyCorrect) {
               $( '#total-energy-difference' ).addClass('correct');
           }
           else {
               $( '#total-energy-difference' ).removeClass('correct');
           }
       }
       
       correct = this.isHoursCorrect(this.totalHours);
       if(correct!==this.hoursCorrect) {
           this.hoursCorrect = correct;
           if(this.hoursCorrect) {
               $( '#total-hours' ).addClass('correct');
           }
           else {
               $( '#total-hours' ).removeClass('correct');
           }
       }
    },
    
    /*
     * Update the slider values and positions
     * @return vaoid
     */
    updateSliders: function() {
        var activity;
        var values = [];
        for(x=1;x<Lifestyle.activities.length-1;x++){
            id = x;
            activity = this.getActivityById(id);
            values.push(activity.hours);
            
        }
        
        input = $( "#"+this.inputsToActivities[0]);
        input.slider({ values: values});
    },
    
    /*
     * Update the slider values and positions
     * @return vaoid
     */
    updateHuman: function() {
        if(this.totalEnergy < -7.5){
            return;
        }
        scale = 2+(this.totalEnergy/5);
        //this.human.animate({scale:}, 2000);
        this.human.scale(scale, scale);
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
        this.updateHuman();
    },
    
    /*
     * Is the energy value correct. Must be between given ranges
     * @param int value energy value
     * @return vaoid
     */
    isEnergyCorrect: function(value) {
        return  value>=this.energyMinimum && value<=this.energyMaximum;
    },
    
    /*
     * Is the hours value correct. Must be between given ranges
     * @param int value energy value
     * @return vaoid
     */
    isHoursCorrect: function(value) {
        return  value==this.requiredHours;
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
