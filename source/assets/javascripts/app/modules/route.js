(function () {
    "use strict";

    angular
        .module("onePOS")
        .config(["$stateProvider", "$urlRouterProvider",
            routeConfig]);

    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .when("/login", "/login/")
            .when("/dashboard", "/dashboard/")
            .when("/customer", "/customer/")
            .when('/customerSnapshot', '/customerSnapshot/')
            .when('/userManagement', '/userManagement/')
            .otherwise("/login/")


        $stateProvider
            .state('login', {
                url: '/login',
                abstract: true,
                templateUrl: partialsConfig.layouts.login
            })
            .state('dashboard', {
                url: '/dashboard',
                abstract: true,
                templateUrl: '/assets/javascripts/app/partials/layouts/dashboard.html',
                controller: 'dashboardLayoutCtrl',
                data: {
                    pageTitle: 'Dashboard'
                }
            })
            .state('customer', {
                url: '/customer',
                abstract: true,
                templateUrl: '/assets/javascripts/app/partials/layouts/main.html',
                controller: 'customerLayoutCtrl',
                data: {
                    pageTitle: 'New Customer'
                },
                params:{
                    flowID: 0,
                    customer:{
                        existing:false,
                        newBan:false
                    }
                },
                resolve: {
                    flowID : ['$stateParams', function($stateParams){
                        return $stateParams.flowID;
                    }]
                }
            })
            .state('customerSnapshot', {
                url: '/customerSnapshot',
                abstract: true,
                templateUrl: '/assets/javascripts/app/partials/layouts/snapshot.html',
                data: {
                    pageTitle: 'Customer Snapshot'
                }
            })
            .state('customerSearch', {
                url: '/customerSearch',
                abstract: true,
                templateUrl: '/assets/javascripts/app/partials/layouts/default.html',
                data: {
                    pageTitle: 'Customer Search'
                }
            })
            .state('templates', {
                url: '/templates',
                // abstract: true,
                templateUrl: '/assets/javascripts/app/partials/layouts/templates.html',
                controller : ['$scope',function($scope){
                    //F9.3, F9.4, F9.6
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
                    };
                    // select options list
                    $scope.list = [
                        {
                            id:0,
                            desc:"hello world 1"
                        },
                        {
                            id:1,
                            desc:"hello world 2"
                        },
                        {
                            id:2,
                            desc:"hello world 3"
                        }
                    ];
                    $scope.selectModelName1 = {
                        id:1,
                        desc:"hello world 2"
                    };
                    // text field
                    $scope.fname = 'Ahmed Saber - Senior Front End Developer'
                }]
            })
            .state('userManagement', {
                url: '/userManagement',
                abstract: true,
                templateUrl: '/assets/javascripts/app/partials/layouts/userManagement.html',
                data: {
                    pageTitle: 'User Management'
                }
            })

    }
})();
