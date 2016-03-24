(function () {
    "use strict";

    angular
        .module('onePOS.customer')
        .factory('availabilityCheckSrvc', ['customerResources',
            availabilityCheckSrvc]);

    function availabilityCheckSrvc(customerResources) {
        var service = {};
        service.submitedData = false;
        service.resultsData = false;

        // save the form
        service.saveFormData = function(data){
            service.submitedData = data;
        }
        // get the form data
        service.getFormData = function(){
            return service.submitedData;
        }

        // save the results
        service.saveResultsData = function(data){
            service.resultsData = data;
        }
        // get the form data
        service.getResultsData = function(){
            return service.resultsData;
        }

        // get single user details
        service.getAvailabilityCheckList = function(street){
            return customerResources.getAvailabilityCheckList(street).then(function(resp){
                // vars
                var vbo = resp.data;
                // create the model
                var model = {

                };
                //return model;
                return vbo;
            });
        }

        return service;
    }
})();
