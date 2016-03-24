(function () {
    "use strict";

    angular
        .module("onePOS.login")
        .controller("passwordExpiredCtrl", ["$state", "loginService", "AuthService", "constants", "logger",
            passwordExpiredCtrl]);

    function passwordExpiredCtrl($state, loginService, AuthService, constants, logger) {
        jQuery(window).scrollTop(0);
        var vm = this,
            credentials = vm.credentials = {};

        vm.password_minimumLength = constants.validationRules.password_minimumLength;
        vm.password_maximumLength = constants.validationRules.password_maximumLength;
        vm.tan_minimumLength = constants.validationRules.tan_minimumLength;
        vm.tan_maximumLength = constants.validationRules.tan_maximumLength;

        vm.warnMessage = "Ihr Passwort ist abgelaufen. Nutzen Sie bitte das Formular, um Ihr Passwort zu ändern. Dafür wurde eine TAN auf Ihr Handy geschickt.";

        credentials.username = loginService.credentials.username;

        (function resetErrorMessages() {
            vm.showMatchPasswordError = false;
            vm.errorMessage = false;
        }());

        vm.submit = function () {
            if (vm.credentials.newPassword != vm.credentials.matchPassword) {
                vm.showMatchPasswordError = true;
                $(".confirmPassword-data").addClass("error");
                return false;
            }
            vm.errorMessage = false;
            console.log("ctrl: " + JSON.stringify(credentials))
            loginService.passwordReset(credentials).then(
                function (respModel) {
                    $state.go('dashboard.index');
                    loginService.successMessage = true;
                }
            ).catch(function (fault) {
                    vm.hideDefaultError = false;
                    vm.warnMessage = false;
                    vm.showDefaultMessage = false;

                    var faultCode = fault.faultMessage.code.trim();
                    if (faultCode == constants.faultStatusCodes.MTAN_EXPIRED ||
                        faultCode == constants.faultStatusCodes.MTAN_SUSPENDED ||
                        faultCode == constants.faultStatusCodes.MTAN_MAX) {
                        $state.go('login.unauthorizedUser');
                        loginService.data = fault;
                        vm.errorMessage = fault.errorData.text;
                    } else if (faultCode == constants.faultStatusCodes.MTAN_INVALID) {
                        $(".tan-data").addClass("error");
                        vm.hideDefaultError = true;

                        var remainingAttempts = parseInt(fault.faultMessage.original.NIL0V0410.max_mtan_attempts)
                            - parseInt(fault.faultMessage.original.NIL0V0410.current_mtan_attempts);
                        vm.errorMessage = fault.errorData.text.replace('_remaining_attempts_', remainingAttempts);
                    } else {
                        vm.errorMessage = fault.errorData.text;
                    }
                }
            );
        }
        vm.backLogin = function () {
            $state.go('login.index');
        }
    }
})();
