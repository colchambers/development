
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

var TutorialStep = function(html, fieldIds, actions) {
    this.html = html;
    this.fieldIds = fieldIds;
    this.actions = actions;
}

var Lifestyle = {
    
    ACTIVITY_WORK: 1,
    ACTIVITY_REST: 2,
    ACTIVITY_PLAY: 3,
    
    ACTIVITY_HOURS_MIN: 0,
    ACTIVITY_HOURS_MAX: 24,
    
    TOTAL_ENERGY_DIFFERENCE_MIN: -10,
    TOTAL_ENERGY_DIFFERENCE_MAX: 10,
    
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
    firstUse: true,
    elementCompleteStatus: {},
    elementCompleteIds: ['human-background', 'human-size'],

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
        
        this.resetCompletedElementsDisplay();
        
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
        var differences = [];
        for(x=1;x<this.activities.length;x++){
            id = x;
            activity = this.getActivityById(id);
            totalHours += activity.hours;
            if(x<this.activities.length-1) {
                values.push(totalHours);
            }

            this.calculateActivityEnergyDifferenceById(id);
            differences.push(activity.energyDifference);
            
        }
        
        input = $( "#"+this.inputsToActivities[1]);
            input.slider({
                min: this.ACTIVITY_HOURS_MIN,
                max: this.ACTIVITY_HOURS_MAX,
        		values: values,
    			slide: updateActivityEnergyDifference
    		});
            
        input = $( "#differences-all");
            input.slider({
        		min: this.TOTAL_ENERGY_DIFFERENCE_MIN,
    			max: this.TOTAL_ENERGY_DIFFERENCE_MAX,
    			values: differences,
                disabled: true
    		});
            
        // Add values to slider handles
        children = input.children();
        var handle;
        for(x=0;x<children.length;x++) {
            activity = this.getActivityById(x+1);
            handle = $(children[x]);
            handle.text(activity.energyDifference);
            handle.addClass(this.activityNames[x]);
        }
        
        this.updateTotals();
        this.initialiseTotalsDisplay();
        this.updateDisplay();
        if(this.firstUse) {
            this.runTutorial(1);
        }
    },
    
    initialiseTotalsDisplay: function() {
        input = $( "#total-energy-difference");
            input.slider({
        		min: this.TOTAL_ENERGY_DIFFERENCE_MIN,
    			max: this.TOTAL_ENERGY_DIFFERENCE_MAX,
    			value: this.totalEnergy,
                disabled: true
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
        var differences = [];
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
            
            differences.push(activity.energyDifference);
        }
        
        
        input = $( "#differences-all");
        input.slider({values: differences});

        // Add values to slider handles
        children = input.children();
        for(x=0;x<children.length;x++) {
            activity = this.getActivityById(x+1);
            $(children[x]).text(activity.energyDifference);
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
       var id = '#total-energy-difference';
       
       element = $(id)
       element.slider({ value: this.totalEnergy});
       
       // Add values to slider handles
        children = element.children();
        console.log(children);
        for(x=0;x<children.length;x++) {
            $(children[x]).text(this.totalEnergy);
        }
       // Update on correct feedback
       correct = this.isEnergyCorrect(this.totalEnergy);
       if(correct!==this.energyCorrect) {
           this.energyCorrect = correct;
           if(this.energyCorrect) {
               element.addClass('correct');
           }
           else {
               element.removeClass('correct');
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
    },
    
    setElementCompleteStatus: function(id, status){
        
    },
    
    getActivityValueById: function(id, value) {
         var activity = this.getActivityById(id);
         var result;
         for(prop in activity){
             Out.append('prop = '+prop);
             if(prop != value){
                 continue;
             }
             result = activity[prop];
         }
         return result;
    },
    
    /*
     * Run through a tutorial wizard to explain the app and activities
     * @return void
     */
    runTutorial: function(step) {
        console.log('runTutorial: step = '+step);
        var field = $('#feedback div.content');
        var navigationElement = $('#feedback div.navigation');
        var html = '';
        var navigationHtml = '';
        var fieldIds = {};
        fieldIds.john = true;
        fieldIds.ghost = false;
        fieldIds.activities = false;
        fieldIds.hours = false;
        fieldIds.differences = false;
        fieldIds.totals = false;
        
        // Set fields to default
        //$('#human').removeClass(classComplete);
        this.resetCompletedElementsDisplay();
        
        // navigation
        var nextId = 'tutorial-next';
        var previousId = 'tutorial-previous';
        
        var tutorialSteps = [];
        // 1
        // introduction
        var html = '<p>Meet John.</p><p> John\'s isn\'t taking the best care of his body and isn\'t feeling so good.</p>'+
                '<p> His work hard play hard lifestyle puts his body out of kilter and makes him prone to weight gain.</p>';
            html+='hours '+this.getActivityValueById(this.ACTIVITY_WORK, 'hours');
        tutorialSteps.push(new TutorialStep(html));
        
        // 2
        html = '<p> Your goal is to help John by adjusting his lifestyle to bring his body and weight '+
                'back into line.</p>';
        tutorialSteps.push(new TutorialStep(html));
        
        // 3
        html = '<p>To give you an idea of what you\'re aiming for we\'ve added a ghost image of John at '+
                'his ideal weight as a target to aim for.</p>';
        tutorialSteps.push(new TutorialStep(html, {ghost: true}));
        
        // 4 make john size of ghost. animate so you see him get smaller.
        html = '<p>When John is the same size as the ghost target as he is right now you\'ve achieved the goal.</p>';
        actions = function(){
            Lifestyle.elementCompleteStatus['human-size'] = true;
        }
        tutorialSteps.push(new TutorialStep(html, {ghost: true}, actions));
        
        // 5 turn human background green
        html = '<p>Another sign that you\'ve reached the goal is the background behind John turning green. Like it has now.</p>';
        actions = function(){
            Lifestyle.elementCompleteStatus['human-background'] = true;
        }
        tutorialSteps.push(new TutorialStep(html, {ghost: true}, actions));
        
        // 6
        html = '<h2>Activities. impact on energy</h2><p>so how do you actually help John?</p><p>Johns problem is balancing his work, rest and play.</p>'
        html += '<p>He works too hard and doesn\'t leave enough time to rest and play.</p>';
        tutorialSteps.push(new TutorialStep(html, {ghost: true}));
        
        // 6
        html = '<h2>Activity controls</h2><p>the hours John spends on work, rest and play and shown in the Activites and hours fields.</p>'
        html += '<p>Right now John spends '+this.getActivityValueById(this.ACTIVITY_WORK, 'hours')+'.</p>';
        tutorialSteps.push(new TutorialStep(html, {ghost: true, activities: true, hours: true}));
        
        // 7
        html = '<h2>Activities. impact on energy</h2><p>See if you can help John by balancing his work, rest and play. You need to use the sliders '+
                ' to adjust the hours he spends on each activity. Each activity may gain or lose energy per hour. You need to </p>';
        tutorialSteps.push(new TutorialStep(html, {ghost: true, activities: true}));
        html = '<h2>The daily lifestyle (hours spent)</h2><p>Meet John. John\'s not feeling so good and isn\'t taking the best care of his body. His work hard '+
                'play hard lifestyle puts his body out of kilter and makes him prone to weight gain.</p>';
        tutorialSteps.push(new TutorialStep(html, fieldIds));
        html = '<h2>The impact of each activity</h2><p>Meet John. John\'s not feeling so good and isn\'t taking the best care of his body. His work hard '+
                'play hard lifestyle puts his body out of kilter and makes him prone to weight gain.</p>';
        tutorialSteps.push(new TutorialStep(html, fieldIds));
        html = '<h2>The cumulative impact on energy</h2><p>Meet John. John\'s not feeling so good and isn\'t taking the best care of his body. His work hard '+
                'play hard lifestyle puts his body out of kilter and makes him prone to weight gain.</p>';
        tutorialSteps.push(new TutorialStep(html, fieldIds));
        html = '<h2>final step. Show and explain reset and finish level button. call to action.</h2><p>Meet John. John\'s not feeling so good and isn\'t taking the best care of his body. His work hard '+
                'play hard lifestyle puts his body out of kilter and makes him prone to weight gain.</p>';
        tutorialSteps.push(new TutorialStep(html, fieldIds));
        
        var classComplete = 'complete';
        /*
        switch(step){
            case 1:
                /
            case 2:
                // Show targets
                
                 
                break; 
            case 3: 
                
                //$('#human').addClass(classComplete);
                
                break; 
                
            case 4:
                fieldIds['activities'] = true;
                fieldIds['hours'] = true;
                break; 
            case 5:
                fieldIds['activities'] = true;
                fieldIds['hours'] = true;
                fieldIds['differences'] = true;
                break; 
            case 6:
                fieldIds['activities'] = true;
                fieldIds['hours'] = true;
                fieldIds['differences'] = true;
                fieldIds['totals'] = true;
                break;     
        }*/
        
        if(step>1) {
            navigationHtml+= ' <div id="'+previousId+'">&lt; previous </div>';
        }
        if(step<tutorialSteps.length) {
            navigationHtml+= ' <div id="'+nextId+'">next &gt;</div>';
        }
        
        tutorialStep = tutorialSteps[step-1];
        field.html(tutorialStep.html);
        navigationElement.html(navigationHtml);
        if(tutorialStep.actions) {
            tutorialStep.actions();
        }

        //console.log('runTutorial: 1');
        if(step>1) {
            $('#'+previousId).click(function() {
                Lifestyle.runTutorial(step-1)
            });
        }
        if(step<tutorialSteps.length) {
            $('#'+nextId).click(function() {
                //console.log('step = '+step);
                Lifestyle.runTutorial(step+1)
            });
        }
        
        // merge default field ids with step specific
        this.objectToArray(tutorialStep.fieldIds, fieldIds);
        this.UpdateTutorialFieldDisplay(fieldIds);
        this.updateCompletedElementsDisplay();
        
        console.log('runTutorial: 4');
        this.firstUse = false;
    },
    
    UpdateTutorialFieldDisplay: function(fieldIds){
        var displayClass = 'hide';
        var fieldName;
        var field = null;
        for(fieldName in fieldIds){
            //console.log('display: fieldIds[fieldName] '+fieldIds[fieldName]);
            field = $('#'+fieldName);
            //console.log(field);
            if(!fieldIds[fieldName]){
                //console.log('display: hide '+fieldName);
               field.addClass(displayClass);
                continue;
            }
            //console.log('display: show '+fieldName);
            field.removeClass(displayClass);
        }
    },
    
    /*
     * convert an object to an array
     * @param object o
     * @param array a (optional)
     * @return array
     */
    objectToArray: function(o, a) {
        a = typeof(a) == 'object'?a:[];
        for(prop in o){
            a[prop] = o[prop];
        }
        return a;
    },
    
    updateCompletedElementsDisplay: function(){
        var completed = false;
        var classCompleted = 'complete';
        for(id in  this.elementCompleteStatus){
            completed = this.elementCompleteStatus[id];
            switch(id){
                case 'human-background':
                    element = $('#human');
                    if(completed){
                        element.addClass(classCompleted);
                    }
                    else {
                        element.removeClass(classCompleted);
                    }
                    break;
                case 'human-size':
                    if(completed){
                        scale = 2;
                        this.human.scale(scale, scale);
                    }
                    else {
                        this.updateHuman();
                    }
                    
                    break;
            }
        }
    },
    
    resetCompletedElementsDisplay: function(){
        for(x=0;x<this.elementCompleteIds.length;x++){
            this.elementCompleteStatus[this.elementCompleteIds[x]] = false;
        }
    }

};
