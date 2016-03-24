/**
 * Created by Omar Makeen on 1/18/16.
 */

(function () {

    "use strict";

    angular.module("onePOS.customerSnapshot").service('customerDetailsService', ['customerSnapshotResources', 'customerDetailsModelBuilder', customerDetailsService]);

    function customerDetailsService(customerSnapshotResources, customerDetailsModelBuilder) {

        var service = {};

        service.getCustomerDetailsData = function (params) {

            return customerSnapshotResources.getCustomerDetailsData(params).then(
                function (response) {
                    var customerDetailsResp = response[0].data;
                    var subscriptionDetailsResp = response[1].data;
                    var InvoiceResp = response[2].data;
                    var customerDetailsmodel = customerDetailsModelBuilder.createCustomerDetailsModel(customerDetailsResp, subscriptionDetailsResp, InvoiceResp);
                   // console.log(JSON.stringify(customerDetailsmodel));
                    return customerDetailsmodel;
                })
        };

        service.getSubscriptionInvoiceUsage = function (params) {

            return customerSnapshotResources.getSubscriptionInvoiceUsage(params).then(
                function (response) {
                    var resp = new respModel(response.data);
                    return service.subscriptionInvoiceUsage = resp.model;
                    //return resp.model;
                })
        };

        service.getInvoiceBillDocument = function (type, documentId, accountId) {

            return customerSnapshotResources.getInvoiceBillDocument(type, documentId, accountId).then(
                function (response) {
                    var resp = new respModel(response.data);
                    return resp.model;

                })
        };

        function respModel(model) {
            this.model = model;
        }

        return service;

    }

}());
