(function () {
    'use strict';
    angular.module('onePOS.customer').filter('escHtml', ['$sce', function ($sce) {
        return function (htmlString) {
            return $sce.trustAsHtml(htmlString);
        }
    }])
})();
