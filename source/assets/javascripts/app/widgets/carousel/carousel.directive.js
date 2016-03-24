angular.module('onePOS.widgets')
    .directive('carousel', function(){
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				span: '@dataspan'
			},
			templateUrl: '/assets/javascripts/app/widgets/carousel/carousel.html'
		};
    }).directive('carouselItemRepeat', function() {
		return {
	        restrict: 'A',
	        transclude: false,
	        link: function(scope, element) {
	            if(scope.$last) {
                	setTimeout(function(){ vf['carousel'].init(element.parents('.mod-carousel')); }, 100);
	            }
	        }
	    };
	});

