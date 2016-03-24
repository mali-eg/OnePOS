(function () {
    "use strict";

    angular
        .module("onePOS.login")
        .controller("loginCtrl", ["$state", "$cookieStore", "loginService", "constants", "logger", "AuthService",
            loginCtrl]);

    function loginCtrl($state, $cookieStore, loginService, constants, logger, AuthService) {
        jQuery(window).scrollTop(0);

        console.log($state.current.name);
        var vm = this,
            credentials = vm.credentials = {};

       /* AuthService.resetToken();*/




        vm.showCaptcha = false;

        if (loginService.successMessage) {
            vm.successMessage = "Sie haben Ihr Passwort geändert. Sie können sich jetzt damit einloggen."
        }

        loginService.successMessage = null;

        vm.puid_minimumLength = constants.validationRules.puid_minimumLength;
        vm.password_minimumLength = constants.validationRules.password_minimumLength;
        vm.password_maximumLength = constants.validationRules.password_maximumLength;

        vm.generateTan = function (transactionID) {
            //loginService.tanGeneration(transactionID).then(function(){
            if($state.current.name ==='login.federation')
            {
              console.log($state);
                $state.go('login.mtanFederation', {federationID: $state.params.federationID, serviceProviderName: $state.params.serviceProviderName});
            }
            else {
                $state.go('login.mtan');
            }

            //});
        }

        vm.submit = function () {
          if($state.current.name !=='login.federation'){
            loginService.loginAuth(credentials).then(
                function (respModel) {
                    if (respModel.model) {
                        var authenticationStatus = respModel.model.securityTokenVBO.credentials.authenticationStatus;
                        var passwordExpiredStatus = respModel.model.securityTokenVBO.credentials.passwordExpired;
                        var transactionID = '';
                        if (!passwordExpiredStatus) {
                            logger.log('passoword not expired checking authentication type');
                            if (authenticationStatus == constants.authenticationStatus.FIRST_FACTOR_AUTH || authenticationStatus == constants.authenticationStatus.FEDERATION_AUTH) {
                                vm.generateTan(transactionID);
                            } else if (authenticationStatus == constants.authenticationStatus.FULLY_AUTH) {
                                $state.go('dashboard.index');
                            }
                        } else if (passwordExpiredStatus) {
                            loginService.credentials = respModel.model.securityTokenVBO.credentials;
                            $state.go('login.passwordExpired');
                        }
                    }
                }
            ).catch(function (fault) {
                    vm.credentials.puid = "";
                    vm.credentials.password = "";
                    var faultCode = fault.faultMessage.code.trim();
                    if (faultCode == constants.faultStatusCodes.SUSPENDED_USER || faultCode == constants.faultStatusCodes.LOCKED_USER || faultCode == constants.faultStatusCodes.LOCKED_USER_AFTER_LOGIN) {
                        $state.go('login.unauthorizedUser');
                        loginService.data = fault;
                        vm.errorMessage = fault.faultMessage.text;
                    } else if (faultCode == constants.faultStatusCodes.WRONG_CREDENTIALS) {
                        $(".puid-data, .password-data").addClass("error");
                        var currentAttempts = fault.faultMessage.original.NIL0A0838.current_login_attempts;
                        if (currentAttempts >= constants.validationRules.LOGIN_CAPTCHA_ATTEMPTS) {
                            vm.showCaptcha = true;
                        }
                        var remainingAttempts = parseInt(fault.faultMessage.original.NIL0A0838.max_login_attempts)
                            - parseInt(fault.faultMessage.original.NIL0A0838.current_login_attempts);
                        vm.errorMessage = fault.errorData.text.replace('_remaining_attempts_', remainingAttempts);

                    } else if (faultCode == constants.faultStatusCodes.WRONG_CAPTCHA) {
                        $(".captcha-data").addClass("error");
                        vm.errorMessage = fault.faultMessage.text;
                    } else {
                        console.warn("faultCode: " + faultCode);
                        vm.errorMessage = fault.faultMessage.text;
                    }
                });
              }
              else{
                credentials.federationID = $state.params.federationID;
                loginService.loginFederationAuth(credentials).then(
                    function (respModel) {
                      if (respModel.model) {
                          var authenticationStatus = respModel.model.securityTokenVBO.credentials.authenticationStatus;
                          var passwordExpiredStatus = respModel.model.securityTokenVBO.credentials.passwordExpired;
                          var transactionID = '';
                          console.log(respModel);
                          if (!passwordExpiredStatus) {
                              logger.log('passoword not expired checking authentication type');
                              if (authenticationStatus == constants.authenticationStatus.FEDERATION_AUTH) {
                                  vm.generateTan(transactionID);
                              }
                              //TODO by ghobashy
                              //to be discussed!!
                              // else{
                              //
                              // }
                          }
                          //TODO by ghobashy
                          //to be discussed!!
                          // else if (passwordExpiredStatus) {
                          //     loginService.credentials = respModel.model.securityTokenVBO.credentials;
                          //     $state.go('login.passwordExpired');
                          // }
                      }
                    }
                ).catch(function (fault) {
                        vm.credentials.puid = "";
                        vm.credentials.password = "";
                        var faultCode = fault.faultMessage.code.trim();
                        if (faultCode == constants.faultStatusCodes.SUSPENDED_USER || faultCode == constants.faultStatusCodes.LOCKED_USER || faultCode == constants.faultStatusCodes.LOCKED_USER_AFTER_LOGIN) {
                            $state.go('login.unauthorizedUser');
                            loginService.data = fault;
                            vm.errorMessage = fault.faultMessage.text;
                        } else if (faultCode == constants.faultStatusCodes.WRONG_CREDENTIALS) {
                            $(".puid-data, .password-data").addClass("error");
                            var currentAttempts = fault.faultMessage.original.NIL0A0838.current_login_attempts;
                            if (currentAttempts >= constants.validationRules.LOGIN_CAPTCHA_ATTEMPTS) {
                                vm.showCaptcha = true;
                            }
                            var remainingAttempts = parseInt(fault.faultMessage.original.NIL0A0838.max_login_attempts)
                                - parseInt(fault.faultMessage.original.NIL0A0838.current_login_attempts);
                            vm.errorMessage = fault.errorData.text.replace('_remaining_attempts_', remainingAttempts);

                        } else if (faultCode == constants.faultStatusCodes.WRONG_CAPTCHA) {
                            $(".captcha-data").addClass("error");
                            vm.errorMessage = fault.faultMessage.text;
                        } else {
                            console.warn("faultCode: " + faultCode);
                            vm.errorMessage = fault.faultMessage.text;
                        }
                    });
                  }
        }
    }
})();
