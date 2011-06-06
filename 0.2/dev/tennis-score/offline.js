// page loaded
jQuery(document).ready(function($) {

    // form data saving
    $("#mainform").submit(lib.Save);
    
   $("#p1scored").click(
       function (){
        Score.increment(1)
       }
   );
   
   $("#p2scored").click(
       function (){
        Score.increment(2)
       }
   );
   
   $("#reset").click(
       function (){
        Score.reset()
       }
   );

	// online/offline event handler
	if (window.sessionStorage) {
		lib.Net.ChangeStatus();
		$(window).bind('online offline', lib.Net.ChangeStatus);
	}
	
	// load data
	lib.Load();

});

// online/offline library
var lib = lib || {};

lib.Net = function() {

	var online = true;

	// is browser online?
	function Online() { return navigator.onLine; }
	
	// online/offline event
	function ChangeStatus() {
		if (online != Online()) {
			online = Online();
			var s = $("#status");
			s.text(online ? "Online" : "Offline");
			if (online) s.removeClass("offline");
			else s.addClass("offline");
		}
	}
	
	return {
		Online: Online,
		ChangeStatus: ChangeStatus
	};

}();

// save data online or offline
lib.Save = function(e) {

	e.preventDefault();
	
	if (lib.Net.Online() || !window.sessionStorage) {
	
		// save data online
		alert("Data has been saved online.\n(But not in this demo!)");
		
	}
	else {
	
		// save data offline
		$("#mainform input").each(function(i) {
			window.sessionStorage.setItem(this.id, this.value);
		});
		alert("Data has been saved offline.");

	}

};

// load data online or offline
lib.Load = function() {

	if (lib.Net.Online() || !window.sessionStorage) {
	
		// load data online
		//alert("Currently online:\ndata could be loaded from server.");
	
	}
	else {
	
		// load data offline
		$("#mainform input").each(function(i) {
			this.value = window.sessionStorage.getItem(this.id);
		});
		alert("Data has been loaded from offline store.");

	}

};

// online/offline library
var Score = Score || {};
Score.init = function(){
    this.p1 = {}
    this.p1.gameScore = 0;
    this.p1.games = 0;
    this.p1.field = "p-1-game-score";
    this.p1.setField = "p-1-set-1";
    this.p1.button = "p1scored";
    this.p2 = {}
    this.p2.gameScore = 0;
    this.p2.games = 0;
    this.p2.field = "p-2-game-score";
    this.p2.setField = "p-2-set-1";
    this.p2.button = "p2scored";
}
Score.init();

Score.increment = function(playerId){
    //alert("playerId = "+playerId);
    var player = this.p1;
    var opponent = this.p2;
    if(playerId==2){
        player = this.p2;
        opponent = this.p1;
    }
    
    switch(player.gameScore){
        case 15:
            player.gameScore = 30;
            break;
        case 30:
            player.gameScore = 40;
            break;
        case 40:
        case 'A':
            if(opponent.gameScore==40 && player.gameScore == 40){
                player.gameScore = 'A';
                break;
            }
            
            if(opponent.gameScore== 'A'){
                opponent.gameScore = 40;
                break;
            }
            
            //win game
            player.games++
            player.gameScore = 0;
            opponent.gameScore = 0;
            break;
        default: // 0
            player.gameScore = 15;
    }
    //alert("player.gameScore = "+player.gameScore);
    //alert("player.field = "+player.field);
   // alert("player.button = "+player.button);
    
    this.updateScore();
}

Score.updateScore = function(){
     var players = [this.p1, this.p2];
    var player = null;
    for(var i in players){
        player = players[i];
        $("#"+player.field).val(player.gameScore);
        $("#"+player.button).text(player.gameScore);
        $("#"+player.setField).val(player.games);
    }
}

Score.reset = function(){
    this.p1.gameScore = 0;
    this.p2.gameScore = 0;
    this.updateScore();
}

Score.reset();