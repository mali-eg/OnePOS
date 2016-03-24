(function () {
    'use strict';

    angular.module('onePOS.widgets')
        .directive('opsButton', function(){
            opsBtnCtrl.$inject = ['$scope'];
            return {
                restrict: 'AE',
                replace: true,
                transclude: true,
                scope: {
                    ngModel: '='
                },
                templateUrl: '/assets/javascripts/app/widgets/opsBtn/opsBtn.tpl.html',
                controller: opsBtnCtrl
            }
            function opsBtnCtrl($scope) {
                // handle validation actions here\
            }
        });
})();
