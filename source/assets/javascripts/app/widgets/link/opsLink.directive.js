(function () {
    'use strict';

    angular.module('onePOS.widgets')
        .directive('opsLink', function(){
            opsLinkCtrl.$inject = ['$scope'];
            return {
                restrict: 'AE',
                replace: true,
                transclude: true,
                scope: {
                    ngModel: '='
                },
                templateUrl: '/assets/javascripts/app/widgets/link/opsLink.tpl.html',
                controller: opsLinkCtrl
            }
            function opsLinkCtrl($scope) {
                // handle validation actions here
            }
        });
})();
