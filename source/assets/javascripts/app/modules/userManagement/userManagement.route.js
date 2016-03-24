(function () {
    'use strict';

    angular
        .module('onePOS.userManagement', ['ui.grid','ui.grid.resizeColumns'])
        .config(['$stateProvider',
            routeConfig]);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('userManagement.newUser', {
                url: '/new-user',
                templateUrl: '/assets/javascripts/app/partials/userManagement/newUser.html',
                controller: 'newUserCtrl',
                controllerAs: 'vm'
            })
            /*.state('userManagement.userManagement', {
                url: '/userManagement',
                templateUrl: '/assets/javascripts/app/partials/userManagement/userManagement.html',
                controller: 'viewProfileCtrl',
                controllerAs: 'vm'
            })*/
            .state('userManagement.editUser', {
                url: '/edit-user/:username',
                templateUrl: '/assets/javascripts/app/partials/userManagement/editUser.html',
                controller: 'editUserCtrl',
                controllerAs: 'vm',
                resolve: {
                    userDetailsData: ['userService', '$stateParams', function (userService, $stateParams) {
                        // vars
                        var username = $stateParams.username;
                        // return
                        return userService.getUserDetails(username);
                    }]
                }
            })
            .state('userManagement.viewProfile', {
                url: '/viewProfile',
                templateUrl: '/assets/javascripts/app/partials/userManagement/viewProfile.html',
                controller: 'viewProfileCtrl',
                controllerAs: 'vm'
            })
            .state('userManagement.changePassword', {
                url: '/changePassword',
                templateUrl: '/assets/javascripts/app/partials/userManagement/changePassword.html',
                controller: 'changePasswordCtrl',
                controllerAs: 'vm'
            })
            .state('userManagement.usersList', {
                url: '/usersList',
                templateUrl: '/assets/javascripts/app/partials/userManagement/usersList.html',
                controller: 'usersListCtrl',
                controllerAs: 'vm',
                resolve: {
                    usersList: function (usersListService) {
                        return usersListService.getUserDetails();
                    }
                }
            });
    }

})();
