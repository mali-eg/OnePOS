/**
* Calling the genral error overlay using javascript:
* vf.overlay.open.apply(this,['Error'])
*/
(function() {
	vf.overlay = {
	    open: function(message) {
	    	// check if there already is an overlay container
			var overlayContainer = $('#error-overlay-container');

			if (overlayContainer.length < 1){
				overlayContainer = $('<div id="error-overlay-container" class="di-content"><div>' + message + '</div></div>');
				$('#content').append(overlayContainer);
			}

			var testLink = $('<a href="#error-overlay-container" class="mod mod-dialog"></a>');

			vf.dialog.open.call(testLink);
	    }
	};
}(vf));