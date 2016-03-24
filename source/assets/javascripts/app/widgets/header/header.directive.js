(function () {
    'use strict';

    angular.module('onePOS.widgets')
        .directive('mainHeader', function(){
        	headerCtrl.$inject = ['$scope', '$state', '$rootScope', '$http', 'config','AuthService', 'constants'];
        	return {
        		restrict: 'E',
        		templateUrl: '/assets/javascripts/app/widgets/header/header.tpl.html',
                controller: headerCtrl
        	}

            function headerCtrl($scope, $state, $rootScope, $http, config, AuthService, constants) {
                $scope.user = AuthService.getUser();

                $scope.logout = function(){
                    AuthService.logout();
                    $state.go("login.index");
                };

                if ($state.current.data && $state.current.data.pageTitle && !$state.current.data.flowID) {
                    $scope.pageTitle = $state.current.data.pageTitle;
                } else if($state.current.data && $state.current.data.flowID) {
                    var flowID = $state.current.data.flowID;
                    for(var key in constants.flows.KEYS){
                        if(flowID === constants.flows.KEYS[key]) {
                            $scope.pageTitle = constants.flows.TITLES[key];
                        }
                    }
                }
                var listener = function(event, toState) {
                    var title = '';

                    if(toState.data && toState.data.flowID) {
                        var flowID = toState.data.flowID;
                        for(var key in constants.flows.KEYS){
                            if(flowID === constants.flows.KEYS[key]) {
                                title = constants.flows.TITLES[key];
                            }
                        }

                    } else if (toState.data && toState.data.pageTitle) {
                        title = toState.data.pageTitle;
                    }
                    $scope.pageTitle = title;
                };
                $rootScope.$on('$stateChangeSuccess', listener);

                $scope.toggleMenu = function() {
                    if($('body').hasClass('menu-open')) {
                        $('body').removeClass('menu-open');
                        $('.main-menu').removeClass('visible');
                    } else {
                        $('body').addClass('menu-open');
                        setTimeout(function(){
                            $('.main-menu').addClass('visible');
                        }, 500);
                    }
                };
            }
        });
})();
