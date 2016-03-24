(function () {
    "use strict"

    angular
        .module('onePOS.customerSearch')
        .controller('customerSearchCtrl', ['$scope', 'searchCustomerService', '$state', customerSearchCtrl]);

    function customerSearchCtrl($scope, searchCustomerService, $state) {
        var vm = this;
        vm.messages1 = [];
        vm.messages2 = [];
        // submit action
        vm.submit = function () {
            // vars
            vm.messages1 = [];
            vm.messages2 = [];
            // reset
            vm.customerIDChanged = true;
            // ajax
            searchCustomerService.searchCustomerByID(vm.customerID).then(function (resp) {
                // vars
                // check
                if (resp.accountID) {
                    // type of autentication
                    vm.searchAutenticationType = resp.authType;
                    // reset
                    vm.customerIDChanged = false;
                }
            }).catch(function (falut) {
                // vars
                var data = falut.errorData;
                // dispaly the error
                vm.messages1.push({
                    text: data.text, // message text
                    type: 'error'
                });
                // reset
                vm.customerIDChanged = true;
            })
        };
        // authenticate
        vm.authenticate = function () {
            // vars
            vm.messages1 = [];
            vm.messages2 = [];
            // password
            if (vm.searchAutenticationBanType == 'password') {
                // search customer with pass
                searchCustomerService.searchCustomerByIDAndPass(vm.customerID, vm.customerPass)
                .then(authenticateAction).catch(function (falut) {
                    // vars
                    var data = falut.errorData;
                    // dispaly the error
                    vm.messages2.push({
                        text: data.text, // message text
                        type: 'error'
                    });
                })
            } else if (vm.searchAutenticationBanType == 'idCard') {
                // search customer with id card & birth
                searchCustomerService.searchCustomerByIdCard(vm.customerID, vm.customerDateOfBirth, vm.customerIdCard)
                .then(authenticateAction).catch(function (falut) {
                    // vars
                    var data = falut.errorData;
                    // dispaly the error
                    vm.messages2.push({
                        text: data.text, // message text
                        type: 'error'
                    });
                })
            }
        }
        // authenticate action
        var authenticateAction = function (resp) {
            // save
            searchCustomerService.saveCustomer(resp);
            // go to customer overview state
            $state.go('customerSnapshot.customerOverview',{
                accountType:resp.customerMasterData.accountType
            });
        }
        // watch customer id if changed
        $scope.$watch('vm.customerID', function (newValue, oldValue) {
            // reset
            vm.customerIDChanged = true;
        });
    }
})();
