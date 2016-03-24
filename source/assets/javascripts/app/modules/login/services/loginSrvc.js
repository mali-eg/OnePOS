(function() {
    "use strict";

    angular
        .module('onePOS.login')
        .factory('loginService', ["authResources", 'AuthService', 'logger',"constants",
            loginService
        ]);



    function loginService(authResources, AuthService, logger, constants) {
        var service = {},
            resp, authResp;
        service.data = null;
        service.successMessage = null;
        service.credentials = {};

        //test ghobashy

        service.loginAuth = loginAuth;
        service.loginFederationAuth = loginFederationAuth;
        service.tanVerification = tanVerification;
        service.tanGeneration = tanGeneration;
        service.passwordForgot = passwordForgot;
        service.passwordReset = passwordReset;
        service.tanFederaitonVerification = tanFederaitonVerification;

        return service;

        function respModel(model) {
            this.model = model;
        }

        function loginAuth(credentials) {
            var payload = {
                securityTokenVBO: {
                    credentials: {
                        username: credentials.puid,
                        password: credentials.password
                    }
                }
            }
            return authResources.sendCredentials(payload).then(
                function(response) {
                    resp = new respModel(response.data);
                    //login handling for fully authenticated users
                    if (resp.model) {
                        if (!resp.model.securityTokenVBO.credentials.passwordExpired) {
                            if (resp.model.securityTokenVBO.credentials.authenticationStatus == constants.authenticationStatus.FULLY_AUTH) {
                                  //for calling User Data API in case the user is fully authenticated before being directed to dashboard
                                  AuthService.loggeInUserProfile(resp.model.securityTokenVBO.credentials.username).then(function(response) {
                                    authResp = new respModel(response.data);
                                    return authResp;
                                });
                            }
                        }
                    }
                    service.data = resp;
                    return resp;
                }
            );
        }

        function loginFederationAuth(credentials) {
            var payload = {
                securityTokenVBO: {
                    credentials: {
                        username: credentials.puid,
                        password: credentials.password,
                        federationID: credentials.federationID
                    }
                }
            }
            return authResources.sendCredentialsFederation(payload).then(
                function(response) {
                    resp = new respModel(response.data);
                    service.data = resp;
                    return resp;
                }
            );
        }

        function tanGeneration(transactionID) {
            return authResources.generateTan(transactionID).then(
                function(response) {
                    resp = new respModel(response.data);
                    return resp;
                }
            );
        }

        function tanVerification(credentials, params) {
            var payload = {
                securityTokenVBO: {
                    credentials: {
                        mtan: credentials.mtan
                    }
                }
            };
            return authResources.verifyTan(payload, params).then(
                function(response) {
                    resp = new respModel(response.data);
                    logger.debug(resp);
                    if (resp) {
                        return AuthService.loggeInUserProfile(params.username).then(function(response) {
                            authResp = new respModel(response.data);
                            return authResp;
                        });
                    }
                    return resp;
                }
            );
        }

        function tanFederaitonVerification(credentials, params) {
            var payload = {
                securityTokenVBO: {
                    credentials: {
                        mtan: credentials.mtan,
                        federationID: credentials.federationID
                    }
                }
            };
            return authResources.verifyFederationTan(payload,params).then(
                function(response) {
                    resp = new respModel(response.data);
                    logger.debug(resp);
                    return resp;
                }
            );
        }


        function passwordForgot(credentials) {

            return authResources.verifyCaptcha(credentials.puid, credentials.captchaText).then(
                function(response) {
                    resp = new respModel(response.data);
                    return resp;
                }
            );
        }

        function passwordReset(credentials) {
            logger.debug('credentials.:' + JSON.stringify(credentials));
            var payload = {
                credentialVBO: {
                    username: credentials.username,
                    newPassword: credentials.newPassword,
                    mtan: credentials.mtan
                }
            }
            return authResources.passwordReset(payload).then(
                function(response) {
                    resp = new respModel(response.data);
                    return resp;
                }
            );
        }
    }
})();
