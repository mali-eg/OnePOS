(function () {
    "use strict";

    angular
        .module('onePOS.login')
        .controller('passwordForgotCtrl', ['$state', 'constants', 'loginService', 'logger', 'AuthService',
            passwordForgotCtrl]);

    function passwordForgotCtrl($state, constants, loginService, logger, AuthService) {
        jQuery(window).scrollTop(0);
        var vm = this,
            credentials = vm.credentials = {};

        //AuthService.resetToken();
       // AuthService.logout();

        vm.showCaptcha = true;
        vm.captchaApi = {};

        vm.puid_minimumLength = constants.validationRules.puid_minimumLength;


        vm.submit = function () {
            logger.debug("in passwordForgotCtrl submit:" + JSON.stringify(credentials));
            loginService.passwordForgot(credentials).then(
                function () {
                    var user = AuthService.getUser();
                    user.puid = vm.credentials.puid;
                    AuthService.setUser(user);
                    loginService.credentials = vm.credentials;
                    $state.go('login.passwordReset');
                }
            ).catch(function (fault) {
                    var faultCode = fault.faultMessage.code.trim();
                    if (faultCode == constants.faultStatusCodes.INVALID_USER) {
                        $(".puid-data").addClass("error");
                    } else if (faultCode == constants.faultStatusCodes.WRONG_CAPTCHA) {
                        $(".captcha-data").addClass("error");
                    }
                    logger.debug('passwordforgCtrl>fault:'+JSON.stringify(fault));
                    vm.errorMessage = fault.faultMessage.text;
                    vm.captchaApi.reloadCaptcha();
                }
            );
        }

        vm.backLogin = function () {
            $state.go('login.index');
        }
    }
})();
