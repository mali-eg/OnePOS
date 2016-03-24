(function () {
    "use strict";

    angular
        .module('onePOS.core')
        .factory('APIInterceptor', ['$q', '$injector', 'logger', '$rootScope', interceptor])
        .config(['$provide', '$httpProvider', function ($provide, $httpProvider) {
            // Add the interceptor to the $httpProvider.
            $httpProvider.interceptors.push('APIInterceptor');
        }]);

    function interceptor($q, $injector, logger, $rootScope) {
        var config = $injector.get('config');

        $rootScope.$on('$stateChangeStart',function (event, toState, toParams, fromState, fromParams) {
            console.log('toState.name: ' + toState.name);
            console.log('fromState.name: ' + fromState.name);
        });

        return {
            // On request success
            request: function (request) {
                var config = $injector.get('config');


                if (request.url.indexOf(config.BASE_URL) !== -1) {

                    // Start loader
                    $rootScope.loading = (request.url.indexOf("pos-contract-customer-agreement/customer-agreements") == -1);
                    var loginService = $injector.get('loginService');
                    if (loginService.data != null) {
                        request.headers['username'] = loginService.data.model.securityTokenVBO.credentials.username;
                    }

                    request.url = encodeURI(request.url);
                }

                if (request.url.indexOf(config.BASE_URL) === -1) {

                    return request;
                }

                //TODO to be removed after the integration
                //skip the access token api
                if (request.url.indexOf(config.apiURLs.ACCESS_TOKEN) === -1) {
                    var authService = $injector.get('AuthService');
                    return authService.getAccessToken().then(function (response) {
                        // var authData = $injector.get('$localStorage').getObject("authorizationData");
                        request.headers['Authorization'] = 'Bearer ' + response;
                        request.headers['Accept'] = config.apiDefaultHeaders.ACCEPT;
                        request.headers['Content-Type'] = config.apiDefaultHeaders.CONTENT_TYPE;
                        request.headers['Charset'] = config.apiDefaultHeaders.CHARSET;
                        request.headers['x-vf-ext-bp-id'] = config.apiDefaultHeaders.X_VF_ID;
                        request.headers['x-vf-target-environment'] = config.apiDefaultHeaders.ENV;
                        //request.timeout = config.defaultTimeout.timeout;

                        return request;
                    });
                }

                return request;
            },

            requestError: function (rejection) {
                // Return the promise rejection.
                return $q.reject(rejection);
            },

            response: function (response) {
                // Return the response or promise.
                return response || $q.when(response);
            }
        };
    }
})();
