(function () {
    "use strict";

    angular
        .module('onePOS.userManagement')
        .controller('viewProfileCtrl', ['$scope', '$state', 'loginService', '$uibModal', 'userService',
            viewProfileCtrl]);

    function viewProfileCtrl($scope, $state, loginService, $uibModal, userService) {
        jQuery(window).scrollTop(0);
        var vm = this,
            username = loginService.data.model.securityTokenVBO.credentials.username;
        //   username =;
        console.log(username);
        userService.getUserDetails(username).then(
            function (respModel) {
                console.log(respModel);
                vm.username = username;
                var userData = respModel;
                var onlineUser = userData.onlineUser;
                vm.first_name = onlineUser.firstName;
                vm.last_name = onlineUser.familyName;
                vm.status = onlineUser.status;
                vm.msisdn = onlineUser.mTanPhoneNumber;//
                vm.federation = userData.federation;

                vm.voidList = userData.permissions.voIDList;
                vm.defaultVoid = onlineUser.defaultVoID;

                // vm.voidList.unshift(vm.defaultVoid);

                vm.defaultShop = userData.shop;
                vm.availableShops = userData.availableShops;
                //vm.selected = vm.availableShops[0];


                vm.selected = (vm.availableShops.length == 0 || !vm.defaultShop) ? vm.availableShops[0] : vm.defaultShop;


                vm.passwordUpdated = userData.onlineUser.passwordUpdated;
                /* console.log(vm.shopLocations);*/


            }
        ).catch(function (fault) {
        });

        vm.close = function () {
            $state.go("dashboard.index");
        };

        vm.changeShop = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/javascripts/app/partials/userManagement/changeShop.html',
                controller: 'changeShopModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    defaultShop: function () {
                        return vm.defaultShop;
                    },
                    shops: function(){
                        return vm.availableShops;
                    },
                    username: function(){
                        return vm.username;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            });
        };

        $scope.$parent.hideFooter = true;

    }


})();
