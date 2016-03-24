(function() {
	vf.util = {

		// Standard animation scroll to
		scrollto: function(el) {
			setTimeout(function() {
				$('html, body').animate({
			        scrollTop: ($(el).offset().top - 10)
			    }, 'slow');
			}, 100);
		},
		// Fire modules based on the presence of their .mod class
		initModules: function(context) {

			var modules = [],
				unique = [],
				targets = $('.mod', context);

			// NOTE: When calling this function you CAN pass either a selector
			// string or jQuery object as the context, it will handle either.
			context = $(context);

			// No context? Set as the document
			if(context.length === 0) context = $(document);

			// If context is a valid element, add it as a target. This catches
			// instances where the context is also a module
			// NOTE: Context could reference multiple elements, hence the loop
			context.each(function(){
				if($(this).hasClass('mod')) targets = targets.add($(this));
			});


			// Loop through all targets (target are elements with .mod class)
			targets.each(function(){

				// Grab element classes & match pattern {module}
				var matches = $(this).prop('class').match(/mod-([^ ]+)/g) || 0;

				// Add module(s) to modules array
				$.each(matches, function(i){

					// NOTE: We strip out '' here as the global tag in the
					// regex causes the whole match to be returned, not just
					// the capture group #BangsHeadAgainstWall
					var module = matches[i].replace('mod-','');

					// Add only if module exists
					if (vf[module]) {
						modules.push(module);
					} else {
						if(window.globalconfig.devMode === true){
							//window.console && console.log('initModule: The module \'' + module + '\' does not exist');
						}
					}
				});
			});

			// Remove duplicate entries
			$.each(modules, function(i, n){
				if($.inArray(n, unique) === -1) unique.push(n);
			});

			// TEMPORARY fix for flowplayer
			modules = unique.reverse();

			// Fire init on each module
			$.each(modules, function(i){
				vf[modules[i]].init(context);
			});


		    // Fire helpers. Functionality that does not have selectors in the DOM e.g polyfil for placeholder or lazy loading.
			vf.util.checkedState(context);
			vf.util.placeholderPoly(context);
			vf.form.init(context);
			vf.util.mouseActive(context);
			vf.util.closeToggles(context);
			vf.util.lazyLoad(context);

			// Return list of modules
			return modules;

		},

		closeToggles: function(_context) {
			var context = _context || $('body');

			// var targets = {
			// 	heads : {
			// 		c : "tg-active",
			// 		s : ["tg-head"]
			// 	},
			// 	bodies : {

			// 	}
			// }

			// var string = "";
			// $.each(targets.heads.s, function(index, val){
			// 	string += val + " ";
			// });
			// string = string.trim();

			// context.on('keydown', function(e){
			// 	$('tg-head tg-body', context).removeClass('tg-active tg-display');
			// });

			context.on('click.qat keydown.qat', function(e){

				var targets = $('.tg-tooltip, .tg-flyout, .tg-dropdown .tg-modal');
				// console.log(e.target);
				// console.log(targets.has(e.target).length);

				// console.log("dat event " + e.type);
				if (targets.has(e.target).length === 0 || (e.type == 'keyup' && !$('a, button, input, select, textarea', container).is(':focus'))) {
					$(".tg-active", targets).trigger('click');
				}

			});

		},

		config: function(get) {
			if(typeof vf.config[get] !== 'undefined') return vf.config[get];
			return false;
		},

		// Utilty function for monitoring all checkbox and radio input states
		checkedState: function(context) {

			var targets = $(':checkbox, :radio', context);

			// NOTE: When calling this function you CAN pass either a selector
			// string or jQuery object as the context, it will handle either.

			// If context is a valid element, add it as a target. This catches
			// instances where the context is also a checkbox or radio input
			// NOTE: Context could reference multiple elements, hence the loop
			context.each(function(){
				if($(this).is(':checkbox, :radio')) targets = targets.add($(this));
			});

			var trigger = function(input) {

				var label = $('label').filter('[for="' + input.prop('id') + '"]'),
					type = (input.is(':radio')) ? 'radio' : 'checkbox';

				if (input.is(':focus')) {
					label.addClass('fm-focus');
				}
				else if (!input.is(':focus')) {
					label.removeClass('fm-focus');
				}

				if(input.is(':checked')) {
					if(type == 'radio') radio(input, off);
					on(input, label, type);
				} else {
					off(input, label, type);
				}
			};

			var radio = function(input) {
				$(':radio').filter('[name="' + input.prop('name') + '"]').not(input).each(function(){
					var	input = $(this),
						label = $('label').filter('[for="' + input.prop('id') + '"]'),
						type = (input.is(':radio')) ? 'radio' : 'checkbox';

					off(input, label, type);
				});
			};

			var on = function(input, label, type) {
				label.addClass('checked');
			};

			var off = function(input, label, type) {
				label.removeClass('checked');
			};

			// Bind to change event
			$('body').off('change'); // This may need to be scoped to remove only the trigger function
			$('body').on('change focus blur', ':checkbox, :radio', function(e){
				trigger($(this));
			});

			// Trigger initial state
			targets.each(function(){
				trigger($(this));
			});

			return targets;
		},
		focus: function(target) {
				target = $(target);
				var index = target.attr('tabindex');

				if(typeof index == 'undefined') {
					target.attr('tabindex', '0');
					setTimeout(function(){
						target.removeAttr('tabindex');
					}, 100);
				}
				target.focus();
		},

		mouseActive: function(context) {
			var body = $('body', context);

			// Add class
			body.on('mousedown', function() {
				body.addClass('mouse-active');
			});

			// Remove class
			body.on('keydown', function() {
				body.removeClass('mouse-active');
			});

		},

		// Polyfill for placeholder support in older browsers
		placeholderPoly: function(context) {

			function ph_clear(input, placeholder) {

				// Remove placeholder text and class if present in input
				if(input.val() === placeholder) {
					input.val('').removeClass('placeholder');
				}
			}

			function ph_set(input, placeholder) {
				// Add placeholder text and class if input value is empty or equal to placeholder
				if(input.val() === '' || input.val() === placeholder) {
					input.val(placeholder).addClass('placeholder');
				}
			}

			// Detect support for placeholder
			if (("placeholder" in document.createElement("input"))) return false;

			// Loop through inputs with a placeholder attribute
			var placeholders = $(":input[placeholder]", context).addBack(":input[placeholder]");
			placeholders.each(function(){

				var input = $(this),
					placeholder = input.attr('placeholder'),
					form = input.closest('form');

				ph_set(input, placeholder);

				// Bind to focus event on input
				input.bind("focus", function() {		ph_clear(input, placeholder); });

				// Bind to blur event on input
				input.bind("blur", function() {			ph_set(input, placeholder); });

				// Clear placeholder text on form submit
				form.bind("submit", function() {		ph_clear(input, placeholder); });

				// Clear placeholder text on closing page
				$(window).bind("unload", function() {	ph_clear(input, placeholder); });

			});

			return placeholders;
		},

		layout: function() {
			var layout = "sml";

			if ($('#media-layout').css('display') == 'none') layout = "lrg";

			return layout;

		},

		lazyLoad: function(context) {

			// Bind events
			$(window).on('vf::resize scroll click', updateLazyImage);

			// Startup
			updateLazyImage();

			function updateLazyImage() {
				context.find('img[data-src]:not(.lazyloaded)').each(function() {
					var img = $(this);

					if (!vf.util.inViewport(img)) return true;

					setTimeout(function() {
						if (!img.hasClass('lazyloaded') && !img.parent().hasClass('lazyloader')) img.wrap('<span class="lazyloader">');
					}, 1500);

					img.attr('src', img.data('src')).removeData('src')
						.ready(function() {
							img.addClass('lazyloaded');

							// Remove height if set in the HTML post load
							img.removeAttr('height').removeAttr('width');

							// Trigger lazyloaded event for other modules to use (equal height)
							//setTimeout(function() {
								$(window).trigger('vf::lazyloaded');
							//}, 0);
						});
				});
			}
		},

		inViewport : function(element) {

			var win = $(window);
			var viewport = {
				top : win.scrollTop(),
				left : win.scrollLeft()
			};
			viewport.right = viewport.left + win.width();
			viewport.bottom = viewport.top + win.height();

			var bounds = element.offset();
		    bounds.right = bounds.left + element.outerWidth();
		    bounds.bottom = bounds.top + element.outerHeight();

		    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
		}
	};
}(vf));
