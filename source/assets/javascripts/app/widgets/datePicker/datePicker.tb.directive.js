(function () {
    'use strict';
    angular.module('onePOS.widgets').directive('opsDatePicker', opsDatePicker);

    function opsDatePicker() {
        return {
            restrict: 'EA',
            replace: false,
            templateUrl: '/assets/javascripts/app/widgets/datePicker/opsDatePicker.tpl.html',
            scope: {
                ngModel: "=",
                opsOptions: '=',
                opsRequired: '=',
                opsLabel: '@?',
                opsName: '=?',
                opsFormat: '=',
                innerId: '@'
            },
            link: function ($scope, elem, attrs) {
                $scope.status = {};
                $scope.open = function (e) {
                    $scope.status.opened = true;
                }
            }
        }
    }
})();
