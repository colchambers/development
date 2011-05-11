// page loaded
jQuery(document).ready(function($) {

	// form data saving
	$("#mainform").submit(lib.Save);

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
		alert("Currently online:\ndata could be loaded from server.");
	
	}
	else {
	
		// load data offline
		$("#mainform input").each(function(i) {
			this.value = window.sessionStorage.getItem(this.id);
		});
		alert("Data has been loaded from offline store.");

	}

};