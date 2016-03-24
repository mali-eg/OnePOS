(function() {
    "use strict";

    angular.module("onePOS",[
        "ui.router",
        "ngAnimate",
        "ngCookies",

        "onePOS.auth",
        "onePOS.core",
        "onePOS.resources",
        "onePOS.messages",

        "angular.filter",

        "onePOS.widgets",
        "onePOS.dashboard",
        "onePOS.login",

        "onePOS.customer",
        "onePOS.customerSearch",
        "onePOS.customerSnapshot",
        /*"onePOS.user",*/

        "onePOS.userManagement",

        // Loader
        "ngLoader"

    ]);
})();

