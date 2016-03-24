(function () {
    /*
     * inspired by ui bootstrap accordion directive https://github.com/angular-ui/bootstrap
     */
    'use strict';
    angular
        .module('onePOS.widgets')
        .controller('accordionController', ['$scope', accordionController]);

    function accordionController($scope) {

        this.panels = [];

        this.closeAllPanels = function () {
            angular.forEach(this.panels, function (panel) {
                panel.isOpen = false;
            });
        };

        this.closeOtherPanels = function (opennedPanelScope) {
            if (opennedPanelScope) {
                angular.forEach(this.panels, function (panelScope) {
                    if (opennedPanelScope !== panelScope) {
                        panelScope.isOpen = false;
                    }
                })
            }
        };

        this.addPanel = function (panelScope) {
            var that = this;
            this.panels.push(panelScope);

            panelScope.$on('$distroy', function (e) {
                that.removePanel(panelScope);
            });
        };

        this.removePanel = function (panelScope) {
            var index = this.panels.indexOf(panelScope);

            if (index !== -1) {
                this.panels.splice(index, 1);
            }
        };
    }
})();
