(function () {
    "use strict"

    angular
        .module('onePOS.userManagement')
        .factory('userManagementResources', ["$http", "util","config",
            userManagementResources]);

    function userManagementResources($http, util, config) {
        var request;
        var resources = {};
        // get single user details
        resources.getUserDetails = function(username) {
            var url = config.apiURLs.USERS;
            request = $http({
                method: 'get',
                cache: false,
                url: url,
                params: {username: username}
            });
            return (request.then(util.handleSuccess).catch(util.handleError));
        }
        // create new user
        resources.saveUserDetails = function(userData) {
            var url = config.apiURLs.USER_MANAGEMENT.USER_ACCOUNTS;
            request = $http({
                method: 'post',
                cache: false,
                url: url,
                data: userData
            });
            return (request.then(util.handleSuccess).catch(util.handleError));
        }
        // edit user
        resources.editUser = function(userData,username) {
            var url = config.apiURLs.USER_MANAGEMENT.USER_ACCOUNTS+username;
            request = $http({
                method: 'post',
                cache: false,
                url: url,
                data: userData
            });
            return (request.then(util.handleSuccess).catch(util.handleError));
        }
        // deactivate user
        resources.deactivateUser = function(username) {
            var url = config.apiURLs.USER_MANAGEMENT.USER_PROFILE+username;
            request = $http({
                method: 'post',
                cache: false,
                url: url
            });
            return (request.then(util.handleSuccess).catch(util.handleError));
        }
        // return
        return resources;
    }
})();
