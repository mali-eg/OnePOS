(function(){
    "use strict"

    angular
        .module('onePOS.customer')
        .controller('customerLayoutCtrl', ['flowID', 'constants', '$scope', '$rootScope', 'loginService', 'customerService', 'AuthService','$uibModal','searchCustomerService','$state',
            customerLayoutCtrl]);

    function customerLayoutCtrl(flowID, constants, $scope, $rootScope, loginService, customerService, AuthService,$uibModal,searchCustomerService,$state){
        // vars
        var vm = this,
            username = "";

        // flow id
        $scope.flowID = flowID;

        // default values
        $scope.customerHeader = {
            showHeader:true,
            selectedNBA:false,
            currentCustomer:true,
            customerNewban:$state.params.customer.newBan,
            customerAccount: searchCustomerService.getCustomer()
        }

        // check the current flow to change the customer header
        if (flowID === constants.flows.KEYS.NEW_CUSTOMER) {
            $scope.customerHeader.showHeader = false;
            $scope.customerHeader.currentCustomer = false;
        } else if (flowID === constants.flows.KEYS.ADD_SUBSCRIPTION) {
        } else if (flowID === constants.flows.KEYS.CONTRACT_PROLONGATION) {
            $scope.customerHeader.selectedNBA = true;
        } else if (flowID === constants.flows.KEYS.MODIFY_PRODUCT) {
            $scope.customerHeader.selectedNBA = true;
        }

        if(flowID) {
            $state.get('customer').data.flowID = $state.params.flowID;
            $state.get('customer.ordersOverview').data.flowID = $state.params.flowID;
            $state.get('customer.shoppingCart').data.flowID = $state.params.flowID;
            $state.get('customer.customerData').data.flowID = $state.params.flowID;
            $state.get('customer.subscriberData').data.flowID = $state.params.flowID;
            $state.get('customer.summaryData').data.flowID = $state.params.flowID;
            $state.get('customer.tariff').data.flowID = $state.params.flowID;
            $state.get('customer.addons').data.flowID = $state.params.flowID;
            $state.get('customer.pdfDownload').data.flowID = $state.params.flowID;
        }
        var listener = function(event, toState) {
            if(flowID) {
                $state.get('customer').data.flowID = $state.params.flowID;
                $state.get('customer.ordersOverview').data.flowID = $state.params.flowID;
                $state.get('customer.shoppingCart').data.flowID = $state.params.flowID;
                $state.get('customer.customerData').data.flowID = $state.params.flowID;
                $state.get('customer.subscriberData').data.flowID = $state.params.flowID;
                $state.get('customer.summaryData').data.flowID = $state.params.flowID;
                $state.get('customer.tariff').data.flowID = $state.params.flowID;
                $state.get('customer.addons').data.flowID = $state.params.flowID;
                $state.get('customer.pdfDownload').data.flowID = $state.params.flowID;
            }
        };
        $rootScope.$on('$stateChangeSuccess', listener);

        if(loginService.data){
            username = loginService.data.model.securityTokenVBO.credentials.username;
        }

        $scope.user = AuthService.getUser();

        $scope.headerTitle = "";
        $scope.showFinalConfirmationBtn = false; //Used in PDF Download page
        $scope.hideCheckoutBtn = false; //Used in Orders Overview page
        $scope.hidePrevBtn = false;
        $scope.subPrevText = "";
        $scope.prevText = "";
        $scope.prev = function () {};
        $scope.subNextText = "";
        $scope.nextText = "";
        $scope.next = function () {};

        $scope.saveBtn = function(){
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/javascripts/app/partials/layouts/saveModal.html',
                controller: 'saveModalCtrl',
                controllerAs:'vm'
               /* resolve: {
                    carts: function () {
                        return vm.carts;
                    }
                }*/
            });
        };

        /*
        $scope.cancelBtn = function(){
           vf.dialog.close();
        }*/

        /* angular.element(document).ready(function() {
            vf.dialog.init(document);
        });*/

        $scope.stepsStateObj = {
            'customer.shoppingCart': {
                index: 2,
                title: 'Shopping Cart',
            },
            'customer.customerData': {
                index: 3,
                title: 'Customer Data',
            },
            'customer.subscriberData': {
                index: 4,
                title: 'Subscription Data',
            },
            'customer.summaryData': {
                index: 5,
                title: 'Summary',
            },
            'customer.tariff': {
                index: 0,
                title: 'Tariff Selection',
            },
            'customer.addons': {
                index: 1,
                title: 'AddOns',
            },
            'customer.pdfDownload': {
                index: 6,
                title: 'Create Contracts',
            }
        }
    }

})();
