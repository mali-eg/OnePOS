(function () {
    "use strict";

    angular
        .module("onePOS.login")
        .controller("mtanCtrl", ["$state", "loginService", "constants", 'logger',
            mtanCtrl]);

    function mtanCtrl($state, loginService, constants, logger) {
        jQuery(window).scrollTop(0);

        var federationID = $state.params.federationID;
        var serviceProviderName = $state.params.serviceProviderName;
        // console.clear();
        // console.log($state.params);
        // console.log('Federation(mtan):'+federationId);
        // console.log(credentials);

        var vm = this,
            credentials = vm.credentials = {};

        vm.showSSOConfirmation = false;
        vm.showDefaultMessage = true;
        vm.tan_minimumLength = constants.validationRules.tan_minimumLength;
        vm.tan_maximumLength = constants.validationRules.tan_maximumLength;

        vm.submit = function () {
            var params = loginService.data.model.securityTokenVBO.credentials;
            if($state.current.name !=='login.mtanFederation'){
              loginService.tanVerification(credentials, params).then(
                  function (respModel) {
                      $state.go('dashboard.index');
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
                      } else if (faultCode == constants.faultStatusCodes.MTAN_INVALID) {
                          $(".tan-data").addClass("error");
                          vm.hideDefaultError = true;
                          vm.errorMessage = fault.errorData.text;
                      } else {
                          vm.errorMessage = fault.errorData.text;
                      }
                  }
              );
            }
            else{
              credentials.federationID = federationID;
              loginService.tanFederaitonVerification(credentials, params).then(
                  function (respModel) {
                    //for decoding SAML assetion response
                    vm.asserion = respModel.model.securityTokenVBO.assertion;
                    vm.relayState = respModel.model.securityTokenVBO.relayState;
                    vm.federationURL = respModel.model.securityTokenVBO.serviceProviderUrl;
                    vm.showSSOConfirmation = true;
                    // document.getElementById('federationForm').submit();
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
                      } else if (faultCode == constants.faultStatusCodes.MTAN_INVALID) {
                          $(".tan-data").addClass("error");
                          vm.hideDefaultError = true;
                          vm.errorMessage = fault.errorData.text;
                      } else {
                          vm.errorMessage = fault.errorData.text;
                      }
                  }
              );
            }
        }

        vm.backLogin = function () {
            $state.go('login.index');
        }
    }
})();
