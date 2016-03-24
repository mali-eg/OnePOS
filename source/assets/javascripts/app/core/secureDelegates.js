(function() {
    "use strict";

    angular
        .module('onePOS.core')
        .config(['$sceDelegateProvider',scrDelegate]);

        function scrDelegate($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                // Allow same origin resource loads.
                'self',
                // Allow loading from our assets domain.  Notice the difference between * and **.
                'https://www.otelo.de/federation'
            ]);
            // The blacklist overrides the whitelist so the open redirect here is blocked.
            // $sceDelegateProvider.resourceUrlBlacklist([
            //     'http://myapp.example.com/clickThru**'
            // ]);
        }
})();
