(function () {
    'use strict';
    // overlay bg
    angular.module('template/modal/backdrop.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put("template/modal/backdrop.html",'<div class="overlay-bg-st1"></div>');
    }]);
    // body
    angular.module('template/modal/window.html', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put("template/modal/window.html",
            '<div class="overlay-st1" id="IDofContent">\
                <div class="overlay-wrap">\
                    <div class="overlay-cell">\
                        <div class="overlay-body">\
                            <div ng-transclude></div>\
                            <!--<i class="ico btn-close ico-close-black"></i>-->\
                        </div>\
                    </div>\
                </div>\
            </div>'
        );
    }])
})();
