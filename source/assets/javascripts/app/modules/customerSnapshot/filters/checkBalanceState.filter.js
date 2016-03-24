/**
 * Created by Omar Makeen on 3/20/16.
 */
(function () {
    angular.module('onePOS.customerSnapshot').filter('checkBalanceState', [checkBalanceState]);

    function checkBalanceState() {
        return function (balance) {
            if (balance > 0)
                return "+" + balance;
            else
                return balance;
        }
    }
}());
