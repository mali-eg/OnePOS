(function () {
    "use strict";


    angular
        .module('onePOS.customer')
        .controller('duplicateCartSimModalCtrl', ['customerService', '$scope', '$uibModalInstance',
            'selectedCart', '$filter', 'counterValue', 'carts','loginService',

            function (customerService, $scope, $uibModalInstance, selectedCart, $filter, counterValue, carts,loginService) {

                var vm = this,
                    orderId = customerService.orderId,
                    username = loginService.data.model.securityTokenVBO.credentials.username,
                    selectedAddons = customerService.addonsArray,
                    orderLineItemId = customerService.sharedLineItem.orderLineItemId,
                    counter = 1,
                    max = 99,
                    min = 1;
                vm.duplicateCart = [];

                vm.selected = selectedCart;
                vm.selectedCartName = selectedCart.cart.productOffering.name;
                vm.selectedCartType = selectedCart.cart.type;
                vm.selectedCartCategory = selectedCart.cart.category;
                vm.selectedCartValue = selectedCart.cart.productOffering.characteristicValue[0].value;
                vm.selectedCartProduct = selectedCart.cart.productOffering.product;
                //console.log(JSON.stringify(vm.selectedCartProduct));
                vm.value = counterValue;
                vm.carts = carts;

                /*Start increment & decrement carts*/

                vm.simCard = ($filter('where')(vm.selectedCartProduct, {specification: 'sim-card'}));
                vm.SIM = vm.simCard[0].characteristicValue[0].name;
                vm.SIMValue = vm.simCard[0].characteristicValue[0].value;
                vm.hardware = ($filter('where')(vm.selectedCartProduct, {specification: 'hardware'}));
                vm.imie = vm.hardware[0].characteristicValue[0].name;
                vm.imieValue = vm.hardware[0].characteristicValue[0].value;

                for (counter = min; counterValue >= counter; counter++) {
                    /*console.log(vm.selectedCartType);
                    console.log("classic "+vm.portClassic);
                    console.log("prepaid "+ vm.prepaid);
                    console.log("cart "+ vm.cartType);*/

                    vm.carts.push(vm.selected.cart);
                    if (vm.selectedCartType == "Activation Porting Classic"
                        || vm.selectedCartType == "Activation Classic Porting") {
                        vm.portClassic = true;
                        vm.duplicateCart.push(
                            {
                                id: counter,
                                simSelect: vm.SIM,
                                simSelectValue: ''
                            });
                    }
                    else if (vm.selectedCartCategory == "prepaid"
                        && vm.selectedCartType == "Activation") {
                        vm.prepaid = true;
                        vm.duplicateCart.push(
                            {
                                id: counter,
                                SIM: vm.SIM,
                                simValue: ''
                            });
                    }
                    else {
                        vm.cartType = true;
                        vm.duplicateCart.push(
                            {
                                id: counter,
                                SIM: vm.SIM,
                                IMEI: vm.imie,
                                simValue: '',
                                imeiValue: ''
                            });
                    }
                }
                /*End increment & decrement carts*/
                vm.confirm = function () {
                    customerService.sendProduct(orderId,orderLineItemId,selectedAddons,username).then(
                        function (carts) {
                            customerService.sendOrderLineItem(orderLineItemId).then(
                                function (carts) {
                                    $uibModalInstance.close(vm.carts, vm.duplicateCart);
                                    jQuery(window).scrollTop(0);
                                })
                        })
                };

            }]);

})();
