(function(){
    "use strict"

    angular
        .module('onePOS.dashboard')
        .controller('dashboardLayoutCtrl', ['$scope', 'AuthService',
            dashboardLayoutCtrl]);

    function dashboardLayoutCtrl($scope, AuthService){
        $scope.user = AuthService.getUser();
    }

})();
