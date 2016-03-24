(function() {
    "use strict";
    angular
        .module('onePOS.userManagement')
        .factory('viewProfileService', ["userManagementResources",
            viewProfileService]);

    function viewProfileService(userManagementResources) {
        var service = {};

        function respModel(model) {
            this.model = model;
        }

        return service;
    }
})();
