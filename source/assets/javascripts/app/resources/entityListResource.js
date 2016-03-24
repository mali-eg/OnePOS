(function () {
    'use strict';
    angular
        .module('onePOS.resources')
        .factory('entityListResource', ['$http', '$log', 'util', 'config', entityListResource]);

    /**
     * @deprecated please use getEntites from ItemTaskResource instead.
     */
    function entityListResource($http, $log, util, config) {
        var entityList, currentPageId;
        return {
            getByPageId: function (pageId) {
                return $http.get(config.apiURLs.ITEM_TASK_ENTITY_LIST_GET + '?page-id=' + pageId).then(function (res) {
                    if (typeof res.data === 'object' && res.data !== {}) {
                        entityList = res.data;
                        currentPageId = pageId;
                    }
                    return entityList;
                }, util.handleError);
            },
        }
    }
})();
