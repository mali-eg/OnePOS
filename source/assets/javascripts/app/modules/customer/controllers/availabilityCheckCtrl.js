(function () {
    "use strict";
    angular
        .module('onePOS.customer')
        .controller('availabilityCheckCtrl', ["$scope","$uibModalInstance", 'customerService' ,"availabilityCheckSrvc","actions",
            availabilityCheckCtrl]);

    function availabilityCheckCtrl($scope,$uibModalInstance, customerService,availabilityCheckSrvc,actions) {
        // vars
        var vm = this;
        vm.messages1 = [];
        vm.messages2 = [];
        vm.messages3 = [];
        vm.messages4 = [];
        vm.messages5 = [];
        vm.submitedData = availabilityCheckSrvc.getFormData();
        vm.results = availabilityCheckSrvc.getResultsData();

        // check
        if(vm.submitedData){
            // fill the fields
            vm.street = vm.submitedData.street;
            vm.number = vm.submitedData.number;
            vm.postcode = vm.submitedData.postcode;
            vm.city = vm.submitedData.city;
        }


        // close modal action
        vm.closeAction = function(e){
            // close modal
            $uibModalInstance.close(false);
            e.preventDefault();
        }

        // submit action
        vm.submit = function(e,param){
            // check if the form is valid or not
            if(vm.availabilityCheckForm.$valid){
                if(param == 'selection'){
                    // save the results
                    availabilityCheckSrvc.saveResultsData(vm.results);
                    // close modal
                    $uibModalInstance.close(vm.submitedData);
                    customerService.selectedAddress = vm.submitedData;

                    // call the onSuccess action
                    actions.onSuccess ? actions.onSuccess() : false;
                }else{
                    // reset
                    vm.messages1 = [];
                    vm.messages2 = [];
                    vm.messages3 = [];
                    vm.messages4 = [];
                    vm.messages5 = [];
                    vm.results = false;
                    vm.dispalyList = false;
                    // call the api
                    availabilityCheckSrvc.getAvailabilityCheckList(vm.street).then(function(resp){
                        if(resp.listData){
                            // display the list
                            vm.dispalyList = resp.listData.list;
                            // save the last street
                            vm.lastStreet = vm.street;
                            // dispaly the warning
                            vm.messages1.push({
                                text: resp.listData.text,
                                type: 'warning'
                            });
                            // check the first item
                            vm.address = vm.street;
                        }else{
                            // to display the results
                            vm.results = resp;
                            // check if there is messages
                            // dispaly the default
                            if(resp.VodafoneVoice0.notification){
                                vm.messages2.push({
                                    text: resp.VodafoneVoice0.notification,
                                    type: 'default'
                                });
                            }
                            // dispaly the default
                            if(resp.VodafoneVoice1.notification){
                                vm.messages3.push({
                                    text: resp.VodafoneVoice1.notification,
                                    type: 'default'
                                });
                            }
                            // dispaly the default
                            if(resp.VodafoneVoice2.notification){
                                vm.messages4.push({
                                    text: resp.VodafoneVoice2.notification,
                                    type: 'default'
                                });
                            }
                            // dispaly the default
                            if(resp.VodafoneVoice3.notification){
                                vm.messages5.push({
                                    text: resp.VodafoneVoice3.notification,
                                    type: 'default'
                                });
                            }
                            // save the form data
                            vm.submitedData = {
                                'street':vm.street,
                                'number':vm.number,
                                'postcode':vm.postcode,
                                'city':vm.city
                            }
                            availabilityCheckSrvc.saveFormData(vm.submitedData);
                        }
                    }).catch(function(falut){
                        // vars
                        var data = falut.errorData;
                        // dispaly the error
                        vm.messages1.push({
                            text: data.text,
                            type: 'warning'
                        });
                        // change the tab
                        vm.userTabs = 0;
                    });
                }
            }
            e.preventDefault();
        }
        // watch address if changed
        $scope.$watch('vm.address', function (newValue, oldValue) {
            if(vm.dispalyList && vm.dispalyList[newValue] && vm.dispalyList[newValue].text){
                vm.street = vm.dispalyList[newValue].text;
            }else if(newValue){
                vm.street = newValue;
            }
        });
        // watch street if changed
        $scope.$watch('vm.street', function (newValue, oldValue) {
            if(newValue){
                // reset
                vm.messages1 = [];
                vm.messages2 = [];
                vm.messages3 = [];
                vm.messages4 = [];
                vm.messages5 = [];
                vm.dispalyList = false;
            }
        });
    }
})
();
