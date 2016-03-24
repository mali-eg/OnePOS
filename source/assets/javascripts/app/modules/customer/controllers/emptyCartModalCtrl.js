(function () {
    "use strict";


    angular
        .module('onePOS.customer')
        .controller('emptyCartModalCtrl', ['customerService', '$scope', '$uibModalInstance',
            'carts',

            function (customerService, $scope, $uibModalInstance, carts) {
                jQuery(window).scrollTop(0);
                var vm = this;

                vm.emptyMessage =[];
                vm.carts = carts;
                vm.status = customerService.cartlist.status;
                vm.voId = customerService.cartlist.void;
                vm.custName = customerService.cartlist.customerName;
                vm.date = customerService.cartlist.date;
                vm.orderId = customerService.cartlist.orderId;


                vm.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };



                var emptyObj = {
                    title: 'Empty Carts',
                    text: 'The shopping cart ID'+ vm.orderId + 'will be canceled and all data will be lost. nop-lease review the data before deleting',
                    type: 'default'
                };
                vm.emptyMessage.push(emptyObj);

                vm.empty = function () {
                    customerService.empty(vm.orderId).then(
                        function () {
                            $uibModalInstance.close(vm.carts.length = 0);
                            //vm.clearCart = true;
                            jQuery(window).scrollTop(0);
                        })
                }

            }]);

})();
