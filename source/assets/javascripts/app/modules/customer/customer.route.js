(function () {
    'use strict';

    angular
        .module('onePOS.customer')
        .config(['$stateProvider', '$urlRouterProvider',
            routeConfig]);


    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('customer.ordersOverview', {
                url: '/ordersOverview',
                templateUrl: '/assets/javascripts/app/partials/customer/ordersOverview.html',
                controller: 'ordersOverviewCtrl',
                controllerAs: 'vm'
            })
            .state('customer.shoppingCart', {
                url: '/shoppingCart',
                templateUrl: '/assets/javascripts/app/partials/customer/shoppingCart.html',
                controller: 'shoppingCartCtrl',
                controllerAs: 'vm',
              /*  resolve: {
                    carts: function (customerService) {
                        return customerService.getCart(customerService.orderData.orderID);
                    }
                },*/
                params:{
                    customer:{
                        existing:false,
                        newBan:false
                    }
                }
            })
            .state('customer.customerData', {
                url: '/customerDataCapture',
                templateUrl: '/assets/javascripts/app/partials/customer/customerDataCapture.html',
                controller: 'customerDataCtrl',
                controllerAs: 'vm'
            })
            .state('customer.subscriberData', {
                url: '/subscriberData',
                templateUrl: '/assets/javascripts/app/partials/customer/subscriberData.html',
                controller: 'subscriberDataCtrl',
                controllerAs: 'vm'
            })
            .state('customer.summaryData', {
                url: '/summaryData',
                templateUrl: '/assets/javascripts/app/partials/customer/summaryData.html',
                controller: 'summaryDataCtrl',
                controllerAs: 'vm',
                resolve: {
                    customerData: function (customerService) {
                        return customerService.getCustomerData(customerService.sharedLineItem.orderId);
                    },
                    subscriberData: function (customerService) {
                        return customerService.getSubscriberData(customerService.sharedLineItem.orderId, customerService.sharedLineItem.orderLineItemId);
                    },
                    lineItemData: function (customerService) {
                        return customerService.orderLineItemData(customerService.sharedLineItem.orderId, customerService.sharedLineItem.orderLineItemId);
                    }

                }
            })
            .state('customer.tariff', {
                url: '/',
                templateUrl: '/assets/javascripts/app/partials/customer/tariff.html',
                controller: 'tariffCtrl',
                controllerAs: 'vm',
                resolve: {
                    getOrderID: function (customerService) {
                        return customerService.getOrderId();
                    },
                    data: function (tariffsManager) {
                        return tariffsManager.getAllByPageId('tarrifSelectionPage');
                    }
                    //commented by ghobashy
                    //as it was causing a problem with accessing customer flow.
                    // getForcedProduct: function (customerService) {
                    //     return customerService.getProduct(customerService.sharedLineItem.orderId, customerService.sharedLineItem.orderLineItemId);
                    // }
                }
            })
            .state('customer.addons', {
                url: '/addons',
                templateUrl: '/assets/javascripts/app/partials/customer/addons.html',
                controller: 'addonsCtrl',
                controllerAs: 'vm'
            })
            .state('customer.pdfDownload', {
                url: '/pdf_download',
                templateUrl: '/assets/javascripts/app/partials/customer/pdfdownload.html',
                controller: 'pdfDownloadCtrl',
                controllerAs: 'vm'
            });
    }
})();
