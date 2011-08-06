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
        //Lifestyle.reset()
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
    
     $(function() {
        var x=0;
        var input;
        var difference;
        for(x=0;x<numberOfSliders;x++){
            input = $( "#inputs-"+x );
            input.slider({
    			orientation: "vertical",
    			range: "min",
    			min: 0,
    			max: 24,
    			value: Lifestyle.activityDefaultHours[x],
    			slide: updateEnergyDifference
    		});

            
    		$( "#differences-"+x ).val( input.slider( "value" ) );
        }
        
	});
    updateTotals();

});


function updateEnergyDifference(event, ui){
    input_id = $(this).attr('id');
    if(!Lifestyle.inputstoDifferences[input_id]){
        return;
    }
    
    $( '#'+Lifestyle.inputstoDifferences[input_id] ).val( ui.value );
    updateTotals();
}

function updateTotals(){
    totalEnergy = 0;
    totalHours = 0;
    for(x=0;x<numberOfSliders;x++){
        totalEnergy += $( '#differences-'+x ).val() * Lifestyle.energyDifferences[x];
        totalHours += parseInt($( '#differences-'+x ).val());
        
    }
   $( '#total-energy-difference' ).text( totalEnergy );
   $( '#total-hours' ).text( totalHours );
}
   