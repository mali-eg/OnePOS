(function () {
    'use strict';

    angular
        .module('onePOS.customer')
        .factory('entityListMapping', [function () {
            return {
                parseEntityList: parseEntityList,
                parseTariffModel: parseTariffModel
            };

            function parseEntityList(entityList, tarrifHandler) {
                var tarrifsEntities = getEntitiesOf(entityList, 'tariff-group');
                var packageEntities = getEntitiesOf(entityList, 'package');

                if (tarrifsEntities && packageEntities && tarrifsEntities.length > 0) {
                    angular.forEach(tarrifsEntities.concat(packageEntities), function (val, key) {
                        tarrifHandler(val);
                    })
                }
            }


            /*
             * custom logic for tariffs entity list parser
             * */
            function getContainersStructure() {
                return {
                    tariffs: {
                        containerName: 'tariff-group',
                        entityTransformer: function (tariff) {
                            return {
                                text: tariff.name,
                                code: tariff.code
                            }
                        }
                    },
                    filters: {
                        containerName: 'leading-product-filter'
                    },
                    package: {
                        containerName: 'package',
                        entityTransformer: function (tariff) {
                            return {
                                text: tariff.name,
                                code: tariff.code
                            }
                        }
                    },
                    discounts: {
                        containerName: 'discount'
                    },
                    promotions: {
                        containerName: 'promotion'
                    }
                }
            }

            function parseTariffModel(entityList, tariffModelConfig) {
                var modelList = {};

                var containers = parseContainers(getContainersStructure(), entityList.containers);
                modelList.filters = containers.filters;
                var packages = containers.package;
                var tariffs = containers.tariffs;
                modelList.tariffs = packages ? tariffs.concat(packages) : tariffs;
                modelList.discounts = containers.discounts;
                modelList.promotions = containers.promotions;

                return modelList;
            }

            /**************************************/
            /*               helpers              */
            /**************************************/
            function find(arr, handlerFun) {
                var res = [];
                arr.forEach(function (elem) {
                    if (handlerFun(elem))
                        res.push(elem)
                });
                return res;
            }

            function findFirst(arr, handlerFun) {
                var res = find(arr, handlerFun);
                return res.length > 0 ? res[0] : null;
            }

            function getEntitiesOf(containers, groupName) {
                var group = findFirst(containers, function (container) {
                    return container.name === groupName;
                });
                return group ? group.entities : null;
            }

            function parseContainers(containersSchema, entityList) {
                var containers = {};
                for (var key in containersSchema) {
                    var tempContainer = getEntitiesOf(entityList, containersSchema[key].containerName);
                    if (tempContainer) {
                        if (containersSchema[key].hasOwnProperty('entityTransformer')) {
                            containers[key] = (tempContainer.map(containersSchema[key].entityTransformer));
                        } else {
                            containers[key] = (tempContainer);
                        }
                    }
                }
                return containers;
            }
        }

        ])

})();
