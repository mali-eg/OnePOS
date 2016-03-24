(function () {
    "use strict";
    angular
        .module('onePOS.customer')
        .controller('pdfDownloadCtrl', ['$scope', 'customerService', '$state', '$uibModal', '$rootScope', pdfDownloadCtrl]);

    function pdfDownloadCtrl($scope, customerService, $state, $uibModal, rs) {
        jQuery(window).scrollTop(0);
        var vm = this;


        vm.returnToSummary = returnToSummary;
        vm.downloadAttachment = downloadAttachment;

        //boilerplate for progress bar and next\previous function
        $scope.$parent.headerTitle = "Neukunde";
        $scope.$parent.showFinalConfirmationBtn = true;
        $scope.$parent.subPrevText = "Zur";
        $scope.$parent.prevText = "Zusammenfassung";
        $scope.$parent.hidePrevBtn = false;
        $scope.$parent.prev = function () {
            $state.go("customer.summaryData");
            $scope.$parent.showFinalConfirmationBtn = false;
        };

        $scope.$parent.subNextText = "Nächster Schritt";
        $scope.$parent.nextText = "Auftrag senden";
        $scope.$parent.next = function () {
            $state.go("customer.ordersOverview");
            $scope.$parent.showFinalConfirmationBtn = false;
        };

        var orderId = customerService.orderData.orderID;// || "111"; //'OnePOS_160609120643';
        vm.messages = {};
        vm.orderId = orderId;

        customerService.getAgreementForOrder(orderId).then(function (result) {
            vm.attachments = result.parts.attachments;
        }).catch(function (error) {
            vm.messages.error = error.faultMessage.text;
            serverErrorHandler();
        });
        function serverErrorHandler() {
            //TODO: convert all of that to a modal service (problem: writing DOM manipulation inside a controller)
            var testLink = $('<a href="#server-error-dialog" class="mod mod-dialog"></a>');
            vf.dialog.open.call(testLink);
        }

        function downloadAttachment(attachment) {
            customerService.getAgreement(orderId, attachment.fileName, true);
        }

        function returnToSummary() {
            $state.go('customer.summaryData');
        }

        /*TODO: remove this it was just for test
         * TODO: remove the rootscope from injection
         * */
        vm.msgList = [];
        vm.fireError = function () {
            var errObj = {
                title: 'test',
                text: 'test test test test test test',
                type: 'success',
                overlay: false,
                hasCloseBtn: false,
                btnTitle: 'debug',
                btnHandler: function () {
                    vm.testTXT = '7amada nag7 w gab magmo3';
                }
            };

            //rs.$broadcast('vf-responseError',errObj);

            vm.msgList.push(errObj);

            console.log('broadcast fired !!!!!!!!!!');
        }



        vm.messages1 = [];
        /*if (flowID === constants.flows.KEYS.MODIFY_PRODUCT) {
            var data = result.backendMessage;
            if (data) {
                // dispaly the error
                vm.messages1.push({
                    text: data.text, // message text
                    type: 'default'
                });
                vm.infoMessage = true;
            }
        }*/

        //if (flowID === constants.flows.KEYS.MODIFY_PRODUCT) {
            //var data = result.backendMessage;
            //if (data) {
                // dispaly the error
                vm.messages1.push({
                    text: "Angebotstext für Festnetzangebot, basierend auf dem aktuell gewählten Festnetztarif", // message text
                    type: 'default'
                });
                vm.infoMessage = true;
            //}
        //}

    }

})();
