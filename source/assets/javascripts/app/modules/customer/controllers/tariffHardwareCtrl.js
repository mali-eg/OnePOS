(function () {
    "use strict";

    angular
        .module('onePOS.customer')
        .controller('tariffHardwareCtrl', ['$uibModalInstance', 'customerService', '$scope', 'hardwareData',
            tariffHardwareCtrl]);

    function tariffHardwareCtrl($uibModalInstance, customerService, $scope, hardwareData) {
        var vm = this,
            selectedHardware = customerService.selectedHardware;
        vm.hardwareArr = hardwareData.hardwareArr;


        if(selectedHardware) {
            var tempDevice = getDeviceByCode(vm.hardwareArr, selectedHardware.code);
            selectDevice(tempDevice);
        } else {
            selectDevice(vm.hardwareArr[0])
        }

        vm.selectDevice = function (ele) {
            selectDevice(ele);
        };


        function getDeviceByCode(list, code) {
            var res = null;
            for (var i = 0; list.length > i; i++) {
                if (list[i].code == code) {
                    res = list[i];
                }
            }
            return res;
        }

        function selectDevice(ele) {
            vm.selectedHardware = ele;
        }

        vm.cancel = function () {
            $uibModalInstance.close(false);
        };
        vm.select = function () {
            $uibModalInstance.close(vm.selectedHardware);
            customerService.selectedHardware = vm.selectedHardware;
        }
    }
})
();
