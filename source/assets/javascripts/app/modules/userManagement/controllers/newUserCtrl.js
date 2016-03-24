(function () {
    "use strict";
    angular
        .module("onePOS.userManagement")
        .controller("newUserCtrl", ['$state','$filter','AuthService','userService','$scope',newUserCtrl]);

    function newUserCtrl($state,$filter,AuthService,userService,$scope){
        // vars
        var vm = this;
        vm.messages1 = [];
        // logged in user to get data from
        vm.loggedInUser = AuthService.getUser();
        // get user shops list
        vm.shopListData = vm.loggedInUser.availableShops;
        // get user void list
        vm.voidListData = vm.voidDefaultListData = vm.loggedInUser.voIDList;
        // change default void value
        vm.defaultVoid = vm.loggedInUser.defaultVoID;
        // change default shop value
        vm.shop = vm.loggedInUser.shop;
        // save action
        vm.submit = function(){
            // vars
            vm.messages1 = [];
            // check current tab
            if(vm.userTabs == 'generalData'){
                // change the tab
                vm.userTabs = 1;
            }else{
                // send the user data
                userService.saveUserDetails({
                    "username":vm.usernamePuid,
                    "voidsList":userService.filterVoids(vm.voidDefaultListData,vm.defaultVoid),
                    "mTanPhoneNumber": vm.mTanPhoneNumber,
                    "title": vm.title,
                    "firstName": vm.firstName,
                    "familyName": vm.familyName,
                    "shopUser": vm.shop
                }).then(function(){
                    // go to user manager page
                    $state.go('userManagement.usersList');
                }).catch(function(falut){
                    // vars
                    var data = falut.errorData;
                    // dispaly the error
                    vm.messages1.push({
                        text: data.text, // message text
                        type: 'error'
                    });
                    // change the tab
                    vm.userTabs = 0;
                });
            }
        }
        // voids change
        vm.voidsChanged = function(){
            // update the default void list data
            vm.voidDefaultListData = $filter('filter')(vm.voidListData, {checked: true});
            // update the default void value
            vm.defaultVoid = (vm.voidDefaultListData.length == 0 || !vm.defaultVoid) ? vm.voidDefaultListData[0] : vm.defaultVoid;
        }
        // cacnel action
        vm.cancelAction = function(){
            // go to user manager page
            $state.go('userManagement.usersList');
        }

        $scope.$parent.hideFooter = true;
    }
})();
