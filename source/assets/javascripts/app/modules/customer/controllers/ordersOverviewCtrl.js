(function () {
    "use strict";

    angular
        .module("onePOS.customer")
        .controller("ordersOverviewCtrl", ["flowID", "$scope", "$filter", "customerService", "$state", "$cookieStore", "constants",
            "logger", "$uibModal",
            ordersOverviewCtrl]);

    function ordersOverviewCtrl(flowID, $scope, $filter, customerService, $state, $cookieStore, constants, logger, $uibModal) {
        jQuery(window).scrollTop(0);
        var vm = this;
        vm.selectedOrder = {};

        vm.search = {
            searchTerm: "",
            advancedSearch: false
        };
        vm.filter = {};
        vm.flowID = flowID;

        if (flowID === constants.flows.KEYS.NEW_CUSTOMER) {

        } else if (flowID === constants.flows.KEYS.ADD_SUBSCRIPTION) {

        } else if (flowID === constants.flows.KEYS.CONTRACT_PROLONGATION) {

        } else if (flowID === constants.flows.KEYS.MODIFY_PRODUCT) {

        }

        var orderId = customerService.orderData.orderID;

        vm.summaryOrCart = 'summary';

        vm.loadOrders = function (orderId) {
            customerService.getOrdersOverview(orderId).then(
                function (respModel) {
                    if (respModel.model) {
                        vm.ordersFilterable = respModel.model.salesOrderVBO;
                        vm.ordersAll = respModel.model.salesOrderVBO;
                        vm.totalCount = respModel.model.salesOrderVBO.length;
                        if (vm.totalCount > 0) {
                            vm.selectOrder(vm.ordersFilterable[0].orderID);
                        }
                    }
                }).catch(function (fault) {
                    vm.errorMessage = fault.text;
                }
            );
        };

        vm.loadOrders(orderId);

        vm.applyFilter = function () {
            vm.deselectOrder();
            vm.ordersFilterable = $filter('ordersOverview')(vm.ordersAll, vm.filter);
            if (vm.ordersFilterable.length > 0) {
                vm.selectOrder(vm.ordersFilterable[0].orderID);
            }
        };

        vm.resetFilter = function () {
            vm.filter = {};
            vm.deselectOrder();
            vm.ordersFilterable = jQuery.$.extend({}, vm.ordersAll);

            if (vm.totalCount > 0) {
                vm.selectOrder(vm.ordersFilterable[0].orderID);
            }
        };

        vm.applySearch = function (search) {
            customerService.getOrdersOverview(search).then(
                function (respModel) {
                    if (respModel.model) {
                        vm.ordersFilterable = respModel.model.salesOrderVBO;
                        vm.ordersAll = respModel.model.salesOrderVBO;
                        vm.totalCount = respModel.model.totalCount;
                        if (vm.totalCount > 0) {
                            vm.selectOrder(vm.ordersFilterable[0].orderID);
                        }
                    }
                }).catch(function (fault) {
                    vm.errorMessage = fault.text;
                }
            );
        };

        vm.applySearchBtn = function(){
            vm.applySearch(vm.search);
        };

        vm.selectOrder = function (orderId) {
            if (orderId != '') {
                vm.deselectOrder();
                var orderItem = {};
                var summaryNotIn = ['Draft','Locked','Failed'];
                var setSummaryToCart = false;
                console.log('start of function',vm.summaryOrCart,setSummaryToCart);

                vm.ordersFilterable.forEach(function (entry) {
                    if (entry.orderID == orderId) {
                        vm.selectedOrder.orderID = orderId;
                        vm.selectedOrder.created = entry.created;
                        vm.selectedOrder.lastModified = entry.lastModified;
                        vm.selectedOrder.status = entry.status;
                        vm.selectedOrder.agent = entry.roles.agent.name;
                        vm.selectedOrder.voID = entry.roles.agent.voID;
                        //vm.selectedOrder.items = entry.parts.lineItems;
                        vm.selectedOrder.items = [];

                        // get line items details
                        if (entry.parts.lineItems.length > 0) {


                            entry.parts.lineItems.forEach(function (item, orderId) {
                                var params = {};
                                params.orderLineItemID = item.orderLineItemID;
                                params.orderId = vm.selectedOrder.orderID;
                                customerService.getOrderItem(params).then(
                                    function (respModel) {
                                        if (respModel.model.salesOrderVBO[0].parts.lineItems) {
                                            for (var i = 0; i <= respModel.model.salesOrderVBO[0].parts.lineItems.length - 1; i++) {
                                                orderItem = {};
                                                orderItem.id = respModel.model.salesOrderVBO[0].parts.lineItems[i].orderLineItemID;
                                                orderItem.name = respModel.model.salesOrderVBO[0].parts.lineItems[i].productOffering.name;
                                                orderItem.status = respModel.model.salesOrderVBO[0].parts.lineItems[i].status; console.log('status',orderItem.status);
                                                if(jQuery.inArray( orderItem.status, summaryNotIn )) {
                                                    setSummaryToCart = true;
                                                }
                                                orderItem.type = respModel.model.salesOrderVBO[0].parts.lineItems[i].type;
                                                orderItem.category = respModel.model.salesOrderVBO[0].parts.lineItems[i].category;
                                                orderItem.lastModified = respModel.model.salesOrderVBO[0].parts.lineItems[i].lastModified;
                                                orderItem.details = [];

                                                if(orderItem.type === "activation") { //category don't matter 2.11.3.a
                                                    orderItem.details.push({"key":"Letzte Änderung","value": $filter('date')(orderItem.lastModified, 'MM / dd / yyyy')});
                                                    orderItem.details.push({"key":"Kategorie","value": orderItem.category});
                                                    orderItem.details.push({"key":"SIM Serienummer","value": "16145066421288"});
                                                    orderItem.details.push({"key":"MSISDN","value": ""});
                                                    orderItem.details.push({"key":"Anzahl SIM Karte","value": "1"});
                                                    orderItem.details.push({"key":"Salesforce ID","value": "11211128"});
                                                } else if(orderItem.type === "normalPorting" && orderItem.category === "pre-pay") { //2.11.3.b
                                                    orderItem.details.push({"key":"Letzte Änderung","value": $filter('date')(orderItem.lastModified, 'MM / dd / yyyy')});
                                                    orderItem.details.push({"key":"Salesforce ID","value": "11211128"});
                                                } else if((orderItem.type === "normalPorting" || orderItem.type === "comfortPorting") && orderItem.category === "post-pay") { //2.11.3.c
                                                    orderItem.details.push({"key":"Letzte Änderung","value": $filter('date')(orderItem.lastModified, 'MM / dd / yyyy')});
                                                    orderItem.details.push({"key":"Kategorie","value": orderItem.category});
                                                    orderItem.details.push({"key":"SIM Serienummer","value": "16145066421288"});
                                                    orderItem.details.push({"key":"MSISDN","value": ""});
                                                    orderItem.details.push({"key":"Anzahl SIM Karte","value": "1"});
                                                    orderItem.details.push({"key":"Salesforce ID","value": "11211128"});
                                                    // orderItem.details.push({"key":"Belated porting","value": "");
                                                } else if(orderItem.type === "providerChange" && orderItem.category === "fixednet") { //2.11.3.f
                                                    orderItem.details.push({"key":"Letzte Änderung","value": $filter('date')(orderItem.lastModified, 'MM / dd / yyyy')});
                                                } else if(orderItem.type === "newConnection" && orderItem.category === "fixednet") { //2.11.3.g
                                                }

                                                vm.selectedOrder.items.push(orderItem);

                                                vm.loadShoppingCart = function(){
                                                    customerService.shared = {
                                                      "orderItem":orderItem
                                                    };
                                                    $state.go("customer.shoppingCart");
                                                };
                                            }
                                        }
                                    }).catch(function (fault) {
                                        vm.errorMessage = fault.text;
                                    }
                                );
                            });
                        }
                    }
                });
            }

            if(setSummaryToCart === true) {
               vm.summaryOrCart = 'cart';
            }
            console.log('end of function',vm.summaryOrCart,setSummaryToCart);
        };


        vm.deselectOrder = function (orderId) {
            vm.selectedOrder = {};

        };




        vm.openSummaryOrCart = function (e) {
            console.log('opener',vm.summaryOrCart);
            /*if(vm.summaryOrCart == 'cart')*/ {
                //open cartorderSummaryOverlay {
                var modalInstance = $uibModal.open({
                    templateUrl: '/assets/javascripts/app/partials/customer/summaryData.html',
                    controller: 'summaryDataCtrl', /*summaryDataCtrl*/
                    controllerAs:'vm',
                    resolve:{
                        customerData: function () {
                            return customerService.getCustomerData(customerService.sharedLineItem.orderId);
                        },
                        subscriberData: function () {
                            return customerService.getSubscriberData(customerService.sharedLineItem.orderId, customerService.sharedLineItem.orderLineItemId);
                        },
                        lineItemData: function () {
                            return customerService.orderLineItemData(customerService.sharedLineItem.orderId, customerService.sharedLineItem.orderLineItemId);
                        }
                    }
                });
                e.preventDefault()
            }
        };

        $scope.$parent.headerTitle = "Bestellübersicht";
        $scope.$parent.hideCheckoutBtn = true;
        $scope.$parent.subPrevText = "Zur";
        $scope.$parent.prevText = "Load shopping cart";
        $scope.$parent.hidePrevBtn = true;
        $scope.$parent.prev = function () {
            $state.go("customer.summaryData");
            $scope.$parent.hideCheckoutBtn = false;
        };

        $scope.$parent.subNextText = "Zum";
        $scope.$parent.nextText = "Dashboard";
        $scope.$parent.next = function () {
            $state.go('dashboard.index');
            $scope.$parent.hideCheckoutBtn = false;
        };

        /*handling dropdown selection by the new implementation*/

        $scope.$watch(function () {
            return vm.filter.category;
        }, onChange, true);
        $scope.$watch(function () {
            return vm.filter.businessCase;
        }, onChange, true);
        $scope.$watch(function () {
            return vm.filter.advisorName;
        }, onChange, true);
        $scope.$watch(function () {
            return vm.filter.status;
        }, onChange, true);

        function onChange(oldVal, newVal) {
            if (!angular.equals(oldVal, newVal)) {
                vm.applyFilter();
            }
        }
    }
})
();
