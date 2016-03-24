(function () {
    'use strict';

    var directiveName = 'opsTextarea'; // usage <ops-textarea></ops-textarea> or <div ops-textarea></div>
    /**
     * @ngdoc directive
     * @name onePos textarea
     * @restrict AE
     *
     * @description
     * styled textareas based on simplicity lib.
     */
    angular.module('onePOS.widgets')
        .directive(directiveName, [function () {

            return {
                templateUrl: '/assets/javascripts/app/widgets/textarea/textarea.html',
                restrict: 'AE',
                replace: true,
                scope: {
                    name: '@?',
                    ngModel: "=",
                    innerId: "@?",
                    ngClass: "@?",
                    placeholder: "@?",
                    ngMinlength: "@?",
                    ngMaxlength: "@?",
                    ngRequired: "=?",
                    label: "@?",
                    desc: "@?",
                    counterLabel: "@?",
                    ngDisabled: "=?",
                    ngReadonly: "=?"
                },
                transclude: true
            };
        }]);

})();

/*
 outer HTML:
 <ops-textarea
 name="Name text"
 ng-model="vm.ngModel"
 innerId="ID"
 ng-class="className"
 placeholder="Placeholder text" //Preferred not to include
 ng-minlength="8"
 ng-maxlength="8"
 ng-required="required"
 label="label"
 desc= "Description text"
 counter-label= "Counter label text" //It requires ng-maxlength
 ng-disabled="true"
 ng-readonly="readonly"
 >
 </ops-textarea>*/
