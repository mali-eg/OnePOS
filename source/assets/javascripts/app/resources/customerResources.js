(function () {
    "use strict";

    angular
        .module('onePOS.resources')
        .factory('customerResources', ["$http", "util", 'config',
            customerResources]);

    function customerResources($http, util, config) {
        var request;
        var service = {};

        service.ordersOverview = ordersOverview;
        service.orderItem = orderItem;

        service.cart = cart;
        service.addTariff = addTariff;
        service.deleteCart = deleteCart;
        service.emptyCarts = emptyCarts;
        service.sendCart = sendCart;
        service.customerData = customerData;
        service.subscriberData = subscriberData;
        service.customerSummary = customerSummary;
        service.subscriberSummary = subscriberSummary;
        service.orderLineItemData = orderLineItemData;

        service.sendProduct = sendProduct;
        service.getProduct = getProduct;
        service.getOrderId = getOrderId;
        service.postOrderLineItem = postOrderLineItem;

        /* agreements download */
        service.getAgreementsForOrder = getAgreementsForOder;
        service.getAgreement = getAgreement;

        service.getAvailabilityCheckList = getAvailabilityCheckList;

        return service;

        function ordersOverview(params) {
            if(typeof params.searchTerm === 'undefined') {
                var url = config.apiURLs.ORDERS_OVERVIEW + '?order-id=' + params;
            } else {
                var url = config.apiURLs.ORDERS_OVERVIEW + '?extended-search=' + params.advancedSearch + '&search-term=' + params.searchTerm;
            }

            request = $http({
                method: 'get',
                cache: false,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function orderItem(params) {
            var url = config.apiURLs.ORDER_LINE_ITEM_SUMMARY.replace('{order-id}', params.orderId).replace('{order-lineitem-id}', params.orderLineItemID);
            request = $http({
                method: 'get',
                cache: false,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }


        function cart(orderId) {
            console.log("resources");
            var data = {'%ORDER_ID%': orderId};
            var url = util.replacePlaceHolders(config.apiURLs.CART_GET, data);
            request = $http({
                method: 'get',
                cache: false,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function addTariff(payload) {
            var url = "/api/order/sales-orders-put"/*+params.orderID*/;
            request = $http({
                method: 'put',
                data: payload,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function deleteCart(orderId, orderLineItemId) {
            //console.log(JSON.stringify(params))
            /*/pos-sales-order-line/sales-orders/{order-id}/lineitems/{order-lineitem-id}*/
            var url = config.apiURLs.LINEITEM_DELETE + orderId + "/lineitems/" + orderLineItemId;
            request = $http({
                method: 'delete',
                cache: false,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function emptyCarts(orderId) {
            //console.log(JSON.stringify(params))
            var url = config.apiURLs.ORDER_DELETE;
            request = $http({
                method: 'delete',
                cache: false,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function sendCart(orderId, orderLineItemId, payload) {
            var url = config.apiURLs.PRODUCT_POST + orderId + "/lineitems/" + orderLineItemId + "/products";
            request = $http({
                method: 'post',
                data: payload,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function postOrderLineItem(payload) {
            var url = "/api/salesOrder-OrderLineItemCreation_POST";
            request = $http({
                method: 'post',
                data: payload,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function customerData(orderId, payload) {
            var data = {"%ORDER_ID%": orderId},
                url = util.replacePlaceHolders(config.apiURLs.CUSTOMER_DATA_POST, data);
            request = $http({
                method: 'put',
                data: payload,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function subscriberData(orderId, orderLineItemId, payload) {
            var data = {"%ORDER_ID%": orderId,"%ORDER_LINE_ITEM_ID%": orderLineItemId},
                url = util.replacePlaceHolders(config.apiURLs.SUBSCRIPTION, data);
            request = $http({
                method: 'post',
                data: payload,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function customerSummary(orderId) {
            var data = {"%ORDER_ID%": orderId},
                url = util.replacePlaceHolders(config.apiURLs.CUSTOMER_SUMMARY_GET, data);
            request = $http({
                method: 'get',
                cache: false,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function subscriberSummary(orderId, orderLineItemId) {
            var data = {"%ORDER_ID%": orderId,"%ORDER_LINE_ITEM_ID%": orderLineItemId},
                url = util.replacePlaceHolders(config.apiURLs.SUBSCRIPTION, data);
            request = $http({
                method: 'get',
                cache: false,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function orderLineItemData(orderId, orderLineItemId) {
            var data = {"%ORDER_ID%": orderId,"%ORDER_LINE_ITEM_ID%": orderLineItemId},
                url = util.replacePlaceHolders(config.apiURLs.ORDERLINEITEM_GET, data);
            request = $http({
                method: 'get',
                cache: false,
                url: url

            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        /* post */
        function sendProduct(orderId, orderLineItemId, payload) {
            var data = {"%ORDER_ID%": orderId,"%ORDER_LINE_ITEM_ID%": orderLineItemId},
                url = util.replacePlaceHolders(config.apiURLs.PRODUCT_POST, data);
            //var url = config.apiURLs.PRODUCT_POST + orderId + "/lineitems/" + orderLineItemId + "/products";
            request = $http({
                method: 'post',
                data: payload,
                url: url
            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        /* get */
        function getProduct(orderId, orderLineItemId) {
            // url = "/api/salesOrder_product?username=" + params;
            var data = {"%ORDER_ID%": orderId,"%ORDER_LINE_ITEM_ID%": orderLineItemId},
                url = util.replacePlaceHolders(config.apiURLs.PRODUCT_GET, data);
            request = $http({
                method: 'get',
                cache: false,
                url: url
            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function getOrderId(payload) {
            //var url = "/api/salesOrder_orderCreation";
            var url = config.apiURLs.ORDER_CREATION;
            request = $http({
                method: 'post',
                data: payload,
                url: url
            });
            return (request.then(util.handleSuccess)
                .catch(util.handleError));
        }

        function getAgreementsForOder(orderId) {
            var data = {"%ORDER_ID%": orderId},
                url = util.replacePlaceHolders(config.apiURLs.CUSTOMER_AGREEMENT_GET, data);
            return $http({
                method: 'get',
                cache: false,
                url: url //"/api/contracts/" + orderId + "/customer-agreements"
            }).then(util.handleSuccess)
                .catch(util.handleError);
        }

        function getAgreement(orderId, fileName, fileId, saveFile) {
            //var url = "/api/contracts/" + orderId + "/customer-agreements/" + fileName + (saveFile ? "?save=true" : "");
            var url = util.formatString(config.apiURLs.CUSTOMER_AGREEMENT_DOCUMENT_GET, fileId, fileName, saveFile);
            return $http({
                method: 'get',
                cache: false,
                url: url,
                responseType: 'arraybuffer'
                //responseType: 'blob'
            }).then(function (res) {
                return {
                    contentType: res.headers('content-type'),
                    data: res.data
                }
            }).catch(util.handleError);
        }

        // get availability check
        function getAvailabilityCheckList(street) {
            var url = config.apiURLs.CUSTOMER_AVAILABILITY_CHECK_GET;
            request = $http({
                method: 'get',
                cache: false,
                url: url,
                params: {
                    street:street
                }
            });
            return (request.then(util.handleSuccess).catch(util.handleError));
        }

    }
})();
