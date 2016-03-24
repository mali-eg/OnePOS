(function () {
    "use strict";

    angular
        .module('onePOS.customer')
        .controller('addonsCtrl', ["flowID", "$scope", "$state", "$filter", "loginService", "customerService",
            addonsCtrl]);

    function addonsCtrl(flowID, $scope, $state, $filter, loginService, customerService) {
        jQuery(window).scrollTop(0);
        var vm = this,
            orderId = customerService.orderData.orderID,
            orderLineItemId = customerService.data.model.salesOrderVBO[0].parts.lineItems[0].orderLineItemID,
            model = customerService.getAddons(),
            inputs = vm.inputs = {};

        //vm.currentTarrif_name = model.tariff;
        vm.currentTarrif_name = customerService.shared.currentTariffName;
        vm.extrasList = model.addonsList;
        vm.hiddenExtrasList = model.hiddenSOCs;

        vm.panels = {
            hiddenSOCs: {
                isOpened: false
            }
        }
        //TODO: to be populated in the service
        vm.checkAllDisabled = true;
        vm.checkAll = function () {
            angular.forEach(vm.filters, function (value, $index) {
                if (value != true) {
                    vm.filters[$index] = true;
                }
                vm.checkAllDisabled = true;
            });
        };
        vm.isTheOnlyOneSelectedn = function (index, arrayOfFilters) {
            var selectedFilters = 0;
            angular.forEach(arrayOfFilters, function (filter) {
                if (filter)
                    selectedFilters++;
            });
            if (selectedFilters == 1) {
                return true && arrayOfFilters[index];
            } else {
                return false;
            }
        };
        vm.filterChange = function () {
            var allTrue = function (obj) {
                for (var o in obj) {
                    if (!obj[o]) {
                        return false
                    }
                }
                return true;
            }
            if (allTrue(vm.filters)) {
                vm.checkAllDisabled = true;
            } else {
                vm.checkAllDisabled = false;
            }
        }

        // TODO: Remove static solution
        if (customerService.firstLog) {
            angular.forEach(vm.extrasList, function (newEle, index) {
                if (newEle.code == "Deezer Musik-Flat - 1") {
                    vm.extrasList[index].checked = true;
                }
            })
        }

        if (customerService.addonsArray) {
            angular.forEach(customerService.addonsArray, function (cashedEle) {
                angular.forEach(vm.extrasList, function (newEle, index) {
                    if (cashedEle.code == newEle.code) {
                        console.log(newEle.code);
                        vm.extrasList[index].checked = true;
                    }
                })
            })
            customerService.firstLog = false;
        }


        $scope.$parent.headerTitle = "Neukunde";
        $scope.$parent.subPrevText = "Vorheriger Schritt";
        $scope.$parent.prevText = "Tarifauswahl";
        $scope.$parent.hidePrevBtn = false;
        $scope.$parent.prev = function () {
            $state.go("customer.tariff");
            customerService.addonsArray = getSelectedExtras(vm.extrasList);
        }

        $scope.$parent.subNextText = "Nächster Schritt";
        $scope.$parent.nextText = "Checkout";
        $scope.$parent.next = function () {
            if (getSelectedExtras(vm.extrasList).length) {
                customerService.addonsArray = getSelectedExtras(vm.extrasList);
                var payload = {
                    "salesOrderVBO": [{
                        "parts": {
                            "lineItems": [{
                                "productOffering": {
                                    "code": customerService.shared.currentTariff.code,
                                    "specification": "tariff-group",
                                    "product": getSelectedExtras(vm.extrasList)
                                }
                            }]
                        }
                    }]
                };

                customerService.sendProduct(orderId, orderLineItemId, payload).then(
                    function (respModel) {
                        if (respModel.model) {
                            $state.go('customer.shoppingCart');
                        }
                    }).catch(function (fault) {
                        vm.errorMessage = fault.text;
                    }
                );
            } else {
                $state.go('customer.shoppingCart');
            }
        }

        function getSelectedExtras(list) {
            var result = [];
            angular.forEach(list, function (ele) {
                    if (ele.checked) {
                        result.push({
                            code: ele.code,
                            specification: ele.specification
                        });
                    }
                }
            );

            return result;
        }
    }
})();
