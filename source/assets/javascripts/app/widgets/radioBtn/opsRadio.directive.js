(function () {
    'use strict';

    var directiveName = 'opsRadio',// usage <ops-radio></ops-radio> or <div ops-radio></div>
        tplUrl = '/assets/javascripts/app/widgets/radioBtn/opsRadio.tpl.html';
    /**
     * @ngdoc directive
     * @name onePos radio button
     * @restrict AE
     *
     * @description
     * styled radio button based on simplicity lib.
     */
    angular
        .module('onePOS.widgets')
        .directive(directiveName, [function () {
            return {
                templateUrl: tplUrl,
                restrict: 'AE',
                scope: {
                    innerId: '@',
                    ngModel: '=',
                    value: '@',
                    label: '@?',
                    name: '@?',
                    ngChange: '=?',
                    desc: "@?",
                    ngDisabled: "=?"
                },
                transclude: true
            }
        }]);
})();
