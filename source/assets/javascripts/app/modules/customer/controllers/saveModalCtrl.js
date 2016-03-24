(function () {
    "use strict";


    angular
        .module('onePOS.customer')
        .controller('saveModalCtrl', ['customerService', '$scope', '$uibModalInstance','$state','loginService',

            function (customerService, $scope, $uibModalInstance,$state,loginService) {
                jQuery(window).scrollTop(0);
                var vm = this,
                    orderId = customerService.orderData.orderID,
                    orderLineItemId = customerService.orderData.parts.lineItems[0].orderLineItemID,
                    username = loginService.data.model.securityTokenVBO.credentials.username;
                var params = customerService.sharedLineItem;

                vm.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };


                vm.save = function () {
                    customerService.sendProduct(orderId, orderLineItemId, username).then(
                        function (){
                            $uibModalInstance.close(orderId, orderLineItemId, username);
                        }
                    ).catch(function(error){
                            var data = error.errorData;
                            $scope.saveError.push({
                                text: data.text, // message text
                                type: 'default'
                            });
                            $scope.saveError = true;
                        })
                };
            }]);

})();
