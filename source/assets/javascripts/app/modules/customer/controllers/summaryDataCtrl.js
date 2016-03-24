(function () {
    "use strict";

    angular
        .module('onePOS.customer')
        .controller('summaryDataCtrl', ['$scope', '$filter', 'customerService', '$state', '$q', 'customerData', 'subscriberData', 'lineItemData',
            summaryDataCtrl]);

    function summaryDataCtrl($scope, $filter, customerService, $state, $q, customerData, subscriberData, lineItemData) {
        jQuery(window).scrollTop(0);
        var vm = this;

        vm.panels ={
            accountInfo:{
                isOpened :true
            },
            subscriberData:{
                isOpened: false
            }
        };

        $q.all([customerData, subscriberData, lineItemData]).then(
            function (summaryData) {
                vm.customerModel = summaryData[0].model;
                vm.subscriberModel = summaryData[1].model;
                vm.orderLineItemModel = summaryData[2].model;
               /*OrderLineItem Data*/
                vm.tariff = vm.orderLineItemModel.salesOrderVBO[0].parts.lineItems;
                var extrasObject = vm.orderLineItemModel.salesOrderVBO[0].parts.lineItems[0].productOffering.product;
                //console.log("extrasObject: " + JSON.stringify(extrasObject))
                vm.promotions = $filter('where')(extrasObject, {specification: 'promotion'});
                vm.discounts = $filter('where')(extrasObject, {specification: 'discount'});
                vm.addons = $filter('where')(extrasObject, {specification: 'tariff-addon'});
            }
        );

        $scope.$parent.headerTitle = "Neukunde";
        $scope.$parent.subPrevText = "Zurück zu";
        $scope.$parent.prevText = "Teilnehmerdaten";
        $scope.$parent.hidePrevBtn = false;
        $scope.$parent.prev = function () {
            $state.go("customer.subscriberData");
        };
        $scope.$parent.subNextText = "Nächster Schritt";
        $scope.$parent.nextText = "PDF-Erstellung";
        $scope.$parent.next = function () {
            //customerService.submitCart(orderLineItemId);
            $state.go("customer.pdfDownload");
        };
    }
})();
