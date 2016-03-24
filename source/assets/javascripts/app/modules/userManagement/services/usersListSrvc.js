/**
 * Created by Omar Makeen on 2/2/16.
 */

(function () {
    "use strict";
    angular
        .module('onePOS.userManagement')
        .factory('usersListService', ["userManagementResources",
            usersListService]);

    function usersListService(userManagementResources) {
        var service = {};

        service.usersList = []

        service.getUserDetails = function () {
            return userManagementResources.getUserDetails().then(
                function (response) {
                    return saveUsersListData(response.data);
                });
        };

        function saveUsersListData(respModel) {

            service.usersList = [];
            var userAccountVBO = respModel.userAccountVBO;
            console.log(userAccountVBO);
            if (userAccountVBO) {
                for (var i = 0; i < userAccountVBO.length; i++) {
                    service.usersList.push({
                        lastName: userAccountVBO[i].onlineUser.lastName,
                        firstName: userAccountVBO[i].onlineUser.firstName,
                        puid: userAccountVBO[i].credential.username,
                        lastLogin: userAccountVBO[i].onlineUser.lastLoginDate,
                        voIdAccess: userAccountVBO[i].onlineUser.defaultVoID,
                        status: getUserStatus(userAccountVBO[i].onlineUser)
                    });
                }

                return service.usersList;
            }

        };

        function getUserStatus(onlineUser) {
            if (onlineUser.active == true)
                return "active"
            else if (onlineUser.suspended == true)
                return "suspended"
            else
                return "locked"
        }

        return service;
    }
})();

