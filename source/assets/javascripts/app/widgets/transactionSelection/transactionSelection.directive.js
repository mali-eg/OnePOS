(function () {
    'use strict';

    var directiveName = 'opsTransaction'; // usage <ops-transactions></ops-transactions>
    /**
     * @ngdoc directive
     * @name onePos Transactions
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
                    ngModel: '=?'
                },
                controller: ["$scope", function ($scope) {
                    var panes = $scope.panes = [];


                    $scope.select = function (pane) {
                        angular.forEach(panes, function (pane) {
                            pane.selected = false;
                        });
                        pane.selected = true;

                        $scope.ngModel = pane.id;
                    };

                    $scope.$watch('ngModel', function (value) {
                        if (value) {
                            $scope.select(getPaneById(value));
                        }
                    });

                    function getPaneById(id) {
                        var selectedPane = null;
                        $scope.panes.forEach(function (pane) {
                            if (pane.id === id) {
                                selectedPane = pane;
                            }
                        });
                        return selectedPane;
                    }

                    this.addPane = function (pane) {
                        if (panes.length == 0 && !$scope.ngModel) $scope.select(pane);
                        panes.push(pane);
                    }
                }],
                templateUrl: '/assets/javascripts/app/widgets/transactionSelection/transactionSelection.html',
                replace: true
            };
        }])
        .directive('opsSelection', [function () {
            return {
                require: '^' + directiveName,
                restrict: 'E',
                transclude: true,
                scope: {
                    title: '@',
                    id: '@?',
                    ngClick: '@?',
                    ngDisabled: '@?'
                },
                link: function (scope, element, attrs, tabsCtrl) {
                    tabsCtrl.addPane({
                        title: scope.title,
                        id: scope.id
                    });
                },
                //template: '<div class="tab-pane" ng-class="{active: selected}" ng-transclude></div>',
                replace: true
            };

        }]);

})();
