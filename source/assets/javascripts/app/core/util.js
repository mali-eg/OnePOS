(function () {
    "use strict";

    var core = angular
        .module('onePOS.core')
        .factory('util', ['$q', '$rootScope',
            util]);

    function util($q, $rootScope) {

        var pattern = /\{\{|\}\}|\{(\d+)\}/g;

        return {
            handleError: handleError,
            handleSuccess: handleSuccess,
            isEmpty: isEmpty,
            formatString: formatString,
            replacePlaceHolders: replacePlaceHolders
        };

        function handleError(fault) {
            $rootScope.loading = false;
            return $q.reject(fault.data);
        }

        function handleSuccess(response) {
            $rootScope.loading = false;
            return response;
        }

        function isEmpty(str) {

        }


        function formatString() {
            return sFormat.apply(this, arguments);
        }

        function sFormat() {
            var parameters = arguments;
            return parameters[0].replace(pattern, function (match, group) {
                var value;
                if (match === "{{")
                    return "{";
                if (match === "}}")
                    return "}";
                value = parameters[parseInt(group, 10) + 1];
                return value ? value.toString() : "";
            });
        }

        // for replacing placeholders in string with their actual value
        //example:
        //INPUT:
        //  str = "/apis/%APINAME%/FEATURE/%ITEM_ID%/CUSTOMER"
        //  data = {"%APINAME%":"CUSTOMER_SNAPSHOT","ITEM_ID%":"5"}
        //OUTPUT:
        //  output = /apis/CUSTOMER_SNAPSHOT/FEATURE/5/CUSTOMER
        function replacePlaceHolders(str, data) {
          var output = str.replace(/%[^%]+%/g, function(match) {
              if (match in data) {
                  return(data[match]);
              } else {
                  return("");
              }
          });
          return(output);
        }

    }
})();
