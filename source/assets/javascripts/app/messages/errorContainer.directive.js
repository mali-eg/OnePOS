(function () {
    'use strict';
    angular
        .module('onePOS.messages')
        .directive('errorData', ['$rootScope', errorContainer]);

    function errorContainer($rootScope) {
        return {
            restrict: 'A',
            transclude: true,
            template:'<div ng-transclude></div>',
            link: function (scope, element, attrs) {
                $rootScope.$on('vf-notify', function (e,errorObj) {
                    scope.err = errorObj;
                });
            }
        }
    }
})();
