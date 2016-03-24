(function () {
    'use strict';
    angular.module('onePOS.customer')
        .directive('customerHeader', [customerHeaderDir]);

    function customerHeaderDir() {
        customerHeaderCtrl.$inject = ['$scope', 'constants'];
        return {
            restrict: 'E',
            templateUrl: '/assets/javascripts/app/partials/customer/customerHeader.html',
            scope: {
                customerHeaderData:'='
            },
            controller: customerHeaderCtrl
        }
    }

    function customerHeaderCtrl($scope, constants) {

    }
})();
