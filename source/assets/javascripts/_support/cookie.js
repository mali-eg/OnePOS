(function() {
	vf.cookie = {
		settings: {
			target: '.mod-cookie'
		},

		init: function(context) {
			var s = this.settings;

			$(s.target, context).addBack(s.target).each(function() {
				var module = $(this),
					data = module.data('cookie'),
					theCookie = vf.cookie.getCookie('cookie');

				if (theCookie == "") {
					document.cookie = "cookie=" + data;

					$('.nav-vertical .tg-head').click()
				}
			});
		},

		getCookie: function(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) {
			  var c = ca[i].replace(/^\s+|\s+$/g, '');;
			  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
			}
			return "";
		},
		setCookie: function(cname, cvalue, exdays) {
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays*24*60*60*1000));
		    var expires = "expires="+d.toUTCString();
		    document.cookie = cname + "=" + cvalue + "; " + expires;
		},
		checkCookie: function(cname){
			var cvalue=vf.cookie.getCookie(cname);
			    if (cvalue!="") {
			        return true;
			    }else{
			        return false;
			    }
		}

	};
}(vf));