(function () {
    'use strict';

    var core = angular.module('onePOS.core');

    // var API_BASE_URL = "https://eweb5.vfd2-testnet.de/api";
    var API_BASE_URL = "/api";


    var ONEPOS_BASE_URL = "/assets/javascripts/app/";
    var MESSAGES_BASE_URL = ONEPOS_BASE_URL + 'messages/data/',
        errorMessagesFileSuffix = '-errors',
        errorMessagesFilePrefix = '';

    var config = {
        BASE_URL: API_BASE_URL,
        apiURLs: {
            ACCESS_TOKEN: API_BASE_URL + '/oauth2/token',
            USERS: API_BASE_URL + '/pos-user-accounts/user-data',
            AUTHENTICATE: API_BASE_URL + '/pos-security-tokens/authentication-user',
            AUTHENTICATE_FEDERATION: API_BASE_URL + '/pos-security-tokens/federation/authentication-user',
            CAPTCHA_GENERATION: API_BASE_URL + '/pos-user-accounts/captcha',
            CAPTCHA_VERIFICATION: API_BASE_URL + '/pos-user-accounts/captcha',
            MTAN_GENERATION: API_BASE_URL + '/pos-user-accounts/mtan',
            MTAN_VERIFICATION: API_BASE_URL + '/pos-security-tokens/authentication-mtan',
            MTAN_VERIFICATION_FEDERATION: API_BASE_URL + '/pos-security-tokens/federation/authentication-mtan',
            PASSWORD_RESET: API_BASE_URL + '/pos-user-accounts/password',
            TOKEN_INVALIDATION_DELETE: API_BASE_URL + '/technical/security-tokens/token',

            ORDER_CREATION: API_BASE_URL + '/pos-sales-orders',
            PRODUCT_POST: API_BASE_URL + '/pos-sales-order-line/sales-orders/%ORDER_ID%/lineitems/%ORDER_LINE_ITEM_ID%/products',//
            PRODUCT_GET: API_BASE_URL + '/pos-sales-order-line/sales-orders/%ORDER_ID%/lineitems/%ORDER_LINE_ITEM_ID%/products',

            CART_GET: API_BASE_URL + '/pos-sales-orders/%ORDER_ID%/summary',//
            CUSTOMER_DATA_POST: API_BASE_URL + '/pos-contract-customer-data/contracts/%ORDER_ID%/customer-account',//
            CUSTOMER_SUMMARY_GET: API_BASE_URL + '/pos-contract-customer-data/contracts/%ORDER_ID%/customer-account',//
            SUBSCRIPTION: API_BASE_URL + '/pos-contract-subscriber/contracts/%ORDER_ID%/lineitems/%ORDER_LINE_ITEM_ID%/subscription',//
            ORDERLINEITEM_GET: API_BASE_URL + '/pos-sales-order-line/sales-orders/%ORDER_ID%/lineitems/%ORDER_LINE_ITEM_ID%/summary',//

            ORDERS_OVERVIEW: API_BASE_URL + '/pos-sales-orders/overview',
            ORDER_LINE_ITEM_SUMMARY: API_BASE_URL + '/pos-sales-order-line/sales-orders/{order-id}/lineitems/{order-lineitem-id}/summary',


            /* PRODUCT_UPDATE: API_BASE_URL + '/SalesOrder_OrderUpdate_post',*/

            LINEITEM_DELETE: API_BASE_URL + '/pos-sales-order-line/sales-orders/',
            ORDER_DELETE: API_BASE_URL +'/salesOrder_order_delete',

            ITEM_TASK_ENTITY_LIST_GET: API_BASE_URL + '/pos-item-task/entities',

            PRODUCT_UPDATE: API_BASE_URL + '/SalesOrder_OrderUpdate_post',

            CUSTOMER_AGREEMENT_GET: API_BASE_URL + '/pos-contract-customer-agreement/contracts/%ORDER_ID%/customer-agreements',//
            CUSTOMER_AGREEMENT_DOCUMENT_GET: API_BASE_URL + '/pos-contract-customer-agreement/customer-agreements/{0}/{1}',
            CUSTOMER_AVAILABILITY_CHECK_GET:API_BASE_URL+'/availability_check/',

            USER_MANAGEMENT:{
                USER_ACCOUNTS:API_BASE_URL+'/identity/pos-user-accounts/users/',
                USER_PROFILE:API_BASE_URL+'/identity/pos-user-accounts/user-profile/'
            },
            CUSTOMER_SNAP_SHOT:{

            },
            ITEM_TASK_RULES_SET:API_BASE_URL+'/itemTask_ruleSet'
        },
        apiDefaultHeaders: {
            X_VF_ID: 'OnePOS',
            ENV: 'onepos_target_environment_preproduction_QA3',
            CHARSET: 'utf-8',
            CONTENT_TYPE: 'application/json; charset=utf-8',
            ACCEPT: 'application/json'
        },
        messagesURLs: {
            LOGIN: MESSAGES_BASE_URL + 'login-errors.json'
        },
        messageUrlGenerator: function (fileName) {
            return MESSAGES_BASE_URL + errorMessagesFilePrefix + fileName + errorMessagesFileSuffix + '.json';
        },
        faultMessageDefaults: {
            "type": "error",
            "showInOverlay": false
        },
        defaultTimeout: {
            timeout: "20000"
        }
    };
    core.value('config', config);
})();
