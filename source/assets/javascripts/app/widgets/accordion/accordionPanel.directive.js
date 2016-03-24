(function () {
    'use strict';

    angular
        .module('onePOS.widgets')
        .directive('accordionPanel', [accordionPanel]);

    function accordionPanel() {
        return {
            restrict: "AE",
            transclude: true,
            replace: true,
            require: '^opsAccordion',
            scope: {
                heading: "@",
                isOpen: "=?"
            },
            templateUrl: '/assets/javascripts/app/widgets/accordion/accordionPanel.tpl.html',
            link: function ($scope, $elem, $attrs, accordionCtrl) {
                accordionCtrl.addPanel($scope);

                $scope.toggleOpen = function (e) {
                    if (e) {
                        $scope.isOpen = !$scope.isOpen;
                    }
                };

                $scope.$watch('isOpen', function (newVal, oldVal) {
                    $elem.toggleClass('ops-opened', !!newVal);

                    if (!!newVal) {
                        accordionCtrl.closeOtherPanels($scope);
                    }
                });
            },
            controller: [function () {
                this.setHeading = function (elemet) {
                    this.heading = elemet;
                };
            }]
        }
    }

})();
