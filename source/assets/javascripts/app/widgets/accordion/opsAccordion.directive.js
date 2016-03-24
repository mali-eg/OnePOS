(function () {
    'use strict';

    angular
        .module('onePOS.widgets')
        .directive('opsAccordion', [opsAccordion]);

    function opsAccordion() {
        return {
            restrict: "AE",
            transclude: true,
            templateUrl: '/assets/javascripts/app/widgets/accordion/accordion.tpl.html',
            controller: 'accordionController as accordionCtrl'
        }
    }


})();
