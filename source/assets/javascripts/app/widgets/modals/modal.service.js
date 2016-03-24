(function () {
    'use strict';
    angular.module('onePOS.widgets')
        .service('modals', ['$rootScope', '$q', modalsService]);

    function modalsService($rootScope, $q) {

        // object holds the promise and modal settings
        var modal = {
            deferred: null,
            params: null
        };

        return {
            open: open,
            reject: reject,
            resolve: resolve
        };

        function open(modalSettings, pipeResponse) {

        }

        function close() {

        }

        function reject() {

        }

        function resolve() {

        }
    }
})();
