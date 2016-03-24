(function () {
    'use strict';

    var directiveName = "opsCheckbox",
        tplUrl = '/assets/javascripts/app/widgets/checkbox/opsCheckbox.tpl.html';

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
            return{
                templateUrl:tplUrl,
                restrict:'AE',
                scope:{
                    innerId: '@',
                    ngModel: '=',
                    label: '@?',
                    name: '@?',
                    ngDisabled: "=?"
                    /*,
                    ngChange: '=?',
                    ngInit: "@?",
                    */
                },
                transclude: true
            }
        }])
})();
