(function () {
    "use strict";

    var interceptorName = 'responseErrorInterceptor';

    angular
        .module('onePOS.messages')
        .factory(interceptorName, ['$q', '$rootScope', '$injector', 'messaging', interceptor])
        .config(['$provide', '$httpProvider', function ($provide, $httpProvider) {
            // Add the interceptor to the $httpProvider.
            $httpProvider.interceptors.push(interceptorName);
        }]);

    function interceptor($q, $rootScope, $injector, messaging) {

        var config = $injector.get('config');

        return {
            responseError: function (response) {
                // var states = $injector.get('constants').states;

                //console.log("constants.states.auth.LOGIN:"+states.auth.LOGIN);
                // Open overlay containing the error message
                return handleFaultErrors(response, config);
                // Return the promise rejection.
                //return $q.reject(response);
            }
        };

        function handleFaultErrors(response, config) {
            var messagesResources = $injector.get('messagesResources'),
                $state = $injector.get('$state');
            //var errorData = {
            //    title: '',
            //    text:response.data.faultMessage.text,
            //    type: config.faultMessageDefaults.type,
            //    showInOverlay:config.faultMessageDefaults.showInOverlay
            //};
            var errorObj = {};
            if ($state.current.errorFile) {
                return messagesResources.getMessages($state.current.errorFile).then(function (msgResponse) {
                    errorObj = fetchError(msgResponse.data, response);
                    if (errorObj) {
                        informUser(errorObj);
                        response.data.errorData = errorObj;
                        return $q.reject(response);
                    } else {
                        informUser(response.data.faultMessage);
                        response.data.errorData = response.data.faultMessage;
                        return $q.reject(response);
                    }
                }).catch(function (error) {
                    response.data.errorData = response.data.faultMessage;
                    return $q.reject(response);
                });
            } else {
                response.data.errorData = response.data.faultMessage;
                return $q.reject(response);
            }

            //if (response.data && response.data.faultMessage) {
            //    var messagesObj = JSON.parse(messages);
            //    var code = response.data.faultMessage.code;
            //    console.log('code:' + code);
            //    console.log('status:' + response.status);
            //    if (messagesObj[response.status][code]) {
            //        console.log('yay');
            //    }
            //} else {
            //
            //}


            //var message = messages["login"][400][response.data.faultMessage.code].text;
            // console.log("message:"+JSON.stringify(message));

            //response.data.faultMessage.errorData = errorData;
            //console.log("fault:" + JSON.stringify(response.data));
            //fault.data.faultMessage.text="testing testing";
        }

        function fetchError(messages, res) {
            var errorMessages = messages[res.status];
            if (errorMessages) {
                try {
                    var errorObj = errorMessages[res.data.faultMessage.code];
                    return errorObj ? errorObj : errorMessages['DEFAULT'];
                } catch (e) {
                    //TODO: inject logger
                    //logger.error(e);
                    return errorMessages['DEFAULT'];
                }
            } else {
                return null;
            }
        }

        function informUser(errorObj) {

            var errorDefault = {
                title: '',
                text: '',
                type: 'error',
                overlay: false
            };

            var errorObj = angular.extend({}, errorDefault, errorObj);

            if (errorObj.overlay) {
                messaging.displayErrorPopUp(errorObj);
            } else {
                $rootScope.$broadcast('vf-notify', errorObj);
            }
        }
    }
})();
