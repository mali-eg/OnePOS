/**
 * Created by Omar Makeen on 12/16/15.
 */
(function () {
    "use restrict";
    angular.module('onePOS.customerSnapshot').controller('customerOverviewCtrl', ['customerOverviewService', 'searchCustomerService', '$scope', '$uibModal', '$state', 'customerService', 'constants',
        customerOverviewCtrl]);
    function customerOverviewCtrl(customerOverviewService, searchCustomerService, $scope, $uibModal, $state, customerService,constants) {
        // vars
        var vm = this;
        vm.customerAccount = searchCustomerService.getCustomer();
        vm.skeletonWarnMessage = [];
        vm.noneSkeletonWarnMessage = [];
        vm.subscribersLimit = 0;
        vm.showWarrningMsg = false;
        vm.flows = constants.flows;

        vm.skeletonWarnMessage.push({
            text: 'This contract is used for many subscribers. Only the searched subscriberes is displayed',
            type: 'warning',
        });

        vm.noneSkeletonWarnMessage.push({
            text: 'This contract is used for many subscribers. Please specify the subscriber by MSISDN in the search',
            type: 'warning',
        });

        vm.isSkeletonCustomer = function () {
            if (vm.customerAccount.customerMasterData.skeleton)
                return true;
            else
                return false;
        }

        vm.enableNewSubscriberLink = function (banStatus, subscriberStatus) {
            if (banStatus === 'opened') {
                if (subscriberStatus === 'active' || subscriberStatus === 'closed' || subscriberStatus === 'suspended' || subscriberStatus === 'reserved') {
                    return true;
                }
            }
            return false;
        };

        vm.enableNewContractLink = function (banStatus, subscriberStatus) {
            if (banStatus === 'opened') {
                if (subscriberStatus === 'active' || subscriberStatus === 'closed' || subscriberStatus === 'suspended' || subscriberStatus === 'reserved') {
                    return true;
                }
            }
            return false;
        };

        vm.enableSubscriberDetailsLink = function (banStatus, subscriberStatus) {
            if (banStatus === 'opened') {
                if (subscriberStatus === 'active' || subscriberStatus === 'closed' || subscriberStatus === 'suspended' || subscriberStatus === 'reserved') {
                    return true;
                }
            }
            else if (banStatus === 'suspended') {
                if (subscriberStatus === 'closed' || subscriberStatus === 'suspended' || subscriberStatus === 'reserved') {
                    return true;
                }
            }
            else if (banStatus === 'tentative') {
                if (subscriberStatus === 'reserved') {
                    return true;
                }
            }
            return false;
        };

        vm.enableUpgradeFixedAreaLink = function (banStatus, subscriberStatus) {
            if (banStatus === 'opened') {
                if (subscriberStatus === 'active' || subscriberStatus === 'closed' || subscriberStatus === 'suspended' || subscriberStatus === 'reserved') {
                    return true;
                }
            }
            else if (banStatus === 'suspended') {
                if (subscriberStatus === 'closed' || subscriberStatus === 'suspended' || subscriberStatus === 'reserved') {
                    return true;
                }
            }
            else if (banStatus === 'tentative') {
                if (subscriberStatus === 'reserved') {
                    return true;
                }
            }
            return false;
        };

        vm.enableSalesFlow = function (banStatus, subscriberStatus) {
            if (banStatus === 'opened' && subscriberStatus === 'active') {
                return true;
            }
            return false;
        };

        // handle footer actions
        $scope.$parent.hideFooter = false;
        $scope.$parent.subPrevText = "Zurück zur";
        $scope.$parent.prevText = "Kundensuche";
        $scope.$parent.hidePrevBtn = false;
        $scope.$parent.prev = function () {

            $state.go("customerSearch.index");
        };

        // Availability Check
        vm.checkAvailability = function (e) {
            // open availability check modal
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/javascripts/app/partials/customer/availabilityCheck.html',
                controller: 'availabilityCheckCtrl',
                controllerAs: 'vm',
                resolve: {
                    actions: function () {
                        return {
                            onSuccess: function () {
                                // OPS-1685 - Fixed Net is preselected
                                customerService.shared = {
                                    "transactions": {
                                        "productFamily": 'Festnetz',
                                        "businessCase": 'aktivierung',
                                        "customerType": 'privat'
                                    }
                                };
                                // OPS-1685 - CTA Availability Check (fixed net) - This information is delivered to the tariff selection page
                                $state.go('customer.tariff', {
                                    customer: {
                                        existing: true,
                                        newBan: false
                                    }
                                });
                            }
                        }
                    }
                }
            });
            e.preventDefault()
        }
    }
}());
