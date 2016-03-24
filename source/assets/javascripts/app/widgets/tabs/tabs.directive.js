(function () {
    'use strict';

    var directiveName = 'opsTabs'; // usage <ops-tabs></ops-textbox> or <div ops-tabs></div>
    /**
     * @ngdoc directive
     * @name onePos tabs
     * @restrict E
     *
     * @description
     * styled tabs based on simplicity lib.
     */
    angular.module('onePOS.widgets')
        .directive(directiveName, [function () {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    ngModel: '=?',
                    ngDisabled: '=?'
                },
                controller: ['$scope','$filter', function($scope,$filter) {
                    // vars
                    var panes = $scope.panes = [];
                    // adding pane
                    this.addPane = function(pane) {
                        if (panes.length == 0){
                            // select first pane by default
                            selectPane(pane)
                        }
                        panes.push(pane);
                    }
                    // select function
                    var selectPane = function(pane){
                        // remove selected tabs
                        angular.forEach(panes, function(pane) {
                            pane.selected = false;
                        });
                        // select the selected one
                        pane.selected = true;
                        // by id
                        $scope.ngModel = pane.id;
                    }
                    // select by changing the model id
                    $scope.select = function(pane) {
                        // if pane is disabled do no action
                        if($scope.ngDisabled || pane.ngDisabled){
                            return false;
                        }
                        // select pane
                        selectPane(pane);
                    }
                    // watch ngModel if changed
                    $scope.$watch('ngModel', function (newValue, oldValue) {
                        // get the selected pane if exists
                        var selectedPane =  (!isNaN(newValue)) ? $scope.panes[newValue] : $filter('filter')($scope.panes, {id:newValue})[0];
                        // check
                        if(selectedPane){
                            // select
                            $scope.select(selectedPane);
                        }
                    });
                }],
                templateUrl: '/assets/javascripts/app/widgets/tabs/tabs.html',
                replace: true
            };
        }])
        .directive('opsPane', [function() {
            return {
                require: '^' + directiveName,
                restrict: 'E',
                transclude: true,
                scope: {
                    id: '@?',
                    title: '@',
                    ngDisabled: '=?'
                },
                link: function(scope, element, attrs, tabsCtrl) {
                    tabsCtrl.addPane(scope);
                },
                template:'<div class="tab-pane" ng-class="{active: selected}" ng-transclude></div>',
                replace: true
            };
        }]);
})();
