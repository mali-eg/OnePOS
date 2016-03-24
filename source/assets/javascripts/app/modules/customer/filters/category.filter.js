(function () {
    'use strict';
    angular
        .module('onePOS.customer')
        .filter('category', categoryFilter);

    function categoryFilter() {
        return function (tarrifs, categoriesList) {
            var outputArray = [];
            angular.forEach(tarrifs, function (tarrif) {
                if (categoriesList[tarrif.category])
                    outputArray.push(tarrif);
            });

            return outputArray;
        }
    }
})();
