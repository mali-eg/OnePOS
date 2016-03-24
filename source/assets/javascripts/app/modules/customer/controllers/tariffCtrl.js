(function () {
    "use strict";

    angular
        .module('onePOS.customer')
        .controller('tariffCtrl', ["flowID", "$scope", "$state", "$filter", "loginService", "customerService", "tariffsManager", "data", "$uibModal", "constants",
            tariffCtrl]);

    function tariffCtrl(flowID, $scope, $state, $filter, loginService, customerService, tariffsManager, tariffsData, $uibModal, constants) {

        jQuery(window).scrollTop(0);
        var vm = this,
            username = loginService.data.model.securityTokenVBO.credentials.username,
        //username = "ops_1",
            inputs = vm.inputs = {},
            extrasList = [],
            portingData_model = customerService.getPortingData(),
            prepaidData_model = customerService.getPrepaidData(),
            fixednetData_model = customerService.getFixednetData(),
            existingOrder = false;

        var tariffsFilters = [{
            name: "Red",
            selected: true
        }, {
            name: "Smart",
            selected: true
        }, {
            name: "DataGo",
            selected: true
        }, {
            name: "Andere",
            selected: true
        }];

        vm.data = {
            tariffsArr: tariffsData.tariffs,
            //filterList: tariffsData.filters,
            filterList: tariffsFilters,
            promotions: tariffsData.promotions,
            discounts: tariffsData.discounts,
            /*subsidies: "",*/
            hardwareArr: customerService.getHardwareData(),
            simNum: "",
            imeiNum: ""
        };
        vm.porting_data = {
            simTypes: portingData_model.simType
        }
        vm.prepaidData_model = {
            tariffsArr: prepaidData_model.tariffGroup
        }
        vm.fixednetData_model = {
            tariffsArr: fixednetData_model.tariffGroup,
            bandwidth: fixednetData_model.bandwidth,
            regionalFee: fixednetData_model.regionalFee,
            hardwareArr: fixednetData_model.hardwareArr/*,
             promotions: fixednetData_model.tariffGroup,
             discounts: fixednetData_model.tariffGroup*/
        }


        vm.selectedHardware = false; // will be modified from the change hardware modal
        vm.selectedAddress = false;  // will be modified from the availability check modal
        //TODO: subsidies unavailable
        vm.subsidiesAvailable = true;
        /*vm.subsidiesAvailable = function () {
         if (vm.data.subsidies.length) {
         return true;
         } else {
         return false
         }
         }
         console.log("subsidies: " + vm.subsidiesAvailable)*/
        //TODO: ENDOF subsidies unavailable

        vm.changeHardware = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/javascripts/app/partials/customer/tariffHardware.html',
                controller: 'tariffHardwareCtrl',
                controllerAs: 'vm',
                resolve: {
                    hardwareData: function () {
                        return vm.data.hardwareArr;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                if (selectedItem) {
                    vm.selectedHardware = selectedItem;
                } else {
                    if (!vm.selectedHardware) {
                        vm.hardware = "nonHardware";
                    }
                }
            });
        };

        $scope.$watch(function () {
            return vm.hardware;
        }, function (newVal) {
            if (newVal == "hardwareDelivery") {// && !$scope.customerHeader.currentCustomer
                if (customerService.selectedHardware) {
                    vm.selectedHardware = customerService.selectedHardware;
                } else if (!vm.selectedHardware) {
                    vm.changeHardware();
                }
            }
        }, true);

        //region get data from saved previous step
        if (customerService.shared.transactions) {
            vm.productFamily = customerService.shared.transactions.productFamily;
            vm.businessCase = customerService.shared.transactions.businessCase;
            vm.customerType = customerService.shared.transactions.customerType;
        }
        if (customerService.shared.currentTariff && vm.data.tariffsArr && !existingOrder) {
            var tempTariff = getTariffByCode(vm.data.tariffsArr, customerService.shared.currentTariff.code);
            selectTariff(tempTariff);
            if (customerService.shared.currentFormData) {
                vm.inputs = {
                    simNumber: customerService.shared.currentFormData.currentSimNumber || "",
                    imeiNumber: customerService.shared.currentFormData.currentImeiNumber || ""
                };
            }
        } else if (vm.data.tariffsArr && existingOrder) {
            var forcedTariffData = customerService.forcedTariff,
                tempTariff = getTariffByCode(vm.data.tariffsArr, customerService.forcedTariff.code);
            selectTariff(tempTariff);
        } else {
            selectTariff(vm.data.tariffsArr[0]);
        }
        /*if (customerService.shared.extrasArray) {
         angular.forEach(customerService.shared.extrasArray, function (cashedEle) {
         angular.forEach(vm.extrasList, function (newEle, index) {
         if (cashedEle.code == newEle.code) {
         vm.extrasList[index].checked = true;
         }
         })
         })
         }*/
        if (customerService.shared.promotions && customerService.shared.promotions.length > 0) {
            vm.data.promotions = reselectAddon(vm.data.promotions, customerService.shared.promotions);
        }
        if (customerService.shared.discounts && customerService.shared.discounts.length > 0) {
            vm.data.discounts = reselectAddon(vm.data.discounts, customerService.shared.discounts);
        }

        if (customerService.shared.currentFormData) {
            vm.subsidy = customerService.shared.currentFormData.currentHandset;
            vm.hardware = customerService.shared.currentFormData.currentHardware;
        }


        //endregion

        // tariff selection Logic
        vm.selectTariff = function (ele) {
            vm.inputs = false;
            selectTariff(ele);
        };

        //region filters logic handling
        vm.checkAllDisabled = true;
        vm.checkAll = function () {
            angular.forEach(vm.filters, function (value, $index) {
                if (value != true) {
                    vm.filters[$index] = true;
                }
                vm.checkAllDisabled = true;
            });
        };
        vm.filterChange = function () {
            //var allTrue = function (obj) {
            //    for (var o in obj) {
            //        if (!obj[o]) {
            //            return false
            //        }
            //    }
            //    return true;
            //}
            //if (allTrue(vm.filters)) {
            //    vm.checkAllDisabled = true;
            //} else {
            //    vm.checkAllDisabled = false;
            //}
            vm.checkAllDisabled = getElementsWithPropertyVal(vm.data.filterList, function (filter) {
                    return filter.selected;
                }).length === vm.data.filterList.length;
        };
        $scope.$watch(function () {
            return vm.filters;
        }, function (newVal) {
            angular.forEach(newVal, function (val, key) {
                if (!val && vm.selected.category === key) {
                    selectTariff($filter('category')(vm.filteredTarrifs, vm.filters)[0]);
                }
            });
        }, true);

        vm.isTheOnlyOneSelectedn = function (filter) {
            //var selectedFilters = 0;
            //angular.forEach(arrayOfFilters, function (filter) {
            //    if (filter)
            //        selectedFilters++;
            //});
            //if (selectedFilters == 1) {
            //    return true && arrayOfFilters[key];
            //} else {
            //    return false;
            //}
            var selectedFilters = getElementsWithPropertyVal(vm.data.filterList, function (filter) {
                return filter.selected;
            });
            return selectedFilters.length === 1 && angular.equals(selectedFilters[0], filter);
        };
        //endregion

        //function getSelectedExtras(list) {
        //    var result = [];
        //    angular.forEach(list, function (ele) {
        //            if (ele.checked) {
        //                result.push(ele);
        //            }
        //        }
        //    );
        //    return result;
        //}

        function getTariffByCode(list, code) {
            var res = null;
            for (var i = 0; list.length > i; i++) {
                if (list[i].code == code) {
                    res = list[i];
                }
            }
            return res;
        }

        // Availability Check
        vm.checkAvailability = function (e) {
            // open availability check modal
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/javascripts/app/partials/customer/availabilityCheck.html',
                controller: 'availabilityCheckCtrl',
                controllerAs: 'vm',
                resolve: {
                    actions: function () {
                        return {}
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                if (selectedItem) {
                    vm.selectedAddress = selectedItem;
                } else {
                    if (!vm.selectedAddress) {
                        vm.productFamily = "mobilvertrage";
                    }
                }
            });
        }


        $scope.$watch(function () {
            return vm.productFamily;
        }, function (newVal) {
            if (customerService.selectedAddress) {
                vm.selectedAddress = customerService.selectedAddress;
            } else if (newVal == "festnetz" && !$scope.customerHeader.currentCustomer) {
                if (!vm.selectedAddress) {
                    vm.checkAvailability();
                }
            }
        }, true);

        // TODO: to be handeled by the CMS
        $scope.$parent.headerTitle = "Neukunde";
        $scope.$parent.progressState = 1;
        $scope.$parent.hidePrevBtn = false;
        // to get current customer if exists
        if ($scope.customerAccount) {
            // TODO: to be handeled by the CMS
            $scope.$parent.subPrevText = "Back to";
            $scope.$parent.prevText = "Overview";
            $scope.$parent.prev = function () {
                // go to customer overview state
                $state.go('customerSnapshot.customerOverview', {
                    accountType: $scope.customerAccount.customerMasterData.accountType
                });
            };
        } else {
            // TODO: to be handeled by the CMS
            $scope.$parent.subPrevText = "Zurück zu";
            $scope.$parent.prevText = "Startseite";
            $scope.$parent.prev = function () {
                $state.go("dashboard.index");
            };
        }

        $scope.$parent.subNextText = "Nächster Schritt";
        $scope.$parent.nextText = "Tarifoptionen";
        $scope.$parent.next = function () {
            var selectedPromotions = getSelectedaAddons(vm.data.promotions);
            var selectedDiscounts = getSelectedaAddons(vm.data.discounts);

            customerService.postTariff(customerService.orderData.orderID, customerService.orderData.parts.lineItems[0].orderLineItemID, {
                code: vm.selected.code,
                simNumber: vm.inputs.simNumber,
                imeiNumber: vm.inputs.imeiNumber,
                discounts: selectedDiscounts,
                promotions: selectedPromotions
            }).then(function (res) {
                customerService.shared = {
                    "currentTariff": vm.selected,
                    "currentTariffName": vm.selected.name,
                    "currentFormData": {
                        "currentHandset": vm.subsidy,
                        "currentHardware": vm.hardware,
                        "currentSimNumber": vm.inputs.simNumber,
                        "currentImeiNumber": vm.inputs.imeiNumber
                    },
                    "discounts": selectedDiscounts,
                    "promotions": selectedPromotions,
                    "transactions": {
                        "productFamily": vm.productFamily,
                        "businessCase": vm.businessCase,
                        "customerType": vm.customerType
                    },
                    //"extrasList": extrasList,
                    //"extrasArray": getSelectedExtras(vm.extrasList)
                };

                //console.log(JSON.stringify(customerService.shared.currentFormData))
                $state.go('customer.addons');
            });

        };


        //vm.data = {
        //    tariffsArr: [{
        //        template: "",
        //        tariffName: "&lt;p&gt;CallYa OpenEnd Internet&lt;/p&gt;",
        //        scheme: "",
        //        description: "()",
        //        prepaidTariffDuration: "",
        //        tariffDetailsLink: "http://eweb8.vfd2-testnet.de/privat/callya-prepaid-karte/callya-openend-smartphone.htm",
        //        bulletpoints: [
        //            {
        //                icon: "",
        //                text: "Es tut uns leid. Zu diesem Tarif liegen keine Infos vor."
        //            }
        //        ]
        //    }, {
        //        template: "",
        //        tariffName: "&lt;p&gt;CallYa OpenEnd Talk&amp;amp;SMS&lt;/p&gt;",
        //        scheme: "",
        //        description: "()",
        //        prepaidTariffDuration: "",
        //        tariffDetailsLink: "http://eweb8.vfd2-testnet.de/privat/callya-prepaid-karte/callya-openend-smartphone.htm",
        //        bulletpoints: [
        //            {
        //                icon: "",
        //                text: "Es tut uns leid. Zu diesem Tarif liegen keine Infos vor."
        //            }
        //        ]
        //    }, {
        //        template: "",
        //        tariffName: "&lt;p&gt;CallYa OpenEnd Talk&amp;amp;SMS&lt;/p&gt;",
        //        scheme: "",
        //        description: "()",
        //        prepaidTariffDuration: "",
        //        tariffDetailsLink: "http://eweb8.vfd2-testnet.de/privat/callya-prepaid-karte/callya-openend-smartphone.htm",
        //        bulletpoints: [
        //            {
        //                icon: "",
        //                text: "Es tut uns leid. Zu diesem Tarif liegen keine Infos vor."
        //            }
        //        ]
        //    }, {
        //        template: "",
        //        tariffName: "&lt;p&gt;CallYa Smartphone Fun M&lt;/p&gt;",
        //        scheme: "",
        //        description: "()",
        //        prepaidTariffDuration: "",
        //        tariffDetailsLink: "http://eweb8.vfd2-testnet.de/privat/callya-prepaid-karte/callya-openend-smartphone.htm",
        //        bulletpoints: [
        //            {
        //                icon: "",
        //                text: "Es tut uns leid. Zu diesem Tarif liegen keine Infos vor."
        //            }
        //        ]
        //    }, {
        //        template: "",
        //        tariffName: "&lt;p&gt;CallYa Smartphone Allnet Basic&lt;/p&gt;",
        //        scheme: "",
        //        description: "()",
        //        prepaidTariffDuration: "",
        //        tariffDetailsLink: "http://eweb8.vfd2-testnet.de/privat/callya-prepaid-karte/callya-openend-smartphone.htm",
        //        bulletpoints: [
        //            {
        //                icon: "",
        //                text: "Es tut uns leid. Zu diesem Tarif liegen keine Infos vor."
        //            }
        //        ]
        //    }],
        //    filterList: [{
        //        text: "Red",
        //        selected: true
        //    }, {
        //        text: "Smart",
        //        selected: true
        //    }, {
        //        text: "Data Go",
        //        selected: true
        //    }, {
        //        text: "Data Go",
        //        selected: true
        //    }],
        //    promotions: [{
        //        code: 1,
        //        name: "040 Startguthaben",
        //        checked: false
        //    }, {
        //        code: 2,
        //        name: "PROMO041",
        //        checked: false
        //    }],
        //    discounts: [{
        //        code: 1,
        //        name: "Discount01",
        //        checked: false
        //    }, {
        //        code: 2,
        //        name: "Discount02",
        //        checked: false
        //    }, {
        //        code: 3,
        //        name: "Discount03",
        //        checked: false
        //    }]
        //};


        function selectTariff(ele) {
            vm.selected = ele;
            //console.log(JSON.stringify(ele));
            //vm.inputs = {};
            //extrasList = ele.product;
            //vm.extrasList = $filter('removeWith')(ele.product, {specification: 'tariff-addon'});
            //vm.portingList = $filter('where')(ele.product, {specification: 'Porting SIM type'});
            //vm.extrasList = $filter('removeWith')(vm.extrasList, {specification: 'Porting SIM type'});
        }

        function getElementsWithPropertyVal(arr, filterFun) {
            if (typeof filterFun === "function") {
                var res = [];
                arr.forEach(function (arrObj, index) {
                    if (filterFun(arrObj, index)) {
                        res.push(arrObj);
                    }
                });
                return res;
            } else
                return [];
        }

        function getSelectedaAddons(addonArr) {
            var selected = [];
            if (typeof addonArr !== "undefined") {
                if (addonArr.length > 0) {
                    addonArr.forEach(function (val) {
                        if (val.selected)
                            selected.push(val);
                    });
                }
            }
            return selected;
        }

        function reselectAddon(toArr, fromArr) {
            var res = [];
            if (toArr.length > 0) {
                toArr.forEach(function (item) {
                    if (fromArr.length > 0) {
                        fromArr.forEach(function (fromItem) {
                            if (item.code == fromItem.code) {
                                item.selected = true;
                                res.push(item);
                            }
                        });
                    }
                })
            }
            return toArr;
        }

        //customerService.getEntityList('tarrifSelectionPage').then(function (res) {
        //
        //}, function (err) {
        //    debugger;
        //});
    }
})
();
