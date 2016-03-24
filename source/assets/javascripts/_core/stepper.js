(function() {
    /* DEic 2014-11 // mod-stepper is derived from mod-toggle. could be combined later on. stepping-related code is marked. */
	vf.stepper = {                       // stepping-related
		settings: {
			  target: '.mod-stepper',    // stepping-related
			    head: '.tg-head',
			  header: '.tg-header',
			    body: '.tg-body',
			  active: '.tg-active',
			   modal: '.tg-modal',
			   close: '.tg-close',
			    ajax: '.tg-ajax',
			    more: '.tg-more',
			 display: '.tg-display',
			 heading: '.tg-heading'
		},

		init: function(context) {
			var s = vf.stepper.settings,
				h = vf.stepper.html = {
					modal_content: '<div class="tg-body"><div class="tg-inner-body"><div class="tg-ajax"></div><a href="#" class="tg-close">' + vf.config.string['close-modal'] + '<i class="i-close-sml"></i></a></div><div class="tg-overlay tg-close"></div></div>',
					body_wrap : '<div class="tg-modal" id="modal-bodies"></div>',
					quickview_heading: '<h3 class="tg-heading"></h3>',
					access: {
						standard: '<span class="access"><span class="tg-hide">' + vf.config.string.hide + ' </span><span class="tg-show">' + vf.config.string.show + ' </span></span>',
						standardEnd: '<span class="access">' + vf.config.string['tg-content'] + ' </span>'
					}
				};

			$(s.target, context).addBack(s.target).each(function() {
				var container = $(this),
					heads,
					close;

				// Filter out nested toggles to avoid double init
				heads = $(s.head, container).filter(function() {
					return $(this).closest(s.target)[0] == container[0];
				});

				close = $(s.close, container).filter(function() {
					return $(this).closest(s.target)[0] == container[0];
				});

				// Setup headers with ARIA roles (e.g. aria-expanded and role)
				$(heads).each(function(e) {
					var $this = $(this);
					// console.log($this);
					// if( $this.is('[data-aria="false"]')) console.log(true); else console.log(false);
					// if( !$this.data('aria')) console.log(true); else console.log(false);
					// console.log("");

					// console.log($this);
					if( $this.is('[data-aria="false"]')) return;
					// console.log("made it");

					var target = $this.children('a').length ? $this.children('a') : $this;
					// check if target has ID and use it, otherwise generate random one.
					var random = Math.floor($.now() * Math.random());
					var ariaID = target.is('[id]') ? target.attr('id') : 'aria-' + random;
					// var ariaBodyID = 'ariab-' + random;

					// Add aria-expanded roles
					if ($this.hasClass('tg-active')) {
						target.attr('aria-expanded','true');
					}
					else {
						target.attr('aria-expanded','false');
					}

					// HEADER attributes (.tg-head / a)
					target
						.attr('id', ariaID)
						// .attr('aria-controls', ariaBodyID)
						// .attr('role', 'link')
						;

					// BODY attributes (.tg-body)
					// TO DO Post accessibility testing extend to all bodys
					$this.next('.tg-body')
						.attr('aria-labelledby', ariaID)
						.attr('role','region')
						// .attr('id', ariaBodyID)
						;


				});

				container.on('click', s.head + ', ' + s.close, function(e) {

					/*
						Clicks on labels with adjacent check/radio boxes will
						trigger the click event twice, so we cancel out the click
						on the label if that is the case (isLabelWithInput)
					*/
					var trigger = $(e.target),
						isTriggerActive = trigger.closest('.tg-head').hasClass('tg-active'),
						isLabelWithInput = false,
						isRadioAndChecked = trigger.is(':radio') && trigger.is(':checked');

					if(trigger.is('label')) {
						var labelFor = trigger.attr('for'),
							linkedInput = container.find('#' + labelFor)
										  .filter(':checkbox, :radio');

						if(linkedInput.length) {
							isLabelWithInput = true;
						}

					}

					if (
						(
							!$(e.currentTarget).is(heads) &&
							!$(e.currentTarget).is(s.close)
						)
							|| isLabelWithInput
							|| (isRadioAndChecked && isTriggerActive)
						)
					{
						return;
					}

					$.proxy(vf.stepper.toggle, container, e)();

				});

				// TO DO Removed context
				// heads.prepend(vf.stepper.html.access.standard);
				// heads.append(vf.stepper.html.access.standardEnd);

			});

		},

		toggle: function(e){
			var container = this,
				scope = container.data('scope'),
				layout = vf.util.layout(),
				s = vf.stepper.settings,
				h = vf.stepper.html,
				target = $(e.currentTarget),
				hint = container.data('hint'),
				radio = container.data('radio'),
                checkbox = container.data('checkbox'),
				stepping = container.data('stepping'),  // stepping-related
				toggleVis = container.data('toggle') || false,
				active = s.active.substring(1),
				display = s.display.substring(1),
				isModal = container.is(s.modal),
				isAjax = container.is(s.ajax),
				close = target.is(s.close),
				href = target.attr('href'),
				hash = href ? href.indexOf('#') : 0,
				tabs = container.hasClass('tg-tabs'),
                steps = container.hasClass('tg-stepper'),  // stepping-related
				header = s.header,
				heading = target.data('heading'),
				body, directBody;

			// ARIA toggle attributes
			// console.log(target);
			var ariaTarget = target.is('[aria-expanded]') ? target : target.children('[aria-expanded]');
			// console.log(ariaTarget);
			// console.log("");
			if (target.hasClass('tg-active')) {
				ariaTarget.attr('aria-expanded','false');
			}
			else {
				ariaTarget.attr('aria-expanded','true');
			}

			//$(container).find('.tg-body[aria-labelledby=' + $(target).attr('id') + ']').attr('tabindex', '-1').focus();

			directBody = container.find(s.body).filter(function() {
				return $(this).closest(s.target)[0] == container[0];
			});

			//if keyboard user or on sml layout, bring to standalone page
			if (!$('body').hasClass("mouse-active") && isModal) return;
			if (isModal && layout !== "lrg") return;
			if (scope && layout != scope) return;

			// if target is the close button
			if (close) {
				body = target.closest(s.body);

			// if container is modal
			} else if (isModal) {

				if (layout == "lrg") {
					var bodyWrap = $(h.body_wrap),
						docBody = $('body'),
						keyEvent = 'keydown.escapeOverlay';

					docBody.prepend(bodyWrap);

					bodyWrap.append( $(h.modal_content));

					function closeOverlay() {
						bodyWrap.remove();
						docBody.removeClass('tg-overflow');
						docBody.off(keyEvent);
					}

					bodyWrap.on('click', s.close, function(e) {
						e.preventDefault();
						if (!$(e.currentTarget).is(s.close)) return;
						closeOverlay();
					});
					docBody.on(keyEvent, function(e){
						// ESC key
						if( e.keyCode == 27) {
							closeOverlay();
						}
					});

					body = bodyWrap.find(s.body);

				// if layout is small, we pass an empty body to escape the modal and follow link as per standard
				// althought we should never get here...
				} else {
					body = [];
				}

			// if there is only one .tg-body in the container
			} else if (directBody.length == 1) {
				body = directBody;

			// if there is more than one .tg-body, check if the next element is a .tg-body
			} else if (target.next().hasClass('tg-body')) {
				body = target.next(s.body);

			//if it's the left hand nav
			} else if (target.hasClass('nv-button')){
				body = target.parent().parent().next(s.body);

			//if there's more than one .tg-body, and it's not the next element, there should be a href,
			// or in eShop there is another
			} else {
				body = target.parent('.nav-item').next(s.body).length ? target.parent('.nav-item').next(s.body) : $(href);
			}

			// If toggles are mixed in with .tg-items that do not toggle, escape if there is no body
			if (body.length === 0) return;

			e.preventDefault();

			if (hash != 0 && hash != -1) {
				var href = target.prop('href'),
					id = href.substring(href.indexOf('#')),
					isModal = container.hasClass(s.modal.substring(1)),
					drop = isModal ? $(s.ajax, body).addBack().last() : $(s.ajax, body).addBack().first();

				if (tabs && !($(e.currentTarget).hasClass(active)) || isModal) {
					drop.css('min-height', drop.height()).attr('aria-live', 'polite').html(vf.config.ajaxLoad).delay(2000).queue(function() {
						drop.load(href + ' ' + id, function(responseText, status, req) {

							// Modal heading
							if(heading) {
								body.find('.tg-inner-body .tg-ajax').prepend(h.quickview_heading);
								body.find(s.heading).html(heading);
							}

							vf.util.initModules(drop);
							drop.css('min-height','').attr('aria-live','');
							if(status == "error") {
								drop.html( $('<div class="quickview-error">Sorry, there has been an error, please check the ajax request path: <br/><b>'+href+'</b></div>') );
							}
						});
					}).dequeue();
				}

				if (isAjax) {
					drop.load(href + ' ' + id, function(responseText, status, req) {
						vf.util.initModules(drop);
					});
				}

			}
			var activated;

			if (radio){
				activated = container.find(s.active).filter(function() {
					return $(this).closest(s.target)[0] == container[0];
				});

				// Only gets fired if there is no toggle vis data attr because otherwise this shows and then hides
				// because of the class below the 'if (radio)' function
				if (!toggleVis || (toggleVis && !target.hasClass(active))) {
					container.find(s.body).filter(function() {
						return $(this).closest(s.target)[0] == container[0];
					}).removeClass(display);
					activated.removeClass(active);
				}

				// if tabs or footer, don't close the tab, as one should always be open
				if ((target.is(activated) && !container.hasClass('tg-tabs') && !container.hasClass('tg-stepper') && !container.hasClass('footer')) || close) 
					return 0;
			}

            // stepping-related >>>
            if (stepping) {
                activated = container.find(s.active).filter(function() {
					return $(this).closest(s.target)[0] == container[0];
				});

				// Only gets fired if there is no toggle vis data attr because otherwise this shows and then hides
				// because of the class below the 'if (stepping)' function
				if (!toggleVis || (toggleVis && !target.hasClass(active))) {
					container.find(s.body).filter(function() {
						return $(this).closest(s.target)[0] == container[0];
					}).removeClass(display);
					activated.removeClass(active);
				}
				//console.log( activated );
				// if tabs or footer, don't close the tab, as one should always be open
				if ((target.is(activated) && !container.hasClass('tg-tabs') && !container.hasClass('tg-stepper') && !container.hasClass('footer') && !container.hasClass('tg-step-done')  // stepping-related
                    ) || close)
					return 0;
            }
            // <<< stepping-related


			if (!close) target.toggleClass(active);

			// Adding class active to the tg-header if exist
			if(target.parent(header).length) target.parent(header).toggleClass(active);

			// Re-written as tg-drop gets toggled no matter what. Now we check if there is a drop present (tg-active class visible)
			if (tabs || steps) {
				if (container.find('.tg-drop').length) container.find('.tg-nav').removeClass('tg-drop');
				else container.find('.tg-nav').addClass('tg-drop');
			}

			body.toggleClass(display);
			if (isModal) $('body').addClass('tg-overflow');

			//////////////////////////////////////////////////////////////////////////////////////////////////
			// Only one open at a time
			if (container.is('.tg-tooltip, .tg-flyout, .tg-dropdown')) {

				if (body.hasClass(display)) {

					// Close tooltip when a click or keyup is registered outside the container
					setTimeout(function() {
						$(document.body).bind('click.qat keyup.qat', function(e){

							if (container.has(e.target).length === 0 || (e.type == 'keyup' && !$('a, button, input, select, textarea', container).is(':focus'))) {
								$(s.active, container).trigger('click');
							}
						});
					}, 0);

					// Tooltip-side positioning
					if (container.hasClass('tooltip-side') && body.offset().left > $(window).width() - 2 * body.width()) container.addClass('tooltip-left');
						else if (container.hasClass('tooltip-side') && body.offset().left < 0) container.removeClass('tooltip-left');

				// Body bindings off
				} else {
					//console.log("not display");
					$(document.body).off('click.qat keyup.qat');
				}
			}
			//////////////////////////////////////////////////////////////////////////////////////////////////

			// Bespoke functionality for Help and Support
			// Adds second step to tooltip flyout.
			body.find('.tg-step-2').on('click', function(e) {
				var link = e.currentTarget.href.split('#'),
					url	= link[0],
					id = link[1];

				body.load(url + " #" + id, function() {
					body.css({
						'width': 'auto',
						'color': '#000',
						'position': 'relative',
						'margin-left': '-100%'
					});
					vf.util.initModules(body);
				});
				e.preventDefault();
			});

			// Trigger scroll fixes issue in IE8 lazyload
			$(window).trigger('scroll');

			// Init carousel inside body
			if ($(vf.carousel.settings.carousel, body).length > 0) $.proxy(vf.carousel.init, $(vf.carousel.settings.carousel, body), body, true)();

		}
	};
}(vf));