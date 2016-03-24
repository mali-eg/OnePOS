(function() {
    "use strict";

    angular
        .module('onePOS.core')
        .factory('constants', [constants]);

    function constants() {

        var constants = {};

        constants.accountType = {
            FIXED:'fixed',
            DEBIT:'debit'
        }

        constants.faultStatusCodes = {
            LOCKED_USER: "NIL0A0856",
            LOCKED_USER_AFTER_LOGIN: "NIL0A0840",
            SUSPENDED_USER: "NIL0A0857",
            INVALID_USER: "NIL00A001",
            WRONG_CREDENTIALS: "NIL0A0838",
            WRONG_CAPTCHA: "NIL0V0411",
            MTAN_EXPIRED: "NIL0A0842",
            MTAN_INVALID: "NIL0V0410",
            MTAN_MAX: "NIL0V0843",
            MTAN_SUSPENDED: "NIL0A0856"
        };

        constants.validationRules = {
            puid_minimumLength: "1",
            password_minimumLength: "8",
            password_maximumLength: "8",
            tan_minimumLength: "4",
            tan_maximumLength: "4",
            LOGIN_CAPTCHA_ATTEMPTS: 3
        }

        constants.states = {
            auth:{
                LOGIN: "login.index",
                MTAN: "login.mtan",
                FORGOT_PASSWORD: "login.passwordForgot",
                RESET_PASSWORD: "login.passwordReset",
                PASSWORD_EXPIRED:"login.passwordExpired",
                UNAUTHORIZED: "login.unauthorizedUser"

            },customer:{
                DEFAULT: "/"
            }
        }

        constants.flows = {
            KEYS: {
                NEW_CUSTOMER: 0,
                ADD_SUBSCRIPTION: 1,
                CONTRACT_PROLONGATION: 2,
                MODIFY_PRODUCT: 3
            },
            TITLES: {
                NEW_CUSTOMER: "New Customer",
                ADD_SUBSCRIPTION: "Add Subscription",
                CONTRACT_PROLONGATION: "Prolongation",
                MODIFY_PRODUCT: "Modify Product"
            }
        };

        constants.authenticationStatus = {
          FIRST_FACTOR_AUTH : "firstFactorAuthenticated",
          FEDERATION_AUTH: "federation",
          FULLY_AUTH : "fullyAuthenticated"

        }

        return constants;
    }
})();
