(function () {
    'use strict';
    angular
        .module('onePOS.widgets')
        .directive('msgContainer', ['$rootScope', '$parse', '$sce', msgContainer]);

    function msgContainer($rootScope, $parse, $sce) {
        return {
            restrict: 'EA',
            transclude: true,
            templateUrl: '/assets/javascripts/app/widgets/messagesContainer/msgContainer.tpl.html',
            scope: {
                messagesList: '=?msgList',
                disableErrorListing: '@?'
            },
            link: function ($scope, $elem, $attrs) {
                //
                if (!$scope.disableErrorListing) {
                    $rootScope.$on('vf-notify', function (event, errorObj) {
                        $scope.messagesList.push(errorObj);
                    });
                }
                // button action
                $scope.btnAction = function (e,index) {
                    // call the user action
                    $scope.messagesList[index].btnHandler(e);
                    // return false
                    e.preventDefault();
                }
                // close button
                $scope.closeMsg = function (e,index) {
                    $scope.messagesList.splice(index, 1);
                }
                // list of trusted messages
                $scope.messagesListTrusted = [];
                // watch for any change in the messages
                $scope.$watch('messagesList', function(newVal, oldVal) {
                    if(newVal.length > 0) {
                        // vars
                        $scope.messagesListTrusted = [];
                        // loop
                        angular.forEach($scope.messagesList, function(vars,i) {
                            // clone the message list
                            var newMessagesList = angular.copy($scope.messagesList[i]);
                            // trusted html
                            newMessagesList.text = $sce.trustAsHtml(newMessagesList.text);
                            // push
                            $scope.messagesListTrusted.push(newMessagesList);
                        });
                    } else {
                        $scope.messagesListTrusted = [];
                    }
                }, true);
            }
        }
    }
})();
