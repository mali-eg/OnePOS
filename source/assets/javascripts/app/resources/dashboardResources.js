(function(){
    "use strict"

    angular
        .module('onePOS.resources')
        .factory('dashboardResources', ["$http", "util", 'config',
            dashboardResources]);

    function dashboardResources($http, util, config) {
        var request;
        var service = {};

        service.profile = profile;

        return service;

        function profile(params) {
            var url = config.apiURLs.USERS + '?username=' + params;
            request = $http({
                method: 'get',
                cache: false,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }
    }
})();
