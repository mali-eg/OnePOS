(function () {
    'use strict';

    angular
        .module('onePOS.widgets')
        .directive('accordionPanelHeading', [accordionPanelHeading]);

    function accordionPanelHeading() {
        return {
            transclude: true,
            restrict: "AE",
            replace: true,
            template: "",
            require: '^accordionPanel',
            link: function ($scope, $elem, $attrs, panelCtrl, transclue) {
                panelCtrl.setHeading(transclue($scope, angular.noop));
            }
        }
    }

})();
