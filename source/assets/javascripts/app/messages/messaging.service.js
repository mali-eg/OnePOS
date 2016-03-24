(function (vf) {
    'use strict';
    angular
        .module('onePOS.messages')
        .factory('messaging', ['$rootScope', messagingService]);

    function messagingService($rootScope) {

        return {
            displayErrorPopUp: displayErrorPopUp
        };

        /*
         * display error modal with given error object
         *
         * @param {object} errorObj - the error object to display
         * @param {string} errorObj.title - popup window title
         * @param {string} errorObj.text - popup window body
         * @param {string} errorObj.type - popup icon type
         * */
        function displayErrorPopUp(errorObj) {
            var defaultErrorObj = {
                title: 'Error',
                text: '',
                type: null
            };
            errorObj = angular.extend({}, defaultErrorObj, errorObj);

            //TODO: make popup support styles and icons
            vf.overlay.open(errorObj.text);
        }
    }
})(vf);
