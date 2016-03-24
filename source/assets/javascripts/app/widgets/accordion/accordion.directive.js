angular.module('onePOS.widgets')
.directive('accordion', function(){
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            accordion: '@dataaccordion'
        },
        templateUrl: '/assets/javascripts/app/widgets/accordion/accordion.html'
    };
}).directive('accordionItemRepeat', function() {
    return {
        restrict: 'A',
        transclude: false,
        link: function(scope, element) {
            if(scope.$last) {
                setTimeout(function(){ vf['accordion'].init(element.parents('.mod-accordion')); }, 100);
            }
        }
    };
});

