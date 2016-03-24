(function () {
    'use strict';
    angular
        .module('onePOS.customer')
        .filter('ordersOverview', ordersOverviewFilter);

    function ordersOverviewFilter() {
        return function (orders, ordersFilter) {
            var outputArray = [];
            function isEmpty(obj) {
			    for(var prop in obj) {
			        if(obj.hasOwnProperty(prop))
			            return false;
			    }
			    return true;
			}
            if(isEmpty(ordersFilter)) {
            	return orders;
            } else {
            	angular.forEach(orders, function (order) {
            		// TODO validate category, businessCase
            		var valid = true;
					if (typeof(ordersFilter.advisorName) != 'undefined' || typeof(ordersFilter.voID) != 'undefined' ||
						typeof(ordersFilter.status) != 'undefined' || typeof(ordersFilter.startDate) != 'undefined' ||
						typeof(ordersFilter.endDate) != 'undefined' || typeof(ordersFilter.businessCase) != 'undefined' ||
						typeof(ordersFilter.category) != 'undefined') {

						if(typeof(ordersFilter.startDate) != 'undefined' && typeof(ordersFilter.endDate) != 'undefined') {
							var startDate = new Date(Date.parse(ordersFilter.startDate));
							var endDate = new Date(Date.parse(ordersFilter.endDate));
							var createdDate = new Date(Date.parse(order.created));
							if(createdDate < startDate || createdDate > endDate) {
								valid = false;
							}
						} else if (typeof(ordersFilter.startDate) != 'undefined') {
							var startDate = new Date(Date.parse(ordersFilter.startDate));
							var createdDate = new Date(Date.parse(order.created));
							if(createdDate < startDate) {
								valid = false;
							}
						} else if (typeof(ordersFilter.endDate) != 'undefined') {
							var endDate = new Date(Date.parse(ordersFilter.endDate));
							var createdDate = new Date(Date.parse(order.created));
							if(createdDate > endDate) {
								valid = false;
							}
						}

						if(typeof(ordersFilter.advisorName) != 'undefined' && order.roles.agent.name.indexOf(ordersFilter.advisorName) == -1) valid = false;
						if(typeof(ordersFilter.voID) != 'undefined' && order.roles.agent.voID.indexOf(ordersFilter.voID) == -1) valid = false;
						if(typeof(ordersFilter.status) != 'undefined' && order.status.indexOf(ordersFilter.status) == -1) valid = false;

						if(valid) outputArray.push(order);
					}
	            });
            }
            return outputArray;
        }
    }
})();
