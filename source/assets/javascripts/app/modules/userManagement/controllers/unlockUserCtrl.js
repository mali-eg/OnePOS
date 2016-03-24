(function () {
    "use strict";
    angular
        .module("onePOS.userManagement")
        .controller("unlockUserCtrl", ['$state', 'userService', 'currentUser', '$uibModalInstance', '$scope', unlockUserCtrl]);

    function unlockUserCtrl($state, userService, currentUser, $uibModalInstance, $scope) {
        // vars
        var vm = this;
        // user
        vm.currentUser = currentUser;
        // deactivate action
        vm.submit = function () {
            // send
            userService.unlockUser({
                "username": currentUser.username,
                "firstName": currentUser.onlineUser.firstName,
                "familyName": currentUser.onlineUser.familyName,
            }).then(function () {
                // go to user manager page
                $state.go('userManagement.usersList');
                // close modal
                vm.closeAction()
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
