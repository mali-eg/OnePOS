(function () {
    'use strict';
    angular
        .module('onePOS.customer')
        .factory('tariffSelectionConfig', tariffSelectionConfig);
    function tariffSelectionConfig() {
        return {
            filters: function (filter) {
                return {
                    code: filter.code,
                    text: filter.text
                }
            },
            tariffs: function (tariff) {
                return {
                    code: tariff.code,
                    name: tariff.name,
                    //discounts: function (discount) {
                    //    return {
                    //        text: discount.text,
                    //        code: discount.code
                    //    }
                    //},
                    //promotions: function (promotion) {
                    //    return {
                    //        text: promotion.text,
                    //        code: promotion.code
                    //    }
                    //}
                }
            }
        }
    }
})();
