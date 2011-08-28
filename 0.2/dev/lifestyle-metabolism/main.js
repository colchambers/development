jQuery(document).ready(function($) {

    // form data saving
    $("#mainform").submit(lib.Save);
    
   $("#mainform").change(
       function (){
        //Lifestyle.changeScore();
        //Lifestyle.updateDisplay();
       }
   );
   
   $("#reset").click(
       function (){
        Lifestyle.reset()
       }
   );

    // online/offline event handler
	if (window.sessionStorage) {
		lib.Net.ChangeStatus();
		$(window).bind('online offline', lib.Net.ChangeStatus);
	}
	
	// load data
	lib.Load();
    
    //Lifestyle.reset(true);
    //Lifestyle.loadLifestyle();
    Lifestyle.init();
    Lifestyle.initialiseActivityDisplay();

});

function updateActivityEnergyDifference(event, ui){
    activityId = Lifestyle.inputsToActivities[ $(this).attr('id')];
    Lifestyle.updateActivityEnergyDifferences(ui.values);
}


