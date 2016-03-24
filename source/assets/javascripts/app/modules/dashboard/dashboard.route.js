(function () {
    'use strict';

    angular
        .module('onePOS.dashboard')
        .config(['$stateProvider', '$urlRouterProvider',
            routeConfig]);

    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dashboard.index', {
                url: '/',
                templateUrl: '/assets/javascripts/app/partials/dashboard/index.html',
                controller: 'dashboardCtrl',
                controllerAs: 'vm'
            });
    }

})();
