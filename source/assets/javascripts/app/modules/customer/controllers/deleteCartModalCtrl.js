(function () {
    "use strict";


    angular
        .module('onePOS.customer')
        .controller('deleteCartModalCtrl', ['customerService', '$scope', '$uibModalInstance',
            'selectedCart', 'carts',

            function (customerService, $scope, $uibModalInstance, selectedCart, carts) {
                jQuery(window).scrollTop(0);
                var vm = this,
                    orderId = customerService.orderData.orderID,
                    orderLineItemId = customerService.data.model.salesOrderVBO[0].parts.lineItems[0].orderLineItemID;
                vm.msg =[];

                vm.selected = selectedCart;
                vm.selectedCartName = selectedCart.cart.productOffering.name;
                vm.selectedCartType = selectedCart.cart.type;
                vm.selectedCartValue = selectedCart.cart.productOffering.characteristicValue[0].value;
                vm.selectedCartProduct = selectedCart.cart.productOffering.product;
                vm.carts = carts;
                vm.orderLineItem = selectedCart.cart.orderLineItemID;

                /*vm.orderCount= vm.carts.length;*/


                vm.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };



                vm.delete = function () {
                    customerService.emptyCart(orderId,orderLineItemId).then(
                        function () {
                            //$uibModalInstance.close(vm.carts.splice(vm.carts.indexOf(vm.selected.cart[0]), 1));
                            $uibModalInstance.close(vm.carts.splice(vm.carts.indexOf(vm.selected.cart), 1));
                            jQuery(window).scrollTop(0);
                            console.log(vm.carts.indexOf(vm.selected.cart));
                            console.log(vm.selected.cart);
                        })
                };
                console.log(vm.carts.length);

                var msgObj = {
                    title: 'Delete Cart',
                    text: 'All unsafed progress will be lost, if you do so. Do you wish to continue anyway ?',
                    type: 'default'
                };
                vm.msg.push(msgObj);


            }]);

})();
