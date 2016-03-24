(function () {
    'use strict';

    angular
        .module('onePOS.customer')
        .factory('Tariff', [TariffModel]);


    function TariffModel() {

        function Tariff(code, name) {
            return this.setData(code, name);
        }

        Tariff.prototype = {
            setData: function (code, name) {
                if (code && name) {
                    angular.extend(this, {
                        code: code,
                        name: name
                    });
                    return this;
                } else {
                    return null;
                }
            }
        };

        return Tariff;
    }
})();
