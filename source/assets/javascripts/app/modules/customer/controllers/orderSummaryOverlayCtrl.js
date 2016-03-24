(function () {
    "use strict";
    angular
        .module('onePOS.customer')
        .controller('orderSummaryOverlayCtrl', ["$scope","$filter","$uibModalInstance",
            "customerService", '$state', '$q', 'customerData', 'subscriberData', 'lineItemData',/*"actions",*/
            orderSummaryOverlayCtrl]);

    function orderSummaryOverlayCtrl($scope,$filter,$uibModalInstance,customerService,actions,$state, $q,customerData, subscriberData, lineItemData) {
        // vars
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
               /* /!*OrederLineItem Data*!/*/
                vm.tariff = vm.orderLineItemModel.salesOrderVBO[0].parts.lineItems;
                var extrasObject = vm.orderLineItemModel.salesOrderVBO[0].parts.lineItems[0].productOffering.product;
                //console.log("extrasObject: " + JSON.stringify(extrasObject))
                vm.promotions = $filter('where')(extrasObject, {specification: 'promotion'});
                vm.discounts = $filter('where')(extrasObject, {specification: 'discount'});
                vm.addons = $filter('where')(extrasObject, {specification: 'tariff-addon'});
            }
        );

        angular.element(document).ready(function () {
            vf.accordion.init(document);
        });

    }
})
();
