(function () {
    "use strict"

    angular
        .module('onePOS.resources')
        .factory('messagesResources', ["$http", "util", 'config',
            messagesResources]);

    function messagesResources($http, util, config) {
        var request;
        var service = {};
        service.getMessages = getMessages;
        return service;

        function getMessages(errorFile) {
            var url = config.messageUrlGenerator(errorFile);
            return request = $http({
                method: 'get',
                timeout: 20000,
                cache: true,
                url: url
            });
            //return (request.then(util.handleSuccess)
            //    .catch(util.handleError));
        }
    }
})();
