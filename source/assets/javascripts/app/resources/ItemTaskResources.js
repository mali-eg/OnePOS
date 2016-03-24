(function () {
    'use strict';
    angular
        .module('onePOS.resources')
        .factory('itemTaskResource', ['$http', '$log', 'util', 'config', '$q', itemTaskResource]);

    function itemTaskResource($http, $log, util, config, $q) {
        var entityList, currentPageId, entityRuleSet, promises;
        return {
            getEntites: function (pageId, groupId) {
                //todo: this function my takes groupId as a pram.
                var groupCondition = '';
                if (groupId) {
                    groupCondition = '&group-id=' + groupId;
                }
                return $http.get(config.apiURLs.ITEM_TASK_ENTITY_LIST_GET + '?page-id=' + pageId + groupCondition).then(function (res) {
                    if (typeof res.data === 'object' && res.data !== {}) {
                        entityList = res.data;
                        currentPageId = pageId;
                    }
                    return entityList;
                }, util.handleError);
            },
            getRulesSet: function (entities) {
                promises = [];
                splitRequests(entities);
                return $q.all(promises).then(function () {
                    return entityRuleSet;
                }, util.handleError);
            }
        };
        function splitRequests(entities) {
            var url = config.apiURLs.ITEM_TASK_RULES_SET + '?entityList=';
            var notCachedEntites = [];
            if (entityRuleSet) {
                angular.forEach(entities, function (value) {
                    var exist = false;
                    for (var i = 0; i < entityRuleSet.items.length; i++) {
                        if (value === entityRuleSet.items[i].name) {
                            exist = true;
                            break;
                        }
                    }
                    if (!exist) {
                        notCachedEntites.push(value);
                    }
                });

            }
            while (url.length <= 2000 && notCachedEntites.length > 0) {
                url += notCachedEntites[0] + ',';
                notCachedEntites.shift();
            }
            url = url.substr(0, url.lastIndexOf(','));
            promises.push($http.get(url).then(function (res) {
                if (typeof res.data === 'object' && res.data !== {}) {
                    angular.extend(entityRuleSet, res.data);
                }
            }));
            if (entities.length > 0) {
                splitRequests(notCachedEntites);
            }
        };
    }
})();

