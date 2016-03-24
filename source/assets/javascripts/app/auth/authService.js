(function() {
    "use strict";
    angular
        .module('onePOS.auth')
        .factory('AuthService', ['authResources','logger', 'config', '$http', '$q', '$rootScope', AuthService]);

    function AuthService(authResources,logger, config, $http, $q, $rootScope){

        var user = {
            puid:'',
            firstName:'',
            lastName:'',
            defaultVoID:'',
            voIDList:'',
            role: '',
            isAuthenticated:false,
            isAuthorized:false
        };

        var accessToken = '';

        var service = {};
        service.getUser=getUser;
        service.setUser=setUser;
        service.getAccessToken=getAccessToken;

        service.isAuthenticated = isAuthenticated;
        //service.resetToken = resetToken;
        service.logout = logout;

        service.loggeInUserProfile= loggeInUserProfile;


        return service;


        function respModel(model){
            this.model = model;
        }

        function getUser(){
            logger.debug('calling getUser: ' + user);
            return user;
        }

        function setUser(newUser){
            user = newUser;
        }

        function isAuthenticated(){
            logger.debug('calling isAuthenticated');
            var isAuthenticated = false;
            if(user){
                isAuthenticated = user.isAuthenticated;
                logger.debug('user:' + user.userName + ', isAuthenticated:' + isAuthenticated);
            }

            return isAuthenticated;
        }

        //TODO to be replaced by the logout handling
        /*function resetToken(){
            logger.debug('resetting Access token');
            accessToken = '';
        }*/
        function logout(){
            return authResources.logout().then(
                function(){
                    //reset user and accessToken
                    logger.debug('resetting Access token');
                    accessToken = '';
                    logger.debug('resetting user');
                    user ='';
                    /*return user;*/
                    //align with Ghobashy sso federation
            })
        }

        function getAccessToken(){
            var d = $q.defer();
            if(!accessToken || accessToken == 'undefined' || accessToken == ''){
                //TODO call accessToken api, and remember to skip it from the interceptor
                var url = config.apiURLs.ACCESS_TOKEN;

                var request = $http({
                    method: 'POST',
                    timeout: 20000,
                    cache: false,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {grant_type: 'client_credentials', client_id: 'xq868G3h4VTIb1k3xkpAINtOUV7tXAJS', client_secret: 'mQGZGbCAGvSaF0fg', apix_opcoid: '49', scope: 'onepos_all'},
                    url: url
                }).then(function(response){
                    $rootScope.loading = false;
                    accessToken = response.data.access_token;
                    d.resolve(accessToken);
                });
            } else {
                //$rootScope.loading = false;
                d.resolve(accessToken);
            }

            return d.promise;
        }

        //for User retrieval, so all modules can share the logged in User object
        function loggeInUserProfile(params){
            return authResources.loggeInUserProfile(params).then(
                function(response){
                    var resp = new respModel(response.data);
                    // console.log(resp);
                    logger.debug(resp);
                    if (resp.model) {
                        var user = getUser();
                        user.username = resp.model.userAccountVBO[0].credential.username;
                        user.firstName = resp.model.userAccountVBO[0].onlineUser.firstName;
                        user.lastName = resp.model.userAccountVBO[0].onlineUser.lastName;
                        user.expiryDays = resp.model.userAccountVBO[0].onlineUser.passwordExpiryHint;
                        user.passwordUpdate = resp.model.userAccountVBO[0].onlineUser.passwordUpdateHint;
                        user.role = resp.model.userAccountVBO[0].permissions.businessRole;
                        user.availableShops = resp.model.userAccountVBO[0].availableShops;
                        user.shop = resp.model.userAccountVBO[0].shop;

                        if (resp.model.userAccountVBO[0].permissions.voIDList) {
                            user.voIDList = resp.model.userAccountVBO[0].permissions.voIDList;
                        }
                        if (resp.model.userAccountVBO[0].onlineUser.defaultVoID) {
                            user.defaultVoID = resp.model.userAccountVBO[0].onlineUser.defaultVoID;
                        }else if(resp.model.userAccountVBO[0].permissions.voIDLIst[0].voID) {
                            user.defaultVoID = resp.model.userAccountVBO[0].permissions.voIDLIst[0].voID;
                        }
                        setUser(user);
                        //TODO commeneted and it will affect the CustomerSrvc.getOrderID
                        // loginService.data.voID = user.defaultVoID;
                    }
                    return resp;
                });
        }
    }
})();
