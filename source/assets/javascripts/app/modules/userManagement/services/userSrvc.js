(function() {
    "use strict";

    angular
        .module('onePOS.userManagement')
        .factory('userService', ['userManagementResources',userService]);

    function userService(userManagementResources) {
        // vars
        var service = {};
        // get single user details
        service.getUserDetails = function(userid){
            return userManagementResources.getUserDetails(userid).then(function(resp){
                // vars
                var vbo = resp.data.userAccountVBO[0];
                // create the model
                var model = {
                    "username":vbo.credential.username,
                    "permissions":{
                        "businessRole":vbo.permissions.businessRole,
                        "businessRights":vbo.permissions.businessRights,
                        "voIDList":(function(){
                            return vbo.permissions.voIDList
                        })()
                    },
                    "onlineUser":{
                        "status":vbo.onlineUser.status,
                        "creationDate":vbo.onlineUser.creationDate,
                        "updateDate":vbo.onlineUser.updateDate,
                        "twoFactorFlag":vbo.onlineUser.twoFactorFlag,
                        "passwordExpiryDate":vbo.onlineUser.passwordExpiryDate,
                        "title":vbo.onlineUser.title,
                        "firstName":vbo.onlineUser.firstName,
                        "familyName":vbo.onlineUser.familyName,
                        "lastLoginDate":vbo.onlineUser.lastLoginDate,
                        "primaryEmail":vbo.onlineUser.primaryEmail,
                        "mTanPhoneNumber":vbo.onlineUser.mTanPhoneNumber,
                        "defaultVoID":vbo.onlineUser.defaultVoID,
                        "passwordUpdated": vbo.onlineUser.passwordUpdateHint
                    },
                    "shop":{
                        "shopName":vbo.shop.shopName,
                        "rmsID":vbo.shop.rmsID,
                        "shopAddress":{
                            "street":vbo.shop.shopAddress.street,
                            "streetNumber":vbo.shop.shopAddress.streetNumber,
                            "streetNumberSuffix":vbo.shop.shopAddress.streetNumberSuffix,
                            "postCode":vbo.shop.shopAddress.postCode,
                            "city":vbo.shop.shopAddress.city,
                            "country":vbo.shop.shopAddress.country
                        }
                    },
                    "availableShops":(function(){
                        return vbo.availableShops
                    })(),
                    "federation":(function(){
                        return vbo.federation
                    })()
                };
                return model;
            });
        }
        // create user
        service.saveUserDetails = function(userData){
            // vars
            var vbo = {
                "userAccountVBO": [
                    {
                        "credential": {
                            "username": userData.username
                        },
                        "permissions": {
                            "voIDList": userData.voidsList
                        },
                        "onlineUser": {
                            "mTanPhoneNumber": userData.mTanPhoneNumber,
                            "title": userData.title,
                            "firstName": userData.firstName,
                            "familyName": userData.familyName
                        },
                        "shopUser": userData.shopUser
                    }
                ]
            };
            return userManagementResources.saveUserDetails(vbo);
        }
        // edit user details
        service.editUser = function(userData,username){
            // vars
            var vbo = {
                "userAccountVBO": [{
                    "onlineUser": {
                        "mTanPhoneNumber": userData.mTanPhoneNumber,
                        "title": userData.title,
                        "firstName": userData.firstName,
                        "familyName": userData.familyName
                    },
                    "shopUser": userData.shopUser
                }]
            }

            return userManagementResources.editUser(vbo,username);
        }
        service.editShop = function(shop,username){
            // vars
            var vbo = {
                    "shopUser": shop.shopUser

            }

            return userManagementResources.editUser(vbo,username);
        }
        // edit user voids
        service.editUserVoids = function(userData,username){
            // vars
            var vbo = {
                "userAccountVBO": [{
                    "permissions": {
                        "voIDList": userData.voidsList
                    }
                }]
            }
            return userManagementResources.editUser(vbo,username);
        }
        // unlockUser user
        service.unlockUser = function(userData){
            // vars
            var vbo = {
                "userAccountVBO": [{
                    "onlineUser": {
                        "status": "ACTIVE",
                        "firstName": userData.firstName,
                        "familyName": userData.familyName
                    }
                }]
            }
            return userManagementResources.editUser(vbo,userData.username);
        }
        // deactivate user
        service.deactivateUser = function(username){
            return userManagementResources.deactivateUser(username);
        }
        // filter voids
        service.filterVoids = function(voids,defaultVoid){
            // vars
            var newVoids = [];
            // check
            if(voids.length){
                // loop
                for(var i=0; i<voids.length; i++){
                    // shift the default void to the top of the list of voids
                    if(voids[i].voID == defaultVoid){
                        newVoids.unshift({
                            'voID': voids[i].voID
                        });
                    }else{
                        newVoids.push({
                            'voID': voids[i].voID
                        });
                    }
                }
            }
            return newVoids;
        }
        // return
        return service;
    }
})();
