(function () {
    'use strict';

    angular.module('onePOS.widgets')
        .directive('opsSubmit', function(){
            opsSubmitCtrl.$inject = ['$scope'];
            return {
                restrict: 'AE',
                replace: true,
                transclude: true,
                scope: {
                    ngModel: '='
                },
                templateUrl: '/assets/javascripts/app/widgets/opsSubmit/opsSubmit.tpl.html',
                controller: opsSubmitCtrl
            }
            function opsSubmitCtrl($scope) {
                // handle validation actions here\
            }
        });
})();
