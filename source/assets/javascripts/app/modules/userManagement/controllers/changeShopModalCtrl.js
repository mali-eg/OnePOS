(function () {
    "use strict";


    angular
        .module('onePOS.userManagement')
        .controller('changeShopModalCtrl', ['userService', '$scope', '$uibModalInstance','defaultShop','shops','username',

            function (userService, $scope, $uibModalInstance,defaultShop,shops,username) {
                jQuery(window).scrollTop(0);
                var vm = this;
                    //username = username

                vm.defaultShop = defaultShop;
                vm.shops = shops;
                vm.selected = vm.defaultShop;
                vm.shopsList = vm.shops.concat(vm.selected);

                vm.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };


                vm.confirm = function () {
                    userService.saveUserDetails(vm.selected).then(function(){
                        $uibModalInstance.close(vm.selected);
                        jQuery(window).scrollTop(0);
                    })


                };


            }]);

})();
