// page loaded
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
        //Lifestyle.setFieldValue(this.id, this.value);
        //console.log('loading '+this.id+' with '+this.value);
	});
	//console.log("Data has been loaded from offline store.");

};
