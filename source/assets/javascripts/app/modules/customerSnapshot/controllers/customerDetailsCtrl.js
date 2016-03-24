/**
 * Created by Omar Makeen on 1/18/16.
 */

(function () {

    "use strict";

    angular.module('onePOS.customerSnapshot').controller('customerDetailsCtrl', ['$scope', '$state', 'searchCustomerService','customerDetailsService', 'customerDetails', 'constants', '$stateParams', customerDetailsCtrl]);

    function customerDetailsCtrl($scope, $state, searchCustomerService, customerDetailsService, customerDetails, constants, $stateParams) {

        var vm = this;
        vm.customerDetails = customerDetails;
        vm.customerAccount = searchCustomerService.getCustomer();

        /*console.clear()
        console.log(vm.customerDetails)*/

        // flow constant
        vm.flows = constants.flows;
        vm.message = [];
        vm.customerDetails.contract.contractMasterData.mobileNumberColor = $stateParams.mobileNumberColor;

        vm.message.push({
            text: customerDetails.contract.contractMasterData.Empfehlungen, // message text
            type: customerDetails.contract.contractMasterData.EmpfehlungsInfo, // define the message style
        });

        vm.strMask = function (str) {
            var len = str.length;
            return str.substring(0, 4) + _.repeat('*', len - 4) + str.substr(len - 2, 2)
        };

        vm.hasBalance = function () {
            if (vm.customerDetails.billing.invoiceStatus.currentBalance > 0)
                return true;
            else
                return false;
        }

        vm.downloadBillDocument = function (type, documentId, accountId) {
            customerDetailsService.getInvoiceBillDocument(type, documentId, accountId).then(
                function (data) {
                    if (data) {
                        var file = new Blob([data], {type: 'application/pdf'});
                        saveAs(file, documentId + '.pdf');
                    }
                }).catch(function (fault) {
                    vm.errorMessage = fault.text;
                }
            );
        }

        // handle footer actions
        $scope.$parent.hideFooter = false;
        $scope.$parent.subPrevText = "Zurück zur";
        $scope.$parent.prevText = "Übersicht";
        $scope.$parent.hidePrevBtn = false;
        $scope.$parent.prev = function () {
            // go to customer overview state
            $state.go('customerSnapshot.customerOverview',{
                accountType:vm.customerAccount.customerMasterData.accountType
            });
        };
    }

}());
