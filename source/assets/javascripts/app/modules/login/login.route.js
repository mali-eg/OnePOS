(function () {
    'use strict';

    angular
        .module('onePOS.login')
        .config(['$stateProvider', '$injector',
            routeConfig]);


    function routeConfig($stateProvider, $injector) {
        //TODO replace states from constants
        // var constants = $injector.get('constants');

        $stateProvider
            .state('login.index', {
                url: '/', //for SSO federation
                templateUrl: partialsConfig.login.index,
                controller: 'loginCtrl',
                controllerAs: 'vm',
                errorFile: 'login'
            })
            .state('login.federation', {
                url: '/federation?federationID&serviceProviderName', //for SSO federation
                templateUrl: partialsConfig.login.index,
                controller: 'loginCtrl',
                controllerAs: 'vm',
                errorFile: 'login'
            })
            .state('login.mtan', {
                url: '/mtan',
                templateUrl: partialsConfig.login.mtan,
                controller: 'mtanCtrl',
                controllerAs: 'vm',
                errorFile: 'login'
            })
            .state('login.mtanFederation', {
                url: '/mtan/federation',
                templateUrl: partialsConfig.login.mtan,
                controller: 'mtanCtrl',
                controllerAs: 'vm',
                errorFile: 'login',
                params:{
                  federationID:'',
                  serviceProviderName:''
                }
                // resolve: {
                //     federationId : ['$stateParams', function($stateParams){
                //         return $stateParams.federationId;
                //     }],
                //     serviceProviderName : ['$stateParams', function($stateParams){
                //         return $stateParams.serviceProviderName;
                //     }]
                // }
            })
            .state('login.passwordForgot', {
                url: '/passwordForgot',
                templateUrl: partialsConfig.login.passwordForgot,
                controller: 'passwordForgotCtrl',
                controllerAs: 'vm',
                errorFile: 'login'
            })
            .state('login.passwordReset', {
                url: '/passwordReset',
                templateUrl: partialsConfig.login.passwordReset,
                controller: 'passwordResetCtrl',
                controllerAs: 'vm',
                errorFile: 'login'
            })
            .state('login.passwordExpired', {
                url: '/passwordExpired',
                templateUrl: partialsConfig.login.passwordReset,
                controller: 'passwordExpiredCtrl',
                controllerAs: 'vm',
                errorFile: 'login'
            })
            .state('login.unauthorizedUser', {
                url: '/unauthorizedUser',
                templateUrl: partialsConfig.login.unauthorizedUser,
                controller: 'unauthorizedUserCtrl',
                controllerAs: 'vm',
                errorFile: 'login'
            })


    }

})();
