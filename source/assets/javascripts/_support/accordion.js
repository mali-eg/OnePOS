(function() {
	vf.accordion = {
		settings: {
			target: '.mod-accordion',
			animation: {
				delay: 500
			}
		},

		init: function(context) {
			var s = this.settings;
			$(s.target, context).addBack(s.target).each(function() {

				// .mod-accordion should always have a direct child <li> or <div>
				// :first to target direc children only
				$(this).children('li, div').on('click','.ac-head:first', $.proxy(vf.accordion.toggle, $(this)));

			});
		},

		toggle: function(e) {
			e.preventDefault();
			var s = vf.accordion.settings,
				mod = $(this),
				row = $(e.delegateTarget);

			// Hide all accordions apart from the row clicked

			// This is to animate first to the target accordion and not close the current active accordions first
			// cause this will cause the offset to change
			// After reaching for the target accordion we close the previous ones and scroll to the active accordion again to
			// keep the scrollbar on it's same position
			$('html, body').animate({
				scrollTop: (row.offset().top - 10)
			}, 'slow',function(){
				mod.children('li, div').not(row).find('.ac-head:first').removeClass('ac-active');
				mod.children('li, div').not(row).find('.ac-body:first').hide();
				$(window).scrollTop($(row).offset().top - 10);
			});

			// Toggle row clicked only
			row.find('.ac-head:first').toggleClass('ac-active');
			row.find('.ac-body:first').toggle();

			//Pause video if found
			if($('.ac-body .mod-youtube iframe').length > 0){
				$('.ac-body .mod-youtube iframe').each(function(){
					$(this)[0].contentWindow.postMessage('{"event":"command","func":"' +'pauseVideo' + '","args":""}', '*');
				});
			}

			//Clear any open feedback flows
			if($('.ac-body .rate-article+.feedback-message') && $('.ac-body .rate-article+.feedback-message').length>0){
				$('.ac-body .rate-article+.feedback-message').remove();
				$('.ac-body .rate-article').removeClass('feedback-active').removeClass('feedback-no').removeClass('feedback-yes');
			}


			// We here check if the clicked target is valid and has an ID
			// Then if it has an ID and is active then we take the ID value and put it in the URL
			// If it's being closed then we check the browser for the history API support and then we remove the hash from the URL
			if($(e.currentTarget).attr('id') && $(e.currentTarget).attr('id').indexOf('#')==-1){
				if(row.find('.ac-head:first').hasClass('ac-active')){
					var sTop = $(window).scrollTop();
					window.location.hash = "#"+$(e.currentTarget).attr('id');
					$(window).scrollTop(sTop);
				}else{
					var sTop = $(window).scrollTop();
					if(window.history && history.pushState){
						history.pushState({},"",window.location.pathname);
					}else{
						window.location.hash = "";
					}
					$(window).scrollTop(sTop);
				}
			}

		}

	};

}(vf));
