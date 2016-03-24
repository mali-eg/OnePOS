(function () {
    "use strict";
    angular
        .module("onePOS.userManagement")
        .controller("deactivateUserCtrl", ['$state', 'userService', 'currentUser', '$uibModalInstance', '$scope', deactivateUserCtrl]);

    function deactivateUserCtrl($state, userService, currentUser, $uibModalInstance, $scope) {
        // vars
        var vm = this;
        // user
        vm.currentUser = currentUser;
        // deactivate action
        vm.submit = function () {
            // send
            userService.deactivateUser(currentUser.username).then(function () {
                // go to user manager page
                $state.go('userManagement.usersList');
                // close modal
                vm.closeAction();
            });
        }
        // close modal action
        vm.closeAction = function () {
            // close modal
            $uibModalInstance.close();
        }

        $scope.$parent.hideFooter = true;
    }
})();
