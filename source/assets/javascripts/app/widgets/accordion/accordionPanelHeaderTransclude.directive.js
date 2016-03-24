(function () {
    'use strict';

    angular
        .module('onePOS.widgets')
        .directive('accordionPanelHeaderTransclude', [accordionPanelHeaderTransclude]);

    function accordionPanelHeaderTransclude() {
        return {
            require: '^accordionPanel',
            link: function ($scope, $elem, $attrs, panelCtrl) {
                $scope.$watch(function () {
                    return panelCtrl.heading;
                }, function (newVal, oldVal) {
                    if (newVal) {
                        $elem.find('span').html('').append(newVal);
                    }
                })
            }
        }
    }

})();
