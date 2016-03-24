$(function() {

	vf.carousel = {
		settings: {
			carousel: 	  '.mod-carousel',
			blocks: 	  '.ca-body .ca-block',
			body: 		  '.ca-body',
			page: 		  '.ca-page',
			pages: 		  '.ca-pages',
			loader: 	  '.ca-load-more',
			pagination:   '.ca-pagination',
			nav: 		  '.ca-nav a',
			prime_nav: 	  '.ca-nav-primary',
			active_page:  '.ca-active',
			show: 		  '.ca-show'
		},

		init: function(context, events_bound) {

				var s = vf.carousel.settings;

				// check css3 3d transform support
				if (!('css3d' in s)) {
					var style = document.body.style;
					s.css3d = 'transform' in style || 'webkitTransform' in style;
				}

				$(s.carousel, context).addBack(s.carousel).each(function() {
					var carousel  	  = $(this),
						carousel_span = carousel.width(),
						blocks 		  = carousel.find(s.blocks),
						span 		  = carousel.data('span'),
						maxHeight     = -1,
						rotation 	  = carousel.data('auto-rotate');
						block_span	  = Math.floor(carousel_span / span);
			            translation   = block_span * span;

					blocks.innerWidth(block_span);

					// settings

					if(vf.util.layout() == 'lrg') {
						var page = carousel.data('page_no');
						var _page_no = events_bound ? page : -1;
					} else {
						var _page_no = -1; 
					}
					var start_page = page ? page : 0;

					$.extend(carousel.data(), {
						computed_span: 	span,
						page_no: 		_page_no,
						page_count:  	Math.ceil(blocks.length / span) - 1,
						translation: 	translation,
						reversed: 	 	$(blocks.get().reverse()),
						animation_span: span * 2 - 1,
						touchstart: 	0
					});

					// Don't set height and width on ca-body and blocks
					if (vf.util.layout() === 'lrg') {

						// set maxHeight to tallest block + 3px to cater for shadows
						blocks.each(function() {
							var height = $(this).outerHeight(true);
							if (height > maxHeight) maxHeight = height + 3;
						});

						// set viewport dimensions
						if(maxHeight != 0) {
							carousel.find(s.body).height(maxHeight).width(translation);
						}
						

						// set blocks initial position and visibility
						blocks.each(function(i) {
							var block = $(this),
								left = block_span * (i % span),
								visibility = 1/*,
								display = 'block'*/;

							if (s.css3d) left += translation;
							else if (i >= span) {
								visibility = 0/*;
								display = 'none'*/;
							}

							vf.carousel.hide(block, visibility);
							block.css('left', left);
						});

					} else {

						// If previosuly added height and width remove for small
						carousel.find(s.body).add(blocks).removeAttr('style');

					}

					// hide navigation if there is only one page or is sml layout
					carousel.find(s.pagination + ',' + s.prime_nav).toggle(!!carousel.data('page_count') && vf.util.layout() === 'lrg');

					// append page indicators
					vf.carousel.append_pages(carousel);

					// double binding safety net (true argument)
					if (!events_bound) {

						carousel
							.on('click', s.page, $.proxy(vf.carousel.goto_page, carousel))
							.on('interval', s.page, $.proxy(vf.carousel.goto_page, carousel))
							.on('touchstart touchmove touchend', $.proxy(vf.carousel.touch, carousel))
							.on('click', s.loader, $.proxy(vf.carousel.loadMore, carousel))
							.find(s.nav).on('click', $.proxy(vf.carousel.get_goto_page, carousel));

						// Load first set of view more elements
						carousel.find(s.loader).click();

						$(window).on('vf::resize', $.proxy(vf.carousel.init, this, context, true));

						// if auto rotate is defined, auto rotate carousel by given time interval
						if (rotation) {
							carousel.rotate = setInterval(function() {
								var page = (carousel.data('page_no') + 1) % (carousel.data('page_count') + 1);

								carousel.find(s.page).eq(page).trigger('interval');
								carousel.data('page_no', page);
							}, rotation);
						}

					} else { } //blocks.css('transform', 'translateX(0)');

					// display none on the block for keyboard accessibility
					if (vf.util.layout() == 'lrg') blocks.css('display','none');

					// go to first page
					carousel.find(s.page).eq(start_page).trigger('interval');
				});
		},

		/* find the equivalent page indicator on primary nav click */
		get_goto_page: function(e) {
			var carousel = this,
				i 		 = vf.carousel.cap(carousel.data('page_no') + $(e.currentTarget).data('direction'), 0, carousel.data('page_count')), // cap to range 0 and max page
				target 	 = carousel.find(vf.carousel.settings.page).eq(i);

			vf.carousel.goto_page.apply(carousel, [e, target]);

			// Stop flowplayer if is playing
			vf.carousel.stopFlowplayer();
		},

		/* animate carousel blocks */
		goto_page: function(e, target) {
			// Goto page not required if in small layout
			if (vf.util.layout() !== 'lrg') return;

			var carousel = this,
				s 		 = vf.carousel.settings,
				blocks 	 = carousel.find(s.blocks),
				span 	 = carousel.data('computed_span'),
				type 	 = e.type;

			if (type == 'click' || type == 'touchstart') {
				clearTimeout(carousel.rotate);
			}

			if (!target) target = $(e.currentTarget);

			if (!target.is(s.active_page)) {
				var index 		  		  = target.parent().index(),
					page_no 		  	  = carousel.data('page_no'),
					min 		  		  = index * span,
					animation_in  		  = [min, min + span - 1],
					animation_out 		  = [(page_no - 1) * span, min - 1],
					animation_out_visible = [animation_out[0] + span, animation_out[0] + carousel.data('animation_span')],
					step 				  = 0,
					translation   		  = -carousel.data('translation');

				// reverse block array if paginating to the left and recompute block index range animating out
				if (index < page_no) {
					animation_out = [min + span, animation_out_visible[1] + span];
					blocks = carousel.data('reversed');

					// Stop flowplayer if is playing
					vf.carousel.stopFlowplayer();
				}

				// animate blocks individually
				blocks.each(function(i) {

					var block 		  = $(this),
						i 	  		  = block.index(),
						animating_in  = vf.carousel.in_range(i, animation_in);

					if (animating_in) {
						block.css('display', 'block');
					}

					if (s.css3d) {
						var	animating_out = vf.carousel.in_range(i, animation_out),
							animation_id  = block.data('animation_id'),
							animate 	  = 1,
							_translation  = translation;

						if (animating_in || animating_out) {

							if (animating_out) {

								if (index > 0) {
								 _translation *= 2;

								 // Set timeout
									setTimeout(function(){
										// Removed otherwise was hiding elements if clicking navigation before the animation was finished
										/* block.css('display','none'); */
									},800);
								}

								if (index < page_no) {
									_translation  = 0;

								// Set timeout
									setTimeout(function(){
										// Removed otherwise was hiding elements if clicking navigation before the animation was finished
										/* block.css('display','none'); */
									},800);
								}

								// test: should the block animate?
								if (!vf.carousel.in_range(i, animation_out_visible)){
									animate = 0;
								}

							}

							if (animation_id) clearTimeout(animation_id);

							block.data('animation_id', setTimeout(function() {
								block.css({
									transform: 'translateX(' + _translation + 'px)',
									transitionDuration: '.' + (5 * animate) + 's'
								});
							}, step * animate * 150));

							block.toggleClass('ca-block-active', index == i);

							step += 1 * animate;

						}
					} else {
						visibility = animating_in ? 1 : 0;
						vf.carousel.hide(block, visibility);
					}
					
					// Bind lazy loading
					var lazyload = setTimeout(function(){vf.util.lazyLoad(block)}, step * animate * 200);

				});

				// set active page index
				carousel.data('page_no', index);

				// add active state to page
 				carousel.find(s.active_page).removeClass('ca-active');
 				target.addClass('ca-active');

			}

			e.preventDefault();
		},

		/* append pagination page indicators */
		append_pages: function(carousel) {
			var html = '',
				blocksLength = carousel.find(vf.carousel.settings.blocks).length,
				span = carousel.data('computed_span'),
				pageNum,
				rangeMin,
				rangeMax,
				range;

			for (var i = 0, e = carousel.data('page_count'); i <= e; i++)	{

				pageNum = i + 1;
				rangeMin = pageNum * span - span + 1;
				rangeMax = pageNum * span > blocksLength ? blocksLength : pageNum * span;
				range = rangeMin == rangeMax ? rangeMin : rangeMin + '-' + rangeMax;
				html += '<li><a href="#" class="ca-page"><span class="access">Show items ' + range + ' of ' + blocksLength + '</span></a></li>';
			}

			carousel.find(vf.carousel.settings.pages).html(html);
		},

		/* touch event handlers */
		touch: function(e) {
			var carousel = this,
				e 		 = e.originalEvent;

			switch(e.type) {
				case 'touchstart':
					carousel.data('touchstart', e.touches[0].pageX);
					break;
				case 'touchmove':
					if (Math.abs(e.touches[0].pageX - carousel.data('touchstart')) >= 25) e.preventDefault();
					break;
				case 'touchend':
					var x = e.changedTouches[0].pageX,
						i = carousel.data('touchstart');
					if (Math.abs(x - i) >= 100) carousel.find(vf.carousel.settings.nav).eq(i > x ? 1 : 0).click();
					break;
			}
		},

		/* util fn: check if x is in range of range[0](minimum) and range[1](maximum) */
		in_range: function(x, r) {
			return x >= r[0] && x <= r[1];
		},

		/* util fn: caps a value x between a(minimum) and b(maximum) */
		cap: function(x, min, max) {
			return x < min ? min : x > max ? max : x;
		},

		loadMore: function(e) {
			var carousel = this,
				s = vf.carousel.settings;

			e.preventDefault();

			if ($(s.blocks + s.show, carousel).length == 0) {

				// Show next set of elements

				$(s.blocks + ':not(' + s.show + ')', carousel).each(function(i, elem) {
					if (i < carousel.data('span')) $(elem).addClass(s.show.substring(1));
					else return false;
				});

				// Remove button if all elements are visible
				if ($(s.blocks + ':not(' + s.show + ')', carousel).length === 0) $(s.loader, carousel).remove();

			// if there are visible elements, load all remaining
			} else {
				$(s.blocks, carousel).addClass(s.show.substring(1));
				$(s.loader, carousel).remove();
			}

		},

		stopFlowplayer: function(e) {
			// Stop flowplayer video if is playing
			$('.player').each(function(){
				if ($(this).flowplayer().playing) $(this).flowplayer().stop();
			});
		},

		// Temporary fix the IE8 overlapping
		hide: function(e, visibility) {
			e.css('display', visibility ? 'block' : 'none');
			e.css('z-index', visibility);
		}
	}
}(vf));