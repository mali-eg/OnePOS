(function() {

	$.extend($.expr[':'], {
		unfilled: function(input) {
			var input = $(input);

			return !input.is('option') && input.prop('value') == '';
		}
	});

	vf.form = {
		settings: {
			  target: 'form',
			required: '.fm-required',
			   error: '.fm-error',
			 noerror: '.fm-noerror',
			 checked: ':checked, .checkbox',
			 pattern: '[data-pattern]',
			  custom: '[data-function]',
			  	data: '.fm-data',
			 onkeyup: '.fm-onkeyup',
			  errors: '.fm-errors',
			   group: '.fm-data-group',
		 errorborder: '.fm-error-border',
		 	 counter: '.fm-counter',
		 	pswmatch: '.fm-pswmatch',
		 onerequired: '.fm-onerequired'
		},

		throttle : false,

		errors: [],

		init: function(context) {
			var s = vf.form.settings;

			// Ajax links can be outside the forms
			$('a.ajax', context).on('click', vf.form.ajaxLoad);

			$(s.target, context).addBack(s.target).each(function() {
				var form = $(this);

				// Validation
				if (!form.is('[novalidate]')) {
					form.find(s.required + ',' + s.pattern + ',' + s.custom).on('change',  $.proxy(vf.form.exec, form));
					form.on('submit', vf.form.exec).attr('novalidate', true);
				}

				// Remove empty select options
				form.find('select.remove-empty').on('change', vf.form.emptyOption);

				// Check all functionality
				form.find('.check-all').closest('fieldset').on('change', 'input[type=checkbox]', vf.form.checkAll);

				// Form ajax submit
				if (form.hasClass('ajax')) form.on('submit', vf.form.ajaxLoad);

				// Input, select and button auto-submit
				form.on('change', 'input.ajax, select.ajax, .ajax input, .ajax select', vf.form.ajaxLoad);
				form.on('click', 'button.ajax, .ajax button, .ajax a.submit', vf.form.ajaxLoad);

				// Character counter
				form.find(s.counter).each(function() {
					var countInput = $(this),
						maxlenth = countInput.attr('maxlength') || 500,
						countbox = '<div class="fm-count">' + vf.config.string.charcount + '</div>';

					countInput.closest('.fm-data').append(countbox.replace(/\{int\}/, '<span>' + maxlenth + '</span>'));
					countInput.on('keyup', vf.form.charCount);
				});

				//Check for user input to prevent spam
				$("html").one('keyup mouseover click', $.proxy(vf.form.honeytrap, form));
			});
		},

		emptyOption: function(e) {
			var select = $(e.currentTarget);

			select.find('option:not([value]), option[value=""]').remove();
			select.off('change', vf.form.emptyOption);
		},

		exec: function(e) {
			var	   form = $(this),
				      s = vf.form.settings,
				onkeyup = form.is(s.onkeyup),
				  input = $(e.currentTarget),
			   pswmatch = input.data('match');


			switch (e.type) {
				case 'change':
					if (!onkeyup) break;
				case 'submit':
					if (!onkeyup) form.addClass(s.onkeyup.substring(1));
				default:
					vf.form.check.apply(e.currentTarget, [e]);
					if(pswmatch) vf.form.check.apply($(pswmatch), [e]);
					break;
			};


			if (vf.form.errors.length > 0) e.preventDefault();

		},

		check: function(e) {
			var target = $(this),
				     s = vf.form.settings,
				inputs = s.required + ',' + s.pattern + ',' + s.pswmatch + ',' + s.onerequired + ',' + s.custom,
				errors = vf.form.errors = [];

//			target.find(s.error).add(target.prev(s.error)).add(target.closest(s.data).prev(s.error)).remove();
			target.find(s.error).add(target.prev(s.error)).add(target.closest(s.data).prev(s.error)).css('display', 'none');
			target.find(s.error).add(target.prev(s.error)).add(target.closest(s.data).prev(s.error)).addClass(s.noerror.substring(1));
			target.find(s.error).add(target.prev(s.error)).add(target.closest(s.data).prev(s.error)).removeClass(s.error.substring(1));

			$.unique(target.find(inputs).addBack(inputs)).each(function() {
				var input = $(this);

				input.find(s.errorborder).addBack(s.errorborder).removeClass(s.errorborder.substring(1));

				if (input.has('[type=radio]')[0]) {

					if (!input.has(s.checked)[0]) $.proxy(vf.form.error, input)();

				} else {

					if (input.is(s.required)) {

						if (input.has(':unfilled')[0] || input.is(':unfilled') || !input.is(s.checked) && input.is('[type=checkbox]')) {

							$.proxy(vf.form.error, input)();

						} else if (input.has(s.pattern)[0] || input.is(s.pattern)) $.proxy(vf.form.match, input)();

					} else if(input.is(s.pattern))
								if (input.has(':unfilled')[0] || input.is(':unfilled') == false) $.proxy(vf.form.match, input)();

					if (input.is(s.pswmatch)) {
						vf.form.matchPassword(input);
					}
				}
				// Calling custom function
				if(input.has(s.custom)[0] || input.is(s.custom)) $.proxy(vf.form.custom, input)();
			});

			if($(s.onerequired).length > 0) {
				vf.form.oneRequired(target);
			}

			target.find(s.errors) .toggle(!!errors.length)
				  .find('ol')	  .html(errors.join('')).end()
				  .find(':header').html(vf.config.form.html.eheading.replace('{{count}}', errors.length));
		},

		match: function() {
			var target = this;

			$(target).find('input,textarea').addBack('input,textarea').each(function() {
				var   input = $(this)
				var pattern = vf.config.form.patterns[input.data('pattern')];
				if(input.data('pattern')){
					var match = $(input).val().match(pattern.match);
					if (!match){return vf.form.error.apply(target, [pattern.error]);}
				}
			});
		},

		custom: function() {
			var target = this;

			target.find('input').addBack('input').each(function() {
				var input = $(this),
				custom = vf.config.form.functions[input.data('function')];

				if(!$.proxy(custom.rule, input)())
					return vf.form.error.apply(target, [custom.error])
			});
		},

		error: function(message) {
			var 	  s = vf.form.settings,
				message = message || vf.config.form.html.required,
				   drop = this.closest(s.data).addBack('fieldset' + s.required),
			  dropgroup = this.parent('.fm-group').addBack('fieldset' + s.onerequired),
				  error = vf.config.form.html.error.replace('{{message}}', message),
				  border = $(s.group, this).length > 0 ? $(s.group, this) : this,
				  id = this.attr('id') ? this.attr('id') : this.find('input[id]:first').attr('id');

			vf.form.errors.push('<li><a href="#'+ id +'">' + message + '</a></li>');

			drop.before(error);
			dropgroup.before(error);
			drop.find('label').prepend('<span class="error access">' + vf.config.string.error + '</span>');
			border.addClass(s.errorborder.substring(1));
                        $(s.noerror).remove();
		},

		charCount: function(e) {
			var element = $(this),
				parent = element.parent('.fm-data'),
				maxlength = element.attr('maxlength') || 500,
				counter = $('.fm-counter', parent),
				remaining;

			remaining = maxlength - element.val().length;
			if (remaining < 0) {
				element.val(element.val().substr(0, maxlength));
				remaining = 0;
			}

			$('.fm-count span', parent).text(remaining);
		},

		checkAll: function(e) {
			var target = $(e.currentTarget),
				fieldset = $(e.delegateTarget),
				checker = $('.check-all input[type=checkbox]', fieldset);

			if (fieldset.data('processing')) return;
			fieldset.data('processing', true);

			if (target[0] == checker[0] && target.is(':checked')) $('input[type=checkbox]:checked', fieldset).not(checker).click()
				else if (target[0] != checker[0] && checker.is(':checked')) checker.click();

			fieldset.removeData('processing');
		},

		ajaxLoad: function(e) {
			var element = $(e.currentTarget),
				isForm = !element.is('a'),
				form = isForm ? element.closest('form') : false,
				url = isForm ? form.attr('action').split('#') : element.attr('href').split('#'),
				id = element.closest('.ajax').data('ajax') ? element.closest('.ajax').data('ajax') : '#' + url[1],
				gets = id.split('?'),
				id = gets[0],
				target = $(id);

			if (target.length == 0) return;

			e.preventDefault();
			// e.stopPropagation(); - Why is this here (PB) ??

			// Wait for form validation
			//setTimeout(function() {
				var loaderTimer;

				// Don't submit invalid forms
				if (isForm && $('.fm-error', form).length != 0) return;

				target.attr('aria-live', 'polite').css('min-height', target.height());

				loaderTimer = setTimeout(function() {
						target.html(vf.config.ajaxLoad);
				}, 1500);
				$.ajax({
					url: url[0]+"?"+gets[1],
					data: (isForm ? form.serialize() + (element.is('button') ? '&' + element.attr('name') + '=' + element.val() : '') : ''),
					success: function(data) {

						var html = $(id, data).html(),
							elementId = '#' + element.attr('id');

						if (!html) return;

						clearTimeout(loaderTimer);
						target.html(html).removeAttr('aria-live').css('min-height', '');
						//setTimeout(function(){
							vf.util.initModules(target);
						//}, 0);

						// Set focus back on element
						$(elementId, target).focus();
					}
				});

			//}, 1000);
		},

		matchPassword: function(input) {
			var password = $(input.data('match')),
				pswmatch = input.val(),
				pattern = vf.config.form.patterns[input.data('pattern')];

			if(password.val() !== pswmatch) {
				vf.form.error.apply(input, [pattern.error]);
			}
		},

		oneRequired: function(target) {
			var 	s = vf.form.settings,
			   isForm = target.is('form'),
			   target = (isForm ? target : target.closest('form')),
			   inputs = target.find(s.onerequired),
			  pattern = vf.config.form.patterns['onerequired'];

			// Get all inputs not filled
			var filledInputs = $(s.onerequired).filter(function() {
		        return $(this).val() !== "";
		    }).length;

			$('.fm-data-group'+s.onerequired).each(function(){
				var complete = true;

				$(this).find('input').each(function(){
					if($(this).val() == "") complete = false;
				});

				if(complete) filledInputs++;

		    });

			inputs.each(function() {
				var input = $(this);

				if(input.closest('.fm-data-group').length > 0) {
					input = input.closest('.fm-data-group');
				}

				input.find(s.errorborder).addBack(s.errorborder).removeClass(s.errorborder.substring(1));
				input.find(s.error).add(input.prev(s.error)).add(input.parent().prev(s.error)).remove();

				if(filledInputs > 1) {

					vf.form.error.apply(input, [pattern.more]);

				} else if (filledInputs < 1) {

					vf.form.error.apply(input, [pattern.none]);

				}
			});
		},

		honeytrap: function() {
			$('.ht-prevent').attr('value','humanuser');
		}
	};

}(vf));