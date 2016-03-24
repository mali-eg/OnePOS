(function () {
    "use strict";
    angular
        .module("onePOS.userManagement")
        .controller("editUserCtrl",['$state','$filter','userDetailsData','userService','AuthService','$uibModal','$scope','$q',editUserCtrl]);

    function editUserCtrl($state,$filter,userDetailsData,userService,AuthService,$uibModal,$scope,$q){
        // vars
        var vm = this;
        vm.messages1 = [];
        // logged in user to get data from
        vm.loggedInUser = AuthService.getUser();
        // current user
        vm.currentUser = userDetailsData;
        // get user shops list
        vm.shopListData = vm.loggedInUser.availableShops;
        // get user void list
        vm.voidListData = vm.loggedInUser.voIDList;
        vm.voidDefaultListData = vm.currentUser.permissions.voIDList;
        // change default void value
        vm.defaultVoid = vm.currentUser.onlineUser.defaultVoID;
        // change default shop value
        vm.shop = vm.currentUser.shop;
        // bind the fields
        vm.usernamePuid = vm.currentUser.username;
        vm.mTanPhoneNumber = vm.currentUser.onlineUser.mTanPhoneNumber;
        vm.title = vm.currentUser.onlineUser.title;
        vm.firstName = vm.currentUser.onlineUser.firstName;
        vm.familyName = vm.currentUser.onlineUser.familyName;

        // edit action
        vm.submit = function(){
            $q.all([
                // send the user data
                userService.editUser({
                    "mTanPhoneNumber": vm.mTanPhoneNumber,
                    "title": vm.title,
                    "firstName": vm.firstName,
                    "familyName": vm.familyName,
                    "shopUser": vm.shopUser
                },vm.currentUser.username),
                // send the user voids
                userService.editUserVoids({
                    "voidsList":userService.filterVoids(vm.voidDefaultListData,vm.defaultVoid)
                },vm.currentUser.username)
            ]).then(function(values) {
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
        // voids change
        vm.voidsChanged = function(){
            // update the default void list data
            vm.voidDefaultListData = $filter('filter')(vm.voidListData, {checked: true});
            // update the default void value
            vm.defaultVoid = (vm.voidDefaultListData.length == 0 || !vm.defaultVoid) ? vm.voidDefaultListData[0] : vm.defaultVoid;
        }
        // check if void selected
        vm.voidSelected = function(voID){
            return !!$filter('filter')(vm.voidDefaultListData,{'voID':voID}).length;
        }
        // cacnel action
        vm.cancelAction = function(){
            // go to user manager page
            $state.go('userManagement.usersList');
        }
        // unlock user action
        vm.unlockUser = function(e){
            // open unlock modal
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/javascripts/app/partials/userManagement/unlockUser.html',
                controller: 'unlockUserCtrl',
                controllerAs:'vm',
                resolve:{
                    currentUser:vm.currentUser
                }
            });
            e.preventDefault()
        }
        // deactivate user action
        vm.deactivateUser = function(e){
            // open deactivate modal
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/javascripts/app/partials/userManagement/deactivateUser.html',
                controller: 'deactivateUserCtrl',
                controllerAs:'vm',
                resolve:{
                    currentUser:vm.currentUser
                }
            });
            e.preventDefault()
        }

        $scope.$parent.hideFooter = true;
    }
})();
