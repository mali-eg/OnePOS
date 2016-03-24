/**
 * Created by Omar Makeen on 2/2/16.
 */
(function () {
    "use strict"

    angular
        .module('onePOS.userManagement')
        .controller('usersListCtrl', ['usersListService', 'usersList', 'uiGridConstants', '$scope', '$state', usersListCtrl]);

    function usersListCtrl(usersListService, usersList, uiGridConstants, $scope, $state) {

        var vm = this;
        vm.userList = usersList;
        vm.filterValue = '';
        vm.filteredRows;
        vm.warnMessage = [];
        vm.displayMessage = false;


        vm.warnMessage.push({
            title: 'test', // if overlay=true that will be the modal title
            text: 'OPS-810-MSG-1', // message text
            type: 'default', // define the message style
        });

        // ui-grid options
        vm.gridOptions = {
            rowHeight: 40,
            minRowsToShow: 10,
            enableColumnMenus: false,
            enableFiltering: false,
            enableColumnResize: true,
            enableVerticalScrollbar: uiGridConstants.scrollbars.ALWAYS,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.ALWAYS,
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
                vm.gridApi.grid.registerRowsProcessor(vm.singleFilter, 200);
                vm.gridApi.core.on.rowsRendered($scope, function () {
                    vm.filteredRows = vm.gridApi.core.getVisibleRows(vm.gridApi.grid).length;
                    if (vm.filteredRows > 0) {
                        vm.displayMessage = false;
                    }
                    else {
                        vm.displayMessage = true;
                    }
                });
            },
            columnDefs: [{
                name: 'Last name',
                field: 'lastName',
                width: '*',
                displayName: 'Last name',
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0
                }
            }, {
                name: 'First name',
                field: 'firstName',
                displayName: 'First name',
                width: '*'
            }, {
                name: 'PU-ID',
                field: 'puid',
                width: '120',
                displayName: 'PU-ID',
            }, {
                name: 'Last Login',
                field: 'lastLogin',
                displayName: 'Last login',
                width: '*',
                type: 'date',
                cellFilter: 'date:\'dd/MM/yy\''
            }, {
                name: 'VO-ID access',
                field: 'voIdAccess',
                displayName: 'VO-ID access',
                width: '*',
                enableSorting: false
            }, {
                name: 'Actions',
                field: 'puid',
                displayName: 'Actions',
                width: '*',
                enableSorting: false,
                enableCellEdit: false,
                cellTemplate: '<a ng-class="(row.entity.status==\'suspended\')?\'txt-co5\':\'txt-co2\'" ui-sref="userManagement.editUser({username:COL_FIELD})">View Details</a>'
            }, {
                name: 'Status',
                field: 'status',
                displayName: 'Status',
                width: '*',
                cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                    if (grid.getCellValue(row, col).toLowerCase() === 'active') {
                        return 'txt-co3';
                    }
                    else if (grid.getCellValue(row, col).toLowerCase() === 'suspended') {
                        return 'txt-co1';
                    }
                    else {
                        return 'txt-co4'
                    }
                }
            }
            ],
            data: usersList

        };

        $scope.$watch("vm.filterValue", function handleChange() {
                vm.gridApi.grid.refresh();
            }
        );

        // implement single search filter
        vm.singleFilter = function (renderableRows) {
            var matcher = new RegExp(vm.filterValue, 'i');
            renderableRows.forEach(function (row) {
                var match = false;
                ['lastName', 'firstName', 'puid'].forEach(function (field) {

                    if (row.entity[field].match(matcher)) {
                        match = true;
                    }
                });
                if (!match) {
                    row.visible = false;
                }
            });
            return renderableRows;
        };


        /**/
        $scope.$parent.hideFooter = false;
        $scope.$parent.subPrevText = "Zurück zur";
        $scope.$parent.prevText = "Back to dashboard";
        $scope.$parent.hidePrevBtn = false;
        $scope.$parent.subNextText = "Nächster Schritt";
        $scope.$parent.nextText = "Add new user";
        $scope.$parent.next = function () {
            //customerService.submitCart(orderId, orderLineItemId, payload);
            $state.go("userManagement.newUser");
        };
        $scope.$parent.prev = function () {
            //customerService.submitCart(orderId, orderLineItemId, payload);
            $state.go("dashboard.index");
        };


    }


})();
