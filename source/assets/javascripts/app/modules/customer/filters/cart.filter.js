(function () {
    'use strict';
    angular
        .module('onePOS.customer')
        .filter('slice', function() {
            return function(arr, min, max) {
                return arr.slice(min,max);
            };
        })
})();


