(function() {
    "use strict";

    angular
        .module('onePOS.login')
        .controller('unauthorizedUserCtrl', ["$state", "loginService",
            unauthorizedUserCtrl]);

    function unauthorizedUserCtrl($state, loginService){
        jQuery(window).scrollTop(0);
        var vm = this,
            credentials = vm.credentials = {};

        vm.errorMessage = loginService.data.errorData.text;

        vm.submit = function() {
            $state.go('login.index');
        }
    }
})();
