(function () {
    'use strict';

    var directiveName = 'opsTextbox'; // usage <ops-textbox></ops-textbox> or <div ops-textbox></div>
    /**
     * @ngdoc directive
     * @name onePos textbox
     * @restrict AE
     *
     * @description
     * styled textboxes based on simplicity lib.
     */
    angular.module('onePOS.widgets')
        .directive(directiveName, [function () {

            return {
                templateUrl: '/assets/javascripts/app/widgets/textbox/textbox.html',
                restrict: 'AE',
                replace: true,
                scope: {
                    type: "@",
                    name: '@?',
                    ngModel: "=",
                    id: "@?",
                    ngClass: "@?",
                    placeholder: "@?",
                    ngMinlength: "@?",
                    ngMaxlength: "@?",
                    ngRequired: "=?",
                    label: "@?",
                    iconed: "@?",
                    desc: "@?",
                    counterLabel: "@?",
                    ngDisabled: "=?",
                    ngReadonly: "=?",
                    autoFocus: "@?",
                    ngPattern: "@?"
                },
                transclude: true
            };
        }]);

})();

/*
 outer HTML:
 <ops-textbox
 type="text/password"
 name="Name text"
 ng-model="vm.ngModel"
 id="ID"
 ng-class="className"
 placeholder="Placeholder text" //Preferred not to include
 ng-minlength="8"
 ng-maxlength="8"
 ng-required="true"
 label="label"
 iconed="date/search"
 desc="Description text"
 counter-label="Counter label text" //It requires ng-maxlength
 ng-disabled="true"
 ng-readonly="true"
 auto-focus="true"
 >
 </ops-textbox>*/
