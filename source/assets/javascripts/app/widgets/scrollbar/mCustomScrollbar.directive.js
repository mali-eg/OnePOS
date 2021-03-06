!function () {
    "use strict";
    function a() {
        this.defaults = {
            scrollButtons: {enable: !1},
            axis: "yx"
        }, $.mCustomScrollbar.defaults.scrollButtons = this.defaults.scrollButtons,
            $.mCustomScrollbar.defaults.axis = this.defaults.axis,
            this.$get = function () {
                return {defaults: this.defaults}
            }
    }

    function b(a) {
        return {
            scope: {ngScrollbarsConfig: "&"}, link: function (b, c) {
                var d = a.defaults, e = $.mCustomScrollbar.defaults, f = b.ngScrollbarsConfig();
                f || (f = {});
                for (var g in d)if (d.hasOwnProperty(g))switch (g) {
                    case"scrollButtons":
                        f.hasOwnProperty(g) || (e.scrollButtons = d[g]);
                        break;
                    case"axis":
                        f.hasOwnProperty(g) || (e.axis = d[g]);
                        break;
                    default:
                        f.hasOwnProperty(g) || (f[g] = d[g])
                }
                c.mCustomScrollbar(f)
            }
        }
    }

    angular.module("ngScrollbars", [])
        .provider("ScrollBars", a)
        .directive("ngScrollbars", b), a.$inject = [], b.$inject = ["ScrollBars"]
}();
