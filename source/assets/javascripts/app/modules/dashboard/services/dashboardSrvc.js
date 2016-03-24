(function() {
    "use strict";
    angular
        .module('onePOS.dashboard')
        .factory('dashboardService', ["dashboardResources",
            dashboardService]);

    function dashboardService(dashboardResources) {
        var service = {};

        function respModel(model){
            this.model = model;
        }

    }
})();
