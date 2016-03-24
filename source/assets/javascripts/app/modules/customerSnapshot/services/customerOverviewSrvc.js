/**
 * Created by Omar Makeen on 12/16/15.
 */
(function () {
    "use restrict";
    angular.module("onePOS.customerSnapshot").service('customerOverviewService', ['customerSnapshotResources', customerOverviewService]);
    function customerOverviewService(customerSnapshotResources) {
        // vars
        var service = {};
        // get customer by id and pass
        service.searchCustomerByIDAndPass = function (id,pass) {
            return customerSnapshotResources.searchCustomerByIDAndPass(id,pass).then(
                function (response) {
                    var resp = new respModel(response.data);
                    return resp.model;
                }
            )
        };

        service.getProlongationColor = function (subscriber) {
            if (subscriber.prolongationColor === 'green')
                return 'green';
            else if (subscriber.prolongationColor === 'red')
                return 'red';
            else if (subscriber.prolongationColor === 'gray')
                return 'gray';
            else if (subscriber.prolongationColor === 'yello')
                return 'yellow';
        };

        service.isSkeletonCustomer = function (customerAccount) {
            if (customerAccount.customerMasterData.hasOwnProperty('skeleton') && ( customerAccount.customerMasterData.skeleton != null || customerAccount.customerMasterData.skeleton != '' || customerAccount.customerMasterData.skeleton != undefined ))
                return true
            else
                return false;
        };

        function respModel(model) {
            this.model = model;
        };


        return service;
    }
})();
