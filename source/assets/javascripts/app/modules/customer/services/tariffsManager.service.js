(function () {
    'use strict';
    angular
        .module('onePOS.customer')
        .factory('tariffsManager', ['$q', 'entityListResource', 'modelMapping', 'entityListMapping', 'Tariff', 'tariffSelectionConfig',
            function ($q, entityListResource, modelMapping, entityListMapping, Tariff, tariffSelectionConfig) {
                var _self = this;

                return {
                    getAllByPageId: getAllByPageId
                };

                /** This is a description of the getAllByPageId function. */
                function getAllByPageId(pageId) {

                    return entityListResource.getByPageId(pageId).then(function (entityList) {

                        var mappedEntities = modelMapping.mapEntityListByConf(entityList, entityListMapping.parseTariffModel, tariffSelectionConfig);
                        mappedEntities.tariffs = mappedEntities.tariffs.map(function (tariff) {
                            return new Tariff(tariff.code, tariff.text, mappedEntities.promotions, mappedEntities.discounts);
                        });

                        //return modelMapping.mapDataToConfig(mappedEntities, tariffSelectionConfig);
                        return mappedEntities;
                    });
                }
            }]);
})();
