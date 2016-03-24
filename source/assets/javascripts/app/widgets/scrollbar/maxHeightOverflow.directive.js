(function () {
    'use strict';

    angular
        .module('onePOS.widgets')
        .directive('maxHeightOverflow', ['$parse', maxHeightOverflow]);

    function maxHeightOverflow($parse) {
        return {
            restrict: 'A',
            require: 'scrollbar',
            link: function (scope, elem, attrs, scrollBarCtrl) {
                if (attrs.maxHeightOverflow) {

                    var heightOverflowVal = $parse(attrs.maxHeightOverflow)(scope);


                    var observer = new MutationObserver(function (mutation) {
                        updateViewportHeight(elem, heightOverflowVal);
                        scrollBarCtrl.update();
                    });

                    observer.observe(elem[0], {
                        childList: true,
                        characterData: false,
                        subtree: true
                    });

                }
            }
        }
    }

    function updateViewportHeight(elem, maxHeight) {
        var innerHeight = elem.find('.scroll-overview').height();
        if (innerHeight < maxHeight) {
            elem.find('.scroll-viewport').height(innerHeight + 'px');
        } else {
            elem.find('.scroll-viewport').height(maxHeight + 'px');
        }
    }
})();
