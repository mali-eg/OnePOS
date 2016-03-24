(function () {
    "use strict"

    angular
        .module('onePOS.userManagement')
        .controller('userManagementCtrl', ['$scope', 'viewProfileService', '$state',
            userManagementCtrl]);

    function userManagementCtrl($scope, viewProfileService, $state) {
        jQuery(window).scrollTop(0);
        var vm = this;

        // Active VOIDs table
        vm.voidInUse = '123456789';

        // Change Shop location
        vm.shopLocations = [
            {id: '123456789', name: 'Vodafone Seaside Shop - Uferpromenade 12 123455 Citystadt ( RMS-ID: 123456789 )'},
            {id: '123456788', name: 'Vodafone Shop - Uferpromenade 11 123455 Citystadt ( RMS-ID: 123456788 )'},
            {id: '123456787', name: 'Vodafone Seaside Shop - Uferpromenade 10 123455 Citystadt ( RMS-ID: 123456787 )'}
        ];
        vm.shopLocation = null;


        // Add new user / Tab 2
        vm.voids = ['123456789', '123456788', '123456787', '987654321'];
        vm.selectedVoid = null;
        vm.accessedVoids = [];
        vm.checkSameVoid = function (item) {
            return (item !== vm.selectedVoid);
        };

        // Edit user
        vm.userData = {
            contactNumber: '01725577890',
            title: 'Someone important',
            name: 'Alexander',
            familyName: 'Magnus',
            puid: 'Yolo',
            selectedShop: '123456789',
            selectedVoid: '123456789',
            availableVoids: ['123456789', '123456788', '123456787', '987654321'],
            accessedVoids: ['987654321']
        };
        vm.checkVoid = function (item) {
            return (item !== vm.userData.selectedVoid);
        };

        $scope.$parent.hideFooter = true;
    }


})();
