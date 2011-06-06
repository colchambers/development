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
   
   $("#mainform").change(
       function (){
        Score.changeScore();
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
    
    //Score.reset(true);
    Score.loadScore();

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

    if(e && e.preventDefault){
	    e.preventDefault();
    }
	
	
		// save data offline
	$("#mainform input").each(function(i) {
		window.sessionStorage.setItem(this.id, this.value);
	});
	//console.log("Data has been saved offline.");


};

// load data online or offline
lib.Load = function() {

	// load data offline
	$("#mainform input").each(function(i) {
		this.value = window.sessionStorage.getItem(this.id);
        Score.setFieldValue(this.id, this.value);
        console.log('loading '+this.id+' with '+this.value);
	});
	//console.log("Data has been loaded from offline store.");

};

var Field = function(name, value){
        this.name = name;
        this.value = value;
    };

// online/offline library
var Score = Score || {};
Score.init = function(){
    // tie form fields to values
    this.fields = [];
    this.fields["p-1-name"] = new Field('name', '');
    this.fields["p-1-game-score"] = new Field('gameScore', '0');
    this.fields["p-1-set-1"] = new Field('games', '0');
    this.fields["p-2-name"] = new Field('name', '');
    this.fields["p-2-game-score"] = new Field('gameScore', '0');
    this.fields["p-2-set-1"] = new Field('games', '0');
 
    this.p1 = {}
    this.p1.id = 'p-1';
    this.p1.name = '';
    this.p1.gameScore = this.fields["p-1-game-score"].value;
    this.p1.games = '0';
    this.p1.field = "p-1-game-score";
    this.p1.setField = "p-1-set-1";
    this.p1.button = "p1scored";
    this.p2 = {}
    this.p2.id = 'p-2';
    this.p2.name = '';
    this.p2.gameScore = this.fields["p-2-game-score"].value;
    this.p2.games = '0';
    this.p2.field = "p-2-game-score";
    this.p2.setField = "p-2-set-1";
    this.p2.button = "p2scored";
}
Score.init();

Score.getFieldValue = function(id){
    if(!this.fields[id]){
        //throw 'Error getting field ['+id+': field not found';
        return false;
    }
    
    return this.fields[id].value;
}

Score.setFieldValue = function(id, value){
    if(!this.fields[id]){
        //throw 'Error setting field ['+id+': field not found';
        return false;
    }
    
    this.fields[id].value = value;
}

Score.getFieldName = function(id){
    if(!this.fields[id]){
        return null;
    }
    return this.fields[id];
}

Score.increment = function(playerId){
    var player = this.p1;
    var opponent = this.p2;
    if(playerId==2){
        player = this.p2;
        opponent = this.p1;
    }
    
    switch(player.gameScore){
        case '15':
            player.gameScore = '30';
            break;
        case '30':
            player.gameScore = '40';
            break;
        case '40':
        case 'A':
            if(opponent.gameScore=='40' && player.gameScore == '40'){
                player.gameScore = 'A';
                break;
            }
            
            if(opponent.gameScore== 'A'){
                opponent.gameScore = '40';
                break;
            }
            
            //win game
            player.games++
            player.gameScore = '0';
            opponent.gameScore = '0';
            break;
        default: // 0
            player.gameScore = '15';
    }
    
    
    this.updateScore();
}

Score.loadScore = function(){
    // translate scores loaded from cache to app
    var players = [this.p1, this.p2];
    var player = null;
    for(var i in players){
        player = players[i];
        player.gameScore = this.getFieldValue(player.id+'-game-score');
        //$("#"+player.button).text(player.gameScore);
        player.games = this.getFieldValue(player.id+'-set-1');
        player.name = this.getFieldValue(player.id+'-name');
        console.log('set-1 = '+this.fields[player.id+'-set-1']);
        Out.iterate(player, 'player = ', true);
    }
    
    this.updateScore(true);
    /*var field = null;
    for(var i in this.fields){
        field = this.fields[i];
        console.log('i = '+i+': value = '+field.value);
        $('#'+i).val(field.value);
    }
    
    $("#"+this.p1.button).text(this.getFieldValue("p-1-game-score"));
    $("#"+this.p2.button).text(this.getFieldValue("p-2-game-score"));
    */
    
}
Score.updateScore = function(noSave){
    var players = [this.p1, this.p2];
    var player = null;
    for(var i in players){
        player = players[i];
        this.setFieldValue(player.id+'-game-score', player.gameScore);
        //$("#"+player.button).text(player.gameScore);
        this.setFieldValue(player.id+'-set-1', player.games);
        console.log('set-1 = '+this.fields[player.id+'-set-1']);
    }
    
    var field = null;
    for(var i in this.fields){
        field = this.fields[i];
        console.log('i = '+i+': value = '+field.value);
        $('#'+i).val(field.value);
    }
    
    $("#"+this.p1.button).text(this.getFieldValue("p-1-game-score"));
    $("#"+this.p2.button).text(this.getFieldValue("p-2-game-score"));
    
    if(!noSave){
        lib.Save();
    }
}

/*
 * Handle score changes via form
 */
Score.changeScore = function(){
    // value, playerId, field
    var fields = $('#mainform');
    
    $("#mainform input").each(function(i) {
    		//Out.append(this.id+' = '+ this.value);
            Score.setFieldValue(this.id, this.value);
		});
    
    lib.Save();
    //$("#mainform").submit();
}

Score.reset = function(noSave){
    this.p1.gameScore = '0';
    this.p1.games = '0';
    this.p2.gameScore = '0';
    this.p2.games = '0';
    this.updateScore(noSave);
}

