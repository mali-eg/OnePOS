(function() {
    "use strict";

    angular
        .module('onePOS.resources')
        .factory('authResources', ["$http", "util", 'config',
            authResources]);

    function authResources($http, util, config) {
        var service = {},
            request;
        service.sendCredentials = sendCredentials;
        service.sendCredentialsFederation = sendCredentialsFederation;
        service.verifyTan = verifyTan;
        service.verifyFederationTan = verifyFederationTan;
        service.generateTan = generateTan;
        service.passwordReset = passwordReset;
        service.verifyCaptcha = verifyCaptcha;
        service.loggeInUserProfile = loggeInUserProfile;
        service.logout = logout;
        return service;

        /* send credentials */
        function sendCredentials(payload){
            var url = config.apiURLs.AUTHENTICATE
            request = $http({
                method: 'post',
                data: payload,
                url: url
            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function sendCredentialsFederation(payload){
            var url = config.apiURLs.AUTHENTICATE_FEDERATION
            request = $http({
                method: 'post',
                data: payload,
                url: url
            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function verifyCaptcha(puid, captchaTxt){
            var url = config.apiURLs.CAPTCHA_VERIFICATION + "?username=" + puid + "&captcha-text=" + captchaTxt;
            request = $http({
                method: 'get',
                url: url
            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function generateTan(transactionID){
            var url = config.apiURLs.MTAN_GENERATION;
            request = $http({
                method: 'post',
                data: '',
                url: url
            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function verifyTan(payload, params){
            var username = params.username || params.puid;
            var url = config.apiURLs.MTAN_VERIFICATION + "?username=" + username;
            request = $http({
                method: 'post',
                data: payload,
                url: url
            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function verifyFederationTan(payload, params){
            var username = params.username || params.puid;
            var url = config.apiURLs.MTAN_VERIFICATION_FEDERATION + "?username=" + username;
            request = $http({
                method: 'post',
                data: payload,
                url: url
            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function passwordReset(payload) {
            var url =  config.apiURLs.PASSWORD_RESET;
            request = $http({
                method: 'post',
                data: payload,
                url: url
            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        //for User retrieval, so all modules can share the logged in User object
        function loggeInUserProfile(params) {
            var url = config.apiURLs.USERS + "?username=" + params;
            request = $http({
                method: 'get',
                cache: false,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        //logout
        function logout() {
            var url = config.apiURLs.TOKEN_INVALIDATION_DELETE;
            request = $http({
                method: 'delete',
                cache: false,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }


    }

})();
