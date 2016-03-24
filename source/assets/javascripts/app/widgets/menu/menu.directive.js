angular.module('onePOS.widgets')
    .directive('mainMenu', function(){
    	menuCtrl.$inject = ['$scope', '$http', 'config','AuthService'];
    	return {
    		restrict: 'E',
    		templateUrl: '/assets/javascripts/app/widgets/menu/menu.tpl.html',
            controller: menuCtrl
    	}
    	function menuCtrl($scope, $http, config, AuthService) {
            $scope.user = AuthService.getUser();
        }
    });
