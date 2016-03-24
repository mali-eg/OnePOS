(function () {
    "use strict";

    angular
        .module('onePOS.userManagement')
        .controller('changePasswordCtrl', ['$scope', 'viewProfileService', '$state','loginService','constants',
            changePasswordCtrl]);

    function changePasswordCtrl($scope, viewProfileService, $state,loginService,constants) {
        jQuery(window).scrollTop(0);
        var vm = this,
            credentials = vm.credentials = {};
        vm.showDefaultMessage = true;
        vm.password_minimumLength = constants.validationRules.password_minimumLength;
        vm.password_maximumLength = constants.validationRules.password_maximumLength;
        vm.tan_minimumLength = constants.validationRules.tan_minimumLength;
        vm.tan_maximumLength = constants.validationRules.tan_maximumLength;

        vm.backProfile = function () {
            $state.go('userManagement.viewProfile');
        };

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
            loginService.passwordReset(credentials).then(
                function (respModel) {
                    if (respModel.model) {
                        logger.debug(credentials);
                        var tanParams = loginService.credentials;
                        $state.go('login.index');
                        loginService.successMessage = true;
                    }
                }
            ).catch(function (fault) {
                    vm.hideDefaultError = false;
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
                        vm.errorMessage = "Die TAN, die Sie eingegeben haben, ist falsch. Geben Sie bitte die richtige TAN ein. Sie haben noch _remaining_attempts_ Versuche.".replace('_remaining_attempts_', remainingAttempts);
                    } else {
                        vm.errorMessage = fault.errorData.text;
                    }
                }
            );
        }

        $scope.$parent.hideFooter = true;

      }


})();
