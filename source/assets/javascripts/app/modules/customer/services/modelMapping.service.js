(function () {
    'use strict';
    angular
        .module('onePOS.customer')
        .factory('modelMapping', ['$q', function ($q) {
            return {
                mapEntityList: function (entityList, listConfigFun, itemHandler) {
                    return listConfigFun(entityList, itemHandler);
                },
                mapModelList: function (list, listConfigFun) {
                },
                mapEntityListByConf: function (entityList, parser, listConfig) {
                    return parser(entityList, listConfig);
                }
            }
        }]);
})();
