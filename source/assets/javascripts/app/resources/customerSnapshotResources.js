(function () {
    "use strict"

    angular
        .module('onePOS.resources')
        .factory('customerSnapshotResources', ['$http', 'util', 'config', '$q',
            customerSnapshotResources]);

    function customerSnapshotResources($http, util, config, $q) {
        var request;
        var service = {};
        // customer Details API
        //service.getCustomerDetails = function (params) {
        //    var url = config.BASE_URL + "/" + params.type + "/customer/customer-accounts/" + params.accountId + "/customer-account?market-code=" + params.marketCode;
        //    request = $http({
        //        method: 'get',
        //        cache: false,
        //        url: url
        //    });
        //    return (request.then(util.handleSuccess)
        //        .catch(util.handleError));
        //};
        // subscription Details API
        //service.getSubscriptionDetails = function (params) {
        //    var url = config.BASE_URL + "/" + params.type + "/subscriptions/" + params.subscriptionId + "/subscription?market-code=" + params.marketCode;
        //    request = $http({
        //        method: 'get',
        //        cache: false,
        //        url: url
        //    });
        //    return (request.then(util.handleSuccess)
        //        .catch(util.handleError));
        //};
        // subscription Details API
        //service.getAccountInvoiceUsage = function (params) {
        //    var url = config.BASE_URL + "/" + params.type + "/payment/invoices/customer-parties/" + params.accountId + "/billed-usage?number-of-invoices=" + params.invoiceNumber;
        //    request = $http({
        //        method: 'get',
        //        cache: false,
        //        url: url
        //    });
        //    return (request.then(util.handleSuccess)
        //        .catch(util.handleError));
        //};
        //service.getSubscriptionInvoiceUsage = function (params) {
        //    var url = config.BASE_URL + "/" + params.type + "/payment/invoices/customer-parties/" + params.accountId + "/subscriptions/" + params.subscriptionId + "/billed-usage?number-of-invoices=" + params.invoiceNumber;
        //    request = $http({
        //        method: 'get',
        //        cache: false,
        //        url: url
        //    });
        //    return (request.then(util.handleSuccess)
        //        .catch(util.handleError));
        //};
        service.getInvoiceBillDocument = function (type, documentId, accountId) {
            var url = config.BASE_URL + "/" + type + "/payment/invoices/" + documentId + "/invoice";
            request = $http({
                method: 'get',
                cache: false,
                url: url,
                params: {
                    "account-Id": accountId,
                    "save-flag": true
                },
                responseType: 'arraybuffer',
                headers: {
                    'Content-type': 'application/pdf',
                }
            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        };
        //Overview of customer account details
        service.searchCustomerByID = function (customerID) {
            var url = config.BASE_URL + '/customer/customer-accounts/overview?id=' + customerID;
            request = $http({
                method: 'get',
                timeout: 20000,
                cache: false,
                url: url
            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }
        //Password (contract password - BAN/DSL)
        service.searchCustomerByIDAndPass = function (customerID, customerPass) {
            var url = config.BASE_URL + '/customer/customer-accounts/overview?id=' + customerID + "&password=" + customerPass;
            request = $http({
                method: 'get',
                cache: false,
                url: url
            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }
        //Date Of Birth & ID-Card (alternative to password search)
        service.searchCustomerByIdCard = function (customerID, customerDateOfBirth, customerIdCard) {
            var url = config.BASE_URL + '/customer/customer-accounts/overview?id=' + customerID + "&birth-date=" + customerDateOfBirth + "&id-card=" + customerIdCard;
            ;
            request = $http({
                method: 'get',
                cache: false,
                url: url
            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        };

        service.getCustomerDetailsData = function (params) {

            var customerDetailsUrl = config.BASE_URL + "/" + params.type + "/customer/customer-accounts/" + params.accountId + "/customer-account";
            var customerDetailsRequest = $http({
                method: 'get',
                cache: false,
                params: {
                    "market-code": params.marketCode,
                    "password": params.password
                },
                url: customerDetailsUrl
            });

            var subscriptionDetailsUrl = config.BASE_URL + "/" + params.type + "/subscriptions/" + params.subscriptionId + "/subscription";
            var subscriptionDetailsRequest = $http({
                method: 'get',
                params: {
                    "market-code": params.marketCode,

                },
                cache: false,
                url: subscriptionDetailsUrl
            });

            var accountInvoiceUsageUrl = config.BASE_URL + "/" + params.type + "/payment/invoices/customer-parties/" + params.accountId + "/billed-usage";
            var accountInvoiceRequest = $http({
                method: 'get',
                cache: false,
                url: accountInvoiceUsageUrl
            });

            return ($q.all([customerDetailsRequest, subscriptionDetailsRequest, accountInvoiceRequest]).then(util.handleSuccess)
                .catch(util.handleError))
        }

        return service;
    }
})();
