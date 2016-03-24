/**
 * Created by Omar Makeen on 12/16/15.
 */
(function () {
    "use strict";
    angular.module('onePOS.customerSnapshot').config(['$stateProvider', '$urlRouterProvider',
        routeConfig]);
    function routeConfig($stateProvider) {
        $stateProvider
            .state('customerSearch.index', {
                url: '',
                views: {
                    // the main template will be placed here (relatively named)
                    '': {
                        templateUrl: '/assets/javascripts/app/partials/customerSnapshot/customerSearch.html',
                        controller: 'customerSearchCtrl',
                        controllerAs: 'vm'
                    },
                    // the child views will be defined here (absolutely named)
                    'autentication@customerSearch.index': {
                        templateUrl: '/assets/javascripts/app/partials/customerSnapshot/customerAutentication.html'
                    }
                }
            })
            .state('customerSnapshot.customerChange', {
                url: '/customerChange',
                views: {
                    // the main template will be placed here (relatively named)
                    '': {
                        templateUrl: '/assets/javascripts/app/partials/customerSnapshot/customerChange.html',
                        controller: 'customerChangeCtrl',
                        controllerAs: 'vm'
                    },
                    // the child views will be defined here (absolutely named)
                    'autentication@customerSnapshot.customerChange': {
                        templateUrl: '/assets/javascripts/app/partials/customerSnapshot/customerAutentication.html'
                    }
                }
            })
            .state('customerSnapshot.customerOverview', {
                url: '/customerOverview',
                params: {
                    accountType: false
                },
                templateProvider:['$http','$stateParams','constants',function ($http,$stateParams,constants) {
                    // vars
                    var url = '/assets/javascripts/app/partials/customerSnapshot/';
                    var accountType = $stateParams.accountType;
                    // check the type of the account
                    if (accountType == constants.accountType.FIXED) {
                        url = url + 'customerOverviewFixed.html';
                    } else if (accountType == constants.accountType.DEBIT) {
                        url = url + 'customerOverviewDebit.html';
                    } else {
                        url = url + 'customerOverview.html';
                    }
                    // return html
                    return $http.get(url).then(
                        function (response) {
                            return response.data;
                        }
                    );
                }],
                controller: 'customerOverviewCtrl',
                controllerAs: 'vm'
            })
            .state('customerSnapshot.customerDetails', {
                url: '/customerDetails',
                templateUrl: '/assets/javascripts/app/partials/customerSnapshot/customerDetails.html',
                controller: 'customerDetailsCtrl',
                controllerAs: 'vm',
                resolve: {
                    customerDetails: ['customerDetailsService', '$stateParams', function (customerDetailsService, $stateParams) {
                        return customerDetailsService.getCustomerDetailsData($stateParams)
                    }]
                },
                params: {
                    type: false,
                    accountId: false,
                    subscriptionId: false,
                    marketCode: false,
                    invoiceNumber: false,
                    documentId: false,
                    mobileNumberColor: false
                }
            })
    }
}());
