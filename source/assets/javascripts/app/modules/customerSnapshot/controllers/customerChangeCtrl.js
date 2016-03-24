(function () {
    "use strict"

    angular
        .module('onePOS.customerSearch')
        .controller('customerChangeCtrl', ['searchCustomerService', '$state', customerChangeCtrl]);

    function customerChangeCtrl(searchCustomerService, $state) {
        // vars
        var vm = this;
        vm.messages1 = vm.customerIDChanged = false;
        vm.messages2 = [];

        vm.customerID = 1;
        // authenticate
        vm.authenticate = function () {
            // vars
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
    }
})();
