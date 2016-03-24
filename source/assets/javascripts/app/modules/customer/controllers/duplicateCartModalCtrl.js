(function () {
    "use strict";


    angular
        .module('onePOS.customer')
        .controller('duplicateCartModalCtrl', ['$scope', '$uibModalInstance', '$uibModal', 'selectedCart', 'carts',

            function ($scope, $uibModalInstance, $uibModal, selectedCart, carts) {
                jQuery(window).scrollTop(0);
                var vm = this;
                vm.selected = selectedCart;
                vm.selectedCartName = selectedCart.cart.productOffering.name;
                vm.selectedCartType = selectedCart.cart.type;
                vm.selectedCartValue = selectedCart.cart.productOffering.characteristicValue[0].value;
                vm.selectedCartProduct = selectedCart.cart.productOffering.product;
                vm.carts = carts;

                vm.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                var counter = 1;
                vm.value = 1;
                var max = 99;
                var min = 1;


                vm.increment = function () {
                    if (vm.value >= max) {
                        vm.value = max;
                    }
                    else {
                        vm.value++;
                        counter = vm.value;
                    }

                };

                vm.decrement = function () {

                    if (vm.value > min) {
                        vm.value--;
                    }
                    else {
                        vm.value = min;
                    }


                };

                vm.duplicateCart = function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: '/assets/javascripts/app/partials/customer/shoppingCartDuplicateSim.html',
                        controller: 'duplicateCartSimModalCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            selectedCart: function () {
                                return vm.selected;
                            },
                            counterValue: function () {
                                return vm.value;
                            },
                            carts: function () {
                                return vm.carts;
                            }
                        }
                    });
                    $uibModalInstance.close();
                };


            }]);

})();
