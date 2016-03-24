(function () {
    'use strict';

    angular.module('onePOS.widgets')
        .directive('autoFocus', [ '$timeout', function ($timeout) {
            return {
                restrict: 'A',
                link: function ($scope, $element, $attributes) {
                    if ($scope.$eval($attributes.autoFocus) !== false) {
                        var element = $element[0];
                        $timeout(function() {
                            $scope.$emit('focus', element);
                            element.focus();
                        });
                    }
                }
            };
        } ]);
})();
