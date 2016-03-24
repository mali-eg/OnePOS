(function () {
    'use strict';
    angular
        .module('onePOS.widgets').filter('orderObjectBy', function () {
            return function (items, field, reverse) {
                var filtered = [];
                angular.forEach(items, function (item) {
                    filtered.push(item);
                });
                filtered.sort(function (a, b) {
                    return (a[field] > b[field] ? 1 : -1);
                });
                if (reverse) filtered.reverse();
                return filtered;
            };
        });
    angular
        .module('onePOS.widgets')
        .directive('opsStepper', ['$rootScope', '$state', opsStepperDir]);

    function opsStepperDir($rootScope, $state) {
        return {
            restrict: 'AE',
            templateUrl: '/assets/javascripts/app/widgets/stepper/opsStepper.tpl.html',
            scope: {
                initStateId: '=',
                statesList: '='
            },
            link: function ($scope, elem, attrs) {
                // vars
                var mainTraget = elem.find('.progress-bar-container-st1');
                var elemOffsetTop = mainTraget.offset().top;
                // check scroll
                $(window).scroll(function(){
                    var windowScrollTop = $(window).scrollTop();
                    var relativeHeaderTop = windowScrollTop - elemOffsetTop;
                    if(windowScrollTop >= elemOffsetTop){
                        mainTraget.addClass('pos-st2').removeClass('pos-st1').css({
                            top:0
                        });
                    }else{

                        mainTraget.addClass('pos-st1').removeClass('pos-st2').css({
                            top:(relativeHeaderTop<0) ? 0 : relativeHeaderTop
                        });
                    }
                });
                // change the state
                $scope.assignState = function (stateId) {
                    $scope.selectedState = $scope.statesList[stateId];
                };
                // assign the current state
                $scope.assignState($state.current.name);
                // check if state changed
                $rootScope.$on('$stateChangeSuccess', function (ev, toState, toParams, fromState, fromParams) {
                    $scope.assignState(toState.name);
                });
            },
            controller: ['$scope', function ($scope) {
                // watch if the state changed
                $scope.$watch('initStateId', function (newVal, oldVal) {
                    if (newVal) {
                        $scope.assignState(newVal);
                    }
                })
            }]
        }
    }
})();
