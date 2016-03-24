angular.module('onePOS.widgets')
    .directive('captchaImage', function () {
        captchaCtrl.$inject = ['$scope', '$http', 'config'];
        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                exposedApi: '=?'
            },
            templateUrl: '/assets/javascripts/app/widgets/captcha/captcha.html',
            controller: captchaCtrl
        };

        function captchaCtrl($scope, $http, config) {
            // Image click behaviour

            $scope.$watch('exposedApi', function (value) {
                if (value) {
                    $scope.obj = value;
                    $scope.obj.reloadCaptcha = function () {
                        generateCaptcha();
                    }
                }
            });

            $scope.reloadCaptcha = function () {
                generateCaptcha();
            };

            function generateCaptcha() {
                var url = config.apiURLs.CAPTCHA_GENERATION;
                $http({
                    url: url,
                    method: "post",
                    data:'{}'
                }).success(function (data) {
                    $scope.imageBase64 = "data:image/png;base64, " + data.credentialVBO.captchaBinaryContent;
                }).error(function (data, status) {
                    $scope.data = data;
                    $scope.imageBase64 = "";
                    $scope.status = status;
                });
            }

            generateCaptcha();
        }
    });
