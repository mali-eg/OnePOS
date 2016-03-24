(function () {
    "use strict";

    angular
        .module('onePOS.customer')

        .controller('shoppingCartCtrl', ['flowID','$scope', '$filter', 'loginService', 'customerService',
            '$state', '$uibModal', '$log','constants',
            shoppingCartCtrl]);

    function shoppingCartCtrl(flowID,$scope, $filter, loginService, customerService, $state, $uibModal, $log,constants) {
        jQuery(window).scrollTop(0);
        var vm = this,
            orderId = customerService.orderData.orderID,
            orderLineItemId = customerService.orderData.parts.lineItems[0].orderLineItemID,
            params = {},
            addonsModel =  customerService.getAddons(),
            discountsModel = customerService.getDiscounts(),
            accessoriesModel = customerService.getAccessories(),
            hardwareModel = customerService.getHardware();

        vm.filterTarrif = [];
        vm.tarrifProduct = [];
        vm.emptyCart =[];
        vm.missingData = [];
        vm.msgDismiss = [];
        vm.msgOk = [];

        vm.status = {
            FAILURE: 'failure',
            DECLINED:'declined',
            PENDING:'pending',
            LOCKED:'locked',
            ACTIVATED: 'activated',
            PARTIALLY_ACTIVATED:'partially activated',
            DRAFT:'draft'
        };

        if (flowID === constants.flows.KEYS.NEW_CUSTOMER) {

        } else if (flowID === constants.flows.KEYS.CONTRACT_PROLONGATION) {

        } else if (flowID === constants.flows.KEYS.MODIFY_PRODUCT) {
            /*modify product is available for postpaid and fixed net*/

        }

        vm.selectedAddons = addonsModel.addonsList;
        vm.selectedDisconts = discountsModel.discountsList;
        vm.selectedAccessories = accessoriesModel.accessoriesList;
        vm.selectedHardware = hardwareModel.hardwareList;

        customerService.getCart(orderId).then(
            function (respModel) {
                if (respModel.model) {
                    var cart = respModel.model.salesOrderVBO[0];
                    if (cart.parts.lineItems[0].productOffering.name) {
                        vm.tariffName = cart.parts.lineItems[0].productOffering.name;
                    }
                    if (cart.parts.lineItems[0].productOffering.characteristicValue) {
                        vm.subsidyLevel = cart.parts.lineItems[0].productOffering.characteristicValue[0].value;
                    }
                    vm.carts = customerService.cartlist = cart.parts.lineItems;
                    vm.selected = {cart: vm.carts[0]};
                    vm.tarrifCarts = cart.parts.lineItems[0].productOffering.product;
                    vm.contractType = cart.parts.lineItems[0].type;

                    customerService.sharedLineItem = {orderLineItemId: orderLineItemId, orderId: orderId};

                    // if there any missing data coming from tariff page this warning message will appear
                    /* if(vm.missingData){
                     vm.messages.push({
                     title: 'Missing Data', // if overlay=true that will be the modal title
                     text: 'Missing Data', // message text
                     type: 'warning' // define the message style
                     });
                     }*/


                    var emptyObj = {
                        title: 'Empty Carts',
                        text: 'You don´t have any items in your shopping cart yet.',
                        type: 'default',
                        btnTitle: 'Add tariff',
                        btnHandler: function () {
                            $state.go("customer.tariff");
                        }
                    };
                    vm.emptyCart.push(emptyObj);
/*
                    /*params.orderId = orderId;*/
                    params.type = vm.selected.cart.type;
                    params.category = vm.selected.cart.category;
    //TODO: Ghobashy/ibrahim remove error text from javascript to move it in html
                    var dismissObj = {
                        title: 'Cart status',
                        text: 'There are issues with this  item',
                        type: 'error',
                        btnTitle: 'Dismiss',
                        btnHandler: function () {
                            vm.dismiss = customerService.sendOrderLineItem(params).then(function(){
                                jQuery(window).scrollTop(0);
                            });
                        }
                    };
                    vm.msgDismiss.push(dismissObj);

    //TODO: Ghobashy/ibrahim remove error text from javascript to move it in html
                    var okObj = {
                        title: 'Cart status',
                        text: 'There are issues with this  item',
                        type: 'error',
                        btnTitle: 'Ok',
                        btnHandler: function () {
                            vm.ok = customerService.sendOrderLineItem(params).then(function(){
                                jQuery(window).scrollTop(0);
                            });
                        }
                    };
                    vm.msgOk.push(okObj);



                }
            }
        ).catch(function (error) {
                var data = error.errorData;
                // if there any missing data coming from tariff page this warning message will appear
                vm.missingData = true;
                 vm.missingData.push({
                 text: data.text, // message text
                 type: 'default'
                 });


            });





        vm.emptyCarts = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/javascripts/app/partials/customer/shoppingCartEmpty.html',
                controller: 'emptyCartModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    carts: function () {
                        return vm.carts;
                    }
                }
            });

        };

        vm.duplicate = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/javascripts/app/partials/customer/shoppingCartDuplicate.html',
                controller: 'duplicateCartModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    selectedCart: function () {
                        return vm.selected;
                    },
                    carts: function () {
                        return vm.carts;
                    },
                    tariffPlan: function () {
                        return vm.tarrifPlan;
                    }
                }
            });
        };


        vm.delete = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/javascripts/app/partials/customer/shoppingCartDelete.html',
                controller: 'deleteCartModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    selectedCart: function () {
                        return vm.selected;
                    },
                    carts: function () {
                        return vm.carts;
                    }
                }
            });
        };


        /**/
        $scope.$parent.headerTitle = "Neukunde";
        $scope.$parent.subPrevText = "Vorheriger Schritt";
        $scope.$parent.prevText = "Tarifoptionen";
        $scope.$parent.hidePrevBtn = true;
        $scope.$parent.subNextText = "Nächster Schritt";
        $scope.$parent.nextText = "Kundendaten";
        $scope.$parent.next = function () {
            //customerService.submitCart(orderId, orderLineItemId, payload);
            $state.go("customer.customerData");
        };

    }


})();
